# Gamma House website

Static site for Gamma House, Bombay International School. No build step.

## Pages
- `index.html`: Home
- `events.html`: Upcoming Events
- `results.html`: Past Events & Winners
- `info.html`: Event Info and co-curricular sign-ups
- `join.html`: WhatsApp group

The header and footer are shared and built by `js/main.js`, so a change there applies to every page.

## Updating the site
Edit **`js/data.js`**:
- `title`: the title shown at the top (currently Co-Curricular Cup 2025-26)
- `participationForm`: Google Form link for co-curricular sign-ups
- `showUntil`: last date of events to list
- `points`: points per placing (10 / 7 / 4)
- `GAMMA_MEMBERS`: Gamma names in the individual sports results; builds the winners lists and Best Sports Player
- `EVENTS`: add events (dates as `YYYY-MM-DD`), category `sports` or `cocurricular`, optional `photo`
- `RESULTS`: add results after an event, keyed by the event `id`
- `GALLERY`: home page photos (`images/gallery/` plus a small copy in `images/gallery/thumbs/`)

Upcoming vs past is decided automatically from today's date. Missing images show a placeholder.

## Images
- `images/bis-logo.png`: add the school logo with this exact filename
