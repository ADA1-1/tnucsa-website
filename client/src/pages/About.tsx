import Layout from "@/components/Layout";
import { ASSOCIATION_INFO } from "@shared/constants";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About TENUCSA</h1>
          <p className="text-xl text-green-200">
            Learn more about our organization, mission, and commitment to student excellence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Mission */}
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                The Teso North University and Colleges Student Association (TENUCSA) is dedicated to fostering a vibrant and inclusive community of students across universities and colleges in the Teso North region. We aim to promote academic excellence, personal development, and meaningful engagement among our members.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Through our programs, events, and initiatives, we strive to create opportunities for students to learn, network, and contribute positively to their institutions and communities.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h2 className="text-3xl font-bold text-green-700 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We envision a united student community in Teso North that champions academic excellence, social responsibility, and mutual support. We aspire to be a beacon of leadership and innovation, where every student has the opportunity to grow, excel, and make a meaningful impact.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our vision is to create an environment where diversity is celebrated, collaboration is encouraged, and every voice is heard and valued.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 md:p-12 rounded-lg border-l-4 border-blue-900">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Excellence", description: "Commitment to high standards in all our endeavors" },
                { title: "Integrity", description: "Honesty and transparency in all our actions" },
                { title: "Inclusivity", description: "Welcoming and supporting all students regardless of background" },
                { title: "Collaboration", description: "Working together to achieve common goals" },
                { title: "Innovation", description: "Embracing new ideas and creative solutions" },
                { title: "Accountability", description: "Taking responsibility for our decisions and actions" },
              ].map((value, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle className="text-green-700 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-1">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Organization Structure
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg border-2 border-blue-200">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                TENUCSA operates under a democratic structure with elected leadership representing various portfolios including academics, social affairs, finance, and external relations. Our organization is governed by a constitution that ensures transparency, accountability, and fair representation of all member institutions.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We work collaboratively with university and college administrations, student governments, and other stakeholder organizations to ensure our initiatives benefit the entire student community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Since its establishment, TENUCSA has grown into one of the most active and influential student organizations in the Teso North region. What began as a small initiative to connect students across institutions has evolved into a comprehensive platform for academic, social, and professional development.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Over the years, we have organized hundreds of events, workshops, and seminars that have positively impacted thousands of students. Our commitment to excellence and innovation continues to drive us forward as we work to create new opportunities and address emerging student needs.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, TENUCSA stands as a testament to the power of student unity and collective action. We remain dedicated to our mission of empowering students and shaping the future leaders of tomorrow.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
