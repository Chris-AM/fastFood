import { Component, OnInit } from '@angular/core';
import { IngredientService } from './ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent implements OnInit {
  constructor(private ingredientService: IngredientService) {}

  ngOnInit( ): void {
    this.getIngredients();
  }

  getIngredients() {
    return this.ingredientService.getIngredients().subscribe({
      next: (ingredients) => {
        console.log('debug ingredients', ingredients);
      },
    });
  }
}
