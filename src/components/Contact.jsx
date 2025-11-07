import React from "react";

const Contact = () => (
  <section className="py-5 container" id="contact">
        <h2 className="h3 mb-4">Contact</h2>
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row align-items-start gap-3">
            <div>
              <h5 className="mb-1">Admin Support</h5>
              <p className="text-muted mb-2">Reach us for approvals, issues, or feedback.</p>
              <div className="d-flex flex-column">
                <a href="tel:+911234567890" className="link-dark text-decoration-none">📞 +91 12345 67890</a>
                <a href="mailto:admin@turfbook.com" className="link-dark text-decoration-none">✉️ admin@turfbook.com</a>
              </div>
            </div>
            <div className="ms-md-auto">
              <a className="btn btn-primary" href="mailto:admin@turfbook.com">Email Admin</a>
            </div>
          </div>
        </div>
      </section>
);

export default Contact;
