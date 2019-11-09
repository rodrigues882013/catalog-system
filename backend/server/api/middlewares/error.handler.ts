import {Response} from 'express';
import log from "../../common/logger";
import ErrorResponse from '../models/error.response';

export default function errorHandler(err, res: Response) {
  log.error(err);
  res.status(err.status || 500);

  const errorMessage: ErrorResponse = {
    message: handleMessages(err.message)
  };

  res.json(errorMessage);
}

function handleMessages(statusCode) {
  let message = '';

  switch (statusCode) {

    case 404:
      message = "Entity not found";
      break;

    case 400:
      message = "Bad request";
      break;

    case 401:
      message = "Unauthorized";
      break;

    case 403:
      message = "Forbidden";
      break;

    case 405:
      message = "Method not allowed";
      break;

    default:
      message = "Unknown error";
      break;
  }

  return message;
}

