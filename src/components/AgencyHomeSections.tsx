import './agency-home.css';
import MaidsHelpersCarousel from '@/components/MaidsHelpersCarousel';
import MaidsEligibility from '@/components/MaidsEligibility';
import { fetchAvailableMaids } from '@/lib/maids-extras';
import AgencyHeading from '@/components/AgencyHeading';

// Agency homepage (agency.genesiscare.com.my): the "available candidates" section as a moving carousel with age, marital
// status, salary, nationality and languages, then the who-can-apply form. Both use the agency's own WhatsApp number.
const AGENCY_PHONE = '60193250457';

export async function AgencyCandidates() {
  const helpers = await fetchAvailableMaids(16);
  if (!helpers.length) return null;
  return (
    <section className="glc-section glc-section--tint" id="biodata">
      <div className="glc-container agency-ui">
        <MaidsHelpersCarousel helpers={helpers} variant="maid" code="AGENCY-HOME" phone={AGENCY_PHONE} agency />
        <p style={{ marginTop: 16, textAlign: 'center' }}>
          <a className="glc-btn glc-btn--primary" href="/biodata">
            <AgencyHeading text="Browse all biodata →" />
          </a>
        </p>
      </div>
    </section>
  );
}

export function AgencyEligibility() {
  return (
    <section className="glc-section" id="can-you-apply">
      <div className="glc-container glc-container--narrow agency-ui">
        <div className="glc-section__head glc-section__head--center">
          <span className="glc-eyebrow">
            <AgencyHeading text="Check before you apply" />
          </span>
          <h2>
            <AgencyHeading text="Can your family hire a domestic helper?" />
          </h2>
        </div>
        <MaidsEligibility code="AGENCY-HOME" phone={AGENCY_PHONE} />
      </div>
    </section>
  );
}
