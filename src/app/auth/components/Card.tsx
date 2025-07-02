"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import Remember from "./Remember";
import SubmitButton from "./Button";

import { loginSuccess } from "@/features/auth/authSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("E‑poçt ünvanı düzgün deyil").required("Mütləqdir"),
  password: Yup.string().min(6, "Minimum 6 simvol").required("Mütləqdir"),
});

export default function Card() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="card z-10 bg-gray-200 rounded-[20px] w-[475px] h-[375px] p-6 shadow-md mt-5">
      <h5 className="text-black font-medium text-center mb-5 text-lg mt-3">
        Respublika Diaqnostika Mərkəzi
      </h5>

      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={validationSchema}
        onSubmit={({ email, password, remember }) => {
          if (email === "a@mail.com" && password === "123456") {
            dispatch(loginSuccess({ email }));

            localStorage.setItem(
              "auth",
              JSON.stringify({
                email,
                remember,
                lastActive: Date.now(),
                expiry: remember ? null : Date.now() + 2 * 60 * 60 * 1000,
              })
            );

            router.replace("/"); 
          } else {
            alert("Login uğursuzdur!");
          }
        }}
      >
        <Form className="flex flex-col gap-4 px-5">
          <EmailInput name="email" />
          <PasswordInput name="password" />
          <Remember name="remember" />
          <SubmitButton />
        </Form>
      </Formik>
    </div>
  );
}
