---
layout: post
lang: en
permalink: /writing/mcp-japanese-filesystems/
alt_url: /ja/writing/mcp-japanese-filesystems/
title: "MCP servers on Japanese filesystems: the bugs nobody warns you about"
tags: [MCP, Japanese, Unicode, filesystems]
description: >-
  Two paths that render identically on screen, compare as different strings, and
  send an agent into a retry loop. What actually breaks when a filesystem MCP
  server meets Japanese filenames, and how to make it stop.
---

Most filesystem MCP servers are about forty lines of code. You expose
`read_file`, `list_dir` and `write_file`, you join some paths, you hand the tool
schema to a model and it works. It works on the demo repo, it works on your own
project directory, and it keeps working right up until someone points it at a
directory full of Japanese filenames.

Then you get a bug report that reads like nonsense: *the agent says the file
does not exist, but I can see it in the listing it just printed.*

## Two names, same pixels

The immediate cause is Unicode normalisation. `が` can be one code point
(U+304C) or two — `か` U+304B followed by the combining voiced mark U+3099.
Those are canonically equivalent. They render identically. Every Japanese
reader would call them the same character. They are not the same string.

macOS has historically stored filenames decomposed, close to NFD. Windows and
Linux generally leave whatever the creating application produced, which in
practice means NFC. So the same file, created on a Mac and read over a share
from Linux, gives you a name that fails `==` against the name a user typed.

That is the whole bug. `list_dir` returns the decomposed form, the model echoes
it back verbatim into `read_file`, and something in your stack — or the
filesystem itself — compares it against the composed form and reports no such
file. The model, being a model, assumes it got the path slightly wrong and
tries again. And again. I have watched a small model burn a dozen turns
re-typing a filename that was correct every single time.

The fix is unglamorous: normalise at the boundary, and pick one form.

```python
import unicodedata
from pathlib import Path

def canon(p: str | Path) -> str:
    # NFC on the way in and on the way out. Which form matters less than
    # being consistent — every comparison has to see the same one.
    return unicodedata.normalize("NFC", str(p))
```

Normalise what you return from `list_dir`, normalise what arrives in
`read_file`, and compare only normalised forms. Do not normalise and then hand
the normalised string to the OS on a filesystem that stored the decomposed
form — resolve against a real directory listing instead of trusting your own
reconstruction.

## Byte-length is not length

The second thing that bites is anything that counts characters.

Truncating a path for a log line, enforcing a name length limit, slicing a
string to fit a display column — all of these are safe in ASCII and dangerous
here. A Japanese filename is routinely three bytes per character in UTF-8, so a
255-byte filesystem limit is not 255 characters, and a "safe" 200-character
truncation can produce a name the OS rejects. Worse, slicing at a byte offset
can split a multi-byte sequence and give you invalid UTF-8, which then blows up
somewhere completely unrelated to the code that caused it.

If you truncate, truncate on character boundaries and budget in bytes:

```python
def clip(name: str, max_bytes: int = 200) -> str:
    b = name.encode("utf-8")
    if len(b) <= max_bytes:
        return name
    # Cut in the byte domain, then discard the partial character at the end.
    return b[:max_bytes].decode("utf-8", errors="ignore")
```

## The legacy encoding problem

Then there is CP932. Plenty of Japanese corporate filesystems contain files
named years ago by software that wrote Shift-JIS, and those bytes are not valid
UTF-8. On Linux you will meet them as filenames that cannot be decoded at all.
Python will hand you surrogate escapes; naive code will raise
`UnicodeDecodeError` halfway through a directory walk and take out the whole
`list_dir` call.

The failure mode that matters is not the undecodable file. It is that one bad
file makes the tool return an error instead of a listing, so the agent
concludes the directory is unreadable and gives up on a task it could have
completed using the other 400 files. Decode defensively, per entry, and let the
listing survive its worst member:

```python
def safe_entries(d: Path) -> list[str]:
    out = []
    for entry in d.iterdir():
        try:
            out.append(canon(entry.name))
        except (UnicodeDecodeError, OSError):
            continue   # skip the entry, keep the directory usable
    return out
```

Silently skipping is a real trade-off and worth being explicit about in the
tool's own output — I return the count of skipped entries so the model can say
"I could not read 2 of 402 files" rather than pretending the directory was
complete.

## Full-width characters in tool arguments

The last one is my favourite, because it is invisible. Japanese input methods
produce full-width forms of characters you think of as ASCII: `：` not `:`,
`／` not `/`, `　` (U+3000) not a space. When a path is typed through a
Japanese IME — or when a model reproduces one it saw in Japanese context —
you can get a full-width colon inside what is otherwise a normal Windows path.

It looks correct. It is not correct. `NFKC` normalisation folds these to their
ASCII equivalents, which is what you want for *arguments*, and emphatically not
what you want for *file content*, because NFKC will also rewrite legitimate text
in ways nobody asked for. Normalise arguments with NFKC; leave content alone.

## Why this ends up mattering

None of this is difficult. It is just invisible until you are the person whose
agent cannot read the company's document folder, and there is very little
written about it in English because the people who hit it are mostly working in
Japanese.

The reason it is worth the care is that a filesystem tool is the foundation
everything else sits on. A RAG pipeline over a Japanese document store, an
agent asked to refactor a codebase with Japanese comments and filenames, an
MCP server exposing internal records — all of them fail in the same
unhelpful way, and all of them fail as "the model is being stupid" rather than
"the string comparison is wrong two layers down."

Normalise at the boundary. Count bytes when the filesystem counts bytes. Let a
directory listing survive one bad filename. That is most of it.
