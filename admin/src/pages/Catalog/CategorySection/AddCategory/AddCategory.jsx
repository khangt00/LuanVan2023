import React, { useEffect } from "react";
import "./AddCategory.css";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../../../../features/pcategory/pcategorySlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Tên danh mục không được trống"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getPCatId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Danh mục thêm thành công!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Danh mục cập nhật thành công!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="adc1-h3">
        {getPCatId !== undefined ? "Sửa" : "Thêm"} Danh mục
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            i_class="addCat-input"
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Thêm danh mục sản phẩm"
            id="category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="adc1-btn" type="Submit">
            {getPCatId !== undefined ? "Sửa" : "Thêm"} Danh mục
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
