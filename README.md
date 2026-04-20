# Adaptive AI Scaffold

A research platform for designing AI writing tools that preserve student reasoning, encourage engagement with course materials, and make learning processes visible to teachers.

---

## Overview

Generative AI tools are increasingly used in academic writing. While they improve productivity and fluency, they often function as *answer engines*, reducing reasoning effort and obscuring how students arrive at their final work.

This project explores an alternative paradigm:

> **AI as an adaptive scaffold that supports thinking rather than replacing it.**

Instead of providing direct answers by default, the system controls *when and how* assistance is given based on student input and effort.

---

## Core Idea

We propose **adaptive AI scaffolding** for learning:

- Students must **externalize reasoning** before receiving help  
- AI assistance is **progressively revealed** (hint → critique → outline → answer)  
- Responses are **grounded in course materials**  
- All interactions are recorded as a **learning trace**  
- Teachers gain visibility into **how work was produced**, not just the final output  

---

## Key Features (MVP)

### ✍️ Reasoning-First Writing Workspace
- Students write their initial thoughts before requesting help
- Encourages active engagement and reduces passive AI reliance

### 🧠 Adaptive AI Assistance
AI support is not static. It depends on student context:
- Hint
- Critique
- Explanation
- Outline
- Full answer (last resort)

### 📚 Source-Grounded Responses
- AI retrieves and uses only instructor-provided materials
- Prevents bypassing readings and encourages source engagement

### 🔍 Learning Trace Logging
- Tracks drafts, AI interactions, and revisions
- Enables analysis of reasoning and learning behavior

### 👩‍🏫 Teacher Visibility (Planned)
- Dashboard showing:
  - student drafts
  - AI usage patterns
  - revision history
  - source usage

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

We will evaluate three conditions:

1. **Standard chatbot**
2. **Static scaffolded AI (limited assistance)**
3. **Adaptive scaffolded AI (this system)**

### Measures
- Writing quality
- Reasoning depth
- Source engagement
- AI usage behavior
- Teacher understanding of student learning

---

## Tech Stack (Initial)

- Frontend: Next.js + Tailwind CSS  
- Backend: FastAPI  
- Database: Supabase / PostgreSQL  
- AI: LLM API + Retrieval-Augmented Generation (RAG)  
- Deployment: Vercel (frontend), Railway/Render (backend)  

---

## Project Structure
