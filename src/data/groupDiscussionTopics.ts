import { GroupDiscussionTopic } from '../types';

export const GROUP_DISCUSSION_TOPICS: GroupDiscussionTopic[] = [
  // =========================================================================
  // 1. CABIN CREW TRAINING SCHOOL
  // =========================================================================
  {
    id: 'gd-1',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    title: 'Managing Overbooked Flights with High-Yield Passengers',
    amharicTitle: 'ሞልቶ በተያዘ (Overbooked) በረራ ላይ ተሳፋሪዎችን የማስተናገድ ዘዴ',
    scenario: 'Flight 302 is overbooked by 6 economy seats during peak season. A family of 4 and 2 business travelers need boarding. How does the crew prioritize resolution with maximum customer care?',
    amharicScenario: 'በረራ 302 በ6 ተሳፋሪዎች በዝቷል። 4 የቤተሰብ አባላት እና 2 የቢዝነስ መንገደኞች መሳፈር ይፈልጋሉ። ቡድኑ ችግሩን በስነ-ስርዓት እንዴት ይፈታዋል?',
    evaluatorCriteria: [
      'Empathy and diplomatic persuasion',
      'Willingness to listen to team ideas without interrupting',
      'Knowledge of voluntary denied boarding compensation policies'
    ],
    dos: [
      'Propose offering voluntary compensation vouchers first before involuntary denial',
      'Acknowledge opinions of quieter group participants by asking "What do you think?"',
      'Keep focus on passenger satisfaction and airline reputation'
    ],
    donts: [
      'Do not argue over who speaks first or dominate the entire group discussion',
      'Do not propose ignoring airline tariff rules or making unrealistic promises',
      'Do not blame ground staff or gate agents for the overbooking'
    ],
    starterPhrases: [
      '"I agree with your point regarding policy, and perhaps we could also offer volunteer incentives first."',
      '"Let\'s make sure we address both the family unit and the business travelers with equal care."',
      '"To summarize our group consensus, we recommend seeking volunteers before applying involuntary priority criteria."'
    ]
  },
  {
    id: 'gd-cc-2',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    title: 'Is College Degree Essential vs Soft Skills & Empathy for Cabin Crew?',
    amharicTitle: 'ለአየር መንገድ አስተናጋጅነት ዲግሪ ይፈለጋል ወይስ ተግባቦት እና ደግነት?',
    scenario: 'Some recruitment panellists argue a university degree should be mandatory for all Cabin Crew hires, while others argue emotional intelligence, language fluency, and hospitality skills matter more. What is your group stance?',
    amharicScenario: 'አንዳንዶች ለአስተናጋጅነት የዩኒቨርሲቲ ዲግሪ ግዴታ መሆን አለበት ሲሉ ሌሎች ደግሞ ስነ-ምግባር፣ የስሜት ብስለት እና የእንግሊዝኛ ቋንቋ ችሎታ ይበልጣል ይላሉ። ቡድናችሁ ምን ይወስናል?',
    evaluatorCriteria: [
      'Balanced perspective and logical arguments',
      'Active listening and polite counter-arguments',
      'Customer-first mindset'
    ],
    dos: [
      'Acknowledge value of academic discipline while highlighting soft skills, language, and safety instincts',
      'Propose a holistic assessment score balancing academic achievement with communication skills',
      'Encourage all group participants to share their viewpoints'
    ],
    donts: [
      'Do not dismiss degree holders or non-degree holders aggressively',
      'Avoid interrupting others while they present their points',
      'Do not get emotional or off-topic'
    ],
    starterPhrases: [
      '"While a degree demonstrates academic discipline, cabin safety and customer empathy are equally critical in daily flight operations."',
      '"I believe a balanced evaluation framework considering both educational foundation and interpersonal communication serves the airline best."',
      '"What are your thoughts on combining language proficiency tests with behavioral scenario ratings?"'
    ]
  },

  // =========================================================================
  // 2. PILOT TRAINING SCHOOL
  // =========================================================================
  {
    id: 'gd-plt-1',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    title: 'Adverse Weather vs Schedule Pressure Decision',
    amharicTitle: 'መጥፎ የአየር ሁኔታ እና የበረራ ሰዓት እጥረት ሲያጋጥም መወሰን',
    scenario: 'A severe squall line is approaching the departure airport. The flight deck receives pressure from ground ops to depart before storm closure. How should the team weigh safety vs delay costs?',
    amharicScenario: 'በጣም አደገኛ ማዕበል እና ዝናብ ወደ ኤርፖርቱ እየመጣ ነው። የበረራ ቡድኑ ከበረራ በፊት ደህንነትን እና የጊዜ መዘገየትን እንዴት ይመዝናል?',
    evaluatorCriteria: [
      'Unwavering commitment to flight safety standards',
      'Collaborative risk assessment and CRM',
      'Clear communication under operational pressure'
    ],
    dos: [
      'Emphasize that captain\'s authority and safety overrides schedule pressures',
      'Suggest calculating additional hold fuel or evaluating secondary departure windows',
      'Engage all group members in risk evaluation'
    ],
    donts: [
      'Never compromise on minimum weather departure minima',
      'Do not dismiss ground ops concerns arrogantly; maintain respectful dialogue',
      'Avoid rushing to a conclusion without examining meteorological reports'
    ],
    starterPhrases: [
      '"Safety is non-negotiable; let\'s evaluate radar trends and hold fuel capacity before deciding."',
      '"While minimizing delay costs is important, maintaining flight safety margin is our primary duty."',
      '"Should we consult ATC for updated convective weather movements before engine start?"'
    ]
  },
  {
    id: 'gd-plt-2',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    title: 'Automation Reliance vs Manual Flying Proficiency in Modern Cockpits',
    amharicTitle: 'በዘመናዊ አውሮፕላኖች ውስጥ አውቶፓይለት ላይ ከመጠን በላይ መደገፍ የሚያስከትለው ተጽዕኖ',
    scenario: 'With fly-by-wire and advanced flight management systems (FMS), should airlines mandate frequent manual flying practice, or rely on automation for higher fuel efficiency and consistency?',
    amharicScenario: 'አውቶፓይለት አደጋን የሚቀንስ ቢሆንም የአብራሪዎችን የእጅ በረራ ችሎታ እንዳያዳክም እንዴት ማመጣጠን ይቻላል?',
    evaluatorCriteria: [
      'Insight into modern aviation flight deck human factors',
      'Balancing technological benefits with manual airmanship skills',
      'Constructive debate management'
    ],
    dos: [
      'Advocate for regular simulator and visual meteorological condition (VMC) manual flying drills',
      'Highlight automation as a situational awareness enhancer, not a pilot replacement',
      'Summarize key group takeaways respectfully'
    ],
    donts: [
      'Do not argue that automation is useless or that manual flying is obsolete',
      'Do not talk over others during technical explanations'
    ],
    starterPhrases: [
      '"Automation provides exceptional precision, but manual airmanship remains the ultimate safeguard in unexpected flight anomalies."',
      '"How do we structure recurrent simulator training to keep core hand-flying skills sharp?"',
      '"A layered approach that uses automation strategically while preserving manual competence is essential."'
    ]
  },

  // =========================================================================
  // 3. AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL (AMT)
  // =========================================================================
  {
    id: 'gd-amt-1',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    title: 'Deferred Maintenance (MEL) vs On-Time Flight Release',
    amharicTitle: 'በአውሮፕላን ጥገና ወቅት በጊዜ መነሳት እና የደህንነት ጥንቃቄን ማመጣጠን',
    scenario: 'An auxiliary fuel booster pump has failed 20 minutes before a scheduled international flight departure. The dispatch rules allow MEL deferral with operational limits. Should the engineering team defer or hold the flight for replacement?',
    amharicScenario: 'ከበረራ 20 ደቂቃ በፊት የነዳጅ ፓምፕ ብልሽት አጋጥሟል። በ MEL ህግ መሰረት አውሮፕላኑ መብረር ቢችልም አዲሱን ፓምፕ ቀይሮ በረራውን ማዘግየት ይሻላል ወይስ ወዲያው መልቀቅ?',
    evaluatorCriteria: [
      'Understanding of Minimum Equipment List (MEL) airworthiness rules',
      'Team collaborative risk evaluation',
      'Balancing engineering safety with operational efficiency'
    ],
    dos: [
      'Cross-check exact MEL requirements including route distance and alternate airports',
      'Communicate clearly with flight operations regarding maintenance estimates',
      'Respect all technician inputs before finalizing maintenance release'
    ],
    donts: [
      'Never bypass Aircraft Maintenance Manual (AMM) sign-off protocols',
      'Do not succumb to commercial pressure if safety margins are compromised',
      'Do not argue aggressively with team members'
    ],
    starterPhrases: [
      '"Let\'s review the specific MEL conditions to ensure all operational margins are fully satisfied."',
      '"If the replacement can be achieved safely within a predictable window, that might eliminate downstream route disruptions."',
      '"Safety and airworthiness integrity must always guide our engineering sign-off."'
    ]
  },
  {
    id: 'gd-amt-2',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    title: 'Digital Paperless Maintenance vs Traditional Physical Aircraft Logbooks',
    amharicTitle: 'ዲጂታል የአውሮፕላን ጥገና ምዝገባ እና የወረቀት ሰነዶች ጥቅምና ጉዳት',
    scenario: 'Airlines worldwide are transitioning from physical paper logbooks to electronic logbooks (e-Logs) and tablet-based work cards. What are the advantages and risks for line maintenance technicians?',
    amharicScenario: 'በአለም አቀፍ አየር መንገዶች የአውሮፕላን ጥገና ሰነዶችን ወደ ዲጂታል መቀየር ምን ጥቅምና ጥንቃቄዎች አሉት?',
    evaluatorCriteria: [
      'Knowledge of aviation documentation and compliance',
      'Risk mitigation and cybersecurity awareness in maintenance',
      'Clear, persuasive communication'
    ],
    dos: [
      'Highlight real-time fleet synchronization, rapid parts traceability, and human error reduction',
      'Propose offline backup redundancy protocols for power or network outages',
      'Encourage all candidates in the group to contribute their perspective'
    ],
    donts: [
      'Do not ignore regulatory compliance rules for electronic signatures',
      'Do not dismiss traditional technicians who are adapting to digital tools'
    ],
    starterPhrases: [
      '"Digital logbooks significantly reduce transcription errors and expedite MRO parts requisition."',
      '"To prevent line maintenance halts during system downtime, robust offline synchronization is vital."',
      '"Our consensus is that digital systems offer superior traceability when backed by fail-safe redundancies."'
    ]
  },

  // =========================================================================
  // 4. COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL
  // =========================================================================
  {
    id: 'gd-grd-1',
    role: 'Ground Operations',
    training_school: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    title: 'Automated Self-Service Bag Drops vs Personalized Passenger Check-In',
    amharicTitle: 'የራስ አገዝ የሻንጣ መመዝገቢያ ቴክኖሎጂ እና የደንበኞች ቀጥተኛ መስተንግዶ',
    scenario: 'To cut terminal queue times by 50%, international airports are expanding biometric self-service kiosks. How should ground operations staff balance rapid automated processing with warm, personalized passenger hospitality?',
    amharicScenario: 'የተሳፋሪዎችን ሰልፍ ለመቀነስ ዲጂታል ራስ አገዝ ማሽኖች ሲተከሉ ሞቅ ያለ እንግዳ ተቀባይነትን እና የደንበኞች እርካታን እንዴት ማጣመር ይቻላል?',
    evaluatorCriteria: [
      'Customer service mindset',
      'Operational efficiency and queue management',
      'Teamwork and constructive communication'
    ],
    dos: [
      'Propose floor ambassador cabin/ground staff who assist elderly or first-time passengers at kiosks',
      'Emphasize that technology frees staff to provide higher quality attention to special-need passengers',
      'Support peer suggestions with practical examples'
    ],
    donts: [
      'Do not present technology and hospitality as mutually exclusive',
      'Avoid monopolizing the conversation'
    ],
    starterPhrases: [
      '"Self-service technology improves airport throughput, while floor hosts ensure our signature hospitality is never lost."',
      '"We can dedicate automated lanes for tech-savvy travelers while preserving staffed counters for families and assisted passengers."',
      '"Let\'s ensure our ground team is trained to deliver proactive assistance at key touchpoints."'
    ]
  }
];
