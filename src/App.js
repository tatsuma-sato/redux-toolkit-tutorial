import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading)
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="App">
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </div>
  );
}

export default App;
