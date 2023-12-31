import React from "react";
import Meta from "../../components/Meta/Meta";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./Contact.css";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {createQuery} from "../../features/contact/contactSlice"
const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email Address is required"),
  mobile: yup.number().required("Mobile is required"),
  comment: yup.string().required("Comment is required"),

});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery({name:values.name,email:values.email,mobile:values.mobile,comment:values.comment}))
    },
  });
  return (
    <>
      <Meta title={"Liên hệ"} />
      <BreadCrumb title="Liên hệ" />
      <div className="contact-wrapper home-wrapper-02">
        <div className="contact-container-01">
          <div className="contact-row-01">
            <div className="contact-coloum-01">
            <iframe 
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.9928289238232!2d105.76656891977824!3d10.010904583970474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a089ccebb8ac69%3A0xb58bc161c2dea11d!2zSOG6u20gNjAgJiBUcuG6p24gSG_DoG5nIE5hLCBIxrBuZyBM4bujaSwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699375913244!5m2!1svi!2s" 
              width="1320" 
              height="450" 
              style={{ border: "0" }}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            </div>
            <div className="contact-coloum-02">
              <div
                className="contact-inner-wrapper"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <h3 className="contact-title">Liên hệ chúng tôi</h3>
                  <form
                    action=""
                    onSubmit={formik.handleSubmit}
                    className="contact-form-001"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control-contact"
                        placeholder="Tên"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                      />
                      <div className="error">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        className="form-control-contact"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                      />
                      <div className="error">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="mobile"
                        className="form-control-contact"
                        placeholder="Số điện thoại"
                        value={formik.values.mobile}
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                      />
                      <div className="error">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div>
                      <textarea
                        className="form-control-contact"
                        style={{ width: "100%" }}
                        name="comment"
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Comments"
                        value={formik.values.comment}
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                       />
                        <div className="error">
                          {formik.touched.comment && formik.errors.comment}
                        </div>
                    </div>
                    <div>
                      <button className="button">Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title">Địa chỉ liên hệ</h3>
                  <div>
                    <ul style={{ paddingLeft: "0" }}>
                      <li
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <AiOutlineHome style={{ fontSize: "1.25rem" }} />
                        <address>
                          Something is the address Can Tho, Viet Nam
                        </address>
                      </li>
                      <li
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <BiPhoneCall style={{ fontSize: "1.25rem" }} />
                        <a href="tel:+123456789">123456789</a>
                      </li>
                      <li
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <AiOutlineMail style={{ fontSize: "1.25rem" }} />
                        <a href="mailto:something@gmail.com">
                          Something@gmail.com
                        </a>
                      </li>
                      <li
                        style={{
                          marginBottom: "1rem",
                          display: "flex",
                          gap: "15px",
                          alignItems: "center",
                        }}
                      >
                        <BiInfoCircle style={{ fontSize: "1.25rem" }} />
                        <p>Monday – Friday 10 AM – 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
