import { stringify } from 'query-string';
import {
  CleverAuthResponse,
  CleverMergeResponse,
  CleverNewResponse,
  CleverSuccessResponse,
} from './cleverTypes';

// Success response helpers
export function isSuccess(
  res: CleverAuthResponse,
): res is CleverSuccessResponse {
  const { actionType, body } = (res as CleverSuccessResponse) ?? {};
  return actionType === 'SUCCESS' && !!body.token && !!body.user;
}

// Merge response helpers
export function isMerge(res: CleverAuthResponse): res is CleverMergeResponse {
  const { actionType, body } = (res as CleverMergeResponse) ?? {};
  return actionType === 'MERGE' && !!body?.codename && !!body?.email;
}
export function getMergeParams(res: CleverMergeResponse): string {
  return stringify({
    isMerge: true,
    cleverId: res.cleverId,
    codename: res.body.codename,
  });
}

// New response handlers
export function isNew(res: CleverAuthResponse): res is CleverNewResponse {
  const { actionType, body } = (res as CleverNewResponse) ?? {};
  return actionType === 'NEW' && !body.id && !body.name;
}
export function getNewParams(res: CleverNewResponse): string {
  return stringify({
    isNew: true,
    cleverId: res.body.id,
    roleId: res.roleId,
    firstname: res.body?.name?.first,
    lastname: res.body?.name?.last,
    email: res.body?.email,
  });
}
