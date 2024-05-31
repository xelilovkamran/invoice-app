import Button from "@/components/buttons/primaryButton/Button";
import PaymentItem from "@/components/home/paymentItem/PaymentItem";
import Datepicker from "@/components/inputs/datePicker/DatePicker";
import Selector from "@/components/inputs/selector/Selector";
import useValidateForm from "@/hooks/useValidateForm";
import { store } from "@/store/index";
import { setLoading } from "@/store/invoice/actions";
import { postInvoice } from "@/store/invoice/index";
import { addInvoiceID } from "@/store/user/actions";
import { useUser } from "@/store/user/hooks";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import "./newInvoice.css";

function NewInvoice({ reference }) {
    const { invoiceIDs } = useUser();
    const ref = useRef();
    const [isSubmited, setIsSubmited] = useState(false);

    const [formData, setFormData] = useState({
        id: nanoid(6).toUpperCase(),
        createdAt: dayjs().format("YYYY-MM-DD"),
        paymentDue: dayjs().format("YYYY-MM-DD"),
        description: "",
        paymentTerms: 30,
        clientName: "",
        clientEmail: "",
        status: "",
        senderAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
        },
        clientAddress: {
            street: "",
            city: "",
            postCode: "",
            country: "",
        },
        items: [],
        total: 0,
    });
    const { isValid, validationErrors } = useValidateForm(formData, isSubmited);

    // ?  WHEN USER CLICK OUTSIDE OF THIS COMPONENT, THIS WILL CLOSE AND STATE WILL NOT BE CLEARED.(CAN BE REMOVED)
    document.getElementById("root").addEventListener("click", (e) => {
        if (
            e.target.id === "root" &&
            reference.current?.classList.replace(
                "translate-x-0",
                "-translate-x-full"
            )
        ) {
            hideNewInvoice();
        }
    });

    const clearFormData = () => {
        const entries = Object.entries(formData);
        entries.forEach((entry) => {
            if (entry[0] === "paymentDue" || entry[0] === "createdAt") {
                entry[1] = dayjs().format("YYYY-MM-DD");
            } else if (entry[0] === "paymentTerms") {
                entry[1] = 30;
            } else if (
                entry[0] === "senderAddress" ||
                entry[0] === "clientAddress"
            ) {
                entry[1] = {
                    street: "",
                    city: "",
                    postCode: "",
                    country: "",
                };
            } else if (entry[0] === "items") {
                entry[1] = new Array(0);
            } else if (entry[0] === "total") {
                entry[1] = 0;
            } else if (entry[0] === "id") {
                entry[1] = nanoid(6).toUpperCase();
            } else {
                entry[1] = "";
            }
        });

        const formDataEmpty = {};
        entries.forEach(([key, value]) => {
            formDataEmpty[key] = value;
        });

        setFormData(formDataEmpty);
    };

    const hideNewInvoice = () => {
        reference.current.classList.replace(
            "translate-x-0",
            "-translate-x-full"
        );
        reference.current.classList.remove("active");
        document
            .getElementById("root")
            .setAttribute("class", "bg-[#F8F8FB] relative");
    };

    const cancelNewInvoice = () => {
        hideNewInvoice();
        clearFormData();
    };

    const onInput = (e) => {
        const targetData = e.target.name;
        if (targetData.includes(".")) {
            const targets = targetData.split(".");
            setFormData({
                ...formData,
                [targets[0]]: {
                    ...formData[targets[0]],
                    [targets[1]]: e.target.value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const addNewItem = () => {
        !ref.current.classList.contains("sm:grid") &&
            ref.current.classList.add("sm:grid");

        setFormData({
            ...formData,
            items: [
                ...formData.items,
                {
                    name: "",
                    quantity: 0,
                    price: 0,
                    total: 0,
                },
            ],
        });
    };

    const handleSubmit = async (e, status) => {
        e.preventDefault();
        setIsSubmited(true);

        if (isValid) {
            setLoading();
            const total = formData.items.reduce((acc, { total }) => {
                return acc + total;
            }, 0);

            const formDataCopy = {
                ...formData,
                total,
                status,
            };

            store
                .dispatch(postInvoice(formDataCopy))
                .unwrap()
                .then((data) => {
                    const cookies = document.cookie.split(";");
                    const userID = cookies
                        .find((cookie) => cookie.substr(0, 4) === "uuid")
                        .split("=")[1];

                    fetch(`http://localhost:3005/users/${userID}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            invoiceIDs: [...invoiceIDs, data.id],
                        }),
                    })
                        .then(() => {
                            toast.success("Invoice created successfully :)");
                            addInvoiceID(data.id);
                        })
                        .catch(() => {
                            toast.error("problem with server");
                        });
                })
                .catch((err) => {
                    if (err.message === "bad connection") {
                        toast.error("Bad connection");
                    } else {
                        toast.error("Something went wrong");
                    }
                });

            cancelNewInvoice();
            setIsSubmited(false);
        }
    };

    return (
        <div
            ref={reference}
            className={`h-full absolute z-[1] -translate-x-full transition-all duration-200 ease delay-0 flex flex-col justify-between rounded-3xl`}
        >
            <div className="scrollbar-area bg-[#ececf0] flex-1 rounded-tr-3xl tablet:pl-40 tablet:pr-4 overflow-y-auto max-tablet:px-8 max-tablet:mt-24">
                <h3 className="text-left text-2xl font-bold leading-8 py-10 text-[#0C0E16]">
                    New Invoice
                </h3>
                <form className="max-w-lg">
                    <div className="w-full mb-12">
                        <h4 className="text-base font-bold leading-4 text-[#7C5DFA] mb-6">
                            Bill From
                        </h4>
                        <div className="mb-6 w-full">
                            <div className="flex justify-between items-center">
                                <p
                                    className={`mb-2 text-sm font-semibold leading-4 text-[#7E88C3] ${
                                        isSubmited &&
                                        validationErrors.senderAddress &&
                                        "text-[#EC5757]"
                                    }`}
                                >
                                    Street Address
                                </p>

                                {validationErrors.senderAddress &&
                                    isSubmited && (
                                        <div className="text-xs font-semibold leading-4 text-[#EC5757]">
                                            {validationErrors.senderAddress}
                                        </div>
                                    )}
                            </div>
                            <input
                                type="text"
                                name="senderAddress.street"
                                className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                value={formData.senderAddress.street}
                                onChange={onInput}
                            />
                        </div>
                        <div className="flex gap-6 w-full">
                            <div className="flex-grow">
                                <p className="mb-2 text-sm font-semibold leading-4 text-[#7E88C3]">
                                    City
                                </p>
                                <input
                                    type="text"
                                    name="senderAddress.city"
                                    className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                    value={formData.senderAddress.city}
                                    onChange={onInput}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="mb-2 text-sm font-semibold leading-4 text-[#7E88C3]">
                                    Post Code
                                </p>
                                <input
                                    type="text"
                                    name="senderAddress.postCode"
                                    className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                    value={formData.senderAddress.postCode}
                                    onChange={onInput}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="mb-2 text-sm font-semibold leading-4 text-[#7E88C3]">
                                    Country
                                </p>
                                <input
                                    type="text"
                                    name="senderAddress.country"
                                    className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                    value={formData.senderAddress.country}
                                    onChange={onInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mb-12">
                        <h4 className="text-base font-bold leading-4 text-[#7C5DFA] mb-6">
                            Bill To
                        </h4>
                        <div className="mb-6 w-full">
                            <div className="flex justify-between items-center">
                                <p
                                    className={`mb-2 text-sm font-semibold leading-4 text-[#7E88C3] ${
                                        isSubmited &&
                                        validationErrors.clientName &&
                                        "text-[#EC5757]"
                                    }`}
                                >
                                    Client&apos;s Name
                                </p>

                                {validationErrors.clientName && isSubmited && (
                                    <div className="text-xs font-semibold leading-4 text-[#EC5757]">
                                        {validationErrors.clientName}
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                name="clientName"
                                className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                value={formData.clientName}
                                onChange={onInput}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <div className="flex justify-between items-center">
                                <p
                                    className={`mb-2 text-sm font-semibold leading-4 text-[#7E88C3] ${
                                        isSubmited &&
                                        validationErrors.clientEmail &&
                                        "text-[#EC5757]"
                                    }`}
                                >
                                    Client&apos;s Email
                                </p>

                                {validationErrors.clientEmail && isSubmited && (
                                    <div className="text-xs font-semibold leading-4 text-[#EC5757]">
                                        {validationErrors.clientEmail}
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                name="clientEmail"
                                className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                value={formData.clientEmail}
                                onChange={onInput}
                                placeholder="e.g. email@example.com"
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <div className="flex justify-between items-center">
                                <p
                                    className={`mb-2 text-sm font-semibold leading-4 text-[#7E88C3] ${
                                        isSubmited &&
                                        validationErrors.clientAddress &&
                                        "text-[#EC5757]"
                                    }`}
                                >
                                    Street Address
                                </p>

                                {validationErrors.clientAddress &&
                                    isSubmited && (
                                        <div className="text-xs font-semibold leading-4 text-[#EC5757]">
                                            {validationErrors.clientAddress}
                                        </div>
                                    )}
                            </div>
                            <input
                                type="text"
                                name="clientAddress.street"
                                className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                value={formData.clientAddress.street}
                                onChange={onInput}
                            />
                        </div>
                        <div className="flex gap-6 w-full mb-12">
                            <div className="flex-grow">
                                <p className="mb-2 text-sm font-semibold leading-4 text-[#7E88C3]">
                                    City
                                </p>
                                <input
                                    type="text"
                                    name="clientAddress.city"
                                    className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                    value={formData.clientAddress.city}
                                    onChange={onInput}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="mb-2 text-sm font-semibold leading-4 text-[#7E88C3]">
                                    Post Code
                                </p>
                                <input
                                    type="text"
                                    name="clientAddress.postCode"
                                    className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                    value={formData.clientAddress.postCode}
                                    onChange={onInput}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="mb-2 text-sm font-semibold leading-4 text-[#7E88C3]">
                                    Country
                                </p>
                                <input
                                    type="text"
                                    name="clientAddress.country"
                                    className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA] hover:border-[#9277FF] focus:border-[#9277FF] text-base font-bold  leading-4 text-[#0C0E16]"
                                    value={formData.clientAddress.country}
                                    onChange={onInput}
                                />
                            </div>
                        </div>
                        <div className="flex gap-6 mb-6">
                            <div className="flex-1">
                                <p className="mb-2 text-sm font-semibold leading-4 text-[#7E88C3]">
                                    Invoice Date
                                </p>
                                <div className="flex">
                                    <Datepicker
                                        value={dayjs(formData.paymentDue)}
                                        onChange={setFormData}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 ">
                                <p className="mb-2 text-sm font-semibold leading-4 text-[#7E88C3]">
                                    Payment Terms
                                </p>
                                <Selector
                                    value={formData.paymentTerms}
                                    onChange={setFormData}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <p
                                    className={`mb-2 text-sm font-semibold leading-4 text-[#7E88C3] ${
                                        isSubmited &&
                                        validationErrors.description &&
                                        "text-[#EC5757]"
                                    }`}
                                >
                                    Project Description
                                </p>

                                {validationErrors.description && isSubmited && (
                                    <div className="text-xs font-semibold leading-4 text-[#EC5757]">
                                        {validationErrors.description}
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                name="description"
                                className="px-5 py-3 w-full outline-none border-[1px] rounded-md border-[#DFE3FA]  text-base font-bold  leading-4 text-[#0C0E16] hover:border-[#9277FF] focus:border-[#9277FF]"
                                placeholder="e.g. Graphic Design Service"
                                value={formData.description}
                                onChange={onInput}
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <h4 className="text-[#777F98] text-lg font-bold leading-8 mb-3">
                            Item List
                        </h4>
                        <div>
                            <div
                                className="hidden sm:grid-cols-12 mb-4 gap-4"
                                ref={ref}
                            >
                                <div className="col-span-5 text-sm font-semibold leading-4  text-[#7E88C3]">
                                    Item Name
                                </div>
                                <div className="col-span-2 text-sm font-semibold leading-4  text-[#7E88C3]">
                                    Qty.
                                </div>
                                <div className="col-span-2 text-sm font-semibold leading-4  text-[#7E88C3]">
                                    Price
                                </div>
                                <div className="col-span-2 text-sm font-semibold leading-4  text-[#7E88C3]">
                                    Total
                                </div>
                                <div className="col-span-1 "></div>
                            </div>
                            <div>
                                {formData.items.map((item, index) => (
                                    <div key={index}>
                                        <PaymentItem
                                            data={formData}
                                            setData={setFormData}
                                            index={index}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button
                            text="+ Add New Item"
                            type="newItem"
                            onClick={addNewItem}
                        />
                        {(validationErrors.items ||
                            validationErrors.emptyItem) &&
                            isSubmited && (
                                <div className="mt-8 text-xs font-semibold leading-4 text-[#EC5757]">
                                    -{" "}
                                    {validationErrors.items ||
                                        validationErrors.emptyItem}
                                </div>
                            )}
                    </div>
                </form>
            </div>
            <div className="bg-white rounded-br-3xl tablet:pl-40 py-8 flex justify-between justify-self-start gap-y-4 tablet:pr-14 mobile:px-14 px-4 flex-wrap">
                <Button
                    type="discardNewInvoice"
                    text="discard"
                    onClick={() => {
                        cancelNewInvoice();
                        setIsSubmited(false);
                    }}
                />
                <div className="flex gap-2 flex-wrap">
                    <Button
                        type="saveDraft"
                        text="Save as Draft"
                        onClick={(e) => handleSubmit(e, "draft")}
                    />
                    <Button
                        type="saveSend"
                        text="save & send"
                        onClick={(e) => handleSubmit(e, "pending")}
                    />
                </div>
            </div>
        </div>
    );
}

NewInvoice.propTypes = {
    reference: PropTypes.object.isRequired,
};

export default NewInvoice;
