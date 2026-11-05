/* =====================================================================
   THE STORY  |  reusable case-study timeline (vanilla JS, styles included)
   Loaded once per page:  <script src="../assets/story/the-story.js"></script>
   Then drop <div data-story-mount="key"></div> where a story should appear.
   To add a client, add an entry to STORIES below. Photo paths are relative
   to the page that mounts the story (the case studies live in portfolio/).
   Fonts (Architects Daughter, Nunito) come from the host page.
   ===================================================================== */

/* ---- styles: injected once, scoped to .tgs ---- */
(function () {
  if (document.getElementById("tgs-styles")) return;
  var st = document.createElement("style");
  st.id = "tgs-styles";
  st.textContent = `
/* ---------- tokens (light, then dark via prefers-color-scheme) ---------- */
.tgs{
  --card:#ffffff; --text:#3a3a3a; --soft:#585858; --line:#d6cfc2;
  --ac1:#5d4037; --ac2:#a9744c; --cream:#f3eac8; --chipText:#4a342c;
  --ink:#5d4037; --stroke:#a9744c; --nodeFillIcon:#f3eac8;
  --frame:#fffdf8; --tape:rgba(243,234,200,.92);
  --shadow:0 10px 28px rgba(58,40,30,.09), 0 2px 0 rgba(93,64,55,.05);
  --ease:cubic-bezier(0.22,0.61,0.36,1);
  --spring:cubic-bezier(0.34,1.56,0.64,1);
  --hand:'Architects Daughter','Comic Sans MS',cursive;
  --gap:28px;
  container-type:inline-size; container-name:tgsw;
  display:block; max-width:1040px; margin:0 auto; padding:0;
  font-family:'Nunito',system-ui,-apple-system,'Segoe UI',sans-serif;
  color:var(--text); line-height:1.5; -webkit-font-smoothing:antialiased;
}
@media (prefers-color-scheme:dark){
  .tgs{
    --card:#333333; --text:#dcdcdc; --soft:#bdbdbd; --line:#4b4640;
    --ac1:#e0b083; --ac2:#f0cda6; --cream:#4a4033; --chipText:#f0cda6;
    --ink:#e0b083; --stroke:#e0b083; --nodeFillIcon:#2b2b2b;
    --frame:#efe8dc; --tape:rgba(240,205,166,.55);
    --shadow:0 12px 30px rgba(0,0,0,.38);
  }
}
.tgs *,.tgs *::before,.tgs *::after{box-sizing:border-box}

/* ---------- header ---------- */
.tgs-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap}
.tgs-title{font-family:var(--hand);font-weight:400;font-size:clamp(26px,5cqi,34px);line-height:1.1;margin:0;color:var(--text)}
.tgs-hint{font-family:var(--hand);font-size:16px;color:var(--soft);margin:6px 0 0}
.tgs button:focus-visible{outline:3px solid var(--stroke);outline-offset:3px}

/* ---------- body: optional polaroid + the timeline stage ---------- */
.tgs-body{margin-top:26px}
.tgs-body.has-photo{display:grid;grid-template-columns:minmax(220px,290px) minmax(0,1fr);column-gap:64px;align-items:center;margin-top:40px}
.tgs-stage{container-type:inline-size;container-name:tgs;min-width:0}

.tgs-photo{
  position:relative;margin:0;padding:12px 12px 0;background:var(--frame);border-radius:6px;
  box-shadow:0 14px 30px rgba(58,40,30,.16),0 2px 0 rgba(93,64,55,.06);
  transform:rotate(-3deg);justify-self:center;width:100%;cursor:pointer;
}
.tgs-photo::before{
  content:"";position:absolute;top:-13px;left:50%;width:92px;height:26px;
  transform:translateX(-50%) rotate(3deg);background:var(--tape);box-shadow:0 1px 2px rgba(0,0,0,.08);
}
.tgs-photo img{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover;border-radius:2px;background:#e9e2d4}
.tgs-photo.no-cap{padding-bottom:46px}
.tgs-photo figcaption{font-family:var(--hand);font-size:19px;line-height:1.2;color:#4a342c;text-align:center;padding:10px 4px 14px}
@container tgsw (max-width:759px){
  .tgs-body.has-photo{grid-template-columns:minmax(0,1fr);margin-top:36px}
  .tgs-photo{width:min(250px,74%);margin-bottom:40px}
}

/* ---------- track + beats ---------- */
.tgs-track{position:relative}
.tgs[data-loop] .tgs-track{padding-top:70px}
.tgs-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:var(--gap)}
.tgs-beat{display:flex;flex-direction:column;min-width:0}
.tgs-rail{display:flex;align-items:center;height:52px}

.tgs-node{
  appearance:none;padding:0;flex:none;position:relative;display:grid;place-items:center;
  width:52px;height:52px;border-radius:50%;background:var(--card);
  border:2.5px solid var(--stroke);color:var(--ink);cursor:pointer;
}
.tgs-node::before{content:"";position:absolute;inset:-2.5px;border-radius:50%;background:linear-gradient(135deg,var(--ac1),var(--ac2));opacity:0}
.tgs-node svg{position:relative;width:30px;height:30px;overflow:visible;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transform-origin:50% 62%;transition:transform .3s var(--spring)}
.tgs-node:hover svg{transform:scale(1.12)}
.tgs .fillme{fill:currentColor;fill-opacity:0}
.tgs .bloompart ellipse{fill:currentColor;fill-opacity:.25}
.tgs .bloompart circle{fill:currentColor}

/* the last beat is where the story lands: its node fills in */
.tgs-beat:last-child .tgs-node{color:var(--nodeFillIcon);border-color:transparent}
.tgs-beat:last-child .tgs-node::before{opacity:1}
.tgs-beat:last-child .fillme{fill-opacity:.3}

.tgs-seg{flex:1;height:24px;margin:0 calc(8px - var(--gap)) 0 8px;min-width:0;position:relative}
.tgs-seg .tgs-clip{position:absolute;inset:0}
.tgs-clip{display:block;width:100%;height:100%}
.tgs-seg svg{width:100%;height:100%;overflow:visible;fill:none}
.tgs-seg path,.tgs-loop path{stroke:var(--stroke);stroke-width:3;stroke-linecap:round;vector-effect:non-scaling-stroke;fill:none}
.tgs-seg .seg-v{display:none}

.tgs-card{
  margin-top:18px;background:var(--card);border:1px solid var(--line);border-radius:18px;
  padding:16px 20px 18px;box-shadow:var(--shadow);flex:1;
}
.tgs-chip{
  display:inline-block;background:var(--cream);color:var(--chipText);
  font-weight:800;font-size:12px;letter-spacing:.05em;text-transform:uppercase;
  padding:5px 11px;border-radius:999px;transform:rotate(-2deg);margin-bottom:10px;
  box-shadow:0 1px 0 rgba(93,64,55,.2);
}
.tgs-beat-title{font-family:var(--hand);font-weight:400;font-size:23px;line-height:1.2;margin:0 0 6px;color:var(--ink)}
.tgs-text{margin:0;font-size:16px;line-height:1.55;color:var(--soft)}
.tgs-text--lead{font-family:var(--hand);font-size:20px;line-height:1.45;color:var(--text)}
.tgs-mark{color:inherit;background:linear-gradient(var(--cream),var(--cream)) no-repeat 0 90%/100% 55%;padding:0 3px;border-radius:3px}

/* ---------- loop: the line that closes the circle ---------- */
.tgs-loop{position:absolute;pointer-events:none;z-index:1;left:0;top:0;width:0;height:0}
.tgs-loop .tgs-clip{position:absolute;inset:0}
.tgs-loop svg.arc{width:100%;height:100%;overflow:visible;fill:none}
.tgs-loop path{stroke-dasharray:.1 8}
.tgs-loop .arc-v{display:none}
.tgs-arrow{position:absolute;width:16px;height:16px;left:-8px;bottom:-5px;transform:rotate(90deg);fill:none;stroke:var(--stroke);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.tgs-loop-label{
  position:absolute;left:50%;top:-12px;transform:translateX(-50%) rotate(-2deg);white-space:nowrap;
  font-family:var(--hand);font-size:17px;color:var(--chipText);background:var(--cream);
  padding:3px 14px;border-radius:999px;box-shadow:0 1px 0 rgba(93,64,55,.2);
}

/* ---------- takeaway (optional) ---------- */
.tgs-take{display:flex;align-items:center;gap:12px;margin:30px 0 0;font-family:var(--hand);font-size:clamp(19px,3.4cqi,24px);line-height:1.25;color:var(--ink)}
.tgs-take svg{flex:none;width:34px;height:34px;fill:none;stroke:var(--stroke);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}

/* ---------- narrow stage: the timeline turns vertical ---------- */
@container tgs (max-width:759px){
  .tgs-track{--vert:1}
  .tgs[data-loop] .tgs-track{padding:0 0 0 36px}
  .tgs-list{display:flex;flex-direction:column}
  .tgs-beat{display:grid;grid-template-columns:52px minmax(0,1fr);column-gap:14px;padding-bottom:20px}
  .tgs-beat:last-child{padding-bottom:0}
  .tgs-rail{flex-direction:column;height:auto;align-items:center;grid-column:1;grid-row:1}
  .tgs-card{margin-top:0;grid-column:2;grid-row:1}
  .tgs-seg{flex:1;width:24px;height:auto;min-height:24px;margin:8px 0 -12px}
  .tgs-seg .seg-h{display:none}
  .tgs-seg .seg-v{display:block}
  .tgs-loop .arc-h{display:none}
  .tgs-loop .arc-v{display:block}
  .tgs-arrow{left:auto;right:-7px;top:-8px;bottom:auto;transform:none}
  .tgs-loop-label{left:4px;top:50%;transform:translate(-50%,-50%) rotate(180deg);writing-mode:vertical-rl;padding:14px 3px}
}

/* ---------- motion: everything below only applies while "armed" ---------- */
/* No JS, or reduced motion: none of this applies, so the full story simply shows. */
.tgs.is-armed .tgs-photo{opacity:0;transform:translateY(-22px) rotate(-9deg) scale(1.04)}
.tgs.is-armed .tgs-photo img{filter:brightness(1.55) saturate(0) contrast(.6)}
.tgs.is-armed .tgs-beat .tgs-card{opacity:0;transform:translateX(-14px)}
.tgs.is-armed .tgs-beat .tgs-node{opacity:0;transform:scale(.55)}
.tgs.is-armed .tgs-seg .tgs-clip{clip-path:inset(0 100% 0 0)}
.tgs.is-armed .tgs-loop .tgs-clip{clip-path:inset(0 0 0 100%)}
.tgs.is-armed .tgs-loop-label,.tgs.is-armed .tgs-arrow{opacity:0}
.tgs.is-armed .tgs-take{opacity:0;transform:translateY(8px)}
.tgs.is-armed .tgs-hint{opacity:0}
.tgs.is-armed:not(.flourish) .tgs-beat:last-child .tgs-node{color:var(--ink);border-color:var(--stroke)}
.tgs.is-armed:not(.flourish) .tgs-beat:last-child .tgs-node::before{opacity:0}
.tgs.is-armed:not(.flourish) .tgs-beat:last-child .fillme{fill-opacity:0}
.tgs.is-armed:not(.flourish) .bloompart{transform:scale(0)}
.tgs.is-armed:not(.flourish) .tgs-mark{background-size:0% 55%}
.tgs .bloompart{transform-box:fill-box;transform-origin:50% 60%}
@container tgs (max-width:759px){
  .tgs.is-armed .tgs-seg .tgs-clip{clip-path:inset(0 0 100% 0)}
  .tgs.is-armed .tgs-loop .tgs-clip{clip-path:inset(100% 0 0 0)}
}

.tgs.is-armed .tgs-node{transition:opacity .4s var(--ease),transform .6s var(--spring),color .7s var(--ease),border-color .7s var(--ease)}
.tgs.is-armed .tgs-node::before{transition:opacity .7s var(--ease)}
.tgs.is-armed .fillme{transition:fill-opacity .7s var(--ease)}

.tgs.is-armed.photo-on .tgs-photo{opacity:1;transform:rotate(-3deg);transition:opacity .45s var(--ease),transform .9s var(--spring)}
.tgs.is-armed.photo-on .tgs-photo img{filter:none;transition:filter 2.2s var(--ease) .35s}
.tgs.is-armed .tgs-beat.on .tgs-card{opacity:1;transform:none;transition:opacity .7s var(--ease),transform .7s var(--ease)}
.tgs.is-armed .tgs-beat.on .tgs-node{opacity:1;transform:none}
.tgs.is-armed .tgs-beat.seg-on .tgs-seg .tgs-clip{clip-path:inset(0);transition:clip-path .9s var(--ease)}
.tgs.is-armed.flourish .tgs-loop .tgs-clip{clip-path:inset(0);transition:clip-path 1.5s var(--ease)}
.tgs.is-armed.flourish .tgs-loop-label{opacity:1;transition:opacity .5s var(--ease) 1s}
.tgs.is-armed.flourish .tgs-arrow{opacity:1;transition:opacity .4s var(--ease) 1.3s}
.tgs.is-armed.flourish .bloompart{transform:scale(1);transition:transform .9s var(--spring) .15s}
.tgs.is-armed.flourish .tgs-mark{transition:background-size .9s var(--ease) .2s}
.tgs.is-armed.take-on .tgs-take{opacity:1;transform:none;transition:opacity .7s var(--ease),transform .7s var(--ease)}
.tgs.is-armed.done .tgs-hint{opacity:1;transition:opacity .7s var(--ease)}

/* tiny delight moments (tap a beat, or shake the polaroid) */
@keyframes tgs-spin{0%{transform:rotate(0) scale(1)}55%{transform:rotate(400deg) scale(1.22)}100%{transform:rotate(360deg) scale(1)}}
@keyframes tgs-wobble{0%,100%{transform:rotate(0)}20%{transform:rotate(-16deg) scale(1.1)}45%{transform:rotate(12deg) scale(1.1)}70%{transform:rotate(-6deg)}}
@keyframes tgs-grow{0%{transform:scale(1)}35%{transform:scale(1.3) rotate(-6deg)}65%{transform:scale(.96) rotate(4deg)}100%{transform:scale(1)}}
@keyframes tgs-shake{0%,100%{transform:rotate(-3deg)}20%{transform:rotate(1.5deg) translateX(3px)}40%{transform:rotate(-7deg) translateX(-3px)}60%{transform:rotate(-.5deg)}80%{transform:rotate(-4.5deg)}}
.tgs-node[data-delight="spin"].go svg{animation:tgs-spin .9s var(--spring)}
.tgs-node[data-delight="wobble"].go svg{animation:tgs-wobble .8s var(--ease)}
.tgs-node[data-delight="grow"].go svg{animation:tgs-grow 1s var(--spring)}
.tgs .tgs-photo.shake{animation:tgs-shake .7s var(--ease)}

/* resets with no flicker */
.tgs-instant,.tgs-instant *,.tgs-instant *::before{transition:none !important;animation:none !important}

/* static (reduced motion) version */
.tgs.is-static .tgs-hint{display:none}
.tgs.is-static .tgs-node,.tgs.is-static .tgs-photo{cursor:default}
@media (prefers-reduced-motion:reduce){
  .tgs *,.tgs *::before,.tgs *::after{transition:none !important;animation:none !important}
}
`;
  document.head.appendChild(st);
})();

