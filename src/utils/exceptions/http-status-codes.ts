/**
 * @description Defines HTTP status codes
 */

 export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED_ERROR = 401,
    FORBIDDEN_ERROR = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
 }

 /**
  * @description Define error names
  */

  export enum ErrorNames {
    NOT_FOUND = "NOT_FOUND",
    BAD_REQUEST = "BAD_REQUEST",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
  } 