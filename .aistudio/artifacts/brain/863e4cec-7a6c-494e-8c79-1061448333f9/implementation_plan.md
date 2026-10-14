# El Niño Preemption Engine — Command Core Implementation Plan

A mission-critical drought-response decision support and fleet operations platform for state relief administrators, district collectors, and logistics commanders.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following foundational preferences in Phase 1:
> - **Initial Entry**: Launch directly into the **Government Officer Login Screen** with quick-fill credentials and secure government bypass for immediate evaluation.
> - **Simulation Engine**: Fully **interactive live controls** with instant reactive MILP budget recalculations, dynamic dispatch state mutations, and real-time GIS telemetry toggles.
> - **Operational Scope**: **Full operational suite** covering all 6 primary modules seamlessly:
>   1. Government Authentication & Role Session
>   2. Executive Command Dashboard (with live satellite indicators & directive queue)
>   3. Drought Risk Monitor & Soil Moisture Index (GIS Cartography & historical NDVI curves)
>   4. Relief Budget Optimizer & Scenario Simulator (interactive MILP sliders, district breakdown, impact tiers)
>   5. AI Claim Evidence Review (anomaly scoring, batch approvals, duplicate detection)
>   6. Resource Routing & Fleet Logistics (live convoy tracking, depot balances, immediate dispatch generator)
>   7. Reports & Analytics (exportable briefs, multi-district trend comparisons)

---

## 1. Overview & Core Concept

- **What It Does**: The El Niño Preemption Engine transforms satellite earth observation data (INSAT-3DR, Sentinel-2 NDVI), hydrological soil moisture models, and crop stress indicators into actionable disaster relief decisions:
  - Algorithmically calculates optimal relief grant distribution across high-risk districts (Beed, Latur, Osmanabad, Nanded, Solapur) via Mixed-Integer Linear Programming (MILP) to avert up to 2.4x more agricultural losses than blanket allocations.
  - Verifies farmer distress claims against satellite crop loss indexes with automated fraud/duplicate detection.
  - Dispatches emergency water tanker convoys, cattle fodder blocks, and nutrition kits with real-time waypoint tracking, slope gradient optimization, and disaster FASTag toll exemptions.
- **Target Audience / Persona**: State Disaster Management Authority (SDMA) Commissioners, District Officers, and Agrarian Relief Logistics Coordinators.
- **Key Value**: Replaces slow bureaucratic delays and blunt per-capita grants with predictive preemption, minimizing agricultural devastation before peak dry spells set in.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Color Palette & Atmospheric Obsidian**:
  - Background Canvas: Deep tactical slate-navy `#0b1326` (surface) and `#060e20` (surface-container-lowest).
  - Surface Containers: Glassmorphic `#131b2e` / `#171f33` with subtle borders (`#3c4a42` / `rgba(255,255,255,0.08)`).
  - Primary Accent: Luminous Preemption Green `#4edea3` / `#10b981` (growth, optimal status, positive action).
  - Secondary Accent: Hydrological Sky Blue `#93ccff` / `#3198dc` (water indices, satellite sync, logistics corridors).
  - Critical & Drought Warning: Coral Red `#ffb4ab` / `#93000a` (severe deficit, critical alerts) and Amber Gold `#ffb95f` (moderate deficit, fuel/cargo alerts).
- **Typography**:
  - Display & Headings: `Space Grotesk` / `Plus Jakarta Sans` for high-authority military/scientific clarity.
  - Body & UI Controls: `Manrope` for crisp legibility across dense data tables.
  - Metrics & Telemetry: `Space Grotesk` with `tabular-nums` and monospace accents for numeric precision.
- **Layout Rhythm**:
  - Fixed left sidebar navigation (256px) with quick satellite connection heartbeat (`INSAT-3DR GIS, Latency 42ms`).
  - Fixed top bar with global search across talukas and water indices, live satellite sync indicator, active severe weather alert ticker, and user profile switcher.
  - Viewport-balanced multi-column desktop grids with full support for mobile drawer navigation.

---

## 3. Key Product Decisions & Trade-Offs

1. **Authentication Experience**:
   - *Decision*: Provide the branded Government Officer Login screen matching the visual reference with pre-filled test credentials (`officer.maharashtra.gov.in` / `Demo Secure PIN`), plus a 1-click "Sign in with Government ID" button that instantly loads the command dashboard. Once logged in, an Officer profile badge in the header permits quick logout or profile inspection.
   - *Why*: Satisfies the user's explicit preference while preserving frictionless evaluation.
