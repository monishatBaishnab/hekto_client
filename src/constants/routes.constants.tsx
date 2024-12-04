import Book from "@/pages/Book";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import Shop from "@/pages/Shop";
import ShopDetails from "@/pages/ShopDetails";

const client_route_config = [
  {
    path: "/",
    label: "Home",
    element: <Home />,
  },
  {
    path: "products",
    label: "Products",
    element: <Products />,
  },
  {
    path: "products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/shop",
    label: "Shop",
    element: <Shop />,
  },
  {
    path: "/shop/:id",
    element: <ShopDetails />,
  },
  {
    path: "/book",
    element: <Book />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
];
export default client_route_config;
