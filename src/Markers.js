import React, { useState } from "react";
import SalonPopup from "./SalonPopup";

function Markers({ salons, opinion, setOpinion }) {
  const [open, setOpen] = useState({ id: 0, open: false });
  const [openID, setOpenID] = useState(0);

  return (
    <>
      {salons &&
        salons.map((salon) => (
          <SalonPopup
            key={salon.properties.id}
            salon={salon}
            setOpinion={setOpinion}
            opinion={opinion}
            setOpinion={setOpinion}
          />
        ))}
    </>
  );
}

export default Markers;
