export interface ICountry {
  id: string;
  name: string;
}

export interface ICountries {
  countries: ICountry[];
}

export interface IState {
  id: string;
  countryid: string;
  name: string;
}

export interface IStates {
  states: IState[];
  statesByIds?: IState[];
}
