/**
 * GST Utility Functions for GSTSafe
 * Handles financial year calculations, threshold logic, and GST liability estimates
 */

// Special category states with ₹10L threshold
const SPECIAL_CATEGORY_STATES = [
  "Jammu & Kashmir",
  "Uttarakhand",
  "Himachal Pradesh",
  "Manipur",
  "Mizoram",
  "Nagaland",
  "Tripura",
  "Sikkim",
  "Arunachal Pradesh",
  "Meghalaya",
];

// All Indian states
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Jammu & Kashmir",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

// Threshold amounts in paise
const THRESHOLD_GENERAL = 200000000; // ₹20,00,000 in paise
const THRESHOLD_SPECIAL = 100000000; // ₹10,00,000 in paise

/**
 * Determine if a state is special category
 */
export function isSpecialCategoryState(state: string): boolean {
  return SPECIAL_CATEGORY_STATES.includes(state);
}

/**
 * Get GST threshold for a state in paise
 */
export function getThresholdForState(state: string): number {
  return isSpecialCategoryState(state) ? THRESHOLD_SPECIAL : THRESHOLD_GENERAL;
}

/**
 * Get state category from state name
 */
export function getStateCategory(state: string): "general" | "special" {
  return isSpecialCategoryState(state) ? "special" : "general";
}

/**
 * Calculate financial year from month and year
 * India's financial year runs April 1 to March 31
 * Returns format: "2025-26"
 */
export function getFinancialYear(month: number, year: number): string {
  if (month >= 4) {
    // April to December: FY is year-(year+1)
    return `${year}-${(year + 1).toString().slice(-2)}`;
  } else {
    // January to March: FY is (year-1)-year
    return `${year - 1}-${year.toString().slice(-2)}`;
  }
}

/**
 * Get current financial year
 */
export function getCurrentFinancialYear(): string {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() is 0-indexed
  const year = now.getFullYear();
  return getFinancialYear(month, year);
}

/**
 * Convert INR to paise (multiply by 100)
 */
export function inrToPaise(inr: number): number {
  return Math.round(inr * 100);
}

/**
 * Convert paise to INR (divide by 100)
 */
export function paiseToInr(paise: number): number {
  return paise / 100;
}

/**
 * Calculate threshold percentage
 * Returns percentage rounded to nearest integer
 */
export function calculateThresholdPercentage(
  totalIncomePaise: number,
  thresholdPaise: number
): number {
  if (thresholdPaise === 0) return 0;
  const percentage = (totalIncomePaise / thresholdPaise) * 100;
  return Math.round(percentage);
}

/**
 * Calculate remaining amount to threshold in paise
 */
export function calculateRemainingToThreshold(
  totalIncomePaise: number,
  thresholdPaise: number
): number {
  const remaining = thresholdPaise - totalIncomePaise;
  return remaining > 0 ? remaining : 0;
}

/**
 * Calculate estimated crossing date
 * Based on average monthly income over last 3 calendar months
 * Returns format: "~Feb 2026" or "Already crossed" or "—"
 */
export function estimateCrossingDate(
  totalIncomePaise: number,
  thresholdPaise: number,
  recentMonthlyIncomes: number[] // Last 3 months income in paise
): string {
  // Already crossed
  if (totalIncomePaise >= thresholdPaise) {
    return "Already crossed";
  }

  // No income data
  if (recentMonthlyIncomes.length === 0) {
    return "—";
  }

  // Calculate average monthly income
  const totalRecentIncome = recentMonthlyIncomes.reduce((sum, income) => sum + income, 0);
  const averageMonthlyIncome = totalRecentIncome / recentMonthlyIncomes.length;

  // No income in recent months
  if (averageMonthlyIncome === 0) {
    return "—";
  }

  const remainingPaise = calculateRemainingToThreshold(totalIncomePaise, thresholdPaise);
  const monthsRemaining = remainingPaise / averageMonthlyIncome;

  // More than 2 years away
  if (monthsRemaining > 24) {
    return "More than 2 years away";
  }

  // Calculate crossing date
  const now = new Date();
  const crossingDate = new Date(now);
  crossingDate.setMonth(now.getMonth() + Math.round(monthsRemaining));

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return `~${monthNames[crossingDate.getMonth()]} ${crossingDate.getFullYear()}`;
}

/**
 * Calculate GST liability estimate
 * Only domestic income is taxed at 18%
 * Export income is 0% GST
 */
export function calculateGSTLiability(
  domesticIncomePaise: number
): number {
  // GST is 18% on domestic income
  const gstLiabilityPaise = domesticIncomePaise * 0.18;
  return gstLiabilityPaise;
}

/**
 * Get threshold bar color based on percentage
 */
export function getThresholdBarColor(percentage: number): string {
  if (percentage >= 100) return "danger";
  if (percentage >= 90) return "orange";
  if (percentage >= 75) return "warning";
  return "neutral";
}

/**
 * Format currency for display
 */
export function formatCurrency(amountInPaise: number): string {
  const inr = paiseToInr(amountInPaise);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);
}

/**
 * Get filing deadline for current month
 * GSTR-1: 11th of following month
 * GSTR-3B: 20th of following month
 */
export function getFilingDeadlines(): {
  gstr1: string;
  gstr3b: string;
} {
  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = monthNames[nextMonth.getMonth()];
  const year = nextMonth.getFullYear();

  return {
    gstr1: `11th ${monthName} ${year}`,
    gstr3b: `20th ${monthName} ${year}`,
  };
}
