import EditProductPageComponent from "./components/EditProductPageComponent";

import { useSelector } from "react-redux";



const AdminEditProductPage = () => {


    const { categories } = useSelector((state) => state.getCategories);


  return <EditProductPageComponent categories={categories} />;
};

export default AdminEditProductPage;

