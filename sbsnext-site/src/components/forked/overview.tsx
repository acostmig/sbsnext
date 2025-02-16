import { motion } from 'framer-motion';
import Link from 'next/link';

import { MessageIcon } from './icons';
import { LightBulbIcon } from '@heroicons/react/24/outline';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <LightBulbIcon height={32} />
          <span>+</span>
          <MessageIcon size={32} />
        </p>
        <p>
        This AI-powered assistant provides insights into SBSNext expertise, it&apos;s purpose is to help you understand how we can address your specific needs.  
      </p>
      <p>
        Ask about our capabilities, services, or how we can support your business goals.
        View its implementation{" "}
        <Link
          className="font-medium underline underline-offset-4 text-primary"
          href="https://github.com/acostmig/sbsnext"
          target="_blank"
        >
          here
        </Link>
        .
      </p>
      </div>
    </motion.div>
  );
};
