import React, { useEffect } from "react";
import "./AddSize.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createSize,
  getASize,
  updateASize,
  resetState,
} from "../../features/size/sizeSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Tình trạng không được trống"),
});
const AddSize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getSizeId = location.pathname.split("/")[3];
  const newSize = useSelector((state) => state?.size);
  const {
    isSuccess,
    isError,
    isLoading,
    createdSize,
    updatedSize,
    sizeName,
  } = newSize;

  useEffect(() => {
    if (getSizeId !== undefined) {
      dispatch(getASize(getSizeId));
    } else {
      dispatch(resetState());
    }
  }, [getSizeId]);

  useEffect(() => {
    if (isSuccess && createdSize) {
      toast.success("Tình trạng thêm thành công!");
    }
    if (isSuccess && updatedSize) {
      toast.success("Tình trạng được cập nhật thành công!");
      navigate("/admin/size-list");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: sizeName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getSizeId !== undefined) {
        const data = { id: getSizeId, sizeData: values };
        dispatch(updateASize(data));
        dispatch(resetState());
      } else {
        dispatch(createSize(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="adc-h3">
        {getSizeId !== undefined ? "Sửa" : "Thêm"} Tình trạng
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            i_class="long-3"
            label="Thêm tình trạng"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="adc-btn" type="Submit">
            {getSizeId !== undefined ? "Sửa" : "Thêm"} Tình trạng
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSize;
