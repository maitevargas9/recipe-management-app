import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Recipe, Category, DietType, MealTime } from '../models/recipe';
import { IngredientCategory } from '../models/ingredient';
import { Unit } from '../models/unit';
import { Country } from '../models/geo';

const STORAGE_KEY = 'recipes_v1';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes$: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(
    this.load()
  );

  getAll(): Observable<Recipe[]> {
    return this.recipes$.asObservable();
  }

  getFavorites(): Observable<Recipe[]> {
    return this.recipes$
      .asObservable()
      .pipe(map((recipes) => recipes.filter((r) => r.favorite)));
  }

  getById(id: string): Recipe | undefined {
    return this.recipes$.value.find((r) => r.id === id);
  }

  add(recipe: Recipe) {
    const newRecipe: Recipe = {
      ...recipe,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...this.recipes$.value, newRecipe];
    this.save(updated);
    return newRecipe;
  }

  update(id: string, changes: Partial<Recipe>) {
    const updated = this.recipes$.value.map((r) =>
      r.id === id ? { ...r, ...changes } : r
    );
    this.save(updated);
  }

  delete(id: string) {
    const updated = this.recipes$.value.filter((r) => r.id !== id);
    this.save(updated);
  }

  toggleFavorite(id: string) {
    const updated = this.recipes$.value.map((r) =>
      r.id === id ? { ...r, favorite: !r.favorite } : r
    );
    this.save(updated);
  }

  private load(): Recipe[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const demo = this.demoData();
      this.save(demo);
      return demo;
    }
    return JSON.parse(raw);
  }

  private save(recipes: Recipe[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    this.recipes$.next(recipes);
  }

  private demoData(): Recipe[] {
    return [
      {
        id: 'demo-1',
        name: 'Spaghetti Pomodoro',
        description: 'Klassische italienische Pasta mit Tomatensauce',
        basePortions: 2,
        categories: [Category.MainCourse],
        dietTypes: [DietType.Vegetarian],
        mealTimes: [MealTime.Lunch, MealTime.Dinner],
        ingredients: [
          {
            id: '1',
            name: 'Spaghetti',
            amount: 200,
            unit: Unit.Gram,
            category: IngredientCategory.Grain,
          },
          {
            id: '2',
            name: 'Tomaten',
            amount: 300,
            unit: Unit.Gram,
            category: IngredientCategory.Vegetable,
          },
          {
            id: '3',
            name: 'Olivenöl',
            amount: 2,
            unit: Unit.Tablespoon,
            category: IngredientCategory.Oil,
          },
        ],
        favorite: false,
        countries: [Country.Italy],
        continents: [],
        seasons: [],
        holidays: [],
        occasions: [],
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
