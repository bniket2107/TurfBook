// // src/components/TurfDetails.jsx
// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext"; // Adjust import path if different

// const TurfDetails = () => {
//   const [turf, setTurf] = useState({
//     id: "",
//     name: "",
//     location: "",
//     price: "",
//     rating: "",
//     images: [], // multiple images
//     facilities: [],
//     reviews: [],
//     mapUrl: ""
//   });
//   const { user } = useContext(AuthContext);
// const navigate = useNavigate();

// const handleSelectDateTime = () => {
//   if (!user || !user.token) {
//     // If not logged in, go to login with redirect to booking page
//     navigate(`/login?redirect=/book-slot?tid=${turf.id}`);
//   } else {
//     // If logged in, go straight to booking
//     navigate(`/book-slot?tid=${turf.id}`);
//   }
// };


//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const turfId = params.get("tid");

//     // Dummy dynamic data
//     const dummyTurfs = [
//       {
//         id: "1",
//         name: "My Turf",
//         location: "Andheri, Mumbai",
//         price: 800,
//         rating: 4.5,
//         images: [
//           "/assets/img/myturf.jpg",
//           "/assets/img/myturf2.jpg",
//           "/assets/img/myturf3.jpg"
//         ],
//         facilities: ["Parking", "Floodlights", "Changing Rooms"],
//         reviews: [
//           "Great turf! Well maintained.",
//           "Friendly staff and good lighting for night games."
//         ],
//         mapUrl: "https://www.google.com/maps?q=Andheri+Mumbai"
//       },
//       {
//         id: "2",
//         name: "Pro Arena",
//         location: "Kothrud, Pune",
//         price: 1200,
//         rating: 4.8,
//         images: [
//           "/assets/img/turff.jpg",
//           "/assets/img/turff2.jpg"
//         ],
//         facilities: ["Parking", "Changing Rooms"],
//         reviews: ["Perfect turf, amazing experience."],
//         mapUrl: "https://maps.app.goo.gl/yR741HPrnMx3cTqz9"
//       },
//       {
//         id: "3",
//         name: "Champion Ground",
//         location: "Koramangala, Bengaluru",
//         price: 1000,
//         rating: 4.6,
//         images: [
//           "/assets/img/turf-image3.jpg"
//         ],
//         facilities: ["Parking", "Washroom"],
//         reviews: [
//           "One of the best maintained turfs in Bengaluru."
//         ],
//         mapUrl: "https://maps.google.com/?q=Koramangala,Bengaluru"
//       },
//       {
//         id: "4",
//         name: "Victory Stadium",
//         location: "Navrangpura, Ahmedabad",
//         price: 900,
//         rating: 4.3,
//         images: [
//           "/assets/img/turf4.jpg"
//         ],
//         facilities: ["Parking", "Floodlights"],
//         reviews: [
//           "Spacious ground and friendly staff.",
//           "Perfect for after-work games."
//         ],
//         mapUrl: "https://maps.google.com/?q=Navrangpura,Ahmedabad"
//       },
//       {
//         id: "5",
//         name: "Elite Arena",
//         location: "Mussoorie, Uttarakhand",
//         price: 1100,
//         rating: 4.7,
//         images: [
//           "/assets/img/turf5.jpg"
//         ],
//         facilities: ["Changing Rooms", "Parking"],
//         reviews: [
//           "Amazing atmosphere and cool weather turf.",
//           "Clean changing rooms."
//         ],
//         mapUrl: "https://maps.google.com/?q=Mussoorie,Uttarakhand"
//       }
//     ];
//     // Add other turfs similarly
    

//     const selectedTurf = dummyTurfs.find(t => t.id === turfId) || dummyTurfs[0];
//     setTurf(selectedTurf);
//   }, []);

//   return (
//     <div className="bg-light">
//       <Navbar />

//       <main className="container py-4" style={{ position: 'absolute', left: '7%', top: '5%' }} >
//         {/* Breadcrumb */}
//         <nav aria-label="breadcrumb">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item"><a href="/">Browse</a></li>
//             <li className="breadcrumb-item active" aria-current="page">Turf Details</li>
//           </ol>
//         </nav>

