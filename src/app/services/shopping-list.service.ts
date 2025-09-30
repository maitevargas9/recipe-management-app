import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../models/ingredient';

const STORAGE_KEY = 'shopping_list_v1';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private items$ = new BehaviorSubject<Ingredient[]>(this.load());

  getAll() {
    return this.items$.asObservable();
  }

  addIngredients(ingredients: Ingredient[]) {
    const current = [...this.items$.value];

    ingredients.forEach((ing) => {
      const existing = current.find(
        (i) =>
          i.name.toLowerCase() === ing.name.toLowerCase() && i.unit === ing.unit
      );

      if (existing) {
        existing.amount += ing.amount;
      } else {
        current.push({ ...ing });
      }
    });

    this.save(current);
  }

  removeIngredient(name: string) {
    const updated = this.items$.value.filter(
      (i) => i.name.toLowerCase() !== name.toLowerCase()
    );
    this.save(updated);
  }

  clear() {
    this.save([]);
  }

  private save(items: Ingredient[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    this.items$.next(items);
  }

  private load(): Ingredient[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}
