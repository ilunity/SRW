import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { DbConnection } from './db-connection';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ProductModule } from './product/product.module';
import { FilterModule } from './filter/filter.module';

const modules = [UserModule, RecipeModule, ProductModule, FilterModule];

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    DbConnection,
    ...modules,
  ],
})
export class AppModule {}
