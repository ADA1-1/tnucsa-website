import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Calendar, User, Settings, LogOut, Loader2, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "profile" | "settings">("overview");

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
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

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {user.name || "Member"}!</h1>
                <p className="text-blue-100">Manage your membership and event registrations</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
                <nav className="space-y-2">
                  {[
                    { id: "overview", label: "Overview", icon: "📊" },
                    { id: "events", label: "My Events", icon: "📅" },
                    { id: "profile", label: "Profile", icon: "👤" },
                    { id: "settings", label: "Settings", icon: "⚙️" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-green-700 text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === "overview" && <OverviewTab user={user} />}

              {/* Events Tab */}
              {activeTab === "events" && <EventsTab user={user} />}

              {/* Profile Tab */}
              {activeTab === "profile" && <ProfileTab user={user} />}

              {/* Settings Tab */}
              {activeTab === "settings" && <SettingsTab user={user} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Overview Tab Component
function OverviewTab({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Membership Status", value: "Active", color: "green" },
          { label: "Events Registered", value: "5", color: "blue" },
          { label: "Events Attended", value: "3", color: "purple" },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-700`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Member Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-semibold">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Member Since:</span>
            <span className="font-semibold">January 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Membership Type:</span>
            <span className="font-semibold text-green-700">Active Member</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-blue-900 mb-1">Membership Benefits</h3>
            <p className="text-blue-800 text-sm">
              As an active member, you have access to all TENUCSA events, exclusive workshops, networking opportunities, and member-only resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Events Tab Component
function EventsTab({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">My Event Registrations</h2>
        <div className="space-y-3">
          {[
            { title: "Annual TENUCSA Conference 2024", date: "April 15, 2024", status: "Registered" },
            { title: "Leadership Workshop", date: "April 20, 2024", status: "Registered" },
            { title: "Networking Breakfast", date: "April 25, 2024", status: "Registered" },
          ].map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Calendar className="text-green-700 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Past Events Attended</h2>
        <div className="space-y-3">
          {[
            { title: "Welcome to TENUCSA", date: "January 10, 2024" },
            { title: "Professional Development Seminar", date: "February 14, 2024" },
          ].map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start gap-3">
                <Calendar className="text-blue-700 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Profile Tab Component
function ProfileTab({ user }: { user: any }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 h-24"
              />
            </div>
            <button className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Bio</p>
              <p className="text-gray-900">No bio added yet. Edit your profile to add one.</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Profile Picture</h3>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <User className="text-gray-400" size={40} />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upload Picture
          </button>
        </div>
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ user }: { user: any }) {
  const [notifications, setNotifications] = useState({
    events: true,
    announcements: true,
    newsletters: false,
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Notification Settings</h2>
        <div className="space-y-4">
          {[
            { key: "events", label: "Event Notifications", description: "Get notified about new events and registrations" },
            { key: "announcements", label: "Announcements", description: "Receive important announcements from TENUCSA" },
            { key: "newsletters", label: "Newsletters", description: "Subscribe to our monthly newsletter" },
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{setting.label}</p>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <input
                type="checkbox"
                checked={notifications[setting.key as keyof typeof notifications]}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    [setting.key]: e.target.checked,
                  })
                }
                className="w-5 h-5 text-green-700 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Account Settings</h2>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Change Password
          </button>
          <button className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Two-Factor Authentication
          </button>
          <button className="w-full px-4 py-3 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
