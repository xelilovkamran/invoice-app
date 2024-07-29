import Illustration from "@/assets/Illustration.png";
import AuthButton from "@/components/buttons/authButtons/AuthButton";
import Loading from "@/components/shared/loading/Loading";
import api from "@/utils/api";
import { getItem } from "@/utils/storage";
import axios from "axios";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormValues {
  fullname: string;
  email: string;
  password: string;
}

function SignUp() {
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("access");
    if (token) {
      const decodedToken = jwtDecode(token);
      const expireTime = decodedToken.exp;
      const currentTime = Date.now() / 1000;

      if (expireTime && expireTime > currentTime) {
        navigate("/");
      }
    }

    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().trim().required("Please enter your full name"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter your password"),
  });

  const handleGoogleAuth = () => {
    console.log("Functionality will be integrated soon!");
  };

  const handleGithubAuth = () => {
    console.log("Functionality will be integrated soon!");
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    setSubmitting(true);
    try {
      await api.post("/account/users/", JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Account created successfully!");
      setSubmitting(false);
      navigate("/");
    } catch (error) {
      setSubmitting(false);
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          if (response.status === 400) {
            toast.error("Email already exists!");
          } else if (response.status === 500) {
            toast.error("Server error! Please try again later.");
          } else {
            toast.error("An error occurred! Please try again later.");
          }
        }
      }
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values: FormValues): Promise<void> => handleSubmit(values),
  });

  if (loading) {
    return <Loading />;
  }

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
            Sign up now and discover the easiest way to manage your daily
            invoices.
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
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className={`font-medium text-sm text-[#757575] ${
                    formik.touched.fullname &&
                    formik.errors.fullname &&
                    "text-red-500 !font-bold"
                  }`}
                >
                  Full Name
                  {formik.touched.fullname && formik.errors.fullname && (
                    <div>{formik.errors.fullname}</div>
                  )}
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  className="w-full py-2 outline-none border-b-2 border-[#BDBDBD] focus:border-[#918EF4] transition-all duration-300 ease-in-out"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`font-medium text-sm text-[#757575] ${
                    formik.touched.email &&
                    formik.errors.email &&
                    "text-red-500 !font-bold"
                  }`}
                >
                  Email{" "}
                  {formik.touched.email && formik.errors.email && (
                    <div>{formik.errors.email}</div>
                  )}
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full py-2 outline-none border-b-2 border-[#BDBDBD] focus:border-[#918EF4] transition-all duration-300 ease-in-out"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`font-medium text-sm text-[#757575] ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "text-red-500 !font-bold"
                  }`}
                >
                  Password{" "}
                  {formik.touched.password && formik.errors.password && (
                    <div>{formik.errors.password}</div>
                  )}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="w-full py-2 outline-none border-b-2 border-[#BDBDBD] focus:border-[#918EF4] transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="flex justify-center items-center">
                <AuthButton
                  text="SIGN UP"
                  authWith="email"
                  type="submit"
                  disabled={submitting}
                />
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
