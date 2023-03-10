import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/src/createAction";

import { IAssetModel, IAssetTypeModel } from "../../data/models/assets";

interface IState {
  types: IAssetTypeModel[];
  assets: IAssetModel[];
}

const INITIAL_STATE: IState = {
  types: [],
  assets: [],
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState: INITIAL_STATE,
  reducers: {
    setAssets: (state, action: PayloadAction<IAssetModel[]>) => {
      state.assets = action.payload;
    },
    addAsset: (state, action: PayloadAction<IAssetModel>) => {
      state.assets.push(action.payload);
    },
    bulkDeleteAssets: (state, action: PayloadAction<number[]>) => {
      const ids = action.payload;
      state.assets = state.assets.filter((asset) => !ids.includes(asset.id));
    },
    setAssetTypes: (state, action: PayloadAction<IAssetTypeModel[]>) => {
      state.types = action.payload;
    },
    addType: (state, action: PayloadAction<IAssetTypeModel>) => {
      state.types.push(action.payload);
    },
    bulkDeleteTypes: (state, action: PayloadAction<number[]>) => {
      const ids = action.payload;
      state.types = state.types.filter((type) => !ids.includes(type.id));
    },
  },
});

export const { setAssets, addAsset, bulkDeleteAssets, setAssetTypes, addType, bulkDeleteTypes } = assetsSlice.actions;

export default assetsSlice.reducer;
