/* eslint-disable no-unused-vars */
import React from 'react';

export interface MakeStarPropsIn {
  setStars: (see: React.SyntheticEvent, selectedStar: number) => void;
  limit: number;
}

export interface ModalStateIn {
  open: boolean;
  text: { heading: string; body: string };
}
