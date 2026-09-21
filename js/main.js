(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = document.body.dataset.page;

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTHS_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const ORD = ["1st", "2nd", "3rd"];
  const HOUSES = ["Gamma", "Alpha", "Beta"];
  const PTS = [SITE.points.first, SITE.points.second, SITE.points.third];

  const parse = iso => { if (!iso) return null; const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const until = parse(SITE.showUntil);
  const fmt = d => d ? `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}` : "Date to be confirmed";
  const fmtShort = d => d ? `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` : "Date TBC";
  const daysUntil = d => Math.round((d - today) / 86400000);
  const name = n => {
    if (!n || SITE.showFullNames) return n;
    const p = n.trim().split(/\s+/);
    return p.length > 1 ? `${p[0]} ${p[p.length - 1][0]}.` : p[0];
  };
  const abbrRe = new RegExp(`\\b(${Object.keys(ABBREVIATIONS).join("|")})\\b`, "g");
  const rich = t => esc(t).replace(abbrRe, m => `<abbr title="${ABBREVIATIONS[m]}">${m}</abbr>`);
  const isCo = e => e.category !== "sports";

  const events = EVENTS.map(e => ({ ...e, d: parse(e.date) })).filter(e => !e.d || !until || e.d <= until);
  const isPast = e => e.completed || (e.d && e.d < today);
  const upcoming = events.filter(e => !isPast(e)).sort((a, b) => a.d - b.d);
  const past = events.filter(isPast).sort((a, b) => (b.d || 0) - (a.d || 0));

  const photoFor = (e, i = 0) => {
    if (e.photo !== undefined) return e.photo;
    const pool = PHOTOS[e.category] || [];
    return pool.length ? pool[i % pool.length] : "";
  };
  const imgTag = (file, alt, cls = "", thumb = true) => file
    ? `<img class="${cls}" data-ph="Photo coming soon" src="images/gallery/${thumb ? "thumbs/" : ""}${esc(file)}" alt="${esc(alt)}" loading="lazy" width="720" height="480">`
    : `<div class="img-ph ${cls}" role="img" aria-label="Photo coming soon">${PH_ICON}<span>Photo coming soon</span></div>`;
  const PH_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="10" r="2" fill="currentColor"/><path d="M4 18l5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
  const TROPHY = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M20 8h24v14a12 12 0 0 1-24 0z" fill="currentColor"/><path d="M20 12H10v4a10 10 0 0 0 10 10M44 12h10v4a10 10 0 0 1-10 10" fill="none" stroke="currentColor" stroke-width="4"/><path d="M28 34h8v10h-8z" fill="currentColor"/><path d="M20 50h24v6H20z" fill="currentColor"/><path d="M24 44h16v6H24z" fill="currentColor" opacity=".8"/></svg>`;

  /* ---------- Image placeholders ---------- */
  function placeholders() {
    $$("img[data-ph]").forEach(img => {
      const swap = () => {
        const d = document.createElement("div");
        d.className = `img-ph ${img.className}`; d.setAttribute("role", "img"); d.setAttribute("aria-label", img.dataset.ph);
        d.innerHTML = `${PH_ICON}<span>${esc(img.dataset.ph)}</span>`; img.replaceWith(d);
      };
      if (img.complete && img.naturalWidth === 0) swap();
      else img.addEventListener("error", swap, { once: true });
    });
  }

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.1 });
  function reveal() { $$(".reveal:not(.in)").forEach(el => reduced ? el.classList.add("in") : io.observe(el)); placeholders(); }

  /* ---------- Layout: header + footer ---------- */
  const NAV = [["index.html", "Home", "home"], ["events.html", "Upcoming Events", "events"], ["results.html", "Past Events & Winners", "results"], ["info.html", "Event Info", "info"], ["join.html", "Join Community", "join"]];
  const WA_ICON = `<svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>`;
  $("#site-header").innerHTML = `
    <div class="nav__inner">
      <a class="brand" href="index.html" aria-label="Gamma House home">
        <img src="images/gamma-logo.png" alt="Gamma House logo" width="362" height="297">
        <span class="brand__text">Gamma<span>House</span></span>
      </a>
      <button class="nav__toggle" aria-expanded="false" aria-controls="nav-links"><span class="sr">Menu</span><span class="bars" aria-hidden="true"></span></button>
      <nav class="nav__links" id="nav-links" aria-label="Main">
        ${NAV.map(([href, label, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
        <a class="btn btn--cyan btn--sm js-wa" href="join.html">${WA_ICON} Join WhatsApp Group</a>
      </nav>
    </div>`;
  $("#site-footer").innerHTML = `
    <div class="wrap footer__grid">
      <div>
        <div class="footer__brand">
          <img src="images/gamma-logo.png" alt="" width="362" height="297">
          <div><p class="footer__name">Gamma House</p><p class="footer__motto">Bleed Blue</p></div>
        </div>
        <p class="footer__chant">“${esc(SITE.chant)}”</p>
      </div>
      <nav aria-label="Footer"><h3>Pages</h3><ul>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul></nav>
      <div>
        <h3>Contact</h3>
        <ul>${SITE.contacts.length
          ? SITE.contacts.map(c => `<li><a href="mailto:${esc(c.email)}">${esc(c.name)}</a><span class="contact-role">${esc(c.role)}</span></li>`).join("")
          : `<li>House captain and teacher contacts coming soon.</li>`}</ul>
        <ul class="socials">${SITE.socials.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join("")}</ul>
      </div>
      <div class="footer__school">
        <img data-ph="School logo" class="school-logo" src="images/bis-logo.png" alt="Bombay International School logo" width="120" height="120">
        <p>A house of<br>${esc(SITE.school)}</p>
      </div>
    </div>
    <p class="footer__base wrap">Gamma House · ${esc(SITE.school)}</p>`;

  const toggle = $(".nav__toggle"), links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", open); links.classList.toggle("open", open);
  });

  /* ---------- WhatsApp + QR + chant ---------- */
  const wa = (SITE.whatsappLink || "").trim();
  if (wa) $$(".js-wa").forEach(a => { a.href = wa; a.target = "_blank"; a.rel = "noopener"; });
  $$(".js-qr").forEach(box => {
    if (wa && window.QRCode) new QRCode(box, { text: wa, width: 440, height: 440, colorDark: "#0B1A3F", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
    else box.innerHTML = `<div class="qr__placeholder"><img src="images/gamma-logo.png" alt="">QR code appears here once the group link is added</div>`;
  });
  const seq = [...SITE.chant.split(",").map(s => s.trim()), SITE.motto];
  $$(".js-chant").forEach(t => { t.innerHTML = [...seq, ...seq].map(s => `<span>${esc(s)}</span>`).join(""); });

  /* ---------- Scoring ---------- */
  const scored = past.filter(e => RESULTS[e.id] && RESULTS[e.id].placing);
  const pointsIn = (e, h) => { const i = RESULTS[e.id].placing.indexOf(h); return i < 0 ? 0 : PTS[i]; };
  const table = HOUSES.map(h => {
    const sports = scored.filter(e => !isCo(e)).reduce((t, e) => t + pointsIn(e, h), 0);
    const co = scored.filter(isCo).reduce((t, e) => t + pointsIn(e, h), 0);
    return { house: h, sports, co, total: sports + co };
  }).sort((a, b) => b.total - a.total);
  const gamma = table.find(r => r.house === "Gamma");
  const wins = scored.filter(e => RESULTS[e.id].placing[0] === "Gamma");

  /* Gamma winners per event */
  const members = new Set(GAMMA_MEMBERS.map(n => n.trim().toLowerCase()));
  const gammaWinners = e => {
    const r = RESULTS[e.id]; if (!r) return [];
    if (r.gammaWinners) return r.gammaWinners;
    if (r.type === "team") return r.categories.flatMap(([cat, ...w]) => w.map((h, i) => h === "Gamma" ? { name: cat, place: i + 1 } : null)).filter(Boolean);
    if (r.type === "individual") return r.categories.flatMap(([cat, ...w]) => w.map((n, i) => n && members.has(n.toLowerCase()) ? { name: n, note: cat, place: i + 1 } : null)).filter(Boolean);
    return [];
  };

  /* Best sports player: most individual medals, then golds, then silvers */
  const best = (() => {
    const tally = {};
    past.filter(e => !isCo(e) && RESULTS[e.id]?.type === "individual").forEach(e => {
      gammaWinners(e).forEach(w => {
        const t = tally[w.name] ||= { name: w.name, medals: 0, p: [0, 0, 0], list: [] };
        t.medals++; t.p[w.place - 1]++; t.list.push({ event: e.name.replace("Interhouse ", ""), place: w.place, cat: w.note });
      });
    });
    return Object.values(tally).sort((a, b) => b.medals - a.medals || b.p[0] - a.p[0] || b.p[1] - a.p[1])[0] || null;
  })();

  /* ---------- Shared pieces ---------- */
  const formUrl = e => {
    if (e.form) return e.form;
    const base = (SITE.participationForm || "").trim();
    if (!base) return "";
    if (SITE.formEventEntry && base.includes("docs.google.com/forms")) {
      const u = new URL(base); u.searchParams.set("usp", "pp_url"); u.searchParams.set(SITE.formEventEntry, e.name); return u.toString();
    }
    return base;
  };
  const signup = e => formUrl(e)
    ? `<a class="btn btn--cyan btn--sm" href="${esc(formUrl(e))}" target="_blank" rel="noopener">Sign up to participate</a>`
    : `<span class="pending-pill">Sign-up form opens soon</span>`;
  const soon = e => { const n = daysUntil(e.d); return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `In ${n} days`; };
  const facts = e => `<dl class="facts">
    <div><dt>Date</dt><dd>${fmt(e.d)}</dd></div>
    <div><dt>Timing</dt><dd>${e.timing ? rich(e.timing) : `<span class="tba">To be confirmed</span>`}</dd></div>
    <div><dt>Eligibility</dt><dd>${e.grades ? `Grades ${esc(e.grades)}` : `<span class="tba">To be confirmed</span>`}</dd></div>
    <div><dt>Format</dt><dd>Interhouse${e.note ? ` · ${esc(e.note)}` : ""}</dd></div>
  </dl>${isCo(e) ? `<div class="signup">${signup(e)}</div>` : ""}`;

  const card = (e, i) => `
    <article class="card reveal">
      <div class="card__media">${imgTag(photoFor(e, i), "", "card__img")}
        <span class="tag tag--${e.category}">${CATEGORIES[e.category]}</span>
      </div>
      <div class="card__body">
        <div class="card__top">
          <div class="card__date"><span class="card__day">${e.d.getDate()}</span><span class="card__month">${MONTHS[e.d.getMonth()]} ${e.d.getFullYear()}<br>${DAYS[e.d.getDay()]}</span></div>
          <span class="card__soon">${soon(e)}</span>
        </div>
        <h3>${rich(e.name)}</h3>
        <dl>
          <div><dt>Time</dt><dd>${e.timing ? rich(e.timing) : "To be confirmed"}</dd></div>
          <div><dt>Who</dt><dd>${e.grades ? `Grades ${esc(e.grades)}` : "To be confirmed"}</dd></div>
        </dl>
        <div class="card__actions">
          <button class="link-btn" data-open="${e.id}">Learn more <span aria-hidden="true">→</span></button>
          ${isCo(e) && formUrl(e) ? `<a class="link-btn" href="${esc(formUrl(e))}" target="_blank" rel="noopener">Sign up</a>` : ""}
        </div>
      </div>
    </article>`;

  const cupHTML = () => `
    <div class="cup__glow" aria-hidden="true"></div>
    <div class="cup__icon">${TROPHY}</div>
    <div class="cup__text">
      <p class="cup__eyebrow">Champions ${esc(SITE.title.year)}</p>
      <p class="cup__title">${esc(SITE.title.name)}</p>
      <p class="cup__sub">Gamma won the ${esc(SITE.title.name)} for ${esc(SITE.title.year)}. This year, we defend it.</p>
    </div>
    <img class="cup__logo" src="images/gamma-logo.png" alt="" width="362" height="297">`;

  const filters = {};
  const setupChips = (render) => $$(".chips").forEach(box => {
    const target = box.dataset.target; filters[target] = "all";
    box.innerHTML = [["all", "All"], ...Object.entries(CATEGORIES)].map(([k, v]) => `<button class="chip" aria-pressed="${k === "all"}" data-cat="${k}">${v}</button>`).join("");
    box.addEventListener("click", ev => {
      const b = ev.target.closest(".chip"); if (!b) return;
      $$(".chip", box).forEach(c => c.setAttribute("aria-pressed", c === b));
      filters[target] = b.dataset.cat; render[target]();
    });
  });
  const match = (target, e) => filters[target] === "all" || e.category === filters[target];

  /* ---------- HOME ---------- */
  if (page === "home") {
    $("#cup-badge").innerHTML = `<span aria-hidden="true">🏆</span> ${esc(SITE.title.name)} Champions ${esc(SITE.title.year)}`;
    $("#cup").innerHTML = cupHTML();
    $("#hero-stats").innerHTML = `
      <div class="stat"><b>${gamma.total}</b><span>House points</span></div>
      <div class="stat"><b>${wins.length}</b><span>Event wins</span></div>
      <div class="stat"><b>${scored.length}</b><span>Events done</span></div>`;
    const next = upcoming[0];
    if (next) {
      const n = daysUntil(next.d);
      $("#nextup").innerHTML = `
        <div class="nextup__count"><b id="count">${reduced ? n : 0}</b><small>${n === 1 ? "day" : "days"}</small></div>
        <p class="nextup__label">Next up</p>
        <p class="nextup__name">${rich(next.name)}</p>
        <p class="nextup__meta">${fmt(next.d)}</p>`;
      if (!reduced && n > 0) {
        const el = $("#count"), t0 = performance.now() + 900;
        const tick = t => { const p = Math.min(1, Math.max(0, (t - t0) / 900)); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    } else $("#nextup").hidden = true;
    $("#home-upcoming").innerHTML = upcoming.slice(0, 3).map(card).join("") || `<p class="empty">No upcoming events right now.</p>`;

    const figs = GALLERY.map((p, i) => `<figure>
      <button class="gal-btn" data-i="${i}" aria-label="Open photo: ${esc(p.caption)}">
        <img data-ph="Photo coming soon" src="images/gallery/thumbs/${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy" width="720" height="540">
      </button><figcaption>${esc(p.caption)}</figcaption></figure>`);
    $("#gallery").innerHTML = figs.join("");
    const LIMIT = 9, all = $$("#gallery figure");
    if (all.length > LIMIT) {
      all.slice(LIMIT).forEach(f => f.hidden = true);
      const more = document.createElement("button");
      more.className = "btn btn--royal gallery-more"; more.textContent = `Show all ${all.length} photos`;
      more.addEventListener("click", () => { all.forEach(f => f.hidden = false); more.remove(); });
      $("#gallery-block").append(more);
    }
    const lb = $("#lightbox"); let cur = 0;
    const show = i => { cur = (i + GALLERY.length) % GALLERY.length; const p = GALLERY[cur]; $("#lb-img").src = `images/gallery/${p.src}`; $("#lb-img").alt = p.caption; $("#lb-cap").textContent = p.caption; };
    $("#gallery").addEventListener("click", ev => { const b = ev.target.closest(".gal-btn"); if (!b) return; show(+b.dataset.i); lb.showModal(); });
    $(".lb-prev").addEventListener("click", () => show(cur - 1));
    $(".lb-next").addEventListener("click", () => show(cur + 1));
    lb.addEventListener("keydown", ev => { if (ev.key === "ArrowLeft") show(cur - 1); if (ev.key === "ArrowRight") show(cur + 1); });
    lb.addEventListener("click", ev => { if (ev.target === lb) lb.close(); });
  }

  /* ---------- EVENTS ---------- */
  if (page === "events") {
    $("#upcoming-cards").innerHTML = upcoming.slice(0, 6).map(card).join("") || `<p class="empty">No upcoming events right now. Check back soon.</p>`;
    const renderSeason = () => {
      const groups = {};
      upcoming.filter(e => match("season", e)).forEach(e => { (groups[`${MONTHS_FULL[e.d.getMonth()]} ${e.d.getFullYear()}`] ||= []).push(e); });
      $("#season-list").innerHTML = Object.entries(groups).map(([m, es]) => `
        <div class="month"><h3 class="month__title">${m}</h3>${es.map(e => `
          <button class="row" data-open="${e.id}">
            <span class="row__date">${e.d.getDate()} ${MONTHS[e.d.getMonth()]}<small>${DAYS[e.d.getDay()].slice(0, 3)}</small></span>
            <span class="row__name">${rich(e.name)}<small>${[e.grades ? `Grades ${esc(e.grades)}` : "", e.timing ? rich(e.timing) : ""].filter(Boolean).join(" · ") || "Interhouse event"}</small></span>
            <span class="tag tag--${e.category}">${CATEGORIES[e.category]}</span>
          </button>`).join("")}</div>`).join("") || `<p class="empty">No upcoming events in this category.</p>`;
    };
    setupChips({ season: renderSeason }); renderSeason();
  }

  /* ---------- INFO ---------- */
  if (page === "info") {
    $("#abbr-key").innerHTML = Object.entries(ABBREVIATIONS).map(([k, v]) => `<span><b>${k}</b> ${v}</span>`).join("");
    const gen = (SITE.participationForm || "").trim();
    $("#signup-banner").innerHTML = `
      <img class="signup-banner__img" src="images/gallery/thumbs/live-band.jpg" alt="" width="720" height="540" loading="lazy">
      <div class="signup-banner__text"><p class="signup-banner__title">Taking part in a co-curricular event?</p>
      <p>Debates, PoetrArt, extempore, film, quizzes and more. Register through the house sign-up form. This form is for co-curricular events only, not sports.</p>
      ${gen ? `<a class="btn btn--royal" href="${esc(gen)}" target="_blank" rel="noopener">Open sign-up form</a>` : `<span class="pending-pill pending-pill--lg">Sign-up form opens soon</span>`}</div>`;
    const renderInfo = () => {
      $("#info-list").innerHTML = upcoming.filter(e => match("info", e)).map((e, i) => `
        <details class="acc">
          <summary>
            <span class="acc__thumb">${imgTag(photoFor(e, i), "", "")}</span>
            <span class="acc__name">${rich(e.name)}<small><span class="tag tag--${e.category}">${CATEGORIES[e.category]}</span></small></span>
            <span class="acc__when">${fmtShort(e.d)}</span>
          </summary>
          <div class="acc__body">${facts(e)}</div>
        </details>`).join("") || `<p class="empty">No upcoming events in this category.</p>`;
    };
    setupChips({ info: renderInfo }); renderInfo();
  }

  /* ---------- RESULTS ---------- */
  if (page === "results") {
    $("#cup").innerHTML = cupHTML();
    $("#points-rule").innerHTML = `Every event: <b>1st ${PTS[0]}</b> · <b>2nd ${PTS[1]}</b> · <b>3rd ${PTS[2]}</b> points`;

    const order = [table[1], table[0], table[2]];
    $("#podium").innerHTML = order.map(r => {
      const rank = table.indexOf(r);
      return `<div class="pod ${r.house === "Gamma" ? "pod--gamma" : ""}">
        <span class="pod__house">${r.house}</span>
        <span class="pod__pts">${r.total} pts</span>
        <div class="pod__block" data-h="${[92, 70, 54][rank]}"><span>${ORD[rank]}</span></div>
      </div>`;
    }).join("");
    $("#board").innerHTML = `
      <div class="table-scroll"><table>
        <thead><tr><th>House</th><th>Sports</th><th>Co-curricular</th><th>Total</th></tr></thead>
        <tbody>${table.map(r => `<tr class="${r.house === "Gamma" ? "is-gamma" : ""}"><td>${r.house}</td><td>${r.sports}</td><td>${r.co}</td><td class="total">${r.total}</td></tr>`).join("")}</tbody>
      </table></div>
      <p class="board__note">From ${scored.length} completed events: ${scored.filter(e => !isCo(e)).length} sports, ${scored.filter(isCo).length} co-curricular.</p>`;

    $("#mvp").innerHTML = best ? `
      <div class="mvp__media">${imgTag("basketball-defence.jpg", "", "")}</div>
      <div class="mvp__text">
        <p class="eyebrow">Best sports player</p>
        <p class="mvp__name">${esc(name(best.name))}</p>
        <p class="mvp__stat"><b>${best.medals}</b> medals across ${new Set(best.list.map(l => l.event)).size} events</p>
        <ul class="mvp__list">${best.list.map(l => `<li><span class="medal medal--${l.place}">${ORD[l.place - 1]}</span>${esc(l.event)} <small>${esc(l.cat)}</small></li>`).join("")}</ul>
      </div>` : `
      <div class="mvp__media">${imgTag("basketball-defence.jpg", "", "")}</div>
      <div class="mvp__text">
        <p class="eyebrow">Best sports player</p>
        <p class="mvp__name mvp__name--tbc">Announced soon</p>
        <p>The Gamma athlete with the most medals across this year's sports events.</p>
      </div>`;

    const winnersList = e => {
      const w = gammaWinners(e);
      if (!w.length) return RESULTS[e.id]?.type === "individual" ? `<p class="tba">Gamma winners list coming soon.</p>` : "";
      return `<div class="gw"><p class="gw__title">Gamma on the podium</p><ul class="gw__list">${w.sort((a, b) => a.place - b.place).map(x =>
        `<li><span class="medal medal--${x.place}">${ORD[x.place - 1]}</span><span>${esc(RESULTS[e.id].type === "team" ? x.name : name(x.name))}${x.note ? ` <small>${esc(x.note)}</small>` : ""}</span></li>`).join("")}</ul></div>`;
    };

    const renderResults = () => {
      $("#results-list").innerHTML = past.filter(e => !e.noResults && match("results", e)).map((e, i) => {
        const r = RESULTS[e.id];
        const p = r && r.placing ? r.placing.indexOf("Gamma") : -1;
        const badge = p < 0
          ? `<div class="place place--pending">Results<br>soon</div>`
          : `<div class="place place--${p + 1}" aria-label="Gamma placed ${ORD[p]}">${ORD[p]}<small>Gamma</small></div>`;
        let body = "";
        if (r && r.placing) {
          body += `<div class="houses">${r.placing.map((h, j) => `<span class="house-pill ${h === "Gamma" ? "is-gamma" : ""}">${ORD[j]} ${h} · ${PTS[j]} pts</span>`).join("")}</div>`;
          if (r.houses) {
            const g = r.houses.find(x => x.house === "Gamma");
            const words = r.type === "team" ? ["first", "second", "third"] : ["gold", "silver", "bronze"];
            const c = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
            body += `<p class="result__line">Gamma took <strong>${c(g.gold, words[0])}, ${c(g.silver, words[1])}, and ${c(g.bronze, words[2])}</strong>.</p>`;
          }
          body += winnersList(e);
        } else if (r && r.type === "pending") {
          body += `<p class="tba">Results will be announced soon.</p>`;
          if (r.participants) body += `<div class="gw"><p class="gw__title">Team Gamma</p><ul class="gw__list gw__list--plain">${r.participants.map(n => `<li>${esc(n)}</li>`).join("")}</ul></div>`;
        } else body += `<p class="tba">Results will be announced soon.</p>`;
        return `<article class="result reveal ${p === 0 ? "result--win" : ""}">
          <div class="result__media">${imgTag(photoFor(e, i), "", "")}${badge}</div>
          <div class="result__body">
            <span class="tag tag--${e.category}">${CATEGORIES[e.category]}</span>
            <h3>${rich(e.name)}</h3>
            <p class="result__date">${fmtShort(e.d)}</p>
            ${body}
          </div>
        </article>`;
      }).join("") || `<p class="empty">No results in this category yet.</p>`;
      reveal();
    };
    setupChips({ results: renderResults }); renderResults();

    const pods = $$(".pod__block");
    if (reduced) pods.forEach(b => { b.style.height = `${b.dataset.h}%`; });
    else {
      const pio = new IntersectionObserver(en => { if (en.some(x => x.isIntersecting)) { pods.forEach(b => { b.style.height = `${b.dataset.h}%`; }); pio.disconnect(); } }, { threshold: 0.3 });
      pio.observe($("#podium"));
    }
  }

  /* ---------- Modal ---------- */
  const modal = $("#event-modal");
  document.addEventListener("click", ev => {
    const b = ev.target.closest("[data-open]"); if (!b) return;
    const e = events.find(x => x.id === b.dataset.open);
    $("#modal-body").innerHTML = `
      <div class="modal__media">${imgTag(photoFor(e), "", "")}</div>
      <div class="modal__inner"><span class="tag tag--${e.category}">${CATEGORIES[e.category]}</span>
      <h3 id="modal-title">${rich(e.name)}</h3>${facts(e)}</div>`;
    placeholders();
    modal.showModal();
  });
  modal.addEventListener("click", ev => { if (ev.target === modal) modal.close(); });

  reveal();
})();
