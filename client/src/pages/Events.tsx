import { useState } from "react";
import Layout from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";

export default function Events() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");
  const { data: events = [], isLoading } = trpc.events.list.useQuery();

  // Sample events for demonstration
  const sampleEvents = [
    {
      id: 1,
      title: "Annual General Meeting",
      description: "Join us for our annual general meeting where we discuss the year's achievements and plan for the future.",
      eventDate: new Date(2026, 3, 15),
      eventTime: "2:00 PM",
      location: "Main Auditorium, Soroti University",
      capacity: 500,
      registeredCount: 320,
      status: "upcoming" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "Leadership Development Workshop",
      description: "Enhance your leadership skills with industry experts. Topics include communication, decision-making, and team management.",
      eventDate: new Date(2026, 3, 22),
      eventTime: "10:00 AM",
      location: "Training Center, Kumi University",
      capacity: 200,
      registeredCount: 145,
      status: "upcoming" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "Career Fair 2026",
      description: "Connect with top employers and explore career opportunities in various sectors. Bring your CV!",
      eventDate: new Date(2026, 4, 5),
      eventTime: "9:00 AM",
      location: "Convention Center, Mbale",
      capacity: 1000,
      registeredCount: 650,
      status: "upcoming" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: "Sports and Recreation Day",
      description: "A day of fun activities including football, volleyball, and other sports. All students welcome!",
      eventDate: new Date(2026, 2, 28),
      eventTime: "8:00 AM",
      location: "Sports Complex, Soroti",
      capacity: 300,
      registeredCount: 250,
      status: "completed" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      title: "Academic Excellence Seminar",
      description: "Learn study techniques and academic strategies from top-performing students and educators.",
      eventDate: new Date(2026, 2, 20),
      eventTime: "3:00 PM",
      location: "Lecture Hall B, Busitema University",
      capacity: 150,
      registeredCount: 120,
      status: "completed" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const displayEvents = events && events.length > 0 ? events : sampleEvents;

  const upcomingEvents = displayEvents.filter((e) => e.status === "upcoming");
  const pastEvents = displayEvents.filter((e) => e.status === "completed");

  const filteredEvents =
    filter === "upcoming" ? upcomingEvents : filter === "past" ? pastEvents : displayEvents;

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Events</h1>
          <p className="text-xl text-green-200">
            Discover and register for exciting events organized by TENUCSA.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 py-4 overflow-x-auto">
            {["all", "upcoming", "past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as "all" | "upcoming" | "past")}
                className={`px-6 py-2 font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  filter === tab
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-green-700"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">{event.title}</h3>
                        <p className="text-gray-700 mb-4">{event.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${
                            event.status === "upcoming"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {event.status === "upcoming" ? "Upcoming" : "Completed"}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={20} className="text-blue-900" />
                        <div>
                          <p className="text-sm font-semibold">{formatDate(event.eventDate)}</p>
                          {event.eventTime && <p className="text-xs text-gray-600">{event.eventTime}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={20} className="text-green-700" />
                        <p className="text-sm">{event.location || "TBA"}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users size={20} className="text-blue-900" />
                        <p className="text-sm">
                          {event.registeredCount}/{event.capacity || "∞"} registered
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    {event.status === "upcoming" && (
                      <button className="w-full md:w-auto px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center gap-2">
                        Register Now
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No {filter !== "all" ? filter : ""} events found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Statistics */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Event Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">{displayEvents.length}</div>
              <p className="text-gray-700">Total Events</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-green-700 mb-2">{upcomingEvents.length}</div>
              <p className="text-gray-700">Upcoming Events</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {displayEvents.reduce((sum, e) => sum + (e.registeredCount || 0), 0)}
              </div>
              <p className="text-gray-700">Total Registrations</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
