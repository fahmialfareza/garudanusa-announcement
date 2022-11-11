// Request
export interface ICountdownRequest {
  countdown: string;
}

// Response
export interface ICountdownResponse {
  status: string;
  data: {
    id: number;
    date: string;
  };
  message: string;
}

// Model
export interface ICountdown {
  id: number;
  date: string;
}
