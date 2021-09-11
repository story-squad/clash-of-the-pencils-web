export type FormOnSuccess<Response = unknown> = (res: Response) => void;
export type FormOnSubmit<FormData = unknown, Response = unknown> = (
  data: FormData,
) => Response;

export interface FormProps<FormData, SubmitResponse> {
  onSubmit: FormOnSubmit<FormData, SubmitResponse>;
  onSuccess: FormOnSuccess<SubmitResponse>;
}
