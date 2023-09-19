import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  CreateRecipeDto,
  GetPreviewRecipe,
  ReadRecipeDto,
  ReadRecipePreviewDto,
  UpdateRecipeStatusDto,
} from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Recipe } from './entity/recipe.entity';
import { JwtAuthGuard, OptionalJwtAuthGuard } from '../auth/jwt-auth.guard';
import { RECIPE_STATUS } from './entity/recipe-statuses';
import { USER_ROLE } from '../user/entity/user-roles';
import { CommentService } from '../comment/comment.service';
import { CreateRecipeCommentDto } from './dto/create-recipe-comment.dto';
import { Comment } from '../comment/entity/comment.entity';
import { authErrorHandler, userRoleErrorHandler } from '../utils';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';
import { FavouriteRecipeService } from '../favourite-recipe/favourite-recipe.service';
import { RatingScoreDto } from '../rating/dto';
import { Rating } from '../rating/entity/rating.entity';
import { RatingService } from '../rating/rating.service';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
    private commentService: CommentService,
    private favouriteRecipeService: FavouriteRecipeService,
    private ratingService: RatingService,
  ) {}

  /** Creates the Recipe (Including Products, Categories and Steps for it) */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createCombined(@Request() req, @Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.create(req.user, createRecipeDto);
  }

  /** Returns a list of recipes */
  @Get()
  findAll(): Promise<ReadRecipeDto[]> {
    return this.recipeService.findAll();
  }

  /** Returns a list of recipes */
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Get('preview')
  findAllPreview(
    @Request() req,
    @Query() query: GetPreviewRecipe,
  ): Promise<ReadRecipePreviewDto[]> {
    if (query.belongTo) {
      authErrorHandler(req);
    }

    if (query.status !== RECIPE_STATUS.SHARED) {
      authErrorHandler(req);
      userRoleErrorHandler(req.user.role, [USER_ROLE.ADMIN]);
    }

    return this.recipeService.find({
      categories: query.categories,
      additionalClause: query.status ? { status: query.status } : {},
      belongTo: {
        type: query.belongTo,
        user: req.user,
      },
    });
  }

  /** Returns the Recipe */
  @Get(':recipe_id')
  findOne(@Param('recipe_id') recipeId: number): Promise<ReadRecipeDto> {
    return this.recipeService.findOne(recipeId);
  }

  /** Updated status of the Recipe */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('status')
  updateStatus(
    @Request() req,
    @Body() updateRecipeStatusDto: UpdateRecipeStatusDto,
  ): Promise<Recipe> {
    userRoleErrorHandler(req.user.role, [USER_ROLE.MODERATOR, USER_ROLE.ADMIN]);

    return this.recipeService.updateStatus(updateRecipeStatusDto);
  }

  // ---------- comments ----------

  /** Comments the recipe */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':recipe_id/comment')
  comment(
    @Request() req,
    @Param('recipe_id') recipe_id: number,
    @Body() createRecipeCommentDto: CreateRecipeCommentDto,
  ): Promise<Comment> {
    return this.commentService.create({
      ...createRecipeCommentDto,
      recipe_id,
      user_id: req.user.id,
    });
  }

  // ---------- favourites ----------

  /** Adds recipe in favourites */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':recipe_id/favourite')
  addFavouriteRecipe(
    @Request() req,
    @Param('recipe_id') recipe_id: number,
  ): Promise<FavouriteRecipe> {
    return this.favouriteRecipeService.create({
      user_id: req.user.id,
      recipe_id,
    });
  }

  /** Returns true if record exists or false if not */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':recipe_id/favourite')
  findFavourite(@Request() req, @Param('recipe_id') recipe_id: number): Promise<boolean> {
    return this.favouriteRecipeService.isFavourite({
      user_id: req.user.id,
      recipe_id,
    });
  }

  /** Remove the favourite recipe */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':recipe_id/favourite')
  removeFavouriteRecipe(@Request() req, @Param('recipe_id') recipe_id: number) {
    return this.favouriteRecipeService.remove({
      user_id: req.user.id,
      recipe_id,
    });
  }

  // ---------- rating ----------

  /** Rates some recipe */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':recipe_id/rating')
  rate(
    @Request() req,
    @Param('recipe_id') recipeId: number,
    @Body() ratingScoreDto: RatingScoreDto,
  ): Promise<Rating> {
    return this.ratingService.create({
      user_id: req.user.id,
      recipe_id: recipeId,
      score: ratingScoreDto.score,
    });
  }

  /** Returns the Rating record */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':recipe_id/rating')
  findOneRate(@Request() req, @Param('recipe_id') recipeId: number): Promise<Rating | undefined> {
    return this.ratingService.findOne({
      user_id: req.user.id,
      recipe_id: recipeId,
    });
  }

  /** Updates the rating */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':recipe_id/rating')
  updateRate(
    @Request() req,
    @Param('recipe_id') recipeId: number,
    @Body() ratingScoreDto: RatingScoreDto,
  ): Promise<Rating> {
    return this.ratingService.update({
      user_id: req.user.id,
      recipe_id: recipeId,
      score: ratingScoreDto.score,
    });
  }

  /** Deletes the rating */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':recipe_id/rating')
  removeRate(@Request() req, @Param('recipe_id') recipeId: number) {
    return this.ratingService.remove({
      user_id: req.user.id,
      recipe_id: recipeId,
    });
  }
}
