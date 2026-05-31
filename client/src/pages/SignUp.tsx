import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { UserPlus, ArrowRight, Loader2, CheckCircle } from "lucide-react";

export default function SignUp() {
  const { user, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      window.location.href = "/dashboard";
    }
  }, [user, loading]);

  const handleSignUp = () => {
    setIsRedirecting(true);
    const loginUrl = getLoginUrl();
    window.location.href = loginUrl;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-green-700" size={48} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join TENUCSA</h1>
          <p className="text-xl text-green-100">
            Create your account and become part of our vibrant community
          </p>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-8">Why Join TENUCSA?</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Networking",
                      description: "Connect with students from universities across Teso North",
                    },
                    {
                      title: "Events & Workshops",
                      description: "Access exclusive events, seminars, and professional development",
                    },
                    {
                      title: "Career Growth",
                      description: "Build your skills and advance your professional journey",
                    },
                    {
                      title: "Community",
                      description: "Be part of a supportive and inclusive student community",
                    },
                    {
                      title: "Leadership",
                      description: "Develop leadership skills through active participation",
                    },
                    {
                      title: "Resources",
                      description: "Access member-only content and learning materials",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle className="text-green-700 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Sign Up Form */}
              <div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <UserPlus className="text-green-700" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join our community today</p>
                  </div>

                  {/* Sign Up Form */}
                  <div className="space-y-6">
                    {/* OAuth Sign Up Button */}
                    <button
                      onClick={handleSignUp}
                      disabled={isRedirecting}
                      className="w-full px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isRedirecting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserPlus size={20} />
                          Sign Up with Manus
                        </>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Quick & Easy</span>
                      </div>
                    </div>

                    {/* Info Text */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-700">
                        We use secure OAuth authentication. Your account will be created instantly and you can start exploring TENUCSA.
                      </p>
                    </div>

                    {/* Terms */}
                    <div className="text-xs text-gray-600 text-center">
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-green-700 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-green-700 hover:underline">
                        Privacy Policy
                      </a>
                    </div>
                  </div>

                  {/* Sign In Link */}
                  <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600 mb-4">Already have an account?</p>
                    <a
                      href="/signin"
                      className="inline-flex items-center gap-2 px-6 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      Sign In
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">🔒 Your data is secure and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  description: "Click the sign up button and authenticate with Manus",
                },
                {
                  step: "2",
                  title: "Create Profile",
                  description: "Complete your profile information and preferences",
                },
                {
                  step: "3",
                  title: "Explore",
                  description: "Browse events, announcements, and member resources",
                },
                {
                  step: "4",
                  title: "Engage",
                  description: "Participate in events and connect with other members",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-700 text-white rounded-full font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute left-1/2 top-12 transform translate-x-1/2 text-green-700 text-2xl">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Sign Up FAQs
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Is it free to join TENUCSA?",
                answer:
                  "Creating an account is free! However, some membership benefits may require a membership fee. Check with our office for current membership rates.",
              },
              {
                question: "What information do I need to provide?",
                answer:
                  "You'll need to provide basic information like your name, email, and institution. Additional profile details can be added after account creation.",
              },
              {
                question: "Can I change my account information later?",
                answer:
                  "Yes, you can update your profile information at any time from your account settings.",
              },
              {
                question: "How do I get support if I have issues?",
                answer:
                  "If you encounter any issues during sign up, please contact our support team at contact@tnucsa.org or use the contact form on our website.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
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
