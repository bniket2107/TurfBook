// import React, { useState, useRef, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Features from "../components/Features";
// import Gallery from "../components/About";
// import Contact from "../components/Contact";
// import "../assets/css/custom.css";
// import About from "../components/About";

// const Home = () => {
//   const [turfs, setTurfs] = useState([]);
//   const [filteredTurfs, setFilteredTurfs] = useState([]);
//   const [sortBy, setSortBy] = useState("relevance");
//   const turfsSectionRef = useRef(null);

//   useEffect(() => {
//     const dummyTurfs = [
//       {
//         id: 1,
//         name: "My Turf",
//         state: "Maharashtra",
//         city: "Mumbai",
//         area: "Andheri",
//         location: "Andheri, Mumbai",
//         price: 800,
//         rating: 4.5,
//         facilities: ["Parking", "Washroom"],
//         img: "/assets/img/myturf.jpg",
//         discount: 10,
//       },
//       {
//         id: 2,
//         name: "Pro Arena",
//         state: "Maharashtra",
//         city: "Pune",
//         area: "Kothrud",
//         location: "Kothrud, Pune",
//         price: 1200,
//         rating: 4.8,
//         facilities: ["Floodlights", "Parking"],
//         img: "/assets/img/turff.jpg",
//         discount: 20,
//       },
//       {
//         id: 3,
//         name: "Champion Ground",
//         state: "Karnataka",
//         city: "Bengaluru",
//         area: "Koramangala",
//         location: "Koramangala, Bengaluru",
//         price: 1000,
//         rating: 4.2,
//         facilities: ["Washroom"],
//         img: "/assets/img/turf-image3.jpg",
//         discount: 0,
//       },
//       {
//         id: 4,
//         name: "Victory Stadium",
//         state: "Gujarat",
//         city: "Ahmedabad",
//         area: "Navrangpura",
//         location: "Navrangpura, Ahmedabad",
//         price: 900,
//         rating: 4.3,
//         facilities: ["Parking"],
//         img: "/assets/img/turf4.jpg",
//         discount: 15,
//       },
//       {
//         id: 5,
//         name: "Elite Arena",
//         state: "Uttarakhand",
//         city: "Mussoorie",
//         area: "",
//         location: "Mussoorie, Uttarakhand",
//         price: 1100,
//         rating: 4.7,
//         facilities: ["Floodlights", "Washroom"],
//         img: "/assets/img/turf5.jpg",
//         discount: 5,
//       },
//     ];
//     setTurfs(dummyTurfs);
//     setFilteredTurfs(dummyTurfs);
//   }, []);

//   const scrollToTurfs = () => {
//     turfsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const getComparator = (sortBy, q) => {
//     return (a, b) => {
//       const pa = Number(a.price) || 0,
//         pb = Number(b.price) || 0;
//       const ra = Number(a.rating) || 0,
//         rb = Number(b.rating) || 0;
//       switch (sortBy) {
//         case "priceAsc":
//           return pa - pb || rb - ra || a.name.localeCompare(b.name);
//         case "priceDesc":
//           return pb - pa || rb - ra || a.name.localeCompare(b.name);
//         case "ratingDesc":
//           return rb - ra || pa - pb || a.name.localeCompare(b.name);
//         case "relevance":
//         default: {
//           const sa = 1;
//           const sb = 1;
//           return sb - sa || rb - ra || pa - pb || a.name.localeCompare(b.name);
//         }
//       }
//     };
//   };

//   const q = "";
//   const sortedTurfs = [...filteredTurfs].sort(getComparator(sortBy, q));

//   return (
//     <div className="bg-light">
//       <Navbar />

//       <Hero
//         turfs={turfs}
//         setFilteredTurfs={setFilteredTurfs}
//         onSearchScroll={scrollToTurfs}
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//       />

