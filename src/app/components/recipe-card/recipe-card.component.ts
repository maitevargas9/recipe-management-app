import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  @Output() edit = new EventEmitter<Recipe>();
  @Output() delete = new EventEmitter<Recipe>();
  @Output() toggleFavorite = new EventEmitter<Recipe>();
  @Output() addToShoppingList = new EventEmitter<Ingredient[]>();

  onEdit() {
    this.edit.emit(this.recipe);
  }

  onDelete() {
    this.delete.emit(this.recipe);
  }

  onToggleFavorite() {
    this.toggleFavorite.emit(this.recipe);
  }

  onAddToShoppingList() {
    this.addToShoppingList.emit(this.recipe.ingredients);
  }
}
