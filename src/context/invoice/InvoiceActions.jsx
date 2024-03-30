export const getInvoices = async (invoiceIDs) => {
  const res = await fetch("http://localhost:3005/invoices");
  if (!res.ok) throw new Error("bad connection");
  const data = await res.json();
  const selectedInvoices = data.filter((invoice) =>
    invoiceIDs.includes(invoice.id)
  );
  return selectedInvoices;
};

export const postInvoice = async (invoice) => {
  const res = await fetch("http://localhost:3005/invoices", {
    method: "POST",
    body: JSON.stringify(invoice),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("bad connection");
  const data = await res.json();
  return data;
};
