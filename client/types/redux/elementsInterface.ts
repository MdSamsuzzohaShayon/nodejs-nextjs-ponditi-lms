import { MouseEventHandler } from 'react';
import { RoomListInterface } from './messageinterface';
import { AuthUserInfoInterface } from './userInterface';

export interface MenuItem {
  id: number;
  name: string;
  link: string;
}

export interface SocialLinksInterface {
  id: number;
  name: string;
  icon: string;
  link: string;
}

export interface DisplayInboxPropsInterface {
  showInboxes: boolean;
  setShowInboxes: any;
  roomListOfAUser: RoomListInterface[];
  authUserInfo: AuthUserInfoInterface;
}

export interface DisplayNotificationPropsInterface {
  showNotificationBar: boolean; 
  natificationBarCloseHandler: MouseEventHandler<HTMLImageElement>;
  userNotifications: any; 
  linkRedirectHandler: any;
}

