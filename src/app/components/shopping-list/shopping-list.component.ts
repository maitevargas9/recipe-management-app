import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  items$!: Observable<Ingredient[]>;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.items$ = this.shoppingListService.getAll();
  }

  removeItem(name: string) {
    this.shoppingListService.removeIngredient(name);
  }

  clearList() {
    if (confirm('Should the shopping list really be completely cleared?')) {
      this.shoppingListService.clear();
    }
  }
}
