export declare type Root = Result[];

export declare type Result = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export declare type Rating = {
  rate: number;
  count: number;
};
