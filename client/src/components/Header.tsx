import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { LOGO_URL, ASSOCIATION_INFO, NAVIGATION_ITEMS } from "@shared/constants";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Association Name */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src={LOGO_URL}
              alt={ASSOCIATION_INFO.shortName}
              className="h-12 w-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-blue-900">{ASSOCIATION_INFO.shortName}</h1>
              <p className="text-xs text-green-700 font-medium">{ASSOCIATION_INFO.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-900 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-gray-600 hover:text-blue-900 font-medium transition-colors text-sm"
              >
                Admin
              </Link>
            )}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-900 font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-900 font-medium transition-colors"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-medium transition-colors"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-3">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-blue-900 font-medium py-2 transition-colors text-sm"
                >
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors"
                  >
                    <LogIn size={18} />
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-medium transition-colors text-center"
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
