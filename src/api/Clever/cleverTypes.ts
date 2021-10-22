import { IAuthResponse } from '../Auth/types';
import { IUser, Roles } from '../Users';

// Main response type
export type CleverAuthResponse =
  | CleverSuccessResponse
  | CleverMergeResponse
  | CleverNewResponse;

// Prebuilt response types
export type CleverSuccessResponse = CleverAuthResponseBuilder<
  'SUCCESS',
  IAuthResponse
>;
export type CleverMergeResponse = CleverAuthResponseBuilder<'MERGE', IUser>;
export type CleverNewResponse = CleverAuthResponseBuilder<'NEW', CleverUser>;

// Type builder for response types
export type CleverAuthResponseTypes = 'SUCCESS' | 'MERGE' | 'NEW';
type CleverAuthResponseBuilder<
  Type extends CleverAuthResponseTypes,
  BodyType extends unknown,
> = {
  actionType: Type;
  body: BodyType;
  roleId: Roles & number;
  cleverId: string;
};

// Other Clever API types
export type CleverUser = CleverStudent | CleverTeacher;
interface CleverStudent {
  id: string;
  email?: string;
  name: { first: string; last: string; middle?: string };
  grade: CleverGradeType;
}
interface CleverTeacher {
  id: string;
  email?: string;
  name: { first: string; last: string; middle?: string };
  sections: string[];
}
export type CleverSubjectType =
  | 'english/language arts'
  | 'math'
  | 'science'
  | 'social studies'
  | 'language'
  | 'homeroom/advisory'
  | 'interventions/online learning'
  | 'technology and engineering'
  | 'PE and health'
  | 'arts and music'
  | 'other'
  | '';
export type CleverGradeType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | 'PreKindergarten'
  | 'TransitionalKindergarten'
  | 'Kindergarten'
  | 'InfantToddler'
  | 'Preschool'
  | 'PostGraduate'
  | 'Ungraded'
  | 'Other'
  | '';
