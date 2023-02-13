import React from 'react';
import { SlotInterface, ScheduledClassInterface } from '../redux/scheduledclassInterface';

export interface LayoutPropsInterface {
  title: string;
  children: React.ReactNode;
}

export interface TimeSlotDisplayPropsInterface {
  offset: number;
  timeSlotList: SlotInterface[];
  slotLimit: number;
  additionalClasses: string;
  initializeSchedule: ScheduledClassInterface
}
