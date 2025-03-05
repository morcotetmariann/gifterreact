import './heroSection.css';

const HeroSection = () => {
  return (
    <div class="heroSectionContainer">
      <section class="hero-section">
        <div class="hero-container">
          <h1 class="hero-title">
            Discover Perfect Gifts with AI Magic!
            <br />
            Effortless Gift Ideas Tailored Just for Your Partner
          </h1>
          <p class="hero-subtitle">
            Let our AI agents find the perfect gift for any occasion. Save time
            and impress your loved ones with thoughtful, personalized
            recommendations.
          </p>
          <div class="hero-buttons">
            <a href="#" class="btn btn-primary">
              Start Finding Gifts
            </a>
            {/* <a href="#" class="btn btn-secondary">
                Learn More
              </a> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
