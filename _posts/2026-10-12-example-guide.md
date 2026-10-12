---
layout: guide
title: "How Jekyll works"
lead: "A short guide written in Markdown that uses the guide layout."
---

## What Jekyll does

Jekyll reads your files, converts Markdown to HTML, wraps it in a layout, and writes the result to `_site`.

## Install it

```bash
gem install jekyll bundler
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000` in your browser.
{: .note}

## Folder reference

| Folder | Purpose |
|---|---|
| `_posts/` | Blog posts named `YYYY-MM-DD-title.md` |
| `_layouts/` | Page templates |
| `_includes/` | Reusable HTML pieces |

## Common mistakes

<details markdown="1">
<summary>My changes to _config.yml do nothing</summary>

Restart the server. Jekyll reads that file only at start-up.
</details>

<details markdown="1">
<summary>My file shows raw Markdown</summary>

The file has no front matter. Add two lines of `---` at the top.
</details>