/* ---- component ---- */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     ICONS: simple hand-drawn SVGs (40x40 grid, stroke = currentColor)
     ------------------------------------------------------------------ */
  var GROUND = '<path d="M10 34H30"/>';
  var ICONS = {
    guitar: '<g transform="rotate(35 20 20)"><path class="fillme" d="M20 15C16 15 14.5 17 15 19.5C15.4 21.5 13 22 12.5 25C11.8 29.5 15 33 20 33C25 33 28.2 29.5 27.5 25C27 22 24.6 21.5 25 19.5C25.5 17 24 15 20 15Z"/>' +
            '<path d="M20 15V7" stroke-width="2.6"/><path d="M18.4 7.5V2.5H21.6V7.5Z"/><circle cx="20" cy="24.5" r="2.4"/><path d="M17.5 29.5H22.5"/></g>',
    drum: '<path class="fillme" d="M9 15V28C9 30.2 14.4 32 20 32S31 30.2 31 28V15C31 17.2 25.6 19 20 19S9 17.2 9 15Z"/><ellipse cx="20" cy="15" rx="11" ry="4"/><path d="M15 20.5V31M20 19.5V32M25 20.5V31" stroke-width="1.6"/><path d="M12 4L19 12M28 4L21 12"/>',
    ticket: '<path d="M6 12H34V18A3 3 0 0 0 34 24V30H6V24A3 3 0 0 0 6 18Z"/><path d="M25 14V16M25 19V21M25 24V26" stroke-width="2"/><path d="M12 21H19"/>',
    sprout: GROUND + '<path d="M20 33V23"/><path d="M20 25C14 25 11 21 11 17C16 17 20 20 20 25Z"/><path d="M20 23C25 23 28 19.5 28 16C23 16 20 19 20 23Z"/>',
    seedling: GROUND + '<path d="M20 33V14"/><path d="M20 28C13 28 10 24 10 20C15 20 20 23 20 28Z"/><path d="M20 23C26 23 30 19 30 15C25 15 20 18 20 23Z"/><path d="M20 15C20 11 22 9 25 8C25 11 23 14 20 15Z"/>',
    bloom: GROUND + '<path d="M20 33V17"/><path d="M20 29C13 29 10 25 10 21C15 21 20 24 20 29Z"/><path d="M20 25C26 25 30 21 30 17C25 17 20 20 20 25Z"/>' +
           '<g class="bloompart"><ellipse cx="20" cy="6.5" rx="2.6" ry="3.4"/><ellipse cx="20" cy="17.5" rx="2.6" ry="3.4"/><ellipse cx="14.5" cy="12" rx="3.4" ry="2.6"/><ellipse cx="25.5" cy="12" rx="3.4" ry="2.6"/><circle cx="20" cy="12" r="2.2"/></g>'
  };

  /* ------------------------------------------------------------------
     THE STORIES: edit copy here. One entry per client.
       title      heading text (set to "" to hide the heading)
       photo      optional polaroid { src, alt, caption, ratio } shown beside the timeline
                  (ratio defaults to "4/5"; use "1/1" for a square photo)
       beats[]    text, icon, delight, plus optional title and chip (time label).
                  With no title, the text itself gets the handwritten accent style.
                  Wrap words in *asterisks* to highlight them at the finale.
                  icon: guitar | drum | ticket | sprout | seedling | bloom
                  delight (tap effect): spin | wobble | grow
       loop       { label } adds the closing "full circle" line, or null
       takeaway   optional closing line; hint: optional small line after play
       timing     optional overrides in ms (see DEFAULT_TIMING)
     ------------------------------------------------------------------ */
  var STORIES = {
    cmh: {
      title: "The story",
      photo: {
        src: "../assets/CMH%20portfolio%20page/cmh-brett-age-6.jpg",
        alt: "Brett at age 6, smiling behind a teal drum kit at Centre Music House.",
        caption: "me, age 6"
      },
      beats: [
        { icon: "drum", delight: "wobble",
          text: "At six, I took drum and guitar lessons at Centre Music House." },
        { icon: "ticket", delight: "spin",
          text: "While growing my business, I saw Centre Music had almost no online presence, so I offered Max a free trial in March 2025." },
        { icon: "guitar", delight: "wobble",
          text: "After the trial, he valued my work enough to *pay above my quoted rate*. I've been on their team ever since." }
      ],
      loop: { label: "Full circle" }
    },
    tgc: {
      title: "The story",
      photo: {
        src: "../assets/TGC%20portfolio%20page/tgc-brett-filming.jpg",
        alt: "Brett in a Garden Continuum shirt, filming a crew member spreading mulch with his phone.",
        ratio: "1/1"
      },
      beats: [
        { icon: "sprout", delight: "grow",
          text: "In January 2023, as a high school senior with no experience, I joined The Garden Continuum as a marketing intern." },
        { icon: "seedling", delight: "grow",
          text: "As an intern I learned how to market a small, local business from the ground up, earning a position as a part-time Marketing Assistant." },
        { icon: "bloom", delight: "grow",
          text: "In April 2025, as I was scaling my business, TGC transitioned *from my employer to a client*." }
      ],
      loop: null
    }
  };

  /* ------------------------------------------------------------------
     TIMING (ms). CMH runs about 10 seconds with these defaults.
       start      pause before anything appears
       photoLead  extra time the polaroid gets before beat 1 (only if a photo)
       beat       gap between each beat appearing
       seg        how long after a beat appears before its line draws
       flourish   how long after the last beat before the finale
       take       how long after the finale the takeaway fades in
     ------------------------------------------------------------------ */
  var DEFAULT_TIMING = { start: 250, photoLead: 1300, beat: 3000, seg: 1900, flourish: 2000, take: 1500 };

  /* ---------------------------- engine ---------------------------- */
  var SEG = '<span class="tgs-seg" aria-hidden="true"><span class="tgs-clip">' +
    '<svg class="seg-h" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10C12 4 22 16 34 10S58 4 68 10S90 16 100 10"/></svg>' +
    '<svg class="seg-v" viewBox="0 0 20 100" preserveAspectRatio="none"><path d="M10 0C4 12 16 22 10 34S4 58 10 68S16 90 10 100"/></svg>' +
    '</span></span>';
  var LOOP = '<div class="tgs-loop" aria-hidden="true"><span class="tgs-clip">' +
    '<svg class="arc arc-h" viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M100 60C100 -14 0 -14 0 60"/></svg>' +
    '<svg class="arc arc-v" viewBox="0 0 34 100" preserveAspectRatio="none"><path d="M34 100C-6 92 -6 8 34 0"/></svg>' +
    '</span><svg class="tgs-arrow" viewBox="0 0 16 16"><path d="M3 2L13 8L3 14"/></svg>' +
    '<span class="tgs-loop-label">__LABEL__</span></div>';
  var ARROW_DOWN = '<svg viewBox="0 0 34 34" aria-hidden="true"><path d="M17 4C15 12 19 18 17 28"/><path d="M9 21L17 29L25 21"/></svg>';

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function rich(s) { return esc(s).replace(/\*(.+?)\*/g, '<mark class="tgs-mark">$1</mark>'); }
  function plain(s) { return String(s).replace(/\*/g, ""); }

  function render(d, uid) {
    var h = [];
    h.push('<section class="tgs"' + (d.loop ? ' data-loop="1"' : '') + ' aria-labelledby="' + uid + '-t">');
    h.push('<div class="tgs-head"><div>');
    h.push('<h2 class="tgs-title" id="' + uid + '-t"' + (d.title ? '' : ' hidden') + '>' + esc(d.title || "The story") + '</h2>');
    if (d.hint) h.push('<p class="tgs-hint">' + esc(d.hint) + '</p>');
    h.push('</div></div>');
    h.push('<div class="tgs-body' + (d.photo ? ' has-photo' : '') + '">');
    if (d.photo) {
      h.push('<figure class="tgs-photo' + (d.photo.caption ? '' : ' no-cap') + '"><img src="' + esc(d.photo.src) + '" alt="' + esc(d.photo.alt || "") + '"' +
        (d.photo.ratio ? ' style="aspect-ratio:' + esc(d.photo.ratio) + '"' : ' width="640" height="800"') + ' decoding="async">' +
        (d.photo.caption ? '<figcaption>' + esc(d.photo.caption) + '</figcaption>' : '') + '</figure>');
    }
    h.push('<div class="tgs-stage"><div class="tgs-track"><ol class="tgs-list">');
    d.beats.forEach(function (b, i) {
      var last = i === d.beats.length - 1;
      h.push('<li class="tgs-beat"><div class="tgs-rail">');
      h.push('<button type="button" class="tgs-node" data-delight="' + esc(b.delight || "wobble") + '" aria-label="Play the little animation for step ' + (i + 1) + (b.title ? ': ' + esc(plain(b.title)) : '') + '">' +
        '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">' + (ICONS[b.icon] || ICONS.guitar) + '</svg></button>');
      if (!last) h.push(SEG);
      h.push('</div><div class="tgs-card">' + (b.chip ? '<span class="tgs-chip">' + esc(b.chip) + '</span>' : ''));
      if (b.title) h.push('<h3 class="tgs-beat-title">' + rich(b.title) + '</h3>');
      h.push('<p class="tgs-text' + (b.title ? '' : ' tgs-text--lead') + '">' + rich(b.text) + '</p></div></li>');
    });
    h.push('</ol>');
    if (d.loop) h.push(LOOP.replace("__LABEL__", esc(d.loop.label || "Full circle")));
    h.push('</div></div></div>');
    if (d.takeaway) h.push('<p class="tgs-take"><span>' + esc(d.takeaway) + '</span>' + ARROW_DOWN + '</p>');
    h.push('</section>');
    return h.join("");
  }

  function mount(host, key) {
    var d = STORIES[key];
    if (!d) return;
    var uid = "tgs-" + key + "-" + Math.random().toString(36).slice(2, 6);
    host.innerHTML = render(d, uid);

    var root = host.querySelector(".tgs");
    var track = root.querySelector(".tgs-track");
    var photo = root.querySelector(".tgs-photo");
    var beats = [].slice.call(root.querySelectorAll(".tgs-beat"));
    var nodes = beats.map(function (b) { return b.querySelector(".tgs-node"); });
    var loop = root.querySelector(".tgs-loop");
    var T = {};
    var k; for (k in DEFAULT_TIMING) T[k] = (d.timing && d.timing[k] != null) ? d.timing[k] : DEFAULT_TIMING[k];

    var timers = [], played = false, io = null;
    var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    /* position the closing loop between the first and last node */
    function layout() {
      if (!loop) return;
      var vert = getComputedStyle(track).getPropertyValue("--vert").trim() === "1";
      var a = nodes[0], b = nodes[nodes.length - 1];
      if (vert) {
        loop.style.left = "0px";
        loop.style.width = "36px";
        loop.style.top = (a.offsetTop + a.offsetHeight / 2) + "px";
        loop.style.height = (b.offsetTop - a.offsetTop) + "px";
      } else {
        var ax = a.offsetLeft + a.offsetWidth / 2, bx = b.offsetLeft + b.offsetWidth / 2;
        loop.style.left = ax + "px";
        loop.style.width = (bx - ax) + "px";
        loop.style.top = "6px";
        loop.style.height = (a.offsetTop - 6) + "px";
      }
    }

    function reset() {
      clearTimers();
      root.classList.add("tgs-instant");
      root.classList.remove("photo-on", "flourish", "take-on", "done");
      beats.forEach(function (b) { b.classList.remove("on", "seg-on"); });
      void root.offsetWidth;
      root.classList.remove("tgs-instant");
    }

    function play() {
      reset();
      root.classList.add("is-armed");
      var n = beats.length;
      var s = T.start + (photo ? T.photoLead : 0);
      var lastAt = s + (n - 1) * T.beat;
      if (photo) later(function () { root.classList.add("photo-on"); }, T.start);
      beats.forEach(function (b, i) {
        later(function () { b.classList.add("on"); }, s + i * T.beat);
        if (i < n - 1) later(function () { b.classList.add("seg-on"); }, s + i * T.beat + T.seg);
      });
      later(function () { root.classList.add("flourish"); }, lastAt + T.flourish);
      later(function () { root.classList.add("take-on"); }, lastAt + T.flourish + T.take - 500);
      later(function () { root.classList.add("done"); }, lastAt + T.flourish + T.take + 300);
    }

    /* jump straight to the finished story (scrolled past quickly) */
    function finish() {
      clearTimers();
      root.classList.add("is-armed", "tgs-instant");
      beats.forEach(function (b) { b.classList.add("on", "seg-on"); });
      root.classList.add("photo-on", "flourish", "take-on", "done");
      void root.offsetWidth;
      root.classList.remove("tgs-instant");
    }

    function makeStatic() {
      clearTimers();
      if (io) io.disconnect();
      root.classList.remove("is-armed");
      root.classList.add("is-static");
    }

    function retrigger(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

    /* tap a beat: one small delight moment */
    beats.forEach(function (b, i) {
      b.addEventListener("click", function () {
        if (root.classList.contains("is-static") || !b.classList.contains("on")) return;
        retrigger(nodes[i], "go");
      });
      nodes[i].addEventListener("animationend", function () { nodes[i].classList.remove("go"); }, true);
    });
    /* tap the polaroid: give it a shake */
    if (photo) {
      photo.addEventListener("click", function () {
        if (root.classList.contains("is-static")) return;
        retrigger(photo, "shake");
      });
      photo.addEventListener("animationend", function () { photo.classList.remove("shake"); });
    }


    layout();
    if (window.ResizeObserver) new ResizeObserver(layout).observe(track);
    window.addEventListener("resize", layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

    if (mq.matches) { makeStatic(); }
    else if ("IntersectionObserver" in window) {
      root.classList.add("is-armed");
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (played) return;
          if (e.isIntersecting) { played = true; io.disconnect(); play(); }
          else if (e.boundingClientRect.bottom < 0) { played = true; io.disconnect(); finish(); } /* scrolled past quickly */
        });
      }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
      io.observe(root);
    }
    if (mq.addEventListener) mq.addEventListener("change", function () { if (mq.matches) makeStatic(); });
  }

  function init() {
    [].forEach.call(document.querySelectorAll("[data-story-mount]"), function (el) {
      mount(el, el.getAttribute("data-story-mount"));
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
