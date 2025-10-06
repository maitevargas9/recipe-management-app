import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { RecipeService } from '../../services/recipe.service';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let recipeServiceMock: any;

  beforeEach(async () => {
    recipeServiceMock = {
      getFavorites: jasmine.createSpy('getFavorites').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [{ provide: RecipeService, useValue: recipeServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
