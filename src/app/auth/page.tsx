"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import logo from "@assets/images/logo/logo.png";

export default function AuthPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("E-poçt ünvanı düzgün deyil")
        .required("E-poçt ünvanı mütləqdir"),
      password: Yup.string()
        .min(6, "Şifrə minimum 6 simvol olmalıdır")
        .required("Şifrə mütləqdir"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setLoginError("");

      setTimeout(() => {
        if (values.email === "a@mail.com" && values.password === "123456") {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              email: values.email,
              remember: values.remember,
              lastActive: Date.now(),
              expiry: values.remember ? null : Date.now() + 2 * 60 * 60 * 1000,
            })
          );
          router.push("/"); 
        } else {
          setLoginError("E-poçt və ya şifrə yanlışdır");
        }
        setSubmitting(false);
      }, 1500);
    },
  });

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col items-center justify-center min-h-svh p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="mb-8 text-center z-10">
        <div className="w-30 h-30 mx-auto mb-4">
          <Image src={logo} alt="logo" />
        </div>
      </div>

      <Card className="w-full max-w-md z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-semibold text-center text-gray-800">
            Respublika Diaqnostika Mərkəzi
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {loginError && (
            <Alert variant="destructive" className="animate-in slide-in-from-top-2">
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                İstifadəçi adı və ya e-poçt ünvanı
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-poçt"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`pl-10 h-11 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Şifrə
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifrə"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`pl-10 pr-10 h-11 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formik.values.remember}
                onCheckedChange={(checked) => formik.setFieldValue("remember", checked)}
              />
              <Label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                Yadda saxla
              </Label>
            </div>

            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium transition-all"
            >
              {formik.isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Gözləyin...</span>
                </div>
              ) : (
                "Daxil olun"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <footer className="mt-8 text-center z-10">
        <p className="text-xs text-gray-500">
          © 2025 Respublika Diaqnostika Mərkəzi. Bütün hüquqlar qorunur.
        </p>
      </footer>
    </div>
  );
}
