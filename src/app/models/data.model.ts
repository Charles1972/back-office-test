export interface IStore {
  name: string;
  category: string;
  employees: string[];
}

export interface IProduct {
  id: string;
  data: IDataProduct;
}

export interface IDataProduct {
  title: string;
  category: string;
  price: number;
  employee?: string;
  description?: string;
  reviews?: string[];
}
export interface IStatsCategories {
  numberOfProducts: number;
  category: string;
}
