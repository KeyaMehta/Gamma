/* =========================================================
   GAMMA HOUSE SITE DATA
   This is the only file you need to edit to update the site.
   Dates are written as "YYYY-MM-DD". The site uses today's
   date to decide what is upcoming and what is past.
   ========================================================= */

const SITE = {
  houseName: "Gamma House",
  school: "Bombay International School",
  motto: "Bleed Blue",
  chant: "Go Gamma Boom Dynamite, Go Gamma Boom Dynamite, Go Gamma Tee Tee Tee Tee Tee Tee Tee Tee Boom Dynamite",

  // Title shown at the top of the site
  title: { name: "Co-Curricular Cup", year: "2025-26" },

  // WhatsApp group invite link (the QR code is generated from it)
  whatsappLink: "https://chat.whatsapp.com/BrMEsXVZbkBC96h3ocPqw2",

  // Google Form for co-curricular (non-sports) event sign-ups, e.g. "https://forms.gle/XXXX"
  participationForm: "",

  // Optional: pre-fill the event name in the form. In Google Forms, use
  // "Get pre-filled link", type anything in the event question, and copy the
  // part that looks like "entry.123456789". Needs the full docs.google.com link above.
  formEventEntry: "",

  // Only events up to this date are listed
  showUntil: "2026-12-31",

  // Points per event for the house standings
  points: { first: 10, second: 7, third: 4 },

  // Set to false to show names as "First name + last initial"
  showFullNames: true,

  // Captains and teachers-in-charge: { role: "House Captain", name: "Full Name", email: "name@bis.edu.in" }
  contacts: [],

  // Footer links: { label: "Instagram", url: "https://..." }
  socials: []
};

/* Gamma students who appear in the individual sports results (Chess, Table
   Tennis, Squash). Type each name exactly as it appears in RESULTS below.
   The site uses this list to build each event's Gamma winners list and to
   pick the Best Sports Player (most medals, then most golds). */
const GAMMA_MEMBERS = [];

/* Abbreviations used in event names (shown as tooltips and in a key) */
const ABBREVIATIONS = {
  SS: "Senior School",
  MS: "Middle School",
  CS: "Cross Section"
};

const CATEGORIES = {
  sports: "Sports",
  cocurricular: "Co-curricular"
};

/* Photos used around the site (all in images/gallery/) */
const PHOTOS = {
  sports: ["basketball-drive.jpg", "junior-football-team.jpg", "hands-in.jpg", "basketball-defence.jpg", "junior-basketball-squad.jpg"],
  cocurricular: ["live-band.jpg", "speaking-on-stage.jpg", "drama-scene.jpg", "quiz-on-stage.jpg", "skit-with-a-message.jpg", "solo-performance.jpg", "at-the-podium.jpg", "stage-band-dancers.jpg", "flavours-of-maharashtra.jpg", "drama-kurta-scene.jpg", "build-session.jpg"]
};

/* ---------------------------------------------------------
   EVENTS
   Optional fields: grades, timing, note, photo (file in images/gallery/),
   form (a different sign-up form for one co-curricular event),
   noResults: true (keeps an event off the results page)
   --------------------------------------------------------- */
