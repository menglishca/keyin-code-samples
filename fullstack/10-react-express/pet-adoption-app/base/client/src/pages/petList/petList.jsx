import "./petList.css";

export function PetList() {
    const pets = [
        { name: "Local", type: "Dog", age: 3 },
        { name: "React", type: "Cat", age: 2 }
    ];

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
