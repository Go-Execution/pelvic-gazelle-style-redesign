import SEO from '../components/SEO';
import InnerPageHero from '../components/shared/InnerPageHero';
import { ResearchSurveyModal } from '../components/survey/ResearchSurveyModal';

const SurveyPage = () => {
  return (
    <>
      <SEO 
        title="Pelvic Floor Research Survey"
        description="Official Pelvic Floor Research Survey by Next Medical Technologies & Pelvic Vitality. Complete our confidential clinical intake."
        url="https://pelvicvitality.com/survey"
      />

      <InnerPageHero 
        title="Pelvic Floor Research Survey"
        subtitle="Confidential symptom evaluation to help our clinical team assess your pelvic health and discuss targeted non-invasive therapy."
      />

      <div className="bg-smoke py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Render the full interactive survey embedded inline */}
          <ResearchSurveyModal isOpen={true} showFloatingTrigger={false} />
        </div>
      </div>
    </>
  );
};

export default SurveyPage;
