import { Module } from '@nestjs/common';
import { DbConnection } from './db-connection';
import * as path from 'path';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './nested-category/nested-category.module';

const modules = [UserModule, RecipeModule, ProductModule, CategoryModule, AuthModule];

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    DbConnection,
    ...modules,
  ],
})
export class AppModule {}