//         <div className="row g-4" >
//           {/* Left Column: Images + Details */}
//           <div className="col-12 col-lg-7">
//             {/* Carousel */}
//             <div id="turfCarousel" className="carousel slide mb-3">
//               <div
//                 className="turf-img-frame mb-4"
//                 style={{
//                   width: "100%",
//                   maxWidth: "870px",
//                   height: "480px",
//                   margin: "0 auto",
//                   borderRadius: "1rem",
//                   boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
//                   overflow: "hidden",
//                   background: "#111"
//                 }}
//               >
//                 <img
//                   src={turf.images[0]}
//                   alt={turf.name}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     display: "block"
//                   }}
//                 />
//               </div>

//               {turf.images.length > 1 && (
//                 <>
//                   <button className="carousel-control-prev" type="button" data-bs-target="#turfCarousel" data-bs-slide="prev">
//                     <span className="carousel-control-prev-icon"></span>
//                   </button>
//                   <button className="carousel-control-next" type="button" data-bs-target="#turfCarousel" data-bs-slide="next">
//                     <span className="carousel-control-next-icon"></span>
//                   </button>
//                 </>
//               )}
//             </div>

//             <h2 className="h3">{turf.name}</h2>
//             <p className="text-muted mb-2">{turf.location}</p>
//             <div className="mb-3">
//               <span className="badge text-bg-success me-2">{turf.rating} ★</span>
//               <span className="badge text-bg-secondary">₹{Math.round(
//                                   turf.price * (1 - turf.discount / 100)
//                                 )}/hour</span>
//             </div>

//             <h3 className="h5">Facilities</h3>
//             <div className="d-flex flex-wrap gap-2 mb-4">
//               {turf.facilities.map((f, idx) => (
//                 <span key={idx} className="badge text-bg-light border">{f}</span>
//               ))}
//             </div>

//             <h3 className="h5">Reviews</h3>
//             <div className="vstack gap-3">
//               {turf.reviews.length === 0
//                 ? <p className="text-muted small">No reviews yet.</p>
//                 : turf.reviews.map((rev, idx) => (
//                   <div key={idx} className="card p-2 shadow-sm">{rev}</div>
//                 ))
//               }
//             </div>
//           </div>

//           {/* Right Column: Booking */}
//           <div className="col-12 col-lg-5">
//             <div className="card">
//               <div className="card-body">
//                 <h4 className="h6 text-muted mb-3">Book a Slot</h4>
//                 <div className="d-grid gap-2">
//                  <button className="btn btn-primary" onClick={handleSelectDateTime}>
//   Select Date & Time
// </button>

//                   <a className="btn btn-outline-secondary" target="_blank" rel="noreferrer" href={turf.mapUrl}>View on Map</a>
//                 </div>
//               </div>
//             </div>
//             <div className="alert alert-info mt-3 small">
//               You can cancel or reschedule before the slot start, as per policy.
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TurfDetails;

///-----------------------------------------

// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../contexts/AuthContext";
// import Navbar from "./Navbar";

// const TurfDetails = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const params = new URLSearchParams(location.search);
//   const turfId = params.get("tid");

//   const [turf, setTurf] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // -------------------------
//   // Fetch Turf Details
//   // -------------------------
//   useEffect(() => {
//     if (!turfId) return;

//     const fetchTurfDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8088/api/turfs/${turfId}`);
//         const t = res.data;

//         setTurf({
//           id: t.turfId,
//           name: t.turfName,
//           location: t.location || `${t.area}, ${t.city}`,
//           price: t.pricePerHour,
//           discountedPrice: t.discountedPrice,
//           rating: t.rating || 4.5,
//           facilities: t.facilities || [],
//           images: t.imageUrls && t.imageUrls.length > 0 ? t.imageUrls : ["/assets/img/default-turf.jpg"],
//           reviews: t.reviews || [],
//           mapUrl: t.mapUrl || `https://www.google.com/maps?q=${t.area}+${t.city}`,
//           description: t.description || "A well-maintained turf with great ambience.",
//         });

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching turf details:", err);
//         setError("Unable to load turf details. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchTurfDetails();
//   }, [turfId]);


//   // -------------------------
//   // Handle Booking Button
//   // -------------------------
//   const handleBookSlot = () => {
//     if (!user?.token) {
//       navigate(`/login?redirect=/book-slot?tid=${turf.id}`);
//     } else {
//       navigate(`/book-slot?tid=${turf.id}`);
//     }
//   };

//   // -------------------------
//   // Loading State
//   // -------------------------
//   if (loading) {
//     return (
//       <main className="container py-5 text-center">
//         <div className="spinner-border text-primary"></div>
//         <p className="mt-3">Loading turf details...</p>
//       </main>
//     );
//   }

