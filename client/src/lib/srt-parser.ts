interface SubtitleEntry {
  id: number
  startTime: string
  endTime: string
  text: string
}

export function parseSRT(srtContent: string): SubtitleEntry[] {
  const subtitles: SubtitleEntry[] = []
  const blocks = srtContent.trim().split("\n\n")

  for (const block of blocks) {
    const lines = block.split("\n")
    if (lines.length < 3) continue

    const id = Number.parseInt(lines[0])
    const [startTime, endTime] = lines[1].split(" --> ")
    const text = lines.slice(2).join("\n")

    subtitles.push({ id, startTime, endTime, text })
  }

  return subtitles
}

