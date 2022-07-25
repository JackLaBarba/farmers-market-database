import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductForm from "./ProductForm";

export default function ProductFormNew() {
    const navigate = useNavigate();
    const { createProduct } = useOutletContext();

    const goBack = useCallback(() => {
        navigate("/products");
    },[navigate]);

    async function submitAction(args) {
        await createProduct(args);
        goBack();
    }
    return <ProductForm submitAction={submitAction} cancelAction={goBack} legend="Add Product"/>;
}