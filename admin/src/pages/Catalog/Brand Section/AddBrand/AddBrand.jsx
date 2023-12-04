import React, { useEffect } from "react";
import "./AddBrand.css";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBrand,
  getABrand,
  updateABrand,
  resetState,
} from "../../../../features/brand/brandSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Tên thương hiệu không được trống"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Thương hiệu thêm thành công!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Thương hiệu cập nhật thành công!");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="adb1-h3">
        {getBrandId !== undefined ? "Sửa" : "Thêm"} Thương hiệu
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            i_class="addbrand-input"
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Thêm tên thương hiệu"
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="adb1-btn" type="Submit">
            {getBrandId !== undefined ? "Sửa" : "Thêm"} Thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
