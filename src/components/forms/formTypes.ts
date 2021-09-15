export type FormOnSubmit<FormData = unknown> = (
  data: FormData,
) => void | Promise<void>;
export type FormOnError = (err: unknown) => void;
export interface FormProps<FormData extends unknown = unknown> {
  onSubmit: FormOnSubmit<FormData>;
  onError?: FormOnError;
}
