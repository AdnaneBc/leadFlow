# LeadFlow

A lightweight lead tracker for freelancers: keep your sales contacts in one place, follow their status, and see who to follow up with.

**Live demo:** https://lead-flow-livid.vercel.app/

## Features

- **Add a lead**: full name, email, company, estimated value and status. Required fields are validated, the value must be positive, and duplicate emails are rejected.
- **Edit a lead**: update name, company and estimated value inline.
- **Delete a lead** and **mark it as contacted** in one click.
- **Search** across name, email and company.
- **Filter by status**: new, contacted, qualified, won, lost. Search and filter combine.
- **Local persistence**: leads are saved in the browser (`localStorage`) and survive a page reload. Corrupted data is handled without crashing.
- **Responsive**: mobile-first layout, one column on phones, grid on larger screens.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vite.dev/) for development and build
- Plain CSS (Flexbox, Grid, media queries)
- `localStorage` for persistence (no backend)

## Getting started

Requirements: Node.js 20 or later.

```bash
git clone https://github.com/AdnaneBc/leadFlow.git
cd leadFlow
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build   # type-check and build for production
npm run lint    # run ESLint
```

## Project structure

```
src/
├── App.tsx                # state, add form, search and filter
├── App.css                # layout and styles
├── components/
│   ├── Lead.tsx           # lead card with edit, delete and status actions
│   └── leads-util.ts      # pure functions: search, filter, update
└── types/
    └── lead.ts            # LeadType, LeadStatus, LeadUpdates
```

## Roadmap

- Deploy a public demo
- Usage analytics (tracking plan + event tracking)
- Backend and user accounts

## Author

Built by [Adnane](https://github.com/AdnaneBc) as part of a full-stack learning path.
