import React, { useState, useEffect, useRef } from "react";

const Hero = ({ turfs, setFilteredTurfs, onSearchScroll, sortBy, setSortBy }) => {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const didMountRef = useRef(false); // to avoid scrolling on first render

  // unique lists
  const uniqueStates = [...new Set(turfs.map((t) => t.state))].sort();
  const uniqueCities = [
    ...new Set(
      turfs
        .filter((t) => !stateFilter || t.state === stateFilter)
        .map((t) => t.city)
    ),
  ].sort();
  const uniqueAreas = [
    ...new Set(
      turfs
        .filter(
          (t) =>
            (!stateFilter || t.state === stateFilter) &&
            (!cityFilter || t.city === cityFilter)
        )
        .map((t) => t.area)
    ),
  ].sort();

  const applyFilters = (shouldScroll = false) => {
    let filtered = [...turfs];

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q)
      );
    }
    if (stateFilter) {
      filtered = filtered.filter((t) => t.state === stateFilter);
    }
    if (cityFilter) {
      filtered = filtered.filter((t) => t.city === cityFilter);
    }
    if (areaFilter) {
      filtered = filtered.filter((t) => t.area === areaFilter);
    }
    if (facilityFilter) {
      filtered = filtered.filter((t) => t.facilities?.includes(facilityFilter));
    }
    if (priceFilter) {
      if (priceFilter.includes("-")) {
        const [min, max] = priceFilter.split("-").map(Number);
        filtered = filtered.filter((t) => t.price >= min && t.price <= max);
      } else {
        filtered = filtered.filter((t) => t.price >= Number(priceFilter));
      }
    }
    if (ratingFilter) {
      filtered = filtered.filter(
        (t) => t.rating >= parseFloat(ratingFilter)
      );
    }

    setFilteredTurfs(filtered);

    // scroll ONLY when user explicitly searched
    if (shouldScroll && onSearchScroll) onSearchScroll();
  };

  // auto apply on filter changes, but don't scroll on first mount
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      applyFilters(false); // first load: keep hero in view
    } else {
      applyFilters(false); // later filter changes: no scroll
    }
  }, [
    search,
    stateFilter,
    cityFilter,
    areaFilter,
    facilityFilter,
    priceFilter,
    ratingFilter,
  ]);

  // cascading dropdown resets
  useEffect(() => {
    setCityFilter("");
    setAreaFilter("");
  }, [stateFilter]);

  useEffect(() => {
    setAreaFilter("");
  }, [cityFilter]);

  const handleSearchClick = () => {
    applyFilters(true); // now scroll
  };

  const handleReset = () => {
    setSearch("");
    setStateFilter("");
    setCityFilter("");
    setAreaFilter("");
    setFacilityFilter("");
    setPriceFilter("");
    setRatingFilter("");
    setFilteredTurfs(turfs);
    // don't scroll on reset
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <section
      className="hero d-flex align-items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        marginTop: "-30px",
        color: "#fff",
      }}
    >
      <div
        className="container py-5"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="row">
          <div className="col-12 col-lg-8">
            <h1 className="display-5 fw-bold text-white">
              Find your perfect turf.
            </h1>
            <p className="lead text-white">
              Browse by location, facilities, price, and ratings — then book
              your slot instantly.
            </p>
            <div className="card-body">
              <div className="row g-2">
                <div className="col-12 col-md">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search by turf name or area…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={onKeyDown}
                  />
                </div>
                <div className="col-6 col-md">
                  <select
                    className="form-select"
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    onKeyDown={onKeyDown}
                  >
                    <option value="">State</option>
                    {uniqueStates.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6 col-md">
                  <select
                    className="form-select"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={!stateFilter}
                  >
                    <option value="">City</option>
                    {uniqueCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6 col-md">
                  <select
                    className="form-select"
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={!cityFilter}
                  >
                    <option value="">Area</option>
                    {uniqueAreas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="col-6 col-md">
                  <select
                    className="form-select"
                    value={facilityFilter}
                    onChange={(e) => setFacilityFilter(e.target.value)}
                    onKeyDown={onKeyDown}
                  >
                    <option value="">Facilities</option>
                    <option value="Parking">Parking</option>
                    <option value="Washroom">Washroom</option>
                    <option value="Floodlights">Floodlights</option>
                  </select>
                </div> */}
                <div className="col-6 col-md">
                  <select
                    className="form-select"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    onKeyDown={onKeyDown}
                  >
                    <option value="">Price</option>
                    <option value="0-500">{"< ₹500"}</option>
                    <option value="500-1000">₹500–₹1000</option>
                    <option value="1000-1500">₹1000–₹1500</option>
                    <option value="1500-5000">{"₹1500+"}</option>
                  </select>
                </div>
                <div className="col-6 col-md">
                  <select
                    className="form-select"
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    onKeyDown={onKeyDown}
                  >
                    <option value="">Rating</option>
                    <option value="4">4★ & up</option>
                    <option value="4.5">4.5★ & up</option>
                  </select>
                </div>
                <div className="col-12 col-md-auto d-grid">
                  <button className="btn btn-primary" onClick={handleSearchClick}>
                    Search
                  </button>
                </div>
                <div className="col-12 col-md-auto d-grid">
                  <button className="btn btn-primary" onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
