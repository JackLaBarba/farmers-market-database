import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import StockedProductForm from "./StockedProductForm";

export default function StockedProductFormNew() {
    const navigate = useNavigate();
    const { createStockedProduct } = useOutletContext();

    const goBack = useCallback(() => {
        navigate("/stocked_products");
    },[navigate]);

    async function submitAction(args) {
        await createStockedProduct(args);
        goBack();
    }
    return <StockedProductForm submitAction={submitAction} cancelAction={goBack} legend="Add Stocked Product"/>;
}