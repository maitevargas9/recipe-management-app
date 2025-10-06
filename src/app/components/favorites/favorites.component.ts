import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites$!: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.favorites$ = this.recipeService.getFavorites();
  }

  toggleFavorite(recipe: Recipe) {
    this.recipeService.toggleFavorite(recipe.id);
  }

  deleteRecipe(recipe: Recipe) {
    if (confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
      this.recipeService.delete(recipe.id);
    }
  }
}
