import React from "react";

const features = [
  { icon: "bi-lightbulb-fill", title: "Floodlights", desc: "Play at night with bright floodlights." },
  { icon: "bi-car-front-fill", title: "Parking", desc: "Ample parking space for visitors." },
  { icon: "bi-person-fill", title: "Changing Rooms", desc: "Comfortable changing rooms for players." },
  { icon: "bi-tree-fill", title: "Natural Turf", desc: "High-quality natural grass turf for matches." },
];

const Features = () => (
  <section className="py-5" id="features">
    <div className="container">
      <h2 className="h3 mb-4 text-start">Features</h2>
      <div className="row g-4 justify-content-center">
        {features.map((feature, idx) => (
          <div key={idx} className="col-6 col-md-3">
            <div
              className="card h-100 border-0 shadow rounded-4 text-center"
              style={{
                  cursor: "pointer", transition: "transform 0.3s ease, box-shadow 0.3s ease", 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
              }}
            >
              <div className="card-body p-4">
                <div className="mb-3 fs-1 text-primary">
                  <i className={`bi ${feature.icon}`}></i>
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted small mb-0">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
