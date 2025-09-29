import { Ingredient } from './ingredient';
import { Season, Holiday, Occasion } from './context';
import { Country, Continent } from './geo';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  basePortions: number;

  categories: Category[];
  dietTypes: DietType[];
  ingredients: Ingredient[];
  mealTimes: MealTime[];

  favorite?: boolean;

  seasons?: Season[];
  holidays?: Holiday[];
  occasions?: Occasion[];

  countries?: Country[];
  continents?: Continent[];

  createdAt?: string;
}

export enum Category {
  Appetizer = 'Appetizer',
  MainCourse = 'Main course',
  Dessert = 'Dessert',
  Snack = 'Snack',
}

export enum DietType {
  Omnivore = 'Omnivore',
  Vegetarian = 'Vegetarian',
  Vegan = 'Vegan',
}

export enum MealTime {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Brunch = 'Brunch',
  AfternoonTea = 'Afternoon Tea',
  Barbecue = 'Barbecue',
}
