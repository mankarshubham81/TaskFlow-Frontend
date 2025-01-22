// src/app/account/verify-email/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { verifyEmailSchema } from "@/validation/schemas";
import { useVerifyEmailMutation, useResendOtpMutation } from "@/lib/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [cooldown, setCooldown] = useState(0);
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [message, setMessage] = useState({ type: "", content: "" });

  // Handle cooldown timer
  useEffect(() => {
    let interval;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    validationSchema: verifyEmailSchema,
    onSubmit: async (values) => {
      try {
        const response = await verifyEmail(values);
        
        if (response.data?.status === "success") {
          setMessage({ type: "success", content: response.data.message });
          setTimeout(() => router.push("/account/login"), 2000);
        } else {
          const errorMessage = response.error?.data?.message || "Verification failed";
          setMessage({ type: "error", content: errorMessage });
        }
      } catch (error) {
        setMessage({ type: "error", content: "An unexpected error occurred" });
      }
    },
  });

  const handleResendOTP = async () => {
    if (!formik.values.email || formik.errors.email) {
      setMessage({ type: "error", content: "Please enter a valid email address" });
      return;
    }

    try {
      const response = await resendOtp({ email: formik.values.email });
      
      if (response.data?.status === "success") {
        setCooldown(30); // 30-second cooldown
        setMessage({ type: "success", content: response.data.message });
      } else {
        const errorMessage = response.error?.data?.message || "Failed to resend OTP";
        setMessage({ type: "error", content: errorMessage });
      }
    } catch (error) {
      setMessage({ type: "error", content: "Failed to resend OTP" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter the OTP sent to your email address
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
                className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                  formik.touched.otp && formik.errors.otp
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formik.touched.otp && formik.errors.otp && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.otp}</p>
              )}
            </div>
          </div>

          {message.content && (
            <div
              className={`p-3 rounded-md ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.content}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={cooldown > 0 || isResending || isVerifying}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isResending
                ? "Sending..."
                : cooldown > 0
                ? `Resend OTP (${cooldown}s)`
                : "Resend OTP"}
            </button>
          </div>

          <div className="text-center text-sm">
            <Link
              href="/account/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;