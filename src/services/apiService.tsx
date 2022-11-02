// @ts-ignore
import Commerce from "@chec/commerce.js";

const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY);

const getCartContents = () => {
  return commerce.cart.contents();
};

const retrieveCart = () => {
  return commerce.cart.retrieve();
};

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

const cartUpdate = (id: any, newQuantity: any) => {
  return commerce.cart.update(id, { quantity: newQuantity });
};

const deleteCartItem = (id: any) => {
  return commerce.cart.remove(id);
};

const addToCart = async (id: any, qty: any) => {
  await commerce.cart.add(id, qty);
};

const emptyCart = async () => {
  await commerce.cart.empty();
};
export {
  getCartContents,
  cartUpdate,
  deleteCartItem,
  retrieveCart,
  getProducts,
  addToCart,
  emptyCart,
  getProductsInSortedOrder,
};
