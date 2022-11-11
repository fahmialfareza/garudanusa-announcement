// Request
export interface IImportExcelRequest {
  announcement: string;
}

export interface ICheckResultRequest {
  phone: string;
}

// Response
export interface IImportExcelResponse {
  status: string;
  data: {
    message: string;
  };
  message: string;
}

export interface ICheckResultResponse {
  status: string;
  data: {
    id: number;
    name: string;
    phone: string;
    city_of_birth: string;
    date_of_birth: string;
    address_from: string;
    school: string;
    result: string;
  };
  message: string;
}

export interface IAnnouncementsResponse {
  status: string;
  data: IAnnouncementsResult;
  message: string;
}

// Model
export interface IAnnouncementResult {
  id: number;
  name: string;
  phone: string;
  city_of_birth: string;
  date_of_birth: string;
  address_from: string;
  school: string;
  result: string;
  total_score: number;
  number: number;
}

export interface IAnnouncementsResult {
  current_page: number;
  data: IAnnouncementResult[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
}

export interface IImportExcel {
  message: String;
}
