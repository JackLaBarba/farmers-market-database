import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import EventForm from "./EventForm";

export default function EventFormNew() {
    const navigate = useNavigate();
    const { createEvent } = useOutletContext();

    const goBack = useCallback(() => {
        navigate("/events");
    },[navigate]);

    async function submitAction(args) {
        await createEvent(args);
        goBack();
    }
    return <EventForm submitAction={submitAction} cancelAction={goBack} legend="Add Event"/>;
}