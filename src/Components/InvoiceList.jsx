import PropTypes from "prop-types";
import InvoiceStatusElement from "./InvoiceStatusElement";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function InvoiceList({ invoices }) {
  return (
    <>
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="m-5 ml-0 flex justify-between items-center"
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
    </>
  );
}

InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
};

export default InvoiceList;
