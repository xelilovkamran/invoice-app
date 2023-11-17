import PropTypes from "prop-types";

function InvoiceStatusElement({ status }) {
  const bgColor = {
    pending: "#FF8F00",
    paid: "#33D69F",
    draft: "#373B53",
  };

  return (
    <div
      className={`bg-[${bgColor[status]}] flex items-center w-24 h-10 justify-center mr-4`}
    >
      <div className={`rounded-full w-2 h-2 bg-red-500 mr-2`}></div>
      <div>{status}</div>
    </div>
  );
}

InvoiceStatusElement.propTypes = {
  status: PropTypes.string.isRequired,
};

export default InvoiceStatusElement;
