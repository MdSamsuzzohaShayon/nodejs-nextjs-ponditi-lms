import { AuthUserInfoInterface } from '../redux/userInterface';

export interface DataInterface {
  message?: string;
  receiverId?: number | null;
  senderId?: number | null;
}

export interface ChatPropsInterface {
  receiverId: number | null;
  authUserInfo: AuthUserInfoInterface;
}

export interface DetailPropsInterface {
  userDetail: any;
  update: boolean;
  search: boolean;
  userId: number;
}


