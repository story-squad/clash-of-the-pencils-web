export type Places = 1 | 2 | 3;
export type PlaceText = 'first' | 'second' | 'third';

export function getPlaceText(place: Places): PlaceText {
  switch (place) {
    case 1:
      return 'first';
    case 2:
      return 'second';
    case 3:
      return 'third';
  }
}
