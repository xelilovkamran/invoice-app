import Button from "@/components/buttons/primaryButton/Button";
import InvoiceContext from "@/context/invoice/InvoiceContext";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

function HomeHeader({ addInvoice: onClick }) {
  const { invoices, filterBy, dispatch } = useContext(InvoiceContext);
  const ref = useRef();

  const showDropDown = () => {
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
      <div className="flex gap-16 items-center ">
        <div className="relative flex flex-col items-center ">
          <div
            className="flex items-center gap-4 cursor-pointer "
            onClick={showDropDown}
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
                <input
                  className="mr-4 cursor-pointer accent-[#9277FF] w-4 h-4"
                  type="checkbox"
                  id="draft"
                  onChange={() => {
                    ref.current.classList.replace("block", "hidden");
                    dispatch({
                      type: "SET_FILTER_BY",
                      payload: filterBy === "draft" ? "filterless" : "draft",
                    });
                  }}
                  checked={filterBy === "draft" ? true : false}
                  disabled={invoices?.length === 0 ? true : false}
                />
                <label
                  htmlFor="draft"
                  className="cursor-pointer text-base font-bold leading-4"
                >
                  Draft
                </label>
              </li>
              <li className="flex items-center mb-4">
                <input
                  className="mr-4 cursor-pointer accent-[#9277FF] w-4 h-4"
                  type="checkbox"
                  id="pending"
                  onChange={() => {
                    ref.current.classList.replace("block", "hidden");
                    dispatch({
                      type: "SET_FILTER_BY",
                      payload:
                        filterBy === "pending" ? "filterless" : "pending",
                    });
                  }}
                  checked={filterBy === "pending" ? true : false}
                  disabled={invoices?.length === 0 ? true : false}
                />
                <label
                  htmlFor="pending"
                  className="cursor-pointer text-base font-bold leading-4"
                >
                  Pending
                </label>
              </li>
              <li className="flex items-center">
                <input
                  className="mr-4 cursor-pointer accent-[#9277FF] w-4 h-4"
                  type="checkbox"
                  id="paid"
                  onChange={() => {
                    ref.current.classList.replace("block", "hidden");
                    dispatch({
                      type: "SET_FILTER_BY",
                      payload: filterBy === "paid" ? "filterless" : "paid",
                    });
                  }}
                  checked={filterBy === "paid" ? true : false}
                  disabled={invoices?.length === 0 ? true : false}
                />
                <label
                  htmlFor="paid"
                  className="cursor-pointer text-base font-bold leading-4"
                >
                  Paid
                </label>
              </li>
            </ul>
          </div>
        </div>

        <Button text={"New Invoice"} type={"newInvoice"} onClick={onClick} />
      </div>
    </header>
  );
}

HomeHeader.propTypes = {
  addInvoice: PropTypes.func.isRequired,
};

export default HomeHeader;
