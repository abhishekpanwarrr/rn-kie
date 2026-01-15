export function formatDateTime(dateString?: string) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatRelativeTime(dateString?: string) {
  if (!dateString) return "";

  const now = new Date();
  const date = new Date(dateString);

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // ⏱ Just now
  if (diffSeconds < 30) {
    return "Just now";
  }

  // ⏱ Minutes ago
  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  // ⏱ Hours ago
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  // 📅 Yesterday
  if (diffDays === 1) {
    return "Yesterday";
  }

  // 📅 Older → fallback to date
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
