import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto, ReadRecipeDto } from './dto';
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

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
    private recipeStepService: RecipeStepService,
    private recipeFilterService: RecipeFilterService,
  ) {}

  /** Creates the Recipe record */
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() img: Express.Multer.File,
  ): Promise<Recipe> {
    return this.recipeService.create(createRecipeDto, img);
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

  /** Deletes the recipe */
  @Delete(':recipe_id')
  remove(@Param('recipe_id') recipeId: number) {
    this.recipeService.remove(recipeId);
  }

  // ---------- steps ----------

  /** Added the recipe step */
  @ApiConsumes('multipart/form-data')
  @Post('step')
  @UseInterceptors(FileInterceptor('file'))
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
}
