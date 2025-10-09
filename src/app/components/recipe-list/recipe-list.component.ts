import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Recipe, Category, DietType, MealTime } from '../../models/recipe';
import { Ingredient, IngredientCategory } from '../../models/ingredient';
import { Season, Holiday, Occasion } from '../../models/context';
import { Country, Continent } from '../../models/geo';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;
  filteredRecipes$!: Observable<Recipe[]>;
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

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getAll();

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

    this.filteredRecipes$ = combineLatest([
      this.recipes$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
    ]).pipe(map(([recipes, filters]) => this.applyFilters(recipes, filters)));
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
