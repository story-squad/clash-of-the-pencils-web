export type FormOnSubmit<FormData = unknown, Response = unknown> = (
  data: FormData,
) => Response | Promise<Response>;

export type FormOnError<Error> = (err: Error) => void | Promise<void>;

export type FormOnSuccess<Response> = (
  response?: Response,
) => void | Promise<void>;

export type FormProps = {
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onError: (error: unknown) => void | unknown;
  onSuccess: () => void;
};
