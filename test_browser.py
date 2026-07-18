from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parent
html = (ROOT/'index.html').read_text(encoding='utf-8')
css = (ROOT/'styles.css').read_text(encoding='utf-8')
exercises = (ROOT/'exercises.js').read_text(encoding='utf-8')
app = (ROOT/'app.js').read_text(encoding='utf-8')
shim = '''<script>(function(){function s(){let d={};return {getItem:k=>Object.prototype.hasOwnProperty.call(d,k)?d[k]:null,setItem:(k,v)=>{d[k]=String(v)},removeItem:k=>{delete d[k]},clear:()=>{d={}},key:i=>Object.keys(d)[i]||null,get length(){return Object.keys(d).length}}}Object.defineProperty(window,'localStorage',{value:s(),configurable:true});Object.defineProperty(window,'sessionStorage',{value:s(),configurable:true});})();</script>'''
html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>{css}</style>{shim}')
html = html.replace('<script src="exercises.js"></script>', f'<script>{exercises}</script>')
html = html.replace('<script src="app.js"></script>', f'<script>{app}</script>')
html = html.replace('<link rel="manifest" href="manifest.json">', '').replace('<link rel="icon" href="favicon.svg" type="image/svg+xml">', '')

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox','--disable-dev-shm-usage'])
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    errors = []
    page.on('console', lambda msg: errors.append(f'console:{msg.type}:{msg.text}') if msg.type == 'error' else None)
    page.on('pageerror', lambda exc: errors.append(f'pageerror:{exc}'))
    page.set_content(html, wait_until='load', timeout=30000)

    assert page.locator('#heroPrimary').inner_text() == 'Start weekly wellbeing map'
    page.click('#heroPrimary')
    page.click('#assessmentStart')
    for _ in range(14):
        page.locator('.answer-button').nth(1).click()
        page.click('#assessmentNext')
    page.locator('[data-safety="false"]').click()
    page.click('#assessmentDone')
    page.wait_for_timeout(100)
    assert page.locator('#recommendationGrid .exercise-card').count() == 3

    page.click('.nav-item[data-route="checkin"]')
    page.fill('#checkinNote', 'I feel worried about work, but I am hopeful and want a small practical step.')
    page.select_option('#checkinFocus', 'anxiety')
    page.click('#checkinForm button[type="submit"]')
    page.wait_for_timeout(100)
    assert page.locator('#todayCheckinSummary').inner_text().find('Mood') >= 0

    page.click('.nav-item[data-route="library"]')
    page.fill('#librarySearch', 'Seven-Part Thought Record')
    assert page.locator('#libraryGrid .exercise-card').count() == 1
    page.locator('#libraryGrid [data-tab="worksheet"]').click()
    page.fill('#exerciseWorksheetForm textarea[name="situation"]', 'A colleague did not reply to my message today.')
    page.fill('#exerciseWorksheetForm textarea[name="automaticThought"]', 'They must be upset with me.')
    page.click('#exerciseWorksheetForm button[type="submit"]')
    page.wait_for_timeout(100)

    page.click('.nav-item[data-route="history"]')
    assert page.locator('#historyList .history-item').count() >= 3
    page.click('.nav-item[data-route="insights"]')
    page.wait_for_timeout(100)
    assert page.locator('#nlpReport').inner_text().strip()
    assert not errors, errors
    print('PASS browser workflow')
    print('History records:', page.locator('#historyList .history-item').count())
    print('Errors:', errors)
    browser.close()
