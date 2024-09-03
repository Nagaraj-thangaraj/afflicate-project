import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../features/products/productApi";
import useProgressBar from "../hooks/useProgressBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const Clothing = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const pageSize = 4;
  const [isLoadingData, setIsLoadingData] = useState(true);
  // Query to fetch products with pagination
  const { data, isLoading, refetch } = useGetProductsQuery({
    page: currentPage,
    limit: pageSize,
    genre: "clothes",
  });
  const theme = useSelector((state: RootState) => state.theme.theme);
  // Call useProgressBar with the loading state
  useProgressBar(isLoadingData);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true); // Start loading
      try {
        await refetch(); // Fetch data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoadingData(false); // End loading
      }
    };

    fetchData();
  }, [currentPage, refetch]); //
  // Handle changing the page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center my-28">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  if (!data || data?.products.length === 0) {
    return (
      <div className="flex justify-center items-center my-28">
        <p>No clothing found.</p>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {data.products.map((clothe) => (
          <div
            className={`${
              theme === "dark"
                ? "border card bg-base-100 shadow-xl mb-3"
                : "border border-black card bg-base-100 shadow-xl"
            } flex flex-col justify-between h-full max-w-xs my-1 mx-auto`}
            key={clothe._id}
          >
            <figure className="flex-shrink-0 w-full object-cover h-72 overflow-hidden">
              <img
                src={clothe.productUrl || "/path/to/fallback/image.jpg"}
                alt={clothe.productName}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body flex flex-col justify-between flex-grow">
              <h2
                className={
                  theme === "dark"
                    ? "text-white text-lg font-bold"
                    : "text-black text-lg font-bold"
                }
              >
                {clothe.productName}
              </h2>
              <h4
                className={
                  theme === "dark"
                    ? "text-white text-lg font-bold"
                    : "text-black text-lg font-bold"
                }
              >
                ₹ {clothe.productPrice}
              </h4>
              <p
                className={
                  theme === "dark" ? "text-white text-sm" : "text-black text-sm"
                }
              >
                {clothe.productDescription}
              </p>
              <div className="card-actions my-3 w-full">
                <a
                  href={clothe.productLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full"
                >
                  <button className="btn btn-primary w-full">Buy Now</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="join my-10 flex justify-center items-center">
        {/* Previous Page Button */}
        <button
          className="join-item btn bg-primary text-black sm:w-32"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          «
        </button>

        {/* Current Page Display */}
        <button className="join-item btn font-bold sm:w-32">
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
    </>
  );
};

export default Clothing;
