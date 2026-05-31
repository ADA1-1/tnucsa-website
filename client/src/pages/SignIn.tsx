import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { LogIn, ArrowRight, Loader2 } from "lucide-react";

export default function SignIn() {
  const { user, loading } = useAuth();
  const [location, navigate] = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const handleSignIn = () => {
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
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Member Sign In</h1>
          <p className="text-xl text-green-200">
            Access your TENUCSA account and exclusive member benefits
          </p>
        </div>
      </section>

      {/* Sign In Section */}
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Sign In Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <LogIn className="text-green-700" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Welcome Back</h2>
                <p className="text-gray-600 mt-2">Sign in to your TENUCSA account</p>
              </div>

              {/* Sign In Form */}
              <div className="space-y-6">
                {/* OAuth Sign In Button */}
                <button
                  onClick={handleSignIn}
                  disabled={isRedirecting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      Sign In with Manus
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Secure Authentication</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    We use secure OAuth authentication to protect your account. You'll be redirected to complete the sign-in process.
                  </p>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-4">Don't have an account?</p>
                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
                >
                  Create Account
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Secure",
                  description: "Your data is protected with enterprise-grade security",
                },
                {
                  title: "Fast",
                  description: "Sign in instantly with one click",
                },
                {
                  title: "Easy",
                  description: "No complicated passwords to remember",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                  <h3 className="font-bold text-blue-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Sign In FAQs
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Is my account information secure?",
                answer:
                  "Yes, we use industry-standard OAuth authentication which is one of the most secure authentication methods available. Your password is never stored on our servers.",
              },
              {
                question: "What if I forget my password?",
                answer:
                  "Since we use OAuth authentication, you don't need to remember a password. Simply click 'Sign In with Manus' and follow the authentication process.",
              },
              {
                question: "Can I sign in from multiple devices?",
                answer:
                  "Yes, you can sign in from any device. Your account is accessible from any browser as long as you have your authentication credentials.",
              },
              {
                question: "What should I do if I can't sign in?",
                answer:
                  "If you're having trouble signing in, please contact our support team at contact@tnucsa.org or use the contact form on our website.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
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
