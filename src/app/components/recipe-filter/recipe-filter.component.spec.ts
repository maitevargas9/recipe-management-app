import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RecipeFilterComponent } from './recipe-filter.component';
import { Category, DietType, MealTime } from '../../models/recipe';
import { IngredientCategory } from '../../models/ingredient';
import { Season, Holiday, Occasion } from '../../models/context';
import { Country, Continent } from '../../models/geo';
import { By } from '@angular/platform-browser';

describe('RecipeFilterComponent', () => {
  let component: RecipeFilterComponent;
  let fixture: ComponentFixture<RecipeFilterComponent>;
  let fb: FormBuilder;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFilterComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeFilterComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);

    // Beispiel-FormGroup
    form = fb.group({
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

    component.form = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have populated option lists', () => {
    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.dietTypes.length).toBeGreaterThan(0);
    expect(component.mealTimes.length).toBeGreaterThan(0);
    expect(component.ingredientCategories).toContain(
      IngredientCategory.Vegetable
    );
    expect(component.continents).toContain(Continent.Europe);
  });

  it('should bind form controls correctly', () => {
    const select = fixture.debugElement.query(
      By.css('select[formControlName="category"]')
    );
    expect(select).toBeTruthy();

    // Setze Testwert und überprüfe Datenbindung
    form.get('category')?.setValue(Category.Dessert);
    fixture.detectChanges();
    expect(component.form.value.category).toEqual(Category.Dessert);
  });

  it('should emit reset event when reset button clicked', () => {
    spyOn(component.reset, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(component.reset.emit).toHaveBeenCalled();
  });

  it('should render all filter fields', () => {
    const fields = [
      'category',
      'dietType',
      'mealTime',
      'ingredientCategory',
      'season',
      'holiday',
      'occasion',
      'country',
      'continent',
      'ingredient',
    ];

    for (const field of fields) {
      const el = fixture.debugElement.query(
        By.css(`[formControlName="${field}"]`)
      );
      expect(el).toBeTruthy(`Expected formControl "${field}" to be present`);
    }
  });
});
