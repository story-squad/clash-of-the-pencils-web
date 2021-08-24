export type ToggleOption =
  | {
      text: string;
      onSelect?: () => void;
    }
  | string;