//       {/* Available Turfs */}
//       <section className="py-5" ref={turfsSectionRef}>
//         <div className="container">
//           <div className="d-flex align-items-center justify-content-between mb-2">
//             <h2 className="h3 m-0">Available Turfs</h2>
//             <div>
//               <select
//                 id="sortBy"
//                 className="form-select form-select-sm"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="relevance">Sort: Relevance</option>
//                 <option value="priceAsc">Price (Low→High)</option>
//                 <option value="priceDesc">Price (High→Low)</option>
//                 <option value="ratingDesc">Rating</option>
//               </select>
//             </div>
//           </div>
//           <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//             {sortedTurfs.length === 0 ? (
//               <div className="col">
//                 <div className="alert alert-light border">
//                   No turfs match your filters.
//                 </div>
//               </div>
//             ) : (
//               sortedTurfs.map((turf) => (
//                 <div className="col" key={turf.id}>
//                   <div
//                     className="card shadow-sm turf-card position-relative"
//                     style={{
//                       borderRadius: "0.9rem",
//                       cursor: "pointer",
//                       overflow: "hidden",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                       minHeight: "380px",
//                     }}
//                     onClick={() =>
//                       (window.location.href = `/turf-details?tid=${turf.id}`)
//                     }
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.transform = "scale(1.03)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.transform = "scale(1)")
//                     }
//                   >
//                     <div className="turf-img-container" style={{ height: "240px" }}>
//                       <img
//                         src={turf.img}
//                         alt={turf.name}
//                         className="img-fluid"
//                         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                       />
//                     </div>
//                     <div className="card-body position-relative">
//                       <h5 className="card-title d-flex justify-content-between align-items-center">
//                         <span>{turf.name}</span>
//                         <span className="badge bg-success">{turf.rating} ★</span>
//                       </h5>
//                       <p className="card-text mb-1">{turf.location}</p>
//                       {turf.discount > 0 ? (
//                         <div className="d-flex justify-content-between align-items-center mt-2">
//                           <span className="badge bg-danger">
//                             {turf.discount}% OFF
//                           </span>
//                           <div>
//                             <span className="text-decoration-line-through text-muted me-2">
//                               ₹{turf.price}
//                             </span>
//                             <div className="badge text-bg-secondary">
//                               <span className="fw-bold">
//                                 ₹{Math.round(
//                                   turf.price * (1 - turf.discount / 100)
//                                 )}
//                               </span>
//                               <span>/hour</span>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <span className="badge text-bg-secondary me-2">
//                           ₹{turf.price}/hour
//                         </span>
//                       )}
//                     </div>
//                     <div className="card-footer bg-transparent border-0">
//                       <button
//                         className="btn btn-primary w-100"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           window.location.href = `/turf-details?tid=${turf.id}`;
//                         }}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       <Features />
//       <About />
//       <Contact />
//     </div>
//   );
// };

// export default Home;


// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Features from "../components/Features";
// import About from "../components/About";
// import Contact from "../components/Contact";
// import "../assets/css/custom.css";

// const Home = () => {
//   const [turfs, setTurfs] = useState([]);
//   const [filteredTurfs, setFilteredTurfs] = useState([]);
//   const [sortBy, setSortBy] = useState("relevance");
//   const turfsSectionRef = useRef(null);

//   // 🔥 Fetch approved turfs from backend
//   useEffect(() => {
//     const fetchTurfs = async () => {
//       try {
//         const res = await axios.get("http://localhost:8080/api/turfs/approved"); 
//         // NOTE: API change as per your backend

//         const turfData = res.data.map((t) => ({
//           id: t._id,
//           name: t.turfName,
//           state: t.state,
//           city: t.city,
//           area: t.area,
//           location: `${t.area}, ${t.city}`,
//           price: t.pricePerHour,
//           rating: t.rating || 4.5,
//           facilities: t.facilities || [],
//           img: t.imageUrl, // backend image path
//           discount: t.discount || 0,
//         }));

//         setTurfs(turfData);
//         setFilteredTurfs(turfData);
//       } catch (error) {
//         console.error("Error loading turfs:", error);
//       }
//     };

//     fetchTurfs();
//   }, []);

//   const scrollToTurfs = () => {
//     turfsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const getComparator = (sortBy) => {
//     return (a, b) => {
//       const pa = Number(a.price);
//       const pb = Number(b.price);
//       const ra = Number(a.rating);
//       const rb = Number(b.rating);

//       switch (sortBy) {
//         case "priceAsc": return pa - pb;
//         case "priceDesc": return pb - pa;
//         case "ratingDesc": return rb - ra;
//         default: return rb - ra;
//       }
//     };
//   };

//   const sortedTurfs = [...filteredTurfs].sort(getComparator(sortBy));

//   return (
//     <div className="bg-light">
//       <Navbar />

//       <Hero
//         turfs={turfs}
//         setFilteredTurfs={setFilteredTurfs}
//         onSearchScroll={scrollToTurfs}
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//       />

//       {/* Available Turfs */}
//       <section className="py-5" ref={turfsSectionRef}>
//         <div className="container">
//           <div className="d-flex align-items-center justify-content-between mb-2">
//             <h2 className="h3 m-0">Available Turfs</h2>

//             <select
//               id="sortBy"
//               className="form-select form-select-sm"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="relevance">Sort: Relevance</option>
//               <option value="priceAsc">Price (Low→High)</option>
//               <option value="priceDesc">Price (High→Low)</option>
//               <option value="ratingDesc">Rating</option>
//             </select>
//           </div>

