import React from "react";
import "./SpecialProduct.css";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, brand, price, totalrating, sold, quantity , images , id } = props;
  const isVideo = (url) => {
    if (url) {
      console.log("url: ", url);
      console.log(url.endsWith(".mp4"));
      return url.endsWith(".mp4");
    }
  };
  return (
    <>
      <div className="special-coloum-01">
        <div className="special-product-card">
          <div className="div-01">
            <div>
              {isVideo(images) ? 
                <video width={300} height={250}>
                  <source
                    src={images}
                    type="video/mp4"
                  />
                </video> : <img className="img-01" src={images} alt="watch" />
              }
            </div>
            <div className="special-product-content">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">{title}</h6>
              <ReactStars
                count={5}
                size={24}
                value={totalrating}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">VND {price}</span>&nbsp;
              </p>
              <div className="prod-count">
                <p>Kho : {quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: (quantity / quantity  * 100 ) }}
                    aria-valuenow={(quantity)}
                    aria-valuemin={quantity}
                    aria-valuemax={quantity}
                  ></div>
                </div>
              </div>
              <Link to={"/product/"+id} className="button">Xem</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
