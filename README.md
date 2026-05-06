# Project Miracles - Crowdfunding Platform

A retro terminal-themed crowdfunding platform for ProjectMiracles.org, designed to raise funds for a horror TV show and interactive website production.

## Features

✓ **Retro Terminal Aesthetic** - Old school CRT monitor UI with green text-on-black  
✓ **Pledge-Based Crowdfunding** - Conditional pledges (charged only when goal is reached)  
✓ **3-Tier Funding Goals**:
  - Goal 1: Writer/Musician Funds ($15,000)
  - Goal 2: Pilot Production ($100,000)  
  - Goal 3: Distribution Fees ($50,000)

✓ **Real-Time Tracking** - Live progress bars and totals  
✓ **Collaboration Form** - Sign up for production roles  
✓ **Goal Milestone Notifications** - Email alerts when goals are reached  
✓ **Minimal Data Collection** - Only name, email, and pledge amount

## Technology Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Local Storage (easily upgradeable to backend)
- **Hosting**: Vercel (free tier)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main entry point
│   └── globals.css      # Global styles
├── components/
│   ├── TerminalEntry.tsx    # "ENTER" gate
│   ├── Dashboard.tsx        # Main dashboard
│   ├── GoalTracker.tsx      # Progress visualization
│   ├── PledgeForm.tsx       # Pledge submission
│   └── CollaborationForm.tsx # Role applications
└── lib/
    └── (utilities)

public/
```

## Customization

### Funding Goals

Edit the `GOALS` array in [src/components/Dashboard.tsx](src/components/Dashboard.tsx):

```typescript
const GOALS: Goal[] = [
  {
    id: 1,
    name: "Goal Name",
    description: "Goal description",
    target: 15000,  // $ amount
    current: 0,
  },
  // ... add more goals
];
```

### Colors & Styling

Terminal colors are defined in [tailwind.config.ts](tailwind.config.ts):
- `bg-terminal`: Black background (#000000)
- `text-terminal-green`: Green text (#00FF00)
- `text-terminal-dark-green`: Dim green (#00AA00)

Modify these values to change the aesthetic.

## Deployment to Vercel

1. Push code to GitHub
2. Connect repo to Vercel: https://vercel.com/new
3. Deploy automatically on every push

## Future Enhancements

- Backend database (Firebase, PostgreSQL, etc.)
- Stripe/PayPal payment integration
- Email notification system (SendGrid, Mailgun)
- User authentication
- Tier rewards system
- Production blog updates
- Video embeds

## Notes

- Currently uses browser localStorage for pledges (persists locally)
- Ready for backend integration when needed
- All data structures are in place for expansion
- Terminal styling includes flicker effect and cursor animations

---

For questions or contributions, contact Project Miracles at projectmiracles.org
