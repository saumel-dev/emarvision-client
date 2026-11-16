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
            className="flex h-6 items-center rounded-lg border border-brand px-3 font-mono text-xs leading-none whitespace-nowrap text-brand"
          >
            {label}
          </span>
        ) : (
          <span
            key={key}
            aria-hidden="true"
            className="h-6 w-2.5 rounded-lg border border-brand"
          />
        )
      )}
    </div>
  );
}

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  return (
    <section className="overflow-hidden bg-[#FBF8F4] px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24 xl:px-20">
      <div className="mx-auto max-w-[1284px]">
        {/* Heading */}
        <h2 className="heading-tracking mx-auto max-w-[520px] text-center font-heading text-[32px] leading-9 font-normal text-balance text-black lg:text-5xl lg:leading-[56px]">
          {t("heading")}
        </h2>

        <div className="relative mt-10 lg:mt-16">
          {/* The joined cards: one bordered box with dividers between the steps */}
          <div className="grid divide-y divide-black/10 rounded-xl border border-black/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {steps.map((key, i) => (
              <div key={key} className="p-6 lg:p-8">
                <StepBadge
                  active={i}
                  label={t("stepLabel", { number: i + 1 })}
                />

                <h3 className="mt-10 font-heading text-xl leading-[30px] font-normal text-black lg:mt-12">
                  {t(`steps.${key}.title`)}
                </h3>

                <p className="mt-4 text-base leading-6 text-black/70">
                  {t(`steps.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

          {/* Small orange "+" marks where the dividers meet the bottom edge (large screens only) */}
          {/* {[1, 2, 3].map((n) => (
            <span
              key={n}
              aria-hidden="true"
              style={{ insetInlineStart: `${n * 25}%` }}
              className="pointer-events-none absolute -bottom-2 hidden size-4 -translate-x-1/2 lg:block rtl:translate-x-1/2"
            >
              <span className="absolute top-1/2 left-0 h-px w-full bg-brand/60" />
              <span className="absolute top-0 left-1/2 h-full w-px bg-brand/60" />
            </span>
          ))} */}
        </div>
      </div>
    </section>
  );
}