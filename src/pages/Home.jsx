import { useContext, useEffect } from "react";
import Layout from "../shared/Layout";
import ProductContext from "../context/ProductProvider";

import ProductsItems from "../shared/ProductsItems";

function Home() {
  
  const { Product } = useContext(ProductContext);

  useEffect(() => {
    console.log("Product:", Product);
  }, [Product]);

  // console.log("hi");

  // useEffect(()=>{},[])
  return (
    <Layout>
      {/* <Navbar /> */}

      <div className="min-h-screen p-4">
        <div
          style={{
            backgroundImage: "url('/images/ban1.jpg')",
          }}
          className="banner1 bg-cover bg-center h-[500px] w-full"
        ></div>

        <div className="banner2">
          <ProductsItems Product={Product} />
        </div>
      </div>

      {/* <Footer /> */}
    </Layout>
  );
}

export default Home;
