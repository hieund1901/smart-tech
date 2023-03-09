export interface Type {
  number: number;
  string: string;
  time: string;
}

export interface Column {
  id: number;
  type: keyof Type;
  field: string;
}
export interface Compare {
  id: keyof Type;
  comp: string[];
}
