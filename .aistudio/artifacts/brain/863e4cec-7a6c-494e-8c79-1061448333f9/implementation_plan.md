# Software Requirements Specification (SRS) & Implementation Architecture Plan
## El Niño — Madhya Pradesh Drought Intelligence & Decision Support Platform

---

## 1. Document Overview & Executive Summary

### 1.1 Purpose
This document provides the formal **Software Requirements Specification (SRS)** and **Technical Implementation Architecture** for the **El Niño Drought Intelligence & Decision Support Platform** configured for the state of **Madhya Pradesh, India**. It defines functional requirements, scientific telemetry models, mathematical optimization formulations, system constraints, user personas, and operational delivery milestones.

### 1.2 Target Audience & Stakeholders
* **State Relief Commissioner & SDMA Madhya Pradesh**: Executive oversight, aggregate crisis declaration, and disaster treasury clearance.
* **District Collectors & District Disaster Management Authorities (DDMAs)**: Sub-divisional allocation (Tikamgarh, Chhatarpur, Barwani, Sheopur, etc.), local water rationing, and crop compensation verification.
* **Water Resources Department (MP WRD) & Central Water Commission (CWC)**: Reservoir storage monitoring, canal release coordination, and drinking water reserve quotas.
* **Department of Agriculture & Farmers Welfare (MP)**: PMFBY crop loss validation, contingency seed distribution, and soil moisture preservation.
* **Emergency Logistics & Civil Supplies Corps**: Fleet dispatching, tanker corridor monitoring, and cattle fodder depot management.

---

## 2. Overall Description & Problem Domain

### 2.1 Problem Statement
Drought response in semi-arid and rainfed belts (such as Bundelkhand, Nimar Valley, and Chambal) has historically suffered from:
1. **Delayed Detection**: Relying on post-facto ground distress reports rather than root-zone satellite moisture anomalies.
2. **Siloed Telemetry**: Inability to synthesize ISRO SAC VEDAS remote sensing, IMD automated rain gauges, and CWC dam levels into a unified index.
3. **Suboptimal Fund Allocation**: Disbursing relief funds on arbitrary historical averages rather than constrained mathematical optimization that guarantees physical feasibility (tanker throughput, fodder inventories).
4. **Logistics Blindness**: Inefficient dispatch of emergency relief water tankers without real-time GPS corridors, resulting in unserved rural clusters.
5. **Crop Insurance Verification Delays**: Manual loss assessment leading to fraudulent claims and months-long delays for distressed farmers.

### 2.2 System Objective
The **El Niño Platform** provides a proactive, closed-loop decision support engine that fuses multi-satellite telemetry, runs deterministic Mixed-Integer Linear Programming (MILP) solvers for resource distribution, verifies crop insurance claims via Sentinel-2 spectral indices, and tracks emergency logistics convoys in real time across Madhya Pradesh.

---

## 3. System Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT PRESENTATION LAYER                       │
│  React 18 SPA · TypeScript · Vite · Tailwind CSS · Lucide Icons        │
│                                                                        │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │                     State & AppContext                        │    │
│   │   - Authentication (Officer Session)                          │    │
│   │   - Telemetry Sync (ISRO VEDAS / IMD AWS)                     │    │
│   │   - Active Operating Mode & Geography Selectors               │    │
│   │   - Reactive Resource Optimizer State                         │    │
│   └───────────────────────────────┬───────────────────────────────┘    │
│                                   │                                    │
│   ┌───────────────────────────────▼───────────────────────────────┐    │
│   │                    Operational Modules                        │    │
│   │   1. Overview Dashboard (KPIs, Telemetry, Dam Monitors)       │    │
│   │   2. District Explorer (Leaflet GIS, VEDAS Composite)         │    │
│   │   3. Risk & Forecast (D3 Multi-Horizon Trajectories)          │    │
│   │   4. Relief Budget Optimizer (MILP Primal-Dual Engine)        │    │
│   │   5. AI Scenario Lab (Stress Multipliers & Trade-offs)        │    │
│   │   6. Crop Distress Claims (Sentinel-2 Spectral Verification)  │    │
│   │   7. Tanker Fleet Logistics (GPS Dispatch & Live Dashcam HUD) │    │
│   │   8. Evidence & Audit Dossier (GeoJSON & CSV Export Engines)  │    │
│   └───────────────────────────────┬───────────────────────────────┘    │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                       SERVICES & DATA ENGINES                          │
│                                                                        │
│  ┌───────────────────────┐ ┌──────────────────────┐ ┌───────────────┐  │
│  │ optimizerEngine.ts    │ │ vedasService.ts      │ │ geoData.ts    │  │
│  │ - MILP Solver         │ │ - ISRO SAC Telemetry │ │ - 55 MP Dists │  │
│  │ - Shadow Prices       │ │ - Automated Fallback │ │ - Tehsils     │  │
│  │ - Binding Constraints │ │ - IMD Weather Ingest │ │ - AWS Gauges  │  │
│  └───────────────────────┘ └──────────────────────┘ └───────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Functional Requirements (FR)

### FR-01: Authentication & Role-Based Access Control
* **FR-01.1**: Secure login interface with officer role detection (e.g., State Relief Officer, Grade I).
* **FR-01.2**: Quick demo bypass credential provider for immediate crisis simulation evaluation.
* **FR-01.3**: Automatic session expiry and audit log attribution for all state allocations.

