export enum COLLCTION {
  BARNABAS = "Barnabas",
  MENTEES = "Mentees",
  BARNABASDAIRIES = "BarnabasDiaries",
}

export interface BarnabasType {
  userId: string;
  name: string;
  gender: string;
  birthday: string;
  phone: string;
  cardinalNumber: string;
}
