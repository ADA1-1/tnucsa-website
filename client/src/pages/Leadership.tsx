import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Mail, Phone, User } from "lucide-react";

export default function Leadership() {
  const { data: leaders = [], isLoading } = trpc.leadership.list.useQuery();

  // Sample leadership data for demonstration
  const sampleLeaders = [
    {
      id: 1,
      fullName: "John Kipchoge",
      position: "President",
      email: "president@tnucsa.org",
      phone: "+254 700 123 456",
      bio: "Visionary leader with 3 years of experience in student advocacy and organizational management.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      department: "Executive",
      displayOrder: 1,
    },
    {
      id: 2,
      fullName: "Grace Achieng",
      position: "Vice President",
      email: "vp@tnucsa.org",
      phone: "+254 700 234 567",
      bio: "Passionate about student welfare and community development initiatives.",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      department: "Executive",
      displayOrder: 2,
    },
    {
      id: 3,
      fullName: "David Omondi",
      position: "General Secretary",
      email: "secretary@tnucsa.org",
      phone: "+254 700 345 678",
      bio: "Detail-oriented professional ensuring smooth organizational operations and communication.",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      department: "Executive",
      displayOrder: 3,
    },
    {
      id: 4,
      fullName: "Mary Kipchoge",
      position: "Treasurer",
      email: "treasurer@tnucsa.org",
      phone: "+254 700 456 789",
      bio: "Financial expert dedicated to transparent and accountable resource management.",
      photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      department: "Finance",
      displayOrder: 4,
    },
    {
      id: 5,
      fullName: "Peter Kiplagat",
      position: "Academic Affairs Officer",
      email: "academics@tnucsa.org",
      phone: "+254 700 567 890",
      bio: "Committed to promoting academic excellence and supporting student learning initiatives.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      department: "Academics",
      displayOrder: 5,
    },
    {
      id: 6,
      fullName: "Catherine Kipchoge",
      position: "Social Affairs Officer",
      email: "social@tnucsa.org",
      phone: "+254 700 678 901",
      bio: "Event organizer and community builder fostering meaningful student connections.",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      department: "Social",
      displayOrder: 6,
    },
  ];

  const displayLeaders = leaders && leaders.length > 0 ? leaders : sampleLeaders;

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Leadership</h1>
          <p className="text-xl text-green-200">
            Meet the dedicated individuals leading TENUCSA towards excellence and student empowerment.
          </p>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
              <p className="mt-4 text-gray-600">Loading leadership information...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayLeaders.map((leader) => (
                <div
                  key={leader.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-700"
                >
                  {/* Profile Image */}
                  <div className="relative h-64 bg-gradient-to-b from-blue-100 to-green-50 overflow-hidden">
                    {leader.photoUrl ? (
                      <img
                        src={leader.photoUrl}
                        alt={leader.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <User size={64} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-1">{leader.fullName}</h3>
                    <p className="text-green-700 font-semibold mb-3">{leader.position}</p>

                    {leader.bio && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{leader.bio}</p>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      {leader.email && (
                        <a
                          href={`mailto:${leader.email}`}
                          className="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors text-sm"
                        >
                          <Mail size={16} className="text-green-700" />
                          {leader.email}
                        </a>
                      )}
                      {leader.phone && (
                        <a
                          href={`tel:${leader.phone}`}
                          className="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors text-sm"
                        >
                          <Phone size={16} className="text-green-700" />
                          {leader.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Our Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Executive",
                description: "Overall leadership and strategic direction of the association",
                color: "blue",
              },
              {
                name: "Academics",
                description: "Promoting academic excellence and educational initiatives",
                color: "green",
              },
              {
                name: "Social Affairs",
                description: "Organizing events and fostering community connections",
                color: "blue",
              },
            ].map((dept, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-lg border-l-4 ${
                  dept.color === "blue" ? "border-blue-900" : "border-green-700"
                } shadow-md hover:shadow-lg transition-shadow`}
              >
                <h3 className={`text-2xl font-bold mb-3 ${dept.color === "blue" ? "text-blue-900" : "text-green-700"}`}>
                  {dept.name}
                </h3>
                <p className="text-gray-700">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
