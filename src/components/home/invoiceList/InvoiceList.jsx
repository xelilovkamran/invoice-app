import InvoiceItem from "@/components/home/invoiceItem/InvoiceItem";
import InvoiceContext from "@/context/invoice/InvoiceContext";
import { useContext, useEffect, useState } from "react";

function InvoiceList() {
  const { filterBy, invoices } = useContext(InvoiceContext);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    if (filterBy === "filterless") {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(
        invoices.filter((invoice) => invoice.status === filterBy)
      );
    }
  }, [filterBy, invoices]);

  return (
    <div className="h-[510px] overflow-y-auto flex flex-col gap-5 pr-3 ">
      {filteredInvoices.map((invoice) => (
        <InvoiceItem key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
}

export default InvoiceList;
