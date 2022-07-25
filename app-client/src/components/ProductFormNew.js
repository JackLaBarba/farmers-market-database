import { useNavigate, useOutletContext } from "react-router-dom";
import ProductForm from "./ProductForm";

export default function () {
    const navigate = useNavigate();
    const { createProduct } = useOutletContext();
    
    function goBack() {
        navigate("/products");
    };

    async function submitAction(args) {
        await createProduct(args);
        goBack();
    }
    return <ProductForm submitAction={submitAction} cancelAction={goBack} />;
}