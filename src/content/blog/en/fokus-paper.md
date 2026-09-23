---
title: "Turning a class project into a published paper: the story behind FOKUS!"
description: "Notes on turning a class project into a published paper, and what I learned from three Agile sprints with a team."
lang: "en"
pubDate: 2026-09-02
tags: ["Next.js", "Supabase", "Research"]
---

FOKUS! started out as just a class project — a scheduling and task-management app I built with four teammates. What I didn't expect was that we'd end up writing it up as a paper and getting it published in a journal.

## Three sprints, one app

We split FOKUS!'s development into three Agile sprints:

1. **Sprint 1** — UI/UX design in Figma, mapping out the user flow from sign-up to task reminders
2. **Sprint 2** — backend and frontend build-out, with Next.js on the frontend and Supabase (Postgres + Supabase Auth) on the backend
3. **Sprint 3** — task CRUD, reminder notifications, and syncing

Once the app was built, we ran two kinds of testing: White Box, to confirm frontend code coverage, and Black Box, to make sure the core flows — registration, login, task management, reminders — actually worked from a user's point of view.

## The part that was harder than coding

Writing the paper turned out to be just as challenging as building the app, maybe more so. Every technical decision that felt "obvious" while coding — why Supabase, why three sprints, why that database structure — had to be explained and justified on paper.

The result was published in the *Journal of Embedded Systems, Security and Intelligent Systems* (JESSI), Vol. 6 No. 2, 2025 — together with Mushaf, Nurul Ilmi, Nurfadilah, and Ahmad Khairul Shiddiq.

If there's one thing I took away from this: a class project that feels "small" often carries more value than you'd expect, as long as you're willing to see it through properly.
