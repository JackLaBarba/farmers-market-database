import { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import PersonForm from "./PersonForm";

export default function PersonFormUpdate() {
    const navigate = useNavigate();
    const { updatePerson, people } = useOutletContext();
    const person_id = parseInt(useParams().person_id);
    const [person, setPerson] = useState();

    const goBack = useCallback(() => {
        navigate("/people");
    },[navigate]);

    useEffect(() => {
        const person = people.find(p => p.person_id === person_id);
        if (!person) {
            goBack();
        }
        setPerson(people.find(p => p.person_id === person_id));
    }, [person_id, people, goBack]);


    async function submitAction(attributes) {
        await updatePerson(person_id, attributes);
        goBack();
    };

    return <PersonForm
        submitAction={submitAction}
        cancelAction={goBack}
        person={person}
        legend={`Update person ${person_id}`} />;
}