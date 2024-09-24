import { HttpStatusCode } from "axios";

export interface APIErrorResponse {
  message: string;
  error?: string;
  statusCode: HttpStatusCode;
}
