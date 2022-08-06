import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import LocationForm from "./LocationForm";

export default function LocationFormNew() {
    const navigate = useNavigate();
    const { createLocation } = useOutletContext();

    const goBack = useCallback(() => {
        navigate("/locations");
    },[navigate]);

    async function submitAction(args) {
        await createLocation(args);
        goBack();
    }
    return <LocationForm submitAction={submitAction} cancelAction={goBack} legend="Add Location"/>;
}