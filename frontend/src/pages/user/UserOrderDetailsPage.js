import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from 'axios'
import { loadScript } from "@paypal/paypal-js";

const getOrder = async (orderId) => {
    const { data } = await axios.get("/api/orders/user/" + orderId);
    return data;
}

const loadPayPalScript = (cartSubtotal, cartItems) => {
    loadScript({"client-id": "ARjJG2VSJ_890zcTBbbFwYg0yQs-fCq5eVT1XtM9sTzulcy8r2TK-xnPnkdQT35e5gAPejciP0UmH_Q4"})
    .then(paypal => {
        paypal
        .Buttons(buttons(cartSubtotal, cartItems))
        .render("#paypal-container-element");
    })
    .catch(err => {
        console.error("failed to load the PayPal JS SDK script", err);
    })
}

const buttons = (cartSubtotal, cartItems) => {
    return {
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: cartSubtotal,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: cartSubtotal,
                                }
                            }
                        },
                        items: cartItems.map(product => {
                            return {
                               name: product.name,
                                unit_amount: {
                                   currency_code: "USD", 
                                   value: product.price,
                                },
                                quantity: product.quantity,
                            }
                        })
                    }
                ]
            })
        },
        onCancel: onCancelHandler,
        onApprove: onApproveHandler,
        onError: onErrorHandler,
    }
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

