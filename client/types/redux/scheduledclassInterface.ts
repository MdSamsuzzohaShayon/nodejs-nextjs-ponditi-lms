import { SingleUserInterface } from './userInterface';
import { ClassTypeInterface } from './SubjectClassTuitionmInterface';

export interface ScheduledClassInterface {
  receiverId: number;
  ClassTypeId: number;
  SubjectId: number;
  desc: string;
  date?: string;
  time?: string;
  tutionplace: string;
  tuitionlocation: string;
  start?: string;
}

export interface FetchedScheduledClassInterface {
  id: number;
  desc: string;
  types: string;
  status: string;
  start: string;
  perHourRate: number | null;
  createdAt: string;
  updatedAt: string;
  Sender: SingleUserInterface;
  Recever: SingleUserInterface;
  ClassType: ClassTypeInterface;
  Subject: ClassTypeInterface;
}



export interface SlotInterface {
  id: number;
  slot: number;
  slotName: string;
  ampm: string;
}

export interface TuitionStyle {
  id: number;
  text: string;
  value: string;
}
