import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe, Category, DietType, MealTime } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { Unit } from '../../models/unit';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  recipeId?: string;

  categories = Object.values(Category);
  dietTypes = Object.values(DietType);
  mealTimes = Object.values(MealTime);
  units = Object.values(Unit);

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') || undefined;
    this.editMode = !!this.recipeId;

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      basePortions: [1, [Validators.required, Validators.min(1)]],
      categories: [[]],
      dietTypes: [[]],
      mealTimes: [[]],
      ingredients: this.fb.array([]),
    });

    if (this.editMode && this.recipeId) {
      const recipe = this.recipeService.getById(this.recipeId);
      if (recipe) {
        this.patchForm(recipe);
      }
    }
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient(ingredient?: Ingredient) {
    this.ingredients.push(
      this.fb.group({
        name: [ingredient?.name || '', Validators.required],
        amount: [
          ingredient?.amount || 0,
          [Validators.required, Validators.min(0.1)],
        ],
        unit: [ingredient?.unit || Unit.Gram, Validators.required],
      })
    );
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  patchForm(recipe: Recipe) {
    this.form.patchValue({
      name: recipe.name,
      description: recipe.description,
      basePortions: recipe.basePortions,
      categories: recipe.categories,
      dietTypes: recipe.dietTypes,
      mealTimes: recipe.mealTimes,
    });

    recipe.ingredients.forEach((ing) => this.addIngredient(ing));
  }

  onCheckboxChange(event: Event, controlName: string, value: any) {
    const checkbox = event.target as HTMLInputElement;
    const current = this.form.get(controlName)?.value || [];

    if (checkbox.checked) {
      this.form.get(controlName)?.setValue([...current, value]);
    } else {
      this.form
        .get(controlName)
        ?.setValue(current.filter((v: any) => v !== value));
    }
  }

  save() {
    if (this.form.invalid) return;

    const recipe: Recipe = {
      id: this.recipeId || '',
      ...this.form.value,
      ingredients: this.form.value.ingredients,
    };

    if (this.editMode && this.recipeId) {
      this.recipeService.update(this.recipeId, recipe);
    } else {
      this.recipeService.add(recipe);
    }

    this.router.navigate(['/']);
  }
}
