import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../../user/entity/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Comment } from '../../comment/entity/comment.entity';
import { RecipeProduct } from '../../recipe-product/entity/recipe-product.entity';
import { FavouriteRecipe } from '../../favourite-recipe/entity/favourite-recipe.entity';
import { Rating } from '../../rating/entity/rating.entity';
import { RecipeStep } from '../../recipe-step/entity/recipe-step.entity';
import { RecipeFilter } from '../../recipe-filter/entity/recipe-filter.entity';
import { RECIPE_STATUS } from './recipe-statuses';

@Table({ timestamps: false })
export class Recipe extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column
  img: string;

  @Column({ type: DataTypes.TEXT, allowNull: false })
  description: string;

  @Column({ allowNull: false })
  time: number;

  @Column({ allowNull: false })
  servings_number: number;

  @Column({ defaultValue: RECIPE_STATUS.CREATION })
  status: RECIPE_STATUS;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ApiHideProperty()
  @BelongsTo(() => User)
  user: User;

  @ApiHideProperty()
  @HasMany(() => Comment)
  comments: Comment[];

  @ApiHideProperty()
  @HasMany(() => Rating)
  rating: Rating[];

  @ApiHideProperty()
  @HasMany(() => RecipeProduct)
  products: RecipeProduct[];

  @ApiHideProperty()
  @HasMany(() => RecipeFilter)
  filters: RecipeFilter[];

  @ApiHideProperty()
  @HasMany(() => FavouriteRecipe)
  favourite_recipes: FavouriteRecipe[];

  @ApiHideProperty()
  @HasMany(() => RecipeStep)
  steps: RecipeStep[];

  // Uses to correct displaying types for aggregation
  @ApiHideProperty()
  avg_rating: number;

  @ApiHideProperty()
  favourites: number;
}
