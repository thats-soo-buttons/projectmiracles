export default function TermsPage() {
  return (
    <main className="min-h-screen bg-terminal text-terminal-green p-4 md:p-8">
      <div className="max-w-4xl mx-auto border border-terminal-green p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl terminal-text mb-2">TERMS & PLEDGE POLICY</h1>
        <p className="text-terminal-dark-green mb-8">Project Miracles Conditional Pledge Agreement</p>
        <p className="text-terminal-green text-sm mb-8">ProjectMiracles.org is the official website for Project Miracles.</p>

        <div className="border border-terminal-green p-4 mb-8 text-sm space-y-2 bg-terminal-dark-green bg-opacity-10">
          <p className="text-terminal-green font-bold">OFFICIAL VERIFICATION & FRAUD WARNING</p>
          <p className="text-terminal-dark-green">Only trust communications from ProjectMiracles.org and DevillierMedia.com.</p>
          <p className="text-terminal-dark-green">No payment is collected when you submit a pledge.</p>
          <p className="text-terminal-dark-green">Milestone emails will ask you to confirm or decline before any payment is processed.</p>
        </div>

        <section className="space-y-4 text-sm md:text-base">
          <div>
            <h2 className="text-xl text-terminal-green mb-2">1. Conditional Pledge Only</h2>
            <p className="text-terminal-dark-green">
              A pledge on this website is a non-binding expression of support. Submitting a pledge does not
              immediately collect money.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-terminal-green mb-2">2. No Immediate Charge</h2>
            <p className="text-terminal-dark-green">
              No payment method is charged when you submit a pledge. Your name, email, and pledge amount are
              recorded only so we can notify you when a funding milestone is reached.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-terminal-green mb-2">3. Goal Reached Notification</h2>
            <p className="text-terminal-dark-green">
              If a goal is reached, you will receive an email with milestone details, project status, and a link
              to review reward details for your pledge level.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-terminal-green mb-2">4. Confirm or Decline</h2>
            <p className="text-terminal-dark-green">
              After receiving the milestone email, you decide whether to continue. You can confirm your pledge or
              decline before any payment is collected.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-terminal-green mb-2">5. Reward Details</h2>
            <p className="text-terminal-dark-green">
              Reward tiers are offered as a thank-you for support and are subject to successful funding and
              production progress. Delivery timelines and specifics will be provided in milestone emails.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-terminal-green mb-2">6. Contact Data Use</h2>
            <p className="text-terminal-dark-green">
              Your information is used for pledge administration, milestone notices, and project updates. We do not
              sell your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-terminal-green mb-2">7. Policy Updates</h2>
            <p className="text-terminal-dark-green">
              These terms may be updated as project operations evolve. Material updates will be reflected on this
              page.
            </p>
          </div>
        </section>

        <div className="mt-8 pt-6 border-t border-terminal-dark-green text-xs text-terminal-dark-green space-y-2">
          <p>
            Legal note: This policy text is for project communication and should be reviewed by licensed legal
            counsel before collecting payments.
          </p>
          <a href="/" className="inline-block border border-terminal-green px-4 py-2 text-terminal-green hover:bg-terminal-dark-green hover:text-terminal mt-2">
            RETURN TO PROJECT MIRACLES
          </a>
        </div>
      </div>
    </main>
  );
}
