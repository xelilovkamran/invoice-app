import Illustration from "@/assets/Illustration.png";
import AuthButton from "@/components/buttons/authButtons/AuthButton";
import { getCookie, setCookie } from "@/utils/cookie";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type FormData = {
    fullName: string;
    email: string;
    password: string;
};

type Errors = {
    fullName: string;
    email: string;
    password: string;
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Errors>({
        fullName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const uuid = getCookie("uuid");

        if (uuid) {
            navigate("/");
        }

        // eslint-disable-next-line
    }, []);

    const handleGoogleAuth = () => {
        console.log("Functionality will be integrated soon!");
    };

    const handleGithubAuth = () => {
        console.log("Functionality will be integrated soon!");
    };

    const validateForm = (): Errors => {
        const newErrors: Errors = {
            fullName: "",
            email: "",
            password: "",
        };

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (formData.password.length < 6 || !formData.password) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.fullName) {
            newErrors.fullName = "Please enter your full name";
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (
            !validationErrors.email &&
            !validationErrors.password &&
            !validationErrors.fullName
        ) {
            const id = uuidv4();
            const formDataCopy = {
                ...formData,
                id,
                invoiceIDs: [],
                avatarURL: "",
            };
            formDataCopy.fullName = formDataCopy.fullName.trim();
            formDataCopy.email = formDataCopy.email.trim();
            formDataCopy.password = formDataCopy.password.trim();
            try {
                const availableUsers = await fetch(
                    `http://localhost:3005/users?email=${formData.email}`
                ).then((res) => res.json());

                if (availableUsers.length > 0) {
                    toast.error("User already exists with this email.");
                    return;
                }

                const res = await fetch("http://localhost:3005/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataCopy),
                });
                const data = await res.json();

                setCookie("uuid", data.id, 1);

                toast.success("Account created successfully!");
                navigate("/");
            } catch (error) {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex min-h-screen">
            <div className="md:flex flex-1 flex-col hidden items-center justify-center gap-12 bg-signup-background bg-no-repeat bg-center bg-cover p-5">
                <div>
                    <img src={Illustration} alt="illustration" />
                </div>
                <div className="text-center max-w-96 text-white">
                    <h2 className="mb-4 font-bold text-3xl leading-9 tracking-tight">
                        Take Control of Your Invoicing Today
                    </h2>
                    <p className="font-normal text-base leading-7">
                        Sign up now and discover the easiest way to manage your
                        daily invoices.
                    </p>
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center bg-white">
                <div className="flex flex-col items-center justify-center p-5 max-w-[480px]">
                    <p className="font-bold text-[32px] leading-9 tracking-tight text-center mb-8">
                        Get Started with Effortless Invoicing
                    </p>

                    <div className="flex justify-between gap-2">
                        <AuthButton
                            text="Sign Up with Google"
                            authWith="google"
                            onClick={handleGoogleAuth}
                        />
                        <AuthButton
                            text="Sign Up with Github"
                            authWith="github"
                            onClick={handleGithubAuth}
                        />
                    </div>

                    <div className="w-full my-8">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            <div className="flex flex-col">
                                <label
                                    htmlFor="email"
                                    className={`font-medium text-sm text-[#757575] ${
                                        errors.fullName &&
                                        "text-red-500 !font-bold"
                                    }`}
                                >
                                    Full Name
                                    {errors.fullName && (
                                        <div>{errors.fullName}</div>
                                    )}
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    value={formData.fullName}
                                    onInput={onInput}
                                    className="w-full py-2 outline-none border-b-2 border-[#BDBDBD] focus:border-[#918EF4] transition-all duration-300 ease-in-out"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className={`font-medium text-sm text-[#757575] ${
                                        errors?.email &&
                                        "text-red-500 !font-bold"
                                    }`}
                                >
                                    Email{" "}
                                    {errors?.email && <div>{errors.email}</div>}
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    onInput={onInput}
                                    value={formData.email}
                                    className="w-full py-2 outline-none border-b-2 border-[#BDBDBD] focus:border-[#918EF4] transition-all duration-300 ease-in-out"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className={`font-medium text-sm text-[#757575] ${
                                        errors?.password &&
                                        "text-red-500 !font-bold"
                                    }`}
                                >
                                    Password{" "}
                                    {errors?.password && (
                                        <div>{errors.password}</div>
                                    )}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onInput={onInput}
                                    value={formData.password}
                                    className="w-full py-2 outline-none border-b-2 border-[#BDBDBD] focus:border-[#918EF4] transition-all duration-300 ease-in-out"
                                />
                            </div>

                            <div className="flex justify-center items-center">
                                <AuthButton text="SIGN UP" authWith="email" />
                            </div>
                        </form>
                    </div>

                    <div className="text-sm text-[#424242]">
                        Own an Account?{" "}
                        <Link
                            to="/sign-in"
                            className="underline font-semibold text-[#4c4b4b]"
                        >
                            JUMP RIGHT IN
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
