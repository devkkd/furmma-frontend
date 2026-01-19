import {
  FaPhoneAlt,
  FaArrowUp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="w-full bg-[#eaf3ff]">
      <div className="bg-[#1F2E46] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <span>Our Experts are Available 24/7</span>

          <div className="flex items-center gap-2">
            <FaPhoneAlt />
            <span>+91-1234567890</span>
          </div>

          <div className="flex items-center gap-2">
            <BsStars />
            <span>Furrmaa Pet AI Chat</span>
            <span className="bg-green-500 text-xs px-2 rounded-full">
              Premium
            </span>
          </div>

          <button className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-1">
            Back to Top <FaArrowUp />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 text-sm ">
        <div className="lg:col-span-2 space-y-3 ">
          <h2 className="text-lg font-bold text-[#0E0E0E]">FURRMAA</h2>
          <p className="text-xs text-gray-600">
            WHERE EVERY TAIL FEELS AT HOME
          </p>

          <h4 className="font-semibold mt-4">
            Trusted Care for Every Stage of Your Pet’s Life
          </h4>

          <p className="text-gray-600 text-sm">
            Furrmaa is not just an app—it's a complete pet-care ecosystem
            designed for modern pet parents.
          </p>
        </div>

        <FooterCol
          title="Quick Links"
          items={[
            "All For You",
            "Food",
            "Medicine",
            "Toys",
            "Accessories",
            "Grooming",
            "Supplements",
          ]}
        />

        <FooterCol
          title="Train"
          items={[
            "Basic Training (7 Lessons)",
            "Intermediate Training",
            "Advanced Training",
          ]}
        />

        <FooterCol
          title="Vet Services"
          items={[
            "Veterinarians",
            "Pet Shops",
            "Hospitals",
            "Pet Hotels / Hostels",
            "NGOs",
            "Shelters",
            "Rescue Centers",
            "Pet Cremation",
          ]}
        />

        <FooterCol
          title="Hope"
          items={["Lost & Found", "Adoption", "Add Post", "Hope Chat’s"]}
        />

        <FooterCol
          title="More"
          items={[
            "Furrmaa Pet AI Chat",
            "Pet Events",
            "Pet Cremation",
            "About Us",
            "FAQ’s",
            "Contact Us",
            "Terms of Services",
            "Privacy Policy",
          ]}
        />

        <FooterCol
          title="Account"
          items={["Login/Register", "Cart", "My Orders", "Track Orders"]}
        />
      </div>

      {/* INFO BAR */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <Info
            title="Address"
            text="100, ABCD Street, Jaipur, Rajasthan - INDIA"
          />
          <Info title="Call" text="+91-1234567890" />
          <Info title="Email" text="support@furrmaa.in" />
          <Info title="Legal" text="Terms of Services | Privacy Policy" />
        </div>
      </div>

      {/* SOCIAL */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Follow us</span>
            <FaInstagram />
            <FaFacebookF />
            <FaYoutube />
            <FaLinkedinIn />
          </div>

          <span className="text-gray-600">
            Crafted by <strong>Kontent Kraft Digital</strong>
          </span>
        </div>
      </div>

      <div className="border-t border-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-xl font-bold">
            Because Your Pet Deserves the Very Best
          </h2>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
              <FaApple /> App Store
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
              <FaGooglePlay /> Google Play
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold mb-3">{title}</h4>
      <ul className="space-y-2 text-gray-600">
        {items.map((item, i) => (
          <li key={i} className="hover:text-black cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Info({ title, text }) {
  return (
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
