import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { AlertCircle, Info, CheckCircle, Clock } from "lucide-react";

export default function News() {
  const { data: announcements = [], isLoading } = trpc.announcements.list.useQuery();

  // Sample announcements for demonstration
  const sampleAnnouncements = [
    {
      id: 1,
      title: "Important: Membership Renewal Deadline Extended",
      message:
        "Due to popular demand, we have extended the membership renewal deadline to April 30, 2026. All members are encouraged to renew their membership to maintain access to exclusive benefits and events.",
      priority: "high" as const,
      createdAt: new Date(2026, 3, 1),
      publishedAt: new Date(2026, 3, 1),
      updatedAt: new Date(2026, 3, 1),
    },
    {
      id: 2,
      title: "New Leadership Team Announced",
      message:
        "Congratulations to our newly elected leadership team! The elections were held on March 25, 2026, with record-breaking voter turnout. The new team will be officially inaugurated on April 10, 2026.",
      priority: "high" as const,
      createdAt: new Date(2026, 2, 26),
      publishedAt: new Date(2026, 2, 26),
      updatedAt: new Date(2026, 2, 26),
    },
    {
      id: 3,
      title: "Career Fair 2026 - Exhibitor Registration Open",
      message:
        "Employers and organizations interested in participating in our Career Fair 2026 can now register. Early bird discount available until April 15. Contact our careers department for more information.",
      priority: "medium" as const,
      createdAt: new Date(2026, 2, 20),
      publishedAt: new Date(2026, 2, 20),
      updatedAt: new Date(2026, 2, 20),
    },
    {
      id: 4,
      title: "Scholarship Opportunities Available",
      message:
        "TENUCSA is pleased to announce several scholarship opportunities for deserving members. Applications are open until April 30, 2026. Visit our website for eligibility criteria and application procedures.",
      priority: "high" as const,
      createdAt: new Date(2026, 2, 15),
      publishedAt: new Date(2026, 2, 15),
      updatedAt: new Date(2026, 2, 15),
    },
    {
      id: 5,
      title: "Office Hours: Meet the Leadership",
      message:
        "All TENUCSA leaders will be available for office hours every Wednesday from 2-4 PM. Come discuss your concerns, ideas, or questions. Location: TENUCSA Office, Main Campus.",
      priority: "medium" as const,
      createdAt: new Date(2026, 2, 10),
      publishedAt: new Date(2026, 2, 10),
      updatedAt: new Date(2026, 2, 10),
    },
    {
      id: 6,
      title: "Website Launch Announcement",
      message:
        "Welcome to the new TENUCSA website! We are excited to introduce our redesigned platform with improved features for member engagement, event registration, and communication. Explore and let us know your feedback!",
      priority: "medium" as const,
      createdAt: new Date(2026, 2, 1),
      publishedAt: new Date(2026, 2, 1),
      updatedAt: new Date(2026, 2, 1),
    },
  ];

  const displayAnnouncements =
    announcements && announcements.length > 0 ? announcements : sampleAnnouncements;

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="text-red-600" size={24} />;
      case "medium":
        return <Info className="text-blue-600" size={24} />;
      case "low":
        return <CheckCircle className="text-green-600" size={24} />;
      default:
        return <Clock className="text-gray-600" size={24} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-blue-500 bg-blue-50";
      case "low":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">News & Announcements</h1>
          <p className="text-xl text-green-200">
            Stay updated with the latest news and important announcements from TENUCSA.
          </p>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
              <p className="mt-4 text-gray-600">Loading announcements...</p>
            </div>
          ) : displayAnnouncements.length > 0 ? (
            <div className="space-y-6">
              {displayAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 ${getPriorityColor(
                    announcement.priority || "medium"
                  )}`}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {getPriorityIcon(announcement.priority || "medium")}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                          <h3 className="text-2xl font-bold text-blue-900">{announcement.title}</h3>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getPriorityBadge(
                              announcement.priority || "medium"
                            )}`}
                          >
                            {announcement.priority ? announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1) : "Medium"} Priority
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{announcement.message}</p>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={16} />
                          <span>
                            Published on{" "}
                            {formatDate(announcement.publishedAt || announcement.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No announcements at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest announcements and updates directly to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="px-6 py-3 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
