import Image from "next/image"

type MuseVariant = "welcome" | "writing" | "sad" | "crying" | "musical" | "awesome"

interface MuseProps {
  variant: MuseVariant
  className?: string
}

const museImages = {
  welcome: "/muse-welcome.png",
  writing: "/muse-writing.png",
  sad: "/muse-sad.png",
  crying: "/muse-crying.png",
  musical: "/muse-musical.png",
  awesome: "/muse-awesome.png",
}

export function Muse({ variant, className = "" }: MuseProps) {
  return (
    <div className={`relative ${className}`}>
      <Image src={museImages[variant] || "/placeholder.svg"} alt={`Muse ${variant}`} fill className="object-contain" />
    </div>
  )
}

