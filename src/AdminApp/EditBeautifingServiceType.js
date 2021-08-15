import { Input, Modal, Text, TombacApp } from "tombac";
import { useEffect, useState } from "react";

export const EditBeautifingServiceType = ({ bs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  return (
    <>
      <h2>Enter the data,to edit them</h2>
      <Input
        style={{ margin: "0 0 10px 0" }}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name of service"
        width="300px"
        type="text"
        id="input-name"
      />
      <br></br>

      <Input
        style={{ margin: "0 0 10px 0" }}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
        width="300px"
        min="0"
        type="number"
        id="input-price"
      />
      <br></br>

      <button
        class="myButton"
        onClick={() => {
          console.log();
          load(name, price, bs.id);
        }}
      >
        Edit
      </button>
    </>
  );
};

async function load(name, price, bs) {
  const response = await fetch(
    `http://localhost:8080/beautifying-service-type/${bs}`,
    {
      method: "PUT",
      body: JSON.stringify({
        id: 0,
        name: name,
        price: price,
        beautifyingServiceId: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // setSalons([]);
  document.getElementById("input-name").value = "";
  document.getElementById("input-price").value = "";
}

export default EditBeautifingServiceType;
