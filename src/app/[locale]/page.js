import Consultation from "@/Components/Consultation";
import Faq from "@/Components/Faq";
import Hero from "@/Components/Hero";
import HowItWorks from "@/Components/HowItWorks";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import Services from "@/Components/Services";
import Solutions from "@/Components/Solutions";
import Stats from "@/Components/Stats";
import Trust from "@/Components/Trust";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <main>
      <Hero></Hero>
      <Stats></Stats>
      <Services></Services>
      <Consultation></Consultation>
      <Solutions></Solutions>
      <HowItWorks></HowItWorks>
      <Trust></Trust>
      <Faq></Faq>
    </main>
  );
}