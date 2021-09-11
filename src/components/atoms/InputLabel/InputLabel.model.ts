type LabelTypes = 'default' | 'required' | 'optional';

export interface ILabelProps {
  label?: string;
  labelType?: LabelTypes;
  tooltip?: boolean;
}
