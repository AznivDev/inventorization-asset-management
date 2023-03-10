export interface IAssetTypeModel {
  id: number;
  name: string;
  description?: string;
}

export interface IAssetModel {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  type: string;
  user?: string;
}
