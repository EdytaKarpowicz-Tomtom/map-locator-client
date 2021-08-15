import { Input, Modal, Text, TombacApp } from "tombac";
import { useState } from "react";

export const AddBeautifingService = ({ bs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceType, setServiceType] = useState(false);
  const [salonName, setSalonName] = useState(false);
  const [town, setTown] = useState(false);
  const [lat, setLat] = useState(false);
  const [lon, setLon] = useState(false);
  return (
    <>
      <TombacApp theme={{ settings: { modalZIndex: 10 } }}>
        <button class="AddBs" onClick={() => setIsOpen(true)}>
          Add service
        </button>
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <Text padding={3}>
            <h2>Enter the data,to add beautifing service</h2>
            <Input
              style={{ margin: "0 0 10px 0" }}
              onChange={(e) => setServiceType(e.target.value)}
              placeholder="Enter service name"
              width="300px"
              type="text"
              id="input-sn"
            />
            <br></br>

            <Input
              style={{ margin: "0 0 10px 0" }}
              onChange={(e) => setSalonName(e.target.value)}
              placeholder="Enter salon name"
              width="300px"
              min="0"
              type="text"
              id="input-sln"
            />
            <br></br>

            <Input
              style={{ margin: "0 0 10px 0" }}
              onChange={(e) => setTown(e.target.value)}
              placeholder="Enter town name"
              width="300px"
              min="0"
              type="text"
              id="input-t"
            />
            <br></br>

            <Input
              style={{ margin: "0 0 10px 0" }}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Enter latitude"
              width="300px"
              min="0"
              type="number"
              id="input-lat"
            />
            <br></br>

            <Input
              style={{ margin: "0 0 10px 0" }}
              onChange={(e) => setLon(e.target.value)}
              placeholder="Enter longitude"
              width="300px"
              min="0"
              type="number"
              id="input-lon"
            />
            <br></br>

            <button
              class="myButton"
              onClick={() => {
                load(serviceType, salonName, town, lat, lon);
              }}
            >
              Add
            </button>
          </Text>
        </Modal>
      </TombacApp>
    </>
  );
};

async function load(serviceType, salonName, town, lat, lon) {
  const response = await fetch(`http://localhost:8080/beautifying-service`, {
    method: "POST",
    body: JSON.stringify({
      id: 0,
      typeOfService: serviceType,
      nameOfSalon: salonName,
      town: town,
      lat: lat,
      lon: lon,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.getElementById("input-sn").value = "";
  document.getElementById("input-sln").value = "";
  document.getElementById("input-t").value = "";
  document.getElementById("input-lat").value = "";
  document.getElementById("input-lon").value = "";
}

export default AddBeautifingService;
