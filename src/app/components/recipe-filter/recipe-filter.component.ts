import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category, DietType, MealTime } from '../../models/recipe';
import { IngredientCategory } from '../../models/ingredient';
import { Season, Holiday, Occasion } from '../../models/context';
import { Country, Continent } from '../../models/geo';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.scss'],
})
export class RecipeFilterComponent {
  @Input() form!: FormGroup;
  @Output() reset = new EventEmitter<void>();

  categories = Object.values(Category);
  dietTypes = Object.values(DietType);
  mealTimes = Object.values(MealTime);
  ingredientCategories = Object.values(IngredientCategory);
  seasons = Object.values(Season);
  holidays = Object.values(Holiday);
  occasions = Object.values(Occasion);
  countries = Object.values(Country);
  continents = Object.values(Continent);

  onReset() {
    this.reset.emit();
  }
}
