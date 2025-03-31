import { useEffect, useState } from "react";
import "./petList.css";

export function PetList() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
      fetch("/api/pets")
        .then(res => res.json())
        .then(data => setPets(data));
    }, []);  

    return (
        <>
            <h1>Adoptable Pets</h1>
            <ul>
                {pets.map((pet, i) => (
                    <li key={i}>{pet.name} ({pet.type}, {pet.age} years old)</li>
                ))}
            </ul>
        </>
    );
}
