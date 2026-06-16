export interface Country {
  code: string;
  label: string;
}

export interface City {
  id: string;
  countryCode: string;
  label: string;
}