const EVENTS = [
  { id: "football",        name: "Interhouse Football",               category: "sports",       grades: "1 to 12", date: "2026-08-22", photo: "junior-football-team.jpg" },
  { id: "basketball",      name: "Interhouse Basketball",             category: "sports",       date: "2026-08-29", photo: "basketball-drive.jpg" },
  { id: "table-tennis",    name: "Interhouse Table Tennis",           category: "sports",       grades: "1 to 12", date: "2026-09-05", photo: "" },
  { id: "fashion-prep",    name: "CS Fashion Fiesta Prep",            category: "cocurricular", grades: "6 to 10", date: "2026-09-07", timing: "After school", noResults: true },
  { id: "ss-creative",     name: "SS Creative Writing",               category: "cocurricular", grades: "9 to 10", date: "2026-09-08", timing: "Assembly", photo: "" },
  { id: "fashion-fiesta",  name: "CS Fashion Fiesta",                 category: "cocurricular", grades: "6 to 10", date: "2026-09-08", timing: "Assembly (SG led)", photo: "fashion-showcase.jpg" },
  { id: "chess",           name: "Interhouse Chess",                  category: "sports",       grades: "1 to 12", date: "2026-09-19", photo: "" },
  { id: "ss-poetrart",     name: "SS PoetrArt",                       category: "cocurricular", grades: "8 to 10", date: "2026-09-29", timing: "Assembly", photo: "at-the-podium.jpg" },
  { id: "debate-1",        name: "English Debate 1 (SS)",             category: "cocurricular", grades: "9 to 10", date: "2026-09-29", timing: "Assembly", photo: "speaking-on-stage.jpg" },
  { id: "ib-turncoat",     name: "IB English Turncoat Debate",        category: "cocurricular", grades: "11 to 12", date: "2026-10-06", timing: "Assembly", photo: "quiz-on-stage.jpg" },
  { id: "value-asm",       name: "Value Based Assembly",              category: "cocurricular", grades: "6 to 8", date: "2026-10-06", timing: "Assembly", photo: "skit-with-a-message.jpg" },
  { id: "interschool-fb",  name: "Interschool Football",              category: "sports",       grades: "1 to 12", date: "2026-10-10", photo: "junior-football-team.jpg" },
  { id: "global-language", name: "SS Global Language Fiesta",         category: "cocurricular", grades: "8 to 10", date: "2026-10-13", timing: "Assembly", photo: "flavours-of-maharashtra.jpg" },
  { id: "badminton",       name: "Interhouse Badminton",              category: "sports",       grades: "1 to 12", date: "2026-10-17", photo: "hands-in.jpg" },
  { id: "film-submit",     name: "CS Short Film Making: Submission",  category: "cocurricular", grades: "9 to 12", date: "2026-10-21", photo: "drama-kurta-scene.jpg" },
  { id: "lawn-tennis",     name: "Interhouse Lawn Tennis",            category: "sports",       grades: "1 to 12", date: "2026-10-24", photo: "basketball-defence.jpg" },
  { id: "film-present",    name: "CS Short Film Making: Presentation", category: "cocurricular", grades: "9 to 12", date: "2026-10-27", timing: "Social Awareness Assembly for NGO", photo: "drama-scene.jpg" },
  { id: "debate-2",        name: "English Debate 2 (MS)",             category: "cocurricular", grades: "7 to 8", date: "2026-11-03", timing: "Assembly", photo: "speaking-on-stage.jpg" },
  { id: "critical-strike", name: "SS Critical Strike",                category: "cocurricular", grades: "9 to 10", date: "2026-11-03", timing: "Assembly", note: "Only participants attend", photo: "quiz-on-stage.jpg" },
  { id: "ss-extempore",    name: "SS Extempore",                      category: "cocurricular", grades: "8 to 10", date: "2026-11-24", timing: "Assembly", photo: "at-the-podium.jpg" },
  { id: "ib-improv",       name: "IB Improv Battle",                  category: "cocurricular", grades: "11 to 12", date: "2026-12-08", timing: "Assembly", photo: "drama-scene.jpg" },
  { id: "sports-heats",    name: "Sports Heats",                      category: "sports",       date: "2026-12-16", photo: "junior-basketball-squad.jpg" },

  // After showUntil (hidden until you change the date above)
  { id: "art-fest",        name: "CS Art Fest (Making + Analysis)",   category: "cocurricular", grades: "6 to 10", date: "2027-01-12", timing: "Assembly" },
  { id: "gaming",          name: "Interhouse Gaming Competition",     category: "sports",       date: "2027-01-16" },
  { id: "sports-day",      name: "Sports Day",                        category: "sports",       date: "2027-01-18" },
  { id: "ms-extempore",    name: "MS Extempore",                      category: "cocurricular", grades: "6 to 7", date: "2027-02-16", timing: "Assembly" },
  { id: "ms-improv",       name: "MS Improv",                         category: "cocurricular", grades: "6 to 7", date: "2027-03-09", timing: "Assembly" },
  { id: "swimming",        name: "Interhouse Swimming",               category: "sports",       date: "2027-03-13" },
  { id: "spell-bee",       name: "MS Spell Bee",                      category: "cocurricular", grades: "6 to 7", date: "2027-03-30", timing: "Assembly" },
  { id: "masterchef",      name: "CS MasterChef Competition",         category: "cocurricular", grades: "6 to 9", date: "2027-03-30" },
  { id: "master-quiz",     name: "Master Quiz",                       category: "cocurricular", grades: "6 to 9 and 11", date: "2027-04-06", timing: "Morning assembly" },
  { id: "ms-creative",     name: "MS English Creative Writing",       category: "cocurricular", grades: "6 to 7", date: "2027-04-06", timing: "Morning assembly" },
  { id: "ms-poetrart",     name: "MS PoetrArt",                       category: "cocurricular", grades: "6 to 7", date: "2027-04-06", timing: "Morning assembly" },
  { id: "performance-asm", name: "Performance Assembly",              category: "cocurricular", grades: "6 to 9", date: "2027-04-13", timing: "Assembly" },

  // Completed events that were not on the Term 1 calendar (no date given)
  { id: "squash",          name: "Interhouse Squash",                 category: "sports",       date: null, completed: true, photo: "" },
  { id: "spirit-day",      name: "House Spirit Day",                  category: "cocurricular", date: null, completed: true, photo: "gamma-together.jpg" }
];

