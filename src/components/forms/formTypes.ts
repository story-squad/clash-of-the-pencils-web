import { ErrorMessageType } from '../../api/Auth';

export type FormOnSubmit<FormData = unknown, Response = unknown> = (
  data: FormData,
) => Response | Promise<Response>;
export type FormOnError<Error> = (err: Error) => void | Promise<void>;
export type FormOnSuccess<Response> = (
  response?: Response,
) => void | Promise<void>;
export interface FormProps<
  FormData = unknown,
  Response = unknown,
  Error = ErrorMessageType,
> {
  onSubmit: FormOnSubmit<FormData, Response>;
  onSuccess?: FormOnSuccess<Response>;
  onError?: FormOnError<Error>;
}
