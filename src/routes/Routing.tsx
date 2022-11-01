import { Routes, Route } from "react-router-dom";
import Layout from "components/Layout";
import Cart from "pages/Cart";
import Listing from "pages/Listing";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Listing />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default Routing;
