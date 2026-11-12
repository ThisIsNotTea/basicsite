import type { CollectionEntry } from "astro:content";

export type EventEntry = CollectionEntry<"events">;

export function getUpcomingEvents(events: EventEntry[], now = new Date()) {
  return events
    .filter((event) => event.data.date >= now)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}

function googleDate(date: Date) {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function googleCalendarUrl(event: EventEntry) {
  const endDate =
    event.data.endDate ?? new Date(event.data.date.getTime() + 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.data.title,
    dates: `${googleDate(event.data.date)}/${googleDate(endDate)}`,
    details: event.data.description,
    location: event.data.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function eventIcsPath(event: EventEntry) {
  return `/events/${event.id}.ics`;
}

export function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}
