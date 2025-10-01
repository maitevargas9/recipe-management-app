import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() toggleFavorite = new EventEmitter<string>();

  showIngredients = false;

  toggleIngredients() {
    this.showIngredients = !this.showIngredients;
  }

  onEdit() {
    this.edit.emit(this.recipe.id);
  }

  onDelete() {
    this.delete.emit(this.recipe.id);
  }

  onToggleFavorite() {
    this.toggleFavorite.emit(this.recipe.id);
  }
}
