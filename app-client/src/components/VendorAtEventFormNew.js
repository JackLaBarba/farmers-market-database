import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import VendorAtEventForm from "./VendorAtEventForm";

export default function VendorAtEventFormNew() {
    const navigate = useNavigate();
    const { createVendorAtEvent } = useOutletContext();

    const goBack = useCallback(() => {
        navigate("/vendors_at_events");
    },[navigate]);

    async function submitAction(args) {
        await createVendorAtEvent(args);
        goBack();
    }
    return <VendorAtEventForm submitAction={submitAction} cancelAction={goBack} legend="Add Vendor at Event"/>;
}