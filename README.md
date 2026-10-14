# 🏛️ Maharashtra State Relief Cell — Drought Decision Support Portal

> **Revenue & Forest Department · Disaster Management Division · Government of Maharashtra**  
> An enterprise-grade drought-response decision support and fleet operations platform for state relief administrators, district collectors, and emergency logistics commanders.

---

## 📌 Executive Summary

During severe El Niño climatic events, agrarian regions across Maharashtra’s Marathwada belt face devastating rainfall deficits and critical soil moisture depletion. Traditional bureaucratic relief often suffers from delayed disbursals, blunt equal-quota allocations, and logistical bottlenecks.

The **Maharashtra State Relief Cell Portal** integrates earth observation satellites, hydrological telemetry, and mathematical optimization into a single real-time decision support system. By combining **Constrained Mixed-Integer Linear Programming (MILP)** and **Sentinel-2 multispectral NDVI analysis**, the system enables administrators to predict agrarian distress 30–60 days in advance, avert crop losses, verify distress claims, and dispatch emergency relief convoys across green corridors.

---

## 🎨 Enterprise Design Language

The interface is engineered to government and enterprise software standards, avoiding consumer-AI aesthetics:

* **Theme**: Light theme with `#F6F7F9` background, pure white cards (`#FFFFFF`) with 1px border (`#E3E6EB`), and subtle elevation shadows (`0 1px 2px rgba(16,24,40,0.04)`).
* **Primary Accent**: Deep Navy Blue (`#0F4C81`), used strictly for active navigation, primary action buttons, links, and selected chart data.
* **Semantic Status Indicators**:
  * Critical: Red (`#C62828`)
  * Warning: Amber (`#B26A00`)
  * Healthy: Green (`#2E7D32`)
* **Typography**: Clean `Inter` font family with tabular numerals for financial and statistical precision.
* **Layout Discipline**: 8px spatial grid, 16–24px card padding, 8px maximum border radius, and aligned heights across all metric rows.
* **Iconography**: 1.5px clean line icons from Lucide.

---

## 🚀 Key Operational Modules

### 1. 🛡️ State Drought Overview (`Dashboard`)
* **Live Instrumentation Row**:
  * **Districts at high risk**: 12 of 36 districts with sparkline indicator.
  * **Relief budget utilised**: ₹142 Cr of ₹500 Cr cap with flat progress bar at 28.4% and uncommitted reserve tracking.
  * **Verified beneficiaries**: 48,392 geo-tagged plots with 94.2% verification rate.
  * **Convoys in transit**: 5 active relief fleets on schedule.
* **Regional Drought Severity Map**:
  * Clean vector basemap with sequential single-hue choropleth (light to dark red) representing rainfall deficit.
  * Interactive taluka inspection popover displaying deficit %, soil moisture, open claims, and primary crop.
  * Layer toggling: Rainfall deficit, Soil moisture, and Tanker corridors.
  * Scale bar (50 km) and Survey of India reference grid metadata.
* **📈 D3.js Real-Time Severity & 30-Day Trend Chart**:
  * Multi-series spline curve with smooth monotonic interpolation.
  * Interactive scrubber tooltip tracking district trajectories from historical to projected horizons.
  * Reactive dampening responsive to MILP budget allocations and climate stress scenario toggles.
  * Toggles for Risk Score (0–1.0), Rainfall Deficit %, and Crop Distress Index.
* **Priority Actions Queue**:
  * Clean, compact list with severity dots (critical/warning), titles, plain descriptions, timestamps, and direct action triggers.
* **Districts Requiring Attention Table**:
  * Sortable, zebra-free data table with hover states and 13px font.
  * Covers real Marathwada districts: Beed, Latur, Dharashiv (Osmanabad), Parbhani, Nanded, Jalna, Hingoli, Chhatrapati Sambhajinagar, and Solapur.
  * Export to CSV and print-ready summary dossier.

