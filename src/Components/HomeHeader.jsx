import PropTypes from "prop-types";
import { FaAngleDown } from "react-icons/fa";
import { useRef } from "react";

function HomeHeader({ invoices }) {
  const ref = useRef();

  const onClick = () => {
    ref.current.classList.contains("hidden")
      ? ref.current.classList.replace("hidden", "block")
      : ref.current.classList.replace("block", "hidden");
  };

  return (
    <header className="flex justify-between items-center mb-16 ">
      <div>
        <h1 className="text-4xl font-bold leading-none pb-2 text-[#0C0E16]">
          Invoices
        </h1>
        {invoices?.length === 0 ? (
          <p className="text-xs leading-4 font-medium text-[#888EB0] tracking-[-0.1px]">
            No invoices
          </p>
        ) : (
          <p className="text-xs leading-4 font-medium text-[#888EB0] ">
            There are {invoices?.length} total{" "}
            {invoices?.length === 1 ? "invoice" : "invoices"}
          </p>
        )}
      </div>
      <div className="flex gap-16">
        <div className="relative flex flex-col items-center ">
          <div
            className="flex items-center gap-4 cursor-pointer "
            onClick={onClick}
          >
            <span className="text-base font-bold leading-4 mr-1 text-[#0C0E16]">
              Status
            </span>
            <FaAngleDown className="text-[#7C5DFA]" />
          </div>
          <div
            className="absolute top-12 bg-white hidden rounded-lg box-content p-6 pr-20"
            ref={ref}
          >
            <ul>
              <li className="flex items-center mb-4">
                <input className="mr-4 " type="checkbox" id="draft" />
                <label htmlFor="draft">Draft</label>
              </li>
              <li className="flex items-center mb-4">
                <input className="mr-4" type="checkbox" id="pending" />
                <label htmlFor="pending">Pending</label>
              </li>
              <li className="flex items-center">
                <input className="mr-4" type="checkbox" id="paid" />
                <label htmlFor="paid">Paid</label>
              </li>
            </ul>
          </div>
        </div>

        <button>New Invoice</button>
      </div>
    </header>
  );
}

HomeHeader.propTypes = {
  invoices: PropTypes.array.isRequired,
};

export default HomeHeader;
