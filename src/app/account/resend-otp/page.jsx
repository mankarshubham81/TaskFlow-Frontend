"use client";
import { useFormik } from 'formik';
import { resendOtpSchema } from "@/validation/schemas";
import { useResendOtpMutation } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ResendOtp = () => {
  const router = useRouter();
  const [message, setMessage] = useState({ type: '', content: '' });
  const [resendOtp] = useResendOtpMutation();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: resendOtpSchema,
    onSubmit: async values => {
      try {
        const { data } = await resendOtp(values).unwrap();
        setMessage({ type: 'success', content: data.message });
        setTimeout(() => router.push("/account/verify-email"), 2000);
      } catch (error) {
        setMessage({ type: 'error', content: error.data?.message || "Failed to resend OTP" });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-4 p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Resend OTP</h2>
          <p className="text-gray-600">Enter your email to receive a new OTP</p>
        </div>

        {message.content && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
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
              className={`w-full px-4 py-3 border ${
                formik.touched.email && formik.errors.email 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              } rounded-lg focus:ring-2 ${
                formik.touched.email && formik.errors.email 
                  ? 'focus:ring-red-500' 
                  : 'focus:ring-blue-500'
              } transition-all`}
              placeholder="your@email.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Resend OTP
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Back to{" "}
          <Link href="/account/login" className="text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResendOtp;