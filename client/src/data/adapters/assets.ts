import { dateParser } from "../../utils/parser";
import { IAssetModel, IAssetTypeModel } from "./../models/assets";

export const assetAdapter = (data: any): IAssetModel => {
  if (!data) throw new Error("No data provided to assetAdapter");

  const { id, uuid, name, createdAt, type, user } = data;

  if (!id || !uuid || !name || !createdAt || !type) throw new Error("Invalid data provided to assetAdapter");

  const adaptedAsset: IAssetModel = {
    id,
    uuid,
    name,
    type: type.name,
    createdAt: dateParser(createdAt),
    user: user ? `${user.name} ${user.lastname}` : "-",
  };

  return adaptedAsset;
};

export const assetTypeAdapter = (data: any): IAssetTypeModel => {
  if (!data) throw new Error("No data provided to assetTypesAdapter");

  const { id, name, description } = data;

  if (!id || !name) throw new Error("Invalid data provided to assetTypesAdapter");

  const adaptedAssetType = {
    id,
    name,
    description: description || "-",
  };

  return adaptedAssetType;
};