2. **Deterministic MILP Optimizer Simulation**:
   - *Decision*: Implement a fully reactive client-side Linear Optimization model that responds in real-time (<15ms) to changes in:
     - Available Budget Slider (₹20 Cr to ₹250 Cr)
     - Drought Stress Horizon (Mild, Severe, Extreme)
     - Forecast vs. Historical Priority Weighting (0% to 100%)
     - Optimization Objective (Max Farmers Covered, Min Latency, Equal Floor)
   - *Why*: Instant visual feedback without network latency, demonstrating real algorithmic behavior with proper constraint satisfaction (such as ₹15 Cr minimum floor).
3. **Interactive Fleet GIS & Instant Convoy Dispatch**:
   - *Decision*: Interactive SVG cartography with live convoy pins, animated route vectors, waypoint progress trackers, and an actionable "Immediate Dispatch Generator" that adds new live convoys to the active feed and updates depot capacities dynamically.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Entrypoint (App.tsx)                        │
│                                                                        │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │          Session & Authentication State (AuthContext)         │    │
│   │       [Login View]  ──(login)──>  [Command Core Layout]       │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                        │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │                    Navigation & Global Topbar                 │    │
│   │    - Search Talukas & Metrics     - Satellite Sync Badge       │    │
│   │    - El Niño Advisory Ribbon      - Profile & Role Switcher   │    │
│   └────────────────────────────────┬──────────────────────────────┘    │
│                                    │                                   │
│   ┌────────────────────────────────▼──────────────────────────────┐    │
│   │                    Active Operational Module                  │    │
│   ├─────────────────┬──────────────────┬──────────────────────────┤    │
│   │ 1. Dashboard    │ 2. Risk Monitor  │ 3. Budget Optimizer      │    │
│   │  - 4 KPI Cards  │  - Cartography   │  - MILP Sliders & Solver │    │
│   │  - INSAT GIS Map│  - NDVI Anomaly  │  - District Breakdowns   │    │
│   │  - Directives   │  - Taluka Matrix │  - Mission Impact Tiers  │    │
│   ├─────────────────┼──────────────────┼──────────────────────────┤    │
│   │ 4. Claim Review │ 5. Fleet Routing │ 6. Reports & Analytics   │    │
│   │  - NDVI Audit   │  - Live GIS Map  │  - Trend Visualizations  │    │
│   │  - Duplicate Flag - Active Convoys │  - CSV / Brief Export    │    │
│   │  - Batch Auth   │  - Dispatch Form │  - Executive PDF Summary │    │
│   └─────────────────┴──────────────────┴──────────────────────────┘    │
│                                    │                                   │
│   ┌────────────────────────────────▼──────────────────────────────┐    │
│   │            Shared Simulation Engine & State Store             │    │
│   │  - District database: Beed, Latur, Osmanabad, Nanded, Solapur │    │
│   │  - Convoy fleet state (76 active, waypoints, telemetry speed) │    │
│   │  - Claims registry (48,392 claims, satellite anomaly scores)  │    │
│   │  - Depot stocks: Aurangabad, Pune, Solapur South              │    │
│   └───────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Interactive Flows to Implement:
1. **Authentication Flow**:
   - Initial state: Branded login page with El Niño Preemption Engine hero image, official state seal, email/password fields, and quick-login shortcut.
   - On login: Transition with smooth fade into the Preemption Command Core.
2. **Command Dashboard**:
   - Live interactive GIS map with clickable district hotspots (Beed, Latur, Osmanabad, Solapur) showing popover telemetry.
   - Working "Dispatch Rapid Water Units", "Audit Telemetry Log", and "Authorize Batch" triggers.
   - Priority Directive actions (Dispatch Fleet, Review Tranche, Inspect Route).
3. **Relief Budget Optimizer & MILP Simulator**:
   - Budget slider (₹20 Cr – ₹250 Cr) updating total allocation and proportional district shares dynamically.
   - Scenario selector (Mild, Severe, Extreme) altering risk weights.
   - Priority weighting slider (Historical Vulnerability to Predicted Risk).
   - "Commit to Finance Ministry" modal confirmation with audit trail.
4. **Resource Routing & Fleet Logistics**:
   - Filterable convoy list (All, En Route, Depot Loading, Delayed) by district and cargo.
   - Live interactive map with route layers, animated waypoint vectors, and driver call/dashcam modal.
   - Quick Dispatch form with origin depot, destination taluka, cargo type, and routing algorithm.
   - "Trigger Immediate Water Convoy" button that dispatches a new tanker with green corridor clearance, decreases depot inventory, and shows an operational success banner.
5. **Claim Evidence Review**:
   - Filterable table with search, district filter, and status filter (Genuine, Needs Review, Duplicate).
   - Modal inspection of Sentinel-2 NDVI spectral plot vs. claimed loss.
   - Batch approval button with counter increment.
6. **Reports & Analytics**:
   - Interactive charts of rainfall deficit trends, district vulnerability scores, and budget efficiency gains.
   - Working "Export Brief" action that generates a printable/downloadable relief memo.
