import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: Recipe;

  @Output() edit = new EventEmitter<Recipe>();
  @Output() delete = new EventEmitter<Recipe>();
  @Output() toggleFavorite = new EventEmitter<Recipe>();
  @Output() addToShoppingList = new EventEmitter<Ingredient[]>();

  currentPortions: number = 1;
  baseIngredients: Ingredient[] = [];

  ngOnInit() {
    this.currentPortions = this.recipe.basePortions || 1;
    this.baseIngredients = JSON.parse(JSON.stringify(this.recipe.ingredients));
  }

  onPortionsChange() {
    if (this.currentPortions < 1) {
      this.currentPortions = 1;
    }

    this.recipe.ingredients = this.baseIngredients.map((ing) => ({
      ...ing,
      amount: (ing.amount * this.currentPortions) / this.recipe.basePortions,
    }));
  }

  onAddToShoppingList() {
    this.addToShoppingList.emit(this.recipe.ingredients);
  }

  onEdit() {
    this.edit.emit(this.recipe);
  }

  onDelete() {
    this.delete.emit(this.recipe);
  }

  onToggleFavorite() {
    this.toggleFavorite.emit(this.recipe);
  }

  getIngredientsText(): string {
    return (
      this.recipe.ingredients
        ?.map((ing) => `${ing.amount} ${ing.unit} ${ing.name}`)
        .join(', ') || ''
    );
  }
}
