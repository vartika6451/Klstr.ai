export interface DatasetColumn {
  name: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'TIMESTAMP' | 'JSON';
  nullable: boolean;
  description: string;
}

export interface Dataset {
  id: string;
  title: string;
  subtitle: string;
  category: 'Financial Markets' | 'Supply Chain' | 'Healthcare' | 'Energy & Grid' | 'E-Commerce & Retail' | 'Industrial IoT';
  frequency: 'Real-Time Streaming' | 'Hourly' | 'Daily' | 'Weekly' | 'Monthly' | 'On Demand';
  format: 'JSON' | 'CSV' | 'Parquet' | 'REST / WebSocket API';
  provider: string;
  license: string;
  recordCount: string;
  sizeBytes: string;
  qualityScore: number; // e.g. 99.8
  lastUpdated: string;
  pricingModel: string;
  description: string;
  tags: string[];
  columns: DatasetColumn[];
  sampleRows: Record<string, any>[];
  apiEndpoint: string;
}

export const INITIAL_DATASETS: Dataset[] = [
  {
    id: 'fin-market-depth-v2',
    title: 'Global Equities Order Depth & Microstructure',
    subtitle: 'Consolidated Level-2 tick telemetry with bid-ask spread velocities',
    category: 'Financial Markets',
    frequency: 'Real-Time Streaming',
    format: 'REST / WebSocket API',
    provider: 'Klstr Quant Signal Lab',
    license: 'Enterprise Commercial',
    recordCount: '4.8M / day',
    sizeBytes: '1.4 GB / day',
    qualityScore: 99.9,
    lastUpdated: 'Live streaming (12ms ago)',
    pricingModel: '$280 / mo / seat',
    description: 'High-frequency consolidated order book telemetry spanning top global exchanges (NYSE, NASDAQ, LSE, SGX). Contains normalized microsecond timestamps, top 5 bid/ask depth snapshots, weighted midpoint volatility, and effective spread calculations.',
    tags: ['Equities', 'Microstructure', 'Order Book', 'High Frequency', 'Tick Telemetry'],
    apiEndpoint: 'https://api.klstr.ai/v1/datahub/fin/depth-snapshots',
    columns: [
      { name: 'timestamp', type: 'TIMESTAMP', nullable: false, description: 'Microsecond ISO-8601 exchange timestamp' },
      { name: 'ticker', type: 'STRING', nullable: false, description: 'Ticker symbol (e.g. NVDA, AAPL, MSFT)' },
      { name: 'exchange', type: 'STRING', nullable: false, description: 'Exchange identifier code (XNYS, XNAS)' },
      { name: 'bid_px_1', type: 'NUMBER', nullable: false, description: 'Level 1 best bid price' },
      { name: 'bid_sz_1', type: 'NUMBER', nullable: false, description: 'Level 1 best bid volume size' },
      { name: 'ask_px_1', type: 'NUMBER', nullable: false, description: 'Level 1 best ask price' },
      { name: 'ask_sz_1', type: 'NUMBER', nullable: false, description: 'Level 1 best ask volume size' },
      { name: 'spread_bps', type: 'NUMBER', nullable: false, description: 'Instantaneous bid-ask spread in basis points' },
      { name: 'order_imbalance_ratio', type: 'NUMBER', nullable: true, description: 'Normalized buy/sell order volume asymmetry [-1, 1]' },
    ],
    sampleRows: [
      { timestamp: '2026-09-08T15:00:00.124Z', ticker: 'NVDA', exchange: 'XNAS', bid_px_1: 132.45, bid_sz_1: 2400, ask_px_1: 132.47, ask_sz_1: 3100, spread_bps: 1.51, order_imbalance_ratio: -0.127 },
      { timestamp: '2026-09-08T15:00:00.129Z', ticker: 'AAPL', exchange: 'XNAS', bid_px_1: 228.10, bid_sz_1: 1800, ask_px_1: 228.12, ask_sz_1: 1200, spread_bps: 0.88, order_imbalance_ratio: 0.200 },
      { timestamp: '2026-09-08T15:00:00.134Z', ticker: 'MSFT', exchange: 'XNAS', bid_px_1: 442.80, bid_sz_1: 950, ask_px_1: 442.85, ask_sz_1: 1100, spread_bps: 1.13, order_imbalance_ratio: -0.073 },
      { timestamp: '2026-09-08T15:00:00.141Z', ticker: 'AMZN', exchange: 'XNAS', bid_px_1: 186.20, bid_sz_1: 4200, ask_px_1: 186.22, ask_sz_1: 3800, spread_bps: 1.07, order_imbalance_ratio: 0.050 },
      { timestamp: '2026-09-08T15:00:00.150Z', ticker: 'GOOGL', exchange: 'XNAS', bid_px_1: 178.50, bid_sz_1: 1500, ask_px_1: 178.53, ask_sz_1: 2200, spread_bps: 1.68, order_imbalance_ratio: -0.189 }
    ]
  },
  {
    id: 'log-freight-port-congestion',
    title: 'Global Maritime Freight & Port Congestion Telematics',
    subtitle: 'Container transit durations, dwell days, spot FEU rates & anchorage delays',
    category: 'Supply Chain',
    frequency: 'Daily',
    format: 'CSV',
    provider: 'Pacific Maritime Ocean Index',
    license: 'Commercial Free Cleanroom',
    recordCount: '840,000 rows',
    sizeBytes: '142 MB',
    qualityScore: 99.7,
    lastUpdated: 'Today at 06:00 UTC',
    pricingModel: 'Included in Base Tier',
    description: 'Comprehensive maritime telemetry covering 120 global trade lanes and 45 primary container ports (Shanghai, Los Angeles, Rotterdam, Singapore, Hamburg). Tracks daily median vessel dwell times, 40-foot container (FEU) spot rates, carbon emissions per TEU-km, and berth wait queues.',
    tags: ['Maritime', 'Freight Rates', 'Port Congestion', 'Trade Lanes', 'Supply Chain Risk'],
    apiEndpoint: 'https://api.klstr.ai/v1/datahub/logistics/freight-indices',
    columns: [
      { name: 'report_date', type: 'TIMESTAMP', nullable: false, description: 'Standard calculation date' },
      { name: 'origin_port', type: 'STRING', nullable: false, description: 'UN/LOCODE port of origin (e.g. CNSHA)' },
      { name: 'destination_port', type: 'STRING', nullable: false, description: 'UN/LOCODE destination port (e.g. USLAX)' },
      { name: 'feu_spot_rate_usd', type: 'NUMBER', nullable: false, description: 'Median 40ft equivalent unit ocean spot freight price' },
      { name: 'transit_days_median', type: 'NUMBER', nullable: false, description: 'Realized voyage duration in days' },
      { name: 'port_dwell_days', type: 'NUMBER', nullable: false, description: 'Container dwell time from discharge to gate-out' },
      { name: 'anchorage_delay_hours', type: 'NUMBER', nullable: false, description: 'Average hours vessels wait at anchor outside port' },
      { name: 'risk_index', type: 'STRING', nullable: false, description: 'Congestion severity rating (LOW, ELEVATED, CRITICAL)' },
    ],
    sampleRows: [
      { report_date: '2026-09-08', origin_port: 'CNSHA (Shanghai)', destination_port: 'USLAX (Los Angeles)', feu_spot_rate_usd: 4850, transit_days_median: 14.8, port_dwell_days: 3.4, anchorage_delay_hours: 18.2, risk_index: 'ELEVATED' },
      { report_date: '2026-09-08', origin_port: 'CNSHA (Shanghai)', destination_port: 'NLRTM (Rotterdam)', feu_spot_rate_usd: 5420, transit_days_median: 28.2, port_dwell_days: 4.1, anchorage_delay_hours: 24.5, risk_index: 'CRITICAL' },
      { report_date: '2026-09-08', origin_port: 'SGSIN (Singapore)', destination_port: 'USLAX (Los Angeles)', feu_spot_rate_usd: 4600, transit_days_median: 19.5, port_dwell_days: 2.8, anchorage_delay_hours: 12.0, risk_index: 'LOW' },
      { report_date: '2026-09-08', origin_port: 'DEHAM (Hamburg)', destination_port: 'USNYC (New York)', feu_spot_rate_usd: 2950, transit_days_median: 10.4, port_dwell_days: 2.1, anchorage_delay_hours: 6.5, risk_index: 'LOW' },
      { report_date: '2026-09-08', origin_port: 'INNSA (Nhava Sheva)', destination_port: 'NLRTM (Rotterdam)', feu_spot_rate_usd: 4100, transit_days_median: 22.0, port_dwell_days: 3.9, anchorage_delay_hours: 19.0, risk_index: 'ELEVATED' }
    ]
  },
  {
    id: 'health-clinical-trials-registry',
    title: 'FDA & EMA Clinical Trials Molecular Target Pipeline',
    subtitle: 'Standardized oncology & immunology trial outcomes, cohorts, and phase milestones',
    category: 'Healthcare',
    frequency: 'Weekly',
    format: 'Parquet',
    provider: 'BioPharm Intelligence Syndicate',
    license: 'Academic & Commercial Bio-License',
    recordCount: '320,000 trials',
    sizeBytes: '88 MB',
    qualityScore: 99.8,
    lastUpdated: 'Yesterday at 18:30 UTC',
    pricingModel: '$450 / mo',
    description: 'Curated bio-pharmaceutical research datasets standardizing FDA, EMA, and PMDA trial filings. Structured target receptor mechanisms, patient cohort inclusion criteria, primary endpoint milestones, adverse event telemetry, and accelerated approval pathways.',
    tags: ['Clinical Trials', 'Biotech', 'Oncology', 'FDA Milestones', 'Drug Development'],
    apiEndpoint: 'https://api.klstr.ai/v1/datahub/bio/clinical-registry',
    columns: [
      { name: 'nct_id', type: 'STRING', nullable: false, description: 'ClinicalTrials.gov unique identifier' },
      { name: 'drug_candidate', type: 'STRING', nullable: false, description: 'Active pharmaceutical ingredient or code name' },
      { name: 'molecular_target', type: 'STRING', nullable: false, description: 'Biochemical target (e.g. KRAS-G12D, PD-L1, HER2)' },
      { name: 'primary_indication', type: 'STRING', nullable: false, description: 'Therapeutic oncology / disease condition' },
      { name: 'trial_phase', type: 'STRING', nullable: false, description: 'Trial progress stage (Phase 1, Phase 2, Phase 3)' },
      { name: 'enrollment_target', type: 'NUMBER', nullable: false, description: 'Total scheduled patient cohort size' },
      { name: 'primary_completion_date', type: 'TIMESTAMP', nullable: false, description: 'Expected primary endpoint readout date' },
      { name: 'status', type: 'STRING', nullable: false, description: 'Trial condition (RECRUITING, ACTIVE, COMPLETED)' },
    ],
    sampleRows: [
      { nct_id: 'NCT05891240', drug_candidate: 'KL-4091 (OncoVax)', molecular_target: 'KRAS-G12D', primary_indication: 'Non-Small Cell Lung Carcinoma', trial_phase: 'Phase 2', enrollment_target: 240, primary_completion_date: '2026-11-30', status: 'RECRUITING' },
      { nct_id: 'NCT05210984', drug_candidate: 'BioShield-mAb', molecular_target: 'PD-L1 / CTLA-4 Bi-specific', primary_indication: 'Metastatic Colorectal Cancer', trial_phase: 'Phase 3', enrollment_target: 650, primary_completion_date: '2027-02-15', status: 'ACTIVE' },
      { nct_id: 'NCT06129841', drug_candidate: 'NeuroSyn-88', molecular_target: 'Tau Oligomer Cleaver', primary_indication: 'Early Alzheimer Disease', trial_phase: 'Phase 1b', enrollment_target: 80, primary_completion_date: '2026-10-01', status: 'ACTIVE' },
      { nct_id: 'NCT04987122', drug_candidate: 'CardioGene-V', molecular_target: 'TNNT2 Gene Therapy', primary_indication: 'Hypertrophic Cardiomyopathy', trial_phase: 'Phase 2a', enrollment_target: 120, primary_completion_date: '2027-06-30', status: 'RECRUITING' },
      { nct_id: 'NCT05342910', drug_candidate: 'ImmunoVera', molecular_target: 'CD19 / CD22 CAR-T', primary_indication: 'Relapsed B-Cell ALL', trial_phase: 'Phase 2', enrollment_target: 180, primary_completion_date: '2026-12-15', status: 'COMPLETED' }
    ]
  },
  {
    id: 'nrg-smart-grid-carbon-tariffs',
    title: 'Smart Grid Renewable Generation & Carbon Tariffs',
    subtitle: 'Megawatt load balance, locational marginal pricing (LMP), and marginal emission rates',
    category: 'Energy & Grid',
    frequency: 'Hourly',
    format: 'REST / WebSocket API',
    provider: 'Global Energy Transition Alliance',
    license: 'Open Enterprise License',
    recordCount: '1.2M rows / mo',
    sizeBytes: '210 MB',
    qualityScore: 99.9,
    lastUpdated: '18 minutes ago',
    pricingModel: 'Free Tier Available',
    description: 'Real-time telemetry from independent system operators (CAISO, ERCOT, PJM, ENTSO-E). Granular hourly solar, wind, nuclear, hydro, and gas generation curves, real-time nodal pricing, and marginal carbon emissions (gCO2/kWh) for corporate ESG and automated battery dispatch.',
    tags: ['Renewable Energy', 'Carbon Offsets', 'Smart Grid', 'CAISO', 'PJM', 'LMP Tariffs'],
    apiEndpoint: 'https://api.klstr.ai/v1/datahub/energy/grid-tariffs',
    columns: [
      { name: 'timestamp', type: 'TIMESTAMP', nullable: false, description: 'Nodal timestamp in UTC' },
      { name: 'iso_region', type: 'STRING', nullable: false, description: 'Grid operator zone (CAISO, ERCOT, PJM, NYISO)' },
      { name: 'total_load_mw', type: 'NUMBER', nullable: false, description: 'System-wide current electricity demand in Megawatts' },
      { name: 'solar_gen_mw', type: 'NUMBER', nullable: false, description: 'Solar PV active generation' },
      { name: 'wind_gen_mw', type: 'NUMBER', nullable: false, description: 'Wind turbine active generation' },
      { name: 'lmp_price_mwh', type: 'NUMBER', nullable: false, description: 'Locational Marginal Price ($ per MWh)' },
      { name: 'carbon_intensity_g_kwh', type: 'NUMBER', nullable: false, description: 'Grid carbon footprint in grams CO2 per kWh' },
      { name: 'curtailment_active', type: 'BOOLEAN', nullable: false, description: 'Whether renewable generation is curtailed' },
    ],
    sampleRows: [
      { timestamp: '2026-09-08T14:00:00Z', iso_region: 'CAISO (California)', total_load_mw: 28450, solar_gen_mw: 14200, wind_gen_mw: 3800, lmp_price_mwh: 18.50, carbon_intensity_g_kwh: 92, curtailment_active: true },
      { timestamp: '2026-09-08T14:00:00Z', iso_region: 'ERCOT (Texas)', total_load_mw: 64100, solar_gen_mw: 11900, wind_gen_mw: 18400, lmp_price_mwh: 24.80, carbon_intensity_g_kwh: 210, curtailment_active: false },
      { timestamp: '2026-09-08T14:00:00Z', iso_region: 'PJM (Mid-Atlantic)', total_load_mw: 92300, solar_gen_mw: 5400, wind_gen_mw: 6200, lmp_price_mwh: 38.20, carbon_intensity_g_kwh: 360, curtailment_active: false },
      { timestamp: '2026-09-08T14:00:00Z', iso_region: 'ENTSO-E (Germany)', total_load_mw: 54200, solar_gen_mw: 26800, wind_gen_mw: 14100, lmp_price_mwh: -4.50, carbon_intensity_g_kwh: 78, curtailment_active: true },
      { timestamp: '2026-09-08T14:00:00Z', iso_region: 'NYISO (New York)', total_load_mw: 19800, solar_gen_mw: 2100, wind_gen_mw: 1800, lmp_price_mwh: 42.10, carbon_intensity_g_kwh: 185, curtailment_active: false }
    ]
  },
  {
    id: 'ecom-pricing-sentiment-index',
    title: 'Cross-Platform Retail Pricing & Consumer Sentiment',
    subtitle: 'Daily SKU price elasticities, promotion depths, and verified review sentiment',
    category: 'E-Commerce & Retail',
    frequency: 'Daily',
    format: 'JSON',
    provider: 'OmniCommerce Insights',
    license: 'Standard Commercial Tier',
    recordCount: '3.4M SKUs',
    sizeBytes: '410 MB',
    qualityScore: 99.6,
    lastUpdated: '4 hours ago',
    pricingModel: '$190 / mo',
    description: 'High-breadth retail intelligence analyzing 3.4M consumer electronics, apparel, and FMCG SKUs across Amazon, Walmart, Target, and regional marketplaces. Computes daily stockout rates, coupon discounts, price shifts, and NLP-derived review sentiment scores.',
    tags: ['E-Commerce', 'Price Elasticity', 'Promotions', 'Consumer Sentiment', 'SKU Tracker'],
    apiEndpoint: 'https://api.klstr.ai/v1/datahub/retail/sku-elasticity',
    columns: [
      { name: 'sku_id', type: 'STRING', nullable: false, description: 'Universal Product Code / ASIN identifier' },
      { name: 'product_name', type: 'STRING', nullable: false, description: 'Human-readable brand & item title' },
      { name: 'category', type: 'STRING', nullable: false, description: 'Merchandising taxonomy category' },
      { name: 'list_price_usd', type: 'NUMBER', nullable: false, description: 'Standard manufacturer suggested retail price' },
      { name: 'current_price_usd', type: 'NUMBER', nullable: false, description: 'Live indexed selling price' },
      { name: 'discount_pct', type: 'NUMBER', nullable: false, description: 'Percentage difference from list price' },
      { name: 'sentiment_score', type: 'NUMBER', nullable: false, description: 'NLP aggregated review sentiment [-1.0 to 1.0]' },
      { name: 'stock_status', type: 'STRING', nullable: false, description: 'Inventory availability (IN_STOCK, LOW_STOCK, OOS)' },
    ],
    sampleRows: [
      { sku_id: 'B0CHX1W28Z', product_name: 'Klstr Studio Pro Noise-Cancelling Headphones', category: 'Consumer Electronics', list_price_usd: 349.99, current_price_usd: 289.99, discount_pct: 17.1, sentiment_score: 0.84, stock_status: 'IN_STOCK' },
      { sku_id: 'B09V3K1M49', product_name: 'Smart Ultra HD 4K OLED Monitor 32"', category: 'Displays & Peripherals', list_price_usd: 899.00, current_price_usd: 749.00, discount_pct: 16.7, sentiment_score: 0.72, stock_status: 'LOW_STOCK' },
      { sku_id: 'WMT-8941029', product_name: 'Ergonomic Executive Mesh Task Chair', category: 'Home & Office Furniture', list_price_usd: 249.00, current_price_usd: 189.00, discount_pct: 24.1, sentiment_score: 0.61, stock_status: 'IN_STOCK' },
      { sku_id: 'TGT-4401928', product_name: 'Cold-Brew Precision Coffee Machine', category: 'Kitchen Appliances', list_price_usd: 129.99, current_price_usd: 129.99, discount_pct: 0.0, sentiment_score: 0.91, stock_status: 'IN_STOCK' },
      { sku_id: 'B07V2Q890A', product_name: 'Smart Home Mesh Wi-Fi 7 Router System', category: 'Networking', list_price_usd: 499.99, current_price_usd: 399.99, discount_pct: 20.0, sentiment_score: 0.78, stock_status: 'OOS' }
    ]
  },
  {
    id: 'iot-industrial-turbine-telemetry',
    title: 'Industrial Heavy Turbine Vibration & Telematics',
    subtitle: 'Multi-axis accelerometry, rotor bearing temperatures, and predictive anomaly markers',
    category: 'Industrial IoT',
    frequency: 'Real-Time Streaming',
    format: 'REST / WebSocket API',
    provider: 'AeroThermal Heavy Industries',
    license: 'Industrial Private Data Cleanroom',
    recordCount: '12M / day',
    sizeBytes: '2.8 GB / day',
    qualityScore: 99.8,
    lastUpdated: 'Live streaming (3s ago)',
    pricingModel: '$520 / mo',
    description: 'High-speed industrial telemetry collected from 480 gas and steam turbines operating in manufacturing plants, oil refineries, and power stations. Real-time vibration Fourier coefficients (X, Y, Z axes), bearing casing temperatures, lubrication pressures, and ISO 10816 alarm classifications.',
    tags: ['Industrial IoT', 'Predictive Maintenance', 'Turbine Sensors', 'Vibration Telemetry', 'ISO 10816'],
    apiEndpoint: 'https://api.klstr.ai/v1/datahub/iot/turbine-telematics',
    columns: [
      { name: 'timestamp', type: 'TIMESTAMP', nullable: false, description: 'Sub-second edge sensor telemetry timestamp' },
      { name: 'turbine_id', type: 'STRING', nullable: false, description: 'Asset serial tag (e.g. TRB-GT-401)' },
      { name: 'rpm', type: 'NUMBER', nullable: false, description: 'Rotor rotational speed (RPM)' },
      { name: 'vibration_rms_mm_s', type: 'NUMBER', nullable: false, description: 'Broadband vibration velocity (mm/s RMS)' },
      { name: 'bearing_temp_c', type: 'NUMBER', nullable: false, description: 'Main thrust bearing metal temperature (°C)' },
      { name: 'lube_oil_pressure_bar', type: 'NUMBER', nullable: false, description: 'Continuous oil circuit pressure (bar)' },
      { name: 'iso_status', type: 'STRING', nullable: false, description: 'Condition assessment (GOOD_A, ACCEPTABLE_B, WARNING_C, DANGER_D)' },
      { name: 'anomaly_score', type: 'NUMBER', nullable: false, description: 'Machine learning anomaly deviation [0.0 to 1.0]' },
    ],
    sampleRows: [
      { timestamp: '2026-09-08T15:05:01.200Z', turbine_id: 'TRB-GT-401', rpm: 3600, vibration_rms_mm_s: 1.84, bearing_temp_c: 72.4, lube_oil_pressure_bar: 3.42, iso_status: 'GOOD_A', anomaly_score: 0.04 },
      { timestamp: '2026-09-08T15:05:01.200Z', turbine_id: 'TRB-GT-402', rpm: 3598, vibration_rms_mm_s: 3.12, bearing_temp_c: 84.1, lube_oil_pressure_bar: 3.10, iso_status: 'ACCEPTABLE_B', anomaly_score: 0.18 },
      { timestamp: '2026-09-08T15:05:01.200Z', turbine_id: 'TRB-ST-108', rpm: 3000, vibration_rms_mm_s: 4.85, bearing_temp_c: 94.6, lube_oil_pressure_bar: 2.75, iso_status: 'WARNING_C', anomaly_score: 0.68 },
      { timestamp: '2026-09-08T15:05:01.200Z', turbine_id: 'TRB-GT-403', rpm: 3601, vibration_rms_mm_s: 1.45, bearing_temp_c: 69.8, lube_oil_pressure_bar: 3.48, iso_status: 'GOOD_A', anomaly_score: 0.02 },
      { timestamp: '2026-09-08T15:05:01.200Z', turbine_id: 'TRB-ST-109', rpm: 3000, vibration_rms_mm_s: 2.05, bearing_temp_c: 74.0, lube_oil_pressure_bar: 3.35, iso_status: 'GOOD_A', anomaly_score: 0.06 }
    ]
  }
];
