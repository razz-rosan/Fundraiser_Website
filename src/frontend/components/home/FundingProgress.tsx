
import { useAppSelector } from '@/hooks/redux-hooks';

const FundingProgress = () => {
  const { goals } = useAppSelector((state) => state.funding);
  
  if (goals.length === 0) {
    return null;
  }
  
  const currentGoal = goals[0];
  const percentage = (currentGoal.current / currentGoal.amount) * 100;
  const formattedPercentage = Math.min(percentage, 100).toFixed(1);
  const remainingAmount = currentGoal.amount - currentGoal.current;
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center mb-12">{currentGoal.title}</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span>Currently Raised: ${(currentGoal.current).toLocaleString()}</span>
            <span>Goal: ${(currentGoal.amount).toLocaleString()}</span>
          </div>
          
          <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary-green rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${formattedPercentage}%`,
                '--progress-width': `${formattedPercentage}%` 
              } as React.CSSProperties}
            ></div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-3xl font-bold text-secondary-green">{formattedPercentage}%</div>
            <div className="text-right">
              <p className="font-medium">Still needed:</p>
              <p className="text-2xl font-bold">${remainingAmount.toLocaleString()}</p>
            </div>
          </div>
          
          {currentGoal.description && (
            <p className="mt-6 text-center text-gray-600">{currentGoal.description}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FundingProgress;
