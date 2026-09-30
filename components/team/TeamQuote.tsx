import Image from "next/image";
import { t, type Locale } from "@/lib/i18n";
import { team } from "@/content/team";
import { Mark } from "@/components/Brand";
import { EyebrowR } from "@/components/about/SectionHead";

/** Team · Quote band (Figma 41:2503 desktop / 42:2544 mobile). */
export function TeamQuote({ locale }: { locale: Locale }) {
  const c = team.quote;
  return (
    <section className="relative overflow-hidden bg-ink">
      <Mark size={460} className="absolute -top-20 -start-[120px] hidden opacity-[0.04] lg:block" />
      <div className="container-site relative flex items-center justify-between gap-16 py-16 lg:py-[100px]">
        <figure data-reveal className="flex flex-col items-start gap-[14px] lg:max-w-[600px] lg:gap-[22px]">
          <span aria-hidden="true" className="h-[70px] font-serif text-[64px] leading-[1.1] tracking-[-0.5px] text-lilac lg:h-[106px] lg:text-[96px]">
            “
          </span>
          <blockquote className="text-[22px] leading-[1.45] font-medium text-white lg:text-[28px]">
            {t(c.text, locale)}
          </blockquote>
          <figcaption>
            <EyebrowR tone="dark" className="[&>span:first-child]:hidden lg:[&>span:first-child]:block">
              {t(c.author, locale)}
            </EyebrowR>
          </figcaption>
        </figure>
        <div className="relative hidden h-[380px] w-[560px] shrink-0 overflow-hidden rounded-[28px] lg:block">
          <Image src="/images/team.jpg" alt={t(team.header.imageAlt, locale)} fill sizes="560px" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
