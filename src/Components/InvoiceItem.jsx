import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaAngleRight } from "react-icons/fa";
import InvoiceStatusElement from "./InvoiceStatusElement";

function InvoiceItem({ invoice }) {
  return (
    <div>
      <Link to={`/invoice/${invoice.id}`}>
        <div className="px-8 py-4 rounded-lg flex justify-between items-center bg-white">
          <div className="flex gap-12">
            <p className="w-[80px] text-base font-bold leading-4">
              {" "}
              <span className="text-[#7E88C3]"># </span>
              {invoice.id}
            </p>
            <p className="text-sm font-medium leading-4 tracking-[-0.1px] text-[#7E88C3] w-[110px] dark:text-red-300">
              <span className="text-[#888EB0]">Due </span>
              {new Date(invoice.paymentDue).toLocaleDateString("en-US", {
                weekday: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="text-sm font-semibold leading-4 tracking-[-0.1px] text-[#7E88C3]">
              {invoice.clientName}
            </p>
          </div>
          <div className="flex items-center">
            <p className="mr-10 text-right text-base font-bold tracking-tight">
              £ {invoice.total}
            </p>
            <InvoiceStatusElement status={invoice.status} />
            {/* <Link to={`/invoice/${invoice.id}`}> */}
            <FaAngleRight className="text-[#7C5DFA]" />
            {/* </Link> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

InvoiceItem.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default InvoiceItem;
