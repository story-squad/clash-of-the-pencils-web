export type FormOnSubmit<FormData = unknown, Response = unknown> = (
  data: FormData,
) => Response | Promise<Response>;

export type FormOnError<Error> = (err: Error) => void | Promise<void>;

export type FormOnSuccess<Response> = (
  response?: Response,
) => void | Promise<void>;

declare type ErrorWithBody = Error & {
  body?: Record<string, unknown>;
};
declare type SubmitType = Record<string, unknown> | FormData;
declare type ErrorType = void | ErrorWithBody | Promise<void | ErrorWithBody>;
declare type SuccessType = void | Promise<void>;

export type FormProps = {
  onSubmit: (data?: SubmitType) => Promise<void>;
  onError?: (err: unknown) => ErrorType;
  onSuccess: () => SuccessType;
};
