import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function InvoiceStatusElement({ status }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (status === "paid") {
      setColor("#33D69F");
    } else if (status === "pending") {
      setColor("#FF8F00");
    } else {
      setColor("#373b53");
    }
  }, [status]);

  return (
    <div
      className=" flex items-center w-24 h-10 justify-center mr-4 rounded-md"
      style={{ backgroundColor: `${color}10` }}
    >
      <div
        className="rounded-full w-2 h-2 mr-2 opacity-100 mt-1"
        style={{ backgroundColor: color }}
      ></div>
      <div style={{ color }}>{status}</div>
    </div>
  );
}

InvoiceStatusElement.propTypes = {
  status: PropTypes.string.isRequired,
};

export default InvoiceStatusElement;