### 2. 🛰️ Drought Risk & Rainfall Indices
* **Interactive SVG Regional Polygon Layer**:
  * Vector polygons for Beed, Latur, Dharashiv, Nanded, Solapur, and Jalna.
  * Granular crop loss breakdown (Soybean, Bt Cotton, Bajra, Tur, Sugarcane, Pomegranate).
  * Root-zone moisture saturation deficits and recommended preemptive interventions.
* **Vegetation Condition Index (VCI) Multi-Year Heatmap**:
  * 2020–2026 historical monthly anomaly matrix.

### 3. ⚖️ Relief Budget Allocation & Scenario Simulator
* **Mixed-Integer Linear Programming (MILP v4.12)**:
  * Interactive parameters: State budget scaling (₹20 Cr to ₹250 Cr), Algorithmic priority weighting, and Drought stress horizon.
  * Objective switchers: Max Farmers Covered, Min Delivery Latency, Equal Taluka Floor.
  * Mathematical constraints: ₹15 Cr minimum per taluka floor and 5.0% state emergency reserve.
  * Head-to-Head Comparison: Optimized allocation vs. baseline equal split.
  * Digital Treasury Sign-off: Cryptographic authorization dialog for Finance Department disbursement.

### 4. 🔍 Crop Distress Claims Verification
* **Sentinel-2 NDVI Cross-Referencing**:
  * Compares self-reported losses against satellite spectral indices.
  * Fraud detection: Identifies high variance (>25%), duplicate parcels, and missing 7/12 land revenue documentation.
  * Inspection modal with direct authorization for Direct Benefit Transfer (DBT).

### 5. 🚛 Tanker Logistics & Fleet Operations
* **Active Relief Fleet Management**:
  * Real-time tracking of potable water tankers, cattle fodder blocks, and nutrition kits.
  * GPS speed, remaining distance, ETA, and checkpoint waypoints.
* **Driver Communications & Dashcam Telematics**:
  * Encrypted dispatch terminal call simulation.
  * Live vehicle forward-facing highway HUD with velocity and gradient readouts.
* **Emergency Dispatch Generator**:
  * Configures origin supply depots, target talukas, cargo capacities, and FASTag disaster toll exemptions.

### 6. 📊 Reports & Analytical Records
* **Official Executive Briefs**:
  * State Relief Executive Dossier, IMD Ground Station Deficit Matrix, Emergency Tanker Dispatch Ledger, and DBT Clearance Dossiers.
* **Multi-Year Trend Analysis & Data Export Center**:
  * GeoJSON, CSV, and PDF downloads.

---

## 💻 Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19 (Functional Components, Custom Context Hooks) |
| **Design System** | Clean Enterprise Light Theme (Inter font, 8px grid, CSS tokens) |
| **Data Visualization** | D3.js v7 (Predictive spline curves, responsive scrubber, monotonic interpolation) |
| **Cartography & Maps** | Lightweight SVG Vector Engine & GIS GeoJSON Basemaps |
| **Icons** | Lucide React (1.5px clean line icons) |
| **Styling** | Tailwind CSS v4 with custom CSS variable design tokens |
| **Language** | TypeScript (Strict type checking across districts, claims, and telemetry) |
| **Build & Tooling** | Vite 8, ESBuild, PostCSS, Autoprefixer |
| **Data Feeds** | Simulated INSAT-3DR Multispectral Imagery, ISRO CartoSat-3 DEM, Sentinel-2 NDVI |

---

## 👥 Leadership & Project Administration

### **Maharashtra State Relief Cell & Disaster Management Division**

* **State Relief Operations Commander**:  
  **Yatharth Ladkat** (`yatharthladkat@gmail.com`)  
  *State Relief Officer, Grade I · Revenue & Forest Department, Government of Maharashtra*

* **Administrative Jurisdictions Covered**:  
  * Chhatrapati Sambhajinagar Division (Beed, Latur, Dharashiv, Parbhani, Nanded, Jalna, Hingoli, Aurangabad)  
  * Pune Division (Solapur Agrarian Sector)

---

## 🛠️ Local Development & Setup

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Typecheck and linting
npm run lint

# 4. Production build
npm run build
```

---

*Official Portal of the Maharashtra State Relief Cell, Revenue & Forest Department.*