//           <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//             {sortedTurfs.length === 0 ? (
//               <div className="col">
//                 <div className="alert alert-light border">
//                   No turfs found.
//                 </div>
//               </div>
//             ) : (
//               sortedTurfs.map((turf) => (
//                 <div className="col" key={turf.id}>
//                   <div
//                     className="card shadow-sm turf-card"
//                     style={{ borderRadius: "10px", cursor: "pointer" }}
//                     onClick={() => (window.location.href = `/turf-details?tid=${turf.id}`)}
//                   >
//                     <img
//                       src={turf.img}
//                       alt={turf.name}
//                       className="img-fluid"
//                       style={{ height: "240px", width: "100%", objectFit: "cover" }}
//                     />

//                     <div className="card-body">
//                       <h5 className="card-title d-flex justify-content-between">
//                         {turf.name}
//                         <span className="badge bg-success">{turf.rating} ★</span>
//                       </h5>

//                       <p>{turf.location}</p>

//                       <span className="badge text-bg-secondary">
//                         ₹{turf.price}/hour
//                       </span>
//                     </div>

//                     <div className="card-footer bg-transparent border-0">
//                       <button
//                         className="btn btn-primary w-100"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           window.location.href = `/turf-details?tid=${turf.id}`;
//                         }}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       <Features />
//       <About />
//       <Contact />
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar"; 
// import Hero from "../components/Hero"; 
// import Features from "../components/Features"; 
// import About from "../components/About"; 
// import Contact from "../components/Contact"; 
// import "../assets/css/custom.css"; 

// const Home = () => {
//   const [turfs, setTurfs] = useState([]); 
//   const [filteredTurfs, setFilteredTurfs] = useState([]); 
//   const [sortBy, setSortBy] = useState("relevance"); 
//   const turfsSectionRef = useRef(null); 

//   // Fetch approved turfs from the backend
//   useEffect(() => {
//     const fetchTurfs = async () => {
//       try {
//         const res = await axios.get("http://localhost:808/api/turfs/approved");
//         console.log("API Response:", res.data); // Check the structure here

//         const turfData = res.data.map((t) => ({
//           id: t.turfId, 
//           name: t.turfName,
//           state: t.state,
//           city: t.city,
//           area: t.area,
//           location: `${t.area}, ${t.city}`,
//           price: t.pricePerHour,
//           rating: t.rating || 4.5,
//           facilities: t.facilities || [], 
//           img: t.imageUrls[0], // This will be the Base64 string
//           discount: t.discount || 0,
//         }));

//         setTurfs(turfData);
//         setFilteredTurfs(turfData);
//       } catch (error) {
//         console.error("Error loading turfs:", error);
//       }
//     };

//     fetchTurfs();
//   }, []);

//   // Scroll to the turfs section
//   const scrollToTurfs = () => {
//     turfsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Comparator function for sorting turfs
//   const getComparator = (sortBy) => {
//     return (a, b) => {
//       const pa = Number(a.price);
//       const pb = Number(b.price);
//       const ra = Number(a.rating);
//       const rb = Number(b.rating);

//       switch (sortBy) {
//         case "priceAsc": return pa - pb;
//         case "priceDesc": return pb - pa;
//         case "ratingDesc": return rb - ra;
//         default: return rb - ra;
//       }
//     };
//   };

//   const sortedTurfs = [...filteredTurfs].sort(getComparator(sortBy));

//   return (
//     <div className="bg-light">
//       <Navbar />

//       <Hero
//         turfs={turfs}
//         setFilteredTurfs={setFilteredTurfs}
//         onSearchScroll={scrollToTurfs}
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//       />

//       <section className="py-5" ref={turfsSectionRef}>
//         <div className="container">
//           <div className="d-flex align-items-center justify-content-between mb-2">
//             <h2 className="h3 m-0">Available Turfs</h2>

//             <select
//               id="sortBy"
//               className="form-select form-select-sm"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="relevance">Sort: Relevance</option>
//               <option value="priceAsc">Price (Low→High)</option>
//               <option value="priceDesc">Price (High→Low)</option>
//               <option value="ratingDesc">Rating</option>
//             </select>
//           </div>

