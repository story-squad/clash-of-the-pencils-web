import { FormTypes } from '../../forms';

export interface ActivationRequestFormProps {
  onSuccess: () => void;
  onError: FormTypes.FormOnError<unknown>;
  onSubmit?: (param: unknown | void) => Promise<unknown>;
  sendToParent?: boolean;
}
