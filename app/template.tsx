"use client";

import type { ReactElement, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type TemplateProps = {
  children: ReactNode;
};

export default function Template({ children }: TemplateProps): ReactElement {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{
          opacity: { duration: 0.2, ease: "easeOut" },
          y: { type: "spring", stiffness: 320, damping: 30, mass: 0.7 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
