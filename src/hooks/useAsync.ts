import { useCallback, useState } from 'react';
import { ErrorMessageType } from '../api/Auth';

export default function useAsync<FunctionReturn, Params extends unknown[]>({
  asyncFunction,
  onSuccess,
  onError,
}: {
  asyncFunction: (...params: Params) => Promise<FunctionReturn>;
  onSuccess?: (newValue: FunctionReturn) => void | Promise<void>;
  onError?: (err: ErrorMessageType) => void | Promise<void>;
}): [
  execute: (...params: Params) => Promise<void>,
  loading: boolean,
  response: FunctionReturn | undefined,
  error: ErrorMessageType | undefined,
] {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<FunctionReturn>();
  const [error, setError] = useState<ErrorMessageType>();

  const execute = useCallback(
    async (...params: Params) => {
      try {
        setLoading(true);
        const response = await asyncFunction(...params);
        await onSuccess?.(response);
        setValue(response);
      } catch (err: any) {
        await onError?.(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  return [execute, loading, value, error];
}
