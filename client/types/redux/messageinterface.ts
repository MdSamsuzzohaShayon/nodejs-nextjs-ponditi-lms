export interface RoomMessageInterface {
  id: number;
  text: string;
  publish: boolean;
  createdAt?: string;
  updatedAt?: string;
  messagesenderId: number;
  messagereceverId: number;
  RoomId?: number;
}

type InviteSenderReceiverType = {
  id: number;
  name: string;
  phone: string;
};

export interface RoomListInterface {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  invitorId: number;
  invitereceverId: number;
  Roominvitor?: InviteSenderReceiverType;
  Inviterecever?: InviteSenderReceiverType;
}

export type RoomMessageStateType = {
  messagesOfARoom: RoomMessageInterface[];
};

export interface MessageFetchParamsInterface {
  senderId: number;
  receiverId: number;
}
