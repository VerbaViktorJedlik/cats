import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatModel } from '../_models/cat-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/cats';

  constructor(private http: HttpClient) { }
  
  getAllCats(): Observable<CatModel[]> {
    return this.http.get<CatModel[]>(this.url);
  }
  getCatById(id: string): Observable<CatModel> {
    return this.http.get<CatModel>(`${this.url}/${id}`);
  }
  addCat(cat: CatModel): Observable<CatModel> {
    return this.http.post<CatModel>(this.url, cat);
  }
  updateCat(cat: CatModel): Observable<CatModel> {
    return this.http.put<CatModel>(`${this.url}/${cat.id}`, cat);
  }
  deleteCat(id: string): Observable<CatModel> {
    return this.http.delete<CatModel>(`${this.url}/${id}`);
  }
}