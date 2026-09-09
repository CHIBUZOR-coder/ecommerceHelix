import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductProvider";

function ProductsItems({ Product }) {
  const { AddToCart } = useContext(ProductContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Product?.map((product) => (
        <div
          key={product.id}
          className="relative bg-white rounded-xl shadow p-4 flex flex-col gap-2"
        >
          <button
            type="button"
            onClick={() => AddToCart(product, 1, product?.defaultSize)}
            aria-label="Add to cart"
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-10 0a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
          </button>

          <Link to={`/singleproduct/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-lg"
            />
          </Link>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">₦{product.price?.toLocaleString()}</p>
            {product.new_hit && (
              <span className="text-xs text-white bg-black w-fit px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsItems;
