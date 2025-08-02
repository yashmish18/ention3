import React, { useState, useEffect, use } from "react";
import { Navbar, Footer } from "components";
import Image from "next/image";
import { Loader } from "components/Utils";
import { useLocalStorage } from "react-use";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [coupon, setCoupon] = useState({ status: "pending" });
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("prepaid");
  const [address, setAddress] = useState("Mumbai India");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push("/login?redirect=/ecommerce/checkout1");
        return;
      }
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          name: payload.name,
          email: payload.email
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        router.push("/login?redirect=/ecommerce/checkout1");
        return;
      }
      setAuthLoading(false);
    };
    
    checkAuth();
  }, [router]);

  useEffect(() => {
    let temp =
      products?.length > 0
        ? products.reduce(
            (a, b) =>
              a +
              b.pricing.sellingPrice *
                cart.find((p) => p.slug == b?.slug).quantity,
            0
          )
        : 0;
    // temp = coupon.status == 'applied' ? temp - coupon.discount : temp
    setTotal(temp);
  }, [products, cart, coupon]);

  useEffect(() => {
    if (loading && cart.length > 0) {
      // fetchProducts(cart?.map((p) => p.slug) || []).then((res) => {
      //   if (res.success) {
      //     setProducts(() => res.products);
      //   }
      //   setLoading(false);
      // });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [loading, cart.length]);

  if (authLoading) {
    return (
      <main className="h-screen w-screen center">
        <Loader />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="h-screen w-screen center">
        <h1 className="text-5xl text-white"> Unauthenticated </h1>
      </main>
    );
  }

  if (typeof window !== "undefined") {
    toast.dismiss();
  }

  const updateCount = (action, product) => {
    const i = cart.findIndex((x) => x.slug === product?.slug);
    if (i !== -1) {
      setCart(() => {
        const newCart = [...cart];
        const temp =
          action == "inc"
            ? 1
            : action == "dec" && newCart[i].quantity > 1
            ? -1
            : 0;
        newCart[i].quantity += temp;
        return newCart;
      });
    }
    return;
  };

  const removeFromCart = (product) => {
    const i = cart.findIndex((x) => x.slug === product?.slug);
    const j = cart.findIndex((x) => x.slug === product?.slug);
    if (i !== -1 && j !== -1) {
      const newCart = [...cart];
      const newProducts = [...products];
      newCart.splice(i, 1);
      newProducts.splice(j, 1);
      setCart(newCart);
      setProducts(newProducts);
    }
    return;
  };

  const handleChange = (e) => {
    setCoupon((curr) => ({ ...curr, code: e.target.value }));
  };

  const applyCoupon = async () => {
    const toastId = toast.loading("processing", {
      theme: "colored",
      type: "info",
    });
    const res = await fetch('http://localhost:5000/api/coupon', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: coupon.code,
        amount: total,
      }),
    });
    const data = await res.json();
    if (!data.success)
      return toast.update(toastId, {
        render: data.msg || "Failied to apply coupon",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    setCoupon(() => ({
      ...coupon,
      status: "applied",
      discount: data.discount,
    }));
    return toast.update(toastId, {
      render: "Coupon applied successfully",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") return applyCoupon();
  };

  const handleCheckout = async () => {
    toast.dismiss();
    if (
      products?.length > 0 &&
      !isEditing &&
      address &&
      user?.name &&
      user?.email /*&& user?.phone*/
    ) {
      const toastId = toast.loading("processing", {
        autoClose: 500,
        theme: "colored",
        type: "info",
      });
      const options = {
        user: { ...user, phone: "8888888888" },
        address,
        coupon: coupon?.status == "applied" ? coupon : null,
      };
      options.products = products.map((product) => ({
        slug: product.slug,
        quantity: cart.find((p) => p.slug == product?.slug).quantity,
      }));

      // const payment = await makePayment(paymentMethod, options, toastId);

      // if (payment.success) {
      //   toast.update(toastId, {
      //     render: payment.msg || "Thank you for your order!",
      //     type: "success",
      //     isLoading: false,
      //   });
      //   products.forEach((p) =>
      //     removeFromCart(p)
      //   ); /* Un comment before pushing to production */
      // } else {
      //   toast("Failed to create order.", {
      //     autoClose: 500,
      //     theme: "colored",
      //     type: "error",
      //   });
      // }
    } else {
      toast("Incomplete info!", {
        autoClose: 500,
        theme: "colored",
        type: "error",
      });
    }
  };

  return (
    <main>
      <Navbar />

      <div className="mt-2 text-white">
        <h3 className="text-5xl font-semibold text-center mb-2"> Checkout </h3>
        <div className="flex flex-col lg:flex-row justify-between lg:px-24 mb-6 lg:mb-8 select-none">
          {cart.length > 0 && !loading && products.length > 0 ? (
            <>
              <div className="w-full lg:w-[70%] px-2 lg:px-8 lg:py-10 rounded-md lg:relative">
                <div className="border border-[#007E9E] rounded-md py-3 w-full mb-6">
                  <div className="border-b border-b-[#007E9E] flex w-full pl-6 pr-3">
                    <h2 className="text-2xl font-semibold mb-2">Invoice</h2>
                  </div>
                  <div className="w-full flex justify-between px-6 pt-5">
                    <div className="w-full">
                      <h3 className="text-lg">Name: {user?.name}</h3>
                      <h3 className="text-lg">Email: {user?.email}</h3>
                      <h3 className="text-lg">
                        Phone: {user?.phone || 8888888888}
                      </h3>
                      {isEditing ? (
                        <>
                          <div className="w-full transition-all">
                            <h3 className="text-lg"> Delivery Address: </h3>
                            <input
                              onChange={(e) => setAddress(() => e.target.value)}
                              value={address}
                              type="text"
                              placeholder="Please enter your complete address"
                              className="outline-none bg-transparent rounded-md py-2 px-3 mt-2 border border-[#007E9E] w-full lg:w-[80%]"
                            />
                            <button
                              className="px-7 py-2 outline-none bg-[#007E9E] rounded-md hover:bg-gray-700/50 ml-7"
                              onClick={() => setEditing(false)}
                            >
                              {" "}
                              Save{" "}
                            </button>
                          </div>
                        </>
                      ) : (
                        <h3 className="text-lg">
                          {" "}
                          Delivery Address:{" "}
                          <span className="text-base text-gray-100">
                            {" "}
                            {address ||
                              "Aliquip amet et sit do voluptate pariatur incididunt incididunt elit dolore in eiusmod."}
                          </span>
                        </h3>
                      )}
                    </div>
                    {!isEditing ? (
                      <div className="w-[20%] min-h-full mt-auto flex flex-col justify-end items-end transition-all">
                        <button
                          className="px-7 py-2 outline-none border border-white rounded-md hover:bg-gray-700/50"
                          onClick={() => setEditing(true)}
                        >
                          {" "}
                          Change{" "}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="border border-[#007E9E] rounded-md py-3 w-full mb-6">
                  <div className="border-b border-b-[#007E9E] flex w-full pl-6 pr-3">
                    <h2 className="text-2xl font-semibold mb-2">
                      Payment Methods
                    </h2>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="paymentMethod1"
                      className={
                        "flex w-full py-3 hover:bg-[#007E9E]/20 px-8 cursor-pointer " +
                        (paymentMethod === "prepaid" && "bg-[#007E9E]/10")
                      }
                    >
                      <div className="w-[80%] flex items-center cursor-pointer">
                        <input
                          className="mr-5 h-4 w-4 border-gray-300 outline-none focus:ring-blue-300"
                          type="radio"
                          checked={paymentMethod === "prepaid"}
                          onChange={() => setPaymentMethod("prepaid")}
                          name="paymentMethod"
                          id="paymentMethod1"
                        />
                        <label
                          htmlFor="paymentMethod1"
                          className="text-lg cursor-pointer"
                        >
                          Prepaid (UPI, Debit/Credit Card, Wallet)
                        </label>
                      </div>
                    </label>
                    <label
                      htmlFor="paymentMethod2"
                      className={
                        "flex w-full py-3 hover:bg-[#007E9E]/20 px-8 cursor-pointer " +
                        (paymentMethod === "postpaid" && "bg-[#007E9E]/10")
                      }
                    >
                      <div className="w-[80%] flex items-center cursor-pointer">
                        <input
                          className="mr-5 h-4 w-4 border-gray-300 outline-none focus:ring-blue-300"
                          type="radio"
                          checked={paymentMethod !== "prepaid"}
                          onChange={() => setPaymentMethod("postpaid")}
                          name="paymentMethod"
                          id="paymentMethod2"
                        />
                        <label
                          htmlFor="paymentMethod2"
                          className="text-lg cursor-pointer"
                        >
                          Postpaid (Cash On Delivery)
                        </label>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="border border-[#007E9E] rounded-md py-3 w-full mb-6">
                  <div className="border-b border-b-[#007E9E] flex w-full pl-6 pr-3">
                    <h2 className="text-2xl font-semibold mb-2">
                      Order Summary
                    </h2>
                  </div>

                  <div className="w-full lg:px-5 rounded-md max-h-[60vh] overflow-y-auto customScrollbar">
                    <div className="productList min-h-max">
                      {products.map((product, i) => (
                        <div className="my-3 " key={`cart-product-${i + 1}`}>
                          <div className="flex flex-row py-5">
                            <div className="imgContainer w-[20%] lg:w-[20%] flex items-center ">
                              <Image
                                src={product?.images ? product.images[0] : ""}
                                alt="product"
                                width={150}
                                height={150}
                                className="my-auto"
                              />
                            </div>
                            <div className="w-[80%] lg:w-[75%] flex">
                              <div className="w-full lg:w-[80%]">
                                <h3 className="text-xl truncate">
                                  {" "}
                                  {product?.name}{" "}
                                </h3>
                                <p className="text-sm truncate mt-1 text-gray-300">
                                  {" "}
                                  {product?.description}{" "}
                                </p>
                                <h3 className="text-xl mt-2 text-[#6fdbf6] font-semibold">
                                  {" "}
                                  ₹{" "}
                                  {product?.pricing?.sellingPrice.toLocaleString(
                                    "en-IN"
                                  )}{" "}
                                </h3>
                                <p className="text-base text-gray-200">
                                  {" "}
                                  Sub Total{" "}
                                  <span className="text-[#6fdbf6]/90">
                                    ₹
                                    {(
                                      (product?.pricing?.sellingPrice || 1) *
                                      cart.find((p) => p.slug == product?.slug)
                                        .quantity
                                    )?.toLocaleString("en-IN")}
                                  </span>{" "}
                                </p>
                              </div>
                              <div className="w-full lg:w-[20%] min-w-max h-full flex flex-col justify-center">
                                <div className="flex space-x-3 mt-2">
                                  <button
                                    onClick={() => updateCount("dec", product)}
                                    className="p-2 center text-xs bg-[#007E9E]/30 hover:bg-[#007E9E]/80 rounded-full outline-none"
                                  >
                                    {" "}
                                    <FaMinus />{" "}
                                  </button>
                                  <h3 className="text-xl px-6 border border-[#007E9E] rounded center">
                                    {" "}
                                    {
                                      cart.find((p) => p.slug == product?.slug)
                                        .quantity
                                    }{" "}
                                  </h3>
                                  <button
                                    onClick={() => updateCount("inc", product)}
                                    className="p-2 center text-xs bg-[#007E9E]/30 hover:bg-[#007E9E]/80 rounded-full outline-none"
                                  >
                                    {" "}
                                    <FaPlus />{" "}
                                  </button>
                                </div>
                                <div className="w-full center">
                                  <button
                                    onClick={() => removeFromCart(product)}
                                    className="mt-3 px-2 text-[#007E9E] hover:bg-[#007E9E]/20 rounded"
                                  >
                                    {" "}
                                    Remove{" "}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <div className="w-[20%] h-full my-auto center">
                                <button className="px-7 py-2 border border-white rounded-md hover:bg-gray-700/50"> Change </button>
                            </div> */}
                </div>
              </div>

              {/* ========================== Right Side ========================== */}
              <div className="w-full lg:w-[28%] px-2 lg:px-8 lg:py-10 rounded-md lg:absolute lg:right-8 ">
                <div className="border border-[#007E9E] rounded-md py-3 w-full">
                  <div className="border-b border-b-[#007E9E] flex w-full pl-3 pr-3">
                    <h2 className="text-2xl font-semibold mb-2">
                      Price Details
                    </h2>
                  </div>
                  <div className="px-3 py-5">
                    <h4 className="text-lg font-semibold mb-3">
                      {" "}
                      Price ({count} item{count === 1 ? "" : "s"}): ₹{" "}
                      {total.toLocaleString("en-IN")}
                    </h4>
                    <h4 className="text-lg font-semibold mb-3">
                      {" "}
                      Delivery Charges: {total >= 999 ? "FREE" : "₹ 90"}
                    </h4>
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                      Coupon Code:
                      {coupon.status === "applied" ? (
                        <p className="bg-[#007E9E]/40 cursor-pointer truncate max-w-[60%] px-3 ml-2 rounded-md flex justify-between items-center text-base font-semibold">
                          <span className="truncate" title={coupon.code}>
                            {coupon.code}
                          </span>
                          <span
                            className="ml-3 text-gray-300 cursor-pointer hover:text-white"
                            onClick={() =>
                              setCoupon((curr) => ({ status: "pending" }))
                            }
                          >
                            x
                          </span>
                        </p>
                      ) : (
                        <input
                          type="text"
                          onChange={(e) => handleChange(e)}
                          onKeyDown={(e) => handleKeyDown(e)}
                          className="outline-none border-b border-b-[#007E9E] w-20 bg-transparent -mt-2 ml-2 text-lg font-normal"
                        />
                      )}
                    </h4>
                    <h4 className="text-lg font-semibold mb-3">
                      {" "}
                      Coupon Discount: ₹{" "}
                      {(coupon.discount || 0).toLocaleString("en-IN")}
                    </h4>
                  </div>
                  <div className="border-t border-t-[#007E9E] flex w-full pl-3 pr-3 pt-3">
                    <h3 className="text-xl font-semibold mb-">
                      Total payable: ₹{" "}
                      {(coupon.status == "applied"
                        ? total - coupon.discount
                        : total
                      ).toLocaleString("en-IN")}
                    </h3>
                  </div>
                </div>
                <button
                  className="bg-[#007E9E] hover:bg-[#007E9E]/80 w-full py-3 rounded-md mt-5 font-semibold text-xl"
                  onClick={handleCheckout}
                >
                  {" "}
                  Place Order{" "}
                </button>
              </div>
            </>
          ) : loading ? (
            <div className="w-full min-h-[50vh] center">
              {" "}
              <Loader />{" "}
            </div>
          ) : (
            <div className="w-full min-h-[50vh] center">
              <h2 className="text-4xl text-white">
                {" "}
                Please add a product in cart to proceed.{" "}
              </h2>
            </div>
          )}
        </div>
        {/* <div className="lg:mb-14 w-full bg-[#007E9E] pr-8">
            <div className="max-w-max ml-auto bg-[#007E9E] py-4">
                <Link href='#'>
                    <button className="px-8 py-2 bg-gray-100 shadow hover:bg-white hover:shadow-xl text-black font-semibold rounded-md ml-auto"> Place Order </button>
                </Link>
            </div>
        </div> */}
      </div>
      <Footer />
    </main>
  );
};

export default Checkout;
