import { Reveal } from "@/components/atoms/reveal";
import { Display, Label, Lead } from "@/components/atoms/typography";
import { StatusDot } from "@/components/atoms/status-dot";

export function Hero() {
  const localTime = new Date().toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="flex flex-col gap-7 page-x pt-nav pb-12 min-h-[calc(100vh-4rem)] md:justify-between md:gap-3.5 md:pb-14 md:min-h-[calc(100vh-6rem)]">
      <section>
        <Reveal
          variant="fade"
          className="flex flex-row justify-between items-center gap-2.5 md:gap-3.5"
        >
          <span className="flex items-center gap-2">
            <StatusDot className="size-1.5 animate-pulse shadow-[0_0_8px] shadow-accent" />
            <Label>Bern, CH - {localTime}</Label>
          </span>
          <Label className="text-right">
            Applikationsentwickler in Ausbildung
          </Label>
        </Reveal>
      </section>
      <section>
        <Reveal variant="blur" index={1}>
          <Display
            as="h1"
            size="xl"
            className="text-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-shadow"
          >
            Leon Hebeisen.
          </Display>
        </Reveal>
      </section>
      <section>
        <Reveal
          variant="up"
          index={2}
          className="flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between md:gap-3.5"
        >
          <Lead className="max-w-xl">[Hier mal sinnvoller text einfügen.]</Lead>
          <Label>2. Lehrjahr - Noser Young </Label>
        </Reveal>
      </section>
    </div>
  );
}
