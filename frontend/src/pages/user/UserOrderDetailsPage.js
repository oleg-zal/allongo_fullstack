import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from 'axios'
import { loadScript } from "@paypal/paypal-js";

const getOrder = async (orderId) => {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    return data;
}

const loadPayPalScript = () => {
    loadScript({"client-id": "ARjJG2VSJ_890zcTBbbFwYg0yQs-fCq5eVT1XtM9sTzulcy8r2TK-xnPnkdQT35e5gAPejciP0UmH_Q4"})
    .then(paypal => {
        paypal
        .Buttons({
            createOrder: createPayPalOrderHandler,
            onCancel: onCancelHandler,
            onApprove: onApproveHandler,
            onError: onErrorHandler,

        })
        .render("#paypal-container-element");
    })
    .catch(err => {
        console.error("failed to load the PayPal JS SDK script", err);
    })
}

const createPayPalOrderHandler = function () {
    console.log("createPayPalOrderHandler");
}

const onCancelHandler = function () {
    console.log("cancel");
}

const onApproveHandler = function () {
    console.log("onApproveHandler");
}

const onErrorHandler = function (err) {
    console.log("error");
}

const UserOrderDetailsPage = () => {
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    }

  return <UserOrderDetailsPageComponent userInfo={userInfo} getUser={getUser} getOrder={getOrder} loadPayPalScript={loadPayPalScript} />;
};

export default UserOrderDetailsPage;

