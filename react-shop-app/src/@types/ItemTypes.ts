export declare type ProductItem = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  amount: number;
};

export declare type APIProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
};
export declare type Rating = {
  rate: number;
  count: number;
};
