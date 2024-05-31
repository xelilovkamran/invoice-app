import EmptyInvoices from "@/components/home/emptyInvoice/EmptyInvoices";
import HomeHeader from "@/components/home/homeHeader/HomeHeader";
import InvoiceList from "@/components/home/invoiceList/InvoiceList";
import NewInvoice from "@/components/home/newInvoice/NewInvoice";
import Loading from "@/components/shared/loading/Loading";
import { store } from "@/store/index";
import { setInvoices, setLoading } from "@/store/invoice/actions";
import { useInvoice } from "@/store/invoice/hooks";
import { getInvoices } from "@/store/invoice/index";
import { useUser } from "@/store/user/hooks";
import { getUserData } from "@/store/user/index";
import { useEffect, useRef } from "react";

function Home() {
    // TODO: 1. ADD DARK MODE

    const { invoices, loading } = useInvoice();
    const { invoiceIDs } = useUser();

    const newInvoiceRef = useRef();
    const initialRender = useRef(true);

    useEffect(() => {
        // const cookies = document.cookie.split(";");
        // const userID = cookies
        //     .find((cookie) => cookie.substr(0, 4) === "uuid")
        //     .split("=")[1];
        const userID = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";

        if (initialRender.current) {
            setLoading();
            store.dispatch(getUserData(userID));
        }

        if (invoiceIDs?.length !== 0 && !initialRender.current) {
            store.dispatch(getInvoices(invoiceIDs));
        } else if (invoiceIDs.length === 0 && !initialRender.current) {
            setInvoices([]);
        }

        initialRender.current = false;
    }, [invoiceIDs]);

    const addInvoice = () => {
        if (!newInvoiceRef.current.classList.contains("active")) {
            newInvoiceRef.current.classList.replace(
                "-translate-x-full",
                "translate-x-0"
            );
            newInvoiceRef.current.classList.add("active");
        }

        document.getElementById("root").classList +=
            " after:content-[''] after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 after:bg-black after:opacity-30";
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <NewInvoice reference={newInvoiceRef} />
            <div
                className="mx-auto flex flex-col flex-1 justify-between tablet:max-w-4xl w-full pt-20 px-5 tablet:h-screen"
                style={{
                    minHeight: "calc(100vh - 96px)",
                }}
            >
                <HomeHeader addInvoice={addInvoice} />

                {invoices.length === 0 ? <EmptyInvoices /> : <InvoiceList />}
            </div>
        </>
    );
}

export default Home;
