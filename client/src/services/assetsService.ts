import { IAssetModel, IAssetTypeModel } from "../data/models/assets";
import { axiosInstance } from "../utils/axios";
import { assetAdapter, assetTypeAdapter } from "./../data/adapters/assets";

export interface ICreateAssetPayload {
  name: string;
  typeId: number;
}

export interface ICreateAssetsPayload {
  name: string;
  typeId: number;
  count: number;
}

export interface ICreateAssetTypePayload {
  name: string;
  description?: string;
}

export interface IBulkAssignAssetsPayload {
  ids: number[];
  userId: number;
}

// User Services
export const selfAssets = () =>
  axiosInstance({ auth: true })
    .get("assets")
    .then((res): IAssetModel[] => {
      if (!res) throw new Error();

      if (res.data && !res.data.length) return [];

      return res.data.map((asset: any) => assetAdapter(asset));
    });

// Admin Services
export const allAssets = () =>
  axiosInstance({ auth: true })
    .get("/admin/assets")
    .then((res): IAssetModel[] => {
      if (!res) throw new Error();

      if (res.data && !res.data.length) return [];

      return res.data.map((asset: any) => assetAdapter(asset));
    });

export const bulkDeleteAssets = (ids: number[]) =>
  axiosInstance({ auth: true })
    .delete("/admin/assets", { data: { ids } })
    .then((res) => {
      if (!res) throw new Error();
    });

export const assetTypes = () =>
  axiosInstance({ auth: true })
    .get("/admin/assets/types")
    .then((res): IAssetTypeModel[] => {
      if (!res) throw new Error();

      if (res.data && !res.data.length) return [];

      return res.data.map((assetType: any) => assetTypeAdapter(assetType));
    });

export const createAsset = (asset: ICreateAssetPayload) =>
  axiosInstance({ auth: true })
    .post("/admin/assets", asset)
    .then((res): IAssetModel => {
      if (!res) throw new Error();

      return assetAdapter(res.data);
    });

export const createAssets = (payload: ICreateAssetsPayload) =>
  axiosInstance({ auth: true })
    .post("/admin/assets/bulk", payload)
    .then((res) => {
      if (!res) throw new Error();
    });

export const createType = (type: ICreateAssetTypePayload) =>
  axiosInstance({ auth: true })
    .post("/admin/assets/types", type)
    .then((res): IAssetTypeModel => {
      if (!res) throw new Error();

      return assetTypeAdapter(res.data);
    });

export const bulkDeleteTypes = (ids: number[]) =>
  axiosInstance({ auth: true })
    .delete("/admin/assets/types", { data: { ids } })
    .then((res) => {
      if (!res) throw new Error();
    });

export const bulkAssignAssets = (payload: IBulkAssignAssetsPayload) =>
  axiosInstance({ auth: true })
    .put(`/admin/users/${payload.userId}/assets/assign`, { assets: payload.ids })
    .then((res) => {
      if (!res) throw new Error();
    });

export const bulkUnassignAssets = (ids: number[]) =>
  axiosInstance({ auth: true })
    .put("/admin/assets/unassign", { ids })
    .then((res) => {
      if (!res) throw new Error();
    });
