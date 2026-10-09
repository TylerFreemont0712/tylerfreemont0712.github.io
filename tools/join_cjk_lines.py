#!/usr/bin/env python3
"""Join source line breaks that fall between Japanese characters.

Browsers render a newline inside a paragraph as a space, which shows up as a
stray gap in Japanese text (CSS's segment-break rule for CJK is not applied
by Chrome). Run on Japanese pages and posts after editing them:

    python3 tools/join_cjk_lines.py ja/*.md _projects/ja/*.md _posts/*-ja.md
"""
import re, sys

CJK = r'[　-ヿ㐀-鿿＀-￯]'
END = re.compile(CJK + r'(</strong>|</a>|</code>|\*\*)?$')
START = re.compile(r'^\s*(' + CJK + r'|[A-Za-z0-9`\[(]|<strong>|<a |<code>|\*\*|\{\{)')

def join(text):
    lines, out, fence = text.split('\n'), [], False
    for ln in lines:
        if ln.strip().startswith('```'):
            fence = not fence
        if (not fence and out and END.search(out[-1].rstrip()) and START.match(ln)
                and not re.match(r'^\s*([-*+] |\d+\. |#|<li|<p|<h|<dt|<dd|<ul|<ol|<div|</)', ln)):
            out[-1] = out[-1].rstrip() + ln.lstrip()
        else:
            out.append(ln)
    return '\n'.join(out)

for f in sys.argv[1:]:
    s = open(f, encoding='utf-8').read()
    if s.startswith('---'):
        _, fm, body = s.split('---', 2)
        n = '---' + fm + '---' + join(body)
    else:
        n = join(s)
    if n != s:
        open(f, 'w', encoding='utf-8').write(n)
        print('joined', f)
