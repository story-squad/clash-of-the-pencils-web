import { ErrorMessageType } from '../../../api/Auth';
import { FormTypes } from '../../forms';

export interface ActivationRequestFormProps {
  onSuccess: () => void;
  onError: FormTypes.FormOnError<ErrorMessageType>;
  onSubmit?: (param: unknown | void) => Promise<unknown>;
  sendToParent?: boolean;
}
