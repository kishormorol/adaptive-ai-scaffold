// Data for the research prototype.
// Scenario: an intro-level question-answering assignment based on instructor readings.

export const ASSIGNMENT = {
  course: "COGS 210 — Memory & Learning",
  week: "Week 6",
  title: "Why does spaced practice outperform massed practice?",
  prompt:
    "Using the assigned readings, explain why spaced practice (distributing study over time) typically produces stronger long-term retention than massed practice (cramming). Ground your answer in at least two mechanisms discussed in the readings. ~180–250 words.",
  dueRelative: "Due Thu, 11:59 PM",
};

export const SOURCES = [
  {
    id: "S1",
    short: "Bjork & Bjork (2011)",
    title: "Making things hard on yourself, but in a good way",
    pages: "pp. 56–64",
    kind: "Chapter",
    snippets: [
      {
        id: "S1.a",
        page: "p. 58",
        quote:
          "Conditions of practice that slow acquisition and feel less fluent — spacing, interleaving, generation — often produce more durable long-term learning than conditions that feel easy in the moment.",
      },
      {
        id: "S1.b",
        page: "p. 61",
        quote:
          "Re-encountering information after some forgetting has set in requires effortful retrieval, and the act of retrieval itself modifies the memory, making it more accessible next time.",
      },
    ],
  },
  {
    id: "S2",
    short: "Cepeda et al. (2006)",
    title: "Distributed practice in verbal recall tasks: a review and quantitative synthesis",
    pages: "pp. 354–380",
    kind: "Review",
    snippets: [
      {
        id: "S2.a",
        page: "p. 359",
        quote:
          "Across 317 experiments, the benefit of spaced over massed practice grew as the retention interval lengthened; for short tests, spacing effects were modest or absent.",
      },
      {
        id: "S2.b",
        page: "p. 372",
        quote:
          "Optimal gap length scales with the retention interval: roughly 10–20% of the interval between study and test.",
      },
    ],
  },
  {
    id: "S3",
    short: "Lecture 6 notes",
    title: "Encoding variability & contextual cues",
    pages: "slides 12–18",
    kind: "Lecture",
    snippets: [
      {
        id: "S3.a",
        page: "slide 14",
        quote:
          "Each study episode occurs in a slightly different internal and external context; spaced repetitions therefore associate the material with a broader set of retrieval cues.",
      },
    ],
  },
];

// Student's evolving draft — shown at three logical stages in the trace view.
export const STAGES = [
  {
    id: "v0",
    label: "Initial reasoning",
    timestamp: "Mon 7:42 PM",
    wordCount: 68,
    text:
`Spaced practice works better than cramming because you remember things longer. When you cram you forget fast after the test. When you space it out the information stays in your head. I think this has something to do with how the brain stores memory over time, and maybe also because you are forced to think about the material on more than one day so it becomes more familiar.`,
    events: [],
  },
  {
    id: "v1",
    label: "After first AI interaction",
    timestamp: "Mon 7:58 PM",
    wordCount: 142,
    aiEvents: [
      { kind: "hint", label: "Hint", at: "7:49 PM", note: "Student asked for a hint after 6 min of writing.", sourceIds: ["S1.b", "S3.a"], prompt: "I remember it has to do with how the brain stores memory but I don't know the mechanism." },
    ],
    text:
`Spaced practice produces stronger long-term retention than massed practice because of how retrieval and context interact with memory.

When we cram, the material feels fluent in the moment but that fluency is misleading — we confuse ease of processing with actual learning. Spacing, by contrast, lets some forgetting occur between sessions. Re-encountering the material after partial forgetting forces effortful retrieval, and the act of retrieving modifies the memory trace, making it more accessible later [1].

I also think each study session happens in a slightly different mental context, so spaced repetitions tag the information with more retrieval cues [3].`,
    events: [
      { kind: "ai-hint", eventIdx: 0, range: [0, 220], spanText: "Spaced practice produces stronger long-term retention", note: "Hint nudged student toward 'retrieval' as a mechanism.", influence: "reframed" },
      { kind: "ai-hint", eventIdx: 0, range: [260, 510], spanText: "Re-encountering the material after partial forgetting forces effortful retrieval, and the act of retrieving modifies the memory trace, making it more accessible later [1].", note: "New sentence added after hint pointed to Bjork & Bjork p. 61.", influence: "added" },
    ],
  },
  {
    id: "v2",
    label: "After critique + outline",
    timestamp: "Tue 9:12 PM",
    wordCount: 224,
    aiEvents: [
      { kind: "critique", label: "Critique", at: "9:02 PM", note: "Critique flagged a missing mechanism and weak citation.", sourceIds: ["S1.a", "S3.a"], prompt: "Is my answer strong enough to submit?" },
      { kind: "outline", label: "Outline", at: "9:06 PM", note: "Student asked for an outline to structure two mechanisms.", sourceIds: ["S1.b", "S3.a", "S2.a"], prompt: "Help me structure the two-mechanism answer." },
    ],
    text:
`Spaced practice produces stronger long-term retention than massed practice because of two interacting mechanisms discussed in the readings.

First, spacing introduces a desirable difficulty: some forgetting occurs between sessions, so re-encountering the material requires effortful retrieval. The act of retrieval itself modifies the memory trace and makes it more accessible on later attempts [1]. Cramming, in contrast, feels fluent but that fluency is shallow — we mistake ease of processing for learning.

Second, encoding variability matters. Each study session happens in a slightly different internal and external context, so spaced repetitions associate the material with a broader set of retrieval cues [3]. When the test context differs from any single study context, a richer cue set is more likely to overlap with the test situation.

A quantitative review across 317 experiments found that the spacing advantage grows as the retention interval lengthens — for very short tests, the effect is modest or even absent [2]. This is consistent with both mechanisms: retrieval strengthening and cue variability only pay off when the memory has had a chance to decay between encounters.`,
    events: [
      { kind: "ai-critique", eventIdx: 0, range: [145, 430], spanText: "First, spacing introduces a desirable difficulty: some forgetting occurs between sessions, so re-encountering the material requires effortful retrieval. The act of retrieval itself modifies the memory trace and makes it more accessible on later attempts [1].", note: "Critique flagged weak framing — student reorganized as 'Mechanism 1'.", influence: "restructured" },
      { kind: "ai-outline", eventIdx: 1, range: [575, 900], spanText: "Second, encoding variability matters. Each study session happens in a slightly different internal and external context, so spaced repetitions associate the material with a broader set of retrieval cues [3].", note: "Outline added the second mechanism the student had been missing.", influence: "added" },
      { kind: "ai-outline", eventIdx: 1, range: [1010, 1230], spanText: "A quantitative review across 317 experiments found that the spacing advantage grows as the retention interval lengthens", note: "Outline suggested a boundary-condition paragraph grounded in Cepeda et al.", influence: "added" },
    ],
  },
];

