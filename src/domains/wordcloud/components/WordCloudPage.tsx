import { useState, type FormEvent } from "react"
import { ActionButton, SectionTitle, Spark, Star, Sticker } from "@/shared/ui"
import { cloudCopy, cloudLimits } from "../data"
import { useWordCloud } from "../useWordCloud"
import WordCloud from "./WordCloud"
import "../wordcloud.css"

export default function WordCloudPage() {
  const { words, add } = useWordCloud()
  const [text, setText] = useState("")

  const submit = (e: FormEvent) => {
    e.preventDefault()
    add(text)
    setText("")
  }

  return (
    <section className="section">
      <div className="container">
        <SectionTitle eyebrow={cloudCopy.eyebrow} title={cloudCopy.title} note={cloudCopy.note} />
        <Sticker tone="cyan" tilt={-0.6} tape className="cloud__board" reveal>
          <Star className="doodle cloud__star" />
          <Spark className="doodle cloud__spark" />
          <WordCloud words={words} />
        </Sticker>
        <form className="cloud__form" onSubmit={submit}>
          <input
            className="field"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={cloudLimits.inputMax}
            placeholder={cloudCopy.placeholder}
            aria-label={cloudCopy.label}
            autoComplete="off"
          />
          <ActionButton type="submit" disabled={!text.trim()}>
            {cloudCopy.cta}
          </ActionButton>
        </form>
      </div>
    </section>
  )
}
