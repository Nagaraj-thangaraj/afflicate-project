import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCreateProductMutation } from "../features/products/productApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const CreateProduct = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [createProduct] = useCreateProductMutation();
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productUrl: "",
    productDescription: "",
    productLink: "",
    productGenre: "",
    // Add any other required fields here
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(productData).unwrap();
      toast.success("Product created successfully!");
      setProductData({
        productName: "", // Reset field to match backend requirement
        productPrice: "",
        productUrl: "",
        productDescription: "",
        productLink: "",
        productGenre: "",
      });
    } catch (error) {
      toast.error(`Failed to create product. Please try again. ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="font-bold text-center">Create Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Product Name"
              className={`w-full my-2 max-w-xs ${
                theme === "dark"
                  ? "border-2 input input-bordered border-white text-white"
                  : "border-2 border-black input-bordered input text-black"
              }`}
              value={productData.productName}
              onChange={handleChange}
              name="productName" // Update to match backend
              required
            />
            <input
              type="text"
              placeholder="Product Price"
              className={`w-full my-2 max-w-xs ${
                theme === "dark"
                  ? "border-2 input input-bordered border-white text-white"
                  : "border-2 border-black input-bordered input text-black"
              }`}
              value={productData.productPrice}
              onChange={handleChange}
              name="productPrice" // Update to match backend
              required
            />
            <input
              type="text"
              placeholder="Product URL"
              className={`w-full my-2 max-w-xs ${
                theme === "dark"
                  ? "border-2 input input-bordered border-white text-white"
                  : "border-2 border-black input-bordered text-black input"
              }`}
              value={productData.productUrl}
              onChange={handleChange}
              name="productUrl" // Update to match backend
              required
            />
            <input
              type="text"
              placeholder="Product Description"
              className={`w-full my-2 max-w-xs ${
                theme === "dark"
                  ? "border-2 input input-bordered border-white text-white"
                  : "border-2 border-black input-bordered text-black input"
              }`}
              value={productData.productDescription}
              onChange={handleChange}
              name="productDescription" // Update to match backend
              required
            />
            <input
              type="text"
              placeholder="Product Link"
              className={`w-full my-2 max-w-xs ${
                theme === "dark"
                  ? "border-2 input input-bordered border-white text-white"
                  : "border-2 border-black input-bordered text-black input"
              }`}
              value={productData.productLink}
              onChange={handleChange}
              name="productLink" // Update to match backend
              required
            />
            <input
              type="text"
              placeholder="Product Genre"
              className={`w-full my-2 max-w-xs ${
                theme === "dark"
                  ? "border-2 input input-bordered border-white text-white"
                  : "border-2 border-black input-bordered text-black input"
              }`}
              value={productData.productGenre}
              onChange={handleChange}
              name="productGenre" // Update to match backend
              required
            />
            <div className="card-actions justify-center">
              <button className="btn w-full" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProduct;
