import { IMonitoringAssetType } from "../data/models/monitoring";
import { axiosInstance } from "../utils/axios";

const ADMIN_MONIROTING_URL = "/admin/monitoring";

export interface IMonitoringCountsPayload {
  assetTypes: number;
  availableAssets: number;
  pendingRequests: number;
  registeredUsers: number;
  roles: number;
}

export interface IMonitoringRequestsCountsPayload {
  pending: number;
  approved: number;
  rejected: number;
}

export const monitoringCounts = () =>
  axiosInstance({ auth: true })
    .get(`${ADMIN_MONIROTING_URL}/counts`)
    .then((res): IMonitoringCountsPayload => {
      if (!res) throw new Error();

      return res.data;
    });

export const monitoringRequestsCounts = () =>
  axiosInstance({ auth: true })
    .get(`${ADMIN_MONIROTING_URL}/requests`)
    .then((res): IMonitoringRequestsCountsPayload => res.data);

export const monitoringAssetTypes = () =>
  axiosInstance({ auth: true })
    .get(`${ADMIN_MONIROTING_URL}/types`)
    .then((res): IMonitoringAssetType[] => res.data);
