import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaAngleRight } from "react-icons/fa";
import InvoiceStatusElement from "@/components/home/invoiceStatusElement/InvoiceStatusElement";

import InvoiceContext from "@/context/invoice/InvoiceContext";
import { useContext } from "react";
import dayjs from "dayjs";
import useMobileDesign from "@/hooks/useMobileDesign";

function InvoiceItem({ invoice }) {
  const { dispatch } = useContext(InvoiceContext);
  const { isMobile } = useMobileDesign(768);

  const onClick = () => {
    dispatch({ type: "SELECT_INVOICE", payload: invoice });
  };

  return (
    <div onClick={onClick}>
      <Link to={`/invoice/${invoice.id}`}>
        <div className="px-8 py-4 rounded-lg flex justify-between items-center shadow-lg border-[1px] border-transparent bg-white hover:border-[#7C5DFA]">
          <div className="grid grid-cols-3 w-3/5 gap-5">
            <div className=" text-base font-bold leading-4">
              <span className="text-[#7E88C3]"># </span>
              {invoice.id}
            </div>
            <p className="text-sm font-medium leading-4 tracking-[-0.1px] text-[#7E88C3]  dark:text-red-300">
              <span className="text-[#888EB0]">Due </span>
              {dayjs(invoice.paymentDue).format("DD ddd YYYY")}
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
            <FaAngleRight className="text-[#7C5DFA]" />
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
