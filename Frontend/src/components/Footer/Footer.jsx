import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import newsletter from "../../images/newsletter.png"
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
const Footer = () => {
  function toggleAccordion(accordionId) {
    const accordion = document.getElementById(accordionId);
    accordion.classList.toggle("active");
  }
  return (
    <>
      <footer className="f-1">
        <div className="container-a">
          <div style={{ alignItems: "center" }} className="row-a">
            <div className="coloum-a">
              <div
                style={{
                  display: "flex",
                  gap: 30,
                  alignItems: "center",
                  marginLeft: 160,
                }}
                className="footer-top-data"
              >
                <img src={newsletter} alt="newsletter" />
                <h2 className="p-a">Đăng ký nhận tin tức</h2>
              </div>
            </div>
            <div className="coloum-c ">
              <div className="input-group-2">
                <input
                  type="text"
                  className="form-control-2"
                  placeholder="Địa chỉ email của bạn"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <button
                  style={{ backgroundColor: "#232f3e", color: "white" }}
                  className="input-group-text-2"
                  id="basic-addon2"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="f-2">
        <div className="container-10">
          <div className="row-10">
            <div className="coloum-20">
              <h4  onClick={() => toggleAccordion("accordion1")} style={{ marginLeft: 20, color: "white", marginBottom: 24 }}
              >
              <span className="accordion-icon">
                  {/* <BsChevronDown className="bs-icon"/> */}
                </span>
                Liên hệ chúng tôi
              </h4>
              <div id="accordion1"  className="accordion-content">
                <address style={{ color: "white", marginLeft: 20 }}>
                  Việt Nam : Cần Thơ
                  <br />
                  <br />
                  ZipCode 12345
                </address>
                <a
                  style={{
                    marginTop: 16,
                    display: "block",
                    marginBottom: 4,
                    marginLeft: 20,
                    color: "white",
                  }}
                  href="tel:123456789"
                >
                  123456789
                </a>
                <a
                  style={{
                    marginTop: 8,
                    display: "block",
                    marginBottom: 0,
                    marginLeft: 20,
                    color: "white",
                  }}
                  href="mailto:something@gmail.com"
                >
                  something@gmail.com
                </a>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 30,
                    marginLeft: 20,
                    marginTop: 24,
                  }}
                  className="social_icons"
                >
                  <a style={{ color: "white" }} href="/">
                    <BsLinkedin className="social-10" />
                  </a>
                  <a style={{ color: "white" }} href="/">
                    <BsGithub className="social-10" />
                  </a>
                  <a style={{ color: "white" }} href="/"> 
                    <BsInstagram className="social-10" />
                  </a>
                </div>
              </div>
            </div>
            <div className="coloum-30">
              <h4  onClick={() => toggleAccordion("accordion2")}  style={{ color: "white", marginBottom: 24, marginLeft: 20 }}>
              <span className="accordion-icon">
                  <BsChevronDown className="bs-icon"/>
                </span>
                Thông tin
              </h4>
              <div id="accordion2"  className="footer-links accordion-content">
                <Link to='/privacy-policy' className="links-20">Chính sách bảo mật</Link>
                <Link to='/refund-policy' className="links-20">Chính sách trả hàng</Link>
                <Link to='/shipping-policy' className="links-20">Chính sách vận chuyển</Link>
                <Link to='/terms-services' className="links-20">Điều khoản và điều kiện</Link>
                <Link to='/blogs' className="links-20">Bài viết</Link>
              </div>
            </div>
            <div className="coloum-40">
              <h4 onClick={() => toggleAccordion("accordion3")} style={{ color: "white", marginBottom: 24, marginLeft: 20 }}>
              <span className="accordion-icon">
                  <BsChevronDown className="bs-icon"/>
                </span>
                Tài khoản
              </h4>
              <div  id="accordion3"  className="footer-links accordion-content">
                <Link className="links-20">Faq</Link>
                <Link to="/contact" className="links-20">Contact</Link>
              </div>
            </div>
            <div className="coloum-50">
              <h4  onClick={() => toggleAccordion("accordion4")} style={{ color: "white", marginBottom: 24, marginLeft: 20 }}>
              <span className="accordion-icon">
                  <BsChevronDown className="bs-icon"/>
                </span>
                Đường dẫn nhanh
              </h4>
              <div id="accordion4"  className="footer-links accordion-content">
                <Link to={`/product?category=Lapotop`} className="links-20">Toys</Link>
                <Link to={`/product?category=Shoes`} className="links-20">Figure</Link>
                {/* <Link to={`/product?category=Cell%20Phones`} className="links-20">Cell Phones</Link> */}
                {/* <Link to={`/product?category=Shirts`} className="links-20">Shirts</Link> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="container-b">
          <div className="row-b">
            <div className="coloum-b">
              <p className="p-1">
              &copy; {new Date().getFullYear()}: Powered by KhangT00
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
