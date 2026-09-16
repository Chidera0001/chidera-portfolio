// Chidera's rough daily rhythm, in Kigali local time (Africa/Kigali, UTC+2, no DST).
export function getCurrentActivity(date: Date): string {
  const utcHour = date.getUTCHours() + date.getUTCMinutes() / 60;
  const kigaliHour = (utcHour + 2) % 24;

  if (kigaliHour >= 6 && kigaliHour < 7) return "In devotion — quiet time before the day starts.";
  if (kigaliHour >= 7 && kigaliHour < 9) return "Planning the day.";
  if (kigaliHour >= 9 && kigaliHour < 16) return "Probably coding, or in a meeting.";
  if (kigaliHour >= 16 && kigaliHour < 18) return "At the gym.";
  if (kigaliHour >= 18 && kigaliHour < 20) return "Out for a run.";
  if (kigaliHour >= 20 && kigaliHour < 22) return "Had dinner, winding down for the night.";
  return "Sleeping right now — feel free to explore and leave a message.";
}
