export type DropZoneKey = string;
export interface DropZoneContainer {
  contents: DropZoneKey | undefined;
  isEmpty: boolean;
}

export const DEFAULT_EMPTY_DROP_ZONE: DropZoneContainer = {
  contents: undefined,
  isEmpty: true,
};
