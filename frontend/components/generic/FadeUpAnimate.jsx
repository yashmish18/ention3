"use client";
import { motion, useInView } from "framer-motion";
import { duration } from "moment";
import * as React from "react";

export function FadeUpAnimate({
  direction,
  spaceToMove = 30,
  duration = 0.5,
  children,
  className = "",
  staggerChildren = 0.1,
}) {
  const FADE_DOWN = {
    show: { opacity: 1, y: 0, transition: { type: "tween", duration } },
    hidden: { opacity: 0, y: direction === "down" ? -spaceToMove : spaceToMove },
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView={'visible'}
      viewport={{once: true}}
      animate={isInView ? "show" : ""}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}
