import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import Service from "./components/Home/Service";
import About from "./components/Home/About";
import Contact from "./components/Home/Blog";
import Footer from "./components/footer/Footer";
import { Switch, Route } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails";
import Search from "./components/layout/Search";
import Login from "./components/layout/Login";
import Store from "./Store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/layout/Profile";
import UpdateProfile from "./components/layout/UpdateProfile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdatePassword from "./components/layout/UpdatePassword";
import Cart from "./components/layout/Cart";
import Shipping from "./components/layout/Shipping";
import ConfirmOrder from "./components/layout/ConfirmOrder";
import Payment from "./components/layout/Payment.js";
import axios from "axios";
import Loader from "./components/layout/Loader/Loader";
import orderSuccess from "./components/layout/orderSuccess";
import MyOrders from "./components/layout/MyOrders";
import OrderDetails from "./components/layout/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import NotFound from "./components/layout/Not Found/NotFound";

const App = () => {
  const [stripeApiKey, setStripApiKey] = useState("");

  React.useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/products/:keyword">
          <Service />
        </Route>
        <Route path="/products/">
          <Service />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/product/:id">
          <ProductDetails />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/loader">
          <Loader />
        </Route>

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/process/payment" component={Payment} />
        <ProtectedRoute exact path="/success" component={orderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
