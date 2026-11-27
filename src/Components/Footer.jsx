import Image from "next/image";
import { useTranslations } from "next-intl";
import ContactForm from "./ContactForm";

// Social links: put the real addresses in "href" later
const socials = [
  { key: "x", href: "#", icon: "/assets/footer/x.svg" },
  { key: "facebook", href: "#", icon: "/assets/footer/facebook.svg" },
  { key: "whatsapp", href: "#", icon: "/assets/footer/whatsapp.svg" },
];

// Each link scrolls to the section with this id
const links = [
  { id: "solutions", key: "solutions" },
  { id: "categories", key: "categories" },
  { id: "how-it-works", key: "howItWorks" },
  { id: "faq", key: "faq" },
  { id: "contact", key: "contact" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Orange part. This is the real "contact" area, so the Request consultation buttons scroll here. */}
      <div
        id="contact"
        className="bg-brand px-5 pt-16 pb-10 lg:px-10 lg:pt-[72px] lg:pb-20 xl:px-20"
      >
        <div className="mx-auto grid max-w-[1284px] grid-cols-1 lg:grid-cols-4 lg:gap-y-20">
          {/* Badge */}
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm leading-4 text-[#633EE9] uppercase">
              <span className="size-1.5 rounded-full bg-[#633EE9]" />
              {t("badge")}
            </span>
          </div>

          {/* Heading */}
          <h2 className="heading-tracking mt-6 font-heading text-[40px] leading-[44px] font-normal text-white lg:col-span-3 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:text-[80px] lg:leading-[88px]">
            {t("heading")}
          </h2>

          {/* Form */}
          <ContactForm className="mt-10 lg:col-span-2 lg:col-start-3 lg:row-start-2 lg:mt-0" />

          {/* Info column.
              On phones it shows: contact, links, about (top to bottom).
              On large screens it is flipped: about, links, contact. */}
          <div className="mt-12 flex flex-col lg:col-start-1 lg:row-start-2 lg:mt-0 lg:flex-col-reverse">
            {/* Email and phone */}
            <div className="lg:mt-[136px]">
              <div>
                <p className="flex items-center gap-2 text-sm leading-5 text-white uppercase">
                  <Image
                    src="/assets/footer/mail.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  {t("emailLabel")}
                </p>
                <a
                  href={`mailto:${t("emailValue")}`}
                  className="mt-3 block text-sm leading-5 text-white/70 hover:underline"
                >
                  {t("emailValue")}
                </a>
              </div>
              <div className="mt-7">
                <p className="flex items-center gap-2 text-sm leading-5 text-white uppercase">
                  <Image
                    src="/assets/footer/phone.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  {t("phoneLabel")}
                </p>
                <p className="mt-3 text-sm leading-5 text-white/70 uppercase">
                  {t("phoneValue")}
                </p>
              </div>
            </div>

            {/* Links: 2 columns on phones, 1 column on large screens */}
            <nav aria-label="Footer" className="mt-12 lg:mt-[85px]">
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-3 gap-x-3.5 gap-y-[18px] lg:flex lg:flex-col lg:gap-y-3.5">
                {links.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className=" text-sm leading-5 text-white uppercase hover:underline"
                    >
                      {t(`links.${item.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Description and social icons */}
            <div className="mt-12 lg:mt-0">
              <p className="text-base leading-[26px] text-white/80 lg:max-w-[320px]">
                {t("description")}
              </p>
              <ul className="mt-6 flex gap-3">
                {socials.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      aria-label={t(`social.${item.key}`)}
                      className="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-white"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={18}
                        height={18}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Dark band */}
      <div className="bg-[#1A1036]">
        {/* The big wordmark. It is full width, and the top of it is cut off by the band edge. */}
        <div className="relative aspect-[1444/128] w-full overflow-hidden">
          <Image
            src="/assets/footer/Wordmark.svg"
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover object-bottom"
          />
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-7 lg:px-10 lg:pt-11 lg:pb-9 xl:px-20">
          <div className="mx-auto flex max-w-[1284px] flex-col gap-[18px] text-sm leading-5 text-[#D9D1ED] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <p>{t("copyright", { year })}</p>
            <p>{t("crVat")}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-self-end lg:gap-x-6">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  {t("termsLink")}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  {t("privacyLink")}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  {t("refundLink")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}