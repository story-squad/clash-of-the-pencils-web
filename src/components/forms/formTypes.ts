export type FormOnSubmit<FormData = unknown, Response = unknown> = (
  data: FormData,
) => Response | Promise<Response>;
export type FormOnError = (err: unknown) => void;
export interface FormProps<
  FormData extends unknown = unknown,
  Response = unknown,
> {
  onSubmit: FormOnSubmit<FormData, Response>;
  onSuccess?: () => void;
  onError?: FormOnError;
  defaultValues?: Partial<FormData>;
}
