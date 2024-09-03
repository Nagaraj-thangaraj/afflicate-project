import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types/Product";
interface GetProductsQueryParams {
  page: number;
  limit: number;
  genre?: string; // Optional genre parameter
}
interface GetProductsResponse {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
}
// Access environment variable using import.meta.env

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsQueryParams>({
      query: ({ page, limit, genre }) =>
        `/products?page=${page}&limit=${limit}&genre=${genre || ""}`,
    }),
    createProduct: builder.mutation<void, Product>({
      query: (productData) => ({
        url: "products",
        method: "POST",
        body: productData,
      }),
    }),
    updateProduct: builder.mutation<void, { id: string; product: Product }>({
      query: ({ id, product }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: product,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
