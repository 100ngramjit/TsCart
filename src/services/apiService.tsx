// @ts-ignore
import Commerce from "@chec/commerce.js";

const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);

const getProducts = (pageNumber: number) => {
  return commerce.products.list({
    limit: 3,
    page: pageNumber,
  });
};

const getProductsInSortedOrder = (sortOrder: string, pageNumber: number) => {
  return commerce.products.list({
    sortBy: "price",
    sortDirection: sortOrder,
    limit: 3,
    page: pageNumber,
  });
};

const addToCart = async (id: any, qty: any) => {
  await commerce.cart.add(id, qty);
};

export { getProducts, addToCart, getProductsInSortedOrder };
