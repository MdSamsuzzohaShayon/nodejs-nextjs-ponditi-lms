import { types } from '../config/keys';

const { ONLINE, TL, SL } = types;

// Notification types
export const INITIATED_CLASS = 'INITIATED_CLASS';
// 'ACCEPT_REQUEST REJECTED_REQUEST START_CLASS'
export const ACCEPT_REQUEST = 'ACCEPT_REQUEST';
export const REJECTED_REQUEST = 'REJECTED_REQUEST';
export const START_CLASS = 'START_CLASS';
export const FINISH_CLASS = 'FINISH_CLASS';

export const tuitionplace = [
  {
    id: 1,
    type: ONLINE,
    text: 'Online',
  },
  {
    id: 2,
    type: TL,
    text: "Teacher's Location",
  },
  {
    id: 3,
    type: SL,
    text: "Student's Location",
  },
];

// Education group
export const SCIENCE = 'SCIENCE';
export const ARTS = 'ARTS';
export const COMMERCE = 'COMMERCE';
export const OTHERS = 'OTHERS';
