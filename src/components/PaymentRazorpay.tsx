import { Button } from "@mui/material";
import { CartContext } from "context/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import useRazorpay from "react-razorpay";
import { emptyCart } from "services/apiService";

export default function PaymentRazorpay({ price, name }: any) {
  const cartContext = useContext(CartContext);
  const Razorpay = useRazorpay();
  const key = process.env.REACT_APP_RAZORPAY_KEY as string;
  const pay = () => {
    const opt = {
      order_id: "",
      amount: price + "00",
      currency: "INR",
      receipt: "#1",
      name: "Sangramjit",
      key: key,
      handler: async function (response: any) {
        if (response.razorpay_payment_id) {
          try {
            await emptyCart();
            cartContext?.toggleTrigger?.();
            toast.success("Payment Successful");
            console.log(price);
          } catch (err) {
            toast.error("Payment Failed");
          }
        } else {
          toast.error("Payment Failed");
        }
      },
      theme: {
        color: "#01BAEF",
      },
    };

    const razorpayInit = new Razorpay(opt);

    razorpayInit.on("payment.failed", (res: any) => {
      console.log("Payment Failed: ", res);
    });

    razorpayInit.open();
  };

  return (
    <Button
      variant="contained"
      onClick={pay}
      disabled={name === "" || price === 0 ? true : false}
    >
      Checkout
    </Button>
  );
}
