import { Input, Modal, Text, TombacApp } from "tombac";
import { useEffect, useState } from "react";
import { SimpleSelect } from "tombac/dist/components/Form/SimpleSelect";

export const AddBeautifingServiceType = ({ bs }) => {
  const [salons, setSalons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [lastId, setLastId] = useState(2);
  const [town, setTown] = useState(2);
  const [nameSalon, setNameSalon] = useState(2);
  const [townOptions, setTownOptions] = useState([]);
  const [townValue, setTownValue] = useState(null);
  const [salonOptions, setSalonOptions] = useState([]);
  const [salonValue, setSalonValue] = useState(null);
  const [id, setId] = useState(0);

  useEffect(() => {
    getUniqueTown(setTownOptions);
    getUniqueSalon(setSalonOptions);
  }, []);

  useEffect(() => {
    async function load() {
      if (salonValue != null && townValue != null) {
        const response = await fetch(
          `http://localhost:8080/beautifying-service/search-by-name-and-town`,
          {
            method: "POST",
            body: JSON.stringify({
              id: 0,
              typeOfService: "",
              nameOfSalon: salonValue,
              town: townValue,
              lat: 0,
              lon: 0,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let json = [];

        if (response.ok) {
          json = await response.json();
          setId(json);
        } else {
          alert("Nie ma takiego salonu w podanym miescie!");
          setId(0);
        }
      }
    }
    load();
  }, [salonValue, townValue]);

  return (
    <>
      <TombacApp theme={{ settings: { modalZIndex: 10 } }}>
        <button class="AddBst" onClick={() => setIsOpen(true)}>
          Add type service
        </button>
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <Text padding={3}>
            <h2>Enter the data,to add beautifing service type</h2>
            <p>
              <SimpleSelect
                $width="300px"
                class="simleSelect"
                onChange={setSalonValue}
                options={salonOptions}
                value={salonValue}
              />
            </p>
            <p>
              <SimpleSelect
                $width="300px"
                class="simleSelect"
                onChange={setTownValue}
                options={townOptions}
                value={townValue}
              />
            </p>

            <Input
              style={{ margin: "0 0 10px 0" }}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name of service"
              width="300px"
              type="text"
              id="input-sn"
            />
            <br></br>

            <Input
              style={{ margin: "0 0 10px 0" }}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              width="300px"
              min="0"
              type="number"
              id="input-sln"
            />
            <br></br>

            <button
              class="myButton"
              onClick={() => {
                load(name, price, id, setName, setPrice);
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

async function load(name, price, id, setName, setPrice) {
  if (id !== 0 && name != null && price != null) {
    const response = await fetch(
      `http://localhost:8080/beautifying-service-type`,
      {
        method: "POST",
        body: JSON.stringify({
          id: 0,
          name: name,
          price: price,
          beautifyingServiceId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      document.getElementById("input-sn").value = "";
      document.getElementById("input-sln").value = "";
      setName(null);
      setPrice(null);
    }
  } else {
    alert(
      " Wprowadziles niepoprawne dane w wyborze miasta i nazwe salonu badz nie wprowadziles nazwy i ceny "
    );
  }
}

async function getUniqueTown(setTownOptions) {
  const response = await fetch(
    `http://localhost:8080/beautifying-service/unique-town`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const json = await response.json();

    setTownOptions(
      json.map((town) => {
        return { value: town, label: town };
      })
    );
  } else {
    alert("Nie mozna pobrac danych");
  }
}

async function getUniqueSalon(setSalonOptions) {
  const response = await fetch(
    `http://localhost:8080/beautifying-service/unique-salon`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const json = await response.json();

    setSalonOptions(
      json.map((salon) => {
        return { value: salon, label: salon };
      })
    );
  } else {
    alert("Nie mozna pobrac danych");
  }
}

export default AddBeautifingServiceType;
