import { GuitarType } from "utils/constants";

type UserComment = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: GuitarType;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
  comments: UserComment[];
};

export type Price = {
  min: number;
  max: number;
};
