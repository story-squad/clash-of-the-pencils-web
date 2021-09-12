export type FormOnSubmit<FormData = unknown, Response = unknown> = (
  data: FormData,
) => Response | Promise<Response>;
export type FormOnError = (err: unknown) => void;
export interface FormProps<
  FormData extends unknown = unknown,
  FormOnSubmitResponse extends unknown = unknown,
> {
  onSubmit: FormOnSubmit<FormData, FormOnSubmitResponse>;
  onError?: FormOnError;
}
