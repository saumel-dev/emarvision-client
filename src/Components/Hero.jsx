import Image from "next/image";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
  "group inline-flex h-12 w-full items-center justify-center gap-3 rounded-[48px] px-7 text-base uppercase leading-[26px] text-white sm:w-auto font-normal";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
      className="relative isolate flex flex-col items-center overflow-hidden bg-[#100b22] bg-cover bg-bottom bg-no-repeat px-5 pt-36 pb-40 text-center lg:min-h-svh lg:pt-44 lg:pb-72"
    >

      {/* Decorative Grid Overlay */}
      <div
        aria-hidden="true"
        className="
    pointer-events-none
    absolute
    inset-x-0
    bottom-[-45px]
    z-0
    w-full
    aspect-[1440/287]
    bg-[#633EE9]
    opacity-70
  "
        style={{
          WebkitMaskImage: "url('/assets/hero-grid.png')",
          maskImage: "url('/assets/hero-grid.png')",

          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",

          WebkitMaskPosition: "center bottom",
          maskPosition: "center bottom",

          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      />


      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-[900px] flex-col items-center"
      >
        {/* Badge (Background box removed) */}
        <motion.p
          variants={itemVariants}
          className="text-[14px] leading-[20px] lg:text-[16px] lg:leading-[22px] tracking-[0.08em] uppercase text-white/70"
        >
          {t("badge")}
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="mt-6 font-heading text-[44px] leading-[48px] text-white sm:text-[60px] sm:leading-[64px] lg:text-[76px] lg:leading-[80px] max-w-3xl"
        >
          Every{" "}
          <span className="text-gradient-brand box-decoration-clone">
            digital service
          </span>{" "}
          your business needs, in one place.
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
            className={`${buttonBase} bg-brand shadow-[0_8px_28px_rgba(99,62,233,0.30)] hover:brightness-110`}
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
            className={`${buttonBase} border border-brand/50 bg-linear-to-r from-brand/[0.22] to-brand/[0.03] hover:border-brand/80 hover:from-brand/[0.32] hover:to-brand/[0.1] rtl:bg-linear-to-l`}
          >
            {t("requestCta")}
            <DotIcon />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}