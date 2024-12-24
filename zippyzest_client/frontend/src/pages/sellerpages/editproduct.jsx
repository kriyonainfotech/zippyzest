import React, { useEffect, useState } from "react";
import SellerSidebar from "../../components/sellercomponents/sellersidebar";
import "../../styles/style.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Editproduct = () => {
  const [category, setCategory] = useState([]); // Keep track of categories
  const navigate = useNavigate(); // Categories state
  const [name, setProductName] = useState("");
  const [description, setProductDescription] = useState("");
  const [image, setProductImage] = useState(null);
  const [price, setProductPrice] = useState("");
  const [productDiscountPrice, setProductDiscountPrice] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productKeyFeatures, setProductKeyFeatures] = useState("");
  const [manufacturerDetails, setManufacturerDetails] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiurl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  console.log(location.state);
  useEffect(() => {
    setProductName(location?.state?.name);
    setProductDescription(location?.state?.description);
    setProductImage(location?.state?.image);
    setProductPrice(location?.state?.price);
    setProductDiscountPrice(location?.state?.productDiscountPrice);
    setProductUnit(location?.state?.productUnit);
    setProductQuantity(location?.state?.productQuantity);
    setProductStock(location?.state?.productStock);
    setProductKeyFeatures(location?.state?.productKeyFeatures);
    setManufacturerDetails(location?.state?.manufacturerDetails);
    setReturnPolicy(location?.state?.returnPolicy);
    setCountryOfOrigin(location?.state?.countryOfOrigin);
    setProductCategory(location?.state?.category._id);
  }, [location?.state]);
  useEffect(() => {
    const GetCategory = async () => {
      try {
        const response = await axios.get(`${apiurl}/category/all-category`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setCategory(response.data.category); // Set the categories in state
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetCategory();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        name,
        description,
        image,
        price,
        productDiscountPrice,
        productUnit,
        productQuantity,
        productStock,
        category: productCategory,
        productKeyFeatures,
        manufacturerDetails,
        returnPolicy,
        countryOfOrigin,
      };
      console.log(obj);

      const response = await axios.post(
        `${apiurl}/product/update-product?id=${location?.state?._id}`,
        obj,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        setErrorMessage("");
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductDiscountPrice("");
        setProductUnit("");
        setProductQuantity("");
        setProductStock("");
        setProductCategory("");
        setProductKeyFeatures("");
        setManufacturerDetails("");
        setReturnPolicy("");
        setCountryOfOrigin("");
        setProductImage("");
        navigate("/seller/showproduct");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage();
    }
  };

  return (
    <div>
      <div className="d-flex">
        <div className="col-2 main-bg-sidebar">
          <SellerSidebar />
        </div>
        <div className="col-10">
          <div className="main-bg-admin p-5 h-100">
            <h3 className="fs-24 p-2">Add Product</h3>
            <div className="side-box-admin">
              <form className="form-admin d-flex" onSubmit={handleSubmit}>
                <div className="col-5 d-flex flex-column">
                  <label className="fw-500 me-2">Product Name</label>
                  <input
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setProductName(e.target.value)}
                  />

                  <label className="fw-500 me-2 mt-2">
                    Product Description
                  </label>
                  <textarea
                    placeholder="Description"
                    className="p-1 mt-1"
                    value={description}
                    onChange={(e) => setProductDescription(e.target.value)}
                  ></textarea>

                  <label className="fw-500 me-2 mt-2">Product Image</label>
                  <input
                    type="file"
                    className="p-1 mt-1 form-control"
                    onChange={(e) => setProductImage(e.target.files[0])}
                  />

                  <label className="fw-500 me-2 mt-2">Product Price</label>
                  <input
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />

                  <label className="fw-500 me-2 mt-2">
                    Product Discount Price
                  </label>
                  <input
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Discount Price"
                    value={productDiscountPrice}
                    onChange={(e) => setProductDiscountPrice(e.target.value)}
                  />

                  <label className="fw-500 me-2 mt-2">Product Unit</label>
                  <select
                    className="form-control"
                    value={productUnit}
                    onChange={(e) => setProductUnit(e.target.value)}
                  >
                    <option value="">Select Unit</option>
                    <option value="gram">Gram</option>
                    <option value="kg">Kg</option>
                  </select>

                  <label className="fw-500 me-2 mt-2">Product Quantity</label>
                  <input
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Quantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />

                  <label className="fw-500 me-2 mt-2">Product Stock</label>
                  <input
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Stock"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                  />
                </div>

                <div className="col-5 ps-5 d-flex flex-column">
                  <label className="fw-500 me-2 mt-2">Product Category</label>
                  <select
                    className="form-control"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <label className="fw-500 me-2 mt-2">
                    Product Key Features
                  </label>
                  <textarea
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Key Features"
                    value={productKeyFeatures}
                    onChange={(e) => setProductKeyFeatures(e.target.value)}
                  />

                  <label className="fw-500 me-2 mt-2">
                    Manufacturer Details
                  </label>
                  <textarea
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Details"
                    value={manufacturerDetails}
                    onChange={(e) => setManufacturerDetails(e.target.value)}
                  />

                  <label className="fw-500 me-2 mt-2">Return Policy</label>
                  <textarea
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Policy"
                    value={returnPolicy}
                    onChange={(e) => setReturnPolicy(e.target.value)}
                  />

                  <label className="fw-500 me-2 mt-2">Country of Origin</label>
                  <input
                    type="text"
                    className="p-1 mt-1"
                    placeholder="Country Of Origin"
                    value={countryOfOrigin}
                    onChange={(e) => setCountryOfOrigin(e.target.value)}
                  />

                  <input
                    type="submit"
                    className="btn btn-success mt-5"
                    value="Add Product"
                  />
                </div>

                <p className="text-danger">{errorMessage}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editproduct;
