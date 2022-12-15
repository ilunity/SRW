import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../../user/entity/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Comment } from '../../comment/comment.entity';
import { RecipeProduct } from '../../recipe-product/recipe-product.entity';
import { SavedRecipe } from '../../saved-recipe/saved-recipe.entity';
import { FavouriteRecipe } from '../../favourite-recipe/favourite-recipe.entity';
import { Rating } from '../../rating/entities/rating.entity';

@Table({ timestamps: false })
export class Recipe extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  img: string;

  @Column({ type: DataTypes.TEXT, allowNull: false })
  description: string;

  @Column({ allowNull: false })
  time: number;

  @Column({ allowNull: false })
  serves_count: number;

  @Column({ defaultValue: true })
  moderation_status: boolean;

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
  @HasMany(() => SavedRecipe)
  saved_recipes: SavedRecipe[];

  @ApiHideProperty()
  @HasMany(() => FavouriteRecipe)
  favourite_recipes: FavouriteRecipe[];
}
