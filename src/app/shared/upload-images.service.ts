import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UploadImagesService {
  constructor(private readonly httpClient: HttpClient) {}

  uploadImages(
    file: File,
    type: 'user' | 'product' | 'ingredient' | 'menu' | 'drink',
    id: string
  ) {
    const url = `${base_url}/${type}/upload/${id}`;
      const formData = new FormData();
      const token = localStorage.getItem('token');
      formData.append('photo', file);
      return this.httpClient.post(url, formData, {
        headers: {
          'x-token': token,
        },
      });
  }
}
