export type Score = {
  id: string;
  index: number;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  registered: string;
  latitude: string; //maybe number
  longitude: string; //maybe number
  tags: string[];
  friends: {
    id: number;
    name: string;
  }[];
  greeting: string;
  favoriteFruit: string;
};

import * as data from "./test.data.json";
export const myArr: Score[] = data;
