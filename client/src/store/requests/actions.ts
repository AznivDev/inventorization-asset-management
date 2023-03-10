import {
  INewRequestPayload,
  allRequests,
  bulkApproveRequests,
  bulkDeleteRequests as bulkDeleteService,
  bulkRejectRequests,
  createRequest,
  selfRequests,
} from "../../services/requestsService";
import store from "../store";
import { TRequestStatus } from "./../../data/models/requests";
import { addRequest, bulkChangeRequestsStatus, bulkDeleteRequests, setRequests } from "./reducer";

const { dispatch } = store;

// User Actions
export const dispatchSelfRequestsAction = () => selfRequests().then(async (payload) => dispatch(setRequests(payload)));

export const dispatchBulkDeleteRequestsAction = (ids: number[]) =>
  bulkDeleteService(ids).then(async () => dispatch(bulkDeleteRequests(ids)));

export const dispatchCreateRequestAction = (request: INewRequestPayload) =>
  createRequest(request).then(async (payload) => dispatch(addRequest(payload)));

// Admin Actions
export const dispatchAllRequestsAction = () => allRequests().then(async (payload) => dispatch(setRequests(payload)));

export const dispatchBulkChangeRequestsStatusAction = async (ids: number[], status: TRequestStatus) => {
  const service = status === "approved" ? bulkApproveRequests : bulkRejectRequests;

  return service(ids).then(async () => dispatch(bulkChangeRequestsStatus({ ids, status })));
};
