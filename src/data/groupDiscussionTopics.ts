import { GroupDiscussionTopic } from '../types';

export const GROUP_DISCUSSION_TOPICS: GroupDiscussionTopic[] = [
  {
    id: 'gd-1',
    role: 'Cabin Crew',
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
    id: 'gd-2',
    role: 'Pilot / Cadet',
    title: 'Adverse Weather vs Schedule Pressure Decision',
    amharicTitle: 'መጥፎ የአየር ሁኔታ እና የበረራ ሰዓት እጥረት ሲያጋጥም መወሰን',
    scenario: 'A severe squall line is approaching the departure airport. The flight deck receives pressure from ground ops to depart before storm closure. How should the team weigh safety vs delay costs?',
    amharicScenario: 'በጣም አደገኛ ማုန်በል እና ዝናብ ወደ ኤርፖርቱ እየመጣ ነው። የበረራ ቡድኑ ከበረራ በፊት ደህንነትን እና የጊዜ መዘገየትን እንዴት ይመዝናል?',
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
    id: 'gd-3',
    role: 'Aircraft Maintenance (AMT)',
    title: 'Deferred Maintenance vs On-Time Flight Release',
    amharicTitle: 'የጥገና ጊዜ እና የጊዜ ጥበቃ ምርጫ',
    scenario: 'An auxiliary power unit (APU) generator shows intermittent readings 15 minutes before scheduled departure. Ground power is available at destination. How do technicians resolve this?',
    amharicScenario: 'ከመነሳት 15 ደቂቃ በፊት የአውሮፕላኑ ኤፒዩ (APU) ችግር አሳይቷል። በቦታው ሌላ የኤሌክትሪክ ምንጭ አለ። ቡድኑ እንዴት ይወስናል?',
    evaluatorCriteria: [
      'Strict adherence to Minimum Equipment List (MEL)',
      'Analytical problem solving and airworthiness knowledge',
      'Effective team consensus building'
    ],
    dos: [
      'Consult the MEL document to verify if APU is a required item for the route',
      'Ensure proper documentation and sign-off if deferred per MEL procedure',
      'Communicate clearly with flight crew and station dispatch'
    ],
    donts: [
      'Do not guess MEL requirements without reference',
      'Never sign off an item under time pressure without required procedure',
      'Do not dismiss flight crew safety questions'
    ],
    starterPhrases: [
      '"Let\'s verify the MEL guidelines for this specific route and equipment requirement."',
      '"If MEL permits deferral with ground power at destination, we must document it thoroughly."',
      '"Safety and airworthiness documentation must be 100% compliant before release."'
    ]
  },
  {
    id: 'gd-4',
    role: 'Ground Operations',
    title: 'Misplaced Priority Baggage during Rapid Connection',
    amharicTitle: 'የጠፋ የተሳፋሪ ሻንጣ በቶሎ ማግኘት እና ማስተናገድ',
    scenario: 'Thirty priority transfer bags missed their connecting flight due to late inbound arrival. Disembarking passengers are waiting at the carousel. How should ground teams handle the communication?',
    amharicScenario: '30 የቅድሚያ ተሳፋሪዎች ሻንጣ በጊዜ እጥረት ምክንያት አልተጫነም። ተሳፋሪዎቹ ኤርፖርት እየጠበቁ ነው። ቡድኑ ሁኔታውን እንዴት ያስተናግዳል?',
    evaluatorCriteria: [
      'Proactive customer recovery strategies',
      'Stress tolerance and conflict resolution',
      'Organization and clear action planning'
    ],
    dos: [
      'Establish a dedicated assistance desk before passengers reach the carousel',
      'Provide immediate delivery tracking and initial amenity vouchers',
      'Demonstrate genuine care and clear follow-up timelines'
    ],
    donts: [
      'Do not hide or avoid answering waiting passengers',
      'Never blame baggage handlers or other departments publicly',
      'Avoid making promises regarding delivery times that cannot be kept'
    ],
    starterPhrases: [
      '"Let\'s set up a dedicated trace desk immediately so passengers don\'t wait in uncertainty."',
      '"Providing proactive baggage tracking numbers and home delivery guarantees will rebuild confidence."',
      '"We should assign dedicated agents to assist elderly and family travelers directly."'
    ]
  },
  {
    id: 'gd-5',
    role: 'Cabin Crew',
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
  {
    id: 'gd-6',
    role: 'Ground Operations',
    title: 'Technology & Automation vs Personal Human Touch in Passenger Check-in',
    amharicTitle: 'የቴክኖሎጂ (Kiosk/Online) እና የሰው ልጅ መስተንግዶ በኤርፖርት',
    scenario: 'Bole International Airport introduces 100% self-service check-in kiosks and automated bag drops. Some passengers feel alienated without human interaction. How should ground ops balance efficiency with hospitality?',
    amharicScenario: 'በቦሌ ኤርፖርት የራስ-ገዝ ኪዮስክ መስተንግዶ ቢዘረጋ ተሳፋሪዎችን ከቴክኖሎጂው ጋር ለማላመድ እና አገልግሎቱን ለማሻሻል ቡድኑ ምን ይምረጣል?',
    evaluatorCriteria: [
      'Operational efficiency awareness',
      'Passenger empathy & assistance planning',
      'Team consensus building'
    ],
    dos: [
      'Suggest deploying "Floor Ambassador" staff at kiosks to guide first-time or elderly users',
      'Highlight how automation reduces queue times, allowing agents to focus on complex passenger needs',
      'Maintain a polite and structured flow during the discussion'
    ],
    donts: [
      'Never advocate completely removing human service agents',
      'Avoid arguing over technical kiosk specifications',
      'Do not talk over other candidates'
    ],
    starterPhrases: [
      '"Self-service speeds up check-in, but having floor ambassadors ensures no passenger feels lost or overwhelmed."',
      '"Automation should enhance customer experience, not replace warm Ethiopian hospitality."',
      '"Let\'s summarize our group proposal: automated kiosks for fast transit, with dedicated human assistance for passengers needing extra care."'
    ]
  }
];
