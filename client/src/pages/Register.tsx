import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    registrationNumber: "",
    institutionName: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const registerMutation = trpc.members.register.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        fullName: "",
        registrationNumber: "",
        institutionName: "",
        email: "",
        phone: "",
      });
      setError("");
      toast.success("Registration successful! Welcome to TNUCSA.", {
        description: "Your membership application has been submitted.",
      });
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (err: any) => {
      const errorMessage = err?.message || "Failed to register. Please try again.";
      setError(errorMessage);
      toast.error("Registration Failed", {
        description: errorMessage,
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!formData.fullName.trim()) {
      const msg = "Full name is required";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!formData.registrationNumber.trim()) {
      const msg = "Registration number is required";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!formData.institutionName.trim()) {
      const msg = "Institution name is required";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!formData.email.trim()) {
      const msg = "Email is required";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!formData.phone.trim()) {
      const msg = "Phone number is required";
      setError(msg);
      toast.error(msg);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      const msg = "Please enter a valid email address";
      setError(msg);
      toast.error(msg);
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join TNUCSA</h1>
          <p className="text-xl text-green-200">
            Become a member and unlock exclusive benefits and opportunities.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Message */}
            {submitted && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-700 p-6 rounded-lg animate-slide-up">
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-700 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-1">Registration Successful!</h3>
                    <p className="text-green-800">
                      Thank you for registering with TNUCSA. Your membership application has been submitted and is pending approval. You will receive a confirmation email shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-700 p-6 rounded-lg animate-slide-up">
                <div className="flex items-start gap-4">
                  <AlertCircle className="text-red-700 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-red-900 mb-1">Error</h3>
                    <p className="text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Membership Registration Form</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                    required
                  />
                </div>

                {/* Registration Number */}
                <div>
                  <label htmlFor="registrationNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g., STU/2024/001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                    required
                  />
                </div>

                {/* Institution Name */}
                <div>
                  <label htmlFor="institutionName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Institution Name *
                  </label>
                  <select
                    id="institutionName"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                    required
                  >
                    <option value="">Select your institution</option>
                    <option value="Soroti University">Soroti University</option>
                    <option value="Busitema University">Busitema University</option>
                    <option value="Kumi University">Kumi University</option>
                    <option value="Mbale Technical Institute">Mbale Technical Institute</option>
                    <option value="Soroti National Teachers College">Soroti National Teachers College</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+256 700 123 456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                    required
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700 mb-3">
                    By registering, you agree to abide by TNUCSA's constitution and code of conduct. You will receive updates about events, announcements, and membership benefits.
                  </p>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" required className="w-4 h-4 rounded" />
                    <span className="text-sm text-gray-700">
                      I agree to the terms and conditions *
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="w-full px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-600 text-center mt-6">
                Already a member?{" "}
                <a href="/contact" className="text-green-700 font-semibold hover:underline">
                  Contact us
                </a>
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Membership Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Access to exclusive events and workshops",
                  "Networking opportunities with peers",
                  "Career development resources",
                  "Discounted tickets for association events",
                  "Leadership development programs",
                  "Member-only content and resources",
                ].map((benefit, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-green-700 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
