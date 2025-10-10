import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, startWith, map } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeFilterComponent } from '../recipe-filter/recipe-filter.component';
import { Category, DietType, MealTime } from '../../models/recipe';
import { IngredientCategory } from '../../models/ingredient';
import { Season, Holiday, Occasion } from '../../models/context';
import { Country, Continent } from '../../models/geo';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipeCardComponent,
    RecipeFilterComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites$!: Observable<Recipe[]>;
  filteredFavorites$!: Observable<Recipe[]>;
  filterForm!: FormGroup;

  categories = Object.values(Category);
  dietTypes = Object.values(DietType);
  mealTimes = Object.values(MealTime);
  ingredientCategories = Object.values(IngredientCategory);
  seasons = Object.values(Season);
  holidays = Object.values(Holiday);
  occasions = Object.values(Occasion);
  countries = Object.values(Country);
  continents = Object.values(Continent);

  constructor(private recipeService: RecipeService, private fb: FormBuilder) {}

  ngOnInit() {
    this.favorites$ = this.recipeService.getFavorites();

    this.filterForm = this.fb.group({
      category: [''],
      dietType: [''],
      mealTime: [''],
      ingredientCategory: [''],
      season: [''],
      holiday: [''],
      occasion: [''],
      country: [''],
      continent: [''],
      ingredient: [''],
    });

    this.filteredFavorites$ = combineLatest([
      this.favorites$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
    ]).pipe(
      map(([favorites, filters]) => this.applyFilters(favorites, filters))
    );
  }

  private applyFilters(recipes: Recipe[], filters: any): Recipe[] {
    const {
      category,
      dietType,
      mealTime,
      ingredientCategory,
      season,
      holiday,
      occasion,
      country,
      continent,
      ingredient,
    } = filters;

    return recipes.filter((r) => {
      const matchesCategory = !category || r.categories.includes(category);
      const matchesDiet = !dietType || r.dietTypes.includes(dietType);
      const matchesMealTime = !mealTime || r.mealTimes.includes(mealTime);
      const matchesIngredientCategory =
        !ingredientCategory ||
        this.ingredientCategories.includes(ingredientCategory);
      const matchesSeason = !season || r.seasons?.includes(season);
      const matchesHoliday = !holiday || r.holidays?.includes(holiday);
      const matchesOccasion = !occasion || r.occasions?.includes(occasion);
      const matchesCountry = !country || r.countries?.includes(country);
      const matchesContinent = !continent || r.continents?.includes(continent);
      const matchesIngredient =
        !ingredient ||
        r.ingredients.some((i) =>
          i.name.toLowerCase().includes(ingredient.toLowerCase())
        );

      return (
        matchesCategory &&
        matchesDiet &&
        matchesMealTime &&
        matchesIngredientCategory &&
        matchesSeason &&
        matchesHoliday &&
        matchesOccasion &&
        matchesCountry &&
        matchesContinent &&
        matchesIngredient
      );
    });
  }

  resetFilters() {
    this.filterForm.reset();
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
