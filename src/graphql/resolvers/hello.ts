import "reflect-metadata";
import { Resolver, Query, Arg, Args } from "type-graphql";
import { Hello } from "../schemas/hello";

@Resolver(Hello)
class HelloResolver {
  hellows = [{ message: "bruh" }, { message: "whaa" }];

  constructor() {}

  @Query(() => [Hello])
  async hellos() {
    return this.hellows;
  }

  @Query(() => Hello, { nullable: true })
  async hello(@Arg("id") id: number) {
    return this.hellows[id];
  }

  //   @Mutation((returns) => Recipe)
  //   @Authorized()
  //   addRecipe(
  //     @Arg("newRecipeData") newRecipeData: NewRecipeInput,
  //     @Ctx("user") user: User
  //   ): Promise<Recipe> {
  //     return this.recipeService.addNew({ data: newRecipeData, user });
  //   }

  //   @Mutation((returns) => Boolean)
  //   @Authorized(Roles.Admin)
  //   async removeRecipe(@Arg("id") id: string) {
  //     try {
  //       await this.recipeService.removeById(id);
  //       return true;
  //     } catch {
  //       return false;
  //     }
  //   }
}

export default HelloResolver;
