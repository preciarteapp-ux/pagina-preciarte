import SEOHead from '@/components/SEOHead';
import useAnalytics from '@/hooks/useAnalytics';

const LP6 = () => {
  useAnalytics();

  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
    </div>
  );
};

export default LP6;
