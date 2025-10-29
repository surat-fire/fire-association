import { IUser } from "@/models/User";

export interface MemberItem {
  id: string;
  name: string;
  role: string;
  imageDataUrl?: string | null;
}

export interface IUserResponse {
  success: boolean;
  data: IUser[];
}

export interface IUserSpecificResponse {
  success: boolean;
  data: IUser;
}

export interface IUserDeleteResponse {
  success: boolean;
  message: string;
  data: IUser;
}
