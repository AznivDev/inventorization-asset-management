import store from "../store";
import {
  IBulkAssignAssetsPayload,
  ICreateAssetPayload,
  ICreateAssetTypePayload,
  ICreateAssetsPayload,
  allAssets,
  assetTypes,
  bulkAssignAssets,
  bulkDeleteAssets as bulkDeleteService,
  bulkUnassignAssets,
  createAsset,
  createAssets,
  createType,
  selfAssets,
} from "./../../services/assetsService";
import { bulkDeleteTypes as bulkDeleteTypesService } from "./../../services/assetsService";
import { addAsset, addType, bulkDeleteAssets, bulkDeleteTypes, setAssetTypes, setAssets } from "./reducer";

const { dispatch } = store;

// User Actions
export const dispatchSelfAssetsAction = () => selfAssets().then(async (payload) => dispatch(setAssets(payload)));

// Admin Actions
export const dispatchAllAssetsAction = () => allAssets().then(async (payload) => dispatch(setAssets(payload)));

export const dispatchBulkDeleteAssetsAction = (ids: number[]) =>
  bulkDeleteService(ids).then(async () => dispatch(bulkDeleteAssets(ids)));

export const dispatchAssetTypesAction = () => assetTypes().then(async (payload) => dispatch(setAssetTypes(payload)));

export const dispatchCreateAssetAction = (payload: ICreateAssetPayload) =>
  createAsset(payload).then(async (asset) => dispatch(addAsset(asset)));

export const dispatchCreateAssetsAction = (payload: ICreateAssetsPayload) => createAssets(payload);

export const dispatchCreateTypeAction = (payload: ICreateAssetTypePayload) =>
  createType(payload).then(async (type) => dispatch(addType(type)));

export const dispatchBulkDeleteTypesAction = (ids: number[]) =>
  bulkDeleteTypesService(ids).then(async () => dispatch(bulkDeleteTypes(ids)));

export const dispatchBulkAssignAssetsAction = (payload: IBulkAssignAssetsPayload) => bulkAssignAssets(payload);

export const dispatchBulkUnassignAssetsAction = (ids: number[]) => bulkUnassignAssets(ids);
