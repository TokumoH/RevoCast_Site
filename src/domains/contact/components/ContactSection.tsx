import { links, anchorId } from "@/shared/config/links"
import { Button, SectionTitle, Spark, Sticker } from "@/shared/ui"
import { contactCopy, directContacts } from "../data"
import PlatformChips from "./PlatformChips"
import "../contact.css"

export default function ContactSection() {
  return (
    <section className="section" id={anchorId(links.anchors.contact)}>
      <div className="container">
        <Sticker tone="pink" tilt={-0.6} className="contact" reveal>
          <Spark className="doodle contact__spark" />
          <SectionTitle eyebrow={contactCopy.eyebrow} title={contactCopy.title} />
          <p className="contact__text text-justify">{contactCopy.text}</p>
          <PlatformChips />
          {directContacts.length > 0 && (
            <div className="contact__direct">
              {directContacts.map((c) => (
                <Button key={c.label} href={c.href} variant="light">
                  {c.label}
                </Button>
              ))}
            </div>
          )}
        </Sticker>
      </div>
    </section>
  )
}
