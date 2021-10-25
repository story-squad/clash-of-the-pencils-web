import { Users } from '..';
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
export type MergeRedirectState = {
  isMerge?: boolean;
  cleverId?: string;
  codename?: string;
};
export function getMergeState(res: CleverMergeResponse): MergeRedirectState {
  return {
    isMerge: true,
    cleverId: res.cleverId,
    codename: res.body.codename,
  };
}

// New response handlers
export function isNew(res: CleverAuthResponse): res is CleverNewResponse {
  const { actionType, body } = (res as CleverNewResponse) ?? {};
  return actionType === 'NEW' && !!body.id && !!body.name;
}
export type NewRedirectState = {
  isNew?: boolean;
  cleverId?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  roleId?: Users.Roles & number;
};
export function getNewState(res: CleverNewResponse): NewRedirectState {
  return {
    isNew: true,
    cleverId: res.body.id,
    firstname: res.body?.name?.first,
    lastname: res.body?.name?.last,
    email: res.body?.email,
    roleId: res.roleId,
  };
}
