import { ExamQuestion } from '../types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // =========================================================================
  // 1. CABIN CREW TRAINING SCHOOL
  // Program: CABIN CREW TRAINEE (AIRLINE-SPONSORED)
  // Curriculum: 100% English • Situational Judgment (SJT) • Aviation Vocabulary • Grammar & Logs • Reading Comprehension
  // =========================================================================

  // --- PART 1: SITUATIONAL JUDGMENT TESTS (SJT) ---
  {
    id: 'cc-sjt-1',
    category: 'Situational Judgment (SJT)',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'During taxi for takeoff, a passenger insists on keeping their laptop open on the tray table to finish urgent work. What is the most appropriate action for the cabin crew member?',
    options: [
      'Politely inform the passenger of mandatory aviation safety regulations regarding unrestrained items during critical flight phases and assist them in stowing it securely before takeoff.',
      'Allow the passenger to continue working until the aircraft enters the active runway to maintain customer satisfaction.',
      'Immediately contact the flight deck via emergency interphone to abort the takeoff without speaking to the passenger.',
      'Take the laptop away from the passenger and place it in the rear galley without explanation.'
    ],
    correctIndex: 0,
    explanation: 'Aviation regulations strictly require all large electronic devices to be secured during taxi, takeoff, and landing. Professional crew communicate the safety mandate calmly while offering assistance.'
  },
  {
    id: 'cc-sjt-2',
    category: 'Situational Judgment (SJT)',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'A passenger in economy class becomes visibly agitated and raises their voice because their preferred meal choice is no longer available. How should you resolve this situation?',
    options: [
      'Listen actively, apologize sincerely for the inconvenience, explain that options are limited on full flights, and offer an alternative meal, extra snacks, or a complimentary beverage.',
      'Tell the passenger that they should have pre-ordered their meal online if they wanted a specific dish.',
      'Ignore the complaint and move the service cart quickly to the next row to prevent flight delays.',
      'Call the captain to issue a formal warning to the passenger for complaining about food.'
    ],
    correctIndex: 0,
    explanation: 'De-escalation in cabin customer service involves acknowledging passenger feelings with empathy, apologizing for the limitation, and proactively providing agreeable alternatives.'
  },
  {
    id: 'cc-sjt-3',
    category: 'Situational Judgment (SJT)',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Mid-flight, the captain illuminates the Fasten Seatbelt sign and announces incoming moderate turbulence. While securing the cabin, you observe a passenger walking towards the lavatory. What should you do?',
    options: [
      'Firmly and courteously advise the passenger to return to their seat immediately and fasten their seatbelt due to unexpected turbulence risks.',
      'Let the passenger enter the lavatory since they have already stood up from their seat.',
      'Physically block the passenger without speaking and push them back into their seat.',
      'Return to your jumpseat immediately without addressing the walking passenger.'
    ],
    correctIndex: 0,
    explanation: 'Turbulence poses significant injury risks. Crew must deliver clear, assertive, yet polite verbal instructions directing passengers to return to their seats and fasten seatbelts immediately.'
  },
  {
    id: 'cc-sjt-4',
    category: 'Situational Judgment (SJT)',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'An elderly passenger sitting in 22C complains of dizziness and feeling faint during cruise altitude. What is your immediate and correct sequence of actions?',
    options: [
      'Reassure the passenger, recline their seat slightly, administer comfort care, alert the senior cabin crew member (Purser), and notify the flight deck while assessing vital responsiveness.',
      'Instruct the passenger to stand up and walk down the aisle to increase circulation.',
      'Immediately make a general public announcement declaring a critical emergency and asking if anyone is a surgeon.',
      'Offer the passenger a hot black coffee and ask them to wait until arrival at destination.'
    ],
    correctIndex: 0,
    explanation: 'Standard in-flight medical response requires keeping the passenger calm in a resting posture, monitoring responsiveness, alerting the Purser, and notifying the cockpit for potential medical advice.'
  },
  {
    id: 'cc-sjt-5',
    category: 'Situational Judgment (SJT)',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Two passengers are engaged in a loud dispute over a reclined seat that is reducing legroom. How should the cabin crew member intervene effectively?',
    options: [
      'Approach calmly, separate the dialogue by listening to both parties individually, and negotiate a courteous compromise or reseat one passenger if empty seats are available.',
      'Inform both passengers that seat reclining is an unconditional passenger right and the passenger behind must tolerate it.',
      'Take the side of the passenger who reclined first because they paid for their ticket.',
      'Threaten both passengers with airport police arrest upon landing if they speak another word.'
    ],
    correctIndex: 0,
    explanation: 'Cabin dispute resolution requires impartiality, active listening, de-escalating heightened emotions, and finding constructive compromises such as mutual spacing or reseating.'
  },
  {
    id: 'cc-sjt-6',
    category: 'Situational Judgment (SJT)',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'During pre-departure briefing at the emergency exit row, a seated passenger appears visibly reluctant and states they are unsure if they can operate the heavy exit door in an emergency. What must you do?',
    options: [
      'Thank the passenger for their honesty and discretely reseat them in a non-exit row, finding an able-bodied passenger willing to fulfill exit row duties.',
      'Insist that the passenger remain in the exit row because their boarding pass was already printed with that seat number.',
      'Brief the passenger quickly in 10 seconds and tell them that emergencies rarely happen anyway.',
      'Report the passenger to airport security for non-compliance with airline policies.'
    ],
    correctIndex: 0,
    explanation: 'Aviation safety standards mandate that emergency exit row occupants must be willing and fully capable of operating exit mechanisms without hesitation. Unwilling passengers must be reseated.'
  },
  {
    id: 'cc-sjt-7',
    category: 'Situational Judgment (SJT)',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'A First Class passenger demands an alcoholic drink refill, but you notice they are displaying clear signs of slurred speech and intoxication. What is the correct standard procedure?',
    options: [
      'Politely and tactfully decline further alcohol service, offer water, coffee, or gourmet non-alcoholic beverages, and quietly brief fellow crew members and the Purser.',
      'Serve the requested drink to avoid upsetting a VIP passenger in the premium cabin.',
      'Publicly accuse the passenger of intoxication over the cabin PA system.',
      'Lock the passenger in the First Class lavatory for the remainder of the flight.'
    ],
    correctIndex: 0,
    explanation: 'International airline regulations prohibit serving alcohol to noticeably intoxicated passengers. Crew must tactfully refuse, provide non-alcoholic hospitality, and alert colleagues.'
  },
  {
    id: 'cc-sjt-8',
    category: 'Situational Judgment (SJT)',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'A young solo child (Unaccompanied Minor) becomes tearful and homesick during a long-haul international flight. How should you attend to them?',
    options: [
      'Check in on them regularly, provide a children’s activity kit, explain the flight progress warmly, and ensure they feel safe and cared for throughout the journey.',
      'Tell the child that crying disturbs surrounding passengers and ask them to be quiet.',
      'Ask an adjacent stranger in the next row to supervise and feed the child.',
      'Leave the child alone so that they learn independence during long journeys.'
    ],
    correctIndex: 0,
    explanation: 'Unaccompanied minors under airline care require attentive supervision, empathy, structured entertainment, and reassurance from assigned cabin crew.'
  },

  // --- PART 2: ENGLISH VOCABULARY & SYNONYMS (AVIATION & FORMAL HOSPITALITY) ---
  {
    id: 'cc-voc-1',
    category: 'English Vocabulary & Synonyms',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'What is the exact definition of a passenger "Manifest" in commercial aviation?',
    options: [
      'An official airline document listing all registered passengers, crew members, and cargo on board a flight.',
      'A technical maintenance handbook used for aircraft engine overhaul.',
      'The scheduled in-flight menu offered exclusively in Business Class.',
      'The meteorological forecast delivered by the ground air traffic control tower.'
    ],
    correctIndex: 0,
    explanation: 'In commercial aviation, the "Manifest" is the legally required official roster containing names and details of all passengers, crew, and payload on board.'
  },
  {
    id: 'cc-voc-2',
    category: 'English Vocabulary & Synonyms',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Choose the word that is most nearly SYNONYMOUS with "Disembarkation":',
    options: [
      'Deplaning / Exiting the aircraft',
      'Boarding / Embarkation',
      'Cruising at altitude',
      'In-flight meal service'
    ],
    correctIndex: 0,
    explanation: '"Disembarkation" (or deplaning) refers to passengers and crew exiting and leaving the aircraft after it has arrived at the gate.'
  },
  {
    id: 'cc-voc-3',
    category: 'English Vocabulary & Synonyms',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'In customer service, what is the meaning of the word "Courteous"?',
    options: [
      'Polite, respectful, and considerate in manner and communication.',
      'Authoritative, strict, and uncompromising.',
      'Fast, hurried, and minimal in verbal exchange.',
      'Distant, quiet, and reserved.'
    ],
    correctIndex: 0,
    explanation: '"Courteous" embodies polite, respectful, and gracious behavior, which is the foundational trait of airline cabin crew hospitality.'
  },
  {
    id: 'cc-voc-4',
    category: 'English Vocabulary & Synonyms',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'When an airline supervisor asks crew to "de-escalate" a conflict, what are they instructing them to do?',
    options: [
      'Reduce the tension and intensity of an argument to restore calm.',
      'Call local law enforcement immediately without speaking.',
      'Increase the volume of instructions until the passenger obeys.',
      'Cancel the flight schedule for all passengers on board.'
    ],
    correctIndex: 0,
    explanation: 'To "de-escalate" means to lessen the severity, hostility, or emotional intensity of a dispute through calm communication.'
  },
  {
    id: 'cc-voc-5',
    category: 'English Vocabulary & Synonyms',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Select the best synonym for "Inadvertent" as used in aviation safety reports ("An inadvertent emergency slide deployment"):',
    options: [
      'Accidental / Unintentional',
      'Deliberate / Premeditated',
      'Dangerous / Hostile',
      'Frequent / Routine'
    ],
    correctIndex: 0,
    explanation: '"Inadvertent" means not resulting from deliberate planning; accidental or unintended.'
  },
  {
    id: 'cc-voc-6',
    category: 'English Vocabulary & Synonyms',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'What does the term "Discrepancy" mean when reconciling the boarding passenger headcount with the gate manifest?',
    options: [
      'A difference or inconsistency between two sets of figures or records.',
      'A mutual agreement reached between the captain and first officer.',
      'A mechanical malfunction in the aircraft landing gear.',
      'A rapid change in ambient cabin temperature.'
    ],
    correctIndex: 0,
    explanation: 'A "discrepancy" is an inconsistency or lack of compatibility between records (e.g., 250 boarding passes scanned but only 249 passengers seated).'
  },
  {
    id: 'cc-voc-7',
    category: 'English Vocabulary & Synonyms',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Choose the correct meaning of "Mandatory" in the sentence: "Wearing ID badges in sterile airport areas is mandatory."',
    options: [
      'Obligatory / Required by official rules',
      'Optional / At the employee’s discretion',
      'Recommended / Helpful if convenient',
      'Temporary / Only during night shifts'
    ],
    correctIndex: 0,
    explanation: '"Mandatory" means compulsory or required by law and official regulations.'
  },
  {
    id: 'cc-voc-8',
    category: 'English Vocabulary & Synonyms',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Which word means "having a pleasant, sociable, and hospitable personality suited for customer service"?',
    options: [
      'Congenial',
      'Combative',
      'Callous',
      'Complacent'
    ],
    correctIndex: 0,
    explanation: '"Congenial" describes a person who is friendly, pleasant, and delightful to interact with.'
  },

  // --- PART 3: GRAMMAR & SENTENCE CORRECTION (PUBLIC ANNOUNCEMENTS & CABIN LOGS) ---
  {
    id: 'cc-grm-1',
    category: 'Grammar & Sentence Correction',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Identify the sentence with correct grammatical structure and subject-verb agreement for a cabin announcement:',
    options: [
      'Every passenger and crew member is required to review the safety briefing card located in the seat pocket.',
      'Every passenger and crew member are required to review the safety briefing card located in the seat pocket.',
      'Every passenger and crew member were required to review the safety briefing card located in the seat pocket right now.',
      'Every passenger and crew member have required to review the safety briefing card located in the seat pocket.'
    ],
    correctIndex: 0,
    explanation: 'Subjects preceded by "every" or "each" take a singular verb ("is required", not "are required").'
  },
  {
    id: 'cc-grm-2',
    category: 'Grammar & Sentence Correction',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Choose the correctly written passenger update announcement regarding weather delays:',
    options: [
      'Due to adverse weather conditions at our destination, our arrival will be delayed by approximately twenty minutes.',
      'Owing to adverse weather conditions at our destination, our arrival will be delay by approximately twenty minutes.',
      'Due to adverse weather conditions at our destination, our arrival would be delaying for approximately twenty minutes ago.',
      'Because of adverse weather conditions at our destination, our arrival is having been delayed by approximately twenty minutes.'
    ],
    correctIndex: 0,
    explanation: '"will be delayed by approximately twenty minutes" is the standard future passive construction for formal announcements.'
  },
  {
    id: 'cc-grm-3',
    category: 'Grammar & Sentence Correction',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Select the sentence that correctly uses prepositions in aviation communication:',
    options: [
      'All passengers must remain seated in accordance with international civil aviation standards.',
      'All passengers must remain seated in accordance to international civil aviation standards.',
      'All passengers must remain seated in accordance at international civil aviation standards.',
      'All passengers must remain seated in accordance for international civil aviation standards.'
    ],
    correctIndex: 0,
    explanation: 'The idiomatically correct phrase is always "in accordance with".'
  },
  {
    id: 'cc-grm-4',
    category: 'Grammar & Sentence Correction',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Identify the grammatically flawed sentence in this Purser’s cabin incident report:',
    options: [
      'The passenger was furious because neither the flight attendant nor the supervisor were able to locate the baggage tag.',
      'The passenger was furious because neither the flight attendant nor the supervisor was able to locate the baggage tag.',
      'The passenger requested assistance immediately after arriving at the customer service desk.',
      'The purser documented the occurrence in the official cabin voyage report.'
    ],
    correctIndex: 0,
    explanation: 'In "neither... nor" constructions where both subjects are singular ("flight attendant", "supervisor"), the verb must be singular ("was able", not "were able").'
  },
  {
    id: 'cc-grm-5',
    category: 'Grammar & Sentence Correction',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Choose the sentence that correctly distinguishes between "their", "there", and "they’re":',
    options: [
      'Passengers must ensure that their personal belongings are stowed securely before they’re seated.',
      'Passengers must ensure that there personal belongings are stowed securely before they’re seated.',
      'Passengers must ensure that they’re personal belongings are stowed securely before their seated.',
      'Passengers must ensure that their personal belongings are stowed securely before there seated.'
    ],
    correctIndex: 0,
    explanation: '"Their" indicates possession (their belongings), while "they’re" is the contraction for "they are" (before they are seated).'
  },
  {
    id: 'cc-grm-6',
    category: 'Grammar & Sentence Correction',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Select the sentence free of dangling or misplaced modifiers:',
    options: [
      'While cruising at 36,000 feet, the flight attendants served hot refreshments to all passengers.',
      'Cruising at 36,000 feet, the hot refreshments were served by the flight attendants to all passengers.',
      'While serving hot refreshments, the aircraft was cruised at 36,000 feet by the flight attendants.',
      'To all passengers, cruising at 36,000 feet, hot refreshments were served.'
    ],
    correctIndex: 0,
    explanation: 'In option A, the introductory clause "While cruising at 36,000 feet" correctly modifies the logical subject "the flight attendants". In option B, it implies the refreshments were cruising.'
  },

  // --- PART 4: READING COMPREHENSION (AIRLINE RULES, LOGISTICS & SAFETY GUIDELINES) ---
  {
    id: 'cc-rc-1',
    category: 'Reading Comprehension',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: `[PASSAGE: AIRLINE ELECTRONIC DEVICE & LITHIUM BATTERY POLICY]
"All portable electronic devices containing lithium-metal or lithium-ion batteries—including mobile phones, tablets, laptops, and spare power banks—must be transported in carry-on baggage rather than checked baggage. Spare lithium batteries and external power banks are strictly prohibited in the aircraft cargo hold due to the risk of thermal runaway. Furthermore, smart luggage equipped with non-removable lithium batteries exceeding 0.3g lithium metal or 2.7Wh capacity will not be accepted for carriage on any passenger flight under any circumstances. In the event that a passenger's personal electronic device becomes overheated, emits smoke, or drops between seat tracks, the passenger must immediately notify the cabin crew without attempting to move or force the motorized seat mechanism."

QUESTION: Based on the passage, why are spare power banks prohibited from being stored in checked cargo luggage?`,
    options: [
      'Because spare lithium batteries carry a severe hazard of thermal runaway and fire that cannot be monitored in the cargo hold.',
      'Because airport baggage handling belts might scratch the external casing of the power banks.',
      'Because power banks exceed the standard allowable baggage dimensions for commercial cargo holds.',
      'Because airlines charge an additional fee for transporting electrical chargers in the hold.'
    ],
    correctIndex: 0,
    explanation: 'The passage explicitly states: "Spare lithium batteries and external power banks are strictly prohibited in the aircraft cargo hold due to the risk of thermal runaway."'
  },
  {
    id: 'cc-rc-2',
    category: 'Reading Comprehension',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: `[PASSAGE: AIRLINE ELECTRONIC DEVICE & LITHIUM BATTERY POLICY]
(Refer to the policy above)
QUESTION: If a passenger accidentally drops their smartphone into the motorized mechanism of a Business Class lie-flat seat, what should they do according to airline guidelines?`,
    options: [
      'Alert the cabin crew immediately and avoid operating the seat controls, as motorized seat movement can crush the battery and cause a fire.',
      'Press all seat motorized buttons repeatedly until the phone is pushed out.',
      'Reach deeply into the mechanical gears with a metal fork to retrieve the phone.',
      'Wait until the flight lands and leave the phone inside the seat mechanism.'
    ],
    correctIndex: 0,
    explanation: 'The passage specifies: "...the passenger must immediately notify the cabin crew without attempting to move or force the motorized seat mechanism."'
  },
  {
    id: 'cc-rc-3',
    category: 'Reading Comprehension',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: `[PASSAGE: UNACCOMPANIED MINORS (UMNR) CARRIAGE POLICY]
"Airline policy establishes that children aged 5 to 11 traveling without an adult parent or guardian are classified as mandatory Unaccompanied Minors (UMNR). For youths aged 12 to 17, the UMNR service is optional upon parental request. Unaccompanied minors must wear the designated airline identification badge containing their travel dossier, passport, visa documentation, and arrival pickup authorization at all times. During the flight, UMNR passengers must be seated in aisles adjacent to designated cabin crew stations and are strictly barred from emergency exit rows. Upon aircraft arrival, the cabin crew member in charge must personally escort the child to the ground handling representative, ensuring a formal signature is obtained on the transfer manifest before custody is relinquished."

QUESTION: According to the airline policy, which statement is true regarding seating and handover of an Unaccompanied Minor?`,
    options: [
      'UMNR passengers are prohibited from sitting in emergency exit rows and must be personally escorted to a ground representative with a signed transfer manifest upon arrival.',
      'Children aged 12 to 17 are automatically required to pay mandatory UMNR supervision fees on all routes.',
      'Cabin crew may allow the child to leave the aircraft unaccompanied if the child indicates they recognize their parent at the gate.',
      'UMNR passengers may be assigned to emergency exit rows provided they are over 10 years of age.'
    ],
    correctIndex: 0,
    explanation: 'The text clearly specifies that UMNR passengers are strictly barred from emergency exit rows and must be handed over to ground agents with a signed transfer manifest.'
  },
  {
    id: 'cc-rc-4',
    category: 'Reading Comprehension',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: `[PASSAGE: CABIN SAFETY & IN-FLIGHT TURBULENCE LEVELS]
"Aviation guidelines classify in-flight turbulence into four operational tiers: Light, Moderate, Severe, and Extreme. During Moderate Turbulence, liquids splash from cups, walking in the aisle becomes difficult without holding onto seatbacks, and rapid altitude variations may occur. When Moderate Turbulence is encountered or anticipated, the flight deck illuminates the Fasten Seatbelt sign. Cabin crew must immediately suspend all hot beverage and meal trolley services, stow and latch all galley equipment, secure service carts with floor brakes, and inspect the cabin to ensure passenger seatbelt compliance before securing themselves in their jumpseats if conditions deteriorate."

QUESTION: Under airline safety rules, what is the mandatory immediate protocol regarding cabin food and drink carts during Moderate Turbulence?`,
    options: [
      'Suspend hot beverage service immediately, securely stow and latch carts with floor brakes, and verify passenger seatbelts are fastened.',
      'Accelerate the trolley service to finish serving the entire cabin before severe turbulence begins.',
      'Leave the carts in the middle of the aisle and sit on the floor.',
      'Continue serving cold water while asking passengers to hold their own cups tightly.'
    ],
    correctIndex: 0,
    explanation: 'The text specifies that during Moderate Turbulence, crew must immediately suspend hot beverage/meal service, stow and latch galley equipment, apply cart floor brakes, and check seatbelt compliance.'
  },

  // =========================================================================
  // 2. PILOT TRAINING SCHOOL
  // Program: TRAINEE PILOT (ET-SPONSORED)
  // =========================================================================
  {
    id: 'plt-1',
    category: 'Technical Aptitude',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    question: 'According to Bernoulli’s Principle and aerofoil design, how is aerodynamic lift generated on an aircraft wing?',
    amharicQuestion: 'በበርኑሊ መርህ (Bernoulli’s Principle) መሰረት በአውሮፕላን ክንፍ ላይ ወደ ላይ የሚያነሳ ሀይል (Lift) እንዴት ይፈጠራል?',
    options: [
      'Air moves faster over the curved upper surface, creating lower pressure above relative to beneath the wing',
      'Air is compressed beneath the wing, creating higher vacuum on top',
      'Engine thrust pushes air downwards exclusively through exhaust nozzles',
      'Wing camber heats up the ambient air to reduce air density'
    ],
    amharicOptions: [
      'አየር በክንፉ የላይኛው ክፍል በከፍተኛ ፍጥነት ሲያልፍ ዝቅተኛ የአየር ግፊት በመፍጠር ክንፉ ወደላይ እንዲነሳ ያደርጋል',
      'አየር ከክንፉ ስር ተጨምቆ ወደላይ ይገፋል',
      'የሞተሩ ሀይል አየሩን ወደ ታች በመግፋት ብቻ',
      'የክንፉ ሙቀት አየሩን በማቅለል'
    ],
    correctIndex: 0,
    explanation: 'Faster airflow over the curved upper surface of an aerofoil results in lower static pressure above the wing, generating net upward aerodynamic lift.',
    amharicExplanation: 'አየር በክንፉ የላይኛው ክፍል ፈጥኖ ሲያልፍ የላይኛው ግፊት ይቀንሳል፤ የታችኛው ከፍተኛ ግፊት ክንፉን ወደ ላይ ያነሳዋል።'
  },
  {
    id: 'plt-2',
    category: 'Technical Aptitude',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    question: 'A pilot is flying at True Airspeed (TAS) of 240 knots with a direct headwind of 35 knots. What is the calculated Ground Speed (GS)?',
    amharicQuestion: 'አንድ አብራሪ በ 240 knots የአየር ፍጥነት (TAS) እየበረረ 35 knots የፊት ለፊት ንፋስ (Headwind) ቢገጥመው የመሬት ላይ ፍጥነቱ (Ground Speed) ስንት ይሆናል?',
    options: [
      '205 knots',
      '275 knots',
      '240 knots',
      '195 knots'
    ],
    amharicOptions: [
      '205 knots',
      '275 knots',
      '240 knots',
      '195 knots'
    ],
    correctIndex: 0,
    explanation: 'Ground Speed = True Airspeed - Headwind = 240 kts - 35 kts = 205 knots.',
    amharicExplanation: 'የመሬት ፍጥነት = የአየር ፍጥነት - የፊት ንፋስ = 240 - 35 = 205 knots።'
  },
  {
    id: 'plt-3',
    category: 'Aviation Safety & Regulations',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    question: 'What meteorological phenomenon presents the greatest sudden threat of severe airspeed loss and rapid descent during takeoff and landing?',
    amharicQuestion: 'በመነሳት እና በማረፍ ወቅት ከፍተኛ የአየር ፍጥነት መቀነስ እና ድንገተኛ ቁልቁለት አደጋ የሚፈጥረው የአየር ሁኔታ የትኛው ነው?',
    options: [
      'Microburst / Low-Level Wind Shear',
      'Cirrus Cloud Formation',
      'Thermal Inversion at FL100',
      'Moderate Sea Breeze Front'
    ],
    amharicOptions: [
      'ማይክሮበርስት እና የንፋስ ሽግግር (Microburst / Low-Level Wind Shear)',
      'የሲረስ ደመናዎች',
      'የሙቀት ለውጥ (Thermal Inversion)',
      'የባህር ንፋስ'
    ],
    correctIndex: 0,
    explanation: 'Microbursts produce violent downward downdrafts that transition into rapid shifting tailwinds, causing catastrophic loss of lift near ground level.',
    amharicExplanation: 'Wind Shear / Microburst በመሬት አቅራቢያ አደገኛ ቁልቁል ንፋስ በመፍጠር አውሮፕላን በአስቸኳይ ቁጥጥር ውጭ እንዲሆን ያደርጋል።'
  },
  {
    id: 'plt-4',
    category: 'Numerical Reasoning',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    question: 'An aircraft climbs from 4,000 ft to a cruising altitude of 34,000 ft at an average climb rate of 1,500 feet per minute (fpm). How many minutes will the climb take?',
    amharicQuestion: 'አንድ አውሮፕላን ከ 4,000 ጫማ ወደ 34,000 ጫማ ከፍታ በደቂቃ 1,500 ጫማ እየወጣ ቢሄድ ምን ያህል ደቂቃ ይወስድበታል?',
    options: [
      '20 minutes',
      '15 minutes',
      '25 minutes',
      '30 minutes'
    ],
    correctIndex: 0,
    explanation: 'Altitude to gain = 34,000 - 4,000 = 30,000 ft. Time = 30,000 / 1,500 = 20 minutes.',
    amharicExplanation: 'የሚወጣው ከፍታ = 34,000 - 4,000 = 30,000 ጫማ። ጊዜ = 30,000 / 1,500 = 20 ደቂቃ።'
  },
  {
    id: 'plt-5',
    category: 'Technical Aptitude',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    question: 'In an instrument approach system (ILS), what do the Localizer and Glideslope signals provide to the flight deck?',
    amharicQuestion: 'በአውሮፕላን ማረፊያ መሳሪያ (ILS) ውስጥ ሎካላይዘር (Localizer) እና ግላይድስሎፕ (Glideslope) ምን መመሪያ ይሰጣሉ?',
    options: [
      'Localizer provides horizontal runway centerline guidance; Glideslope provides vertical descent slope guidance',
      'Localizer measures wind velocity; Glideslope measures runway surface friction',
      'Localizer handles communication; Glideslope handles transponder squawk codes',
      'Localizer displays weather radar; Glideslope displays terrain maps'
    ],
    correctIndex: 0,
    explanation: 'The ILS Localizer aligns the aircraft with the runway centerline (lateral), while the Glideslope provides precise vertical descent guidance (typically 3 degrees).',
    amharicExplanation: 'Localizer ወደ ማኮብኮቢያው መሃል የሚያስተካክል ሲሆን፤ Glideslope ደግሞ ትክክለኛውን የማረፊያ ቁልቁለት አንግል ያሳያል።'
  },
  {
    id: 'plt-6',
    category: 'Technical Aptitude',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    question: 'What is the critical angle of attack (Stall Angle) on a typical subsonic aircraft aerofoil?',
    amharicQuestion: 'በተለመደው አውሮፕላን ክንፍ ላይ የአየር መቆራረጥ (Stall) የሚያስከትለው ወሳኝ የአንግል ደረጃ (Angle of Attack) ስንት ነው?',
    options: [
      'Approximately 14° to 18° depending on camber and flap setting',
      '0° relative to relative wind',
      '45° in banked flight',
      '90° vertical climb'
    ],
    correctIndex: 0,
    explanation: 'Exceeding the critical angle of attack (typically 14°-18°) causes airflow separation over the upper surface, resulting in an aerodynamic stall regardless of airspeed.',
    amharicExplanation: 'የክንፉ አንግል ከ 14°-18° ሲያልፍ አየሩ ከክንፉ ተነጥሎ ይበተናል፤ ይህም አውሮፕላኑን ወደ Stall ይወስደዋል።'
  },
  {
    id: 'plt-7',
    category: 'Numerical Reasoning',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    question: 'A twin-engine aircraft burns 2,400 kg of Jet-A1 fuel per hour at cruise. If the flight duration is 2 hours and 45 minutes, with a required 45-minute final reserve, what is the minimum required fuel on board?',
    amharicQuestion: 'አንድ አውሮፕላን በሰአት 2,400 ኪ.ግ ነዳጅ ያቃጥላል። የበረራው ሰአት 2 ሰአት ከ 45 ደቂቃ ሆኖ ተጨማሪ የ 45 ደቂቃ መጠባበቂያ ቢያስፈልግ አጠቃላይ የሚፈለገው ነዳጅ ስንት ነው?',
    options: [
      '8,400 kg',
      '6,600 kg',
      '7,800 kg',
      '9,200 kg'
    ],
    correctIndex: 0,
    explanation: 'Total Time = 2h 45m + 45m = 3.5 hours. Total Fuel = 3.5 hrs * 2,400 kg/hr = 8,400 kg.',
    amharicExplanation: 'ጠቅላላ ሰአት = 2.75 + 0.75 = 3.5 ሰአት። ጠቅላላ ነዳጅ = 3.5 * 2,400 = 8,400 ኪ.ግ።'
  },
  {
    id: 'plt-8',
    category: 'General Knowledge',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    question: 'What is the ICAO standard international emergency transponder squawk code for Unlawful Interference (Hijacking)?',
    amharicQuestion: 'የአውሮፕላን ጠለፋ (Hijacking) ሲያጋጥም ወደ ራዳር የሚላከው አለም አቀፍ የትራንስፖንደር ኮድ (Squawk code) ስንት ነው?',
    options: [
      '7500',
      '7600',
      '7700',
      '1200'
    ],
    correctIndex: 0,
    explanation: '7500 = Hijack / Unlawful Interference, 7600 = Radio Communication Failure (NORDO), 7700 = General Emergency.',
    amharicExplanation: '7500 ለጠለፋ (Hijack)፣ 7600 ለሬዲዮ መቋረጥ እና 7700 ለአጠቃላይ አደጋ የሚያገለግሉ ኮዶች ናቸው።'
  },

  // =========================================================================
  // 3. AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL (AMT)
  // Programs: AMT, A/C Mechanic, Powerplant, Avionics, Airframe, Structures, NDT
  // =========================================================================
  {
    id: 'amt-1',
    category: 'Technical Aptitude',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'In a modern turbofan gas turbine engine, what is the primary thermodynamic function of the bypass air flowing through the outer fan duct?',
    amharicQuestion: 'በዘመናዊ የቱርቦፋን ጄት ሞተር ውስጥ በውጪው ቱቦ (Bypass duct) የሚያልፈው አየር ዋና ተግባር ምንድነው?',
    options: [
      'To produce the majority of total engine thrust at subsonic speeds with high fuel efficiency and lower noise',
      'To cool down the cockpit electronic display units exclusively',
      'To prevent ice accumulation on the trailing edges of the flaps',
      'To ignite the combustion fuel spray directly'
    ],
    amharicOptions: [
      'በከፍተኛ የነዳጅ ቁጠባ እና ዝቅተኛ ድምጽ አብዛኛውን የሞተር ግፊት (Thrust) ማመንጨት',
      'የኮክፒት መሳሪያዎችን ለማቀዝቀዝ ብቻ',
      'በክንፍ ፍላፖች ላይ በረዶ እንዳይቀመጥ ማድረግ',
      'የነዳጅ ማቃጠያውን ለማስነሳት'
    ],
    correctIndex: 0,
    explanation: 'High-bypass turbofans accelerate a massive volume of cold air around the engine core, generating 75-85% of total thrust with optimal thermal efficiency.',
    amharicExplanation: 'በቱርቦፋን ሞተር ውስጥ በኮር ዙሪያ የሚያልፈው አየር አብዛኛውን የመግፋት ሀይል (75-85%) በትንሽ ነዳጅ ያመነጫል።'
  },
  {
    id: 'amt-2',
    category: 'Technical Aptitude',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'Which type of Non-Destructive Testing (NDT) is most suitable for detecting sub-surface fatigue cracks and corrosion in non-ferrous aluminum alloy aircraft skins?',
    amharicQuestion: 'በአውሮፕላን አልሙኒየም አካል ላይ ውስጣዊ ስንጥቆችን እና ዝገትን ያለምንም ጉዳት ለመመርመር (NDT) የትኛው ዘዴ ይመረጣል?',
    options: [
      'Eddy Current Testing (ECT) / Ultrasonic Inspection',
      'Visual Inspection with standard magnifying glass only',
      'Acid Etch Chemical Burn Test',
      'Magnetic Particle Inspection (MPI)'
    ],
    amharicOptions: [
      'ኤዲ ከረንት እና አልትራሶኒክ ፍተሻ (Eddy Current / Ultrasonic Testing)',
      'በአይን ብቻ መመልከት',
      'በአሲድ የማቃጠል ሙከራ',
      'የማግኔት ፍተሻ (Magnetic Particle - ለአልሙኒየም አይሰራም)'
    ],
    correctIndex: 0,
    explanation: 'Eddy Current Testing utilizes electromagnetic induction to detect subsurface flaws in non-ferrous metals like aluminum alloys, while MPI only works on ferromagnetic metals.',
    amharicExplanation: 'የአልሙኒየም ውስጣዊ ብልሽቶችን ለማወቅ Eddy Current እና Ultrasonic ምርመራዎች ዋና ዘዴዎች ናቸው።'
  },
  {
    id: 'amt-3',
    category: 'Technical Aptitude',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'Why is phosphate-ester based hydraulic fluid (such as Skydrol) widely utilized in commercial transport aircraft hydraulic systems?',
    amharicQuestion: 'በንግድ አውሮፕላን ሃይድሮሊክ ሲስተም ውስጥ ስካይድሮል (Skydrol) የተባለው ዘይት በስፋት ጥቅም ላይ የሚውለው ለምንድነው?',
    options: [
      'High fire resistance and thermal stability under extreme operational pressures and temperatures',
      'Low cost and safe direct skin contact properties',
      'Ability to act as an in-flight fuel additive',
      'Water solubility for easy cabin washing'
    ],
    amharicOptions: [
      'እሳትን በከፍተኛ ሁኔታ የመቋቋም አቅም እና በከፍተኛ ግፊት ውስጥ የመስራት ብቃት ስላለው',
      'ርካሽ እና ለቆዳ ተስማሚ ስለሆነ',
      'እንደ ነዳጅ ተጨማሪ ስለሚያገለግል',
      'ከውሃ ጋር ስለሚቀላቀል'
    ],
    correctIndex: 0,
    explanation: 'Phosphate ester synthetic hydraulic fluids (Skydrol) provide essential fire resistance under extreme hydraulic operating pressures (3,000 - 5,000 psi).',
    amharicExplanation: 'ስካይድሮል እሳት የመቋቋም ብቃቱ ከፍተኛ ስለሆነ በከፍተኛ ግፊት ውስጥ የአውሮፕላን ደህንነትን ይጠብቃል።'
  },
  {
    id: 'amt-4',
    category: 'Technical Aptitude',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'In aircraft electrical systems, what component converts three-phase 115V AC power generated by engine generators into 28V DC power for avionics?',
    amharicQuestion: 'በአውሮፕላን ኤሌክትሪክ ሲስተም ውስጥ 115V AC የነበረውን ሀይል ወደ 28V DC የሚቀይረው መሳሪያ የትኛው ነው?',
    options: [
      'Transformer Rectifier Unit (TRU)',
      'Static Inverter',
      'Brushless Alternator',
      'Auxiliary Power Unit (APU)'
    ],
    correctIndex: 0,
    explanation: 'A Transformer Rectifier Unit (TRU) steps down 115V AC and rectifies it into standard 28V DC power used by aircraft instruments and battery chargers.',
    amharicExplanation: 'Transformer Rectifier Unit (TRU) የ AC ኤሌክትሪክን ወደ DC ኤሌክትሪክ በመቀየር የአውሮፕላኑ መሳሪያዎች እንዲሰሩ ያደርጋል።'
  },
  {
    id: 'amt-5',
    category: 'Aviation Safety & Regulations',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'What is the primary objective of an Aircraft Maintenance Minimum Equipment List (MEL)?',
    amharicQuestion: 'የአውሮፕላን አነስተኛ መሳሪያዎች ዝርዝር (MEL) ዋና ዓላማ ምንድነው?',
    options: [
      'To specify which inoperative instruments or equipment allow an aircraft to be safely dispatched under strict conditions',
      'To list the maximum baggage weight passengers can load on board',
      'To list catering menu quantities for flight attendants',
      'To define pilot flight duty hours per week'
    ],
    correctIndex: 0,
    explanation: 'The MEL allows an aircraft to operate safely with specific inoperative items under defined operating limitations until maintenance can be completed.',
    amharicExplanation: 'MEL አንድ አውሮፕላን አንዳንድ ያልሰሩ መሳሪያዎች እያሉ በደህንነት ገደብ ውስጥ በረራ እንዲያደርግ የሚፈቅድ ህጋዊ ሰነድ ነው።'
  },
  {
    id: 'amt-6',
    category: 'Technical Aptitude',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'What digital data communication standard is commonly used for serial transmission of avionics sensor data on modern commercial aircraft?',
    amharicQuestion: 'በዘመናዊ አውሮፕላኖች ውስጥ የአቪዮኒክስ ዳታዎችን ለማስተላለፍ የሚያገለግለው አለም አቀፍ የኮሙኒኬሽን ስታንዳርድ የትኛው ነው?',
    options: [
      'ARINC 429',
      'USB 3.0 Standard',
      'IEEE 802.11b Wi-Fi',
      'RS-232 Analog Cable'
    ],
    correctIndex: 0,
    explanation: 'ARINC 429 is the two-wire differential broadcast bus standard ubiquitously utilized in commercial transport avionics architectures.',
    amharicExplanation: 'ARINC 429 በአቪዮኒክስ መሳሪያዎች መካከል አስተማማኝ መረጃን በፍጥነት ለማስተላለፍ የተዘጋጀ የአቪዬሽን ስታንዳርድ ነው።'
  },
  {
    id: 'amt-7',
    category: 'Technical Aptitude',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'When repairing damaged composite honeycomb sandwich structures on an aircraft flap or rudder, why is vacuum bagging and stepped ply layup utilized?',
    amharicQuestion: 'የተጎዳ የአውሮፕላን ኮምፖዚት (Honeycomb) ሲጠገን Vacuum bag እና ደረጃውን የጠበቀ የንብርብር ድልድል (Stepped ply) የሚደረገው ለምንድነው?',
    options: [
      'To eliminate trapped air voids, achieve optimal resin-to-fiber ratio, and restore original structural load distribution',
      'To change the aerodynamic color of the wing',
      'To increase aircraft total weight artificially for balance',
      'To allow fuel to flow through the honeycomb core'
    ],
    correctIndex: 0,
    explanation: 'Vacuum bagging applies uniform atmospheric consolidation pressure to remove entrapped air, while stepped plies ensure smooth shear stress transfer across the repair joint.',
    amharicExplanation: 'Vacuum bagging የታመቀ አየርን በማስወጣት እና ፋይበሮቹን በማጣበቅ የጥገናውን ጥንካሬ ወደ ቀድሞው ደረጃ ለመመለስ ያገለግላል።'
  },
  {
    id: 'amt-8',
    category: 'Numerical Reasoning',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'A torque wrench requires a specified torque of 120 lbf·in. If an extension adapter of length 2 inches is added to a wrench of effective length 10 inches, what setting must be dialed on the wrench handle? (Formula: Setting = Torque × [L / (L + E)])',
    amharicQuestion: 'አንድ የቶርክ መፍቻ (Torque wrench) 120 lbf·in ያስፈልገዋል። ባለ 10 ኢንች መፍቻ ላይ የ 2 ኢንች ጭማሪ ቢገጠም በመፍቻው እጀታ ላይ መስተካከል ያለበት ቁጥር ስንት ነው?',
    options: [
      '100 lbf·in',
      '110 lbf·in',
      '144 lbf·in',
      '90 lbf·in'
    ],
    correctIndex: 0,
    explanation: 'Setting = 120 × [10 / (10 + 2)] = 120 × (10 / 12) = 100 lbf·in.',
    amharicExplanation: 'ትክክለኛው ስሌት = 120 × (10 / 12) = 100 lbf·in ይሆናል።'
  },

  // =========================================================================
  // 4. COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL
  // Programs: Passenger Handling, Ramp Ops, Flight Dispatch, Cargo Logistics, Ticketing
  // =========================================================================
  {
    id: 'grd-1',
    category: 'Customer & Flight Operations',
    role: 'Ground Operations',
    training_school: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    question: 'Under IATA Dangerous Goods Regulations (DGR), what hazard class encompasses Flammable Liquids (such as aviation fuels, alcohol solvents, and paints)?',
    amharicQuestion: 'በ IATA አደገኛ እቃዎች ደንብ (DGR) መሰረት ተቀጣጣይ ፈሳሾች (እንደ ነዳጅ፣ ቀለም) የሚመደቡት በየትኛው Hazard Class ውስጥ ነው?',
    options: [
      'Class 3 - Flammable Liquids',
      'Class 1 - Explosives',
      'Class 7 - Radioactive Materials',
      'Class 9 - Miscellaneous Dangerous Goods'
    ],
    amharicOptions: [
      'ክፍል 3 - ተቀጣጣይ ፈሳሾች (Class 3 - Flammable Liquids)',
      'ክፍል 1 - ፈንጂዎች',
      'ክፍል 7 - ራዲዮአክቲቭ',
      'ክፍል 9 - ልዩ አደገኛ እቃዎች'
    ],
    correctIndex: 0,
    explanation: 'IATA DGR Class 3 specifically designates Flammable Liquids with flash points below specified safety thresholds.',
    amharicExplanation: 'በ IATA ደንብ ክፍል 3 (Class 3) ተቀጣጣይ ፈሳሾችን የሚወክል ዓለም አቀፍ ምድብ ነው።'
  },
  {
    id: 'grd-2',
    category: 'Customer & Flight Operations',
    role: 'Ground Operations',
    training_school: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    question: 'In flight dispatch and weight & balance operations, what is the meaning of "Zero Fuel Weight" (ZFW)?',
    amharicQuestion: 'በበረራ ስሌት እና ጭነት ሚዛን (Weight & Balance) ውስጥ "Zero Fuel Weight" (ZFW) ማለት ምን ማለት ነው?',
    options: [
      'The total weight of the aircraft loaded with crew, passengers, and cargo, but excluding all usable fuel on board',
      'The empty weight of the aircraft without any passengers or cargo loaded',
      'The maximum weight at which the aircraft is permitted to touch down on the runway',
      'The remaining fuel weight after landing at the destination alternate airport'
    ],
    amharicOptions: [
      'የአውሮፕላኑ፣ የተሳፋሪዎች እና የጭነት ድምር ክብደት (ነዳጅ ሳይጨመርበት)',
      'ተሳፋሪ ወይም ጭነት የሌለው ባዶ አውሮፕላን ክብደት',
      'አውሮፕላኑ መሬት እንዲያርፍ የተፈቀደለት ከፍተኛ ክብደት',
      'ከበረራ በኋላ የቀረ ነዳጅ'
    ],
    correctIndex: 0,
    explanation: 'Zero Fuel Weight (ZFW) is the total weight of the airplane including payload (passengers, baggage, cargo) and dry operating weight, but excluding usable fuel.',
    amharicExplanation: 'ZFW ማለት አውሮፕላኑ ተሳፋሪ እና ጭነት ጭኖ ያለ ምንም ነዳጅ የሚኖረው አጠቃላይ ክብደት ነው።'
  },
  {
    id: 'grd-3',
    category: 'Customer & Flight Operations',
    role: 'Ground Operations',
    training_school: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    question: 'When marshalling an aircraft onto the parking stand, what does the signal of raising both wands vertically and crossing them above the head indicate?',
    amharicQuestion: 'በመሬት ላይ አውሮፕላን ሲመራ (Marshalling) ሁለቱንም ምልክቶች ወደ ላይ ከፍ አድርጎ አመሳቅሎ ማሳየት ምንን ያመለክታል?',
    options: [
      'Emergency Stop / Immediate Halt',
      'Proceed straight ahead at normal taxi speed',
      'Turn sharply to the left parking gate',
      'Release aircraft parking brakes'
    ],
    amharicOptions: [
      'አስቸኳይ መቆም (Emergency Stop / Immediate Halt)',
      'ወደ ፊት ቀጥ ብለህ ና',
      'ወደ ግራ ታጠፍ',
      'ፍሬን ፍታ'
    ],
    correctIndex: 0,
    explanation: 'Crossing marshalling wands or arms above the head is the universal ICAO standard signal for Emergency Stop.',
    amharicExplanation: 'ሁለት መሪ ምልክቶችን ከራስ በላይ ማመሳቀል አውሮፕላኑ በአስቸኳይ እንዲቆም የሚያዝ ዓለም አቀፍ ምልክት ነው።'
  },
  {
    id: 'grd-4',
    category: 'Customer & Flight Operations',
    role: 'Ground Operations',
    training_school: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    question: 'What is a Unit Load Device (ULD) in air cargo and baggage operations?',
    amharicQuestion: 'በአየር ጭነት እና ሻንጣ አገልግሎት ውስጥ ULD (Unit Load Device) ማለት ምን ማለት ነው?',
    options: [
      'Standardized cargo containers or contoured pallets locked into the aircraft lower and main decks',
      'A handheld barcode scanner used at passenger check-in counters',
      'An automated conveyor belt on the baggage sorting carousel',
      'A ground power cable connecting the terminal to the jet bridge'
    ],
    correctIndex: 0,
    explanation: 'ULDs (containers like AKE/LD3 or pallets) allow bulk cargo and baggage to be assembled into standardized units for rapid aircraft loading and securing.',
    amharicExplanation: 'ULD ማለት ሻንጣዎችና እቃዎች በአንድ ላይ ተጭነው በአውሮፕላን ሆድ ውስጥ የሚገቡ ደረጃቸውን የጠበቁ ሳጥኖች ወይም ፓሌቶች ናቸው።'
  },
  {
    id: 'grd-5',
    category: 'Numerical Reasoning',
    role: 'Ground Operations',
    training_school: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    question: 'A passenger traveling on an international flight has 28 kg of luggage. If the free allowance is 23 kg and excess baggage fee is 350 ETB per excess kg, how much must the passenger pay?',
    amharicQuestion: 'አንድ ተሳፋሪ 28 ኪ.ግ ሻንጣ አለው። የተፈቀደው ነፃ 23 ኪ.ግ ከሆነ እና ለትርፍ ኪ.ግ 350 ETB ቢጠየቅ አጠቃላይ ስንት ይከፍላል?',
    options: [
      '1,750 ETB',
      '1,400 ETB',
      '2,100 ETB',
      '1,050 ETB'
    ],
    correctIndex: 0,
    explanation: 'Excess weight = 28 kg - 23 kg = 5 kg. Total fee = 5 kg × 350 ETB = 1,750 ETB.',
    amharicExplanation: 'ትርፍ ኪሎ = 28 - 23 = 5 ኪ.ግ. ጠቅላላ ክፍያ = 5 × 350 = 1,750 ETB።'
  }
];
