"use client";

import { motion } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
import { BookOpen, Hash, Clock } from "lucide-react";

interface PassagePanelProps {
  section: number;
}

const passages = {
  1: {
    title: "The Impact of Climate Change on Coral Reefs",
    subtitle: "Academic Reading Passage 1",
    wordCount: 850,
    readingTime: "15-20 min",
    paragraphs: [
      `Coral reefs are among the most diverse ecosystems on Earth, providing habitat for approximately 25% of all marine species despite covering less than 1% of the ocean floor. These underwater structures are built by colonies of tiny animals called coral polyps, which secrete calcium carbonate to form hard, protective skeletons. Over thousands of years, these skeletons accumulate to create the massive reef structures we see today.`,

      `However, coral reefs face unprecedented threats from climate change. Rising ocean temperatures cause coral bleaching, a phenomenon where stressed corals expel the symbiotic algae living in their tissues. These algae, called zooxanthellae, provide corals with up to 90% of their energy through photosynthesis. Without them, corals turn white and, if conditions don't improve, eventually die.`,

      `The Great Barrier Reef, the world's largest coral reef system, has experienced mass bleaching events in 2016, 2017, 2020, and 2022. Scientists estimate that half of the reef's coral cover has been lost since 1995. Similar declines have been observed in reef systems worldwide, from the Caribbean to Southeast Asia.`,

      `Ocean acidification presents another significant challenge. As the ocean absorbs carbon dioxide from the atmosphere, it becomes more acidic. This increased acidity makes it harder for corals to build their calcium carbonate skeletons and can even cause existing structures to dissolve. Research suggests that by 2100, ocean acidity could increase by 150% compared to pre-industrial levels.`,

      `The consequences of coral reef decline extend far beyond marine ecosystems. Approximately 500 million people worldwide depend on coral reefs for food, income, and coastal protection. Reefs act as natural barriers against waves and storms, protecting shorelines from erosion. The economic value of coral reef ecosystem services is estimated at $375 billion annually.`,

      `Conservation efforts are underway to protect and restore coral reefs. Marine protected areas limit human activities that damage reefs, while coral nurseries grow new corals for transplantation. Scientists are also developing heat-resistant coral varieties through selective breeding and genetic modification. However, experts emphasize that addressing the root cause—climate change—is essential for long-term reef survival.`,

      `Recent research has revealed some encouraging findings. Certain coral species show greater resilience to warming waters, and some reefs have demonstrated unexpected recovery abilities. The Red Sea's coral reefs, for instance, appear particularly resistant to heat stress, offering hope that similar traits might be cultivated in other coral populations.`,
    ],
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What percentage of marine species depend on coral reefs?",
        options: [
          "Less than 1%",
          "Approximately 25%",
          "About 50%",
          "Nearly 75%",
        ],
      },
      {
        id: 2,
        type: "true-false-not-given",
        question:
          "Zooxanthellae provide corals with up to 90% of their energy.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "By 2100, ocean acidity could increase by ______ compared to pre-industrial levels.",
        answer: "150%",
      },
    ],
  },
  2: {
    title: "The Psychology of Decision Making",
    subtitle: "Academic Reading Passage 2",
    wordCount: 920,
    readingTime: "18-22 min",
    paragraphs: [
      `Every day, humans make thousands of decisions, from trivial choices like what to eat for breakfast to life-altering ones like which career to pursue. Understanding how we make decisions has been a central concern of psychologists, economists, and neuroscientists for decades. Their research has revealed that human decision-making is far more complex—and often less rational—than previously assumed.`,

      `The traditional economic model of decision-making, known as rational choice theory, assumes that individuals systematically evaluate all available options and choose the one that maximizes their utility. However, decades of research have demonstrated that humans frequently deviate from this ideal. Cognitive biases, emotional states, and social influences all shape our choices in ways we rarely recognize.`,

      `Daniel Kahneman and Amos Tversky's prospect theory, developed in the 1970s, revolutionized our understanding of decision-making. They demonstrated that people are not perfectly rational but instead rely on mental shortcuts, or heuristics, when making choices. One of their most famous findings is the framing effect: people react differently to equivalent options depending on how they are presented.`,

      `Consider a medical decision: when told a surgery has a "90% survival rate," most people choose it. But when told the same surgery has a "10% mortality rate," far fewer opt for it. The outcome is identical, yet the framing dramatically influences choice. This phenomenon has profound implications for fields ranging from medicine to marketing to public policy.`,

      `The role of emotions in decision-making has gained increasing recognition. Neuroscientist Antonio Damasio's research with patients who had damage to emotion-related brain regions revealed that without emotional input, decision-making becomes paralyzed. Far from being purely rational calculators, humans need emotions to make choices—emotions provide the "weight" that tips the scales between alternatives.`,

      `Contemporary research has identified numerous factors that influence decision quality. Sleep deprivation impairs judgment by reducing activity in prefrontal brain regions responsible for self-control. Decision fatigue—the deterioration of decision quality after making many choices—explains why important decisions should not be made late in the day. Stress narrows attention, causing people to focus on immediate concerns at the expense of long-term considerations.`,

      `Understanding these patterns offers practical benefits. Organizations can structure decision-making processes to minimize bias. Individuals can cultivate awareness of their cognitive limitations and create environments that support better choices. Some researchers even suggest that "nudges"—small changes in how options are presented—can help people make decisions that better align with their long-term interests.`,
    ],
    questions: [
      {
        id: 4,
        type: "multiple-choice",
        question: "According to rational choice theory, individuals should:",
        options: [
          "Follow their emotions",
          "Choose randomly",
          "Maximize utility",
          "Minimize effort",
        ],
      },
      {
        id: 5,
        type: "true-false-not-given",
        question: "The framing effect only influences uneducated people.",
      },
    ],
  },
  3: {
    title: "The Rise of Vertical Farming",
    subtitle: "Academic Reading Passage 3",
    wordCount: 780,
    readingTime: "15-18 min",
    paragraphs: [
      `As the global population approaches 10 billion by 2050, feeding humanity sustainably has become one of the greatest challenges of our time. Traditional agriculture already uses 38% of Earth's land surface and consumes 70% of freshwater withdrawals. Vertical farming—growing crops in stacked layers indoors—offers a potential solution to these resource constraints.`,

      `The concept of vertical farming was popularized by Columbia University professor Dickson Despommier in 1999. His vision involved multi-story greenhouses in urban centers, where crops would be grown using hydroponic, aeroponic, or aquaponic systems. These soil-free growing methods use up to 95% less water than conventional agriculture while eliminating the need for pesticides.`,

      `Modern vertical farms employ sophisticated technology to optimize growing conditions. LED lights provide precisely tuned wavelengths for photosynthesis, while sensors monitor temperature, humidity, and nutrient levels. Artificial intelligence systems adjust these parameters in real-time, creating ideal conditions for each crop variety. Some facilities achieve yields hundreds of times higher than traditional farms of equivalent area.`,

      `The environmental benefits of vertical farming extend beyond water conservation. By locating farms in cities, transportation distances—and associated emissions—are dramatically reduced. Crops can be grown year-round regardless of weather, and the controlled environment virtually eliminates crop losses to pests or disease. Additionally, vertical farms can use renewable energy sources, further reducing their carbon footprint.`,

      `However, significant challenges remain. The energy required for lighting and climate control makes vertical farming expensive, limiting production to high-value crops like leafy greens and herbs. Initial investment costs can reach tens of millions of dollars for large facilities. Critics argue that the technology cannot scale sufficiently to replace traditional agriculture for calorie-dense staples like wheat or rice.`,

      `Despite these limitations, the vertical farming industry has attracted substantial investment. Companies like AeroFarms, Plenty, and Bowery Farming have raised hundreds of millions of dollars to expand their operations. Singapore, which imports over 90% of its food, has made vertical farming a cornerstone of its food security strategy.`,

      `The future of vertical farming likely lies in hybrid approaches. Traditional agriculture will remain essential for staple crops, while vertical farms provide fresh produce to urban populations. As technology advances and costs decrease, the boundary between these systems may become increasingly blurred, creating a more resilient and sustainable food production landscape.`,
    ],
    questions: [
      {
        id: 7,
        type: "matching",
        question: "Match the following statements with the correct paragraph",
      },
    ],
  },
};

export function PassagePanel({ section }: PassagePanelProps) {
  const passage = passages[section as keyof typeof passages] || passages[1];

  return (
    <div className="h-full flex flex-col bg-card">

      {/* Passage Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-3">
              <Hash className="w-3 h-3 mr-1" />
              Passage {section}
            </Badge>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {passage.title}
            </h2>
            <p className="text-sm text-muted-foreground">{passage.subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3" />
              {passage.wordCount} words
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {passage.readingTime}
            </div>
          </div>
        </div>
      </div>

      {/* Passage Content */}
      <ScrollArea className="flex-1 h-full ">
        <div className="p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {passage.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-foreground leading-relaxed mb-4 text-sm"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
