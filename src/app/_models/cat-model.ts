export interface CatModel {
  id: string | undefined; 
  name: string;
  breed: string;
  age: number;
  ownerName: string;
  ownerEmail: string;
  vaccinated: boolean;
}