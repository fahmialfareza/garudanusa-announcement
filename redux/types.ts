import {
  IAnnouncementResult,
  IAnnouncementsResult,
  IImportExcel,
} from "../models/announcement";
import { IUser } from "../models/auth";

// Auth
export interface AuthState {
  users: IUser[];
  user: IUser | null;
  token: string | null;
  error: string | null;
  isSuccess: boolean;
}

export interface AnnouncementState {
  announcements: IAnnouncementsResult | null;
  announcement: IAnnouncementResult | null;
  importExcel: IImportExcel | null;
  error: string | null;
  isSuccess: boolean;
}

export interface CountdownState {
  error: string | null;
  isSuccess: boolean;
}
