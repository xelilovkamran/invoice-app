import { useContext, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import InvoiceList from "../Components/InvoiceList";
import { getInvoices } from "../context/invoice/InvoiceActions";
import InvoiceContext from "../context/invoice/InvoiceContext";
import SideBar from "../Components/SideBar";

function Home() {
  const { invoices, loading, dispatch } = useContext(InvoiceContext);

  const ref = useRef();

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    getInvoices()
      .then((invoices) => {
        dispatch({ type: "SET_INVOICES", payload: invoices });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const onClick = () => {
    ref.current.classList.contains("hidden")
      ? ref.current.classList.replace("hidden", "block")
      : ref.current.classList.replace("block", "hidden");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (invoices && invoices.length === 0) {
    return <div>No invoices</div>;
  } else {
    return (
      <div className="flex ">
        <SideBar />
        <div className="m-auto max-w-[900px] pt-20 h-screen">
          <header className="flex justify-between items-center mb-16 ">
            <div>
              <h1>Invoices</h1>
              <p>
                There are {invoices?.length} total{" "}
                {invoices?.length === 1 ? "invoice" : "invoices"}
              </p>
            </div>
            <div className="flex gap-16">
              <div className="relative flex flex-col items-center ">
                <div
                  className="flex items-center gap-4 cursor-pointer "
                  onClick={onClick}
                >
                  <span>Status</span>
                  <FaAngleDown />
                </div>
                <div
                  className="absolute top-12 bg-white hidden rounded-lg box-content p-6 pr-20"
                  ref={ref}
                >
                  <ul>
                    <li className="flex items-center mb-4">
                      <input className="mr-4 " type="checkbox" id="draft" />
                      <label htmlFor="draft">Draft</label>
                    </li>
                    <li className="flex items-center mb-4">
                      <input className="mr-4" type="checkbox" id="pending" />
                      <label htmlFor="pending">Pending</label>
                    </li>
                    <li className="flex items-center">
                      <input className="mr-4" type="checkbox" id="paid" />
                      <label htmlFor="paid">Paid</label>
                    </li>
                  </ul>
                </div>
              </div>

              <button>New Invoice</button>
            </div>
          </header>
          <div className="h-[520px] overflow-y-scroll">
            {invoices && <InvoiceList invoices={invoices} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
