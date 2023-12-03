import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../features/brand/brandSlice";
import { getCategories } from "../../../features/pcategory/pcategorySlice";
import { getColors } from "../../../features/color/colorSlice";
import {
  delImg,
  uploadImg,
  setImg,
  resetStateUpload
} from "../../../features/upload/uploadSlice";
import { FcUpload } from "react-icons/fc";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import {
  createProducts,
  getSingleProduct,
  resetState,
  updateAProduct,
} from "../../../features/product/productSlice";
import { getSizes } from "../../../features/size/sizeSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tag is Required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  // const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();

  const isVideo = (url) => {
    if (url) {
      console.log("url: ", url);
      console.log(url.endsWith(".mp4"));
      return url.endsWith(".mp4");
    }
  };

  const getproductId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    dispatch(getSizes());
  }, []);

  const brandState = useSelector((state) => state?.brand?.brands);
  const catState = useSelector((state) => state?.pCategory?.pCategories);
  const colorState = useSelector((state) => state?.color?.colors);
  const sizeState = useSelector((state) => state?.size?.sizes);
  const imgState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state?.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productDetail,
  } = newProduct;

  useEffect(() => {
    console.log("productDetail: ", productDetail);
  }, [productDetail]);

  useEffect(() => {
    if (getproductId) {
      console.log("get");
      dispatch(getSingleProduct(getproductId));
    } else {
      dispatch(resetState());
    }
  }, [getproductId]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (isSuccess && updatedProduct) {
      toast.success("Product update Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    // console.log("images: ", images)
    formik.values.images = imgState;
    // console.log("formik.values.images: ", formik.values.images)

  }, [imgState]);

  useEffect(() => {
    formik.values.color = color;
  }, [color]);

  const sizeopt = [];
  sizeState.forEach((i) => {
    sizeopt.push({
      label: i.title,
      value: i._id,
    });
  });

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    // formik.values.color = color ? color : " ";
    formik.values.size = size ? size : " ";
    // formik.values.images = img;
  }, [size]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getproductId) {
        let payload = {
          id: getproductId,
          product: values,
        };

        dispatch(updateAProduct(payload, values));
      } else dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setSize(null);
      setTimeout(() => {
        dispatch(resetState());
        dispatch(resetStateUpload());
        navigate("/admin/product-list");
      }, 1000);
    },
  });

  useEffect(() => {
    if (productDetail) {
      let newListColor = productDetail?.color?.map((c) => c._id);
      let newListSize = productDetail?.size?.map((c) => c._id);

      formik.setValues({
        title: productDetail?.title,
        description: productDetail?.description,
        price: productDetail?.price,
        brand: productDetail?.brand,
        category: productDetail?.category,
        tags: productDetail?.tags,
        color: newListColor,
        quantity: productDetail?.quantity,
        images: productDetail?.images,
        size: newListSize,
      });
    }
  }, [productDetail, formik.setValues]);

  useEffect(() => {
    if (productDetail) {
      dispatch(setImg(productDetail?.images));
    }
  }, [productDetail]);

  const handleSizes = (e) => {
    setSize(e);
    console.log(size);
  };

  const handleColors = (e) => {
    setColor(e);
    console.log(color);
  };
  return (
    <div>
      <h3 className="adp-h3">
        {getproductId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="form-addproduct"
        >
          <CustomInput
            i_class="long-6"
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div>
            <ReactQuill
              className="quill-1"
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <Select
            mode="multiple"
            name="size"
            allowClear
            className="add-select"
            placeholder="Select Size"
            value={formik.values.size}
            onChange={handleSizes}
            options={sizeopt}
          />
          <CustomInput
            i_class="long-7"
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleChange("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            className="select-1"
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleChange("brand")}
            value={formik.values.brand}
            id=""
          >
            <option>Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleChange("category")}
            value={formik.values.category}
            className="select-1"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleChange("tags")}
            value={formik.values.tags}
            className="select-1"
            id=""
          >
            <option value="" disabled>
              Tags
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="add-select"
            placeholder="Select colors"
            value={formik.values.color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            i_class="long-7"
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleChange("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="addProduct-div-01">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <FcUpload />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages">
            {imgState.map((i, j) => {
              return (
                <div className="addProd-div-2" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="close-button"
                  >
                    {isVideo(i.url) ? (
                      <video width={300} height={250}>
                        <source src={i.url} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={i.url} alt="" width={300} height={250} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
          <button className="adp-btn" type="Submit">
            {getproductId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
