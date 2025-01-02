import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatModel } from './_models/cat-model';
import { DataService } from './_services/data.service';
import { CatComponent } from "./cat/cat.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  cats: CatModel[] = [];
  new: CatModel | undefined = undefined;
  modify: CatModel | undefined = undefined;
  lastId: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllCats().subscribe({
      next: (data: CatModel[]) => {
        this.cats = data;
        this.lastId = this.cats.length > 0 ? Math.max(...this.cats.map(cat => parseInt(cat.id || '0'))) : 0;
      },
      error: (error: any) => console.error(error)
    });
  }

  newCat() {
    this.new = {
      id: (this.lastId + 1).toString(),
      name: '',
      breed: '',
      age: 0,
      ownerName: '',
      ownerEmail: '',
      vaccinated: false
    };
    this.lastId++;
  }

  doModify(cat: CatModel) {
    this.modify = JSON.parse(JSON.stringify(cat));
  }

  save(cat: CatModel) {
    if (this.new != undefined) {
      this.dataService.addCat(cat).subscribe({
        next: (data: CatModel) => {
          this.cats.push(data);
          this.new = undefined;
        },
        error: (error: any) => console.error(error)
      });
    } else {
      this.dataService.updateCat(cat).subscribe({
        next: (data: CatModel) => {
          const index = this.cats.findIndex((r) => r.id === data.id);
          this.cats[index] = data;
          this.modify = undefined;
        },
        error: (error: any) => console.error(error)
      });
    }
  }

  doDelete(cat: CatModel) {
    if (cat.id) {
      this.dataService.deleteCat(cat.id).subscribe({
        next: (data: CatModel) => {
          const index = this.cats.findIndex((r) => r.id === data.id);
          this.cats.splice(index, 1);
        },
        error: (error: any) => console.error(error)
      });
    }
  }
}