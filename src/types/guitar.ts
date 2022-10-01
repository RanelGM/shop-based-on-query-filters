import { GuitarType } from "utils/constants";

export type CommentToServer = {
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  guitarId: number;
};

export type UserComment = CommentToServer & {
  id: string;
  createAt: string;
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
