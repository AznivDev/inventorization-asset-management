import store from "../store";
import { monitoringAssetTypes, monitoringCounts, monitoringRequestsCounts } from "./../../services/monitoringService";
import { setMonitoringAssetTypes, setMonitoringCounts, setMonitoringRequestsCounts } from "./reducer";

const { dispatch } = store;

export const dispatchMonitoringCountsAction = () =>
  monitoringCounts().then(async (payload) => dispatch(setMonitoringCounts(payload)));

export const dispatchMonitoringRequestsCountsAction = () =>
  monitoringRequestsCounts().then(async (payload) => dispatch(setMonitoringRequestsCounts(payload)));

export const dispatchMonitoringAssetTypesAction = () =>
  monitoringAssetTypes().then(async (payload) => dispatch(setMonitoringAssetTypes(payload)));
