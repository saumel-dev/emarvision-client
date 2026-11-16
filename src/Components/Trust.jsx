import Image from "next/image";
import { useTranslations } from "next-intl";

// Card ids. They are also the icon file names:
// public/assets/payment/01.svg ... 04.svg
const items = ["01", "02", "03", "04"];

// Payment logos, in the same order as the design.
// Brand names are not translated, so they are used directly as alt text.
const logos = [
  { file: "tabby", name: "Tabby" },
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "stripe", name: "Stripe" },
  { file: "apple-pay", name: "Apple Pay" },
  { file: "mada", name: "mada" },
];

export default function Trust() {
  const t = useTranslations("Trust");

  return (
    <section className="bg-[#0C0907] px-5 pt-16 pb-20 lg:px-10 lg:pt-20 lg:pb-24 xl:px-20">
      <div className="mx-auto max-w-[1284px]">
        {/* Heading + description */}
        <header className="text-center">
          <h2 className="heading-tracking mx-auto max-w-[560px] font-heading text-[32px] leading-9 font-normal text-balance text-white lg:text-5xl lg:leading-[56px]">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-[26px] text-white/70">
            {t("description")}
          </p>
        </header>

        {/* Cards: 1 column on phones, 2 on tablets, 4 on large screens */}
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {items.map((id) => (
            <li key={id} className="rounded-xl bg-[#16110D] p-6">
              <Image
                src={`/assets/payment/${id}.svg`}
                alt=""
                width={48}
                height={48}
                aria-hidden="true"
              />

              <h3 className="mt-8 font-heading text-lg leading-[26px] font-medium text-white">
                {t(`items.${id}.title`)}
              </h3>

              <p className="mt-2 text-[15px] leading-[22px] text-white/70">
                {t(`items.${id}.description`)}
              </p>
            </li>
          ))}
        </ul>

        {/* Secure checkout + payment logos */}
        <div className="mt-12 flex flex-col items-center lg:mt-16">
          <p className="font-mono text-base leading-4 tracking-[0.2em] text-white/70 uppercase">
            {t("secureCheckout")}
          </p>

          {/* max-w makes the logos wrap into 2 rows of 3 on phones */}
          <ul className="mt-6 flex max-w-[260px] flex-wrap items-center justify-center gap-2 lg:max-w-none">
            {logos.map((logo) => (
              <li key={logo.file}>
                <Image
                  src={`/assets/payment/${logo.file}.svg`}
                  alt={logo.name}
                  width={72}
                  height={30}
                  className="h-[30px] w-auto"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}