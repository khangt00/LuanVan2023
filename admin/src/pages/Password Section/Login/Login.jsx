import React, { useEffect } from "react";
import "./Login.css";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth/authSlice";




let schema = Yup.object().shape({
  email: Yup.string()
    .email("Email không đúng định dạng")
    .required("Email không được trống"),
  password: Yup.string().required("Mật khẩu không được trống"),
});



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);

  return (
    <div className="adminlogin-div-1">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="adminlogin-div-2">
        <h3 className="adminlogin-h3">Đăng nhập</h3>
        <p className="adminlogin-p">Đăng nhập tài khoản của bạn để tiếp tục.</p>
        <div className="error" style={{ textAlign: "center" }}>
          {message.message == "Rejected" ? "Bạn không phải admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email"
            id="email"
            val={formik.values.email}
            onChng={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Mật khẩu"
            id="pass"
            val={formik.values.password}
            onChng={formik.handleChange("password")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>
          <button className="adminlogin-button-1" type="Submit">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