//   // -------------------------
//   // Error State
//   // -------------------------
//   if (error) {
//     return (
//       <main className="container py-5">
//         <div className="alert alert-danger text-center">{error}</div>
//       </main>
//     );
//   }

//   if (!turf) {
//     return (
//       <main className="container py-5">
//         <div className="alert alert-warning text-center">Turf not found!</div>
//       </main>
//     );
//   }

//   // ---------------------------------------------------
//   // UI SECTION
//   // ---------------------------------------------------
//   return (
//    <div> <Navbar />
//     <main className="container py-4">

//       {/* Breadcrumb */}
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item">
//             <a href="/" className="text-decoration-none">Browse</a>
//           </li>
//           <li className="breadcrumb-item active">Turf Details</li>
//         </ol>
//       </nav>

//       <div className="row g-4">

//         {/* LEFT COLUMN */}
//         <div className="col-lg-7">

//           {/* Image Carousel */}
//           <div id="turfCarousel" className="carousel slide mb-3">
//             <div className="carousel-inner">
//               {turf.images.map((img, idx) => (
//                 <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
//                   <img
//                     src={img}
//                     className="d-block w-100 rounded"
//                     style={{ height: "370px", objectFit: "cover" }}
//                     alt={`Image ${idx + 1}`}
//                   />
//                 </div>
//               ))}
//             </div>

//             {turf.images.length > 1 && (
//               <>
//                 <button className="carousel-control-prev" type="button" data-bs-target="#turfCarousel" data-bs-slide="prev">
//                   <span className="carousel-control-prev-icon"></span>
//                 </button>
//                 <button className="carousel-control-next" type="button" data-bs-target="#turfCarousel" data-bs-slide="next">
//                   <span className="carousel-control-next-icon"></span>
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Basic Info */}
//           <h2>{turf.name}</h2>
//           <p className="text-muted">{turf.location}</p>

//           <div className="mb-3">
//             <span className="badge bg-success me-2">{turf.rating} ★</span>

//             {turf.discountedPrice < turf.price ? (
//               <>
//                 <span className="badge bg-secondary me-2">
//                   ₹{turf.discountedPrice}/hour
//                 </span>
                
//                 <span className="text-muted text-decoration-line-through small">
//                   ₹{turf.price}/hour
//                 </span>
//               </>
//             ) : (
//               <span className="badge bg-secondary">₹{turf.price}/hour</span>
//             )}
//           </div>

//           {/* Facilities */}
//           <h4 className="h5">Facilities</h4>
//           <div className="d-flex flex-wrap gap-2 mb-4">
//             {turf.facilities.length > 0 ? (
//               turf.facilities.map((f, i) => (
//                 <span key={i} className="badge text-bg-light border px-3 py-2">
//                   {f}
//                 </span>
//               ))
//             ) : (
//               <p className="text-muted small">No facilities listed.</p>
//             )}
//           </div>

//           {/* Description */}
//           <h4 className="h5">Description</h4>
//           <p>{turf.description}</p>

//           {/* Reviews */}
//           <h4 className="h5">Reviews</h4>
//           {turf.reviews.length > 0 ? (
//             <div className="vstack gap-3">
//               {turf.reviews.map((rev, i) => (
//                 <div className="card p-2 shadow-sm" key={i}>{rev}</div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-muted small">No reviews yet.</p>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-lg-5">
//           <div className="card shadow-sm">
//             <div className="card-body">
//               <h5 className="text-muted mb-3">Book a Slot</h5>

//               <div className="d-grid gap-2">
//                 <button className="btn btn-primary" onClick={handleBookSlot}>
//                   Select Date & Time
//                 </button>

//                 <a
//                   className="btn btn-outline-secondary"
//                   href={turf.mapUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   View on Map
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="alert alert-info mt-3 small">
//             You can cancel or reschedule before the slot start as per policy.
//           </div>
//         </div>

//       </div>
//     </main>
//    </div>
//   );
// };


// export default TurfDetails;


//----------------------------------------------
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./Navbar";

const TurfDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const turfId = params.get("tid");

  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -------------------------
  // Fetch Turf Details
  // -------------------------
  useEffect(() => {
    if (!turfId) return;

    const fetchTurfDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8088/api/turfs/${turfId}`);
        const t = res.data;

        // discount fix applied here ONLY
        const discountPercent = t.discount ?? 0;
        const discountedPrice = Math.round(
          t.pricePerHour - (t.pricePerHour * discountPercent) / 100
        );

        setTurf({
          id: t.turfId,
          name: t.turfName,
          location: t.location || `${t.area}, ${t.city}`,
          price: t.pricePerHour,
          discountPercent: discountPercent,
          discountedPrice: discountedPrice,
          rating: t.rating || 4.5,
          facilities: t.facilities || [],
          images:
            t.imageUrls && t.imageUrls.length > 0
              ? t.imageUrls
              : ["/assets/img/default-turf.jpg"],
          reviews: t.reviews || [],
          mapUrl: t.mapUrl || `https://www.google.com/maps?q=${t.area}+${t.city}`,
          description:
            t.description || "A well-maintained turf with great ambience.",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching turf details:", err);
        setError("Unable to load turf details. Please try again later.");
        setLoading(false);
      }
    };

    fetchTurfDetails();
  }, [turfId]);

  // -------------------------
  // Handle Booking Button
  // -------------------------
  const handleBookSlot = () => {
    if (!user?.token) {
      navigate(`/login?redirect=/book-slot?tid=${turf.id}`);
    } else {
      navigate(`/book-slot?tid=${turf.id}`);
    }
  };

  // -------------------------
  // Loading State
  // -------------------------
  if (loading) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading turf details...</p>
      </main>
    );
  }

  // -------------------------
  // Error State
  // -------------------------
  if (error) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger text-center">{error}</div>
      </main>
    );
  }

  if (!turf) {
    return (
      <main className="container py-5">
        <div className="alert alert-warning text-center">Turf not found!</div>
      </main>
    );
  }

  // ---------------------------------------------------
  // UI SECTION
  // ---------------------------------------------------
  return (
    <div>
      <Navbar />
      <main className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">Browse</a>
            </li>
            <li className="breadcrumb-item active">Turf Details</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* LEFT COLUMN */}
          <div className="col-lg-7">
            {/* Image Carousel */}
            <div id="turfCarousel" className="carousel slide mb-3">
              <div className="carousel-inner">
                {turf.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  >
                    <img
                      src={img}
                      className="d-block w-100 rounded"
                      style={{ height: "370px", objectFit: "cover" }}
                      alt={`Image ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>

              {turf.images.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#turfCarousel"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#turfCarousel"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </>
              )}
            </div>

            {/* Basic Info */}
            <h2>{turf.name}</h2>
            <p className="text-muted">{turf.location}</p>

            <div className="mb-3">
              <span className="badge bg-success me-2">{turf.rating} ★</span>

              {/* PRICE + DISCOUNT FIXED HERE ONLY */}
              {turf.discountPercent > 0 ? (
                <>
                  <span className="badge bg-danger me-2">
                    {turf.discountPercent}% OFF
                  </span>

                  <span className="badge bg-secondary me-2">
                    ₹{turf.discountedPrice}/hour
                  </span>

                  <span className="text-muted text-decoration-line-through small">
                    ₹{turf.price}/hour
                  </span>
                </>
              ) : (
                <span className="badge bg-secondary">₹{turf.price}/hour</span>
              )}
            </div>

            {/* Facilities */}
            <h4 className="h5">Facilities</h4>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {turf.facilities.length > 0 ? (
                turf.facilities.map((f, i) => (
                  <span key={i} className="badge text-bg-light border px-3 py-2">
                    {f}
                  </span>
                ))
              ) : (
                <p className="text-muted small">No facilities listed.</p>
              )}
            </div>

            {/* Description */}
            <h4 className="h5">Description</h4>
            <p>{turf.description}</p>

            {/* Reviews */}
            <h4 className="h5">Reviews</h4>
            {turf.reviews.length > 0 ? (
              <div className="vstack gap-3">
                {turf.reviews.map((rev, i) => (
                  <div className="card p-2 shadow-sm" key={i}>
                    {rev}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted small">No reviews yet.</p>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="text-muted mb-3">Book a Slot</h5>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={handleBookSlot}>
                    Select Date & Time
                  </button>

                  <a
                    className="btn btn-outline-secondary"
                    href={turf.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </div>

            <div className="alert alert-info mt-3 small">
              You can cancel or reschedule before the slot start as per policy.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TurfDetails;