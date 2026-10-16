### 5.1 Deterministic Resource Allocation Formulation (MILP)

Let $\mathcal{D} = \{1, 2, \dots, N\}$ be the set of distressed districts ($N = 8$ primary priority districts in MP).  
For each district $i \in \mathcal{D}$, let $w_i \in (0, 1]$ represent its composite drought vulnerability weight.

#### Decision Variables:
* $x_{i}^{\text{tanker}} \ge 0$: Number of tanker trips allocated to district $i$ over planning horizon $T$.
* $x_{i}^{\text{fodder}} \ge 0$: Metric tonnes of cattle fodder allocated to district $i$.
* $x_{i}^{\text{seed}} \ge 0$: Hectares of contingency seed subsidy allocated to district $i$.
* $x_{i}^{\text{cash}} \ge 0$: Number of direct cash transfer farmer beneficiaries in district $i$.

#### Objective Function:
Maximize total risk-weighted demand satisfaction:
$$\max \sum_{i \in \mathcal{D}} w_i \left( \alpha_1 \frac{x_{i}^{\text{tanker}}}{D_{i}^{\text{tanker}}} + \alpha_2 \frac{x_{i}^{\text{fodder}}}{D_{i}^{\text{fodder}}} + \alpha_3 \frac{x_{i}^{\text{seed}}}{D_{i}^{\text{seed}}} + \alpha_4 \frac{x_{i}^{\text{cash}}}{D_{i}^{\text{cash}}} \right)$$

where $\alpha_1, \alpha_2, \alpha_3, \alpha_4$ are normalized commodity preference weights ($\sum \alpha_k = 1$), and $D_{i}^k$ represents the unconstrained registered demand for commodity $k$ in district $i$.

#### Subject to Constraints:
1. **Total Fiscal Budget Ceiling**:
   $$\sum_{i \in \mathcal{D}} \left( c_{\text{tanker}} x_{i}^{\text{tanker}} + c_{\text{fodder}} x_{i}^{\text{fodder}} + c_{\text{seed}} x_{i}^{\text{seed}} + c_{\text{cash}} x_{i}^{\text{cash}} \right) \le B_{\text{total}} - B_{\text{contingency}}$$
   where $c_k$ represents the statutory unit cost for commodity $k$ ($c_{\text{tanker}} = ₹3,200$/trip, $c_{\text{fodder}} = ₹8,500$/tonne, etc.).

2. **Statutory Equity Service Floor**:
   $$x_{i}^k \ge \theta_{\text{floor}} \cdot D_{i}^k, \quad \forall i \in \mathcal{D}, \quad \forall k \in \{\text{tanker, fodder, seed, cash}\}$$
   where $\theta_{\text{floor}} \in [0.15, 0.25]$ ensures no distressed district receives zero allocation.

3. **Physical Fleet & Warehouse Capacity Upper Bounds**:
   $$\sum_{i \in \mathcal{D}} x_{i}^{\text{tanker}} \le K_{\text{fleet\_max}} \cdot T$$
   $$\sum_{i \in \mathcal{D}} x_{i}^{\text{fodder}} \le S_{\text{warehouse\_max}}$$

4. **Demand Non-Exceedance**:
   $$x_{i}^k \le D_{i}^k, \quad \forall i \in \mathcal{D}, \quad \forall k$$

---

### 5.2 Standardized Precipitation Index (SPI-3M)

The 3-month Standardized Precipitation Index evaluates cumulative rainfall deficit over a 90-day window against a 30-year gamma distribution:

$$f(x; \alpha, \beta) = \frac{1}{\beta^\alpha \Gamma(\alpha)} x^{\alpha - 1} e^{-x / \beta}, \quad \text{for } x > 0$$

The cumulative probability $G(x)$ is transformed to a standard Gaussian random variable $Z$ with mean $0$ and variance $1$:
$$\text{SPI} = Z = -\left( t - \frac{c_0 + c_1 t + c_2 t^2}{1 + d_1 t + d_2 t^2 + d_3 t^3} \right), \quad t = \sqrt{\ln\left(\frac{1}{[H(x)]^2}\right)}$$

* $\text{SPI} \le -2.00$: **Extremely Dry** (Emergency Relief Mandatory — Tikamgarh: $-2.24$)
* $-1.99 \le \text{SPI} \le -1.50$: **Severely Dry** (Chhatarpur: $-2.12$, Barwani: $-2.05$)
* $-1.49 \le \text{SPI} \le -1.00$: **Moderately Dry**

---

### 5.3 Vegetation Condition Index (VCI)

Acquired from ISRO SAC VEDAS Krishi-DSS, comparing current sensor NDVI against historical extremes:

$$\text{VCI} = \frac{\text{NDVI}_{\text{current}} - \text{NDVI}_{\text{min}}}{\text{NDVI}_{\text{max}} - \text{NDVI}_{\text{min}}} \times 100$$

* $\text{VCI} < 20\%$: **Critical Agrarian Desiccation / Vegetative Stunt**
* $20\% \le \text{VCI} < 35\%$: **Severe Crop Moisture Stress**
* $35\% \le \text{VCI} < 50\%$: **Moderate Drought**

---
