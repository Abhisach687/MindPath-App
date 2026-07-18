# MindPath — Daily Skills & Reflection

A privacy-first, dependency-free single-page web app for guided self-reflection and skills practice. It includes original, evidence-informed exercises inspired by:

- Cognitive Behavioural Therapy (CBT)
- Dialectical Behaviour Therapy (DBT)
- Solution-Focused Therapy (SFT)
- Acceptance and Commitment Therapy (ACT)
- Metacognitive Therapy (MCT)
- Mindfulness-Based Cognitive Therapy (MBCT)

> MindPath is an educational self-help tool, not a medical device, therapist, diagnostic system, or crisis service.

## Run the app

The app works as static files. For the best experience—including offline caching—serve the folder locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

You can also open `index.html` directly, although some browsers restrict service workers and file downloads on `file://` pages.

## Main features

- **43 guided exercises** with detailed purpose, rationale, appropriate use, step-by-step guidance, tips, cautions, and a custom form.
- **Weekly wellbeing map** using original, non-diagnostic questions across mood, worry, rumination, sleep, energy, emotional intensity, avoidance, relationships, self-criticism, values, attention, and functioning.
- **Safety interruption** when the user reports self-harm thoughts, inability to stay safe, or uncertainty about safety.
- **Daily check-in** for mood, anxiety, energy, stress, sleep, emotion intensity, avoidance, connection, focus, and an optional note.
- **Adaptive daily plan** recommending 2–5 exercises based on weekly needs, daily state, prior usefulness, recency, variety, time, difficulty, and high-distress safeguards.
- **Full exercise library** so users may always choose a non-recommended exercise.
- **History** for check-ins, weekly maps, and exercise responses, with search, filtering, detailed record views, and deletion.
- **Analytics** with 14-day trend lines, modality completion bars, a weekly support radar, practice metrics, and recommender explanations.
- **On-device NLP** using transparent tokenization, lexicons, limited negation handling, phrase patterns, keyword frequency, emotion vocabulary counts, and recent-versus-prior language comparison.
- **Lightweight online learning**: helpfulness scores adjust modality and skill-target weights stored in the browser.
- **Data controls**: JSON export/import, individual record deletion, session-draft clearing, and full reset.
- **Offline-ready PWA shell** using a service worker and web manifest.

## Storage model

- `localStorage`: settings, check-ins, weekly maps, completed exercise entries, and learned preference weights.
- `sessionStorage`: unfinished worksheet drafts and the current day’s temporary recommendation set.
- No account, server, analytics tracker, external AI call, or cloud database is used.

Data stored in browser storage is not encrypted. Anyone with access to the browser profile may be able to view it. Clearing site data can remove records, so export backups when needed.

## Recommendation model

The recommendation score is intentionally understandable rather than opaque:

1. Weekly support-area scores establish broad priorities.
2. Today’s check-in changes the immediate weights.
3. Optional note keywords add small, bounded adjustments.
4. Exercises that received higher helpfulness scores gain preference weight.
5. Recently repeated exercises receive a penalty to encourage variety.
6. Shorter and easier exercises are favored when energy is low.
7. Advanced or potentially activating exercises are suppressed when distress or a safety flag is high.
8. The selection tries to include modality variety and at least one short practice.

This is not clinical treatment matching. A clinician should make treatment decisions.

## NLP and “frontend ML” limits

The language report is a deterministic, browser-only model. It does not understand the user like a clinician and must not be presented as diagnosis, risk prediction, personality inference, or objective emotional truth. It provides prompts such as:

- frequent non-stopword keywords;
- relative positive/negative word balance;
- visible anxiety, sadness, anger, shame, hope, and connection vocabulary;
- possible absolute, rigid-rule, catastrophic, or mind-reading wording;
- change in the simple language index between the recent and preceding seven-day windows.

The adaptive recommender uses bounded weight updates from explicit helpfulness ratings. This is a lightweight online-learning technique, not a trained clinical machine-learning model.

## Safety requirements before public deployment

A production release should be reviewed by licensed clinicians, privacy/security professionals, accessibility testers, and legal counsel. It should also add:

- country-aware, verified crisis resources maintained by a responsible service;
- age and consent rules;
- clinical governance and incident response;
- encryption or a secure backend if accounts/sync are introduced;
- validated usability and harm testing with intended users;
- content localization and cultural review;
- WCAG testing with keyboard, screen-reader, zoom, and cognitive accessibility users;
- a clear process for updating clinical content and references.

## Content approach and references

The worksheets are original formulations. They do not reproduce proprietary worksheets. The app structure was informed by publicly described principles and techniques from recognized sources, including:

- NHS Every Mind Matters, “Thought record”: https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/thought-record/
- NHS Every Mind Matters, self-help CBT techniques: https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/
- Association for Contextual Behavioral Science, ACT and six core processes: https://contextualscience.org/act and https://contextualscience.org/six_core_processes_act
- Oxford Mindfulness, MBCT overview: https://oxfordmindfulness.org/course/mindfulness-based-cognitive-therapy-for-depression-mbct-2
- Centre for Clinical Interventions, attention training/worry materials: https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself/Worry-and-Rumination
- Peer-reviewed overview of solution-focused approaches: https://pmc.ncbi.nlm.nih.gov/articles/PMC10098109/
- Peer-reviewed discussion of worry postponement and MCT: https://pmc.ncbi.nlm.nih.gov/articles/PMC11303915/
- Behavioral Tech / DBT information: https://behavioraltech.org/

## File map

- `index.html` — application shell and accessible interface structure
- `styles.css` — responsive light/dark UI
- `exercises.js` — complete exercise content and form schemas
- `app.js` — state, recommendations, forms, history, NLP, charts, import/export
- `manifest.json` — installable app metadata
- `sw.js` — offline cache
- `favicon.svg` — app icon

## Suggested next production step

Split the code into modules, add automated browser tests, introduce schema validation for imports, run a clinical content audit, and package it with a secure deployment process. The current build is a complete static prototype intended for local evaluation.
