import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import VendorForm from "./VendorForm";

export default function VendorFormNew() {
    const navigate = useNavigate();
    const { createVendor } = useOutletContext();

    const goBack = useCallback(() => {
        navigate("/vendors");
    },[navigate]);

    async function submitAction(args) {
        await createVendor(args);
        goBack();
    }
    return <VendorForm submitAction={submitAction} cancelAction={goBack} legend="Add Vendor"/>;
}