import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export async function getStaticPaths() {
  const events = await getCollection("events");
  return events.map((event) => ({ params: { slug: event.id }, props: { event } }));
}

export const GET: APIRoute = ({ props }) => {
  const { event } = props;
  const endDate = event.data.endDate ?? new Date(event.data.date.getTime() + 60 * 60 * 1000);
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//County GOP Astro Starter//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${escapeIcs(event.id)}@example.org`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(event.data.date)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:${escapeIcs(event.data.title)}`,
    `DESCRIPTION:${escapeIcs(event.data.description)}`,
    `LOCATION:${escapeIcs(event.data.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(`${calendar}\r\n`, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.id}.ics"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
};
