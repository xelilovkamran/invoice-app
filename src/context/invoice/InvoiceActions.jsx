export const getInvoices = async () => {
  const res = await fetch("http://localhost:3005/invoices");
  if (!res.ok) throw new Error("bad connection");
  const data = await res.json();
  const invoiceIDs = localStorage.getItem("user info");
  const selectedInvoices = data.filter((invoice) =>
    invoiceIDs.includes(invoice.id)
  );
  return selectedInvoices;
};
