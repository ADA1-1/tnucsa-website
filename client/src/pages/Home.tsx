import { Link } from "wouter";
import Layout from "@/components/Layout";
import { LOGO_URL, ASSOCIATION_INFO } from "@shared/constants";
import { Users, Calendar, Megaphone, Award } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Logo and Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {ASSOCIATION_INFO.name}
              </h1>
              <p className="text-xl text-green-200 mb-6 font-semibold">
                {ASSOCIATION_INFO.tagline}
              </p>
              <p className="text-gray-100 text-lg mb-8 max-w-lg">
                Join a vibrant community of students dedicated to academic excellence, personal growth, and meaningful engagement across universities and colleges in Teso North.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/register"
                  className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Become a Member
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Logo Image */}
            <div className="flex-1 flex justify-center">
              <img
                src={LOGO_URL}
                alt={ASSOCIATION_INFO.shortName}
                className="h-64 w-64 md:h-80 md:w-80 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-l-4 border-blue-900 hover:shadow-lg transition-shadow">
              <div className="bg-blue-900 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Community</h3>
              <p className="text-gray-700">
                Connect with thousands of students and build lasting friendships across institutions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-l-4 border-green-700 hover:shadow-lg transition-shadow">
              <div className="bg-green-700 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Events</h3>
              <p className="text-gray-700">
                Participate in engaging workshops, seminars, and social activities throughout the year.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-l-4 border-blue-900 hover:shadow-lg transition-shadow">
              <div className="bg-blue-900 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Megaphone size={24} />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Updates</h3>
              <p className="text-gray-700">
                Stay informed with announcements and news about association activities and opportunities.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-l-4 border-green-700 hover:shadow-lg transition-shadow">
              <div className="bg-green-700 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Leadership</h3>
              <p className="text-gray-700">
                Develop leadership skills and take on meaningful roles within the association.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Become a member today and start your journey with TNUCSA. Connect, grow, and make a difference.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Register Now
          </Link>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">500+</div>
              <p className="text-gray-700 text-lg">Active Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-700 mb-2">50+</div>
              <p className="text-gray-700 text-lg">Events Annually</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">10+</div>
              <p className="text-gray-700 text-lg">Partner Institutions</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
