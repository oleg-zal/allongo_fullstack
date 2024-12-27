import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";


import { addToCart } from "../redux/actions/cartActions";
import axios from 'axios'

const getProductDetails = async(id) => {
    const { data } = await axios.get(`/api/products/get-one/${id}`);
    return data
}

const ProductDetailsPage = () => {

    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);


  return <ProductDetailsPageComponent  addToCartReduxAction={addToCart} reduxDispatch={dispatch} getProductDetails={getProductDetails} userInfo={userInfo}  />;
};

export default ProductDetailsPage;

