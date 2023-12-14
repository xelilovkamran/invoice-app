import { FaCirclePlus } from "react-icons/fa6";
import PropTypes from "prop-types";

function Button({ text, type, onClick }) {
  const styles = {
    newInvoice: {
      button:
        "flex items-center justify-center gap-4 bg-[#7C5DFA] rounded-full p-2 text-white",
      text: "font-bold text-base leading-4",
    },
    discardNewInvoice: {
      button: "rounded-full bg-[#F9FAFE] py-5 px-6",
      text: "font-bold text-base leading-4 text-[#7E88C3]",
    },
  };
  return (
    <button type="button" className={styles[type].button} onClick={onClick}>
      {type === "newInvoice" && (
        <FaCirclePlus className="bg-transparent text-white w-8 h-8" />
      )}
      <p className={styles[type].text}>{text}</p>
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
