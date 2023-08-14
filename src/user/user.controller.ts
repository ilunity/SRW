import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { CreateCommentDto, ReadCommentDto } from '../comment/dto';
import { Comment } from '../comment/entity/comment.entity';
import { FavouriteRecipe } from '../favourite-recipe/entity/favourite-recipe.entity';
import { FavouriteRecipeService } from '../favourite-recipe/favourite-recipe.service';
import { RatingScoreDto } from '../rating/dto';
import { Rating } from '../rating/entity/rating.entity';
import { RatingService } from '../rating/rating.service';
import { CommentService } from '../comment/comment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { USER_ROLE } from './entity/user-roles';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private favouriteRecipeService: FavouriteRecipeService,
    private ratingService: RatingService,
  ) {}

  /** Creates the User record */
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<User> {
    return this.userService.create(createUserDto, avatar);
  }

  /** Returns list of all users */
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /** Returns the user by PK */
  @Get('/:user_id')
  findOne(@Param('user_id') userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }

  /** Deletes the user */
  @Delete(':user_id')
  remove(@Param('user_id') userId: number) {
    return this.userService.remove(userId);
  }

  /** Updates the user */
  @ApiConsumes('multipart/form-data')
  @Patch()
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<User> {
    return this.userService.update(updateUserDto, avatar);
  }

  /** Updates the user role */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('role')
  updateRole(@Request() req, @Body() updateUserRole: UpdateUserRoleDto): Promise<User> {
    if (req.user.role !== USER_ROLE.ADMIN) {
      throw new ForbiddenException();
    }

    return this.userService.updateRole(updateUserRole);
  }

  // ---------- comments ----------

  /** Creates user's comment for some recipe */
  @Post('comment')
  addComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  // todo Возвращает комментарии всех пользователей вместо одного
  /** Returns user comments */
  @Get(':user_id/comment')
  findComments(@Param('user_id') userId: number): Promise<ReadCommentDto[]> {
    return this.commentService.findAll();
  }

  @Delete('/comment/:comment_id')
  removeComment(@Param('comment_id') commentId: number) {
    this.commentService.remove(commentId);
  }

  // ---------- favourites ----------

  /** Adds recipe in favourites */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('favourite/:recipe_id')
  addFavouriteRecipe(
    @Request() req,
    @Param('recipe_id') recipe_id: number,
  ): Promise<FavouriteRecipe> {
    return this.favouriteRecipeService.create({
      user_id: req.user.id,
      recipe_id,
    });
  }

  /** Returns FavouriteRecipe record or null */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('favourite/:recipe_id')
  findFavourite(@Request() req, @Param('recipe_id') recipe_id: number) {
    return this.favouriteRecipeService.find({
      user_id: req.user.id,
      recipe_id,
    });
  }

  /** Remove the favourite recipe */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('favourite/:recipe_id')
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
  @Post('rating/:recipe_id')
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
  @Get('rating/:recipe_id')
  findOneRate(@Request() req, @Param('recipe_id') recipeId: number): Promise<Rating | undefined> {
    return this.ratingService.findOne({
      user_id: req.user.id,
      recipe_id: recipeId,
    });
  }

  /** Updates the rating */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('rating/:recipe_id')
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
  @Delete('rating/:recipe_id')
  removeRate(@Request() req, @Param('recipe_id') recipeId: number) {
    return this.ratingService.remove({
      user_id: req.user.id,
      recipe_id: recipeId,
    });
  }
}
