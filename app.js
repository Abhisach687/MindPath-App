(() => {
  'use strict';

  const STORAGE_KEY = 'mindpathStateV1';
  const DRAFT_KEY = 'mindpathDraftsV1';
  const RECS_KEY = 'mindpathTodayRecommendationsV1';
  const MODALITY_COLORS = {
    CBT: '#4f46e5', DBT: '#c24177', SFT: '#0f9f92', ACT: '#7c5ac7', MCT: '#b7791f', MBCT: '#2878b8'
  };
  const TARGET_LABELS = {
    lowMood: 'low mood', anxiety: 'anxiety', selfCriticism: 'self-criticism', rumination: 'overthinking',
    avoidance: 'avoidance', energy: 'energy', values: 'values and direction', stress: 'stress',
    functioning: 'daily functioning', dysregulation: 'strong emotions', relationship: 'relationships',
    assertiveness: 'assertiveness', impulsivity: 'urges', hope: 'hope', mindfulness: 'mindfulness',
    attention: 'attention', sleep: 'sleep'
  };

  const ASSESSMENT_QUESTIONS = [
    { id: 'mood', domain: 'lowMood', text: 'I felt down, empty, or emotionally heavy.' },
    { id: 'interest', domain: 'lowMood', text: 'I had difficulty feeling interest or enjoyment.' },
    { id: 'worry', domain: 'anxiety', text: 'Worry felt frequent or difficult to set aside.' },
    { id: 'tension', domain: 'anxiety', text: 'I felt tense, restless, panicky, or on edge.' },
    { id: 'rumination', domain: 'rumination', text: 'I repeatedly analyzed the past or asked “why” without reaching useful action.' },
    { id: 'attention', domain: 'attention', text: 'My attention became stuck on threats, mistakes, symptoms, or intrusive thoughts.' },
    { id: 'sleep', domain: 'sleep', text: 'Sleep problems affected how I felt or functioned.' },
    { id: 'energy', domain: 'energy', text: 'Low energy made ordinary tasks harder.' },
    { id: 'emotion', domain: 'dysregulation', text: 'Emotions or urges felt intense and difficult to manage.' },
    { id: 'avoidance', domain: 'avoidance', text: 'I avoided situations, tasks, feelings, or conversations that matter.' },
    { id: 'relationship', domain: 'relationship', text: 'Communication, boundaries, or relationship stress needed support.' },
    { id: 'selfCriticism', domain: 'selfCriticism', text: 'My inner voice was harsh, shaming, or unforgiving.' },
    { id: 'values', domain: 'values', text: 'I felt disconnected from what matters or unsure how I want to move forward.' },
    { id: 'functioning', domain: 'functioning', text: 'Difficulties interfered with work, study, care tasks, or relationships.' }
  ];
  const ASSESSMENT_OPTIONS = [
    { label: 'Not at all', value: 0 }, { label: 'A few days', value: 1 },
    { label: 'About half the days', value: 2 }, { label: 'Most days', value: 3 },
    { label: 'Nearly every day', value: 4 }
  ];
  const CHECKIN_DEFS = [
    { id: 'mood', label: 'Mood', low: 'Very low', high: 'Steady / good', value: 5 },
    { id: 'anxiety', label: 'Anxiety', low: 'Calm', high: 'Very high', value: 4 },
    { id: 'energy', label: 'Energy', low: 'Depleted', high: 'Energized', value: 5 },
    { id: 'stress', label: 'Stress load', low: 'Light', high: 'Overloaded', value: 4 },
    { id: 'sleep', label: 'Sleep / restoration', low: 'Poor', high: 'Restored', value: 5 },
    { id: 'emotionIntensity', label: 'Emotion intensity', low: 'Manageable', high: 'Overwhelming', value: 4 },
    { id: 'avoidance', label: 'Urge to avoid', low: 'Low', high: 'Very strong', value: 4 },
    { id: 'connection', label: 'Connection', low: 'Disconnected', high: 'Connected', value: 5 }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const exercises = Array.isArray(window.EXERCISES) ? window.EXERCISES : [];
  let state = loadState();
  let activeExercise = null;
  let selectedHelpfulness = 3;
  let assessmentSession = null;
  let currentRoute = 'today';
  let libraryModality = 'All';
  let chartResizeTimer = null;

  function defaultState() {
    return {
      version: 1,
      settings: { nickname: '', dailyGoal: 3, theme: 'system', gentleLanguage: true, reminderEnabled: false, reminderTime: '09:00' },
      checkins: [], assessments: [], entries: [],
      preference: { modalities: {}, targets: {} },
      safetyAcknowledged: false,
      createdAt: new Date().toISOString()
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const base = defaultState();
      return {
        ...base, ...parsed,
        settings: { ...base.settings, ...(parsed.settings || {}) },
        preference: {
          modalities: { ...(parsed.preference?.modalities || {}) },
          targets: { ...(parsed.preference?.targets || {}) }
        },
        checkins: Array.isArray(parsed.checkins) ? parsed.checkins : [],
        assessments: Array.isArray(parsed.assessments) ? parsed.assessments : [],
        entries: Array.isArray(parsed.entries) ? parsed.entries : []
      };
    } catch (error) {
      console.warn('Could not read saved state', error);
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function uid(prefix = 'id') {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function localDateKey(input = new Date()) {
    const d = input instanceof Date ? input : new Date(input);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function dateFromKey(key) {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function formatDate(input, options = {}) {
    const d = input instanceof Date ? input : new Date(input);
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric', ...options }).format(d);
  }

  function formatTime(input) {
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(input));
  }

  function daysBetween(a, b) {
    const da = dateFromKey(localDateKey(a));
    const db = dateFromKey(localDateKey(b));
    return Math.round((db - da) / 86400000);
  }

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function toast(message) {
    const node = document.createElement('div');
    node.className = 'toast';
    node.textContent = message;
    $('#toastRegion').appendChild(node);
    setTimeout(() => node.remove(), 3200);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('.modal-close', modal)?.focus(), 20);
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('hidden');
    if ($$('.modal-backdrop:not(.hidden)').length === 0) document.body.style.overflow = '';
  }

  function routeTo(route) {
    const page = document.getElementById(`page-${route}`);
    if (!page) return;
    currentRoute = route;
    $$('.page').forEach(p => p.classList.remove('active'));
    page.classList.add('active');
    $$('.nav-item, .mobile-nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
    $('#pageTitle').textContent = page.dataset.title || route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route === 'library') renderLibrary();
    if (route === 'checkin') populateTodayCheckin();
    if (route === 'history') renderHistory();
    if (route === 'insights') setTimeout(renderInsights, 40);
    if (route === 'settings') populateSettings();
  }

  function applyTheme() {
    const setting = state.settings.theme || 'system';
    const dark = setting === 'dark' || (setting === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }

  function latestAssessment() {
    return [...state.assessments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
  }

  function assessmentDue() {
    const latest = latestAssessment();
    return !latest || daysBetween(latest.createdAt, new Date()) >= 7;
  }

  function todayCheckin() {
    const key = localDateKey();
    return state.checkins.find(c => c.dateKey === key) || null;
  }

  function todayEntries() {
    const key = localDateKey();
    return state.entries.filter(e => e.dateKey === key);
  }

  function computeStreak() {
    const activeDays = new Set([
      ...state.checkins.map(c => c.dateKey),
      ...state.entries.map(e => e.dateKey)
    ]);
    if (!activeDays.size) return 0;
    const today = localDateKey();
    const yesterday = localDateKey(new Date(Date.now() - 86400000));
    let cursor = activeDays.has(today) ? dateFromKey(today) : activeDays.has(yesterday) ? dateFromKey(yesterday) : null;
    if (!cursor) return 0;
    let streak = 0;
    while (activeDays.has(localDateKey(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function getNeeds() {
    const needs = {
      lowMood: 0, anxiety: 0, rumination: 0, attention: 0, sleep: 0, energy: 0,
      dysregulation: 0, avoidance: 0, relationship: 0, selfCriticism: 0, values: 0,
      functioning: 0, stress: 0, mindfulness: 0, hope: 0, assertiveness: 0, impulsivity: 0
    };
    const assessment = latestAssessment();
    if (assessment?.domains) {
      Object.entries(assessment.domains).forEach(([key, value]) => { if (key in needs) needs[key] += value; });
    }
    const checkin = todayCheckin();
    if (checkin) {
      needs.lowMood += (10 - checkin.mood) * 8;
      needs.anxiety += checkin.anxiety * 8;
      needs.energy += (10 - checkin.energy) * 8;
      needs.stress += checkin.stress * 8;
      needs.sleep += (10 - checkin.sleep) * 8;
      needs.dysregulation += checkin.emotionIntensity * 8;
      needs.impulsivity += checkin.emotionIntensity * 4;
      needs.avoidance += checkin.avoidance * 8;
      needs.relationship += (10 - checkin.connection) * 6;
      if (checkin.focus && checkin.focus in needs) needs[checkin.focus] += 35;
      const nlp = analyzeText(checkin.note || '');
      if (nlp.emotions.anxiety > 0) needs.anxiety += Math.min(20, nlp.emotions.anxiety * 3);
      if (nlp.emotions.sadness > 0) needs.lowMood += Math.min(20, nlp.emotions.sadness * 3);
      if (nlp.distortions.length) needs.rumination += Math.min(15, nlp.distortions.length * 3);
    }
    Object.keys(needs).forEach(k => needs[k] = Math.max(0, Math.min(150, needs[k])));
    return needs;
  }

  function recommendationReason(exercise, needs) {
    const ranked = exercise.targets
      .map(t => [t, needs[t] || 0])
      .sort((a, b) => b[1] - a[1]);
    const target = ranked[0]?.[0];
    if (!target || ranked[0][1] < 15) return 'Adds variety and builds a reusable skill.';
    return `Selected to support ${TARGET_LABELS[target] || target} today.`;
  }

  function isHighDistress() {
    const c = todayCheckin();
    return !!c && (c.anxiety >= 9 || c.stress >= 9 || c.emotionIntensity >= 9);
  }

  function hasSafetyFlag() {
    const a = latestAssessment();
    return !!a?.safetyFlag && daysBetween(a.createdAt, new Date()) < 7;
  }

  function generateRecommendations(force = false) {
    const today = localDateKey();
    if (!force) {
      try {
        const cached = JSON.parse(sessionStorage.getItem(RECS_KEY) || 'null');
        if (cached?.dateKey === today && Array.isArray(cached.ids)) {
          return cached.ids.map(id => exercises.find(e => e.id === id)).filter(Boolean);
        }
      } catch {}
    }
    const needs = getNeeds();
    const checkin = todayCheckin();
    const completedToday = new Set(todayEntries().map(e => e.exerciseId));
    const recentCutoff = new Date(Date.now() - 3 * 86400000);
    const recentIds = new Set(state.entries.filter(e => new Date(e.createdAt) >= recentCutoff).map(e => e.exerciseId));
    const unsafeAdvanced = hasSafetyFlag() || isHighDistress();

    const scored = exercises.map(exercise => {
      let score = 5;
      exercise.targets.forEach(target => { score += (needs[target] || 0) * 0.52; });
      score += (state.preference.modalities[exercise.modality] || 0) * 2.2;
      exercise.targets.forEach(t => score += (state.preference.targets[t] || 0) * 1.2);
      if (!recentIds.has(exercise.id)) score += 8;
      if (completedToday.has(exercise.id)) score -= 120;
      if (checkin?.energy <= 3 && exercise.minutes > 12) score -= 18;
      if (checkin?.energy <= 2 && exercise.difficulty === 'advanced') score -= 30;
      if (unsafeAdvanced && (exercise.difficulty === 'advanced' || /exposure|chain|difficult-inquiry|core-belief/.test(exercise.id))) score -= 100;
      if (exercise.minutes <= 10) score += 3;
      return { exercise, score };
    }).sort((a, b) => b.score - a.score);

    let goal = Number(state.settings.dailyGoal) || 3;
    if (checkin?.energy <= 2 || isHighDistress()) goal = Math.min(goal, 2);
    goal = Math.max(2, Math.min(5, goal));

    const selected = [];
    const modalityCount = {};
    for (const item of scored) {
      if (selected.length >= goal) break;
      const modalityUsed = modalityCount[item.exercise.modality] || 0;
      if (modalityUsed >= 1 && selected.length < Math.min(goal, 3)) continue;
      selected.push(item.exercise);
      modalityCount[item.exercise.modality] = modalityUsed + 1;
    }
    if (!selected.some(e => e.minutes <= 10)) {
      const short = scored.find(x => x.exercise.minutes <= 10 && !selected.some(s => s.id === x.exercise.id));
      if (short) selected[selected.length - 1] = short.exercise;
    }
    sessionStorage.setItem(RECS_KEY, JSON.stringify({ dateKey: today, ids: selected.map(e => e.id) }));
    return selected;
  }

  function renderExerciseCard(exercise, recommended = false) {
    const completed = todayEntries().some(e => e.exerciseId === exercise.id);
    const needs = getNeeds();
    return `
      <article class="exercise-card" style="--accent:${MODALITY_COLORS[exercise.modality] || '#4f46e5'}">
        <div class="exercise-card-top">
          <span class="modality-badge">${escapeHTML(exercise.modality)}</span>
          <span class="duration">${exercise.minutes} min · ${escapeHTML(exercise.difficulty)}</span>
        </div>
        <div>
          <h3>${escapeHTML(exercise.title)}</h3>
          <p>${escapeHTML(recommended ? recommendationReason(exercise, needs) : exercise.subtitle)}</p>
        </div>
        <div class="tag-row">${exercise.targets.slice(0, 3).map(t => `<span class="tag">${escapeHTML(TARGET_LABELS[t] || t)}</span>`).join('')}</div>
        ${completed ? '<span class="completed-mark">✓ Completed today</span>' : ''}
        <div class="exercise-card-actions">
          <button class="secondary-button" data-open-exercise="${exercise.id}" data-tab="guide">Learn</button>
          <button class="primary-button" data-open-exercise="${exercise.id}" data-tab="worksheet">${completed ? 'Do again' : 'Start'}</button>
        </div>
      </article>`;
  }

  function renderToday() {
    const now = new Date();
    $('#todayDate').textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(now);
    const name = state.settings.nickname?.trim();
    $('#avatarInitial').textContent = (name || 'You').charAt(0).toUpperCase();
    $('#streakCount').textContent = computeStreak();
    const due = assessmentDue();
    const checkin = todayCheckin();
    $('#weeklyStatusChip').textContent = due ? 'Weekly wellbeing map due' : 'Weekly map up to date';
    $('#heroGreeting').textContent = name ? `Welcome back, ${name}. What would support you today?` : 'Build a steadier day, one skill at a time.';
    $('#heroSubtext').textContent = due
      ? 'Begin with a private weekly wellbeing map. It updates the practice plan without diagnosing you.'
      : checkin ? 'Your plan uses today’s check-in, weekly map, and what has helped before.' : 'Complete a 60-second check-in to tune today’s practice plan.';
    $('#heroPrimary').textContent = due ? 'Start weekly wellbeing map' : checkin ? 'Review today’s check-in' : 'Check in now';
    $('#heroPrimary').dataset.action = due ? 'assessment' : 'checkin';

    const recs = due ? [] : generateRecommendations();
    $('#recommendationGrid').innerHTML = recs.length
      ? recs.map(e => renderExerciseCard(e, true)).join('')
      : `<div class="empty-state panel" style="grid-column:1/-1"><strong>Complete the weekly map first</strong><span>The map creates a safer and more relevant starting plan. You can still browse the full library.</span></div>`;
    const notice = $('#recommendationNotice');
    if (hasSafetyFlag()) {
      notice.classList.remove('hidden');
      notice.innerHTML = '<strong>Safety response active.</strong> App exercises are not crisis care. Use the safety information and contact immediate human support if you may not stay safe.';
    } else if (isHighDistress()) {
      notice.classList.remove('hidden');
      notice.textContent = 'Today’s plan is lighter because your check-in shows very high distress. Begin with a brief regulation skill and consider human support.';
    } else {
      notice.classList.add('hidden');
    }
    renderTodayCheckinSummary();
    renderWeekStrip();
    renderNlpMini();
  }

  function renderTodayCheckinSummary() {
    const checkin = todayCheckin();
    const summary = $('#todayCheckinSummary');
    const ring = $('#checkinRing');
    if (!checkin) {
      summary.innerHTML = '<strong>No check-in yet</strong><span>A 60-second check-in improves today’s recommendations.</span>';
      ring.textContent = '0%'; ring.style.setProperty('--ring', '0%');
      $('#todayCheckinButton').textContent = 'Check in now';
      return;
    }
    const completion = 100;
    ring.textContent = '100%'; ring.style.setProperty('--ring', `${completion}%`);
    const focus = TARGET_LABELS[checkin.focus] || checkin.focus || 'general wellbeing';
    summary.innerHTML = `<strong>Saved at ${escapeHTML(formatTime(checkin.updatedAt || checkin.createdAt))}</strong><span>Mood ${checkin.mood}/10 · Anxiety ${checkin.anxiety}/10 · Focus: ${escapeHTML(focus)}</span>`;
    $('#todayCheckinButton').textContent = 'Update check-in';
  }

  function renderWeekStrip() {
    const container = $('#weekStrip');
    const today = new Date();
    const day = today.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(today); monday.setDate(today.getDate() + mondayOffset);
    const active = new Set([...state.entries.map(e => e.dateKey), ...state.checkins.map(c => c.dateKey)]);
    const labels = [];
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday); d.setDate(monday.getDate() + i);
      const key = localDateKey(d);
      const complete = active.has(key);
      if (complete) count++;
      labels.push(`<div class="day-dot ${complete ? 'complete' : ''} ${key === localDateKey() ? 'today' : ''}"><i>${complete ? '✓' : d.getDate()}</i><span>${new Intl.DateTimeFormat(undefined,{weekday:'narrow'}).format(d)}</span></div>`);
    }
    container.innerHTML = labels.join('');
    $('#weeklyCompletionCount').textContent = count;
  }

  function buildCheckinSliders() {
    $('#checkinSliders').innerHTML = CHECKIN_DEFS.map(def => `
      <div class="slider-card">
        <div class="slider-card-header"><label for="checkin-${def.id}">${escapeHTML(def.label)}</label><span class="slider-value" id="value-${def.id}">${def.value}</span></div>
        <input type="range" min="0" max="10" step="1" value="${def.value}" id="checkin-${def.id}" name="${def.id}">
        <div class="range-labels"><span>${escapeHTML(def.low)}</span><span>${escapeHTML(def.high)}</span></div>
      </div>`).join('');
    CHECKIN_DEFS.forEach(def => {
      const input = $(`#checkin-${def.id}`);
      input.addEventListener('input', () => $(`#value-${def.id}`).textContent = input.value);
    });
  }

  function populateTodayCheckin() {
    const existing = todayCheckin();
    CHECKIN_DEFS.forEach(def => {
      const input = $(`#checkin-${def.id}`);
      const value = existing ? existing[def.id] : def.value;
      input.value = value;
      $(`#value-${def.id}`).textContent = value;
    });
    $('#checkinFocus').value = existing?.focus || '';
    $('#checkinNote').value = existing?.note || '';
    $('#checkinNoteCount').textContent = `${($('#checkinNote').value || '').length}/1200`;
  }

  function saveCheckin(event) {
    event.preventDefault();
    if (assessmentDue()) {
      toast('Complete the weekly wellbeing map before checking in.');
      startAssessment();
      return;
    }
    const key = localDateKey();
    const data = { dateKey: key, focus: $('#checkinFocus').value, note: $('#checkinNote').value.trim(), updatedAt: new Date().toISOString() };
    CHECKIN_DEFS.forEach(def => data[def.id] = Number($(`#checkin-${def.id}`).value));
    const existingIndex = state.checkins.findIndex(c => c.dateKey === key);
    if (existingIndex >= 0) state.checkins[existingIndex] = { ...state.checkins[existingIndex], ...data };
    else state.checkins.push({ id: uid('checkin'), createdAt: new Date().toISOString(), ...data });
    saveState();
    sessionStorage.removeItem(RECS_KEY);
    toast(existingIndex >= 0 ? 'Today’s check-in was updated.' : 'Check-in saved. Your plan has been updated.');
    renderToday();
    routeTo('today');
    if (data.emotionIntensity >= 9 || data.stress >= 9) setTimeout(() => openModal('safetyModal'), 250);
  }

  function renderLibrary() {
    const search = ($('#librarySearch').value || '').toLowerCase().trim();
    const duration = $('#durationFilter').value;
    let filtered = exercises.filter(e => libraryModality === 'All' || e.modality === libraryModality);
    if (search) filtered = filtered.filter(e => `${e.title} ${e.subtitle} ${e.summary} ${e.targets.join(' ')} ${e.modality}`.toLowerCase().includes(search));
    if (duration === 'short') filtered = filtered.filter(e => e.minutes <= 10);
    if (duration === 'medium') filtered = filtered.filter(e => e.minutes >= 11 && e.minutes <= 15);
    if (duration === 'long') filtered = filtered.filter(e => e.minutes > 15);
    $('#libraryCount').textContent = filtered.length;
    $('#libraryGrid').innerHTML = filtered.length ? filtered.map(e => renderExerciseCard(e, false)).join('') : '<div class="empty-state panel" style="grid-column:1/-1"><strong>No matching exercise</strong><span>Try another search or filter.</span></div>';
  }

  function setupLibraryFilters() {
    const modalities = ['All', ...new Set(exercises.map(e => e.modality))];
    $('#modalityFilters').innerHTML = modalities.map(m => `<button class="filter-chip ${m === 'All' ? 'active' : ''}" data-modality="${m}">${m}</button>`).join('');
    $('#modalityFilters').addEventListener('click', event => {
      const button = event.target.closest('[data-modality]');
      if (!button) return;
      libraryModality = button.dataset.modality;
      $$('.filter-chip', $('#modalityFilters')).forEach(b => b.classList.toggle('active', b === button));
      renderLibrary();
    });
  }

  function openExercise(id, tab = 'guide') {
    const exercise = exercises.find(e => e.id === id);
    if (!exercise) return;
    activeExercise = exercise;
    selectedHelpfulness = 3;
    $('#exerciseModalHeader').innerHTML = `
      <span class="modality-badge" style="--accent:${MODALITY_COLORS[exercise.modality]}">${exercise.modality}</span>
      <h2 id="exerciseModalTitle">${escapeHTML(exercise.title)}</h2>
      <p>${escapeHTML(exercise.subtitle)}</p>
      <div class="exercise-meta-row"><span>${exercise.minutes} minutes</span><span>${escapeHTML(exercise.difficulty)}</span>${exercise.targets.slice(0,4).map(t => `<span>${escapeHTML(TARGET_LABELS[t] || t)}</span>`).join('')}</div>`;
    $('#exerciseGuidePanel').innerHTML = `
      <section class="guide-section"><h3>What this exercise is</h3><p>${escapeHTML(exercise.summary)}</p></section>
      <section class="guide-section"><h3>Why it may help</h3><p>${escapeHTML(exercise.why)}</p></section>
      <section class="guide-section"><h3>When to use it</h3><p>${escapeHTML(exercise.when)}</p></section>
      <section class="guide-section"><h3>How to do it</h3><ol class="numbered-steps">${exercise.steps.map(s => `<li>${escapeHTML(s)}</li>`).join('')}</ol></section>
      <section class="guide-section"><h3>Helpful reminders</h3><ul class="tip-list">${exercise.tips.map(t => `<li>${escapeHTML(t)}</li>`).join('')}</ul></section>
      ${exercise.caution ? `<div class="caution-box"><strong>Use with care:</strong> ${escapeHTML(exercise.caution)}</div>` : ''}
      <div class="form-actions"><button class="primary-button" id="beginWorksheetButton">Open worksheet</button></div>`;
    renderExerciseForm(exercise);
    switchExerciseTab(tab);
    openModal('exerciseModal');
    $('#beginWorksheetButton')?.addEventListener('click', () => switchExerciseTab('worksheet'));
  }

  function switchExerciseTab(tab) {
    $$('.exercise-tab').forEach(b => b.classList.toggle('active', b.dataset.exerciseTab === tab));
    $('#exerciseGuidePanel').classList.toggle('active', tab === 'guide');
    $('#exerciseWorksheetForm').classList.toggle('active', tab === 'worksheet');
  }

  function loadDraft(exerciseId) {
    try { return JSON.parse(sessionStorage.getItem(DRAFT_KEY) || '{}')[exerciseId] || null; } catch { return null; }
  }

  function saveDraft(exerciseId, data) {
    let drafts = {};
    try { drafts = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || '{}'); } catch {}
    drafts[exerciseId] = { ...data, updatedAt: new Date().toISOString() };
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  }

  function clearDraft(exerciseId) {
    let drafts = {};
    try { drafts = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || '{}'); } catch {}
    delete drafts[exerciseId];
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  }

  function fieldHTML(field, draftValue) {
    const required = field.required ? '<span class="required-mark">*</span>' : '';
    const value = draftValue ?? '';
    const help = field.help ? `<small>${escapeHTML(field.help)}</small>` : '';
    let control = '';
    if (field.type === 'textarea') {
      control = `<textarea name="${field.name}" rows="4" placeholder="${escapeHTML(field.placeholder || '')}" ${field.required ? 'required' : ''}>${escapeHTML(value)}</textarea>`;
    } else if (field.type === 'select') {
      control = `<select name="${field.name}" ${field.required ? 'required' : ''}><option value="">Choose one</option>${(field.options || []).map(o => `<option value="${escapeHTML(o)}" ${value === o ? 'selected' : ''}>${escapeHTML(o)}</option>`).join('')}</select>`;
    } else if (field.type === 'multi-select') {
      const selected = Array.isArray(value) ? value : [];
      control = `<div class="multi-options">${(field.options || []).map((o, i) => `<label class="multi-option"><input type="checkbox" name="${field.name}" value="${escapeHTML(o)}" ${selected.includes(o) ? 'checked' : ''}><span>${escapeHTML(o)}</span></label>`).join('')}</div>`;
    } else if (field.type === 'scale') {
      const min = field.min ?? 0, max = field.max ?? 10, current = value === '' ? min : value;
      control = `<div class="scale-wrap"><input type="range" name="${field.name}" min="${min}" max="${max}" value="${current}" step="1"><output class="scale-output">${current}</output></div>`;
    } else {
      control = `<input type="${field.type || 'text'}" name="${field.name}" value="${escapeHTML(value)}" placeholder="${escapeHTML(field.placeholder || '')}" ${field.required ? 'required' : ''}>`;
    }
    return `<div class="dynamic-field"><label>${escapeHTML(field.label)} ${required}</label>${control}${help}</div>`;
  }

  function renderExerciseForm(exercise) {
    const form = $('#exerciseWorksheetForm');
    const draft = loadDraft(exercise.id) || {};
    form.innerHTML = `
      <div class="prepost-grid">
        <div class="dynamic-field"><label>Distress before (0–10)</label><div class="scale-wrap"><input type="range" name="preDistress" min="0" max="10" value="${draft.preDistress ?? 5}"><output class="scale-output">${draft.preDistress ?? 5}</output></div></div>
        <div class="dynamic-field"><label>Distress after (0–10)</label><div class="scale-wrap"><input type="range" name="postDistress" min="0" max="10" value="${draft.postDistress ?? 5}"><output class="scale-output">${draft.postDistress ?? 5}</output></div></div>
      </div>
      <div class="dynamic-fields">${exercise.fields.map(field => fieldHTML(field, draft[field.name])).join('')}</div>
      <div class="dynamic-field" style="margin-top:20px"><label>How helpful was this practice?</label><div class="helpfulness-row">${[1,2,3,4,5].map(n => `<button type="button" class="helpfulness-button ${n === (draft.helpfulness || 3) ? 'active' : ''}" data-helpfulness="${n}">${n}</button>`).join('')}</div><small>1 = not helpful, 5 = very helpful. This adjusts future recommendations.</small></div>
      <div class="form-actions"><button type="button" class="secondary-button" id="saveDraftButton">Save draft for this session</button><button type="submit" class="primary-button">Complete and save</button></div>`;
    selectedHelpfulness = draft.helpfulness || 3;
    $$('input[type="range"]', form).forEach(input => {
      input.addEventListener('input', () => { const out = input.parentElement.querySelector('output'); if (out) out.textContent = input.value; autosaveActiveExercise(); });
    });
    $$('input, textarea, select', form).forEach(input => input.addEventListener('input', autosaveActiveExercise));
    $$('.helpfulness-button', form).forEach(button => button.addEventListener('click', () => {
      selectedHelpfulness = Number(button.dataset.helpfulness);
      $$('.helpfulness-button', form).forEach(b => b.classList.toggle('active', b === button));
      autosaveActiveExercise();
    }));
    $('#saveDraftButton').addEventListener('click', () => { autosaveActiveExercise(); toast('Draft saved for this browser session.'); });
  }

  function serializeExerciseForm() {
    const form = $('#exerciseWorksheetForm');
    const data = {};
    if (!activeExercise) return data;
    activeExercise.fields.forEach(field => {
      if (field.type === 'multi-select') data[field.name] = $$(`input[name="${field.name}"]:checked`, form).map(i => i.value);
      else data[field.name] = form.elements[field.name]?.value ?? '';
    });
    data.preDistress = Number(form.elements.preDistress?.value || 0);
    data.postDistress = Number(form.elements.postDistress?.value || 0);
    data.helpfulness = selectedHelpfulness;
    return data;
  }

  function autosaveActiveExercise() {
    if (!activeExercise) return;
    saveDraft(activeExercise.id, serializeExerciseForm());
  }

  function completeExercise(event) {
    event.preventDefault();
    if (!activeExercise) return;
    if (!event.currentTarget.reportValidity()) return;
    const data = serializeExerciseForm();
    const now = new Date().toISOString();
    state.entries.push({
      id: uid('entry'), exerciseId: activeExercise.id, modality: activeExercise.modality,
      title: activeExercise.title, createdAt: now, dateKey: localDateKey(),
      preDistress: data.preDistress, postDistress: data.postDistress,
      helpfulness: data.helpfulness,
      responses: Object.fromEntries(activeExercise.fields.map(field => [field.name, data[field.name]]))
    });
    const delta = data.helpfulness - 3;
    state.preference.modalities[activeExercise.modality] = clamp((state.preference.modalities[activeExercise.modality] || 0) + delta, -8, 12);
    activeExercise.targets.forEach(t => state.preference.targets[t] = clamp((state.preference.targets[t] || 0) + delta * .55, -8, 12));
    saveState();
    clearDraft(activeExercise.id);
    sessionStorage.removeItem(RECS_KEY);
    closeModal('exerciseModal');
    toast(`${activeExercise.title} saved to your history.`);
    renderToday();
    if (currentRoute === 'library') renderLibrary();
  }

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

  function startAssessment() {
    assessmentSession = { step: -1, answers: {}, safetyFlag: false };
    renderAssessmentStep();
    openModal('assessmentModal');
  }

  function renderAssessmentStep() {
    const content = $('#assessmentContent');
    const total = ASSESSMENT_QUESTIONS.length + 2;
    const progress = Math.max(0, ((assessmentSession.step + 1) / total) * 100);
    $('#assessmentProgressBar').style.width = `${progress}%`;

    if (assessmentSession.step === -1) {
      content.innerHTML = `<div class="assessment-intro"><span class="eyebrow">Weekly wellbeing map</span><h2 id="assessmentTitle">A broad map, not a diagnosis</h2><p>Think about the last seven days. Your answers identify support areas for exercise recommendations. They remain on this device.</p><div class="soft-warning"><strong>Important:</strong><p>This quiz cannot diagnose or replace clinical assessment. Severe, persistent, or worsening symptoms need professional care.</p></div><div class="form-actions"><button class="primary-button" id="assessmentStart">Begin</button></div></div>`;
      $('#assessmentStart').addEventListener('click', () => { assessmentSession.step = 0; renderAssessmentStep(); });
      return;
    }
    if (assessmentSession.step < ASSESSMENT_QUESTIONS.length) {
      const q = ASSESSMENT_QUESTIONS[assessmentSession.step];
      const selected = assessmentSession.answers[q.id];
      content.innerHTML = `<div class="assessment-question"><span class="eyebrow">Question ${assessmentSession.step + 1} of ${ASSESSMENT_QUESTIONS.length + 1}</span><h2 id="assessmentTitle">${escapeHTML(q.text)}</h2><p>During the last seven days, how often was this true?</p><div class="answer-grid">${ASSESSMENT_OPTIONS.map(o => `<button class="answer-button ${selected === o.value ? 'selected' : ''}" data-answer="${o.value}"><strong>${escapeHTML(o.label)}</strong></button>`).join('')}</div><div class="assessment-nav"><button class="secondary-button" id="assessmentBack" ${assessmentSession.step === 0 ? 'disabled' : ''}>Back</button><button class="primary-button" id="assessmentNext" ${selected === undefined ? 'disabled' : ''}>Next</button></div></div>`;
      $$('.answer-button', content).forEach(button => button.addEventListener('click', () => {
        assessmentSession.answers[q.id] = Number(button.dataset.answer);
        renderAssessmentStep();
      }));
      $('#assessmentBack').addEventListener('click', () => { assessmentSession.step--; renderAssessmentStep(); });
      $('#assessmentNext').addEventListener('click', () => { assessmentSession.step++; renderAssessmentStep(); });
      return;
    }
    if (assessmentSession.step === ASSESSMENT_QUESTIONS.length) {
      content.innerHTML = `<div class="assessment-question"><span class="eyebrow">Safety question</span><h2 id="assessmentTitle">During the last seven days, did you have thoughts of harming yourself, not wanting to be alive, or being unable to stay safe?</h2><p>This answer is not added to the recommendation score. A “yes” opens safety information because app exercises are not enough for immediate risk.</p><div class="answer-grid"><button class="answer-button" data-safety="false"><strong>No</strong></button><button class="answer-button" data-safety="true"><strong>Yes, or I am unsure</strong></button></div><div class="assessment-nav"><button class="secondary-button" id="assessmentBack">Back</button></div></div>`;
      $$('[data-safety]', content).forEach(button => button.addEventListener('click', () => {
        assessmentSession.safetyFlag = button.dataset.safety === 'true';
        finishAssessment();
      }));
      $('#assessmentBack').addEventListener('click', () => { assessmentSession.step--; renderAssessmentStep(); });
    }
  }

  function finishAssessment() {
    const grouped = {};
    ASSESSMENT_QUESTIONS.forEach(q => {
      grouped[q.domain] ||= [];
      grouped[q.domain].push(Number(assessmentSession.answers[q.id] || 0));
    });
    const domains = {};
    Object.entries(grouped).forEach(([domain, values]) => domains[domain] = Math.round(values.reduce((a,b) => a+b,0) / values.length / 4 * 100));
    const assessment = {
      id: uid('assessment'), createdAt: new Date().toISOString(), dateKey: localDateKey(),
      answers: { ...assessmentSession.answers }, domains, safetyFlag: assessmentSession.safetyFlag
    };
    state.assessments.push(assessment);
    saveState();
    sessionStorage.removeItem(RECS_KEY);
    renderAssessmentResult(assessment);
    if (assessment.safetyFlag) setTimeout(() => { closeModal('assessmentModal'); openModal('safetyModal'); }, 900);
  }

  function renderAssessmentResult(assessment) {
    const ranked = Object.entries(assessment.domains).sort((a,b) => b[1]-a[1]);
    $('#assessmentProgressBar').style.width = '100%';
    $('#assessmentContent').innerHTML = `<div class="assessment-intro"><span class="eyebrow">Map complete</span><h2 id="assessmentTitle">Your current support map</h2><p>Higher bars indicate areas that may deserve more support this week, not a diagnosis or severity label.</p><div class="domain-result-grid">${ranked.map(([domain,value]) => `<div class="domain-result"><div class="domain-result-top"><strong>${escapeHTML(TARGET_LABELS[domain] || domain)}</strong><span>${value}%</span></div><div class="domain-bar"><i style="width:${value}%"></i></div></div>`).join('')}</div><div class="form-actions"><button class="primary-button" id="assessmentDone">View today’s plan</button></div></div>`;
    $('#assessmentDone').addEventListener('click', () => { closeModal('assessmentModal'); renderToday(); routeTo('today'); });
  }

  function combinedHistory() {
    return [
      ...state.entries.map(x => ({ ...x, recordType: 'exercise' })),
      ...state.checkins.map(x => ({ ...x, recordType: 'checkin', title: 'Daily check-in' })),
      ...state.assessments.map(x => ({ ...x, recordType: 'assessment', title: 'Weekly wellbeing map' }))
    ].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function renderHistory() {
    const entries = state.entries;
    const checkins = state.checkins;
    const avgHelpful = entries.length ? (entries.reduce((s,e) => s + (e.helpfulness || 0),0) / entries.length).toFixed(1) : '—';
    $('#historyMetrics').innerHTML = metricCard('Exercises completed', entries.length) + metricCard('Daily check-ins', checkins.length) + metricCard('Current streak', `${computeStreak()} days`) + metricCard('Average helpfulness', avgHelpful);
    const type = $('#historyTypeFilter').value;
    const search = ($('#historySearch').value || '').toLowerCase().trim();
    let records = combinedHistory();
    if (type !== 'all') records = records.filter(r => r.recordType === type);
    if (search) records = records.filter(r => JSON.stringify(r).toLowerCase().includes(search));
    $('#historyList').innerHTML = records.length ? records.map(record => {
      let summary = '';
      if (record.recordType === 'exercise') summary = `Helpful ${record.helpfulness}/5 · Distress ${record.preDistress} → ${record.postDistress}`;
      if (record.recordType === 'checkin') summary = `Mood ${record.mood}/10 · Anxiety ${record.anxiety}/10 · Stress ${record.stress}/10`;
      if (record.recordType === 'assessment') summary = `${Object.keys(record.domains || {}).length} support areas mapped`;
      const icon = record.recordType === 'exercise' ? (record.modality || 'E') : record.recordType === 'checkin' ? '✓' : '◈';
      return `<button class="history-item" data-record-id="${record.id}" data-record-type="${record.recordType}"><span class="history-icon">${escapeHTML(icon)}</span><span class="history-main"><strong>${escapeHTML(record.title)}</strong><p>${escapeHTML(summary)}</p></span><span class="history-meta">${escapeHTML(formatDate(record.createdAt,{year:undefined}))}<br>${escapeHTML(formatTime(record.createdAt))}</span></button>`;
    }).join('') : '<div class="empty-state"><strong>No matching records</strong><span>Completed exercises and check-ins will appear here.</span></div>';
  }

  function metricCard(label, value) { return `<div class="metric-card"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`; }

  function openRecord(type, id) {
    const source = type === 'exercise' ? state.entries : type === 'checkin' ? state.checkins : state.assessments;
    const record = source.find(r => r.id === id);
    if (!record) return;
    let body = '';
    if (type === 'exercise') {
      const exercise = exercises.find(e => e.id === record.exerciseId);
      body = `<div class="record-header"><span class="modality-badge" style="--accent:${MODALITY_COLORS[record.modality]}">${escapeHTML(record.modality)}</span><h2 id="recordTitle">${escapeHTML(record.title)}</h2><p class="muted">${escapeHTML(formatDate(record.createdAt))} at ${escapeHTML(formatTime(record.createdAt))} · Helpful ${record.helpfulness}/5 · Distress ${record.preDistress} → ${record.postDistress}</p></div><div class="record-section">${Object.entries(record.responses || {}).map(([key,value]) => { const field = exercise?.fields.find(f => f.name === key); const display = Array.isArray(value) ? value.join(', ') : value; return display ? `<div class="record-field"><span>${escapeHTML(field?.label || key)}</span><p>${escapeHTML(display)}</p></div>` : ''; }).join('')}</div>`;
    } else if (type === 'checkin') {
      body = `<div class="record-header"><span class="eyebrow">Daily pulse</span><h2 id="recordTitle">Daily check-in</h2><p class="muted">${escapeHTML(formatDate(record.createdAt))} at ${escapeHTML(formatTime(record.updatedAt || record.createdAt))}</p></div><div class="record-section">${CHECKIN_DEFS.map(def => `<div class="record-field"><span>${escapeHTML(def.label)}</span><p>${record[def.id]}/10</p></div>`).join('')}${record.focus ? `<div class="record-field"><span>Focus</span><p>${escapeHTML(TARGET_LABELS[record.focus] || record.focus)}</p></div>` : ''}${record.note ? `<div class="record-field"><span>Note</span><p>${escapeHTML(record.note)}</p></div>` : ''}</div>`;
    } else {
      body = `<div class="record-header"><span class="eyebrow">Weekly map</span><h2 id="recordTitle">Weekly wellbeing map</h2><p class="muted">${escapeHTML(formatDate(record.createdAt))}${record.safetyFlag ? ' · Safety response was activated' : ''}</p></div><div class="domain-result-grid">${Object.entries(record.domains || {}).sort((a,b)=>b[1]-a[1]).map(([domain,value]) => `<div class="domain-result"><div class="domain-result-top"><strong>${escapeHTML(TARGET_LABELS[domain] || domain)}</strong><span>${value}%</span></div><div class="domain-bar"><i style="width:${value}%"></i></div></div>`).join('')}</div>`;
    }
    $('#recordContent').innerHTML = `${body}<div class="form-actions"><button class="danger-button" id="deleteRecord">Delete this record</button></div>`;
    $('#deleteRecord').addEventListener('click', () => deleteRecord(type, id));
    openModal('recordModal');
  }

  function deleteRecord(type, id) {
    if (!confirm('Delete this record permanently from this browser?')) return;
    if (type === 'exercise') state.entries = state.entries.filter(r => r.id !== id);
    if (type === 'checkin') state.checkins = state.checkins.filter(r => r.id !== id);
    if (type === 'assessment') state.assessments = state.assessments.filter(r => r.id !== id);
    saveState();
    sessionStorage.removeItem(RECS_KEY);
    closeModal('recordModal');
    renderHistory(); renderToday();
    toast('Record deleted.');
  }

  const STOPWORDS = new Set('a an the and or but if then than to of in on at for from with without into out over under i me my mine we our ours you your yours he she they them their it this that these those is are was were be been being have has had do does did can could would should will just very really so because as about what when where who why how not no yes also more most less least some any all each every much many one two today yesterday tomorrow thing things feel felt feeling get got make made know think thought'.split(' '));
  const LEXICONS = {
    positive: 'calm steady hopeful proud grateful capable connected supported relieved better progress kind courage safe useful clear enjoy pleasant success strong manageable'.split(' '),
    negative: 'bad awful terrible hopeless useless failure alone overwhelmed stuck exhausted painful ruined impossible difficult worse hate ashamed guilty'.split(' '),
    anxiety: 'anxious anxiety worry worried panic tense nervous fear afraid unsafe threat restless uncertain dread'.split(' '),
    sadness: 'sad down empty lonely grief loss crying hopeless numb depressed heavy'.split(' '),
    anger: 'angry anger irritated furious annoyed resentful rage unfair'.split(' '),
    shame: 'ashamed shame guilty embarrassed worthless failure stupid weak'.split(' '),
    hope: 'hope hopeful possible progress improve better try learning capable courage'.split(' '),
    connection: 'friend family partner team support connected together listened understood care'.split(' ')
  };

  function tokenize(text) {
    return String(text || '').toLowerCase().replace(/[’']/g, '').match(/[a-z][a-z-]{1,}/g) || [];
  }

  function analyzeText(text) {
    const tokens = tokenize(text);
    const counts = {};
    tokens.forEach(t => counts[t] = (counts[t] || 0) + 1);
    let pos = 0, neg = 0;
    const emotions = { anxiety: 0, sadness: 0, anger: 0, shame: 0, hope: 0, connection: 0 };
    tokens.forEach((token, index) => {
      const negated = tokens.slice(Math.max(0,index-3), index).some(t => ['not','never','no','hardly'].includes(t));
      if (LEXICONS.positive.includes(token)) pos += negated ? -1 : 1;
      if (LEXICONS.negative.includes(token)) neg += negated ? -1 : 1;
      Object.keys(emotions).forEach(e => { if (LEXICONS[e].includes(token)) emotions[e]++; });
    });
    const clean = tokens.filter(t => !STOPWORDS.has(t) && t.length > 2);
    const keywords = Object.entries(clean.reduce((acc,t)=>(acc[t]=(acc[t]||0)+1,acc),{})).sort((a,b)=>b[1]-a[1]).slice(0,12);
    const distortions = [];
    const lower = String(text || '').toLowerCase();
    if (/\b(always|never|everyone|nobody|everything|nothing)\b/.test(lower)) distortions.push('absolute language');
    if (/\b(should|must|have to|ought to)\b/.test(lower)) distortions.push('rigid rule language');
    if (/\b(disaster|catastrophe|ruined|worst|cannot cope|can't cope)\b/.test(lower)) distortions.push('catastrophic wording');
    if (/\b(they think|everyone thinks|they know|people will think)\b/.test(lower)) distortions.push('mind-reading wording');
    const sentiment = tokens.length ? clamp(Math.round(((pos - neg) / Math.sqrt(tokens.length)) * 20), -100, 100) : 0;
    return { tokens, counts, keywords, emotions, distortions: [...new Set(distortions)], sentiment, wordCount: tokens.length, lexicalDiversity: tokens.length ? Math.round(new Set(tokens).size / tokens.length * 100) : 0 };
  }

  function allTextRecords() {
    const records = [];
    state.checkins.forEach(c => { if (c.note) records.push({ date: c.createdAt, text: c.note, source: 'check-in' }); });
    state.entries.forEach(e => {
      const parts = Object.values(e.responses || {}).flat().filter(v => typeof v === 'string' && v.trim());
      if (parts.length) records.push({ date: e.createdAt, text: parts.join(' '), source: e.title });
    });
    return records;
  }

  function aggregateNlp() {
    const records = allTextRecords();
    const text = records.map(r => r.text).join(' ');
    const overall = analyzeText(text);
    const recentText = records.filter(r => new Date(r.date) >= new Date(Date.now()-7*86400000)).map(r=>r.text).join(' ');
    const priorText = records.filter(r => { const d=new Date(r.date); return d < new Date(Date.now()-7*86400000) && d >= new Date(Date.now()-14*86400000); }).map(r=>r.text).join(' ');
    return { records, overall, recent: analyzeText(recentText), prior: analyzeText(priorText) };
  }

  function renderNlpMini() {
    const nlp = aggregateNlp();
    if (nlp.overall.wordCount < 20) {
      $('#nlpMiniSummary').innerHTML = '<strong>Not enough written entries yet</strong><span>Your words are analyzed only in this browser.</span>';
      return;
    }
    const emotion = Object.entries(nlp.overall.emotions).sort((a,b)=>b[1]-a[1])[0];
    const keyword = nlp.overall.keywords[0]?.[0] || 'daily life';
    $('#nlpMiniSummary').innerHTML = `<strong>Common theme: ${escapeHTML(keyword)}</strong><span>Most visible emotion words: ${escapeHTML(emotion?.[0] || 'mixed')}. Open insights for context and limitations.</span>`;
  }

  function renderInsights() {
    const entries = state.entries;
    const helpful = entries.length ? (entries.reduce((s,e)=>s+(e.helpfulness||0),0)/entries.length).toFixed(1) : '—';
    const avgChange = entries.length ? (entries.reduce((s,e)=>s+((e.preDistress||0)-(e.postDistress||0)),0)/entries.length).toFixed(1) : '—';
    const last7 = new Date(Date.now()-7*86400000);
    const practices7 = entries.filter(e=>new Date(e.createdAt)>=last7).length;
    $('#insightMetrics').innerHTML = metricCard('Practices in 7 days', practices7) + metricCard('Average helpfulness', helpful) + metricCard('Average distress change', avgChange === '—' ? '—' : `${avgChange}`) + metricCard('Written records', allTextRecords().length);
    drawTrendChart(); drawModalityChart(); drawRadarChart(); renderNlpReport(); renderRecommenderReport();
  }

  function prepareCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(280, Math.floor(rect.width));
    const height = Number(canvas.getAttribute('height')) || 280;
    canvas.width = width * ratio; canvas.height = height * ratio;
    const ctx = canvas.getContext('2d'); ctx.setTransform(ratio,0,0,ratio,0,0);
    return { ctx, width, height };
  }

  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

  function drawEmpty(ctx, width, height, message) {
    ctx.clearRect(0,0,width,height); ctx.fillStyle = cssVar('--muted'); ctx.font = '14px system-ui'; ctx.textAlign='center'; ctx.fillText(message,width/2,height/2);
  }

  function drawTrendChart() {
    const canvas = $('#trendChart'); if (!canvas) return;
    const { ctx, width, height } = prepareCanvas(canvas);
    const padding = { l: 38, r: 16, t: 18, b: 34 };
    const days = [];
    for (let i=13;i>=0;i--) { const d=new Date(Date.now()-i*86400000); days.push({key:localDateKey(d),date:d}); }
    const rows = days.map(day => {
      const c = state.checkins.find(x=>x.dateKey===day.key);
      return { ...day, mood:c?.mood ?? null, anxiety:c?.anxiety ?? null, stress:c?.stress ?? null };
    });
    if (!rows.some(r=>r.mood!==null)) { drawEmpty(ctx,width,height,'Complete daily check-ins to see a trend.'); return; }
    ctx.clearRect(0,0,width,height);
    const plotW=width-padding.l-padding.r, plotH=height-padding.t-padding.b;
    ctx.strokeStyle=cssVar('--line'); ctx.lineWidth=1; ctx.fillStyle=cssVar('--muted'); ctx.font='11px system-ui'; ctx.textAlign='right';
    for(let v=0;v<=10;v+=2){ const y=padding.t+plotH-(v/10)*plotH; ctx.beginPath(); ctx.moveTo(padding.l,y); ctx.lineTo(width-padding.r,y); ctx.stroke(); ctx.fillText(v,padding.l-8,y+4); }
    ctx.textAlign='center';
    rows.forEach((r,i)=>{ if(i%3===0||i===13){ const x=padding.l+(i/13)*plotW; ctx.fillText(new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric'}).format(r.date),x,height-10); }});
    const series=[['mood','#0f9f92'],['anxiety','#765ee8'],['stress','#d28b35']];
    series.forEach(([key,color])=>{ ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.5;ctx.beginPath();let started=false;rows.forEach((r,i)=>{if(r[key]===null){started=false;return;}const x=padding.l+(i/13)*plotW;const y=padding.t+plotH-(r[key]/10)*plotH;if(!started){ctx.moveTo(x,y);started=true;}else ctx.lineTo(x,y);});ctx.stroke();rows.forEach((r,i)=>{if(r[key]===null)return;const x=padding.l+(i/13)*plotW;const y=padding.t+plotH-(r[key]/10)*plotH;ctx.beginPath();ctx.arc(x,y,3.2,0,Math.PI*2);ctx.fill();});});
  }

  function drawModalityChart() {
    const canvas=$('#modalityChart'); if(!canvas)return;
    const {ctx,width,height}=prepareCanvas(canvas);
    const modalities=['CBT','DBT','SFT','ACT','MCT','MBCT'];
    const counts=modalities.map(m=>state.entries.filter(e=>e.modality===m).length);
    if(!counts.some(Boolean)){drawEmpty(ctx,width,height,'Complete exercises to see your practice mix.');return;}
    ctx.clearRect(0,0,width,height);const max=Math.max(...counts,1);const pad={l:36,r:12,t:20,b:38};const gap=12;const barW=(width-pad.l-pad.r-gap*(modalities.length-1))/modalities.length;
    ctx.font='11px system-ui';ctx.textAlign='center';
    modalities.forEach((m,i)=>{const h=(counts[i]/max)*(height-pad.t-pad.b);const x=pad.l+i*(barW+gap);const y=height-pad.b-h;ctx.fillStyle=MODALITY_COLORS[m];roundRect(ctx,x,y,barW,h,8,true);ctx.fillStyle=cssVar('--muted');ctx.fillText(m,x+barW/2,height-15);ctx.fillStyle=cssVar('--text');ctx.fillText(counts[i],x+barW/2,Math.max(14,y-6));});
  }

  function roundRect(ctx,x,y,w,h,r,fill){ if(h<=0)return;const rr=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();if(fill)ctx.fill(); }

  function drawRadarChart() {
    const canvas=$('#radarChart');if(!canvas)return;const {ctx,width,height}=prepareCanvas(canvas);const assessment=latestAssessment();
    if(!assessment){drawEmpty(ctx,width,height,'Complete the weekly map to see support areas.');return;}
    const selected=Object.entries(assessment.domains).sort((a,b)=>b[1]-a[1]).slice(0,6);const cx=width/2,cy=height/2+5,r=Math.min(width,height)*.31,n=selected.length;
    ctx.clearRect(0,0,width,height);ctx.strokeStyle=cssVar('--line');ctx.fillStyle=cssVar('--muted');ctx.font='10px system-ui';
    for(let ring=1;ring<=4;ring++){ctx.beginPath();selected.forEach((_,i)=>{const a=-Math.PI/2+i*Math.PI*2/n;const rr=r*ring/4;const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();ctx.stroke();}
    selected.forEach(([label],i)=>{const a=-Math.PI/2+i*Math.PI*2/n;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.stroke();ctx.textAlign=Math.cos(a)>.2?'left':Math.cos(a)<-.2?'right':'center';ctx.fillText((TARGET_LABELS[label]||label).slice(0,16),cx+Math.cos(a)*(r+12),cy+Math.sin(a)*(r+12));});
    ctx.beginPath();selected.forEach(([_,value],i)=>{const a=-Math.PI/2+i*Math.PI*2/n;const rr=r*value/100;const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();ctx.fillStyle='rgba(79,70,229,.18)';ctx.fill();ctx.strokeStyle=MODALITY_COLORS.CBT;ctx.lineWidth=2;ctx.stroke();
  }

  function renderNlpReport() {
    const { overall, recent, prior, records } = aggregateNlp();
    if (overall.wordCount < 20) {
      $('#nlpReport').innerHTML = '<div class="report-item"><strong>More text is needed</strong><p>Write optional check-in notes or complete worksheets. The report begins after about 20 words.</p></div>';
      return;
    }
    const topEmotion = Object.entries(overall.emotions).sort((a,b)=>b[1]-a[1])[0];
    const trend = recent.wordCount && prior.wordCount ? recent.sentiment - prior.sentiment : null;
    $('#nlpReport').innerHTML = `
      <div class="report-item"><strong>Language balance</strong><p>Current sentiment index: ${overall.sentiment}. This is a simple word-context score, not an emotion detector. ${trend === null ? 'A two-week comparison is not available yet.' : `The recent seven-day index is ${trend > 0 ? 'higher' : trend < 0 ? 'lower' : 'similar'} by ${Math.abs(trend)} points compared with the previous week.`}</p></div>
      <div class="report-item"><strong>Visible emotion vocabulary</strong><p>${topEmotion?.[1] ? `${capitalize(topEmotion[0])} words appeared most often (${topEmotion[1]} matches).` : 'No emotion category clearly dominates.'} Absence of a word does not mean absence of an emotion.</p></div>
      <div class="report-item"><strong>Thinking-language cues</strong><p>${overall.distortions.length ? `The notes contain ${overall.distortions.join(', ')}. These are prompts for reflection, not proof of a cognitive distortion.` : 'No repeated absolute, rigid-rule, catastrophic, or mind-reading phrases were detected.'}</p></div>
      <div class="report-item"><strong>Common words</strong><div class="keyword-cloud">${overall.keywords.map(([word,count])=>`<span>${escapeHTML(word)} · ${count}</span>`).join('')}</div></div>
      <div class="report-item"><strong>Coverage and limits</strong><p>${records.length} written records and ${overall.wordCount} words were analyzed locally. The method uses transparent lexicons, basic negation handling, phrase patterns, and frequency—not a clinical model or hidden personality inference.</p></div>`;
  }

  function capitalize(value=''){return value.charAt(0).toUpperCase()+value.slice(1);}

  function renderRecommenderReport() {
    const modalityPrefs = Object.entries(state.preference.modalities).sort((a,b)=>b[1]-a[1]);
    const targetPrefs = Object.entries(state.preference.targets).sort((a,b)=>b[1]-a[1]);
    const latest = latestAssessment();
    const topNeeds = latest ? Object.entries(latest.domains).sort((a,b)=>b[1]-a[1]).slice(0,3) : [];
    $('#recommenderReport').innerHTML = `
      <div class="report-item"><strong>Current weekly priorities</strong><p>${topNeeds.length ? topNeeds.map(([t,v])=>`${TARGET_LABELS[t]||t} (${v}%)`).join(', ') : 'No weekly map yet.'}</p></div>
      <div class="report-item"><strong>Approaches that have helped</strong><p>${modalityPrefs.filter(([,v])=>v>0).length ? modalityPrefs.filter(([,v])=>v>0).slice(0,3).map(([m,v])=>`${m} (+${v.toFixed(1)})`).join(', ') : 'No preference has been learned yet. Rate completed practices to personalize the plan.'}</p></div>
      <div class="report-item"><strong>Skill targets gaining weight</strong><p>${targetPrefs.filter(([,v])=>v>0).length ? targetPrefs.filter(([,v])=>v>0).slice(0,4).map(([t])=>TARGET_LABELS[t]||t).join(', ') : 'Not enough helpfulness feedback yet.'}</p></div>
      <div class="report-item"><strong>How selection works</strong><p>A transparent weighted model combines weekly support areas, today’s check-in, note keywords, prior helpfulness, recent repetition, time, difficulty, and variety. It reduces advanced exercises when distress is very high. You remain free to choose any library exercise.</p></div>`;
  }

  function populateSettings() {
    $('#nickname').value = state.settings.nickname || '';
    $('#dailyGoal').value = String(state.settings.dailyGoal || 3);
    $('#themeSetting').value = state.settings.theme || 'system';
    $('#gentleLanguage').checked = !!state.settings.gentleLanguage;
    $('#reminderEnabled').checked = !!state.settings.reminderEnabled;
    $('#reminderTime').value = state.settings.reminderTime || '09:00';
  }

  function saveSettings(event) {
    event.preventDefault();
    state.settings = {
      ...state.settings,
      nickname: $('#nickname').value.trim(),
      dailyGoal: Number($('#dailyGoal').value),
      theme: $('#themeSetting').value,
      gentleLanguage: $('#gentleLanguage').checked,
      reminderEnabled: $('#reminderEnabled').checked,
      reminderTime: $('#reminderTime').value || '09:00'
    };
    saveState(); applyTheme(); sessionStorage.removeItem(RECS_KEY); renderToday(); toast('Settings saved.');
  }

  function exportData() {
    const payload = { app: 'MindPath', exportVersion: 1, exportedAt: new Date().toISOString(), data: state };
    const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`mindpath-backup-${localDateKey()}.json`;a.click();URL.revokeObjectURL(url);toast('Backup exported. Keep it private.');
  }

  async function importData(file) {
    if(!file)return;
    try {
      const parsed=JSON.parse(await file.text());
      const candidate=parsed.data || parsed;
      if(!candidate || !Array.isArray(candidate.entries) || !Array.isArray(candidate.checkins) || !Array.isArray(candidate.assessments)) throw new Error('Invalid structure');
      if(!confirm('Importing will replace all current MindPath data in this browser. Continue?')) return;
      localStorage.setItem(STORAGE_KEY,JSON.stringify(candidate)); state=loadState(); sessionStorage.clear(); applyTheme(); renderAll(); toast('Backup imported.'); routeTo('today');
    } catch { toast('That file is not a valid MindPath backup.'); }
    $('#importData').value='';
  }

  function resetData() {
    if(!confirm('Permanently delete all MindPath data from this browser? This cannot be undone without an export.')) return;
    localStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem(DRAFT_KEY); sessionStorage.removeItem(RECS_KEY); state=defaultState(); saveState(); applyTheme(); renderAll(); routeTo('today'); toast('MindPath has been reset.');
  }

  function checkInAppReminder() {
    if(!state.settings.reminderEnabled || todayCheckin() || assessmentDue()) return;
    const [h,m]=(state.settings.reminderTime||'09:00').split(':').map(Number);const now=new Date();
    if(now.getHours()>h || (now.getHours()===h && now.getMinutes()>=m)) toast('Your daily check-in is ready when you are.');
  }

  function renderAll() {
    renderToday(); renderLibrary(); populateTodayCheckin(); if(currentRoute==='history')renderHistory(); if(currentRoute==='insights')renderInsights(); populateSettings();
  }

  function bindEvents() {
    document.addEventListener('click', event => {
      const routeButton = event.target.closest('[data-route]'); if(routeButton) routeTo(routeButton.dataset.route);
      const routeLink = event.target.closest('[data-route-link]'); if(routeLink) routeTo(routeLink.dataset.routeLink);
      const open = event.target.closest('[data-open-exercise]'); if(open) openExercise(open.dataset.openExercise, open.dataset.tab || 'guide');
      const close = event.target.closest('[data-close-modal]'); if(close) closeModal(close.dataset.closeModal);
      const record = event.target.closest('[data-record-id]'); if(record) openRecord(record.dataset.recordType, record.dataset.recordId);
    });
    $$('.modal-backdrop').forEach(backdrop => backdrop.addEventListener('click', event => { if(event.target===backdrop) closeModal(backdrop.id); }));
    document.addEventListener('keydown', event => { if(event.key==='Escape'){ const modal=$$('.modal-backdrop:not(.hidden)').pop(); if(modal)closeModal(modal.id); } });
    $('#heroPrimary').addEventListener('click', () => $('#heroPrimary').dataset.action === 'assessment' ? startAssessment() : routeTo('checkin'));
    $('#heroSecondary').addEventListener('click', () => routeTo('library'));
    $('#todayCheckinButton').addEventListener('click', () => assessmentDue() ? startAssessment() : routeTo('checkin'));
    $('#refreshRecommendations').addEventListener('click', () => { sessionStorage.removeItem(RECS_KEY); renderToday(); toast('Today’s plan was refreshed.'); });
    $('#profileButton').addEventListener('click', () => routeTo('settings'));
    $('#openSafety').addEventListener('click', () => openModal('safetyModal'));
    $('#safetyAcknowledge').addEventListener('click', () => { state.safetyAcknowledged=true;saveState();closeModal('safetyModal'); });
    $('#makeSafetyPlan').addEventListener('click', () => { closeModal('safetyModal'); openExercise('mbct-breathing-space','guide'); });
    $('#checkinForm').addEventListener('submit', saveCheckin);
    $('#checkinNote').addEventListener('input', () => $('#checkinNoteCount').textContent = `${$('#checkinNote').value.length}/1200`);
    $('#librarySearch').addEventListener('input', renderLibrary);
    $('#durationFilter').addEventListener('change', renderLibrary);
    $('#exerciseWorksheetForm').addEventListener('submit', completeExercise);
    $('.exercise-tab-list').addEventListener('click', event => { const tab=event.target.closest('[data-exercise-tab]');if(tab)switchExerciseTab(tab.dataset.exerciseTab); });
    $('#historyTypeFilter').addEventListener('change', renderHistory);
    $('#historySearch').addEventListener('input', renderHistory);
    $('#recomputeInsights').addEventListener('click', () => { renderInsights(); toast('Insights recomputed from local records.'); });
    $('#settingsForm').addEventListener('submit', saveSettings);
    $('#exportData').addEventListener('click', exportData);
    $('#importData').addEventListener('change', event => importData(event.target.files[0]));
    $('#clearDrafts').addEventListener('click', () => { sessionStorage.removeItem(DRAFT_KEY); toast('Session drafts cleared.'); });
    $('#resetData').addEventListener('click', resetData);
    window.addEventListener('resize', () => { clearTimeout(chartResizeTimer); chartResizeTimer=setTimeout(()=>{if(currentRoute==='insights')renderInsights();},180); });
    matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => { if(state.settings.theme==='system'){applyTheme();if(currentRoute==='insights')renderInsights();} });
  }

  function init() {
    applyTheme(); buildCheckinSliders(); setupLibraryFilters(); bindEvents(); renderAll(); checkInAppReminder();
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }

  init();
})();
