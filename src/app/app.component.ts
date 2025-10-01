import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Recipe Management App';

  constructor(private router: Router) {}

  goToRecipes() {
    this.router.navigate(['/']);
  }

  createRecipe() {
    this.router.navigate(['/create']);
  }

  goToShoppingList() {
    this.router.navigate(['/shopping-list']);
  }
}
