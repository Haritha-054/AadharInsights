import { useEffect, useState } from "react";
import { fetchDistricts } from "../api/api";

import Navbar from "../components/Navbar";
import KPICards from "../components/KPICards";
import DemandCharts from "../components/DemandCharts";
import FrictionAnalysis from "../components/FrictionAnalysis";
import IndiaDemandMap from "../components/IndiaDemandMap";
import DistrictTable from "../components/DistrictTable";

/* ===============================
   LAST UPDATED HELPER
================================ */
const getLastUpdatedText = () => {
  const now = new Date();
  return now.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Image Carousel Component (as Banner) - Reused from UserDashboard
function ImageCarousel() {
  const images = [
    "/assets/hero_1.png",
    "/assets/hero_2.png",
    "/assets/hero_3.png",
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: 0,
    }}>
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt="Slide"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: current === idx ? 0.4 : 0, // Visible but allows text to pop
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </div>
  )
}

export default function AdminDashboard({ onLogout }) {
  const [data, setData] = useState([]);
  const [active, setActive] = useState("Overview");

  useEffect(() => {
    fetchDistricts().then(setData);
  }, []);

  return (
    <>
      <Navbar active={active} setActive={setActive} onLogout={onLogout} />

      <div>
        {/* ===============================
            OVERVIEW
        ================================ */}
        {active === "Overview" && (
          <div>

            {/* ===== HERO SECTION (COMPACT & SEAMLESS) ===== */}
            <div className="hero-container">
              <ImageCarousel />

              <div className="hero-overlay" />

              <div className="hero-content-wrapper">
                {/* LEFT: TEXT */}
                <div className="hero-text-section">
                  <h1 className="hero-title">
                    Welcome to Aadhaar Analytics
                  </h1>

                  <p className="hero-subtitle">
                    Centralized intelligence for Aadhaar service demand,
                    friction, and operational planning across India.
                  </p>

                  <div className="hero-badge">
                    <span>Last updated: {getLastUpdatedText()}</span>
                  </div>
                </div>

                {/* RIGHT: IMAGE - Enlarged */}
                <div className="hero-image-section">
                  <img
                    src="https://www.successcds.net/wp-content/uploads/2020/04/uidai.png"
                    alt="UIDAI Logo"
                    className="uidai-logo-large"
                  />
                </div>
              </div>
            </div>

            {/* ===== MAIN CONTENT CONTAINER ===== */}
            <div className="dashboard-content-container">

              {/* ===== KPI CARDS ===== */}
              <div style={{ marginBottom: "24px" }}>
                <KPICards />
              </div>

              {/* ===== MODULES ===== */}
              <h3 style={{ marginTop: "0px", marginBottom: "16px", fontSize: "1.5rem", color: "#1e293b", fontWeight: "700" }}>
                Analytics Modules
              </h3>

              <div className="analytics-grid">
                {/* Demand Analysis */}
                <div
                  className="card"
                  onClick={() => setActive("Demand Analysis")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                    alt="Demand Analysis"
                    className="module-card-img"
                  />
                  <h4 style={{ marginTop: "12px", fontSize: "1.1rem" }}>Demand Analysis</h4>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>District-level demand trends & forecasting.</p>
                </div>

                {/* Friction Analysis */}
                <div
                  className="card"
                  onClick={() => setActive("Friction Analysis")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAHYqxk3zcKEq78qQ3xHjHinb4hzrLA6HNw&s"
                    alt="Friction Analysis"
                    className="module-card-img"
                  />
                  <h4 style={{ marginTop: "12px", fontSize: "1.1rem" }}>Friction Analysis</h4>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Lifecycle friction & dependency indicators.</p>
                </div>

                {/* Crowd Prediction Map */}
                <div
                  className="card"
                  onClick={() => setActive("Crowd Prediction Map")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
                    alt="Crowd Prediction Map"
                    className="module-card-img"
                  />
                  <h4 style={{ marginTop: "12px", fontSize: "1.1rem" }}>Crowd Prediction Map</h4>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Geospatial Aadhaar demand visualization.</p>
                </div>

                {/* Demand Table */}
                <div
                  className="card"
                  onClick={() => setActive("Demand Table")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://changeofname.in/wp-content/uploads/2025/11/Aadhar-Card-Name-Change-via-Gazette-Notification-in-Bangalore.webp"
                    alt="Demand Table"
                    className="module-card-img"
                  />
                  <h4 style={{ marginTop: "12px", fontSize: "1.1rem" }}>Demand Table</h4>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Operational recommendations by district.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ===============================
            OTHER TABS (WRAPPED)
        ================================ */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px" }}>
          {active === "Demand Analysis" && <DemandCharts data={data} />}
          {active === "Friction Analysis" && <FrictionAnalysis data={data} />}
          {active === "Crowd Prediction Map" && <IndiaDemandMap data={data} />}
          {active === "Demand Table" && <DistrictTable data={data} />}
        </div>
      </div>
    </>
  );
}
