import React from "react";

const About = () => {
  return (
    <section id="about" className="py-5 bg-white">
      <div className="container">
              <h2 className="h3 mb-4 text-start">About</h2>

        <div className="row align-items-center">
          {/* Left: Image */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/assets/img/myturf.jpg"
              alt="Turf Overview"
              className="img-fluid rounded-4 shadow-sm"
            />
          </div>

          {/* Right: Text */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">About TurfBook</h2>
            <p className="text-muted">
              <strong>TurfBook</strong> is an all-in-one online platform where
              players can easily discover, compare, and book sports turfs for
              football, cricket, and more. We make turf booking simple, quick,
              and reliable — with transparent pricing and real-time
              availability.
            </p>
            <p className="text-muted">
              Turf owners can register their venues, upload turf images, set
              prices for morning, afternoon, and evening slots, and manage
              bookings through their dashboard. Each turf and owner detail is
              verified by our admin before going live — ensuring trust and
              quality.
            </p>
            <p className="text-muted">
              Whether you're a player looking for your next game or an owner
              looking to grow your reach — TurfBook connects both worlds
              seamlessly.
            </p>
            <a href="/" className="btn btn-primary mt-2">
              Browse Turfs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
