import { useContext, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Avatar,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { cartUpdate, deleteCartItem } from "services/apiService";
import { CartContext } from "context/CartContext";

const CartItemsListing = ({ item }: any) => {
  const cartContext = useContext(CartContext);
  const [isCartItemLoadingDecBtn, setIsCartApiLoadingDecBtn] = useState(0);
  const [isCartItemLoadingIncBtn, setIsCartApiLoadingIncBtn] = useState(0);
  const [isCartItemLoadingDeleteBtn, setIsCartApiLoadingDeleteBtn] =
    useState(0);

  const dec = async (item: { quantity: number; id: any }) => {
    try {
      setIsCartApiLoadingDecBtn(item.id);
      const newQuantity = item.quantity - 1;
      await cartUpdate(item.id, newQuantity);
      setIsCartApiLoadingDecBtn(0);
      cartContext?.toggleTrigger?.();
    } catch (error) {
      console.log(error);
    }
  };

  const inc = async (item: { quantity: number; id: any }) => {
    try {
      setIsCartApiLoadingIncBtn(item.id);
      const newQuantity = item.quantity + 1;
      await cartUpdate(item.id, newQuantity);
      setIsCartApiLoadingIncBtn(0);
      cartContext?.toggleTrigger?.();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (item: { id: any }) => {
    try {
      setIsCartApiLoadingDeleteBtn(item.id);
      await deleteCartItem(item.id);
      setIsCartApiLoadingDeleteBtn(0);
      cartContext?.toggleTrigger?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Grid item xs={12} key={item.id}>
        <Card sx={{ display: "flex", mb: 2 }} elevation={20}>
          <CardMedia
            component="img"
            image={item.image.url}
            sx={{ height: 100, width: 100, m: 1.5 }}
          ></CardMedia>
          <CardContent>
            <Typography variant="h5">{item.name}</Typography>
            <Button
              variant="contained"
              color="error"
              disabled={isCartItemLoadingDecBtn === item.id ? true : false}
              onClick={() => dec(item)}
            >
              -
            </Button>
            <Button
              variant="contained"
              disabled={isCartItemLoadingIncBtn === item.id ? true : false}
              onClick={() => inc(item)}
              sx={{ ml: 1 }}
            >
              +
            </Button>
            <Chip
              avatar={<Avatar>{item.quantity}</Avatar>}
              label="qty"
              variant="outlined"
              sx={{ m: 1 }}
            />
            <Chip label={"Rs " + item.price.raw} variant="outlined" />
            <IconButton
              disabled={isCartItemLoadingDeleteBtn === item.id ? true : false}
              onClick={() => deleteHandler(item)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default CartItemsListing;
