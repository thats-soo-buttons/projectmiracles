# Project Miracles - Development Guide

## Project Overview

ProjectMiracles.org is a crowdfunding platform for a horror TV show production. Features a retro terminal aesthetic with three funding goals, pledge tracking, and collaboration signup.

## Key Features

- **Retro Terminal UI**: Green-on-black CRT aesthetic with typing effects
- **Conditional Pledge System**: Pledges only charged when goals are met
- **3-Tier Funding Goals**: 
  - Goal 1: $15k (Writers/Musicians)
  - Goal 2: $100k (Pilot Production)
  - Goal 3: $50k (Distribution)
- **Collaboration Form**: For screenwriters, web devs, musicians, crew
- **Real-time Progress**: Live goal tracking with percentage indicators

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Local Storage (for data persistence)

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check for linting errors
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with global setup
│   ├── page.tsx            # Entry component (terminal gate)
│   └── globals.css         # Terminal styling, animations
├── components/
│   ├── TerminalEntry.tsx   # "ENTER" input gate
│   ├── Dashboard.tsx       # Main dashboard logic & tabs
│   ├── GoalTracker.tsx     # Progress bars & milestones
│   ├── PledgeForm.tsx      # Pledge submission
│   └── CollaborationForm.tsx # Role applications
└── lib/                    # (Reserved for utilities)
```

## Customization Guide

### Change Funding Goals

Edit `src/components/Dashboard.tsx` - modify the `GOALS` array:

```typescript
const GOALS: Goal[] = [
  {
    id: 1,
    name: "Goal Name",
    description: "What this funds",
    target: 15000,  // $ amount
    current: 0,     // (auto-calculated)
  },
];
```

### Modify Terminal Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  terminal: "#000000",           // Black background
  "terminal-green": "#00FF00",   // Bright green text
  "terminal-dark-green": "#00AA00", // Dim green text
}
```

### Add Collaboration Roles

Edit `src/components/CollaborationForm.tsx` - modify `roleOptions`:

```typescript
const roleOptions = [
  { id: "screenwriting", label: "Screenwriting" },
  // Add more roles here
];
```

## Data Storage

Currently uses browser `localStorage` for pledges:
- **Key**: `"pledges"` - stores array of pledge objects
- **Goal notifications**: `"goal-{id}-notified"` - tracks sent notifications

### Upgrade to Backend

To add a backend database:

1. Create API route in `src/app/api/pledges/route.ts`
2. Add database connection (Firebase, Supabase, PostgreSQL)
3. Replace localStorage calls in Dashboard.tsx with fetch() calls
4. Example:

```typescript
// Instead of: localStorage.setItem('pledges', ...)
const response = await fetch('/api/pledges', {
  method: 'POST',
  body: JSON.stringify(newPledge),
});
```

## Email Notifications

To add goal milestone emails (currently simulated):

1. Install email service package: `npm install nodemailer` or use SendGrid
2. Create API route: `src/app/api/send-email/route.ts`
3. Call when goal is reached:

```typescript
await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({
    to: pledgerEmail,
    subject: `Goal ${goalId} Reached!`,
  }),
});
```

## Deployment

### To Vercel

```bash
npm i -g vercel
vercel
```

Follow prompts to connect GitHub repo and deploy.

### Custom Domain

1. In Vercel dashboard, go to Settings → Domains
2. Add `projectmiracles.org`
3. Update DNS settings at your domain registrar
4. Point to Vercel nameservers

## Common Tasks

### Add a New Pledge
Automatically saved when user submits form - updates all goal progress bars

### Trigger Goal Milestone
Pledges automatically check - when total ≥ goal amount, notification fires

### View Pledges (Dev)
Browser DevTools → Application → Local Storage → pledges

### Debug Terminal Colors
Change `text-terminal-green` classes to see where colors are used

## Testing Checklist

- [ ] Terminal entry accepts "ENTER" (case-insensitive)
- [ ] Invalid input shows error message
- [ ] Pledges save to localStorage
- [ ] Goal progress bars update in real-time
- [ ] Goal reached notification appears at 15k, 115k, 165k
- [ ] Collaboration form validation works
- [ ] Responsive on mobile (all forms stack)
- [ ] Terminal animations play smoothly

## Future Enhancements

- [ ] Email notification integration (SendGrid/Mailgun)
- [ ] Payment processing (Stripe/PayPal)
- [ ] User authentication (NextAuth.js)
- [ ] Tier rewards system
- [ ] Production blog/updates feed
- [ ] Video embeds for production clips
- [ ] Admin dashboard for managing pledges

## Performance Notes

- All components use `"use client"` for interactivity
- localStorage reads on mount, writes on every pledge
- No external API calls currently (ready for backend)
- CSS animations use GPU acceleration

## Support

For questions or feature requests, refer to:
- README.md for overview
- SETUP_GUIDE.md for deployment
- Component files for implementation details
