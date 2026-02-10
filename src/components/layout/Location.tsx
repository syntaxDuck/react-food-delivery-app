import React from "react";
import { motion } from "framer-motion";
import AnimatedCard from "../ui/AnimatedCard";
import AnimatedButton from "../ui/AnimatedButton";
import Section from "./Section";
import { compoundClasses } from "../../utils/compoundClasses";

const Location = () => {

  const futureCities = [
    { city: "Detroit", season: "Spring", year: "2023", delay: 0.1 },
    { city: "Los Angeles", season: "Summer", year: "2023", delay: 0.2 },
    { city: "Boston", season: "Winter", year: "2023", delay: 0.3 },
    { city: "Chicago", season: "Spring", year: "2024", delay: 0.4 },
    { city: "Las Vegas", season: "Summer", year: "2024", delay: 0.5 }
  ];

  // More subtle city variants
  const cityVariants = {
    initial: { opacity: 0, x: -15 },
    animate: { opacity: 1, x: 0 },
    hover: { scale: 1.02, x: 5 }  // More subtle
  };

  return (
    <Section id="location" padding="spacious" spacing="relaxed" background="gradient">
      <motion.div
        className={compoundClasses.content.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}  // More subtle
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Find Us in{" "}
          <span className="text-primary">Austin, TX</span>
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          We're currently serving the Austin area, with exciting expansion plans coming soon to major cities across the US.
        </p>
      </motion.div>

      {/* Enhanced Map Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <AnimatedCard delay={0.3} className="overflow-hidden">
          <motion.div
            className="rounded-lg overflow-hidden aspect-video"
            whileHover={{ scale: 1.01 }}  // More subtle
            transition={{ type: "spring", stiffness: 200 }}
          >
            <iframe
              title="Austin Location Map"
              className="w-full h-full"
              src="https://maps.google.com/maps?q=austin.%20tx&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </AnimatedCard>

        <AnimatedCard delay={0.5} className="p-8">
          <h3 className="text-2xl font-bold text-white mb-8">Service Area</h3>
          <p className="text-white/80 leading-relaxed text-lg mb-8">
            We're proud to serve the greater Austin area with our cutting-edge delivery technology.
            From downtown to the suburbs, we've got you covered.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="material-icons md-20 text-primary">schedule</span>
              <span className="text-white">24/7 Delivery Service</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="material-icons md-20 text-primary">local_shipping</span>
              <span className="text-white">Autonomous Drone Fleet</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="material-icons md-20 text-primary">attach_money</span>
              <span className="text-white">Flat $5 Delivery Fee</span>
            </div>
          </div>
        </AnimatedCard>
      </div>

      {/* Enhanced Future Cities */}
      <AnimatedCard delay={0.7} className="p-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Coming Soon to Your City</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureCities.map((city) => (
            <motion.div
              key={city.city}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              variants={cityVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: city.delay }}
            >
              <div>
                <div className="text-white font-medium">{city.city}</div>
                <div className="text-sm text-white/60">{city.season} {city.year}</div>
              </div>
              <AnimatedButton size="sm" variant="outline">
                Coming Soon
              </AnimatedButton>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>

      {/* Enhanced CTA */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}  // More subtle
      >
        <AnimatedButton
          variant="secondary"
          size="lg"
          onClick={() => {
            const element = document.getElementById('about-us');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="material-icons md-18 mr-2">info</span>
          Learn More About Us
        </AnimatedButton>
      </motion.div>
    </Section>
  );
};

export default React.memo(Location);
