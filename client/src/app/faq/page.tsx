import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion"

const faqs = [
  {
    question: "What is PoetCraft?",
    answer:
      "PoetCraft is an online platform designed to help you learn and master the art of poetry. It offers comprehensive lessons, interactive exercises, and a community of fellow poets to help you grow your skills.",
  },
  {
    question: "How do I get started?",
    answer:
      "To get started, visit our 'Getting Started' page from the main navigation. There, you'll find an overview of the platform and guidance on how to begin your poetic journey.",
  },
  {
    question: "Is PoetCraft suitable for beginners?",
    answer:
      "PoetCraft is designed for poets of all levels, from complete beginners to advanced practitioners. Our lessons start with the basics and gradually progress to more complex topics.",
  },
  {
    question: "How do I track my progress?",
    answer:
      "Once you've created an account and started taking lessons, you can track your progress on your user dashboard. It shows which lessons you've completed and recommends what to study next.",
  },
  {
    question: "Can I interact with other poets on PoetCraft?",
    answer:
      "Yes! PoetCraft has a vibrant community section where you can share your work, participate in discussions, and get feedback from other poets.",
  },
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-lg text-purple-800">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-purple-600">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

