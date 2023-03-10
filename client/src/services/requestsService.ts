import { requestAdapter } from "../data/adapters/requests";
import { IRequestModel } from "./../data/models/requests";
import { axiosInstance } from "./../utils/axios";

export interface INewRequestPayload {
  reason: string;
}

// User Services
export const selfRequests = () =>
  axiosInstance({ auth: true })
    .get("requests")
    .then((res): IRequestModel[] => {
      if (!res) throw new Error();

      if (res.data && !res.data.length) return [];

      return res.data.map((request: any) => requestAdapter(request));
    });

export const bulkDeleteRequests = (ids: number[]) =>
  axiosInstance({ auth: true })
    .delete("requests", { data: { ids } })
    .then((res) => {
      if (!res) throw new Error();
    });

export const createRequest = (request: INewRequestPayload) =>
  axiosInstance({ auth: true })
    .post("requests", request)
    .then((res): IRequestModel => {
      if (!res) throw new Error();

      return requestAdapter(res.data);
    });

// Admin Services
export const allRequests = () =>
  axiosInstance({ auth: true })
    .get("/admin/requests")
    .then((res): IRequestModel[] => {
      if (!res) throw new Error();

      if (res.data && !res.data.length) return [];

      return res.data.map((request: any) => requestAdapter(request));
    });

export const bulkApproveRequests = (ids: number[]) =>
  axiosInstance({ auth: true })
    .put("/admin/requests", { ids })
    .then((res) => {
      if (!res) throw new Error();
    });

export const bulkRejectRequests = (ids: number[]) =>
  axiosInstance({ auth: true })
    .delete("/admin/requests", { data: { ids } })
    .then((res) => {
      if (!res) throw new Error();
    });