/* ---------------------------------------------------------
   RESULTS
   Every result has a "placing" (1st, 2nd, 3rd house). House points
   come from SITE.points. Sports results also keep the medal tallies
   and category winners from the official sheets.
   type "team":       house placing per age category
   type "individual": medal winners per age category
   type "placing":    overall placing only
   type "pending":    not announced yet
   --------------------------------------------------------- */
const RESULTS = {
  football: {
    placing: ["Gamma", "Alpha", "Beta"],
    type: "team",
    houses: [
      { house: "Gamma", gold: 6, silver: 1, bronze: 4, points: 83 },
      { house: "Alpha", gold: 4, silver: 3, bronze: 4, points: 77 },
      { house: "Beta",  gold: 1, silver: 7, bronze: 3, points: 71 }
    ],
    categories: [
      ["U-8 Girls",  "Gamma", "Alpha", "Beta"],
      ["U-10 Girls", "Gamma", "Beta",  "Alpha"],
      ["U-12 Girls", "Gamma", "Alpha", "Beta"],
      ["U-14 Girls", "Beta",  "Gamma", "Alpha"],
      ["U-17 Girls", "Alpha", "Beta",  "Gamma"],
      ["U-8 Boys",   "Gamma", "Beta",  "Alpha"],
      ["U-10 Boys",  "Alpha", "Beta",  "Gamma"],
      ["U-12 Boys",  "Gamma", "Alpha", "Beta"],
      ["U-14 Boys",  "Gamma", "Beta",  "Alpha"],
      ["U-17 Boys",  "Alpha", "Beta",  "Gamma"],
      ["U-19 Boys",  "Alpha", "Beta",  "Gamma"]
    ]
  },

  basketball: {
    placing: ["Gamma", "Beta", "Alpha"],
    type: "team",
    houses: [
      { house: "Gamma", gold: 4, silver: 3, bronze: 2, points: 69 },
      { house: "Beta",  gold: 3, silver: 4, bronze: 2, points: 66 },
      { house: "Alpha", gold: 2, silver: 2, bronze: 5, points: 54 }
    ],
    categories: [
      ["Under-8 Mix", "Gamma", "Beta",  "Alpha"],
      ["U-10 Girls",  "Beta",  "Gamma", "Alpha"],
      ["U-12 Girls",  "Beta",  "Alpha", "Gamma"],
      ["U-14 Girls",  "Beta",  "Gamma", "Alpha"],
      ["U-17 Girls",  "Gamma", "Alpha", "Beta"],
      ["U-19 Girls",  null, null, null],
      ["U-10 Boys",   "Alpha", "Gamma", "Beta"],
      ["U-12 Boys",   "Gamma", "Beta",  "Alpha"],
      ["U-14 Boys",   "Gamma", "Beta",  "Alpha"],
      ["U-17 Boys",   "Alpha", "Beta",  "Gamma"],
      ["U-19 Boys",   null, null, null]
    ]
  },

  "table-tennis": {
    placing: ["Beta", "Gamma", "Alpha"],
    type: "individual",
    houses: [
      { house: "Beta",  gold: 4, silver: 8, bronze: 3, points: 47 },
      { house: "Gamma", gold: 4, silver: 1, bronze: 5, points: 28 },
      { house: "Alpha", gold: 3, silver: 1, bronze: 1, points: 19 }
    ],
    categories: [
      ["U-8 Girls",  "Aneeka Ghosh", null, null],
      ["U-10 Girls", "Inaaya Sinha Sapru", "Aalia Mulchandani", "Soha Dattoobhai"],
      ["U-12 Girls", "Adiya Avadhani", "Eman Choksi", "Aashvi Viraj"],
      ["U-14 Girls", "Aadya Sharma", "Shyla Vajifdar", "Devika Jain"],
      ["U-17 Girls", "Veda Kothari", "Amaira Mehta", "Keya Mehta"],
      ["U-19 Girls", null, null, null],
      ["U-8 Boys",   "Kabir Saini", "Devansh Vadlagtta", null],
      ["U-10 Boys",  "Samarth Narang", "Karam Mulchandani", "Shivaay Mehta"],
      ["U-12 Boys",  "Krishav Jatia", "Yuvan Davda", "Aarav Swamy"],
      ["U-14 Boys",  "Hreyansh Patni", "Shiv Mody", "Ishaan Goenka"],
      ["U-17 Boys",  "Kush Kejriwal", "Raghav Jatia", "Arjuna Shah"],
      ["U-19 Boys",  "Kabir Marchant", "Shlok Bohra", "Shivin Shah"]
    ]
  },

  chess: {
    placing: ["Gamma", "Beta", "Alpha"],
    type: "individual",
    houses: [
      { house: "Gamma", gold: 6, silver: 4, bronze: 3, points: 45 },
      { house: "Beta",  gold: 2, silver: 5, bronze: 6, points: 31 },
      { house: "Alpha", gold: 4, silver: 2, bronze: 0, points: 26 }
    ],
    categories: [
      ["U-8 Girls",  "Leisha Mirchandani", "Zia Devata", "Tarini Sen"],
      ["U-10 Girls", "Nayanika Pai Dhungat", "Aditi Chand Abraham", "Swara Sridhar"],
      ["U-12 Girls", "Aanya Hariharan", "Nitya Shriya Bansal", "Sufi Panjabi"],
      ["U-14 Girls", "Shyla Vajifdar", null, null],
      ["U-17 Girls", "Keya Mehta", "Kimaya Mehta", "Rewa Merchant"],
      ["U-19 Girls", "Amatullah Poonawala", "Shanaya Makharia", null],
      ["U-8 Boys",   "Jahaan Subedar", "Ari Kaji", "Shivaansh Mehta"],
      ["U-10 Boys",  "Saahir Shah", "Neil Barasia", "Ved Shanghvi"],
      ["U-12 Boys",  "Rishabh Sridhar", "Rohan Choudhary", "Kabir Malik Batra"],
      ["U-14 Boys",  "Darayus Davar", "Krishiv Haribhakti", "Rishabh Hariharan"],
      ["U-17 Boys",  "Vivaan Haribhakti", "Raghav Jatia", "Purab Shah"],
      ["U-19 Boys",  "Mikhail Vora", "Anarv Gupta", "Dev Shah"]
    ]
  },

  squash: {
    placing: ["Alpha", "Gamma", "Beta"],
    type: "individual",
    houses: [
      { house: "Alpha", gold: 4, silver: 4, bronze: 2, points: 34 },
      { house: "Gamma", gold: 2, silver: 3, bronze: 2, points: 21 },
      { house: "Beta",  gold: 1, silver: 2, bronze: 2, points: 13 }
    ],
    categories: [
      ["U-10 Girls", "Anandita Munshi", "Inaaya Sapru", null],
      ["U-12 Girls", "Arianna Almoula", "Rahi Mehta", null],
      ["U-17 Girls", "Sameera Gorsia", "Aeva Parikh", "Keya Mehta"],
      ["U-19 Girls", "Diva Shah", "Amaira Mehta", null],
      ["U-10 Boys",  "Aarish Dwarkadas", "Samarth Narang", "Ronin Thadani"],
      ["U-12 Boys",  "Yohan Karnani", "Vanraj Parikh", "Kaveer Jogani"],
      ["U-14 Boys",  "Vedant Parikh", "Aarav Patodia", "Hreyansh Patni"],
      ["U-17 Boys",  "Rohan Kejriwal", "Kiaan Kulkarni", "Agastya Jain"],
      ["U-19 Boys",  "Ansh Somani", "Shayon Roy", "Shlok Bohra"]
    ]
  },

  "spirit-day": {
    type: "placing",
    placing: ["Gamma", "Alpha", "Beta"],
    gammaWinners: [{ name: "The whole house", place: 1 }]
  },

  "fashion-fiesta": {
    type: "placing",
    placing: ["Beta", "Alpha", "Gamma"],
    gammaWinners: [
      { name: "Devika Jain", note: "Grade 6", place: 3 },
      { name: "Yeeva Kothari", note: "Grade 7", place: 3 },
      { name: "Vida Pinto", note: "Grade 8", place: 3 },
      { name: "Veer Garg", note: "Grade 9", place: 3 },
      { name: "Devika Mehta", note: "Grade 10", place: 3 }
    ]
  },

  "ss-creative": {
    type: "pending",
    participants: [
      "Aishali Doctor (Grade 9)",
      "Udita Shah (Grade 9)",
      "Abhay Jain (Grade 10)",
      "Ahaana Chadda (Grade 10)"
    ]
  }
};

