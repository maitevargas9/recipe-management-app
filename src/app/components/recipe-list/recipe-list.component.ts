import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getAll();
  }

  toggleFavorite(recipe: Recipe) {
    this.recipeService.toggleFavorite(recipe.id);
  }

  editRecipe(recipe: Recipe) {
    this.router.navigate(['/edit', recipe.id]);
  }

  deleteRecipe(recipe: Recipe) {
    if (confirm(`Is the recipe "${recipe.name}" really to be deleted?`)) {
      this.recipeService.delete(recipe.id);
    }
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
    alert('Ingredients have been added to the shopping list!');
  }
}
