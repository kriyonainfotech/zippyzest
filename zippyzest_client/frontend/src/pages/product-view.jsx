import { HiShoppingCart } from "react-icons/hi";
import "../styles/style.css";
import "../styles/productview.css";
import Topheader from "../components/topheader";
import Navbar from "../components/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";
import BeatLoader from "react-spinners/BeatLoader";
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
const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialized as null
  const [selectedWeight, setSelectedWeight] = useState(1); // Default weight is 1kg
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  console.log(selectedWeight);
  const apiurl = import.meta.env.VITE_API_URL;
  const scrollRef = useRef();
  const navigate = useNavigate();
  const fetchProduct = async () => {
    try {
      const response = await axios.post(
        `${apiurl}/product/getproductfromproduct?id=${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setProduct(response.data.products); // Assuming 'product' is an object, not an array
        console.log(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSuggestedProducts = async () => {
    try {
      setLoadingSuggestions(true);
      if (!product?.category?._id) return;
      const response = await axios.post(
        `${apiurl}/category/getproductincategory`,
        { categoryId: product.category._id },
        { withCredentials: true }
      );
      if (response.data.success) {
        setSuggestedProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching suggested products:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleCart = async (id, price) => {
    let obj = {
      productId: id,
      price: price,
      quantity: selectedWeight,
    };
    try {
      let Response = await axios.post(`${apiurl}/cart/addcart`, obj, {
        withCredentials: true,
      });
      console.log(Response.data.cart);
      if (Response.data.success) {
        alert("Product Added to Cart");
      }
    } catch (error) {
      if (
        error.response.data.message ==
        "You need to log in to access this resource."
      ) {
        alert("Please Login to add product to cart");
        navigate("/signup");
      }
      console.log(error);
    }
  };
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchSuggestedProducts();
    }
  }, [product]);
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
    <div className="main-container">
      <Navbar />
      <section className="section-content">
        <div className="container">
          <div className="row">
            {/* Only render this part if product data exists */}
            {product ? (
              <>
                <div className="col-12 col-md-6">
                  <div className="product-img-fluid">
                    <img
                      src={`${apiurl}/uploads/${product.image}`}
                      alt={product.name}
                      height={300}
                      className="m-120"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="product-info px-5 py-2 mt-5">
                    <h3 className="mt-4">{product.name}</h3>
                    <p
                      className="color-secondary"
                      style={{ borderBottom: "1px solid #e5ddd9" }}
                    >
                      {product.description ||
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iure minus error doloribus saepe natus?"}
                    </p>
                    <div className="details d-flex flex-column">
                      <span className="main-text fw-500">
                        Name : {product.name}
                      </span>
                      <span className="main-text fw-500">
                        Categories : {product.category.name}
                      </span>
                    </div>
                    <span className="main-text fw-500">
                      MRP :{" "}
                      <del className="color-secondary fw-400">
                        ₹{product.mrp}
                      </del>
                    </span>
                    <h6 className="main-text m-0 ">Price : ₹{product.price}</h6>
                    <span className="green-text">
                      You Save : {product.discount}% off
                    </span>
                    <div
                      className="add-to-cart-btn d-flex mt-2 pb-3"
                      style={{ borderBottom: "1px solid #e5ddd9" }}
                    >
                      <Link
                        onClick={() => handleCart(product._id, product.price)}
                        className="px-5 py-2  "
                      >
                        <GrCart className="me-1" />
                        <span>Add</span>
                      </Link>
                    </div>
                    <div
                      className="unit-box"
                      style={{ borderBottom: "1px solid #e5ddd9" }}
                    >
                      <div className="unit-btn">
                        <div
                          className="add-to-cart-btn d-flex mt-2 pb-3"
                          style={{ borderBottom: "1px solid #e5ddd9" }}
                        >
                          {[1, 2, 3, 5].map((weight) => (
                            <Link
                              key={weight}
                              className={`px-5 py-2 me-2 ${
                                selectedWeight === weight ? "active" : ""
                              }`}
                              onClick={() => setSelectedWeight(weight)}
                            >
                              {weight} kg
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="product-details">
                      <h2 className="main-text m-0 mt-3">Product Details</h2>
                      <div className="pro-details">
                        <div className="product-details-many mt-3">
                          <span className="fw-600">Description</span>
                          <p className="color-secondary">
                            {product.description}
                          </p>
                        </div>
                        <div className="product-details-many mt-3">
                          <span className="fw-600">Key Features</span>
                          <p className="color-secondary">
                            {product.features || "No key features available"}
                          </p>
                        </div>
                        <div className="product-details-many mt-3">
                          <span className="fw-600">Country Of Origin</span>
                          <p className="color-secondary">
                            {product.origin || "India"}
                          </p>
                        </div>
                        <div className="product-details-many mt-3">
                          <span className="fw-600">Manufacturer Details</span>
                          <p className="color-secondary">
                            {product.manufacturer || "Not available"}
                          </p>
                        </div>
                        <div className="product-details-many mt-3">
                          <span className="fw-600">Return Policy</span>
                          <p className="color-secondary">
                            {product.returnPolicy ||
                              "No return policy available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Loading product...</p>
            )}
          </div>
        </div>
        <div className="container">
        <div className="suggested-products mt-5">
        <h2 className="main-text">Suggested Products</h2>
        {loadingSuggestions ? (
          <div className="loader-container">
            <BeatLoader color={"#699c47"} loading={loadingSuggestions} size={15} />
          </div>
        ) : suggestedProducts.length > 0 ? (
          <div className="suggested-products-wrapper">
            <button className="scroll-btn left" onClick={scrollLeft}>
              &lt;
            </button>
            <div className="suggestion-scroll-container" ref={scrollRef}>
              {suggestedProducts.map((product) => (
                <div className="product-box" key={product._id}>
                  <Link to={`/productview/${product._id}`}>
                    <div className="product-img">
                      <img
                        src={`${apiurl}/uploads/${product.image}`}
                        alt={product.name}
                      />
                    </div>
                    <div className="product-name mt-2 d-flex justify-content-between mb-2">
                      <h5 className="main-text">{product.name}</h5>
                      <span>{product.weight || "1kg"}</span>
                    </div>
                    <div className="product-part d-flex justify-content-between">
                      <div className="pro-price">
                        <p className="m-0 main-text">₹{product.price}</p>
                        {product.mrp && <del>₹{product.mrp}</del>}
                      </div>
                      <div className="add-to-cart-btn d-flex">
                        <Link
                          onClick={() => handleCart(product._id, product.price)}
                          className="px-2"
                        >
                          <GrCart className="me-1" />
                          <span>Add</span>
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <button className="scroll-btn right" onClick={scrollRight}>
              &gt;
            </button>
          </div>
        ) : (
          <p className="main-text mt-3">No suggested products available.</p>
        )}
      </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductView;
