import React, { useEffect } from "react";
import "./AddColor.css";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createColor,
  getAColor,
  updateAColor,
  resetState,
} from "../../../../features/color/colorSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Màu không được để trống"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state?.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Màu thêm thành công!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Màu được cập nhật thành công!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
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
        {getColorId !== undefined ? "Sửa" : "Thêm"} Màu
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            i_class="long-3"
            label="Thêm màu sản phẩm"
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
            {getColorId !== undefined ? "Sửa" : "Thêm"} Màu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
