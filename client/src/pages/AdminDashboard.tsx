import { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"events" | "announcements" | "members" | "inquiries">("events");
  const [showForm, setShowForm] = useState(false);

  // Queries
  const { data: events = [] } = trpc.events.list.useQuery();
  const { data: announcements = [] } = trpc.announcements.list.useQuery();
  const { data: members = [] } = trpc.members.list.useQuery();

  // Mutations
  const createEventMutation = trpc.events.create.useMutation({
    onSuccess: () => {
      toast.success("Event created successfully!");
      setShowForm(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create event");
    },
  });

  const createAnnouncementMutation = trpc.announcements.create.useMutation({
    onSuccess: () => {
      toast.success("Announcement created successfully!");
      setShowForm(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create announcement");
    },
  });

  // Check if user is admin
  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin" size={48} />
        </div>
      </Layout>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Access Denied</h1>
            <p className="text-gray-700 mb-6">
              You do not have permission to access the admin dashboard. Only administrators can access this page.
            </p>
            <a href="/" className="inline-block px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800">
              Go to Home
            </a>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-green-200">Manage TNUCSA content and members</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {["events", "announcements", "members", "inquiries"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-green-700 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-900">Events Management</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  <Plus size={20} />
                  New Event
                </button>
              </div>

              {showForm && activeTab === "events" && (
                <EventForm
                  onSubmit={(data) => createEventMutation.mutate(data)}
                  isLoading={createEventMutation.isPending}
                />
              )}

              {/* Events List */}
              <div className="space-y-4">
                {events.length > 0 ? (
                  events.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-blue-900">{event.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                            <span>📍 {event.location || "TBA"}</span>
                            <span>👥 {event.registeredCount || 0}/{event.capacity || "∞"}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No events yet. Create one to get started!</p>
                )}
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === "announcements" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-900">Announcements Management</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  <Plus size={20} />
                  New Announcement
                </button>
              </div>

              {showForm && activeTab === "announcements" && (
                <AnnouncementForm
                  onSubmit={(data) => createAnnouncementMutation.mutate(data)}
                  isLoading={createAnnouncementMutation.isPending}
                />
              )}

              {/* Announcements List */}
              <div className="space-y-4">
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`border-l-4 rounded-lg p-4 hover:shadow-md transition-shadow ${
                        announcement.priority === "high"
                          ? "border-red-500 bg-red-50"
                          : announcement.priority === "medium"
                          ? "border-blue-500 bg-blue-50"
                          : "border-green-500 bg-green-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{announcement.title}</h3>
                          <p className="text-gray-700 mt-1">{announcement.message}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span>Priority: {announcement.priority}</span>
                            <span>📅 {new Date(announcement.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-100 rounded">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No announcements yet. Create one to get started!</p>
                )}
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === "members" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Members Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Institution</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.length > 0 ? (
                      members.map((member) => (
                        <tr key={member.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{member.fullName}</td>
                          <td className="px-4 py-3">{member.email}</td>
                          <td className="px-4 py-3">{member.institutionName}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                member.membershipStatus === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {member.membershipStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-blue-600 hover:underline">View</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                          No members yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Inquiries Tab */}
          {activeTab === "inquiries" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Contact Inquiries</h2>
              <p className="text-gray-600 text-center py-8">Inquiries management coming soon...</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function EventForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    location: "",
    capacity: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Event Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          required
        />
        <input
          type="date"
          value={formData.eventDate}
          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          required
        />
      </div>
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        rows={3}
      ></textarea>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="time"
          value={formData.eventTime}
          onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
        Create Event
      </button>
    </form>
  );
}

function AnnouncementForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    priority: "medium" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
      <input
        type="text"
        placeholder="Announcement Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        required
      />
      <textarea
        placeholder="Announcement Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        rows={4}
        required
      ></textarea>
      <select
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
        Create Announcement
      </button>
    </form>
  );
}
