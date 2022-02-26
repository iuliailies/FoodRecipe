import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    recipeSelected = new EventEmitter<Recipe>();
    
//     private recipes: Recipe[] = [
//     new Recipe('A Test Recipe', 
//     'Testing the recipe', 
//     'https://img.delicious.com.au/Whdi4i8g/w759-h506-cfill/del/2021/05/slow-roasted-butter-eggplant-curry-152139-2.jpg',
//     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
//     new Recipe('A Test Recipe 2', 
//     'Testing another recipe', 
//     'https://img.delicious.com.au/Whdi4i8g/w759-h506-cfill/del/2021/05/slow-roasted-butter-eggplant-curry-152139-2.jpg',
//     [new Ingredient('Buns', 1), new Ingredient('French Fries', 22)]),
// ];
private recipes: Recipe[] = [];

constructor(private slService: ShoppingListService) {}

getRecipes() {
    return this.recipes.slice(); // return copy of the array
}

getRecipe(index: number) {
    return this.recipes[index];
}

addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
}

addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
}

updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
}

deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
}

setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
}
}