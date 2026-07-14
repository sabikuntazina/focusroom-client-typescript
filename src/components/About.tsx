import Image from "next/image";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-[#0F0905] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="uppercase tracking-[6px] text-[#D89D2D] text-sm font-semibold mb-4">
              About FocusRoom
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Built for Productivity.
              <br />
              Designed for Every Goal.
            </h2>

            <p className="text-gray-400 text-lg leading-8 mb-6">
              FocusRoom is a modern room booking platform that helps students,
              professionals, educators, and teams discover the ideal
              environment for studying, meetings, collaboration, and focused
              work.
            </p>

            <p className="text-gray-500 leading-8">
              Whether you are preparing for an exam, hosting a workshop, or
              meeting with clients, FocusRoom makes finding and booking the
              perfect space simple, secure, and hassle-free.
            </p>

            <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#D89D2D] px-8 py-4 font-semibold text-black transition hover:bg-[#E7AE40]">
              Explore Rooms
              <FaArrowRight />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-3xl border border-[#3A2413]">
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
              alt="Modern Workspace"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<FaCalendarCheck size={24} />}
            title="Smart Booking"
            description="Book study rooms, meeting spaces, and collaborative environments in seconds with a smooth booking experience."
          />

          <FeatureCard
            icon={<FaUsers size={24} />}
            title="Productivity First"
            description="Every workspace is designed to encourage focus, creativity, and collaboration for individuals and teams."
          />

          <FeatureCard
            icon={<FaShieldAlt size={24} />}
            title="Secure & Reliable"
            description="Enjoy secure authentication, real-time availability, and conflict-free room reservations."
          />
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
          <Stat number="500+" label="Bookings Completed" />
          <Stat number="100+" label="Premium Rooms" />
          <Stat number="98%" label="Customer Satisfaction" />
          <Stat number="24/7" label="Platform Access" />
        </div>
      </div>
    </section>
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps) => (
  <div className="rounded-3xl border border-[#3A2413] bg-[#18100A] p-8 transition hover:border-[#D89D2D]">
    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#D89D2D]/20 text-[#D89D2D]">
      {icon}
    </div>

    <h3 className="mb-4 text-2xl font-semibold text-white">{title}</h3>

    <p className="leading-7 text-gray-400">{description}</p>
  </div>
);

type StatProps = {
  number: string;
  label: string;
};

const Stat = ({ number, label }: StatProps) => (
  <div>
    <h3 className="text-5xl font-bold text-[#D89D2D]">{number}</h3>
    <p className="mt-3 text-gray-400">{label}</p>
  </div>
);

export default About;