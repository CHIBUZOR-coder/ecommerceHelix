import { useContext, useEffect, useState } from "react";
import ProductContext from "../context/ProductProvider";
import { useParams, Link } from "react-router-dom";
import Layout from "../shared/Layout";

function SingleProducts() {
  const { Product, AddToCart } = useContext(ProductContext);
  const { id } = useParams();

  const [singleProduct, setSingleProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let found;

    if (Product && Product.length > 0) {
      found = Product.find((item) => Number(item?.id) === Number(id));
    }

    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSingleProduct(found);
    }
  }, [Product, id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSize(singleProduct?.defaultSize);
  }, [singleProduct]);

  useEffect(() => {
    console.log("sel:", selectedSize);
    console.log("quan:", quantity);
  }, [selectedSize, quantity]);

  // Loading
  if (!Product || Product.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  // Product doesn't exist
  if (!singleProduct?.id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>

        <p className="text-gray-500 mt-2">
          The product you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen bg-gray-50 py-8 md:py-14 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Product Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 p-5 md:p-8 lg:p-10">
              {/* ================= IMAGE ================= */}
              <div className="relative">
                {/* New badge */}
                {singleProduct?.new_hit && (
                  <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                    New
                  </span>
                )}

                <div className="w-full aspect-square overflow-hidden rounded-xl bg-gray-100 bg-center bg-cover">
                  <img
                    src={singleProduct.image}
                    alt={singleProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* ================= DETAILS ================= */}
              <div className="flex flex-col justify-center">
                {/* Category */}
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
                  {singleProduct.category}
                </p>

                {/* Name */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {singleProduct.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-5">
                  <div className="text-yellow-500 tracking-widest">★★★★★</div>

                  <span className="text-sm text-gray-500">
                    4.8 (24 reviews)
                  </span>
                </div>

                {/* Price */}
                <p className="text-3xl font-bold text-gray-900 mt-6">
                  ₦{Number(singleProduct.price).toLocaleString()}
                </p>

                {/* Description */}
                <p className="text-gray-600 leading-7 mt-5">
                  Experience comfort and style with the{" "}
                  <span className="font-medium text-gray-900">
                    {singleProduct.name}
                  </span>
                  . Designed for everyday movement, this sneaker combines a
                  modern look with a comfortable fit.
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 my-7" />

                {/* ================= SIZE ================= */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Select Size</h3>

                    <span className="text-sm text-gray-500">
                      Selected:{" "}
                      <span className="font-medium text-gray-900">
                        {singleProduct.defaultSize}
                      </span>
                    </span>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    {singleProduct.sizes?.map((size) => (
                      <button
                        onClick={() => setSelectedSize(size)}
                        key={size}
                        className={`w-12 h-11 rounded-lg border font-medium transition ${
                          size === selectedSize
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-800 border-gray-300 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ================= QUANTITY ================= */}
                <div className="flex items-center justify-between mt-7">
                  <h3 className="font-semibold text-gray-900">Quantity</h3>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        if (quantity === 1) {
                          setQuantity(1);
                        } else {
                          setQuantity((prv) => prv - 1);
                        }
                      }}
                      className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100 transition"
                    >
                      −
                    </button>

                    <span className="w-10 text-center font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity((prv) => prv + 1)}
                      className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ================= BUTTONS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                  <button
                    onClick={() => AddToCart(singleProduct, quantity, selectedSize)}
                    className="
                    h-13 rounded-lg
                    bg-black text-white
                    font-semibold
                    hover:bg-gray-800
                    transition
                  "
                  >
                    Add to Cart
                  </button>

                  <button
                    className="
                    h-13 rounded-lg
                    border border-black
                    bg-white text-black
                    font-semibold
                    hover:bg-gray-100
                    transition
                  "
                  >
                    Buy Now
                  </button>
                </div>

                {/* ================= FEATURES ================= */}
                <div className="border-t border-gray-200 mt-8 pt-6 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      🚚
                    </div>

                    <div>
                      <p className="font-semibold text-sm">Free Delivery</p>

                      <p className="text-xs text-gray-500 mt-1">
                        Available on selected orders
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      ↩️
                    </div>

                    <div>
                      <p className="font-semibold text-sm">Easy Returns</p>

                      <p className="text-xs text-gray-500 mt-1">
                        Simple and hassle-free returns
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      🔒
                    </div>

                    <div>
                      <p className="font-semibold text-sm">Secure Payment</p>

                      <p className="text-xs text-gray-500 mt-1">
                        Your payment is protected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default SingleProducts;
