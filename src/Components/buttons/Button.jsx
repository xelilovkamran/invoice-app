import { FaCirclePlus } from "react-icons/fa6";
import PropTypes from "prop-types";

function Button({ text, type, onClick }) {
  const styles = {
    newInvoice: {
      button:
        "flex items-center justify-center gap-4 bg-[#7C5DFA] rounded-full p-2 text-white transition-all duration-300 hover:bg-[#9277FF]",
      text: "font-bold text-base leading-4",
    },
    discardNewInvoice: {
      button: "rounded-full bg-[#ebebec] py-5 px-6",
      text: "font-bold text-base leading-4 text-[#7E88C3]",
    },
    newItem: {
      button:
        "flex w-full justify-center items-center rounded-full mt-4 bg-[#F9FAFE] p-4 transition-all duration-300 hover:bg-[#DFE3FA]",
      text: "text-base font-bold leading-4 text-[#7E88C3]",
    },
    saveDraft: {
      button:
        "rounded-full bg-[#373B53] py-4 px-6 hover:bg-[#0C0E16] transition-all duration-300",
      text: "text-[#888EB0] text-base font-bold leading-4 tracking-tight hover:text-[#888EB0]",
    },
    saveSend: {
      button:
        "rounded-full bg-[#7C5DFA] py-4 px-6 hover:bg-[#9277FF] transition-all duration-300",
      text: "text-white text-base font-bold leading-4 tracking-tight",
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
