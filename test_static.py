import json, re
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).parent
html = (ROOT/'index.html').read_text(encoding='utf-8')
app = (ROOT/'app.js').read_text(encoding='utf-8')
raw = (ROOT/'exercises.js').read_text(encoding='utf-8').strip()
assert raw.startswith('window.EXERCISES = ') and raw.endswith(';')
exercises = json.loads(raw[len('window.EXERCISES = '):-1])

assert len(exercises) >= 42, len(exercises)
ids = [e['id'] for e in exercises]
assert len(ids) == len(set(ids)), 'Duplicate exercise ids'
modalities = {m: 0 for m in ['CBT','DBT','SFT','ACT','MCT','MBCT']}
for e in exercises:
    modalities[e['modality']] += 1
    for key in ['id','modality','title','subtitle','minutes','difficulty','targets','summary','why','when','steps','tips','fields']:
        assert key in e, (e.get('id'), key)
    assert e['fields'], e['id']
    names = [f['name'] for f in e['fields']]
    assert len(names) == len(set(names)), f"duplicate field in {e['id']}"
assert all(v >= 6 for v in modalities.values()), modalities

soup = BeautifulSoup(html, 'html.parser')
html_ids = {node.get('id') for node in soup.find_all(id=True)}
static_refs = set(re.findall(r"\$\('#([A-Za-z][A-Za-z0-9_-]*)'\)", app))
dynamic_ids = {'assessmentBack','assessmentDone','assessmentNext','assessmentStart','beginWorksheetButton','deleteRecord','saveDraftButton'}
missing = sorted(static_refs - html_ids - dynamic_ids)
assert not missing, f'Missing HTML ids referenced by app.js: {missing}'
assert not soup.find_all('script', src=re.compile(r'^https?://')), 'External script dependency found'
assert not soup.find_all('link', href=re.compile(r'^https?://')), 'External stylesheet dependency found'

for filename in ['index.html','styles.css','exercises.js','app.js','manifest.json','sw.js','favicon.svg','README.md']:
    assert (ROOT/filename).exists(), filename

print('PASS')
print('Exercises:', len(exercises))
print('Modalities:', modalities)
print('Static DOM references checked:', len(static_refs))
