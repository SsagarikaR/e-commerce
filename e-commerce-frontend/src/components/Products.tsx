import Product from "../subComponents.tsx/Product";
import Container from "../containers/Container";
import { useEffect, useState } from "react";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import { useSearchParams } from "react-router-dom";
import CartModal from "./CartModal";

function Products() {
  const [products, setProducts] = useState<forProductbyName[] | undefined>();
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

  // Update data when price, name or categoryID change
  useEffect(() => {
    getData();
    console.log(price);
  }, [name, price, categoryID]);

  // Get products to be displayed on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate the total number of pages
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 1;

  return (
    <Container>
      <div className="flex">
        <div className="p-2 shadow-l ">
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
        <div className="overflow-auto ">
          {products && products.length > 0 ? (
            <div className="flex flex-col p-5">
              <div className="overflow-y-auto max-h-300">
                <div className="grid grid-cols-4 gap-10 ">
                  {currentProducts &&
                    currentProducts.map((product) => {
                      console.log(
                        product.ProductThumbnail,
                        "product thumbnail"
                      );
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
              <div className="flex justify-center mt-6 ">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="bg-blue-400 text-white py-2 px-4 rounded mx-2 cursor-pointer"
                >
                  Previous
                </button>
                <span className="self-center text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-blue-400 text-white py-2 px-4 rounded mx-2 cursor-pointer"
                >
                  Next
                </button>
              </div>
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
