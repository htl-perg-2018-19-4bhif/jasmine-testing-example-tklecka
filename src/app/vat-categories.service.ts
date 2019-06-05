import { Injectable } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks,
  Plants
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {
  constructor() { }

  public getVat(category: VatCategory): number {
    // REPLACE the next line with the necessary code
    if (category === VatCategory.Food) {
      return 20;
    } else if (category === VatCategory.Drinks) {
      return 10;
    } else if (category === VatCategory.Plants) {
      return 13;
    }
    return NaN;
  }
}
