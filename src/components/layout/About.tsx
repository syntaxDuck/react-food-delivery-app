import { motion } from "framer-motion";
import React from "react";

import image from "../../assets/drone.jpg";
import { compoundClasses } from "../../utils/compoundClasses";
import AnimatedCard from "../ui/AnimatedCard";
import Section from "./Section";

const AboutUs = () => {
  // Subtle hero variants
  const heroVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.6 }  // Shorter, more subtle
    }
  };

  // Subtle feature variants
  const featureVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.5 }  // More subtle
    },
    hover: {
      y: -3,  // Less movement
      transition: { type: "spring" as const, stiffness: 200, damping: 25 }  // Softer
    }
  };

  const features = [
    {
      icon: "schedule",
      title: "24/7 Availability",
      description: "Order your favorite dish from your favorite breakfast joint at 3am if desired. We don't judge, we just deliver!"
    },
    {
      icon: "local_shipping",
      title: "Autonomous Delivery",
      description: "Our proprietary autonomous drones deliver your food any time on time with cutting-edge technology."
    },
    {
      icon: "attach_money",
      title: "Flat Rate Delivery",
      description: "Industry-leading $5 flat delivery fee. No surge pricing, no hidden costs."
    }
  ];

  return (
    <Section 
      id="about-us" 
      className="" 
      background="transparent" 
      padding="spacious" 
      spacing="relaxed" 
      container={true}
    >
      <motion.div variants={heroVariants} className={compoundClasses.content.hero}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
          Welcome to{" "}
          <span className="text-primary">Chrono Delivery!</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
          We have everything for your daily delivery needs! Please keep an eye out for new items
          as our menu is constantly being updated with local cuisine from several restaurants in your area.
        </p>
      </motion.div>

      {/* Enhanced Features Grid */}
      <div className={compoundClasses.content.grid.responsive + ' ' + compoundClasses.content.grid.spaced + ' mb-20'}>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={featureVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: 0.05 * index }}  // Faster stagger
          >
            <AnimatedCard
              delay={index * 0.05}
              className="text-center group hover:bg-white/15 p-8"
            >
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.05, rotate: 3 }}  // More subtle
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="material-icons md-48 text-primary">{feature.icon}</span>
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed text-lg">
                {feature.description}
              </p>
            </AnimatedCard>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Technology Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimatedCard delay={0.4} className="p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">Technology First</h3>
          <div className="space-y-6">
            <p className="text-white/80 leading-relaxed text-lg">
              Chrono Delivery is proud to be the only delivery app that can deliver whatever you want
              whenever you want with our autonomous drone fleet.
            </p>
            <motion.div
              className="flex items-center space-x-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}  // More subtle
            >
              <div className="flex-1 h-1 bg-primary/30 rounded"></div>
              <motion.span
                className="material-icons md-28 text-primary"
                whileHover={{ scale: 1.1, rotate: 8 }}  // More subtle
                transition={{ type: "spring", stiffness: 200 }}
              >
                flight
              </motion.span>
              <div className="flex-1 h-1 bg-primary/30 rounded"></div>
            </motion.div>
            <p className="text-white/80 leading-relaxed text-lg">
              All this at one flat delivery charge with precision timing and real-time tracking.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.6} className="flex items-center justify-center p-8">
          <motion.img
            src={image}
            alt="Delivery Drone"
            className="rounded-xl max-w-full h-auto shadow-xl"
            whileHover={{ scale: 1.02, rotate: 1 }}  // Much more subtle
            transition={{ type: "spring", stiffness: 200 }}
          />
        </AnimatedCard>
      </div>
    </Section>
  );
};

export default React.memo(AboutUs);
