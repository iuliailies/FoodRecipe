import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.server";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // only fetch new recipes if we don t have any
        const recipes = this.recipesService.getRecipes();
        if(recipes.length === 0 ) {
            return this.dataStorageService.fetchRecipes(); // returns an observable; the resolver will subscribe for us
        } else {
            return recipes;
        }
    
    }
}