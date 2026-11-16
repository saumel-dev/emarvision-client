
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";

// Card ids. They are also the numbers shown on the cards and the icon file names.
const items = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

// Staggered card entrance.
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.075,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Small up-right arrow. It flips to up-left in RTL languages.
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export default function Services() {
  const t = useTranslations("Services");

  return (
    <section
      id="solutions"
      className="bg-[#FBF8F4] px-5 pt-10 pb-20 lg:px-10 lg:pt-15 lg:pb-24 xl:px-20"
    >
      <div className="mx-auto max-w-[1284px]">

        {/* Heading + description */}
        <header className="text-center">
          <h2 className="heading-tracking font-heading text-[32px] leading-9 font-normal text-black lg:text-5xl lg:leading-[56px]">
            {t("heading")}
          </h2>

          <p className="mx-auto mt-4 max-w-[600px] text-base leading-6 text-black/70 lg:text-lg lg:leading-[1.5]">
            {t("description")}
          </p>
        </header>

        {/* Cards: 1 column on phones, 2 on tablets, 3 on large screens */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7"
        >
          {items.map((id) => (
            <motion.li
              key={id}
              variants={cardVariants}
              className="flex flex-col gap-1"
            >
              {/* Top container: icon + number */}
              <div className="flex h-[99px] items-center justify-between rounded-xl border border-[#F0E8E0] bg-linear-to-br from-white to-[#FFFCF9] px-6 shadow-[0_5px_18px_rgba(38,28,18,0.035)]">
                <Image
                  src={`/assets/services/${id}.svg`}
                  alt=""
                  width={60}
                  height={60}
                  aria-hidden="true"
                />

                <span className="font-mono text-2xl leading-7 text-brand/60">
                  {id}
                </span>
              </div>

              {/* Bottom container: title, description, explore link */}
              <div className="flex flex-1 flex-col rounded-xl border border-[#F0E8E0] bg-white p-7 shadow-[0_6px_24px_rgba(38,28,18,0.04)]">
                <h3 className="font-heading text-xl leading-[30px] font-bold text-black">
                  {t(`items.${id}.title`)}
                </h3>

                <p className="mt-3 text-lg leading-7 text-black/70">
                  {t(`items.${id}.description`)}
                </p>

                {/* mt-auto keeps EXPLORE at the bottom */}
                <div className="mt-auto pt-5 pb-1.5">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 border-b border-brand font-mono text-lg leading-5 text-brand uppercase transition-colors duration-200 hover:border-[#C74708] hover:text-[#C74708] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                  >
                    {t("explore")}
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