/* Home page gallery (full size in images/gallery/, small copy in images/gallery/thumbs/) */
const GALLERY = [
  { src: "hands-in.jpg",                caption: "Handshake before the game" },
  { src: "gamma-flag.jpg",              caption: "Flying the Gamma flag" },
  { src: "junior-basketball-squad.jpg", caption: "Our junior basketball squad" },
  { src: "live-band.jpg",               caption: "Live band on stage" },
  { src: "basketball-drive.jpg",        caption: "Driving to the basket" },
  { src: "fashion-showcase.jpg",        caption: "Fashion design showcase" },
  { src: "junior-football-team.jpg",    caption: "Junior football team" },
  { src: "stage-band-dancers.jpg",      caption: "Band and dancers" },
  { src: "flavours-of-maharashtra.jpg", caption: "Flavours of Maharashtra food stall" },
  { src: "solo-performance.jpg",        caption: "Solo performance" },
  { src: "basketball-defence.jpg",      caption: "Holding the ball under pressure" },
  { src: "skit-with-a-message.jpg",     caption: "A skit with a message" },
  { src: "newspaper-design.jpg",        caption: "Designing with newspaper" },
  { src: "drama-scene.jpg",             caption: "Drama on stage" },
  { src: "build-session.jpg",           caption: "Hands-on build session" },
  { src: "quiz-on-stage.jpg",           caption: "Quiz on stage" },
  { src: "drama-kurta-scene.jpg",       caption: "Mid-scene" },
  { src: "at-the-podium.jpg",           caption: "At the podium" },
  { src: "gamma-together.jpg",          caption: "Gamma together" },
  { src: "speaking-on-stage.jpg",       caption: "Speaking on stage" }
];
