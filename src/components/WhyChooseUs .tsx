const WhyChooseUs = () => {
  return (
    <section className="bg-[#1e1711] text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-sm text-[#b28b5c] mb-3">
            Why Choose FocusRoom
          </p>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Spaces Built for{" "}
            <span className="text-[#d89d33] italic">
              Productivity
            </span>
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
            Discover elegant study spaces and private rooms designed to help
            you focus, work efficiently, and stay inspired every day.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          
          {/* Feature 1 */}
          <div className="card bg-[#140b05] border border-[#2d1f12] rounded-[32px] hover:-translate-y-2 transition duration-300">
            <div className="card-body">
              
              <div className="w-16 h-16 rounded-2xl bg-[#2d1f12] flex items-center justify-center text-3xl text-[#d89d33]">
                📶
              </div>

              <h3 className="card-title text-2xl mt-6">
                High-Speed Wi-Fi
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Stay connected with ultra-fast internet perfect for study,
                remote work, and meetings.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-[#140b05] border border-[#2d1f12] rounded-[32px] hover:-translate-y-2 transition duration-300">
            <div className="card-body">
              
              <div className="w-16 h-16 rounded-2xl bg-[#2d1f12] flex items-center justify-center text-3xl text-[#d89d33]">
                🔇
              </div>

              <h3 className="card-title text-2xl mt-6">
                Quiet Environment
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Enjoy distraction-free spaces crafted for deep focus and
                maximum productivity.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-[#140b05] border border-[#2d1f12] rounded-[32px] hover:-translate-y-2 transition duration-300">
            <div className="card-body">
              
              <div className="w-16 h-16 rounded-2xl bg-[#2d1f12] flex items-center justify-center text-3xl text-[#d89d33]">
                ☕
              </div>

              <h3 className="card-title text-2xl mt-6">
                Premium Comfort
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Modern interiors and comfortable seating to help you stay
                relaxed and focused.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="card bg-[#140b05] border border-[#2d1f12] rounded-[32px] hover:-translate-y-2 transition duration-300">
            <div className="card-body">
              
              <div className="w-16 h-16 rounded-2xl bg-[#2d1f12] flex items-center justify-center text-3xl text-[#d89d33]">
                🕒
              </div>

              <h3 className="card-title text-2xl mt-6">
                Flexible Booking
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Book rooms by the hour with a fast and seamless reservation
                process.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
      
      </div>
    </section>
  );
};

export default WhyChooseUs;