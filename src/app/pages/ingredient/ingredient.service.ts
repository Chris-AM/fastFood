import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.electron';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private httpClient: HttpClient) {}

  getIngredients() {
    return this.httpClient.get(`${base_url}/ingredient`);
  }
}
