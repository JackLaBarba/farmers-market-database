import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

export default function ProductFormUpdate() {
    const navigate = useNavigate();
    const { updateProduct, products } = useOutletContext();
    const product_id = parseInt(useParams().product_id);
    const [product, setProduct] = useState();

    const goBack = useCallback(() => {
        navigate("/products");
    },[navigate]);

    useEffect(() => {
        const product = products.find(p => p.product_id === product_id);
        if (!product) {
            goBack();
        }
        setProduct(products.find(p => p.product_id === product_id));
    }, [product_id, products, goBack]);


    async function submitAction(attributes) {
        await updateProduct(product_id, attributes);
        goBack();
    };

    return <ProductForm
        submitAction={submitAction}
        cancelAction={goBack}
        product={product}
        legend={`Update product ${product_id}`} />;
}