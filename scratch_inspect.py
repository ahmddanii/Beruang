import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('ui-audit-progres/results.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("CATEGORY SCORES:", data.get('category_scores'))

issues = data.get('issues', [])
typo_issues = [i for i in issues if 'TYPO' in i.get('rule', '')]
print(f"\n=== TYPOGRAPHY ISSUES (Count: {len(typo_issues)}) ===")
for t in typo_issues:
    print(f"{t.get('rule')} ({t.get('sev')}): {t.get('msg')}")
    for el in t.get('targets', []):
        print(f"   -> {el.get('sel')} | text: {repr(el.get('text'))}")

size_issues = [i for i in issues if 'SIZE' in i.get('rule', '')]
print(f"\n=== SIZING ISSUES (Count: {len(size_issues)}) ===")
for s in size_issues:
    print(f"{s.get('rule')} ({s.get('sev')}): {s.get('msg')}")
    for el in s.get('targets', []):
        print(f"   -> {el.get('sel')} | text: {repr(el.get('text'))}")
