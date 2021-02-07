import moment from "moment";

export const currentDate = () => {
  return moment().format("DD-MM-YYYY hh:mm:ss");
};
