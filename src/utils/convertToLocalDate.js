import moment from "moment";

import { DATE_TIME_FORMAT } from "constants/appConstants";

// convert datetime to local datetime: requires date as parameter
// appending z to the date to specifies the parametrs datetime string is in UTC
export const convertToLocalDate = (date) =>
  moment(date + "z").format(DATE_TIME_FORMAT);
