export default function PublicPrivacyTermsPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Legal</p>
        <h1 className="display-lg">Privacy & Terms</h1>
        <p className="page-lede">Placeholder legal page for the first-pass site. Final policies can be added before launch</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="fine-print">
          <h2>Privacy Policy</h2>
          <p>
            Optimal Sport Health Clubs may collect basic contact information when visitors request a pass, call a club, or submit an inquiry. Replace this copy with approved legal language
          </p>
        </section>
        <section className="fine-print">
          <h2>Terms & Conditions</h2>
          <p>
            Membership terms, billing policies, cancellation windows, and guest-pass conditions should be confirmed with the client and added here before production launch
          </p>
        </section>
      </div>
    </div>
  );
}
