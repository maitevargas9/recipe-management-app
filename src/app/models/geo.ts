export enum Continent {
  Europe = 'Europe',
  NorthAmerica = 'North America',
  CentralAmerica = 'Central America',
  SouthAmerica = 'South America',
  Africa = 'Africa',
  Asia = 'Asia',
  Oceania = 'Oceania',
}

export enum Country {
  // Europe
  Spain = 'Spain',
  Portugal = 'Portugal',
  UnitedKingdom = 'United Kingdom',
  Italy = 'Italy',
  Greece = 'Greece',
  Netherlands = 'Netherlands',
  Belgium = 'Belgium',
  Austria = 'Austria',
  Switzerland = 'Switzerland',
  Germany = 'Germany',
  France = 'France',

  // North America
  Canada = 'Canada',
  USA = 'USA',
  Mexico = 'Mexico',

  // Central America
  ElSalvador = 'El Salvador',
  CostaRica = 'Costa Rica',
  Nicaragua = 'Nicaragua',
  Cuba = 'Cuba',
  PuertoRico = 'Puerto Rico',

  // South America
  Argentina = 'Argentina',
  Ecuador = 'Ecuador',
  Chile = 'Chile',
  Peru = 'Peru',
  Brazil = 'Brazil',
  Colombia = 'Colombia',
  Venezuela = 'Venezuela',
  Bolivia = 'Bolivia',

  // Africa
  Egypt = 'Egypt',
  Ethiopia = 'Ethiopia',
  Morocco = 'Morocco',
  Algeria = 'Algeria',
  Madagascar = 'Madagascar',
  Namibia = 'Namibia',
  Kenya = 'Kenya',
  Mauritius = 'Mauritius',
  SouthAfrica = 'South Africa',
  Uganda = 'Uganda',

  // Asia
  China = 'China',
  India = 'India',
  Japan = 'Japan',
  Korea = 'Korea',
  Thailand = 'Thailand',
  Vietnam = 'Vietnam',
  Indonesia = 'Indonesia',
  Philippines = 'Philippines',

  // Oceania
  Australia = 'Australia',
  NewZealand = 'New Zealand',
  Fiji = 'Fiji',
  Samoa = 'Samoa',
  Tonga = 'Tonga',
  Palau = 'Palau',
}

export const CountryToContinent: Record<Country, Continent> = {
  // Europe
  [Country.Spain]: Continent.Europe,
  [Country.Portugal]: Continent.Europe,
  [Country.UnitedKingdom]: Continent.Europe,
  [Country.Italy]: Continent.Europe,
  [Country.Greece]: Continent.Europe,
  [Country.Netherlands]: Continent.Europe,
  [Country.Belgium]: Continent.Europe,
  [Country.Austria]: Continent.Europe,
  [Country.Switzerland]: Continent.Europe,
  [Country.Germany]: Continent.Europe,
  [Country.France]: Continent.Europe,

  // North America
  [Country.Canada]: Continent.NorthAmerica,
  [Country.USA]: Continent.NorthAmerica,
  [Country.Mexico]: Continent.NorthAmerica,

  // Central America
  [Country.ElSalvador]: Continent.CentralAmerica,
  [Country.CostaRica]: Continent.CentralAmerica,
  [Country.Nicaragua]: Continent.CentralAmerica,
  [Country.Cuba]: Continent.CentralAmerica,
  [Country.PuertoRico]: Continent.CentralAmerica,

  // South America
  [Country.Argentina]: Continent.SouthAmerica,
  [Country.Ecuador]: Continent.SouthAmerica,
  [Country.Chile]: Continent.SouthAmerica,
  [Country.Peru]: Continent.SouthAmerica,
  [Country.Brazil]: Continent.SouthAmerica,
  [Country.Colombia]: Continent.SouthAmerica,
  [Country.Venezuela]: Continent.SouthAmerica,
  [Country.Bolivia]: Continent.SouthAmerica,

  // Africa
  [Country.Egypt]: Continent.Africa,
  [Country.Ethiopia]: Continent.Africa,
  [Country.Morocco]: Continent.Africa,
  [Country.Algeria]: Continent.Africa,
  [Country.Madagascar]: Continent.Africa,
  [Country.Namibia]: Continent.Africa,
  [Country.Kenya]: Continent.Africa,
  [Country.Mauritius]: Continent.Africa,
  [Country.SouthAfrica]: Continent.Africa,
  [Country.Uganda]: Continent.Africa,

  // Asia
  [Country.China]: Continent.Asia,
  [Country.India]: Continent.Asia,
  [Country.Japan]: Continent.Asia,
  [Country.Korea]: Continent.Asia,
  [Country.Thailand]: Continent.Asia,
  [Country.Vietnam]: Continent.Asia,
  [Country.Indonesia]: Continent.Asia,
  [Country.Philippines]: Continent.Asia,

  // Oceania
  [Country.Australia]: Continent.Oceania,
  [Country.NewZealand]: Continent.Oceania,
  [Country.Fiji]: Continent.Oceania,
  [Country.Samoa]: Continent.Oceania,
  [Country.Tonga]: Continent.Oceania,
  [Country.Palau]: Continent.Oceania,
};
