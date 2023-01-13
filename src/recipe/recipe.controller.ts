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
import { CreateRecipeDto, RetrieveRecipeDto } from './dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Recipe } from './entity/recipe.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  /** Creates the Recipe record */
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() recipeDto: CreateRecipeDto,
    @UploadedFile() img: Express.Multer.File,
  ): Promise<Recipe> {
    return this.recipeService.create(recipeDto, img);
  }

  /** Returns a list of recipes */
  @Get()
  findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  /** Returns the Recipe */
  @Get(':recipe_id')
  findOne(@Param('recipe_id') recipeId: string): Promise<RetrieveRecipeDto> {
    return this.recipeService.findOne(recipeId);
  }

  /** Deletes the recipe */
  @Delete(':recipe_id')
  remove(@Param('recipe_id') recipeId: string) {
    this.recipeService.remove(recipeId);
  }
}