//           <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//             {sortedTurfs.length === 0 ? (
//               <div className="col">
//                 <div className="alert alert-light border">
//                   No turfs found.
//                 </div>
//               </div>
//             ) : (
//               sortedTurfs.map((turf) => (
//                 <div className="col" key={turf.id}>
//                   <div
//                     className="card shadow-sm turf-card"
//                     style={{ borderRadius: "10px", cursor: "pointer" }}
//                     onClick={() => (window.location.href = `/turf-details?tid=${turf.id}`)}
//                   >
//                     {/* Displaying the Base64 image */}
//                     <img
//                       src={turf.img} // Base64 string directly used in src
//                       alt={turf.name}
//                       className="img-fluid"
//                       style={{ height: "240px", width: "100%", objectFit: "cover" }}
//                     />

//                     <div className="card-body">
//                       <h5 className="card-title d-flex justify-content-between">
//                         {turf.name}
//                         <span className="badge bg-success">{turf.rating} ★</span>
//                       </h5>

//                       <p>{turf.location}</p>

//                       <span className="badge text-bg-secondary">
//                         ₹{turf.price}/hour
//                       </span>
//                     </div>

//                     <div className="card-footer bg-transparent border-0">
//                       <button
//                         className="btn btn-primary w-100"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           window.location.href = `/turf-details?tid=${turf.id}`;
//                         }}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       <Features />
//       <About />
//       <Contact />
//     </div>
//   );
// };

// export default Home;


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Contact from "../components/Contact";
import "../assets/css/custom.css";

const Home = () => {
  const [turfs, setTurfs] = useState([]);
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const turfsSectionRef = useRef(null);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await axios.get("http://localhost:8088/api/turfs/approved");
        console.log("API Response:", res.data); // Check the structure here

        const turfData = res.data.map((t) => ({
          id: t.turfId,
          name: t.turfName,
          location: t.location, // City and area in one field
          price: t.pricePerHour,
          discountedPrice: t.discountedPrice, // Use the discounted price
          rating: t.rating || 4.5,
          facilities: t.facilities || [],
          img: t.imageUrls[0], // The first Base64 image
          discount: t.discount || 0,
        }));

        setTurfs(turfData);
        setFilteredTurfs(turfData);
      } catch (error) {
        console.error("Error loading turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  const scrollToTurfs = () => {
    turfsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getComparator = (sortBy) => {
    return (a, b) => {
      const pa = Number(a.price);
      const pb = Number(b.price);
      const ra = Number(a.rating);
      const rb = Number(b.rating);

      switch (sortBy) {
        case "priceAsc": return pa - pb;
        case "priceDesc": return pb - pa;
        case "ratingDesc": return rb - ra;
        default: return rb - ra;
      }
    };
  };

  const sortedTurfs = [...filteredTurfs].sort(getComparator(sortBy));

  return (
    <div className="bg-light">
      <Navbar />

      <Hero
        turfs={turfs}
        setFilteredTurfs={setFilteredTurfs}
        onSearchScroll={scrollToTurfs}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <section className="py-5" ref={turfsSectionRef}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h2 className="h3 m-0">Available Turfs</h2>
            <div>
              <select
                id="sortBy"
                className="form-select form-select-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="priceAsc">Price (Low→High)</option>
                <option value="priceDesc">Price (High→Low)</option>
                <option value="ratingDesc">Rating</option>
              </select>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {sortedTurfs.length === 0 ? (
              <div className="col">
                <div className="alert alert-light border">
                  No turfs found.
                </div>
              </div>
            ) : (
              sortedTurfs.map((turf) => (
                <div className="col" key={turf.id}>
                  <div
                    className="card shadow-sm turf-card position-relative"
                    style={{
                      borderRadius: "0.9rem",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      minHeight: "380px",
                    }}
                    onClick={() => (window.location.href = `/turf-details?tid=${turf.id}`)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <div className="turf-img-container" style={{ height: "240px" }}>
                      <img
                        src={turf.img}
                        alt={turf.name}
                        className="img-fluid"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body position-relative">
                      <h5 className="card-title d-flex justify-content-between align-items-center">
                        <span>{turf.name}</span>
                        <span className="badge bg-success">{turf.rating} ★</span>
                      </h5>
                      <p className="card-text mb-1">{turf.location}</p>
                      {turf.discount > 0 ? (
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <span className="badge bg-danger">
                            {turf.discount}% OFF
                          </span>
                          <div>
                            <span className="text-decoration-line-through text-muted me-2">
                              ₹{turf.price}
                            </span>
                            <div className="badge text-bg-secondary">
                              <span className="fw-bold">
                                ₹{Math.round(turf.discountedPrice)}
                              </span>
                              <span>/hour</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="badge text-bg-secondary me-2">
                          ₹{turf.price}/hour
                        </span>
                      )}
                    </div>
                    <div className="card-footer bg-transparent border-0">
                      <button
                        className="btn btn-primary w-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/turf-details?tid=${turf.id}`;
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Features />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
