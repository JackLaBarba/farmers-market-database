import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PersonForm from "./PersonForm";

export default function PersonFormNew() {
    const navigate = useNavigate();
    const { createPerson } = useOutletContext();

    const goBack = useCallback(() => {
        navigate("/people");
    },[navigate]);

    async function submitAction(args) {
        await createPerson(args);
        goBack();
    }
    return <PersonForm submitAction={submitAction} cancelAction={goBack} legend="Add Person"/>;
}