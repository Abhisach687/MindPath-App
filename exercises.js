window.EXERCISES = [
  {
    "id": "cbt-thought-record",
    "modality": "CBT",
    "title": "Seven-Part Thought Record",
    "subtitle": "Examine a difficult moment and build a more balanced response.",
    "minutes": 12,
    "difficulty": "medium",
    "targets": [
      "lowMood",
      "anxiety",
      "selfCriticism",
      "rumination"
    ],
    "summary": "A structured thought record separates an event from the meaning your mind gave it. You record the situation, emotions, automatic thoughts, evidence, alternatives, and the effect of a balanced response.",
    "why": "CBT assumes thoughts, feelings, body sensations, and actions influence one another. Slowing the sequence makes hidden assumptions visible and creates room for a response that is accurate, compassionate, and useful—not artificially positive.",
    "when": "Use after a strong emotional reaction, repeated worry, self-criticism, conflict, or avoidance. Wait until you are safe enough to reflect; use a grounding skill first if distress is overwhelming.",
    "steps": [
      "Describe one specific situation using observable facts.",
      "Name emotions and rate their intensity before analysis.",
      "Write the automatic thought exactly as it appeared.",
      "List evidence supporting the thought and evidence that does not fit it.",
      "Write a balanced thought that includes the whole picture.",
      "Re-rate emotions and choose one helpful next action."
    ],
    "tips": [
      "Focus on one moment, not your whole life.",
      "Balanced means fair and complete, not cheerful.",
      "Treat feelings as valid information, not proof."
    ],
    "fields": [
      {
        "name": "situation",
        "label": "What happened?",
        "type": "textarea",
        "placeholder": "Where, when, who, and what occurred?",
        "help": "Use facts a camera could record.",
        "required": true
      },
      {
        "name": "emotions",
        "label": "Emotions and initial intensity",
        "type": "textarea",
        "placeholder": "Anxiety 80/100; sadness 60/100…"
      },
      {
        "name": "automaticThought",
        "label": "Automatic thought",
        "type": "textarea",
        "placeholder": "What went through your mind?"
      },
      {
        "name": "evidenceFor",
        "label": "Evidence that supports the thought",
        "type": "textarea"
      },
      {
        "name": "evidenceAgainst",
        "label": "Evidence that does not fully support it",
        "type": "textarea"
      },
      {
        "name": "balancedThought",
        "label": "Balanced alternative thought",
        "type": "textarea"
      },
      {
        "name": "afterIntensity",
        "label": "Intensity after reflection",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "nextStep",
        "label": "One helpful next action",
        "type": "text"
      }
    ],
    "caution": ""
  },
  {
    "id": "cbt-behavioral-activation",
    "modality": "CBT",
    "title": "Behavioral Activation Planner",
    "subtitle": "Plan small actions that rebuild energy, mastery, and connection.",
    "minutes": 10,
    "difficulty": "easy",
    "targets": [
      "lowMood",
      "avoidance",
      "energy",
      "values"
    ],
    "summary": "Behavioral activation helps you act before motivation arrives. You choose small, realistic activities linked to pleasure, achievement, connection, or self-care and compare predicted versus actual effects.",
    "why": "Low mood often leads to withdrawal, which reduces rewarding experiences and reinforces low mood. A carefully sized action can interrupt this cycle and generate new evidence that action is possible.",
    "when": "Use when you feel stuck, depleted, isolated, or are postponing everyday tasks. Start smaller than your ambitious mind suggests.",
    "steps": [
      "Identify the activity category you need most.",
      "Choose an action that can be started in five minutes or less.",
      "Set a specific time and location.",
      "Predict difficulty and likely benefit.",
      "Complete the smallest version of the plan.",
      "Record actual mood and what helped."
    ],
    "tips": [
      "A partial action counts.",
      "Choose repeatable actions over dramatic goals.",
      "Pair hard tasks with support or a pleasant cue."
    ],
    "fields": [
      {
        "name": "category",
        "label": "Activity category",
        "type": "select",
        "options": [
          "Pleasure",
          "Mastery",
          "Connection",
          "Self-care",
          "Values"
        ]
      },
      {
        "name": "activity",
        "label": "Specific activity",
        "type": "text",
        "placeholder": "Example: walk outside for 8 minutes",
        "required": true
      },
      {
        "name": "startTime",
        "label": "When will you begin?",
        "type": "datetime-local"
      },
      {
        "name": "smallestVersion",
        "label": "Smallest version that still counts",
        "type": "text"
      },
      {
        "name": "predictedDifficulty",
        "label": "Predicted difficulty",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "predictedBenefit",
        "label": "Predicted benefit",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "barrierPlan",
        "label": "Likely barrier and response",
        "type": "textarea"
      },
      {
        "name": "actualResult",
        "label": "Afterward: what happened?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "cbt-distortions",
    "modality": "CBT",
    "title": "Thinking Pattern Check",
    "subtitle": "Notice cognitive shortcuts without judging yourself.",
    "minutes": 10,
    "difficulty": "easy",
    "targets": [
      "anxiety",
      "selfCriticism",
      "rumination"
    ],
    "summary": "This exercise identifies common thinking shortcuts such as all-or-nothing thinking, catastrophizing, mind reading, emotional reasoning, and rigid “should” rules.",
    "why": "Naming a pattern reduces fusion with it. The goal is not to ban fast thinking; it is to decide whether the shortcut fits this situation and whether another interpretation would help you respond more effectively.",
    "when": "Use when thoughts feel absolute, urgent, repetitive, or unusually harsh.",
    "steps": [
      "Write the exact thought.",
      "Select any patterns that may be present.",
      "Describe the cost of believing the thought completely.",
      "Look for missing information or alternative explanations.",
      "Rewrite the thought in flexible, specific language."
    ],
    "tips": [
      "Use “sometimes,” “in this situation,” and “one possibility is…”",
      "More than one pattern may be present.",
      "Do not use labels to criticize yourself."
    ],
    "fields": [
      {
        "name": "thought",
        "label": "Exact thought",
        "type": "textarea",
        "required": true
      },
      {
        "name": "patterns",
        "label": "Possible thinking patterns",
        "type": "multi-select",
        "options": [
          "All-or-nothing",
          "Catastrophizing",
          "Mind reading",
          "Fortune telling",
          "Overgeneralizing",
          "Mental filter",
          "Discounting positives",
          "Emotional reasoning",
          "Should/must rule",
          "Personalization",
          "Labeling"
        ]
      },
      {
        "name": "cost",
        "label": "What happens when you believe it 100%?",
        "type": "textarea"
      },
      {
        "name": "missingInfo",
        "label": "What information might be missing?",
        "type": "textarea"
      },
      {
        "name": "flexibleThought",
        "label": "More flexible wording",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "cbt-behavioral-experiment",
    "modality": "CBT",
    "title": "Behavioral Experiment",
    "subtitle": "Test a prediction with a safe real-world observation.",
    "minutes": 15,
    "difficulty": "medium",
    "targets": [
      "anxiety",
      "avoidance",
      "selfCriticism"
    ],
    "summary": "A behavioral experiment converts a belief into a testable prediction, then compares expectation with what actually happens.",
    "why": "Anxiety and self-criticism often survive because feared predictions are avoided or interpreted selectively. A small, safe experiment generates direct evidence and updates confidence in the belief.",
    "when": "Use for everyday predictions such as “If I ask a question, everyone will think I am incompetent.” Do not use for dangerous situations or major irreversible decisions.",
    "steps": [
      "Write the belief and rate confidence.",
      "Turn it into a specific observable prediction.",
      "Design a small, safe test.",
      "Define what evidence would support or weaken the prediction.",
      "Run the experiment and record facts.",
      "Update the belief and decide the next test."
    ],
    "tips": [
      "Keep the test ethical and reversible.",
      "Measure observable outcomes, not guesses about minds.",
      "Unexpected results are useful data."
    ],
    "fields": [
      {
        "name": "belief",
        "label": "Belief to test",
        "type": "textarea",
        "required": true
      },
      {
        "name": "confidenceBefore",
        "label": "Confidence before",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "prediction",
        "label": "Specific prediction",
        "type": "textarea"
      },
      {
        "name": "experiment",
        "label": "Safe experiment plan",
        "type": "textarea"
      },
      {
        "name": "supportEvidence",
        "label": "What result would support it?",
        "type": "textarea"
      },
      {
        "name": "weakenEvidence",
        "label": "What result would weaken it?",
        "type": "textarea"
      },
      {
        "name": "result",
        "label": "What actually happened?",
        "type": "textarea"
      },
      {
        "name": "confidenceAfter",
        "label": "Confidence after",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "learning",
        "label": "What did you learn?",
        "type": "textarea"
      }
    ],
    "caution": "Choose only low-risk experiments. For trauma, severe anxiety, eating disorders, substance use, or compulsions, plan experiments with a qualified clinician."
  },
  {
    "id": "cbt-exposure-ladder",
    "modality": "CBT",
    "title": "Gentle Exposure Ladder",
    "subtitle": "Build gradual steps toward situations you avoid.",
    "minutes": 15,
    "difficulty": "advanced",
    "targets": [
      "anxiety",
      "avoidance"
    ],
    "summary": "An exposure ladder ranks safe but avoided situations from easier to harder. Practice is gradual and repeated, with attention to learning rather than forcing anxiety to disappear.",
    "why": "Avoidance can teach the brain that discomfort is dangerous and unmanageable. Gradual approach practice can build tolerance and update threat expectations when it is appropriately designed.",
    "when": "Use for ordinary fears and avoidance after discussing suitability with a professional when symptoms are severe, trauma-related, obsessive-compulsive, or medically complicated.",
    "steps": [
      "Define the valued situation you want to approach.",
      "List 6–10 smaller steps.",
      "Rate expected distress for each step.",
      "Start with a manageable step, not necessarily the lowest.",
      "Stay long enough to observe what happens without adding new safety risks.",
      "Repeat and record learning before moving upward."
    ],
    "tips": [
      "The goal is willingness and learning, not zero anxiety.",
      "Do not flood yourself.",
      "Reduce only unnecessary safety behaviors, never genuine precautions."
    ],
    "fields": [
      {
        "name": "goal",
        "label": "Approach goal",
        "type": "text",
        "required": true
      },
      {
        "name": "stepsList",
        "label": "Ladder steps with distress ratings",
        "type": "textarea",
        "placeholder": "1. Read about the topic — 25/100\n2. Stand near the place — 40/100…"
      },
      {
        "name": "chosenStep",
        "label": "Step for this practice",
        "type": "text"
      },
      {
        "name": "prediction",
        "label": "What do you predict will happen?",
        "type": "textarea"
      },
      {
        "name": "safetyBehaviors",
        "label": "Unnecessary safety behaviors to notice",
        "type": "textarea"
      },
      {
        "name": "result",
        "label": "What happened and what did you learn?",
        "type": "textarea"
      },
      {
        "name": "distressPeak",
        "label": "Peak distress",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "distressEnd",
        "label": "Distress at end",
        "type": "scale",
        "min": 0,
        "max": 100
      }
    ],
    "caution": "Never use this tool to confront actual danger. Trauma-focused exposure and exposure for OCD should be guided by a trained clinician."
  },
  {
    "id": "cbt-problem-solving",
    "modality": "CBT",
    "title": "Structured Problem Solving",
    "subtitle": "Move from an overwhelming problem to one testable action.",
    "minutes": 14,
    "difficulty": "medium",
    "targets": [
      "stress",
      "avoidance",
      "functioning"
    ],
    "summary": "This worksheet distinguishes solvable problems from hypothetical worries, generates options, compares trade-offs, and creates a concrete action plan.",
    "why": "Stress narrows attention and encourages either impulsive action or paralysis. A structured sequence reduces cognitive load and makes progress measurable.",
    "when": "Use when a practical problem is recurring and some part of it is within your influence.",
    "steps": [
      "Define one problem without blame or vague language.",
      "State the outcome you need.",
      "Brainstorm options before evaluating them.",
      "Compare benefits, costs, resources, and risks.",
      "Choose one option or combination.",
      "Create a first step, deadline, and review point."
    ],
    "tips": [
      "Separate “I cannot control” from “I can influence.”",
      "Include asking for help as an option.",
      "A good plan can still need revision."
    ],
    "fields": [
      {
        "name": "problem",
        "label": "Specific problem",
        "type": "textarea",
        "required": true
      },
      {
        "name": "desiredOutcome",
        "label": "Desired realistic outcome",
        "type": "textarea"
      },
      {
        "name": "options",
        "label": "Possible options",
        "type": "textarea",
        "placeholder": "List at least three, including imperfect ideas."
      },
      {
        "name": "comparison",
        "label": "Benefits, costs, and risks",
        "type": "textarea"
      },
      {
        "name": "choice",
        "label": "Chosen approach",
        "type": "textarea"
      },
      {
        "name": "firstStep",
        "label": "First action",
        "type": "text"
      },
      {
        "name": "deadline",
        "label": "Deadline",
        "type": "datetime-local"
      },
      {
        "name": "review",
        "label": "How and when will you review?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "cbt-core-belief",
    "modality": "CBT",
    "title": "Core Belief Reframe",
    "subtitle": "Explore a recurring rule or identity conclusion.",
    "minutes": 16,
    "difficulty": "advanced",
    "targets": [
      "selfCriticism",
      "lowMood",
      "relationship"
    ],
    "summary": "This exercise traces repeated automatic thoughts to a deeper belief, examines where it came from, and develops a more flexible belief supported by lived evidence.",
    "why": "Core beliefs can organize attention so confirming evidence stands out and disconfirming evidence is ignored. Change comes through compassionate reflection plus repeated behavioral evidence.",
    "when": "Use when the same conclusion—such as “I am unlovable” or “I must never fail”—appears across situations. Work with a therapist if this activates trauma or intense shame.",
    "steps": [
      "Identify a repeated automatic thought.",
      "Ask what it would mean about you if it were true.",
      "Name the possible core belief and rate conviction.",
      "Describe its history without treating history as destiny.",
      "Collect evidence that shows a broader picture.",
      "Write a flexible belief and one action that could strengthen it."
    ],
    "tips": [
      "Use specific evidence from real events.",
      "A flexible belief should allow strengths and limitations.",
      "Pause if shame becomes overwhelming."
    ],
    "fields": [
      {
        "name": "repeatedThought",
        "label": "Repeated thought",
        "type": "textarea"
      },
      {
        "name": "meaning",
        "label": "What would it mean about you?",
        "type": "textarea"
      },
      {
        "name": "coreBelief",
        "label": "Possible core belief",
        "type": "text",
        "required": true
      },
      {
        "name": "convictionBefore",
        "label": "Conviction before",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "origins",
        "label": "Where might this belief have been learned?",
        "type": "textarea"
      },
      {
        "name": "broaderEvidence",
        "label": "Evidence for a broader view",
        "type": "textarea"
      },
      {
        "name": "newBelief",
        "label": "Flexible alternative belief",
        "type": "textarea"
      },
      {
        "name": "evidenceAction",
        "label": "Action that could build new evidence",
        "type": "textarea"
      },
      {
        "name": "convictionAfter",
        "label": "Conviction after",
        "type": "scale",
        "min": 0,
        "max": 100
      }
    ],
    "caution": "Core-belief work can bring up painful memories. Stop and seek professional support if you become destabilized."
  },
  {
    "id": "dbt-stop",
    "modality": "DBT",
    "title": "STOP Skill",
    "subtitle": "Pause an impulsive reaction and return to wise action.",
    "minutes": 5,
    "difficulty": "easy",
    "targets": [
      "dysregulation",
      "stress",
      "relationship"
    ],
    "summary": "STOP stands for Stop, Take a step back, Observe, and Proceed mindfully. It is a brief crisis-interruption skill for moments when emotion is pushing immediate action.",
    "why": "A short pause can prevent an emotion-driven behavior from making the situation harder. Observation adds information; mindful proceeding reconnects action with goals and values.",
    "when": "Use during conflict, urges to send a message immediately, panic escalation, or any moment when you need seconds of space.",
    "steps": [
      "Stop your body before acting.",
      "Take a step back physically or mentally.",
      "Observe thoughts, emotions, urges, body sensations, and facts.",
      "Ask what outcome matters in the next hour and tomorrow.",
      "Proceed with the smallest effective action."
    ],
    "tips": [
      "Use one slow exhale to lengthen the pause.",
      "You can delay a response without avoiding it forever.",
      "Safety comes before relationship goals."
    ],
    "fields": [
      {
        "name": "trigger",
        "label": "What triggered the urge?",
        "type": "textarea",
        "required": true
      },
      {
        "name": "urge",
        "label": "What did you want to do?",
        "type": "textarea"
      },
      {
        "name": "emotion",
        "label": "Emotion and intensity",
        "type": "textarea"
      },
      {
        "name": "facts",
        "label": "What facts can you observe?",
        "type": "textarea"
      },
      {
        "name": "goal",
        "label": "What outcome matters?",
        "type": "textarea"
      },
      {
        "name": "wiseAction",
        "label": "Mindful next action",
        "type": "textarea"
      },
      {
        "name": "result",
        "label": "What happened after the pause?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "dbt-tip",
    "modality": "DBT",
    "title": "TIP Body Reset",
    "subtitle": "Use safe body-based methods to lower acute arousal.",
    "minutes": 6,
    "difficulty": "easy",
    "targets": [
      "dysregulation",
      "anxiety",
      "stress"
    ],
    "summary": "TIP combines a brief cool-temperature cue, safe movement, paced breathing, and muscle release. The app uses a conservative version suitable for general self-help.",
    "why": "When arousal is high, reasoning may be difficult. Changing breathing pace, muscle tension, and sensory input can help the nervous system settle enough for problem-solving.",
    "when": "Use for short-term emotional surges. It is not a substitute for medical care, and physical techniques should be adapted to your health.",
    "steps": [
      "Apply a cool—not painfully cold—cloth to cheeks or hold a cool object.",
      "Move safely for 30–90 seconds if medically appropriate.",
      "Breathe out a little longer than you breathe in.",
      "Tense and gently release muscle groups.",
      "Re-rate arousal and choose the next skill."
    ],
    "tips": [
      "Stop if dizzy, numb, painful, or unwell.",
      "Gentle movement is enough.",
      "Follow with validation and a plan; regulation is not suppression."
    ],
    "fields": [
      {
        "name": "arousalBefore",
        "label": "Arousal before",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "temperature",
        "label": "Cool cue used",
        "type": "text"
      },
      {
        "name": "movement",
        "label": "Safe movement used",
        "type": "text"
      },
      {
        "name": "breathingRounds",
        "label": "Paced breathing rounds",
        "type": "number"
      },
      {
        "name": "muscleRelease",
        "label": "Muscle groups released",
        "type": "textarea"
      },
      {
        "name": "arousalAfter",
        "label": "Arousal after",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "nextSkill",
        "label": "What will you do next?",
        "type": "textarea"
      }
    ],
    "caution": "Avoid intense exercise or extreme cold if you have relevant heart, breathing, fainting, pregnancy, neurological, or other medical concerns. Use clinician guidance."
  },
  {
    "id": "dbt-opposite-action",
    "modality": "DBT",
    "title": "Opposite Action",
    "subtitle": "Choose behavior based on facts and long-term goals.",
    "minutes": 12,
    "difficulty": "medium",
    "targets": [
      "dysregulation",
      "avoidance",
      "lowMood"
    ],
    "summary": "Opposite action asks whether an emotion and its action urge fit the facts. When the urge is ineffective or unjustified, you practice a complete opposite behavior.",
    "why": "Emotions prepare action quickly. Sometimes the signal fits; sometimes it is too intense or based on assumptions. Acting opposite can change the emotion over time when done fully and safely.",
    "when": "Use for unjustified shame, fear, anger, or low-mood withdrawal. Do not oppose protective fear when there is real danger.",
    "steps": [
      "Name the emotion and action urge.",
      "Check the observable facts and actual threat.",
      "Decide whether the emotion fits the facts and is effective.",
      "Choose the opposite behavior, posture, words, and attention.",
      "Practice fully rather than halfway.",
      "Record the result and what you learned."
    ],
    "tips": [
      "Validate the emotion before choosing action.",
      "Opposite action is not pretending.",
      "Real danger requires protective action."
    ],
    "fields": [
      {
        "name": "emotion",
        "label": "Emotion",
        "type": "text",
        "required": true
      },
      {
        "name": "intensity",
        "label": "Intensity",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "urge",
        "label": "Action urge",
        "type": "textarea"
      },
      {
        "name": "facts",
        "label": "Facts of the situation",
        "type": "textarea"
      },
      {
        "name": "fitsFacts",
        "label": "Does the emotion fit the facts?",
        "type": "select",
        "options": [
          "Yes",
          "Partly",
          "No",
          "Unsure"
        ]
      },
      {
        "name": "effective",
        "label": "Would the urge be effective?",
        "type": "select",
        "options": [
          "Yes",
          "Partly",
          "No",
          "Unsure"
        ]
      },
      {
        "name": "opposite",
        "label": "Complete opposite action",
        "type": "textarea"
      },
      {
        "name": "outcome",
        "label": "Outcome and learning",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "dbt-dear-man",
    "modality": "DBT",
    "title": "DEAR MAN Request",
    "subtitle": "Prepare a clear, respectful request or boundary.",
    "minutes": 14,
    "difficulty": "medium",
    "targets": [
      "relationship",
      "assertiveness",
      "stress"
    ],
    "summary": "DEAR MAN organizes an interpersonal request: Describe, Express, Assert, Reinforce, stay Mindful, Appear confident, and Negotiate.",
    "why": "When emotions rise, requests can become vague, apologetic, aggressive, or overloaded. A structured script helps preserve the objective while respecting both people.",
    "when": "Use before asking for a change, saying no, negotiating, or setting a boundary.",
    "steps": [
      "Describe facts without judgment.",
      "Express feelings and impact using first-person language.",
      "Assert one clear request or refusal.",
      "Explain the benefit of cooperation.",
      "Plan how to stay on topic.",
      "Choose confident delivery and acceptable alternatives."
    ],
    "tips": [
      "Keep the request behaviorally specific.",
      "Do not threaten what you cannot or should not do.",
      "A boundary describes your action, not control over another person."
    ],
    "fields": [
      {
        "name": "objective",
        "label": "What outcome do you want?",
        "type": "text",
        "required": true
      },
      {
        "name": "describe",
        "label": "D — Describe the facts",
        "type": "textarea"
      },
      {
        "name": "express",
        "label": "E — Express feelings and impact",
        "type": "textarea"
      },
      {
        "name": "assert",
        "label": "A — Assert the request or boundary",
        "type": "textarea"
      },
      {
        "name": "reinforce",
        "label": "R — Reinforce the benefit",
        "type": "textarea"
      },
      {
        "name": "mindful",
        "label": "M — How will you stay on topic?",
        "type": "textarea"
      },
      {
        "name": "appear",
        "label": "A — Confident posture and tone",
        "type": "textarea"
      },
      {
        "name": "negotiate",
        "label": "N — Acceptable alternatives",
        "type": "textarea"
      },
      {
        "name": "finalScript",
        "label": "Final concise script",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "dbt-pros-cons",
    "modality": "DBT",
    "title": "Urge Pros and Cons",
    "subtitle": "Compare acting on an urge with resisting it.",
    "minutes": 10,
    "difficulty": "easy",
    "targets": [
      "dysregulation",
      "impulsivity",
      "stress"
    ],
    "summary": "This four-quadrant exercise examines short- and long-term consequences of acting on an urge and of not acting on it.",
    "why": "Intense urges highlight immediate relief and hide later costs. Writing all four quadrants restores a wider time horizon and supports intentional choice.",
    "when": "Use before impulsive communication, avoidance, quitting, overspending, substance use, or another behavior you are trying to change.",
    "steps": [
      "Name the urge and its intensity.",
      "List benefits of acting on it.",
      "List costs of acting on it.",
      "List benefits of resisting or delaying it.",
      "List costs of resisting or delaying it.",
      "Choose a time-limited next action and support."
    ],
    "tips": [
      "Be honest about immediate relief.",
      "Include effects on tomorrow and next month.",
      "Delay can be a valid first decision."
    ],
    "fields": [
      {
        "name": "urge",
        "label": "Urge or behavior",
        "type": "textarea",
        "required": true
      },
      {
        "name": "intensity",
        "label": "Urge intensity",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "actPros",
        "label": "Benefits of acting",
        "type": "textarea"
      },
      {
        "name": "actCons",
        "label": "Costs of acting",
        "type": "textarea"
      },
      {
        "name": "resistPros",
        "label": "Benefits of resisting/delaying",
        "type": "textarea"
      },
      {
        "name": "resistCons",
        "label": "Costs of resisting/delaying",
        "type": "textarea"
      },
      {
        "name": "decision",
        "label": "Decision for the next hour",
        "type": "textarea"
      },
      {
        "name": "support",
        "label": "Support or barrier plan",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "dbt-chain-analysis",
    "modality": "DBT",
    "title": "Behavior Chain Analysis",
    "subtitle": "Map the links before and after a problem behavior.",
    "minutes": 18,
    "difficulty": "advanced",
    "targets": [
      "dysregulation",
      "impulsivity",
      "relationship"
    ],
    "summary": "A chain analysis traces vulnerability factors, prompting event, thoughts, body sensations, emotions, urges, actions, and consequences. It then identifies points where skills could change the chain.",
    "why": "Problem behaviors usually develop through many small links, not one cause. Finding earlier links creates more intervention options and reduces shame-based explanations.",
    "when": "Use after a behavior you want to understand and reduce. Complete it when sufficiently regulated and with professional support for dangerous or self-harming behavior.",
    "steps": [
      "Describe the target behavior precisely.",
      "List vulnerabilities present beforehand.",
      "Identify the prompting event.",
      "Write each link in order, including internal events.",
      "Record immediate and delayed consequences.",
      "Choose several break points and replacement skills.",
      "Create a repair and prevention plan."
    ],
    "tips": [
      "Use curiosity, not prosecution.",
      "Include helpful consequences as well as harmful ones.",
      "The earliest workable break point is often best."
    ],
    "fields": [
      {
        "name": "targetBehavior",
        "label": "Target behavior",
        "type": "textarea",
        "required": true
      },
      {
        "name": "vulnerabilities",
        "label": "Vulnerability factors",
        "type": "textarea",
        "placeholder": "Sleep, hunger, illness, stress, substances, prior conflict…"
      },
      {
        "name": "promptingEvent",
        "label": "Prompting event",
        "type": "textarea"
      },
      {
        "name": "links",
        "label": "Chain of links in order",
        "type": "textarea"
      },
      {
        "name": "consequences",
        "label": "Immediate and delayed consequences",
        "type": "textarea"
      },
      {
        "name": "breakPoints",
        "label": "Possible break points",
        "type": "textarea"
      },
      {
        "name": "replacementSkills",
        "label": "Skills or alternative behaviors",
        "type": "textarea"
      },
      {
        "name": "repairPlan",
        "label": "Repair and prevention plan",
        "type": "textarea"
      }
    ],
    "caution": "Do not use a self-help app as the only response to self-harm, violence, severe substance risk, or other dangerous behavior. Seek immediate professional support."
  },
  {
    "id": "dbt-diary-card",
    "modality": "DBT",
    "title": "Daily DBT Diary Card",
    "subtitle": "Track emotions, urges, skills, and effectiveness.",
    "minutes": 8,
    "difficulty": "easy",
    "targets": [
      "dysregulation",
      "impulsivity",
      "mindfulness"
    ],
    "summary": "A diary card is a compact daily record of emotional intensity, urges, target behaviors, and skills used. It is designed to reveal patterns across days rather than produce a perfect narrative.",
    "why": "Repeated tracking helps separate memory from data, shows which vulnerabilities precede urges, and makes skill use visible even when the day felt difficult.",
    "when": "Use once daily, preferably at a consistent time. Keep it brief enough to sustain.",
    "steps": [
      "Rate key emotions and urges.",
      "Mark any target behaviors without adding graphic details.",
      "Select skills attempted.",
      "Rate overall effectiveness.",
      "Name one factor that helped and one priority for tomorrow."
    ],
    "tips": [
      "Accuracy matters more than looking good.",
      "Record skill attempts, not just successes.",
      "Share patterns with a clinician when relevant."
    ],
    "fields": [
      {
        "name": "emotions",
        "label": "Emotion ratings",
        "type": "textarea",
        "placeholder": "Sadness 4/10; anger 2/10; fear 6/10…"
      },
      {
        "name": "urges",
        "label": "Urges and ratings",
        "type": "textarea"
      },
      {
        "name": "targetBehaviors",
        "label": "Target behaviors (brief, non-graphic)",
        "type": "textarea"
      },
      {
        "name": "skills",
        "label": "Skills used",
        "type": "multi-select",
        "options": [
          "Mindfulness",
          "STOP",
          "TIP",
          "Opposite action",
          "Check the facts",
          "Pros/cons",
          "DEAR MAN",
          "Self-soothing",
          "Distraction",
          "Radical acceptance"
        ]
      },
      {
        "name": "effectiveness",
        "label": "Overall effectiveness",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "helped",
        "label": "What helped today?",
        "type": "textarea"
      },
      {
        "name": "tomorrow",
        "label": "Priority for tomorrow",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "sft-miracle-question",
    "modality": "SFT",
    "title": "Miracle Question",
    "subtitle": "Imagine observable signs of a preferred future.",
    "minutes": 14,
    "difficulty": "medium",
    "targets": [
      "hope",
      "values",
      "relationship",
      "functioning"
    ],
    "summary": "The miracle question invites you to imagine that the problem is sufficiently improved overnight, then identify the first small, observable differences you would notice.",
    "why": "Solution-focused work develops detailed pictures of preferred life, which can reveal goals, resources, and behaviors that are easier to act on than abstract wishes.",
    "when": "Use when you know what you do not want but cannot yet describe what you want instead.",
    "steps": [
      "Imagine the problem improved enough while you slept.",
      "Describe the first sign after waking.",
      "Describe what you would do differently.",
      "Describe what others might notice.",
      "Identify which tiny part already happens sometimes.",
      "Choose one sign you can practice deliberately."
    ],
    "tips": [
      "Keep signs observable and ordinary.",
      "You do not need to believe in a literal miracle.",
      "Focus on “what would be happening” rather than only “what would stop.”"
    ],
    "fields": [
      {
        "name": "firstSign",
        "label": "First sign after waking",
        "type": "textarea",
        "required": true
      },
      {
        "name": "differentActions",
        "label": "What would you do differently?",
        "type": "textarea"
      },
      {
        "name": "othersNotice",
        "label": "What would others notice?",
        "type": "textarea"
      },
      {
        "name": "dayDetails",
        "label": "How would the day unfold?",
        "type": "textarea"
      },
      {
        "name": "alreadyPresent",
        "label": "Which small part already happens?",
        "type": "textarea"
      },
      {
        "name": "practiceSign",
        "label": "One sign to practice this week",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "sft-scaling",
    "modality": "SFT",
    "title": "Progress Scaling",
    "subtitle": "Turn a 0–10 rating into a specific next step.",
    "minutes": 8,
    "difficulty": "easy",
    "targets": [
      "hope",
      "functioning",
      "values"
    ],
    "summary": "Scaling questions place your current position between a defined low point and a preferred outcome, then explore what keeps you above zero and what one step higher would look like.",
    "why": "The number is less important than the evidence behind it. Scaling makes progress visible and converts vague goals into observable next actions.",
    "when": "Use for weekly progress, confidence, readiness, coping, or relationship goals.",
    "steps": [
      "Define what 0 and 10 mean in concrete terms.",
      "Choose today’s number.",
      "List evidence that makes it that number rather than lower.",
      "Describe what a half-step higher would look like.",
      "Choose one action that could support that movement."
    ],
    "tips": [
      "A half-point is meaningful.",
      "Do not compare your scale with another person’s.",
      "Notice stability as well as improvement."
    ],
    "fields": [
      {
        "name": "scaleTopic",
        "label": "What are you scaling?",
        "type": "text",
        "required": true
      },
      {
        "name": "zeroMeaning",
        "label": "What does 0 mean?",
        "type": "textarea"
      },
      {
        "name": "tenMeaning",
        "label": "What does 10 mean?",
        "type": "textarea"
      },
      {
        "name": "rating",
        "label": "Current rating",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "whyNotLower",
        "label": "Why is it not lower?",
        "type": "textarea"
      },
      {
        "name": "halfStep",
        "label": "What would half a step higher look like?",
        "type": "textarea"
      },
      {
        "name": "nextAction",
        "label": "One action toward it",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "sft-exceptions",
    "modality": "SFT",
    "title": "Exception Finder",
    "subtitle": "Study times when the problem was less powerful.",
    "minutes": 12,
    "difficulty": "medium",
    "targets": [
      "hope",
      "functioning",
      "relationship"
    ],
    "summary": "Exception questions identify moments when a problem was absent, smaller, shorter, or handled better than usual.",
    "why": "Exceptions reveal existing skills, environmental supports, timing, and choices. The purpose is not to minimize the problem but to learn from variation.",
    "when": "Use when the difficulty feels constant or when you want evidence of what already helps.",
    "steps": [
      "Choose a recent exception, even a small one.",
      "Describe what was different before and during it.",
      "Identify what you or others did.",
      "Name resources, conditions, and skills involved.",
      "Decide which element can be repeated."
    ],
    "tips": [
      "Look for shorter duration, not only total absence.",
      "Include accidental exceptions.",
      "Give yourself credit for small contributions."
    ],
    "fields": [
      {
        "name": "problem",
        "label": "Problem pattern",
        "type": "text",
        "required": true
      },
      {
        "name": "exception",
        "label": "A time it was less intense or shorter",
        "type": "textarea"
      },
      {
        "name": "differences",
        "label": "What was different?",
        "type": "textarea"
      },
      {
        "name": "yourContribution",
        "label": "What did you do that helped?",
        "type": "textarea"
      },
      {
        "name": "otherSupport",
        "label": "What did others or the environment contribute?",
        "type": "textarea"
      },
      {
        "name": "repeatableElement",
        "label": "What can be repeated?",
        "type": "textarea"
      },
      {
        "name": "experiment",
        "label": "Small repetition experiment",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "sft-coping",
    "modality": "SFT",
    "title": "Coping Questions",
    "subtitle": "Recognize how you kept going under pressure.",
    "minutes": 10,
    "difficulty": "easy",
    "targets": [
      "hope",
      "stress",
      "selfCriticism"
    ],
    "summary": "Coping questions explore what has allowed you to survive, function, care, or continue despite difficulty.",
    "why": "Under stress, attention often excludes competence and persistence. Naming coping does not glorify suffering; it identifies usable strengths and supports.",
    "when": "Use when progress feels invisible or the main achievement is enduring a hard period.",
    "steps": [
      "Describe what has been hardest.",
      "Ask how you managed to get through the most difficult moments.",
      "Identify personal qualities, routines, people, or beliefs that contributed.",
      "Notice what the coping says about what matters to you.",
      "Choose one resource to strengthen."
    ],
    "tips": [
      "Surviving counts.",
      "Coping can be imperfect and still useful.",
      "Distinguish helpful coping from coping with serious costs."
    ],
    "fields": [
      {
        "name": "hardestPart",
        "label": "What has been hardest?",
        "type": "textarea"
      },
      {
        "name": "howManaged",
        "label": "How did you manage to keep going?",
        "type": "textarea",
        "required": true
      },
      {
        "name": "qualities",
        "label": "What qualities did this require?",
        "type": "textarea"
      },
      {
        "name": "supports",
        "label": "Who or what supported you?",
        "type": "textarea"
      },
      {
        "name": "meaning",
        "label": "What does this show about what matters to you?",
        "type": "textarea"
      },
      {
        "name": "strengthen",
        "label": "One resource to strengthen",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "sft-preferred-future",
    "modality": "SFT",
    "title": "Preferred Future Description",
    "subtitle": "Build a realistic picture of life working better.",
    "minutes": 14,
    "difficulty": "medium",
    "targets": [
      "values",
      "hope",
      "functioning"
    ],
    "summary": "This exercise develops a detailed preferred future across routines, relationships, work, rest, and self-talk without requiring every problem to disappear.",
    "why": "Concrete descriptions make goals easier to recognize and practice. They also expose which changes are within your influence and which need support.",
    "when": "Use for goal setting, transitions, recovery planning, or when many goals compete.",
    "steps": [
      "Choose a future time horizon.",
      "Describe an ordinary good-enough day.",
      "Include behaviors, relationships, body cues, and environment.",
      "Identify the most important difference.",
      "Find an existing seed of that future.",
      "Choose a small action for the next 48 hours."
    ],
    "tips": [
      "Prefer ordinary detail over perfection.",
      "Include rest and boundaries.",
      "Use your own values, not external expectations."
    ],
    "fields": [
      {
        "name": "timeHorizon",
        "label": "Future time horizon",
        "type": "select",
        "options": [
          "Two weeks",
          "One month",
          "Three months",
          "One year"
        ]
      },
      {
        "name": "morning",
        "label": "Morning in the preferred future",
        "type": "textarea"
      },
      {
        "name": "day",
        "label": "Daytime activities and relationships",
        "type": "textarea"
      },
      {
        "name": "evening",
        "label": "Evening and recovery",
        "type": "textarea"
      },
      {
        "name": "selfTalk",
        "label": "How do you speak to yourself?",
        "type": "textarea"
      },
      {
        "name": "keyDifference",
        "label": "Most important difference",
        "type": "textarea"
      },
      {
        "name": "existingSeed",
        "label": "What part already exists?",
        "type": "textarea"
      },
      {
        "name": "next48",
        "label": "Action within 48 hours",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "sft-small-step",
    "modality": "SFT",
    "title": "Small Next Step",
    "subtitle": "Define a step small enough to start today.",
    "minutes": 7,
    "difficulty": "easy",
    "targets": [
      "avoidance",
      "functioning",
      "hope"
    ],
    "summary": "The small-step exercise translates a preferred direction into the next visible behavior, with a clear cue and fallback version.",
    "why": "Large goals can trigger avoidance because the starting point is ambiguous. A small step reduces friction and creates momentum and information.",
    "when": "Use whenever a plan feels heavy, vague, or repeatedly postponed.",
    "steps": [
      "Name the direction you care about.",
      "Choose an action that takes 2–15 minutes.",
      "Define when and where it will happen.",
      "Create a two-minute fallback version.",
      "Identify one obstacle and response.",
      "Define how you will know it is complete."
    ],
    "tips": [
      "Small does not mean unimportant.",
      "Make the start easier than the finish.",
      "Repeat before increasing difficulty."
    ],
    "fields": [
      {
        "name": "direction",
        "label": "Direction or goal",
        "type": "text",
        "required": true
      },
      {
        "name": "step",
        "label": "Next small step",
        "type": "text"
      },
      {
        "name": "whenWhere",
        "label": "When and where?",
        "type": "text"
      },
      {
        "name": "fallback",
        "label": "Two-minute fallback",
        "type": "text"
      },
      {
        "name": "obstacle",
        "label": "Likely obstacle",
        "type": "textarea"
      },
      {
        "name": "response",
        "label": "Response to obstacle",
        "type": "textarea"
      },
      {
        "name": "doneDefinition",
        "label": "What counts as done?",
        "type": "text"
      }
    ],
    "caution": ""
  },
  {
    "id": "sft-resources",
    "modality": "SFT",
    "title": "Strengths and Resources Map",
    "subtitle": "Map internal, relational, and practical supports.",
    "minutes": 12,
    "difficulty": "easy",
    "targets": [
      "hope",
      "relationship",
      "functioning"
    ],
    "summary": "This map organizes strengths, skills, supportive people, places, routines, knowledge, and services that can help with the current goal.",
    "why": "When distressed, people can lose access to memories of competence and support. A visible map reduces reliance on recall during difficult moments.",
    "when": "Use for planning, transitions, setbacks, or preparing for a demanding week.",
    "steps": [
      "Name the goal or challenge.",
      "List personal strengths demonstrated by past actions.",
      "List supportive people and how they can help.",
      "List routines, places, tools, and professional resources.",
      "Mark resources available now versus needing development.",
      "Choose one resource to activate."
    ],
    "tips": [
      "Use evidence, not generic compliments.",
      "Specify what kind of help to request.",
      "Include formal services when appropriate."
    ],
    "fields": [
      {
        "name": "challenge",
        "label": "Goal or challenge",
        "type": "textarea",
        "required": true
      },
      {
        "name": "strengths",
        "label": "Personal strengths with examples",
        "type": "textarea"
      },
      {
        "name": "people",
        "label": "Supportive people and possible roles",
        "type": "textarea"
      },
      {
        "name": "practical",
        "label": "Practical resources, routines, and places",
        "type": "textarea"
      },
      {
        "name": "professional",
        "label": "Professional or community resources",
        "type": "textarea"
      },
      {
        "name": "availableNow",
        "label": "Resources available now",
        "type": "textarea"
      },
      {
        "name": "activate",
        "label": "One resource to activate",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "act-values-compass",
    "modality": "ACT",
    "title": "Values Compass",
    "subtitle": "Clarify how you want to behave in important life areas.",
    "minutes": 15,
    "difficulty": "medium",
    "targets": [
      "values",
      "avoidance",
      "hope"
    ],
    "summary": "Values are chosen qualities of action—such as being caring, curious, reliable, or courageous—not goals that can be permanently completed. This exercise distinguishes values from rules, approval, and outcomes.",
    "why": "Clear values provide direction when feelings and circumstances are difficult. They help evaluate actions by meaningfulness rather than immediate comfort alone.",
    "when": "Use during decisions, transitions, loss of motivation, or when life feels dominated by symptom control.",
    "steps": [
      "Review major life areas.",
      "Write how you want to show up in each area.",
      "Separate values from goals and other people’s expectations.",
      "Rate current alignment without self-attack.",
      "Choose one priority value.",
      "Define a small committed action."
    ],
    "tips": [
      "Values are verbs or qualities of action.",
      "You can act on a value before feeling ready.",
      "Choose freely; “should” is a cue to recheck ownership."
    ],
    "fields": [
      {
        "name": "relationships",
        "label": "Relationships: how do you want to show up?",
        "type": "textarea"
      },
      {
        "name": "workLearning",
        "label": "Work or learning values",
        "type": "textarea"
      },
      {
        "name": "health",
        "label": "Health and self-care values",
        "type": "textarea"
      },
      {
        "name": "community",
        "label": "Community or contribution values",
        "type": "textarea"
      },
      {
        "name": "growth",
        "label": "Growth, creativity, or spirituality values",
        "type": "textarea"
      },
      {
        "name": "priority",
        "label": "Priority value",
        "type": "text",
        "required": true
      },
      {
        "name": "alignment",
        "label": "Current alignment",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "committedAction",
        "label": "Small value-aligned action",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "act-choice-point",
    "modality": "ACT",
    "title": "Choice Point",
    "subtitle": "Notice moves toward and away from the life you want.",
    "minutes": 10,
    "difficulty": "easy",
    "targets": [
      "values",
      "avoidance",
      "dysregulation"
    ],
    "summary": "The choice point maps a difficult situation, the thoughts and feelings that show up, “away moves” that narrow life, and “toward moves” aligned with values.",
    "why": "This framework avoids arguing with thoughts. It asks whether a behavior moves you toward or away from the person you want to be in this moment.",
    "when": "Use before or after a difficult decision, avoidance pattern, or conflict.",
    "steps": [
      "Describe the situation.",
      "Name thoughts, feelings, sensations, and urges.",
      "List typical away moves and their short-term function.",
      "Name the value relevant to the situation.",
      "List possible toward moves.",
      "Choose one small toward move while making room for discomfort."
    ],
    "tips": [
      "An away move is not a moral failure.",
      "Context matters; rest can be a toward move.",
      "Choose the smallest workable move."
    ],
    "fields": [
      {
        "name": "situation",
        "label": "Situation",
        "type": "textarea",
        "required": true
      },
      {
        "name": "innerExperience",
        "label": "Thoughts, feelings, sensations, urges",
        "type": "textarea"
      },
      {
        "name": "awayMoves",
        "label": "Away moves",
        "type": "textarea"
      },
      {
        "name": "shortTermFunction",
        "label": "What do away moves provide short term?",
        "type": "textarea"
      },
      {
        "name": "value",
        "label": "Relevant value",
        "type": "text"
      },
      {
        "name": "towardMoves",
        "label": "Possible toward moves",
        "type": "textarea"
      },
      {
        "name": "chosenMove",
        "label": "Chosen small toward move",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "act-defusion",
    "modality": "ACT",
    "title": "Cognitive Defusion",
    "subtitle": "Change your relationship to a sticky thought.",
    "minutes": 8,
    "difficulty": "easy",
    "targets": [
      "rumination",
      "anxiety",
      "selfCriticism"
    ],
    "summary": "Defusion helps you notice a thought as an event produced by the mind rather than an instruction, identity, or literal fact. The thought may remain while its control over behavior decreases.",
    "why": "Language can make imagined events feel immediate and absolute. Adding perspective creates choice without requiring the thought to disappear or be disproved.",
    "when": "Use for repetitive, judgmental, catastrophic, or “I cannot” thoughts.",
    "steps": [
      "Write the thought exactly.",
      "Notice what happens when you treat it as literal truth.",
      "Add the phrase “I am having the thought that…”",
      "Try another defusion method: label the story, thank the mind, or repeat the words slowly.",
      "Notice changes in believability and behavioral freedom.",
      "Choose a value-aligned action with the thought present."
    ],
    "tips": [
      "Defusion is not sarcasm or suppression.",
      "Use a gentle tone.",
      "The key measure is behavioral flexibility, not thought removal."
    ],
    "fields": [
      {
        "name": "thought",
        "label": "Sticky thought",
        "type": "textarea",
        "required": true
      },
      {
        "name": "impact",
        "label": "What does believing it make you do?",
        "type": "textarea"
      },
      {
        "name": "defusedWording",
        "label": "“I am having the thought that…”",
        "type": "textarea"
      },
      {
        "name": "method",
        "label": "Defusion method",
        "type": "select",
        "options": [
          "Name the story",
          "Thank the mind",
          "Slow repetition",
          "Imagine words on a screen",
          "Give the mind a radio voice"
        ]
      },
      {
        "name": "believabilityBefore",
        "label": "Believability before",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "believabilityAfter",
        "label": "Believability after",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "valueAction",
        "label": "Action you can take with the thought present",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "act-acceptance",
    "modality": "ACT",
    "title": "Acceptance and Expansion",
    "subtitle": "Make room for a difficult feeling without surrendering to it.",
    "minutes": 10,
    "difficulty": "medium",
    "targets": [
      "dysregulation",
      "anxiety",
      "avoidance"
    ],
    "summary": "Acceptance in ACT means willingly allowing internal experiences that are already present when doing so serves meaningful action. It is not approval, passivity, or accepting harmful external conditions.",
    "why": "Struggling to eliminate an emotion can add tension, monitoring, and avoidance. Making room for sensations may reduce the secondary struggle and free attention for useful action.",
    "when": "Use with manageable discomfort. Ground first or seek support if focusing inward is destabilizing.",
    "steps": [
      "Name the feeling and locate it in the body.",
      "Observe shape, movement, temperature, and intensity.",
      "Soften around the sensation with a steady breath.",
      "Use validating language: “This is here right now.”",
      "Notice the wider space around the sensation.",
      "Choose a caring, value-aligned next action."
    ],
    "tips": [
      "Start for 30–60 seconds.",
      "Keep eyes open and orient outward if needed.",
      "Acceptance of feelings does not mean acceptance of abuse or danger."
    ],
    "fields": [
      {
        "name": "feeling",
        "label": "Feeling or urge",
        "type": "text",
        "required": true
      },
      {
        "name": "location",
        "label": "Where is it felt in the body?",
        "type": "textarea"
      },
      {
        "name": "qualities",
        "label": "Shape, movement, temperature, pressure",
        "type": "textarea"
      },
      {
        "name": "struggle",
        "label": "What happens when you fight it?",
        "type": "textarea"
      },
      {
        "name": "willingPhrase",
        "label": "A willing, validating phrase",
        "type": "textarea"
      },
      {
        "name": "intensityBefore",
        "label": "Intensity before",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "intensityAfter",
        "label": "Intensity after",
        "type": "scale",
        "min": 0,
        "max": 100
      },
      {
        "name": "nextAction",
        "label": "Caring next action",
        "type": "textarea"
      }
    ],
    "caution": "If body-focused attention increases flashbacks, dissociation, panic, or loss of control, stop and use external grounding or professional support."
  },
  {
    "id": "act-observing-self",
    "modality": "ACT",
    "title": "Observing Self Perspective",
    "subtitle": "Notice the stable perspective that observes changing experiences.",
    "minutes": 10,
    "difficulty": "medium",
    "targets": [
      "rumination",
      "selfCriticism",
      "mindfulness"
    ],
    "summary": "This exercise differentiates the content of experience—thoughts, feelings, roles, memories—from the perspective that notices them.",
    "why": "A broader sense of self can reduce over-identification with a temporary story such as “I am a failure.” It creates continuity while experiences change.",
    "when": "Use when identity feels fused with a diagnosis, mistake, role, or emotional state.",
    "steps": [
      "Notice one sound, sensation, feeling, and thought.",
      "Use the phrase “I notice…” for each.",
      "Recall that these experiences change over time.",
      "Describe roles and stories you carry.",
      "Write what becomes possible when no single story defines all of you.",
      "Choose an action from this wider perspective."
    ],
    "tips": [
      "This is perspective-taking, not detachment from life.",
      "Stay grounded in the room.",
      "Use plain language rather than forcing a mystical experience."
    ],
    "fields": [
      {
        "name": "sound",
        "label": "A sound you notice",
        "type": "text"
      },
      {
        "name": "sensation",
        "label": "A body sensation you notice",
        "type": "text"
      },
      {
        "name": "feeling",
        "label": "A feeling you notice",
        "type": "text"
      },
      {
        "name": "thought",
        "label": "A thought you notice",
        "type": "textarea"
      },
      {
        "name": "rolesStories",
        "label": "Roles or self-stories currently strong",
        "type": "textarea"
      },
      {
        "name": "widerView",
        "label": "A wider description of yourself",
        "type": "textarea"
      },
      {
        "name": "possibleAction",
        "label": "Action possible from the wider view",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "act-committed-action",
    "modality": "ACT",
    "title": "Committed Action Plan",
    "subtitle": "Build a flexible plan around a chosen value.",
    "minutes": 12,
    "difficulty": "medium",
    "targets": [
      "values",
      "functioning",
      "avoidance"
    ],
    "summary": "Committed action combines a meaningful direction with specific behavior, anticipated internal barriers, support, and flexible recommitment after setbacks.",
    "why": "Values without action can remain abstract; rigid goals can collapse after difficulty. A flexible plan treats setbacks as information and makes recommitment part of success.",
    "when": "Use after values clarification or whenever you want to translate meaning into behavior.",
    "steps": [
      "Name the value and why it matters.",
      "Choose a measurable action.",
      "Set frequency, time, and context.",
      "Predict thoughts, feelings, and urges that may appear.",
      "Choose acceptance or defusion responses.",
      "Identify support and a restart plan."
    ],
    "tips": [
      "Measure behavior, not mood.",
      "Build in flexibility without making the plan vague.",
      "A restart is part of the plan, not evidence of failure."
    ],
    "fields": [
      {
        "name": "value",
        "label": "Chosen value",
        "type": "text",
        "required": true
      },
      {
        "name": "action",
        "label": "Committed action",
        "type": "textarea"
      },
      {
        "name": "schedule",
        "label": "When and how often?",
        "type": "text"
      },
      {
        "name": "internalBarriers",
        "label": "Likely thoughts, feelings, and urges",
        "type": "textarea"
      },
      {
        "name": "skills",
        "label": "How will you make room or defuse?",
        "type": "textarea"
      },
      {
        "name": "externalBarriers",
        "label": "Practical barriers and solutions",
        "type": "textarea"
      },
      {
        "name": "support",
        "label": "Support or accountability",
        "type": "textarea"
      },
      {
        "name": "restart",
        "label": "How will you restart after a lapse?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "act-matrix",
    "modality": "ACT",
    "title": "ACT Matrix",
    "subtitle": "Map inner experience, avoidance, values, and committed action.",
    "minutes": 15,
    "difficulty": "advanced",
    "targets": [
      "values",
      "avoidance",
      "rumination"
    ],
    "summary": "The ACT Matrix uses four quadrants: difficult inner experiences, actions used to move away from them, who or what matters, and actions that move toward what matters.",
    "why": "The map highlights how understandable avoidance can gradually narrow life. It also shows that toward moves can occur while difficult experiences remain present.",
    "when": "Use for a recurring pattern with several triggers and consequences.",
    "steps": [
      "Name difficult thoughts, feelings, memories, and sensations.",
      "List behaviors used to escape or control them.",
      "Name people, qualities, and life directions that matter.",
      "List observable toward behaviors.",
      "Mark one choice point likely to occur soon.",
      "Choose a skill and toward move for that moment."
    ],
    "tips": [
      "Avoid labeling all comfort as avoidance.",
      "Evaluate function in context.",
      "Keep toward moves small and concrete."
    ],
    "fields": [
      {
        "name": "inner",
        "label": "Difficult inner experiences",
        "type": "textarea"
      },
      {
        "name": "away",
        "label": "Away behaviors",
        "type": "textarea"
      },
      {
        "name": "matters",
        "label": "Who and what matters",
        "type": "textarea",
        "required": true
      },
      {
        "name": "toward",
        "label": "Toward behaviors",
        "type": "textarea"
      },
      {
        "name": "choicePoint",
        "label": "Upcoming choice point",
        "type": "textarea"
      },
      {
        "name": "skill",
        "label": "Skill to carry into it",
        "type": "textarea"
      },
      {
        "name": "move",
        "label": "Chosen toward move",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mct-worry-postponement",
    "modality": "MCT",
    "title": "Worry Postponement",
    "subtitle": "Delay engagement with worry to a planned period.",
    "minutes": 10,
    "difficulty": "easy",
    "targets": [
      "rumination",
      "anxiety",
      "attention"
    ],
    "summary": "Worry postponement means briefly noting a worry, declining to analyze it now, and returning to it during a scheduled worry period if it still seems relevant.",
    "why": "The exercise tests beliefs that worry is uncontrollable or must be handled immediately. It also protects the rest of the day from repeated analysis.",
    "when": "Use for repetitive hypothetical worry. Do not postpone urgent practical safety actions.",
    "steps": [
      "Choose a daily 15–20 minute worry period, not near bedtime.",
      "When worry appears, label it and record a short keyword.",
      "Remind yourself it can be considered later.",
      "Redirect attention to the current task or senses.",
      "During the worry period, review the list deliberately.",
      "Decide whether each item needs action, acceptance, or release."
    ],
    "tips": [
      "Postpone engagement, not awareness.",
      "Use the same time daily for one week.",
      "Urgent real-world problems still need timely action."
    ],
    "fields": [
      {
        "name": "worryTime",
        "label": "Scheduled worry period",
        "type": "time",
        "required": true
      },
      {
        "name": "trigger",
        "label": "Current trigger",
        "type": "textarea"
      },
      {
        "name": "worryKeyword",
        "label": "Short worry note",
        "type": "text"
      },
      {
        "name": "postponePhrase",
        "label": "Phrase used to postpone",
        "type": "text",
        "placeholder": "I can consider this at my planned time."
      },
      {
        "name": "redirect",
        "label": "What will you redirect attention to?",
        "type": "text"
      },
      {
        "name": "reviewOutcome",
        "label": "At worry time: action, acceptance, or release?",
        "type": "textarea"
      },
      {
        "name": "learning",
        "label": "What did you learn about controllability?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mct-attention-training",
    "modality": "MCT",
    "title": "Attention Training Practice",
    "subtitle": "Practice flexible control of external attention.",
    "minutes": 12,
    "difficulty": "medium",
    "targets": [
      "attention",
      "rumination",
      "anxiety"
    ],
    "summary": "Attention training deliberately shifts, divides, and broadens attention across neutral external sounds or visual details. It is not relaxation training and does not require unwanted thoughts to disappear.",
    "why": "MCT targets rigid self-focused attention and repetitive thinking. Practicing voluntary switching can increase confidence that attention is steerable even when intrusive thoughts are present.",
    "when": "Use in a safe environment where divided attention will not create risk. Never practice while driving or operating equipment.",
    "steps": [
      "Select three or more neutral sounds or visual objects.",
      "Focus narrowly on one for 30–60 seconds.",
      "Switch deliberately among targets.",
      "Practice rapid switching.",
      "Broaden attention to include several targets at once.",
      "Record how controllable attention felt."
    ],
    "tips": [
      "Let thoughts remain in the background.",
      "Accuracy matters less than deliberate switching.",
      "Practice regularly when calm, not only during crisis."
    ],
    "fields": [
      {
        "name": "targets",
        "label": "Attention targets",
        "type": "textarea",
        "placeholder": "Clock, fan, distant traffic, birds…"
      },
      {
        "name": "narrowPractice",
        "label": "What did you notice during narrow focus?",
        "type": "textarea"
      },
      {
        "name": "switching",
        "label": "How did switching go?",
        "type": "textarea"
      },
      {
        "name": "divided",
        "label": "What was present during divided attention?",
        "type": "textarea"
      },
      {
        "name": "controlBefore",
        "label": "Perceived control before",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "controlAfter",
        "label": "Perceived control after",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "learning",
        "label": "Learning about attention",
        "type": "textarea"
      }
    ],
    "caution": "Practice only in a safe stationary setting."
  },
  {
    "id": "mct-detached-mindfulness",
    "modality": "MCT",
    "title": "Detached Mindfulness",
    "subtitle": "Notice a trigger thought without engaging or suppressing.",
    "minutes": 10,
    "difficulty": "medium",
    "targets": [
      "rumination",
      "anxiety",
      "attention"
    ],
    "summary": "Detached mindfulness is a metacognitive stance of awareness without analysis, suppression, reassurance, or prolonged response. You allow the thought to exist and continue with the present task.",
    "why": "The practice tests beliefs that thoughts require immediate processing or that thinking longer will guarantee safety. It differs from evaluating whether the thought is true.",
    "when": "Use with repetitive worry, rumination, or intrusive thoughts that do not require urgent action.",
    "steps": [
      "Identify the trigger thought.",
      "Notice the urge to analyze, monitor, neutralize, or seek reassurance.",
      "Label it simply as a mental event.",
      "Allow it to remain without pushing it away.",
      "Place attention on the external task while the thought is present.",
      "Record what happened when you did not engage."
    ],
    "tips": [
      "Detached does not mean numb.",
      "Do not debate the thought.",
      "Real problems can be scheduled for practical problem-solving."
    ],
    "fields": [
      {
        "name": "triggerThought",
        "label": "Trigger thought",
        "type": "textarea",
        "required": true
      },
      {
        "name": "responseUrge",
        "label": "Urge to respond mentally or behaviorally",
        "type": "textarea"
      },
      {
        "name": "label",
        "label": "Neutral label",
        "type": "text",
        "placeholder": "A worry thought / a memory / mental noise"
      },
      {
        "name": "externalFocus",
        "label": "External task or focus",
        "type": "text"
      },
      {
        "name": "engagementBefore",
        "label": "Urge to engage before",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "engagementAfter",
        "label": "Urge to engage after",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "learning",
        "label": "What happened without engagement?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mct-beliefs",
    "modality": "MCT",
    "title": "Metacognitive Beliefs Review",
    "subtitle": "Examine beliefs about worry, rumination, and thought control.",
    "minutes": 14,
    "difficulty": "advanced",
    "targets": [
      "rumination",
      "anxiety",
      "selfCriticism"
    ],
    "summary": "This exercise identifies positive beliefs (“worry keeps me prepared”) and negative beliefs (“my worry is uncontrollable and dangerous”), then designs observations that can test them.",
    "why": "MCT proposes that beliefs about thinking help maintain repetitive thinking. Changing the content of one worry may be less important than changing the rules that keep the process running.",
    "when": "Use when you repeatedly worry about worrying, analyze why you feel bad, or monitor thoughts for danger.",
    "steps": [
      "Name the repetitive thinking process.",
      "List what you believe it does for you.",
      "List what you fear about its controllability or consequences.",
      "Review evidence from actual experience.",
      "Create a safe test, such as postponing engagement.",
      "Write a more flexible metacognitive belief."
    ],
    "tips": [
      "Focus on beliefs about thinking, not the original topic.",
      "Use behavioral observations.",
      "Avoid trying to prove perfect control."
    ],
    "fields": [
      {
        "name": "process",
        "label": "Thinking process",
        "type": "select",
        "options": [
          "Worry",
          "Rumination",
          "Threat monitoring",
          "Reassurance seeking",
          "Thought suppression"
        ]
      },
      {
        "name": "positiveBeliefs",
        "label": "Believed benefits",
        "type": "textarea"
      },
      {
        "name": "negativeBeliefs",
        "label": "Believed dangers or uncontrollability",
        "type": "textarea"
      },
      {
        "name": "evidence",
        "label": "Evidence from experience",
        "type": "textarea"
      },
      {
        "name": "test",
        "label": "Safe test of the belief",
        "type": "textarea"
      },
      {
        "name": "newBelief",
        "label": "More flexible belief about thinking",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mct-rumination-audit",
    "modality": "MCT",
    "title": "Rumination Process Audit",
    "subtitle": "Track what starts and maintains repetitive analysis.",
    "minutes": 12,
    "difficulty": "medium",
    "targets": [
      "rumination",
      "lowMood",
      "attention"
    ],
    "summary": "The audit focuses on the process of rumination: triggers, duration, questions asked, attempted purpose, consequences, and stopping conditions.",
    "why": "Rumination can feel like problem-solving while producing little new action. Seeing process costs and triggers supports earlier disengagement.",
    "when": "Use after a period of “why” analysis, replaying, or self-focused review.",
    "steps": [
      "Identify the trigger.",
      "Record the main repetitive questions.",
      "Estimate duration and how attention was used.",
      "Name the promised benefit.",
      "Record actual emotional and practical consequences.",
      "Choose a cue and alternative response for next time."
    ],
    "tips": [
      "Do not use the worksheet to ruminate more.",
      "Keep content summaries brief.",
      "Focus on duration and function."
    ],
    "fields": [
      {
        "name": "trigger",
        "label": "Trigger",
        "type": "textarea"
      },
      {
        "name": "questions",
        "label": "Repeated questions or themes",
        "type": "textarea"
      },
      {
        "name": "duration",
        "label": "Estimated duration in minutes",
        "type": "number"
      },
      {
        "name": "promisedBenefit",
        "label": "What did rumination promise to achieve?",
        "type": "textarea"
      },
      {
        "name": "actualEffect",
        "label": "Actual emotional and practical effect",
        "type": "textarea"
      },
      {
        "name": "stopCue",
        "label": "Cue to disengage next time",
        "type": "text"
      },
      {
        "name": "alternative",
        "label": "Alternative response",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mct-flexible-attention",
    "modality": "MCT",
    "title": "Flexible Attention Plan",
    "subtitle": "Plan where attention goes during a recurring trigger.",
    "minutes": 10,
    "difficulty": "easy",
    "targets": [
      "attention",
      "anxiety",
      "functioning"
    ],
    "summary": "This plan identifies a trigger that pulls attention inward, defines a useful external focus, and creates brief switching practice before and during the situation.",
    "why": "Attention can become narrowly locked on symptoms, threat, mistakes, or others’ reactions. A planned focus supports task engagement without requiring internal calm.",
    "when": "Use before meetings, social situations, study, performance, or periods of health monitoring.",
    "steps": [
      "Describe the trigger and current attention pattern.",
      "Choose task-relevant external targets.",
      "Plan a short attention warm-up.",
      "Define a cue to switch back when attention narrows.",
      "Rate task engagement afterward."
    ],
    "tips": [
      "Choose neutral or task-relevant targets.",
      "Redirect gently, repeatedly.",
      "Do not ignore genuine safety information."
    ],
    "fields": [
      {
        "name": "trigger",
        "label": "Recurring trigger",
        "type": "textarea",
        "required": true
      },
      {
        "name": "currentPattern",
        "label": "Where attention usually locks",
        "type": "textarea"
      },
      {
        "name": "externalTargets",
        "label": "Useful external targets",
        "type": "textarea"
      },
      {
        "name": "warmup",
        "label": "Two-minute warm-up plan",
        "type": "textarea"
      },
      {
        "name": "switchCue",
        "label": "Cue to redirect",
        "type": "text"
      },
      {
        "name": "engagementAfter",
        "label": "Task engagement afterward",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "learning",
        "label": "What helped?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mct-relapse-plan",
    "modality": "MCT",
    "title": "Repetitive Thinking Relapse Plan",
    "subtitle": "Recognize early warning signs and restore flexible responding.",
    "minutes": 15,
    "difficulty": "medium",
    "targets": [
      "rumination",
      "attention",
      "functioning"
    ],
    "summary": "This plan summarizes triggers, early signs of the cognitive attentional syndrome, unhelpful responses, effective skills, and support thresholds.",
    "why": "Progress is easier to protect when warning signs are recognized before hours of worry, rumination, monitoring, or reassurance seeking accumulate.",
    "when": "Use after learning several MCT skills or during a relatively stable period.",
    "steps": [
      "List common triggers.",
      "Identify early cognitive, emotional, body, and behavioral signs.",
      "Name the responses that prolong the cycle.",
      "Select first-line skills.",
      "Define when to seek social or professional support.",
      "Create a brief reminder statement."
    ],
    "tips": [
      "Plan for slips without catastrophizing them.",
      "Use observable warning signs.",
      "Include sleep and routine vulnerabilities."
    ],
    "fields": [
      {
        "name": "triggers",
        "label": "Common triggers",
        "type": "textarea"
      },
      {
        "name": "earlySigns",
        "label": "Early warning signs",
        "type": "textarea"
      },
      {
        "name": "maintainers",
        "label": "Responses that prolong the cycle",
        "type": "textarea"
      },
      {
        "name": "firstLine",
        "label": "First-line skills",
        "type": "multi-select",
        "options": [
          "Worry postponement",
          "Detached mindfulness",
          "Attention training",
          "Reduce reassurance",
          "Practical problem-solving",
          "Return to routine"
        ]
      },
      {
        "name": "supportThreshold",
        "label": "When will you seek support?",
        "type": "textarea"
      },
      {
        "name": "reminder",
        "label": "Brief reminder statement",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mbct-breathing-space",
    "modality": "MBCT",
    "title": "Three-Minute Breathing Space",
    "subtitle": "Move from automatic pilot to awareness and choice.",
    "minutes": 5,
    "difficulty": "easy",
    "targets": [
      "mindfulness",
      "stress",
      "rumination"
    ],
    "summary": "The breathing space has three movements: acknowledge current experience, gather attention around breathing, and expand awareness to the whole body and surroundings.",
    "why": "The practice interrupts automatic pilot without demanding immediate change. It creates a wider field in which thoughts and feelings can be noticed as passing events.",
    "when": "Use during transitions, stress, low mood, or before deciding what to do next.",
    "steps": [
      "Acknowledge thoughts, feelings, and body sensations as they are.",
      "Gather attention around the sensations of breathing.",
      "Expand awareness to the whole body, posture, and surrounding sounds.",
      "Ask what caring response is needed now."
    ],
    "tips": [
      "Three minutes is a structure, not a test.",
      "Eyes may remain open.",
      "Return gently whenever attention wanders."
    ],
    "fields": [
      {
        "name": "before",
        "label": "What is present before practice?",
        "type": "textarea"
      },
      {
        "name": "breathAnchor",
        "label": "Where did you feel the breath most clearly?",
        "type": "text"
      },
      {
        "name": "wholeBody",
        "label": "What did you notice in the whole body?",
        "type": "textarea"
      },
      {
        "name": "after",
        "label": "What is present afterward?",
        "type": "textarea"
      },
      {
        "name": "caringResponse",
        "label": "What caring response is needed?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mbct-body-scan",
    "modality": "MBCT",
    "title": "Body Scan",
    "subtitle": "Move attention through the body with curiosity.",
    "minutes": 18,
    "difficulty": "medium",
    "targets": [
      "mindfulness",
      "stress",
      "sleep"
    ],
    "summary": "A body scan guides attention through regions of the body, noticing sensations, absence of sensation, comfort, discomfort, and mind wandering without forcing relaxation.",
    "why": "Practice strengthens sustained attention and a less judgmental relationship with body experience. Relaxation may occur but is not the required outcome.",
    "when": "Use when you have enough time and a safe setting. Adapt or stop if body attention is distressing.",
    "steps": [
      "Choose a supported posture.",
      "Begin with contact points and breathing.",
      "Move attention gradually through feet, legs, torso, hands, arms, neck, and head.",
      "Notice sensations without needing to change them.",
      "Include the whole body and surrounding space.",
      "Record observations and needed adaptations."
    ],
    "tips": [
      "Shorten the practice when needed.",
      "Move or open your eyes if discomfort becomes overwhelming.",
      "“No sensation” is also an observation."
    ],
    "fields": [
      {
        "name": "posture",
        "label": "Posture and setting",
        "type": "text"
      },
      {
        "name": "regions",
        "label": "Notable sensations by region",
        "type": "textarea"
      },
      {
        "name": "mindWandering",
        "label": "Where did the mind go?",
        "type": "textarea"
      },
      {
        "name": "response",
        "label": "How did you respond to wandering or discomfort?",
        "type": "textarea"
      },
      {
        "name": "wholeBody",
        "label": "Whole-body experience",
        "type": "textarea"
      },
      {
        "name": "adaptation",
        "label": "Adaptation for next time",
        "type": "textarea"
      }
    ],
    "caution": "Body-focused practice can be unsuitable during some trauma reactions, dissociation, pain flares, or medical symptoms. Stop and seek appropriate support when needed."
  },
  {
    "id": "mbct-routine-activity",
    "modality": "MBCT",
    "title": "Mindful Routine Activity",
    "subtitle": "Practice full attention during an ordinary task.",
    "minutes": 8,
    "difficulty": "easy",
    "targets": [
      "mindfulness",
      "attention",
      "stress"
    ],
    "summary": "You choose one routine activity—washing, walking, drinking tea, showering—and attend to direct sensory experience and movements.",
    "why": "Automatic pilot is normal but can dominate the day. Practicing with ordinary activities makes mindfulness portable and less dependent on formal meditation.",
    "when": "Use daily with a safe activity that does not require divided attention for hazards.",
    "steps": [
      "Choose one routine task.",
      "Set an intention to notice beginning, middle, and end.",
      "Attend to sight, sound, touch, smell, taste, and movement.",
      "Notice judgments or planning and return to sensation.",
      "Record one detail usually missed."
    ],
    "tips": [
      "Do not use while driving.",
      "One minute of full attention is useful.",
      "Curiosity matters more than calm."
    ],
    "fields": [
      {
        "name": "activity",
        "label": "Chosen routine activity",
        "type": "text",
        "required": true
      },
      {
        "name": "sensoryDetails",
        "label": "Sensory details noticed",
        "type": "textarea"
      },
      {
        "name": "automaticThoughts",
        "label": "Thoughts or judgments that appeared",
        "type": "textarea"
      },
      {
        "name": "returns",
        "label": "How did you return attention?",
        "type": "textarea"
      },
      {
        "name": "newDetail",
        "label": "One usually missed detail",
        "type": "textarea"
      },
      {
        "name": "effect",
        "label": "Effect on the rest of the activity",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mbct-thoughts-events",
    "modality": "MBCT",
    "title": "Thoughts as Mental Events",
    "subtitle": "Observe thoughts without treating them as commands.",
    "minutes": 10,
    "difficulty": "medium",
    "targets": [
      "rumination",
      "selfCriticism",
      "mindfulness"
    ],
    "summary": "This practice notices thoughts as words, images, memories, or predictions arising and passing in awareness.",
    "why": "MBCT emphasizes decentering: a thought can influence mood without being a complete description of reality. Recognizing form and changeability reduces automatic identification.",
    "when": "Use when mood-linked thoughts feel convincing or repetitive.",
    "steps": [
      "Sit or stand in a grounded posture.",
      "Notice the next thought and identify its form.",
      "Label it gently: planning, judging, remembering, predicting.",
      "Observe how it changes or is replaced.",
      "Return to breath, sound, or body contact.",
      "Record what you learned about thoughts."
    ],
    "tips": [
      "Avoid forcing an empty mind.",
      "Labels should be light, not analytical.",
      "Return to external grounding if inward focus is difficult."
    ],
    "fields": [
      {
        "name": "thoughts",
        "label": "Thoughts noticed",
        "type": "textarea"
      },
      {
        "name": "forms",
        "label": "Forms: words, images, memories, predictions",
        "type": "textarea"
      },
      {
        "name": "labels",
        "label": "Labels used",
        "type": "textarea"
      },
      {
        "name": "change",
        "label": "How did thoughts change or pass?",
        "type": "textarea"
      },
      {
        "name": "anchor",
        "label": "Anchor used",
        "type": "text"
      },
      {
        "name": "learning",
        "label": "What did you learn?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mbct-pleasant-events",
    "modality": "MBCT",
    "title": "Pleasant Events Calendar",
    "subtitle": "Notice small nourishing moments in detail.",
    "minutes": 8,
    "difficulty": "easy",
    "targets": [
      "lowMood",
      "mindfulness",
      "energy"
    ],
    "summary": "This calendar records one pleasant or nourishing moment and explores body sensations, emotions, thoughts, and attention during it.",
    "why": "Low mood and stress bias attention toward threat and absence. Deliberately noticing small positive experiences improves contact with what is already present without denying difficulty.",
    "when": "Use daily for ordinary moments such as warmth, music, food, sunlight, completion, or connection.",
    "steps": [
      "Choose one pleasant event, however small.",
      "Describe what happened.",
      "Record body sensations during the event.",
      "Name emotions and thoughts.",
      "Notice whether you were fully present or on automatic pilot.",
      "Identify how to make space for similar moments."
    ],
    "tips": [
      "Do not pressure yourself to feel grateful.",
      "Pleasant can mean mildly okay.",
      "Specific sensory detail strengthens recall."
    ],
    "fields": [
      {
        "name": "event",
        "label": "Pleasant or nourishing event",
        "type": "textarea",
        "required": true
      },
      {
        "name": "body",
        "label": "Body sensations",
        "type": "textarea"
      },
      {
        "name": "emotions",
        "label": "Emotions",
        "type": "textarea"
      },
      {
        "name": "thoughts",
        "label": "Thoughts",
        "type": "textarea"
      },
      {
        "name": "presence",
        "label": "How present were you?",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "supportRepeat",
        "label": "How could you support a similar moment?",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mbct-difficult-inquiry",
    "modality": "MBCT",
    "title": "Difficult Experience Inquiry",
    "subtitle": "Approach a manageable difficulty with mindful curiosity.",
    "minutes": 14,
    "difficulty": "advanced",
    "targets": [
      "mindfulness",
      "dysregulation",
      "selfCriticism"
    ],
    "summary": "This inquiry gently brings to mind a manageable difficulty, observes its body and thought components, and practices allowing, kindness, and choice.",
    "why": "Approaching manageable discomfort can reveal automatic reactions and create a less adversarial relationship with experience. It should remain within a tolerable range.",
    "when": "Use only with mild-to-moderate material and after grounding skills. Do not use alone for trauma memories or acute crisis.",
    "steps": [
      "Choose a difficulty rated no higher than manageable.",
      "Orient to the present environment and body support.",
      "Notice associated sensations, emotions, and thoughts.",
      "Allow experience in small doses while maintaining contact with the room.",
      "Offer a compassionate phrase or supportive touch if appropriate.",
      "Choose whether to continue, shift attention, or take action."
    ],
    "tips": [
      "You control the dose.",
      "Alternate internal and external attention.",
      "Stopping is a skillful choice."
    ],
    "fields": [
      {
        "name": "difficulty",
        "label": "Manageable difficulty",
        "type": "textarea"
      },
      {
        "name": "intensityBefore",
        "label": "Intensity before",
        "type": "scale",
        "min": 0,
        "max": 10
      },
      {
        "name": "body",
        "label": "Body sensations",
        "type": "textarea"
      },
      {
        "name": "thoughtsEmotions",
        "label": "Thoughts and emotions",
        "type": "textarea"
      },
      {
        "name": "compassion",
        "label": "Compassionate phrase or gesture",
        "type": "textarea"
      },
      {
        "name": "choice",
        "label": "Continue, shift, or act?",
        "type": "textarea"
      },
      {
        "name": "intensityAfter",
        "label": "Intensity after",
        "type": "scale",
        "min": 0,
        "max": 10
      }
    ],
    "caution": "Do not use this self-guided inquiry for trauma processing, active self-harm risk, psychosis, severe dissociation, or overwhelming panic."
  },
  {
    "id": "mbct-nourishing-depleting",
    "modality": "MBCT",
    "title": "Nourishing and Depleting Activities",
    "subtitle": "Rebalance the week using mindful observation.",
    "minutes": 12,
    "difficulty": "easy",
    "targets": [
      "lowMood",
      "energy",
      "functioning"
    ],
    "summary": "This exercise lists regular activities, marks whether each tends to nourish, deplete, or do both, and chooses realistic changes.",
    "why": "Mood is influenced by the pattern of activities, demands, rest, mastery, and connection. Awareness helps reduce avoidable depletion and increase replenishment without demanding a perfect schedule.",
    "when": "Use for weekly planning, burnout prevention, or when days feel mechanically overloaded.",
    "steps": [
      "List recurring activities from a typical week.",
      "Mark each as nourishing, depleting, or mixed.",
      "Notice activities that are necessary but need recovery around them.",
      "Identify one nourishing activity to increase.",
      "Identify one depletion to reduce, delegate, or change.",
      "Schedule a small adjustment."
    ],
    "tips": [
      "Nourishing does not always mean easy.",
      "Some valued activities are tiring and meaningful.",
      "Protect recovery after unavoidable demands."
    ],
    "fields": [
      {
        "name": "activities",
        "label": "Weekly activities and labels",
        "type": "textarea",
        "placeholder": "Commute — depleting; exercise — mixed/nourishing…"
      },
      {
        "name": "necessaryDepletion",
        "label": "Necessary depleting activities",
        "type": "textarea"
      },
      {
        "name": "increase",
        "label": "Nourishing activity to increase",
        "type": "textarea"
      },
      {
        "name": "reduce",
        "label": "Depletion to reduce or change",
        "type": "textarea"
      },
      {
        "name": "recovery",
        "label": "Recovery support",
        "type": "textarea"
      },
      {
        "name": "scheduleChange",
        "label": "Specific schedule adjustment",
        "type": "textarea"
      }
    ],
    "caution": ""
  },
  {
    "id": "mbct-relapse-signature",
    "modality": "MBCT",
    "title": "Mood Relapse Signature",
    "subtitle": "Identify personal warning signs and an early response plan.",
    "minutes": 15,
    "difficulty": "medium",
    "targets": [
      "lowMood",
      "mindfulness",
      "functioning"
    ],
    "summary": "A relapse signature is a personalized pattern of early changes in thoughts, emotions, sleep, body, behavior, routines, and relationships that may signal worsening mood.",
    "why": "Warning signs are easier to act on when written during a steadier period. Early response can restore routines and support before the pattern becomes severe.",
    "when": "Use after previous episodes of low mood or during maintenance work. It does not replace professional relapse planning.",
    "steps": [
      "Review how previous downturns began.",
      "List early signs across several domains.",
      "Identify triggers and vulnerabilities.",
      "Name helpful responses and unhelpful automatic reactions.",
      "Define support thresholds and contacts.",
      "Create a concise early action plan."
    ],
    "tips": [
      "Use signs other people might notice too.",
      "Distinguish one bad day from a sustained pattern.",
      "Include medication or clinical plans only as directed by professionals."
    ],
    "fields": [
      {
        "name": "thoughtSigns",
        "label": "Thought warning signs",
        "type": "textarea"
      },
      {
        "name": "emotionSigns",
        "label": "Emotion warning signs",
        "type": "textarea"
      },
      {
        "name": "bodySleep",
        "label": "Body, energy, and sleep signs",
        "type": "textarea"
      },
      {
        "name": "behaviorSigns",
        "label": "Behavior and routine signs",
        "type": "textarea"
      },
      {
        "name": "relationshipSigns",
        "label": "Relationship signs",
        "type": "textarea"
      },
      {
        "name": "helpfulResponses",
        "label": "Helpful early responses",
        "type": "textarea"
      },
      {
        "name": "supportThreshold",
        "label": "When and how to seek support",
        "type": "textarea"
      }
    ],
    "caution": ""
  }
];
