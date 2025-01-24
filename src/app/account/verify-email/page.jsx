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

  useEffect(() => {
    const interval = cooldown > 0 ? setInterval(() => setCooldown(prev => prev - 1), 1000) : null;
    return () => interval && clearInterval(interval);
  }, [cooldown]);

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    validationSchema: verifyEmailSchema,
    onSubmit: async values => {
      try {
        const { data } = await verifyEmail(values);
        setMessage({ type: "success", content: data.message });
        setTimeout(() => router.push("/account/login"), 2000);
      } catch (error) {
        setMessage({
          type: "error",
          content: error.data?.message || "Verification failed"
        });
      }
    },
  });

  const handleResendOTP = async () => {
    if (!formik.values.email || formik.errors.email) {
      setMessage({ type: "error", content: "Please enter a valid email address" });
      return;
    }

    try {
      await resendOtp({ email: formik.values.email }).unwrap();
      setCooldown(30);
      setMessage({ type: "success", content: "New OTP sent successfully" });
    } catch (error) {
      setMessage({
        type: "error", 
        content: error.data?.message || "Failed to resend OTP"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-4 p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Verify Email</h2>
          <p className="text-gray-600">Enter the OTP sent to your email</p>
        </div>

        {message.content && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === "success" 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {message.content}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border ${
                formik.touched.email && formik.errors.email 
                  ? "border-red-500" 
                  : "border-gray-300"
              } rounded-lg focus:ring-2 ${
                formik.touched.email && formik.errors.email 
                  ? "focus:ring-red-500" 
                  : "focus:ring-blue-500"
              } transition-all`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength="6"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border ${
                formik.touched.otp && formik.errors.otp 
                  ? "border-red-500" 
                  : "border-gray-300"
              } rounded-lg focus:ring-2 ${
                formik.touched.otp && formik.errors.otp 
                  ? "focus:ring-red-500" 
                  : "focus:ring-blue-500"
              } transition-all`}
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.otp}</p>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isVerifying}
              className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-all ${
                isVerifying 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={cooldown > 0 || isResending}
              className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-all ${
                cooldown > 0 || isResending 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gray-600 hover:bg-gray-700"
              } focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
            >
              {isResending ? "Sending..." : cooldown > 0 ? `Resend OTP (${cooldown}s)` : "Resend OTP"}
            </button>
          </div>

          <div className="text-center text-sm">
            <Link href="/account/login" className="text-blue-600 hover:text-blue-700">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;