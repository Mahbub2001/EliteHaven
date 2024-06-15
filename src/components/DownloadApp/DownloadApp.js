import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GrAndroid } from "react-icons/gr";
import { FaApple } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const DownloadApp = () => {
  const imageVariants = {
    animate: {
      y: [0, -10, 0], // Move up 10px, then back down
      transition: {
        duration: 2, // Duration of one cycle
        repeat: Infinity, // Repeat forever
        repeatType: "loop", // Repeat type
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [ref, inView] = useInView({
    triggerOnce: false, // Trigger the animation every time it comes into view
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div className="relative mt-16">
      <div
        className="h-[40rem] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: 'url("/phone_back.png")' }}
      >
        <div className="pb-5 lg:grid grid-cols-2 container px-3 py-1 justify-center items-center gap-5">
          <div className="hidden lg:block relative">
            <motion.div variants={imageVariants} animate="animate">
              <Image
                src="/phone.png"
                alt="Trending Place"
                height={400}
                width={400}
                className="shadow-md transform skew-y-6 skew-x-3"
              />
            </motion.div>
          </div>
          <div className="hidden md:flex lg:hidden relative justify-center items-center">
            <motion.div variants={imageVariants} animate="animate">
              <Image
                src="/phone.png"
                alt="Trending Place"
                height={300}
                width={300}
                className="shadow-md transform skew-y-6 skew-x-3"
              />
            </motion.div>
          </div>
          <div className="sm:hidden relative flex justify-center">
            <motion.div variants={imageVariants} animate="animate">
              <Image
                src="/phone.png"
                alt="Trending Place"
                height={200}
                width={200}
                className="shadow-md transform skew-y-6 skew-x-3"
              />
            </motion.div>
          </div>

          <motion.div
            className="text-white"
            initial="hidden"
            animate={controls}
            variants={textVariants}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2 mt-2">
              EliteHaven Tour Mobile App
            </h1>
            <p className="text-sm">Available on IOS & Android</p>
            <p className="text-sm mt-2 mb-4">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
            <div ref={ref} className="flex gap-4 items-center">
              <motion.div
                className="flex items-center bg-yellow-400 text-black font-bold px-4 rounded-full hover:bg-yellow-500"
                initial="hidden"
                animate={controls}
                variants={buttonVariants}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <GrAndroid className="text-2xl" />
                <button className="ml-2">Download for Android</button>
              </motion.div>
              <motion.div
                className="flex items-center bg-yellow-400 text-black font-bold px-4 rounded-full hover:bg-yellow-50"
                initial="hidden"
                animate={controls}
                variants={buttonVariants}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <FaApple className="text-2xl" />
                <button className="ml-2">Download for iOS</button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
