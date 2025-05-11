
const ImpactSection = () => {
  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center mb-2">Your Impact</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          See how your donations are making a difference in communities around the world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary-blue mb-4">5,000+</div>
            <h3 className="text-xl font-serif font-semibold mb-2">Children Supported</h3>
            <p className="text-gray-600">
              Your donations have helped provide education, healthcare, and nutrition to over 5,000 children globally.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary-blue mb-4">20+</div>
            <h3 className="text-xl font-serif font-semibold mb-2">Communities Served</h3>
            <p className="text-gray-600">
              We've established sustainable development programs in more than 20 communities.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary-blue mb-4">$2M+</div>
            <h3 className="text-xl font-serif font-semibold mb-2">Funds Raised</h3>
            <p className="text-gray-600">
              Together, we've raised over $2 million for critical projects and emergency relief.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
