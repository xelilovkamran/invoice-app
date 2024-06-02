import EmptyInvoices from "@/components/home/emptyInvoice/EmptyInvoices";
import HomeHeader from "@/components/home/homeHeader/HomeHeader";
import InvoiceList from "@/components/home/invoiceList/InvoiceList";
import NewInvoice from "@/components/home/newInvoice/NewInvoice";
import Loading from "@/components/shared/loading/Loading";
import { useInvoiceActions } from "@/store/invoice/actions";
import { useInvoice } from "@/store/invoice/hooks";
import { useUserActions } from "@/store/user/actions";
import { useUser } from "@/store/user/hooks";
import { useEffect, useRef } from "react";

function Home() {
    const { invoices, loading } = useInvoice();
    const { invoiceIDs } = useUser();
    const { setLoading, setInvoices, getInvoicesAction } = useInvoiceActions();
    const { getUserDataAction } = useUserActions();

    const newInvoiceRef = useRef<HTMLDivElement>();
    const initialRender = useRef<boolean>(true);

    useEffect(() => {
        // const cookies = document.cookie.split(";");
        // const userID = cookies
        //     .find((cookie) => cookie.substr(0, 4) === "uuid")
        //     .split("=")[1];
        const userID = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";

        if (initialRender.current) {
            setLoading();
            getUserDataAction(userID);
        }

        if (invoiceIDs?.length !== 0 && !initialRender.current) {
            getInvoicesAction(invoiceIDs);
        } else if (invoiceIDs.length === 0 && !initialRender.current) {
            setInvoices([]);
        }

        initialRender.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceIDs]);

    const addInvoice = () => {
        if (!newInvoiceRef.current?.classList.contains("active")) {
            newInvoiceRef.current?.classList.replace(
                "-translate-x-full",
                "translate-x-0"
            );
            newInvoiceRef.current?.classList.add("active");
        }

        document
            .getElementById("root")
            ?.classList.add(
                "after:content-['']",
                "after:absolute",
                "after:top-0",
                "after:right-0",
                "after:left-0",
                "after:bottom-0",
                "after:bg-black",
                "after:opacity-30"
            );
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <NewInvoice
                reference={
                    newInvoiceRef as React.MutableRefObject<HTMLDivElement>
                }
            />
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
