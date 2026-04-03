import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { ASSOCIATION_INFO, FOOTER_LINKS } from "@shared/constants";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-300">{ASSOCIATION_INFO.shortName}</h3>
            <p className="text-gray-300 text-sm mb-4">
              {ASSOCIATION_INFO.tagline}
            </p>
            <p className="text-gray-300 text-sm">
              Empowering students from universities and colleges across Teso North region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-green-300">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-green-300">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-green-300" />
                <a href={`mailto:${ASSOCIATION_INFO.email}`} className="text-gray-300 hover:text-green-300 transition-colors">
                  {ASSOCIATION_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-green-300" />
                <a href={`tel:${ASSOCIATION_INFO.phone}`} className="text-gray-300 hover:text-green-300 transition-colors">
                  {ASSOCIATION_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-green-300" />
                <span className="text-gray-300">{ASSOCIATION_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-green-300">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href={ASSOCIATION_INFO.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={ASSOCIATION_INFO.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={ASSOCIATION_INFO.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={ASSOCIATION_INFO.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {ASSOCIATION_INFO.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-green-300 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