### FR-02: Geospatial Drought Observatory & Cartography
* **FR-02.1**: Centered Leaflet GIS cartography over Madhya Pradesh (`23.40° N, 77.80° E`) with 55 district polygon boundaries.
* **FR-02.2**: Multi-metric index rendering:
  - `SPI-3M` (Standardized Precipitation Index, 3-Month)
  - `VCI` (Vegetation Condition Index, 0–100%)
  - `Soil Moisture Deficit (%)` (Root-zone soil deviation)
  - `NDVI Anomaly` (Normalized Difference Vegetation Index departure)
  - `Precipitation Deficit vs IMD Normal (%)`
  - `Combined Drought Risk Index`
* **FR-02.3**: Dual display states:
  - *Standard Card View*: Compact dropdowns and minimal headers.
  - *Fullscreen Mode*: Full toolbar exposing basemap tiles (Carto Light, High-Res Satellite, OSM), layer toggles (Tehsils, AWS Stations, Tanker Convoys), and active metric descriptions.

### FR-03: Real-Time Reservoir Storage & Basin Monitoring
* **FR-03.1**: Continuous tracking of 5 strategic Madhya Pradesh reservoirs:
  - Gandhi Sagar Dam (Chambal River)
  - Rajghat Dam (Betwa River)
  - Indira Sagar Dam (Narmada River)
  - Bansagar Dam (Son River)
  - Bargi Dam (Narmada River)
* **FR-03.2**: Automatic warning when live capacity falls below critical dead-storage thresholds (<20%).

### FR-04: Deterministic Resource Allocation Engine (MILP)
* **FR-04.1**: Primal-dual linear programming solver distributing relief budgets across competing commodities:
  - Emergency Potable Water Tankers (₹/trip)
  - Cattle Fodder Distribution (₹/tonne)
  - Contingency Seed Kits (₹/hectare)
  - Direct Benefit Cash Transfers (DBT)
* **FR-04.2**: Hard statutory equity constraints guaranteeing a minimum service floor (15–20%) so no district is neglected.
* **FR-04.3**: Binding constraint detection outputting shadow prices and bottleneck resources.

### FR-05: Multi-Horizon Predictive Trajectory Modeling
* **FR-05.1**: D3-driven 30-day forward trajectory projections incorporating IMD-MME ensemble projections.
* **FR-05.2**: Confidence interval envelopes (P10 pessimistic, P50 median, P90 optimistic).
* **FR-05.3**: Multi-district toggle tracking for key vulnerable zones: Tikamgarh, Chhatarpur, Barwani, Sheopur, and Khargone.

### FR-06: Crop Loss Verification & Spectral Audit
* **FR-06.1**: Plot-level cross-referencing between farmer declared yield loss (%) and Sentinel-2 / Oceansat-3 Spectral Loss Index.
* **FR-06.2**: Fraud and duplicate submission filtering.
* **FR-06.3**: Single-click batch authorization for rapid DBT clearance.

### FR-07: Tanker Fleet Logistics & GPS Corridor Management
* **FR-07.1**: Real-time fleet tracking across primary MP transit routes (NH-44 Bundelkhand Corridor, NH-52 Nimar Corridor).
* **FR-07.2**: FASTag disaster green corridor verification with toll-exempt pass simulator.
* **FR-07.3**: Interactive forward dashcam telemetry HUD displaying real-time speed, GPS coordinates, and waypoint progress.

### FR-08: Evidence & Audit Export
* **FR-08.1**: One-click download of district allocation ledgers in standard CSV format.
* **FR-08.2**: One-click export of tehsil boundaries and drought severity indices in GeoJSON format.

---

## 5. Non-Functional Requirements (NFR)

* **NFR-01: Response Latency**: Client-side mathematical optimization must solve and re-render within <30ms upon slider movement.
* **NFR-02: Availability & Offline Resilience**: In the event of network disruption or ISRO server CORS latency, the system gracefully falls back to cached ground-calibrated telemetry records with zero disruption.
* **NFR-03: Audit Reproducibility**: Optimization parameters, weights, and results must be deterministic — identical inputs yield identical financial allocations.
* **NFR-04: Responsive Accessibility**: Fully responsive across desktop (24-inch command wall monitors) and tablet/mobile viewports for field officers.

---

## 6. Implementation Plan & Milestones

| Phase | Milestone | Scope & Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Core GIS & Cartography** | Centered Leaflet map on MP (`23.40, 77.80`), 55 district polygons, VEDAS layers, clean card vs fullscreen views. | **Complete** |
| **Phase 2** | **Telemetry & Ingestion** | Ingested ISRO SAC VEDAS state code 23, IMD automated weather stations, and strategic reservoirs. | **Complete** |
| **Phase 3** | **MILP Solver & Budget Engine** | Deterministic allocation solver with statutory floor, sensitivity curves, and CSV financial ledger exports. | **Complete** |
| **Phase 4** | **Logistics & Fleet Dispatch** | Real-time tanker fleet simulation, Bhopal/Sagar/Indore supply depots, NH-44 corridor tracking, and dashcam HUD. | **Complete** |
| **Phase 5** | **Crop Insurance Verification** | Sentinel-2 spectral verification engine, duplicate claim detector, and batch DBT authorization workflows. | **Complete** |
| **Phase 6** | **State Reframing & Polishing** | Complete replacement of legacy state data with Madhya Pradesh tehsils, basins, and historical benchmarks. | **Complete** |

---

## 7. Verification & Acceptance Criteria
1. **Compilation & Syntax**: App compiles cleanly (`npm run build` succeeds, zero TypeScript warnings under `tsc --noEmit`).
2. **Geographical Accuracy**: Centroid, coordinates, and boundaries accurately reflect Madhya Pradesh geography.
3. **Mathematical Precision**: Total allocated budget matches statutory budget ceiling without numerical drift.
4. **UI Performance**: Seamless transitions between modules, responsive map resizing on fullscreen toggle (`invalidateSize`), and zero layout shifts.
