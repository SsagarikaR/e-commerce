import React, { useEffect, useState } from "react";
import Product from "../subComponents.tsx/Product";
import Container from "../containers/Container";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import { useSearchParams } from "react-router-dom";
import CartModal from "./CartModal";
import Pagination from "./Paginations"; // Import Pagination component

function Products() {
  const [products, setProducts] = useState<product[] | undefined>();
  const [price, setPrice] = useState("");
  const [searchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 8; // Items per page
  const name = searchParams.get("name");
  const categoryID = searchParams.get("categoryID");

  // Get the data from the backend
  const getData = async () => {
    const queryParams = [];

    if (categoryID) queryParams.push(`categoryID=${categoryID}`);
    if (name) queryParams.push(`name=${name}`);
    if (price) queryParams.push(`price=${price}`);
    queryParams.push(`page=${currentPage}`); // Add pagination parameter
    queryParams.push(`limit=${itemsPerPage}`); // Limit the number of items per page

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    try {
      const response = await makeUnAuthorizedGetRequest(
        `/products${queryString}`
      );
      setProducts(response?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Update data when price, name, or categoryID change
  useEffect(() => {
    getData();
    console.log(price);
  }, [name, price, categoryID, currentPage]);

  // Get total number of pages from the response headers (or manually calculated)
  let totalPages:number;
  if(products){
    totalPages = Math.ceil((products[0].totalCount ?? 0) / itemsPerPage);
  }
 

  return (
    <Container>
      <div className="flex">
        <div className="p-2 shadow-l">
          <div className="text-lg p-2 border-b">
            <select
              className="outline-none"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            >
              <option
                value=""
                disabled
                selected
                className="text-gray-500 hover:bg-gray-500"
              >
                Sort by price:
              </option>
              <option value="low-to-high">Low-to-high</option>
              <option value="high-to-low">High-to-low</option>
            </select>
          </div>
        </div>
        <div className="">
          {products && products.length > 0 ? (
            <div className="flex flex-col p-5">
              <div className="overflow-y-auto max-h-300">
                <div className="grid grid-cols-4 gap-10">
                  {products?.map((product) => {
                    return (
                      <Product
                        product={product}
                        key={product.productID}
                        setModalOpen={setModalOpen}
                      />
                    );
                  })}
                </div>
              </div>
              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages!}
                onPageChange={setCurrentPage}
              />
            </div>
          ) : (
            <div className="text-center w-400 mt-6 text-2xl font-medium text-red-800">
              No item found
            </div>
          )}
        </div>
        {isModalOpen && <CartModal setModalOpen={setModalOpen} />}
      </div>
    </Container>
  );
}

export default Products;
