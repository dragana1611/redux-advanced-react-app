import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
// import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     // dispatch(
  //     //   uiActions.showNotification({
  //     //     status: "pending",
  //     //     title: "Sending...",
  //     //     message: "Sending Cart data",
  //     //   })
  //     // );
  //     // const response = await fetch(
  //     //   "https://redux-advanced-4462a-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
  //     //   { method: "PUT", body: JSON.stringify(cart) }
  //     // ); //PUT will override existing data
  //     // if (!response.ok) {
  //     //   throw new Error("Sending Cart data failed.");
  //     // }
  //     // dispatch(
  //     //   uiActions.showNotification({
  //     //     status: "success",
  //     //     title: "Success!",
  //     //     message: "Sent Cart data successfully!",
  //     //   })
  //     // );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {}); //catch any errors that might be thrown from inside this function
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
