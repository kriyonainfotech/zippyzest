import { HiShoppingCart } from "react-icons/hi";
import "../styles/style.css";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { IoMdList } from "react-icons/io";

const Navbar = () => {
  const [user, setUser] = useState();
  const [cart, setCart] = useState({ cartitems: [], totalPrice: 0 });
  const [count, setCount] = useState({});
  const apiurl = import.meta.env.VITE_API_URL
  const FetchUser = async () => {
    try {
      let res = await axios.get(`${apiurl}/auth/getuser`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FetchCart = async () => {
    try {
      const response = await axios.get(`${apiurl}/cart/getcart`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setCart(response.data.cart);
        const initialCount = {};
        response.data.cart.cartitems.forEach((item) => {
          initialCount[item._id] = item.quantity;
        });
        setCount(initialCount);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, quantity) => {
    try {
      const response = await axios.post(
        `${apiurl}/cart/updatecart?id=${id}`,
        {
          quantity,
          price: cart.cartitems.find((item) => item._id === id).price,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        setCart(response.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increment = (id) => {
    setCount((prevCount) => {
      const newCount = prevCount[id] + 1;
      updateCartItem(id, newCount);
      return { ...prevCount, [id]: newCount };
    });
  };

  const decrement = (id) => {
    setCount((prevCount) => {
      if (prevCount[id] > 1) {
        const newCount = prevCount[id] - 1;
        updateCartItem(id, newCount);
        return { ...prevCount, [id]: newCount };
      }
      return prevCount;
    });
  };
  const removeFromCart = async (id) => {
    try {
      const response = await axios.get(`${apiurl}/cart/deletecart?id=${id}`,{ withCredentials: true });
      if (response.data.success) {
        setCart(response.data.cart); // Update the cart after successful removal
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchUser();
    FetchCart();
  },[]); // Added empty dependency array to prevent infinite re-renders

  return (
    <div>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-2 d-none mt-2 d-lg-flex">
            <div className="logo">
              <img src="../../Zippy zest  png.png" className="w-100" alt="logo" />
            </div>
          </div>
          <div className="col-12 mt-2 col-md-6 col-lg-8">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </form>
          </div>
          <div className="col-6 mt-2 col-md-3 col-lg-1">
            {user ? (
              <div className="dropdown border-0">
                <div
                  className="img-profile btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="../../user.jpg"
                    alt="profile"
                    className="rounded-full"
                    style={{ width: "50px" }}
                  />
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item">Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signup" className="main-text fs-20 ms-4">
                Login
              </Link>
            )}
          </div>
          <div className="col-6 mt-2 col-md-3 col-lg-1">
            <a
              href=""
              className="btn main-bg white-color py-2 px-3 d-flex align-items-center justify-content-center"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <GrCart className="me-1" />
              <span>Cart</span>
            </a>
          </div>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">
                Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body px-0">
              {cart.cartitems.map((item) => (
                <div
                  className="product-items-cart d-flex justify-content-between"
                  key={item._id}
                >
                  <div className="col-4 d-flex justify-content-center">
                    <div
                      className="img-cart d-flex justify-content-center"
                      style={{ border: "1px solid #e5ddd9" }}
                    >
                      <img
                        src={`${apiurl}/uploads/${
                          item.productId.image
                        }?t=${new Date().getTime()}`}
                        className="w-100"
                        alt={item.productId.name}
                      />
                    </div>
                  </div>
                  <div className="col-2 d-flex justify-content-center">
                    <div className="cart-name d-flex flex-column">
                      <span className="main-text fw-600">
                        {item.productId.name}
                      </span>
                      <span className="color-secondary">
                        {count[item._id]} kg
                      </span>
                      <span className="main-text fw-600"> ₹{item.price}</span>
                      <del className="color-secondary"></del>
                    </div>
                  </div>
                  <div className="col-6 d-flex">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={() => decrement(item._id)}
                        className="btn main-bg text-white px-3"
                      >
                        -
                      </button>
                      <span>{count[item._id]}</span>
                      <button
                        onClick={() => increment(item._id)}
                        className="btn main-bg text-white"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="btn btn-danger text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bill-details-cart mt-4">
                <h1 className="fs-20">Bill Details</h1>
                <div className="items-cart-bill d-flex justify-content-between">
                  <div className="main-cart-name main-text fw-500">
                    <span>Item Price</span>
                  </div>
                  <div className="main-cart-price">
                    <span className="main-text fw-500 ms-2">
                      ₹{cart.totalPrice}
                    </span>
                  </div>
                </div>
                <div
                  className="items-cart-bill d-flex justify-content-between pb-3"
                  style={{ borderBottom: "1px solid #e5ddd9" }}
                >
                  <div className="main-cart-name main-text fw-500">
                    <span className="fs-16">Delivery Charge</span>
                  </div>
                  <div className="main-cart-price">
                    <span className="main-text fw-500 ms-2">₹10</span>
                  </div>
                </div>
                <div className="items-cart-bill d-flex justify-content-between mt-5">
                  <div className="main-cart-name main-text fw-500">
                    <span className="fs-16">Total Price</span>
                  </div>
                  <div className="main-cart-price">
                    <span className="green-text fw-600 ms-2">
                      ₹{cart.totalPrice + 10}
                    </span>
                  </div>
                </div>
              </div>
              <div className="proceed-order mt-3">
                <Link
                  to={"/checkout"}
                  className="btn main-bg text-white fw-600"
                >
                  Place Order ₹{cart.totalPrice + 10}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
