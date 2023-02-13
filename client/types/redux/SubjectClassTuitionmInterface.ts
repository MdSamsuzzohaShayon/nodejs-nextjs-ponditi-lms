/* eslint-disable no-redeclare */
interface BaseClassTypeInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}


export interface TuitionmInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  ClassTypes?: BaseClassTypeInterface[];
}


export interface SubjectInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  ClassTypes?: BaseClassTypeInterface[];
}


export interface ClassTypeInterface extends BaseClassTypeInterface {
  Tuitionms?: TuitionmInterface[];
  Subjects?: SubjectInterface[];
}
