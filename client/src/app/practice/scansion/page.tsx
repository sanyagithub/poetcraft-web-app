import ScansionExercise from "@/src/components/scansion-exercise"
import PoemScansionExercise from "@/src/components/poem-scansion-exercise"

const scansionExercises = [
  {
    line: "Shall I compare thee to a summer's day?",
    correctScansion: "u/u/u/u/u/",
  },
  {
    line: "The curfew tolls the knell of parting day,",
    correctScansion: "u/u/u/u/u/",
  },
  {
    line: "Tyger Tyger, burning bright,",
    correctScansion: "/u/u/u/",
  },
  {
    line: "Because I could not stop for Death –",
    correctScansion: "u/u/u/u/",
  },
  {
    line: "Two roads diverged in a yellow wood,",
    correctScansion: "/uu/u/u/u/",
  },
]

const poemScansionExercises = [
  {
    title: "Sonnet 18 by William Shakespeare",
    poem: `Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date;`,
    syllables: [
      ["Shall", "I", "com", "pare", "thee", "to", "a", "sum", "mer's", "day?"],
      ["Thou", "art", "more", "love", "ly", "and", "more", "tem", "pe", "rate:"],
      ["Rough", "winds", "do", "shake", "the", "dar", "ling", "buds", "of", "May,"],
      ["And", "sum", "mer's", "lease", "hath", "all", "too", "short", "a", "date;"],
    ],
    correctScansion: `u/u/u/u/u/
u/u/u/u/u/
/uu/u/u/u/
u/u/u/u/u/`,
  },
  {
    title: "The Tyger by William Blake",
    poem: `Tyger Tyger, burning bright,
In the forests of the night;
What immortal hand or eye,
Could frame thy fearful symmetry?`,
    syllables: [
      ["Ty", "ger", "Ty", "ger,", "burn", "ing", "bright,"],
      ["In", "the", "for", "ests", "of", "the", "night;"],
      ["What", "im", "mor", "tal", "hand", "or", "eye,"],
      ["Could", "frame", "thy", "fear", "ful", "sym", "me", "try?"],
    ],
    correctScansion: `/u/u/u/
uu/uu/
u/u/u/
u/u/u/u`,
  },
]

export default function ScansionPracticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Scansion Practice</h1>

      <h2 className="text-2xl font-semibold text-purple-700 mb-4">Single Line Exercises</h2>
      <div className="space-y-8 mb-12">
        {scansionExercises.map((exercise, index) => (
          <ScansionExercise key={index} {...exercise} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-purple-700 mb-4">Full Poem Exercises</h2>
      <div className="space-y-12">
        {poemScansionExercises.map((exercise, index) => (
          <PoemScansionExercise key={index} {...exercise} />
        ))}
      </div>
    </div>
  )
}

