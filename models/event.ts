// Request
export interface IEventRequest {
  date: string;
  countdown: string | null;
  event_name: string;
  desktop_photo: Blob | undefined;
  mobile_photo: Blob | undefined;
  header_footer_name: string;
  selection_phase: string;
  result_pass_text: string;
  result_did_not_pass_text: string;
  note: string;
}

// Response
export interface IEventResponse {
  status: string;
  data: {
    id: number;
    date: string;
    event_name: string;
    desktop_photo: string;
    mobile_photo: string;
    header_footer_name: string;
    selection_phase: string;
    result_pass_text: string;
    result_did_not_pass_text: string;
    note: string;
  };
  message: string;
}

// Model
export interface IEvent {
  id: number;
  date: string;
  event_name: string;
  desktop_photo: string;
  mobile_photo: string;
  header_footer_name: string;
  selection_phase: string;
  result_pass_text: string;
  result_did_not_pass_text: string;
  note: string;
}
