import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductProvider";
import Layout from "../shared/Layout";

const SHIPPING_FEE = 2500;

function Checkout() {
  const { CartItems, DeleteCart, UpdateCart, ClearCart } =
    useContext(ProductContext);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = useMemo(
    () =>
      CartItems?.reduce(
        (acc, item) => acc + Number(item?.price) * Number(item?.quantity),
        0,
      ) || 0,
    [CartItems],
  );

  const shipping = CartItems?.length ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate() || !CartItems?.length) return;

    setPlacingOrder(true);
    setTimeout(() => {
      ClearCart();
      setPlacingOrder(false);
      setOrderPlaced(true);
    }, 1200);
  };

  // ================= ORDER SUCCESS =================
  if (orderPlaced) {
    return (
      <Layout>
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mt-6">
              Order Placed!
            </h1>

            <p className="text-gray-500 mt-3">
              Thank you for your purchase. A confirmation email has been sent to{" "}
              <span className="font-medium text-gray-900">{form.email}</span>.
            </p>

            <Link
              to="/"
              className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  // ================= EMPTY CART =================
  if (!CartItems || CartItems.length === 0) {
    return (
      <Layout>
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-20 text-center">
          <div className="text-5xl">🛒</div>

          <h1 className="text-2xl font-bold text-gray-900 mt-6">
            Your cart is empty
          </h1>

          <p className="text-gray-500 mt-2">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>

          <Link
            to="/"
            className="mt-8 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Start Shopping
          </Link>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen bg-gray-50 py-8 md:py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          <form
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* ================= LEFT: CART + FORM ================= */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
                <h2 className="font-semibold text-gray-900 mb-5">
                  Order Items ({CartItems.length})
                </h2>

                <div className="space-y-5">
                  {CartItems?.map((item) => (
                    <div
                      key={item?.id}
                      className="flex gap-4 pb-5 border-b border-gray-100 last:border-b-0 last:pb-0"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {item?.name}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                              Size: {item?.size || item?.defaultSize}
                            </p>
                          </div>

                          <p className="font-semibold text-gray-900 whitespace-nowrap">
                            ₦
                            {(
                              Number(item?.price) * Number(item?.quantity)
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                if (item?.quantity < 1) {
                                  console.log("Delete called ");

                                  DeleteCart(item?.id);
                                } else {
                                  console.log("Update called ");
                                  UpdateCart(item, item?.quantity - 1);
                                }
                              }}
                              disabled={item?.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              −
                            </button>

                            <span className="w-8 text-center text-sm font-medium">
                              {item?.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                UpdateCart(item, item?.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => DeleteCart(item?.id)}
                            className="text-sm text-red-500 hover:text-red-700 hover:underline transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
                <h2 className="font-semibold text-gray-900 mb-5">
                  Shipping Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`mt-1.5 w-full h-11 px-4 rounded-lg border outline-none transition ${
                        errors.fullName
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-300 focus:border-black"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`mt-1.5 w-full h-11 px-4 rounded-lg border outline-none transition ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-300 focus:border-black"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="080 0000 0000"
                      className={`mt-1.5 w-full h-11 px-4 rounded-lg border outline-none transition ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-300 focus:border-black"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Street address"
                      className={`mt-1.5 w-full h-11 px-4 rounded-lg border outline-none transition ${
                        errors.address
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-300 focus:border-black"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Lagos"
                      className={`mt-1.5 w-full h-11 px-4 rounded-lg border outline-none transition ${
                        errors.city
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-300 focus:border-black"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="Lagos State"
                      className={`mt-1.5 w-full h-11 px-4 rounded-lg border outline-none transition ${
                        errors.state
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-300 focus:border-black"
                      }`}
                    />
                    {errors.state && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
                <h2 className="font-semibold text-gray-900 mb-5">
                  Payment Method
                </h2>

                <label className="flex items-center gap-3 p-4 border border-black rounded-lg cursor-pointer bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="accent-black w-4 h-4"
                  />
                  <span className="font-medium text-gray-900">
                    Pay on Delivery
                  </span>
                </label>
              </div>
            </div>

            {/* ================= RIGHT: ORDER SUMMARY ================= */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6 lg:sticky lg:top-24">
                <h2 className="font-semibold text-gray-900 mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₦{shipping.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900 text-base">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={placingOrder}
                  className="w-full h-12 mt-6 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {placingOrder ? "Placing Order..." : "Place Order"}
                </button>

                <Link
                  to="/"
                  className="block text-center text-sm text-gray-500 hover:text-gray-900 mt-4 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
}

export default Checkout;
