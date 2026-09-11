import { useContext } from "react";
import { BsPerson } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import ProductContext from "../context/ProductProvider";

function Navbar() {
  const { cartCount } = useContext(ProductContext);
  const navs = [
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Men",
      path: "/men",
    },
    {
      title: "Women",
      path: "/women",
    },
    {
      title: "Kids",
      path: "/kids",
    },
  ];

  return (
    <div className="bg-black p-4 flex justify-between sticky top-0 left-0 z-[100]">
      <Link
        to={"/"}
        className="logo bg-white p-2 rounded-full h-14 w-14 text-black font-semibold flex justify-center items-center"
      >
        Helix
      </Link>

      <div className="flex justify-between gap-4 items-center ">
        {navs.map((item, i) => (
          <NavLink
            className={({ isActive }) =>
              ` ${isActive ? "bg-white text-black" : "text-white"}        border-white rounded-3xl p-2 border-[2px] hover:bg-white hover:text-black transition ease-in-out duration-300`
            }
            key={i}
            to={item.path}
          >
            {item.title}
          </NavLink>
        ))}
      </div>

      <div className="flex justify-between items-center gap-3">
        <span className="text-white">
          <BsPerson className="h-7 w-6" />
        </span>
        <Link to="/checkout" className="text-white relative ">
          <CgShoppingCart className="h-7 w-6" />

          <p className="absolute top-[-10px] right-[-5px]">{cartCount || 0}</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
