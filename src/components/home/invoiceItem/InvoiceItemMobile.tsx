import dayjs from "dayjs";
import { Link } from "react-router-dom";

import InvoiceStatusElement from "@/components/home/invoiceStatusElement/InvoiceStatusElement";
import { type TInvoice } from "@/types/types";

type Props = {
  invoice: TInvoice;
  onClick: () => void;
};

function InvoiceItemMobile({ invoice, onClick }: Props) {
  return (
    <div onClick={onClick}>
      <Link to={`/invoice/${invoice.id}`}>
        <div className="p-6 rounded-lg flex flex-col gap-6 justify-between items-start shadow-lg border-[1px] border-transparent bg-white hover:border-[#7C5DFA]">
          <div className="flex justify-between items-center w-full">
            <div className="text-base font-bold leading-4">
              <span className="text-[#7E88C3]">#</span>
              {invoice.identifier}
            </div>
            <p className="text-sm font-medium leading-4 tracking-[-0.1px] text-[#7E88C3]">
              {invoice.clientName}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <div>
              <div className="mb-2 text-sm font-medium leading-4 tracking-[-0.1px] text-[#7E88C3]  dark:text-red-300">
                <span className="text-[#888EB0]">Due </span>
                {dayjs(invoice.paymentDue).format("DD ddd YYYY")}
              </div>
              <div className="text-left text-base font-bold tracking-tight">
                £ {invoice.total}
              </div>
            </div>
            <InvoiceStatusElement status={invoice.status} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default InvoiceItemMobile;
