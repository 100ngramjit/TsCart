import { Container, Grid, Typography, Box } from "@mui/material";
import CartItemsListing from "components/CartItemsListing";
import { retrieveCart } from "services/apiService";
import { CartContext } from "context/CartContext";
import { useState, useEffect, useContext } from "react";
import { FadeLoader } from "react-spinners";

type prod = {
  id: number;
  name: string;
  description: string;
  price: { raw: number };
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  image: { url: string };
  quantity: number;
};

const Cart = () => {
  const cartContext = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [products, setProducts] = useState({
    subtotal: { raw: 0 },
    line_items: [],
  });
  useEffect(() => {
    const cartFetch = async () => {
      try {
        const items = await retrieveCart();
        setProducts(items);
        if (items.line_items.length === 0) {
          setIsCartEmpty(true);
        } else {
          setIsCartEmpty(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    cartFetch();
  }, [cartContext.trigger]);

  return (
    <Container>
      <Grid container sx={{ m: 1 }}>
        <Grid item xs={9}>
          <Box
            sx={{
              height: 400,
              mr: 1,
              p: 1,
            }}
          >
            <Typography variant="h4">Cart Items</Typography>
            {!isLoading ? (
              products.line_items.map((item: prod) => (
                <CartItemsListing item={item} key={item.id} />
              ))
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
              >
                <FadeLoader color="#4a9b7f" />
              </Box>
            )}
            {isCartEmpty && !isLoading && (
              <Box
                display="flex"
                justifyContent="center"
                minHeight="50vh"
                alignItems="center"
              >
                <Typography variant="h3">
                  Your cart is empty.Start shopping!
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
