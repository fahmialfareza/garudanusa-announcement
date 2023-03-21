import {
  IAnnouncementResult,
  IAnnouncementsResult,
  IImportExcel,
} from "../models/announcement";
import { IUser } from "../models/auth";
import { IEvent } from "../models/event";

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
  isSuccessUpdate: boolean;
}

export interface EventState {
  error: string | null;
  isSuccess: boolean;
  event: IEvent | null;
}

export interface LoadingState {
  loading: boolean;
}
