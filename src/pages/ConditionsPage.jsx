import SEO from '../components/SEO';
import Conditions from '../components/sections/Conditions';
import ForEveryone from '../components/sections/ForEveryone';

const ConditionsPage = () => {
  return (
    <>
      <SEO 
        title="Conditions Treated"
        description="Learn about the various pelvic floor conditions we treat at Pelvic Vitality, including incontinence, pelvic pain, postpartum recovery, and prostate recovery."
        url="https://pelvicvitality.com/conditions"
      />
      <Conditions />
      <ForEveryone />
    </>
  );
};

export default ConditionsPage;
