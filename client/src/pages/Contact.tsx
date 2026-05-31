import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { ASSOCIATION_INFO } from "@shared/constants";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitInquiryMutation = trpc.inquiries.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        senderName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setError("");
      toast.success("Message Sent!", {
        description: "We will get back to you as soon as possible.",
      });
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (err: any) => {
      const errorMessage = err?.message || "Failed to send message. Please try again.";
      setError(errorMessage);
      toast.error("Error", {
        description: errorMessage,
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.senderName.trim()) {
      const msg = "Name is required";
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
    if (!formData.subject.trim()) {
      const msg = "Subject is required";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!formData.message.trim()) {
      const msg = "Message is required";
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

    submitInquiryMutation.mutate(formData);
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-green-200">
            We'd love to hear from you. Get in touch with TENUCSA today.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-8">Get in Touch</h2>

              {/* Email */}
              <div className="mb-8 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-700 text-white">
                    <Mail size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-1">Email</h3>
                  <a
                    href={`mailto:${ASSOCIATION_INFO.email}`}
                    className="text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {ASSOCIATION_INFO.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-8 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-900 text-white">
                    <Phone size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-1">Phone</h3>
                  <a
                    href={`tel:${ASSOCIATION_INFO.phone}`}
                    className="text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {ASSOCIATION_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="mb-8 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-700 text-white">
                    <MapPin size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-1">Office Location</h3>
                  <p className="text-gray-700">{ASSOCIATION_INFO.address}</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-900 text-white">
                    <Clock size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-1">Office Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-700">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-8">Send us a Message</h2>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-700 p-6 rounded-lg animate-slide-up">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="text-green-700 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-lg font-bold text-green-900 mb-1">Message Sent!</h3>
                      <p className="text-green-800">
                        Thank you for contacting us. We will get back to you as soon as possible.
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

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="senderName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                    required
                  />
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
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 700 123 456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitInquiryMutation.isPending}
                  className="w-full px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitInquiryMutation.isPending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I become a member of TENUCSA?",
                answer:
                  "You can register as a member by filling out our membership registration form. Visit the 'Join Us' page and complete the registration process. Your application will be reviewed and you will receive a confirmation email.",
              },
              {
                question: "What are the membership fees?",
                answer:
                  "TENUCSA offers affordable membership options. For detailed information about membership fees and payment options, please contact our office or send us an inquiry.",
              },
              {
                question: "How often are events organized?",
                answer:
                  "We organize events regularly throughout the year, including workshops, seminars, social activities, and career fairs. Check our Events page for the latest schedule.",
              },
              {
                question: "Can I volunteer with TENUCSA?",
                answer:
                  "Yes! We welcome volunteers. If you're interested in volunteering, please contact us through the inquiry form and let us know about your interests and availability.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-blue-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
