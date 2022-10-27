import { AuthProvider } from "context/AuthContext";
import { CartProvider } from "context/CartContext";
import { Toaster } from "react-hot-toast";
import Routing from "routes/Routing";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Toaster />
        <Routing />
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
