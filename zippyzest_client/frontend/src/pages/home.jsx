import Categories from "../components/categories";
import Navbar from "../components/navbar";
import Topheader from "../components/topheader";
import { MdOutlineLocalShipping } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Products from "../components/products";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { MdOutlineEmail } from "react-icons/md";

const override = {
  display: "block",
  margin: "auto auto",
  borderColor: "red",
};
const loaderContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", 
};
const Home = () => {
  useEffect(() => {
    document.title = "Zippy Zest"; 
}, []);
const [loading, setLoading] = useState(true); 

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false); 
  }, 3000);

  return () => clearTimeout(timer);
}, []);

if (loading) {

  return (
    <div className="loader-container" style={loaderContainerStyle}>
      <BeatLoader
        color={"#699c47"}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
  return (
    <div>
      <Navbar />
      <section className="mt-3">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-12 col-lg-6">
              <div className="banner-text">
                <img src="../../shape-1.webp" className="shape-1 d-none d-xl-flex " alt="" />
                <img src="../../shaape-2.webp" alt=""className="shape-2 d-none d-xl-flex" />
                <h1 style={{ fontSize: "60px" }} className="fw-600">
                  Organic Fresh Food  
                </h1>
                <span className="color-secondary">
                  Discover organic, sustainable food from our organic farm and
                  fresh vegetable, <br></br> and food
                </span>
                <div
                  className="add-to-cart-btn d-flex mt-4 pb-3"
                 
                >
                  <a href="#cate" className="px-5 py-2">
                    <span>Shop Now</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 d-none d-lg-flex d-flex justify-content-center">
              <div className="banner-img"style={{height:"500px"}}>
                <img src="../../banner-1.webp" className="h-100" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Categories />
      <section>
        <div className="container pt-70">
          <div className="row services" >
            <div className="col-12 col-md-6 col-lg-3 mt-4">
              <div className="service-box d-flex align-items-center justify-conten-center">
                <div className="col-4">
                  <a href="">
                    <MdOutlineLocalShipping
                      className="main-text"
                      style={{ fontSize: "32px" }}
                    />
                  </a>
                </div>
                <div className="col-8">
                  <h2 className="main-text fs-20 m-0">Free Shipping</h2>
                  <span className="color-secondary fs-16 m-0">
                    On All Order Over
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-4">
              <div className="service-box d-flex align-items-center justify-conten-center">
                <div className="col-4">
                  <a href="">
                    <GiReturnArrow
                      className="main-text"
                      style={{ fontSize: "32px" }}
                    />
                  </a>
                </div>
                <div className="col-8">
                  <h2 className="main-text fs-20 m-0">Easy Returns</h2>
                  <span className="color-secondary fs-16 m-0">
                    Easy Returns 30 Day Returns Policy
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-4">
              <div className="service-box d-flex align-items-center justify-conten-center">
                <div className="col-4">
                  <a href="">
                    <MdOutlineSecurity
                      className="main-text"
                      style={{ fontSize: "32px" }}
                    />
                  </a>
                </div>
                <div className="col-8">
                  <h2 className="main-text fs-20 m-0">Secure Payment</h2>
                  <span className="color-secondary fs-16 m-0">
                    100% Secure Gaurantee
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mt-4">
              <div className="service-box d-flex align-items-center justify-conten-center">
                <div className="col-4">
                  <a href="">
                    <BiSupport
                      className="main-text"
                      style={{ fontSize: "32px" }}
                    />
                  </a>
                </div>
                <div className="col-8">
                  <h2 className="main-text fs-20 m-0">Special Support</h2>
                  <span className="color-secondary fs-16 m-0">
                    24/7 Dedicated Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Products />
      <section className="contact-section mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-5 mt-5">
              <div className="support-z">
                <h2>ZippyZest Customer Support Available 24/7</h2>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-7 mt-5">
              <div className="support-p">
                <p>Zippyzest Customer support is available to solve all your doubts and issues before and after you start your online Shooping on  ZippyZest.</p>
              </div>
              <div className="support-btn d-flex align-items-center mt-5" >
                <div className="btn-support">
                <MdOutlineEmail className="fs-20 text-white"/>
                </div>
                <div className="contact-support-z d-flex flex-column ms-3">
                  <span> You can reach out to</span>
                  <a href="">zippyzest@.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
