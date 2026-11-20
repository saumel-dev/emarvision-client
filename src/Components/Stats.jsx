import { useTranslations } from "next-intl";
import CountUp from "./CountUp";

// Each stat reads its text from messages: "<key>Value" and "<key>Label"
const stats = [
  { key: "products", icon: "/assets/layer.svg" },
  { key: "areas", icon: "/assets/work.svg" },
  { key: "languages", icon: "/assets/ai-translate.svg" },
  { key: "support", icon: "/assets/customer-service.svg" },
];

// Shows the SVG as a shape filled with our brand color, so the color is always right
function StatIcon({ src }) {
  const mask = `url(${src})`;
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 block size-4 shrink-0 bg-brand"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

export default function Stats() {
  const t = useTranslations("Stats");

  return (
    <section className="bg-[#090710] px-5 py-12 lg:py-16">
      <ul className="mx-auto grid max-w-[1120px] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map((item, i) => (
          <li
            key={item.key}
            className="flex min-h-[127px] flex-col justify-between rounded-[12px] border border-white/[0.06] bg-white/[0.08] p-4 lg:min-h-[137px] lg:p-5"
          >
            {/* Big number: counts up when the section appears */}
            <p className="font-heading text-[32px] leading-none font-normal text-white lg:text-[40px]">
              <CountUp value={t(`${item.key}Value`)} delay={i * 0.12} />
            </p>

            {/* Icon + divider (large screens only) + description */}
            <div className="flex items-start gap-2.5">
              <StatIcon src={item.icon} />
              <span
                aria-hidden="true"
                className="mt-1.5 hidden h-2 w-px shrink-0 bg-white/25 lg:block"
              />
              <p className="text-[13px] leading-5 text-white">
                {t(`${item.key}Label`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}