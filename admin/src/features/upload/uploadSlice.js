import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      const message = await uploadService.deleteImg(id);
      return {
        message,
        removeImgId: id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const setImg = createAction("setImg");

function removeObjectByPublicId(imagesList, publicId) {
  return imagesList.filter((image) => image.public_id !== publicId);
}
const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const resetStateUpload = createAction("Reset_all_upload");

export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImg: (state, action) => {
      state.images = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        console.log(action);

        const newImgState = [...state.images];
        let newImgList = removeObjectByPublicId(
          newImgState,
          action.payload.removeImgId
        );
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.images = newImgList;
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetStateUpload, () => initialState);
;
    // .addCase(setImg, (state, action) => {
    //   console.log("action: ", action);
    //   state.images = action.imgList;
    // });
  },
});
export const { setImg } = uploadSlice.actions;
export default uploadSlice.reducer;
