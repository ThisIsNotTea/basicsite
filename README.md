# County GOP Astro Starter

A small, accessible, static website starter for a local Republican Party or county GOP. Astro generates plain HTML at build time; pages use Markdown wherever it makes sense, with no database, client-side JavaScript, CSS framework, or visitor tracking included.

The example organization, names, locations, dates, email, URLs, and copy are placeholders. Replace them with verified local information and required election disclosures before publishing.

## What is included

- Astro 5+ file-based routes and static output for Cloudflare Pages, Netlify, or GitHub Pages.
- Markdown content collections for news posts and events.
- Upcoming event list, homepage event highlights, Google Calendar links, and individual `.ics` downloads.
- Shared accessible layout, mobile-friendly plain CSS, SEO/Open Graph metadata, and configurable branding.
- Starter pages: Home, About, News, Events, Get involved, Contact, Documents, and Privacy.
- Security response headers for Cloudflare Pages and Netlify.

## Requirements and local setup

Use Node.js 22.23.4 or later and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Astro (normally `http://localhost:4321`). Build and preview the production site locally with:

```sh
npm run build
npm run preview
```

The finished static site is written to `dist/`. Run `npm run build` before publishing to catch type, content-schema, and build errors.

## Customize the site

### Organization details and links

Edit [`src/config.ts`](./src/config.ts):

- `partyName`, `county`, and `state` appear in the header and footer.
- `siteUrl` must be the final canonical HTTPS origin; `astro.config.mjs` also has a `site` setting to update.
- `description` supplies the default SEO description.
- `logoPath` points to a file in `public/` (for example, `/images/logo.svg`).
- `donationUrl` is the external donation destination. Add or change the donation call-to-action where appropriate; no donation processing is built in.
- `contactEmail` is used for email links.
- `socialLinks` is a list of labels and URLs. Remove unused entries or replace the blank URLs with official profiles.
- `colors` sets the CSS custom properties used by the shared layout.

Replace `public/images/logo.svg` and `public/favicon.svg` with artwork you have permission to use. Update required disclaimers and have local counsel review the site as appropriate.

### Add a news post

Create a Markdown file in `src/content/news/`, for example `src/content/news/2027-04-town-hall.md`:

```md
---
title: "Community town hall announced"
pubDate: 2027-04-10
description: "Join neighbors for a conversation about local priorities."
author: "County Committee"
---

Write the announcement here. Markdown links and headings work as usual.
```

Posts with `draft: true` in their frontmatter do not appear in the public news pages. The post filename (without `.md`) becomes its URL slug.

### Add an event

Create a Markdown file in `src/content/events/`. The `title`, `date`, `location`, and `description` fields are required; `endDate` and `registrationLink` are optional.

```md
---
title: "County committee meeting"
date: 2027-04-20T18:30:00-05:00
endDate: 2027-04-20T20:00:00-05:00
location: "Public library meeting room"
description: "Monthly committee updates and community announcements."
registrationLink: "https://example.org/register"
---

Add any additional event notes here.
```

Use an ISO date/time with the correct local UTC offset. Events are ordered by start time; past events automatically disappear from the upcoming list. Each event gets a Google Calendar link and a downloadable `.ics` file. When `endDate` is omitted, the calendar action assumes a one-hour event.

### Pages, documents, and styling

- Edit the Astro pages in `src/pages/`. The shared header, footer, navigation, and SEO tags live in `src/layouts/BaseLayout.astro`.
- Add PDFs or other public files under `public/documents/` and link to them from `src/pages/documents.astro`. Files in `public/` are copied as-is to the site root.
- Use plain CSS in `src/styles/global.css`; CSS custom properties define the theme. No utility-class framework is used.
- Contact is an email link only. The site does not store messages or personal data.

## Migrating from NationBuilder

Use an existing NationBuilder site (for example, [jackson.nationbuilder.com](https://jackson.nationbuilder.com/)) as a source to review—not as content to copy wholesale. Confirm you have permission to reuse text, images, and documents, and independently verify that old information is still accurate.

1. **Inventory the source site.** Make a list of key pages and current facts: mission statement, about/history, officer names and roles, meeting schedule, volunteer opportunities, contact channels, event listings, donation destination, and public documents.
2. **Verify with the organization.** Check names, dates, addresses, contact details, platform/endorsement text, and links with the responsible local officers. Remove outdated campaigns, personal information, and any content that should not be public.
3. **Convert one page at a time.** Rewrite each approved page as concise Markdown in the appropriate file under `src/content/news/` or `src/content/events/`, or as an Astro page under `src/pages/`. Use headings, lists, and descriptive links; avoid copying NationBuilder HTML or scripts.
4. **Transfer events.** Create one Markdown file per confirmed future event in `src/content/events/`. Include the correct local time zone, an accurate location, a short description, and a registration URL only if it is active and approved.
5. **Transfer documents.** Download only approved public PDFs and files, scan them for personal or sensitive information, and put them in `public/documents/`. Link with descriptive text such as “County bylaws (PDF)” rather than “click here.” Files placed in `src/assets/` are processed by Astro and should be imported into a page/component; use `public/` for straightforward stable document URLs.
6. **Review before launch.** Check every page and link, test on mobile and with keyboard navigation, verify privacy and required campaign disclosures, and run `npm run build`.

### NationBuilder features intentionally not included

This starter does not provide NationBuilder's CRM/contact database, email blasts, donation processing, member logins, voter data, advanced forms, or campaign automation. Keep those responsibilities with purpose-built providers rather than adding an unmaintained backend to this static site.

- **Contact / volunteer forms:** use a hosted provider such as [Formspree](https://formspree.io/) or a Netlify Form. Review the provider's privacy terms, configure spam protection, and disclose what information you collect.
- **Fundraising:** link to an official, compliant donation platform using `donationUrl`; do not collect payment details on this site.
- **Email updates:** use an established email service with explicit opt-in, unsubscribe handling, and appropriate consent records.
- **Member-only information:** keep private records in a secure service designed for that purpose; do not put confidential files or data in `public/`.

## Deployment

### Cloudflare Pages

1. Push the project to a Git provider and create a Cloudflare Pages project connected to that repository.
2. Set the build command to `npm run build` and the build output directory to `dist`.
3. Select a current Node.js version (20.3 or later) in the build environment.
4. Set the production domain in both `src/config.ts` (`siteUrl`) and `astro.config.mjs` (`site`).
5. Deploy. `public/_headers` supplies the security headers for Cloudflare Pages.

### Netlify

Import the repository as a new Netlify site. The included `netlify.toml` sets the build command to `npm run build`, the publish directory to `dist`, and the security response headers. Set the production URL in `src/config.ts` and `astro.config.mjs`, then deploy.

### GitHub Pages

Build with `npm run build` and publish `dist/` using GitHub Actions. For a project site served under a repository subpath, configure Astro's `base` option and update internal asset/path handling before deploying. GitHub Pages does not read the `_headers` file, so configure equivalent headers at a CDN or hosting layer if required.

## Security and privacy notes

The project has no default client-side JavaScript, form endpoint, tracking code, or server runtime. `_headers` and `netlify.toml` set baseline browser security headers. The content security policy permits inline styles because the layout applies configured color values as CSS custom properties; keep scripts self-hosted and tighten the policy if the implementation changes. Third-party form, donation, calendar, and registration destinations have their own privacy and security implications.

This template and its privacy policy are not legal advice. Review the deployed site's actual practices, hosting provider, records-retention needs, accessibility, and local election disclosure requirements before launch.

## License

This starter is available under the [MIT License](./LICENSE).
