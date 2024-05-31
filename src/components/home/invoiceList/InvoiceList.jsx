import InvoiceItem from "@/components/home/invoiceItem/InvoiceItem";
import { useInvoice } from "@/store/invoice/hooks";
import { useEffect, useState } from "react";

function InvoiceList() {
    const { filterBy, invoices } = useInvoice();
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
        <div className="flex-1 overflow-y-auto flex flex-col gap-5 tablet:pr-3 no-scrollbar">
            {filteredInvoices.map((invoice) => (
                <InvoiceItem key={invoice.id} invoice={invoice} />
            ))}
        </div>
    );
}

export default InvoiceList;
