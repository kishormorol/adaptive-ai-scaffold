# Adaptive AI Scaffold

A research platform for designing AI writing tools that preserve student reasoning, encourage engagement with course materials, and make learning processes visible to teachers.

**Live demo:** https://kishormorol.github.io/adaptive-ai-scaffold/

---

## Overview

Generative AI tools are increasingly used in academic writing. While they improve productivity and fluency, they often function as *answer engines*, reducing reasoning effort and obscuring how students arrive at their final work.

This project explores an alternative paradigm:

> **AI as an adaptive scaffold that supports thinking rather than replacing it.**

Instead of providing direct answers by default, the system controls *when and how* assistance is given based on student input and effort.

---

## Screens

### ✍️ Write
The main student workspace. Includes an assignment header, reasoning gate, and paper-styled editor. The "Ask AI" button opens an inline guided flow — not a chat.

### 🤖 Ask AI (inline flow)
A 3-step guided interaction:
1. **Context** — student describes what they've tried (enforced by gate strictness)
2. **Kind of help** — tiered options ordered by how much thinking they leave to the student:
   - Hint → Critique → Explain → Outline → Full answer (last resort, requires reflection)
3. **Response** — grounded in course materials, with source cards and echo-back of the student's own draft

### 🔍 Trace
Before/after diff view of the student's draft across three snapshots. AI-authored spans are highlighted and hoverable — each links back to the AI event that produced it. Includes an interaction timeline and source grounding footnotes.

### 👩‍🏫 Instructor
Class roster with initial reasoning histogram, flags (students who used last-resort help), and AI usage breakdown. Clicking a student opens their trace with auto-surfaced "Key Moments" interpretation.

---

## Reasoning Gate

Controls how strictly students must write before AI unlocks. Configurable via the top bar or the § Tweaks panel:

| Mode | Behavior |
|------|----------|
| **Soft** | Suggested minimum; skippable |
| **Medium** | Word threshold required; reason to skip |
| **Hard** | AI disabled until threshold met; requires structured reflection before any AI use |

---

## Tech Stack

- **Frontend:** Next.js + CSS variables (paper/lab-notebook aesthetic)
- **Deployment:** GitHub Pages (static export)
- **Backend (planned):** FastAPI
- **Database (planned):** Supabase / PostgreSQL
- **AI (planned):** LLM API + Retrieval-Augmented Generation (RAG)

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
components/
  data.js          # Assignment, sources, stages, class roster
  primitives.jsx   # Icons, TopBar, FigCaption, SourceSnippet, MiniBar
  writing.jsx      # Student workspace + reasoning gate
  askai.jsx        # 3-step Ask AI flow + HELP_KINDS
  trace.jsx        # Diff view, timeline, actions panel
  teacher.jsx      # Instructor dashboard + student detail
  tweaks.jsx       # Gate strictness panel
pages/
  index.jsx        # App shell + screen routing
  _app.jsx         # Global CSS import
styles/
  globals.css      # Design system (paper tones, typography, animations)
project/           # Original HTML/CSS prototype (reference)
```

---

## Research Motivation

Current AI tools optimize for output quality and efficiency but neglect:
- reasoning effort
- engagement with learning materials
- transparency in the learning process

This project investigates:

> **Can AI tools be designed to support writing without replacing learning?**

---

## Planned Study

Three conditions will be compared:

1. **Standard chatbot**
2. **Static scaffolded AI** (limited assistance)
3. **Adaptive scaffolded AI** (this system)

### Measures
- Writing quality
- Reasoning depth
- Source engagement
- AI usage behavior
- Teacher understanding of student learning
