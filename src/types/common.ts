export type Option = {
  id: string;
  value: string;
};

export type Price = {
  min: number;
  max: number;
};

export type Timeout = ReturnType<typeof setTimeout>;
