/**
 * Time Utilities
 *
 * Convert:
 * - Game Minutes (0-960) ↔ Formated Time (06:00 AM - 10:00 PM)
 * - Game Minutes ↔ Real Milliseconds (for delays/animations)
 */

const TIME_RATIO = 30; // 30 game min = 1 real min = 60000ms

/**
 * Format minutes to a human-readable time string (e.g., "06:00 AM", "10:00 PM").
 *
 * @param minutes - Minutos desde 06:00 (0 a 960)
 * @returns String formatada "06:00 AM" ou "10:00 PM"
 *
 * @example
 * formatGameTime(0)    // "06:00 AM"
 * formatGameTime(120)  // "08:00 AM"
 * formatGameTime(720)  // "06:00 PM"
 * formatGameTime(960)  // "10:00 PM"
 */

export function formatGameTime(minutes: number): string {
  // Limits
  const clampedMinutes = Math.max(0, Math.min(960, minutes));

  // Calculate absolute hour
  const totalHours = 6 + Math.floor(clampedMinutes / 60);
  const mins = clampedMinutes % 60;

  // Format hour in 12h format
  const period = totalHours >= 12 ? "PM" : "AM";
  const displayHours = totalHours > 12 ? totalHours - 12 : totalHours;

  const displayMins = mins.toString().padStart(2, "0");

  return `${displayHours}:${displayMins} ${period}`;
}

/**
 * Calculate real time in milliseconds for a given amount of game minutes, based on the TIME_RATIO.
 *
 * Ratio: TIME_RATIO game minutes = 1 real minute (60000ms)
 *
 * @param gameMinutes - Game minutes consumed by the action
 * @returns Milliseconds for delay (minimum 3000ms, maximum 10000ms)
 *
 * @example
 * calculateRealTime(15)  // 30000ms (30s) if ratio=30
 * calculateRealTime(60)  // 120000ms (2min) if ratio=20
 */

export function calculateRealTime(gameMinutes: number): number {
  const msPerGameMinute = (60 * 1000) / TIME_RATIO; // Milliseconds per game minute
  const calculated = gameMinutes * msPerGameMinute;

  // Limits for UX (minimum 3s, maximum 10s)
  return Math.max(3000, Math.min(10000, calculated));
}

/**
 * Calculate day progress percentage (0-100%)
 * Useful for visual progress bars
 */
export function calculateDayProgress(minutes: number): number {
  return (minutes / 960) * 100;
}

/**
 * Check if it's a time of day period (for illustrations/environment)
 */
export function getTimePeriod(
  minutes: number,
): "morning" | "afternoon" | "evening" {
  if (minutes < 360) return "morning"; // 06:00 - 12:00
  if (minutes < 600) return "afternoon"; // 12:00 - 16:00
  return "evening"; // 16:00 - 22:00
}
