import PropTypes from "prop-types";
import Button from "./buttons/Button";

function NewInvoice({ reference }) {
  const cancelNewInvoice = () => {
    reference.current.classList.replace(
      "translate-x-[0px]",
      "translate-x-[-500px]"
    );
    reference.current.classList.remove("active");
    document.getElementById("root").setAttribute("class", "bg-[#F8F8FB]");
  };
  return (
    <div
      ref={reference}
      className="h-screen absolute z-[50] translate-x-[-500px] transition-all duration-200 ease delay-0 flex flex-col justify-between rounded-3xl overflow-hidden"
    >
      <div className="bg-[#DFE3FA] flex-1 rounded-tr-3xl pl-40 pt-10 overflow-y-auto pr-10">
        <h1 className="text-left text-2xl font-bold leading-8">New Invoice</h1>
      </div>
      <div className="bg-white rounded-br-3xl pl-40 py-8">
        <Button
          type="discardNewInvoice"
          text="discard"
          onClick={cancelNewInvoice}
        />
      </div>
    </div>
  );
}

NewInvoice.propTypes = {
  reference: PropTypes.object.isRequired,
};

export default NewInvoice;
