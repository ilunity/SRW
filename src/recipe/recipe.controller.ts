import {
  Body,
  Controller,
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
import { RecipeStepService } from '../recipe-step/recipe-step.service';
import { RecipeFilterService } from '../recipe-filter/recipe-filter.service';
import { RecipeProductService } from '../recipe-product/recipe-product.service';
import { JwtAuthGuard, OptionalJwtAuthGuard } from '../auth/jwt-auth.guard';
import { RECIPE_STATUS } from './entity/recipe-statuses';
import { USER_ROLE } from '../user/entity/user-roles';
import { CommentService } from '../comment/comment.service';
import { CreateRecipeCommentDto } from './dto/create-recipe-comment.dto';
import { Comment } from '../comment/entity/comment.entity';
import { authErrorHandler, userRoleErrorHandler } from '../utils';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
    private recipeStepService: RecipeStepService,
    private recipeFilterService: RecipeFilterService,
    private recipeProductService: RecipeProductService,
    private commentService: CommentService,
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
      filters: query.categories,
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
  @Patch('status')
  updateStatus(@Body() updateRecipeStatusDto: UpdateRecipeStatusDto): Promise<Recipe> {
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
}
