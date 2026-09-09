import { useContext, useEffect, useState } from "react";
import Layout from "../shared/Layout";
import ProductsItems from "../shared/ProductsItems";
import ProductContext from "../context/ProductProvider";

function Men() {
  const { Product } = useContext(ProductContext);
  const [MenProduct, setMenProduct] = useState([]);

  useEffect(() => {
    const found = Product.filter((item) => item?.category === "men");

    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMenProduct(found);
    }
  }, [Product]);

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="bg-black h-[300px] flex justify-center items-center">
          <p className="font-semibold text-xl text-white text-center">Men</p>
        </div>

        <ProductsItems Product={MenProduct} />
      </div>
      Men
    </Layout>
  );
}

export default Men;
