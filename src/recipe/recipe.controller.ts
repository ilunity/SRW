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
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  CreateRecipeCombinedDto,
  CreateRecipeDto,
  GetSharedRecipe,
  ReadRecipeDto,
  ReadRecipeIdsDto,
  ReadRecipePreviewDto,
  UpdateRecipeStatusDto,
} from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Recipe } from './entity/recipe.entity';
import { RecipeStepService } from '../recipe-step/recipe-step.service';
import { CreateRecipeStepDto } from '../recipe-step/dto';
import { RecipeStep } from '../recipe-step/entity/recipe-step.entity';
import { RecipeFilter } from '../recipe-filter/entity/recipe-filter.entity';
import { CreateRecipeFilterDto } from '../recipe-filter/dto';
import { RecipeFilterService } from '../recipe-filter/recipe-filter.service';
import { RecipeProductService } from '../recipe-product/recipe-product.service';
import { CreateRecipeProductDto } from '../recipe-product/dto';
import { RecipeProduct } from '../recipe-product/entity/recipe-product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RECIPE_STATUS } from './entity/recipe-statuses';
import { USER_ROLE } from '../user/entity/user-roles';
import { CommentService } from '../comment/comment.service';
import { CreateRecipeCommentDto } from './dto/create-recipe-comment.dto';
import { Comment } from '../comment/entity/comment.entity';

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

  /** Creates the Recipe record */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.create(req.user, createRecipeDto);
  }

  /** Creates the Recipe, Products and Steps for it */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('combined')
  createCombined(
    @Request() req,
    @Body() createRecipeCombinedDto: CreateRecipeCombinedDto,
  ): Promise<Recipe> {
    return this.recipeService.createCombined(req.user, createRecipeCombinedDto);
  }

  /** Returns a list of ids of "shared" recipes */
  @Get('ids')
  findIds(): Promise<ReadRecipeIdsDto[]> {
    return this.recipeService.findAllIds();
  }

  /** Returns a list of recipes */
  @Get()
  findAll(): Promise<ReadRecipeDto[]> {
    return this.recipeService.findAll();
  }

  /** Returns a list of 'SHARED' recipes */
  @Post('shared')
  findAllShared(@Body() getSharedRecipe: GetSharedRecipe): Promise<ReadRecipePreviewDto[]> {
    return this.recipeService.find({
      additionalClause: { status: RECIPE_STATUS.SHARED },
      filters: getSharedRecipe.filters_keys,
    });
  }

  /** Returns a list of 'CREATION' recipes */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('created')
  findAllCreated(@Request() req): Promise<ReadRecipePreviewDto[]> {
    if (req.user.role !== USER_ROLE.ADMIN) {
      throw new ForbiddenException();
    }

    return this.recipeService.find({
      additionalClause: { status: RECIPE_STATUS.CREATION },
    });
  }

  /** Returns a list of user recipes */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyRecipes(@Request() req): Promise<ReadRecipePreviewDto[]> {
    return this.recipeService.findMy(req.user);
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

  /** Deletes the recipe */
  @Delete(':recipe_id')
  remove(@Param('recipe_id') recipeId: number) {
    this.recipeService.remove(recipeId);
  }

  // ---------- steps ----------

  /** Added the recipe step */
  @Post('step')
  addStep(@Body() createRecipeStepDto: CreateRecipeStepDto): Promise<RecipeStep> {
    return this.recipeStepService.create(createRecipeStepDto);
  }

  /** Deletes the recipe step */
  @Delete('step/:step_id')
  removeStep(@Param('step_id') stepId: number) {
    return this.recipeStepService.remove(stepId);
  }

  // ---------- filters ----------

  /** Added the recipe filter */
  @Post('filter')
  addFilter(@Body() createRecipeFilterDto: CreateRecipeFilterDto): Promise<RecipeFilter> {
    return this.recipeFilterService.create(createRecipeFilterDto);
  }

  /** Deletes the recipe filer */
  @Delete('filter/:filter_id')
  removeFilter(@Param('filter_id') filterId: number) {
    return this.recipeFilterService.remove(filterId);
  }

  // ---------- products ----------

  /** Added the recipe product */
  @Post('product')
  addProduct(@Body() createRecipeProductDto: CreateRecipeProductDto): Promise<RecipeProduct> {
    return this.recipeProductService.create(createRecipeProductDto);
  }

  /** Deletes the recipe product */
  @Delete('product/:product_id')
  removeProduct(@Param('product_id') productId: number) {
    return this.recipeProductService.remove(productId);
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
