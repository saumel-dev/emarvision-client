import { useTranslations } from "next-intl";

// Each step reads its text from messages: HowItWorks.steps.<key>.title / .description
const steps = ["choose", "talk", "pay", "delivery"];

// Row of 4 slots: the active slot shows the label, the others are small empty pills
function StepBadge({ active, label }) {
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((key, slot) =>
        slot === active ? (
          <span
            key={key}
            className="flex h-[30px] items-center rounded-lg border border-brand px-3 font-mono text-xs leading-none whitespace-nowrap text-white"
          >
            {label}
          </span>
        ) : (
          <span
            key={key}
            aria-hidden="true"
            className="h-[30px] w-3 rounded-full border border-brand"
          />
        )
      )}
    </div>
  );
}

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <section className="overflow-hidden bg-[#090710] px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24 xl:px-20">
      <div className="mx-auto max-w-[1284px]">
        {/* Heading */}
        <h2 className="heading-tracking mx-auto max-w-[520px] text-center font-heading text-[32px] leading-9 font-normal text-balance text-white lg:text-5xl lg:leading-[56px]">
          {t("heading")}
        </h2>

        <div className="relative mt-10 lg:mt-16">
          {/* The joined cards: one bordered box with dividers between the steps */}
          <div className="grid divide-y divide-white/10 rounded-xl border border-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {steps.map((key, i) => (
              <div key={key} className="p-6 lg:p-8">
                <StepBadge
                  active={i}
                  label={t("stepLabel", { number: i + 1 })}
                />

                <h3 className="mt-10 font-heading text-xl leading-[30px] font-normal text-white lg:mt-12">
                  {t(`steps.${key}.title`)}
                </h3>

                <p className="mt-4 text-base leading-6 text-white/70">
                  {t(`steps.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}