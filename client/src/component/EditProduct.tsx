import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../features/products/productApi";
import { RootState } from "../store/store";
import { Product } from "../types/Product";

const EditProduct: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const { data, isLoading, refetch } = useGetProductsQuery({
    page: currentPage,
    limit: pageSize,
  });
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (!editingProductId) {
      setUpdatedProduct(null);
    }
  }, [editingProductId]);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const handleEditClick = (product: Product) => {
    setEditingProductId(product._id);
    setUpdatedProduct({ ...product });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSaveClick = async () => {
    if (updatedProduct && editingProductId) {
      try {
        await updateProduct({
          id: editingProductId,
          product: updatedProduct,
        }).unwrap();
        toast.success("Product updated successfully!");
        setUpdatedProduct(null);
        setEditingProductId(null);
        refetch();
      } catch (error) {
        console.error("Failed to update the product:", error);
        toast.error("Failed to update the product. " + error);
      }
    }
  };

  const handleCancelClick = () => {
    setEditingProductId(null);
    setUpdatedProduct(null);
  };

  const handleDeleteClick = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete the product:", error);
      toast.error("Failed to delete the product. " + error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.products &&
          data.products.map((product: Product) => (
            <div
              className={`${
                theme === "dark"
                  ? "border border-gray-700 bg-gray-800 text-white"
                  : "border border-gray-300 bg-white text-gray-900"
              } rounded-lg shadow-lg flex flex-col`}
              key={product._id}
            >
              {editingProductId === product._id ? (
                <div className="p-4">
                  <input
                    type="text"
                    name="productName"
                    value={updatedProduct?.productName || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full  my-3"
                    placeholder="Product Name"
                  />
                  <input
                    type="text"
                    name="productPrice"
                    value={updatedProduct?.productPrice || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full my-3"
                    placeholder="Product Price"
                  />
                  <textarea
                    name="productDescription"
                    value={updatedProduct?.productDescription || ""}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full  my-3"
                    placeholder="Product Description"
                  />
                  <input
                    type="text"
                    name="productUrl"
                    value={updatedProduct?.productUrl || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full my-3"
                    placeholder="Product URL"
                  />
                  <input
                    type="text"
                    name="productGenre"
                    value={updatedProduct?.productGenre || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full my-3"
                    placeholder="Product Genre"
                  />
                  <input
                    type="text"
                    name="productLink"
                    value={updatedProduct?.productLink || ""}
                    onChange={handleChange}
                    className="input input-bordered w-full my-3"
                    placeholder="Product Link"
                  />
                  <div className="flex gap-2 my-5">
                    <button
                      className="btn btn-success flex-1  my-4"
                      onClick={handleSaveClick}
                    >
                      <FaSave size={20} /> Save
                    </button>
                    <button
                      className="btn btn-error flex-1 my-4"
                      onClick={handleCancelClick}
                    >
                      <FaTimes size={20} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <figure className="flex-shrink-0">
                    <img
                      src={product.productUrl || "/path/to/fallback/image.jpg"}
                      alt={product.productName}
                      className=" flex-shrink-0  w-full h-72 overflow-hidden object-cover rounded-t-lg"
                    />
                  </figure>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h2 className="text-xl font-bold mb-2">
                      {product.productName}
                    </h2>
                    <h4 className="text-lg font-semibold mb-2">
                      ₹ {product.productPrice}
                    </h4>
                    <p className="text-sm mb-4">{product.productDescription}</p>
                    <div className="flex gap-2 mb-4">
                      <button
                        className={`${
                          theme === "dark"
                            ? " btn btn-primary flex-1 hover:bg-green-700 text-white"
                            : " btn btn-primary flex-1 hover:bg-green-700 text-white"
                        }`}
                        onClick={() => handleEditClick(product)}
                      >
                        <FaEdit color="white" size={20} />
                      </button>
                      <button
                        className={`${
                          theme === "dark"
                            ? "btn  btn-primary hover:bg-red-500 text-white flex-1"
                            : "btn btn-primary hover:bg-red-500 text-white flex-1"
                        }`}
                        onClick={() => handleDeleteClick(product._id)}
                      >
                        <FaTrash size={20} color="white" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
      {/* Pagination Controls */}
      <div className="join my-10 flex justify-center items-center ">
        {/* Previous Page Button */}
        <button
          className="join-item btn bg-primary text-black  sm:w-32"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          «
        </button>

        {/* Current Page Display */}
        <button className="join-item btn font-bold  sm:w-32">
          Page {currentPage}
        </button>

        {/* Next Page Button */}
        <button
          className="join-item btn bg-primary text-black sm:w-32"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= (data?.totalPages || 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
