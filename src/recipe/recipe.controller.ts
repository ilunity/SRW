import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto, ReadRecipeDto, ReadRecipeIdsDto, UpdateRecipeStatusDto } from './dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Recipe } from './entity/recipe.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { RecipeStepService } from '../recipe-step/recipe-step.service';
import { CreateRecipeStepDto } from '../recipe-step/dto';
import { RecipeStep } from '../recipe-step/entity/recipe-step.entity';
import { RecipeFilter } from '../recipe-filter/entity/recipe-filter.entity';
import { CreateRecipeFilterDto } from '../recipe-filter/dto';
import { RecipeFilterService } from '../recipe-filter/recipe-filter.service';
import { RecipeProductService } from '../recipe-product/recipe-product.service';
import { CreateRecipeProductDto } from '../recipe-product/dto';
import { RecipeProduct } from '../recipe-product/entity/recipe-product.entity';
import { UpdateRecipeStatusDto } from './dto/update-recipe-status.dto';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
    private recipeStepService: RecipeStepService,
    private recipeFilterService: RecipeFilterService,
    private recipeProductService: RecipeProductService,
  ) {}

  /** Creates the Recipe record */
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() img: Express.Multer.File,
  ): Promise<Recipe> {
    return this.recipeService.create(createRecipeDto, img);
  }

  /** Returns a list of ids of "shared" recipes */
  @Get('ids')
  findIds(): Promise<ReadRecipeIdsDto[]> {
    return this.recipeService.findAllIds();
  }

  /** Returns a list of recipes */
  @Get()
  findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  /** Returns the Recipe */
  @Get(':recipe_id')
  findOne(@Param('recipe_id') recipeId: number): Promise<ReadRecipeDto> {
    return this.recipeService.findOne(recipeId);
  }

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
  @ApiConsumes('multipart/form-data')
  @Post('step')
  @UseInterceptors(FileInterceptor('img'))
  addStep(
    @Body() createRecipeStepDto: CreateRecipeStepDto,
    @UploadedFile() img: Express.Multer.File,
  ): Promise<RecipeStep> {
    return this.recipeStepService.create(createRecipeStepDto, img);
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
}
