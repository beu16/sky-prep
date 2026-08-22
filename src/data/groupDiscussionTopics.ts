import { GroupDiscussionTopic } from '../types';

export const GROUP_DISCUSSION_TOPICS: GroupDiscussionTopic[] = [
  {
    id: 'gd_01',
    school: 'cabin_crew',
    title: {
      en: 'Overbooked Flight Scenario: Selecting Compensation & Volunteers',
      am: 'ከመጠን በላይ የተያዘ በረራ (Overbooked Flight) እና የመፍትሄ ውይይት',
      or: 'Mari’annaa Xiyyaara Guutee (Overbooked Flight)',
      ti: 'ተወሳኺ ዝተታሕዘ በረራ (Overbooking) መፍትሒ ምይይጥ'
    },
    scenario: {
      en: 'A wide-body flight is overbooked by 8 passengers due to an aircraft down-gauge. 2 VIP delegates, 3 medical personnel traveling to a conference, a family of 4 with infants, and 2 transit passengers are awaiting seats. The panel gives 10 minutes to formulate a consensus policy.',
      am: 'አውሮፕላኑ በመቀየሩ ምክንያት 8 መንገደኞች ትርፍ ሆነዋል። 2 ዲፕሎማቶች፣ 3 የህክምና ባለሙያዎች፣ ህጻናት ያሉበት ባለ 4 አባል ቤተሰብ እና 2 መሸጋገሪያ ያላቸው መንገደኞች አሉ። ቡድኑ በ 10 ደቂቃ ውስጥ ፍትሃዊ መፍትሄ ማምጣት አለበት።',
      or: 'Xiyyaarri tokko namoota 8n guutee jira. Maatii daa\'imman qaban, ogeessota yaalaa fi imaltoota dabarsaa gidduutti akkamitti furmaata madaalawaa kennitu?',
      ti: 'ነፋሪት 8 ተጓዓዝቲ ተወሳኺ ኣለዉዋ። ስድራቤት፣ ሓካይምን ዲፕሎማታትን ኣለዉ። ብፍትሓዊ መንገዲ ከመይ ትፈትሕዎ?'
    },
    recommendedRoles: [
      'Timekeeper: "We have 10 minutes, let’s spend 2 minutes defining criteria, 5 minutes prioritizing, and 3 minutes on compensation."',
      'Synthesizer: "It sounds like we all agree that medical responders with urgent patient appointments must board first."',
      'Diplomatic Challenger: "That is a valid point, however, splitting the family with infants would violate duty of care."'
    ],
    keyStrategies: [
      'Never interrupt or talk over other candidates loudly',
      'Encourage quieter candidates by asking for their input by name',
      'Ground every decision in passenger safety, legal regulations, and airline loyalty reputation',
      'Propose creative solutions (e.g., proactive cash vouchers + premium lounge vouchers for willing volunteers)'
    ],
    winningStatements: {
      en: [
        '“Building on what Sarah mentioned, prioritizing the medical personnel ensures humanitarian care, while offering generous upgrade vouchers will incentivize solo transit volunteers.”',
        '“To keep our discussion productive within our 10-minute window, let us finalize our three-point recommendation for the station manager.”'
      ],
      am: [
        '“ሳራ ያነሳችውን ሀሳብ በማጠናከር፣ ለፈቃደኛ ተጓዦች ማራኪ ካሳ እና የሆቴል መስተንግዶ በማዘጋጀት ችግሩን በሰላም መፍታት እንችላለን።”'
      ],
      or: [
        '“Yaada kanaan walqabatee, namoota fedhiin hafan gargaarsa addaa fi beenyaa kennuufiin furmaata gaarii ta\'a.”'
      ],
      ti: [
        '“ናይ ኩላትና ሓሳብ ብምትእስሳር፡ ንፍቓደኛታት ተጓዓዝቲ ብቑዕ ካሳን ሆቴልን ብምሃብ ጸገም ክፍታሕ ይኽእል።”'
      ]
    },
    pitfallsToAvoid: [
      'Monopolizing the conversation or shouting to gain points',
      'Showing visible frustration or rolling eyes when someone disagrees',
      'Staying completely silent and not contributing',
      'Ignoring time constraints and failing to reach a final group conclusion'
    ]
  }
];
