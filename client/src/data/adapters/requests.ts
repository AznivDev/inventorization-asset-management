import { dateParser } from "../../utils/parser";
import { IRequestModel } from "./../models/requests";

export const requestAdapter = (data: any): IRequestModel => {
  if (!data) throw new Error("No data provided to requestAdapter");

  const { id, status, action_date, reason, user, createdAt } = data;

  if (!id || !status || !reason || !createdAt) throw new Error("Invalid data provided to requestAdapter");

  const formattedActionDate = action_date && dateParser(action_date);

  const adaptedRequest: IRequestModel = {
    id,
    status,
    actionDate: formattedActionDate,
    reason,
    createdAt: dateParser(createdAt),
    owner: user?.email,
  };

  return adaptedRequest;
};
