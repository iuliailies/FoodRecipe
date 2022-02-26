import { Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // input: because we need to get recipe from outside
  // we bind it to "recipe-list.component"

  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
