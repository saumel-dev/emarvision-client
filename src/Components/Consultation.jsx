import Image from "next/image";
import { useTranslations } from "next-intl";

// Each step reads its text from messages: steps.<key>.title and steps.<key>.description
const steps = [
  { key: "share", icon: "/assets/sms.svg" },
  { key: "recommend", icon: "/assets/list.svg" },
  { key: "forward", icon: "/assets/rocket.svg" },
];

// The orange dotted arrow for the white button. It mirrors itself in right-to-left languages.
function DotIconOrange() {
  return (
    <Image
      src="/assets/dot-btn-orange.svg"
      alt=""
      width={20}
      height={20}
      aria-hidden="true"
      className="rtl:-scale-x-100"
    />
  );
}

export default function Consultation() {
  const t = useTranslations("Consultation");

  return (
    <section className="bg-brand px-5 py-8 lg:px-10 lg:py-[100px] xl:px-20">
      <div className="mx-auto max-w-[1284px]">
        {/* Top row: heading + description on the left, short text + button on the right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-[560px]">
            <h2 className="heading-tracking font-heading text-[32px] leading-9 font-normal text-white lg:text-5xl lg:leading-[56px]">
              {t("heading")}
            </h2>
            <p className="mt-4 text-base leading-[26px] text-white/70 lg:text-lg">
              {t("description")}
            </p>
          </div>

          <div className="mt-8 lg:mt-0 lg:w-[316px] lg:shrink-0">
            <p className="text-xl leading-7 text-white lg:leading-[1.4]">
              <span className="block">{t("sideLine1")}</span>
              <span className="block">{t("sideLine2")}</span>
            </p>

            {/* Scrolls down to the contact form in the footer */}
            <a
              href="#contact"
              className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-[48px] bg-white px-7 font-mono text-base leading-[26px] text-brand uppercase transition hover:bg-white/90"
            >
              {t("button")}
              <DotIconOrange />
            </a>
          </div>
        </div>

        {/* Steps.
            Phones: three boxes with a thin border, stacked.
            Large screens: one wider band (#F45301) with three columns. */}
        <ul className="mt-10 flex flex-col gap-8 lg:mt-[60px] lg:grid lg:grid-cols-3 lg:gap-8 lg:border-y lg:border-white/10 lg:bg-[#F45301] lg:px-10 lg:pt-16 lg:pb-22 xl:gap-x-[14.1%] xl:px-[10.3%]">
          {steps.map((step) => (
            <li
              key={step.key}
              className="border border-white/10 p-5 lg:border-0 lg:p-0"
            >
              <Image
                src={step.icon}
                alt=""
                width={96}
                height={72}
                aria-hidden="true"
                style={{ width: "auto", height: "72px" }}
              />
              <h3 className="mt-6 font-heading text-2xl leading-[30px] font-bold text-white lg:mt-4 lg:leading-[1.3]">
                {t(`steps.${step.key}.title`)}
              </h3>
              <p className="mt-4 text-base leading-6 text-white/70">
                {t(`steps.${step.key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}