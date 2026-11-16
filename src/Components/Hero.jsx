
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import HeroGrid from "./HeroGrid";

// Staircase shape of the grid.
const DESKTOP_TOPS = [0, 0, 0, 1, 1, 3, 2, 2, 2, 2, 2, 3, 3, 2, 1, 1, 0, 0, 0];
const MOBILE_TOPS = [0, 2, 1, 1, 1, 1, 1, 2, 2, 1, 0];

// Entrance animation for the content.
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Dotted arrow.
function DotIcon() {
  return (
    <Image
      src="/assets/dot-btn.svg"
      alt=""
      width={20}
      height={20}
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
    />
  );
}

const buttonBase =
  "group inline-flex h-12 w-full items-center justify-center gap-3 rounded-[48px] px-7 font-mono text-base uppercase leading-[26px] text-white sm:w-auto";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="hero-glow relative isolate flex flex-col items-center overflow-hidden px-5 pt-36 pb-40 text-center lg:min-h-svh lg:pt-44 lg:pb-72">

      {/* Background grid */}
      <HeroGrid
        cell={37.5}
        tops={MOBILE_TOPS}
        height={111}
        className="md:hidden"
      />

      <HeroGrid
        cell={75}
        tops={DESKTOP_TOPS}
        height={287}
        className="hidden md:block"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-[695px] flex-col items-center"
      >
        {/* Badge */}
        <motion.p
          variants={itemVariants}
          className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[13px] leading-[22px] tracking-[0.08em] uppercase text-white/75 shadow-[0_4px_24px_rgba(255,255,255,0.04)] backdrop-blur-sm"
        >
          {t("badge")}
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="heading-tracking mt-6 text-balance font-heading text-[44px] leading-[48px] font-normal text-white sm:text-[60px] sm:leading-[64px] lg:text-[76px] lg:leading-[80px]"
        >
          {t.rich("title", {
            highlight: (chunks) => (
              <span className="box-decoration-clone bg-linear-to-r from-[#FFD864] to-[#E85002] bg-clip-text text-transparent rtl:bg-linear-to-l">
                {chunks}
              </span>
            ),
          })}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-[590px] text-pretty text-base leading-[26px] text-white/90 lg:mt-8"
        >
          {t("description")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          {/* Primary CTA */}
          <motion.a
            href="#solutions"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`${buttonBase} bg-brand shadow-[0_8px_28px_rgba(232,80,2,0.20)] hover:brightness-110`}
          >
            {t("exploreCta")}
            <DotIcon />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`${buttonBase} border border-brand/60 bg-brand/15 hover:border-brand/80 hover:bg-brand/25`}
          >
            {t("requestCta")}
            <DotIcon />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