// Citations referenced in v2 (used for source grounding demo).
export const CITATIONS = [
  { n: 1, sourceId: "S1", snippetId: "S1.b" },
  { n: 2, sourceId: "S2", snippetId: "S2.a" },
  { n: 3, sourceId: "S3", snippetId: "S3.a" },
];

// Class list for teacher overview.
export const CLASS_ROSTER = [
  { id: "st-01", name: "Amara Okafor",     init: "AO", initialWords: 71,  aiCalls: 4, lastResort: false, cites: 3, status: "complete",    profile: "reflective" },
  { id: "st-02", name: "Jordan Lee",       init: "JL", initialWords: 68,  aiCalls: 3, lastResort: false, cites: 3, status: "complete",    profile: "current"    },
  { id: "st-03", name: "Priya Raman",      init: "PR", initialWords: 142, aiCalls: 2, lastResort: false, cites: 4, status: "complete",    profile: "strong"     },
  { id: "st-04", name: "Mateo Alvarez",    init: "MA", initialWords: 12,  aiCalls: 7, lastResort: true,  cites: 1, status: "complete",    profile: "overreliant"},
  { id: "st-05", name: "Lin Chen",         init: "LC", initialWords: 55,  aiCalls: 5, lastResort: false, cites: 2, status: "in-progress", profile: "exploring"  },
  { id: "st-06", name: "Sofia Bianchi",    init: "SB", initialWords: 89,  aiCalls: 3, lastResort: false, cites: 2, status: "complete",    profile: "reflective" },
  { id: "st-07", name: "Dev Patel",        init: "DP", initialWords: 34,  aiCalls: 6, lastResort: true,  cites: 1, status: "complete",    profile: "overreliant"},
  { id: "st-08", name: "Hana Suzuki",      init: "HS", initialWords: 118, aiCalls: 2, lastResort: false, cites: 3, status: "complete",    profile: "strong"     },
  { id: "st-09", name: "Noor Rahman",      init: "NR", initialWords: 63,  aiCalls: 4, lastResort: false, cites: 2, status: "in-progress", profile: "exploring"  },
  { id: "st-10", name: "Ezra Kaplan",      init: "EK", initialWords: 48,  aiCalls: 5, lastResort: false, cites: 2, status: "complete",    profile: "reflective" },
  { id: "st-11", name: "Yasmin Haddad",    init: "YH", initialWords: 95,  aiCalls: 3, lastResort: false, cites: 3, status: "complete",    profile: "strong"     },
  { id: "st-12", name: "Tom Fischer",      init: "TF", initialWords: 21,  aiCalls: 8, lastResort: true,  cites: 0, status: "complete",    profile: "overreliant"},
];

// Aggregated AI usage distribution for the teacher dashboard
export const CLASS_AI_BREAKDOWN = [
  { kind: "Hint",        count: 34, color: "var(--accent-3)" },
  { kind: "Critique",    count: 22, color: "var(--accent-2)" },
  { kind: "Explain",     count: 18, color: "var(--ai)"       },
  { kind: "Outline",     count: 12, color: "#5c6a8a"         },
  { kind: "Full answer", count:  4, color: "var(--warn)"     },
];
