"use client"

import React, { forwardRef, Ref } from "react"
import { clsx } from "clsx"
import * as styles from "./styles.css"
import { AnimatePresence, motion } from "framer-motion"

type LoadingProps = {
  isLoading?: boolean
}

const Loading = (
  { isLoading = true, ...props }: LoadingProps,
  ref: Ref<HTMLDivElement>,
) => {
  const ContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const DotVariants = {
    initial: {
      y: "0%",
    },
    animate: {
      y: ["0%", "100%", "0%"],
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  }

  const DotTransition = {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key={"loadingContainer"}
          ref={ref}
          className={clsx(styles.loading)}
          variants={ContainerVariants}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0, display: "none", transition: { duration: 0.3 } }}
          {...props}
        >
          <motion.div className={clsx(styles.loadingContainer)}>
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className={clsx(styles.loadingDot)}
                variants={DotVariants}
                transition={DotTransition}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.3 },
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default forwardRef(Loading)
