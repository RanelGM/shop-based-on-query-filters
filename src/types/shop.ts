export type Location = {
  latitude: number;
  longitude: number;
};

export type City = Location & {
  name: string;
  zoom: number;
};

export type Shop = Location & {
  id: string;
  city: City;
  address: string;
  workTime: string;
  subway: string;
};
