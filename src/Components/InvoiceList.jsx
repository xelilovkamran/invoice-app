import PropTypes from "prop-types";
import InvoiceStatusElement from "./InvoiceStatusElement";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function InvoiceList({ invoices }) {
  return (
    <div className="h-[520px] overflow-y-scroll flex flex-col gap-5 pr-3 ">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="px-8 py-4 rounded-lg flex justify-between items-center bg-white"
        >
          <div className="flex gap-12">
            <p className="w-[75px]">#{invoice.id}</p>
            <p>Due {invoice.paymentDue}</p>
            <p>{invoice.clientName}</p>
          </div>
          <div className="flex items-center">
            <p className="mr-10">£ {invoice.total}</p>
            <InvoiceStatusElement status={invoice.status} />
            <Link to={`/invoice/${invoice.id}`}>
              <FaAngleRight className="text-[#7C5DFA]" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
};

export default InvoiceList;
