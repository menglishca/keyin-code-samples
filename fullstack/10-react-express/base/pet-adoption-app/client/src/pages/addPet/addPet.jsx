import { useState } from "react";
import "./addPet.css";

export function AddPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pretending to add ${name} the ${type}, age ${age}`);
    setName("");
    setType("");
    setAge("");
  };

  return (
    <>
      <h1>Add a New Pet</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={type} onChange={e => setType(e.target.value)} placeholder="Type" required />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" type="number" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
