export type Report = {
  title: string;
  description: string;
  places: Place[];
};

export type Place = {
  type: Type;
  name: string;
  location: string;
};

export enum Type {
  City = "Miasto",
  District = "Dzielnica",
  Borough = "Rejon",
  Street = "Ulica",
  Building = "Budynek",
  Highway = "Autostrada",
  Highway_section = "Odcinek autostrady",
}
