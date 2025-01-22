import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resendOtpSchema } from "@/validation/schemas"; // Validation schema
import { useResendOtpMutation } from "@/lib/services/auth"; // RTK Query mutation

const initialValues = {
  email: "",
};

const ResendOtp = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [serverSuccessMessage, setServerSuccessMessage] = useState("");
  const router = useRouter();
  const [resendOtp] = useResendOtpMutation(); // RTK Query mutation hook

  const formik = useFormik({
    initialValues,
    validationSchema: resendOtpSchema,
    onSubmit: async (values) => {
      try {
        const response = await resendOtp(values).unwrap(); // Trigger API call
        setServerSuccessMessage(response.message);
        setServerErrorMessage("");
        setTimeout(() => router.push("/verify-email"), 2000); // Redirect on success
      } catch (error) {
        setServerErrorMessage(
          error?.data?.message || "Unable to resend OTP. Please try again later."
        );
        setServerSuccessMessage("");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Resend OTP</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`p-3 rounded border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {serverErrorMessage && (
            <p className="text-red-500 text-sm">{serverErrorMessage}</p>
          )}
          {serverSuccessMessage && (
            <p className="text-green-500 text-sm">{serverSuccessMessage}</p>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50"
          >
            Resend OTP
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Back to{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResendOtp;
