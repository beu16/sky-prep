import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // =========================================================================
  // 1. CABIN CREW TRAINING SCHOOL
  // Program: CABIN CREW TRAINEE (AIRLINE-SPONSORED)
  // =========================================================================
  {
    id: 'int-1',
    category: 'Customer Service',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    isFreePreview: true,
    question: 'Describe a situation where you had to deal with an agitated or demanding passenger during a flight delay.',
    amharicQuestion: 'በረራ ሲዘገይ የተቀየመ ወይም የተናደደ ተሳፋሪን ያስተናገዱበትን ሁኔታ እና እንዴት እንደፈቱት ይግለጹ።',
    starFramework: {
      situation: 'During a 2-hour tarmac delay due to severe weather, a business class passenger became agitated about missing his connecting flight to London.',
      task: 'My goal was to de-escalate his frustration, keep him informed, and maintain a calm cabin environment without making unverified promises.',
      action: 'I actively listened with empathy, offered water and comfort items, and provided transparent updates directly relayed from the flight deck.',
      result: 'The passenger calmed down, thanked me for my honesty, and commended the cabin crew upon landing.'
    },
    keyPhrases: ['Active Listening', 'Empathy & Composure', 'Proactive Communication', 'De-escalation']
  },
  {
    id: 'int-2',
    category: 'Behavioral & Scenario',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    isFreePreview: true,
    question: 'How do you prioritize safety when passenger service demands clash with safety compliance before takeoff?',
    amharicQuestion: 'ከመነሳትዎ በፊት የተሳፋሪዎች መስተንግዶ ጥያቄ ከደህንነት ህግጋት ጋር ቢጋጭ ደህንነትን እንዴት ያስቀድማሉ?',
    starFramework: {
      situation: 'A passenger insisted on finishing a business call while the aircraft was taxiing for immediate departure.',
      task: 'I needed to enforce the mandatory flight deck safety signal while remaining polite and professional.',
      action: 'I firmly but respectfully explained that FAA/ICAO regulations require all electronic devices in flight mode before takeoff for aircraft communication safety.',
      result: 'The passenger immediately disconnected the call, secured the phone, and praised my clear explanation.'
    },
    keyPhrases: ['Safety First Discipline', 'Diplomatic Authority', 'Regulatory Compliance']
  },
  {
    id: 'int-3',
    category: 'Aviation Knowledge',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    isFreePreview: true,
    question: 'What immediate steps do you take if a passenger exhibits signs of medical distress (e.g. hyperventilation or chest pain) in-flight?',
    amharicQuestion: 'አንድ ተሳፋሪ በበረራ ላይ ድንገተኛ ህመም (እንደ የደረት ህመም ወይም የመተንፈስ ችግር) ቢገጥመው የሚያደርጉት የመጀመሪያ እርምጃ ምንድነው?',
    starFramework: {
      situation: 'An elderly passenger experienced acute shortness of breath and chest pressure mid-flight.',
      task: 'Execute first-aid protocol, notify the flight deck, and request medical assistance immediately.',
      action: 'I assigned crew members to retrieve the First Aid Kit and AED, alerted the Captain, and broadcast for medical professionals on board while administering oxygen.',
      result: 'A physician onboard stabilized the passenger until our priority landing was executed smoothly.'
    },
    keyPhrases: ['Medical Emergency Protocol', 'Crew Resource Management', 'Rapid Delegation']
  },
  {
    id: 'int-cc-4',
    category: 'Behavioral & Scenario',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    isFreePreview: false,
    question: 'Why do you want to work as a commercial airline cabin crew member specifically among all career paths?',
    amharicQuestion: 'ከሌሎች የስራ መስኮች ይልቅ ለበረራ አስተናጋጅነት ስራ መስራት ለምን መረጡ?',
    starFramework: {
      situation: 'Applying for a competitive Cabin Crew position at a major international airline.',
      task: 'Articulate genuine passion for commercial aviation heritage, global connectivity, and world-class service standards.',
      action: 'I highlighted the airline\'s growth as an international carrier, its safety culture, and my personal pride in delivering exceptional passenger hospitality worldwide.',
      result: 'The interview panel noted my strong alignment with company values and brand ambassadorship.'
    },
    keyPhrases: ['Brand Ambassadorship', 'Service Excellence', 'Hospitality Passion', 'Global Connectivity']
  },
  {
    id: 'int-cc-5',
    category: 'Customer Service',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    isFreePreview: false,
    question: 'How do you overcome language barriers when assisting non-English speaking passengers on international long-haul flights?',
    amharicQuestion: 'እንግሊዝኛ የማይናገሩ አለም አቀፍ ተሳፋሪዎችን በረጅም በረራ ላይ ሲያስተናግዱ የቋንቋ እንቅፋትን እንዴት ይወጡታል?',
    starFramework: {
      situation: 'A transit passenger at a busy international hub spoke limited English and was anxious about finding her seat and meal options.',
      task: 'Ensure clear communication, comfort, and safety without causing confusion or embarrassment.',
      action: 'I used pictorial meal cards, universal gentle hand gestures, mobile translation, and checked if any colleague onboard spoke her language.',
      result: 'The passenger felt reassured, selected her meal comfortably, and gave a warm smile of gratitude.'
    },
    keyPhrases: ['Non-Verbal Communication', 'Cultural Sensitivity', 'Resourcefulness & Empathy']
  },

  // =========================================================================
  // 2. PILOT TRAINING SCHOOL
  // Program: TRAINEE PILOT (AIRLINE-SPONSORED)
  // =========================================================================
  {
    id: 'int-plt-1',
    category: 'Aviation Knowledge',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    isFreePreview: true,
    question: 'Walk us through your decision-making process when encountering severe un-forecasted weather on final approach.',
    amharicQuestion: 'በማረፍ ወቅት ያልተጠበቀ አደገኛ የአየር ሁኔታ ቢገጥምዎ የመወሰን ሂደቱ እንዴት ነው?',
    starFramework: {
      situation: 'On final approach at 800 ft AGL, the aircraft experienced sudden wind shear and heavy precipitation causing airspeed fluctuations.',
      task: 'Ensure absolute aircraft energy safety and evaluate whether to execute a go-around.',
      action: 'I immediately announced "Go-Around, Flaps 20", set TOGA thrust, pitched for climb attitude, and coordinated with ATC for missed approach vectors.',
      result: 'Maintained safe terrain clearance, entered hold to evaluate weather, and safely landed on second approach after weather cleared.'
    },
    keyPhrases: ['Go-Around Discipline', 'TOGA Procedure', 'Situational Awareness', 'Risk Mitigation']
  },
  {
    id: 'int-plt-2',
    category: 'Leadership & Pressure',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    isFreePreview: false,
    question: 'How do you apply Crew Resource Management (CRM) when a co-pilot or crew member disagrees with your tactical flight plan?',
    amharicQuestion: 'የበረራ አጋርዎ (Co-pilot) በእቅድዎ ካልተስማማ Crew Resource Management (CRM) በመጠቀም እንዴት ይፈቱታል?',
    starFramework: {
      situation: 'My First Officer expressed hesitation regarding our fuel reserves for an alternate routing around a thunderstorm cell.',
      task: 'Foster an open cockpit environment where safety input is encouraged without ego.',
      action: 'I actively invited his calculation, cross-checked our FMC reserve predictions together, and mutually agreed on a safer wider detour.',
      result: 'Landed safely with 45 minutes above mandatory final reserve fuel, reinforcing flight deck trust.'
    },
    keyPhrases: ['Error-Free CRM', 'Assertive Advocacy', 'Non-Punitive Cockpit Culture']
  },
  {
    id: 'int-plt-3',
    category: 'Behavioral & Scenario',
    role: 'Pilot / Cadet',
    training_school: 'PILOT TRAINING SCHOOL',
    isFreePreview: false,
    question: 'Why do you believe you have the aptitude and psychological discipline to complete Commercial Airline Pilot Cadet Training?',
    amharicQuestion: 'የአየር መንገድ የአብራሪዎች ስልጠናን በብቃት ለማጠናቀቅ የሚያስችል ስነ-ልቦና እና ችሎታ አለኝ የሚሉበት ምክንያት ምንድነው?',
    starFramework: {
      situation: 'Facing an intensive ground school and simulator flight syllabus at an advanced Aviation Academy.',
      task: 'Demonstrate self-discipline, resilience under high mental workload, and passion for precision.',
      action: 'I provided examples of my strong STEM academic background, spatial reasoning discipline, and consistent focus during high-pressure situations.',
      result: 'Demonstrated readiness for the rigor of cadet flight lines and multi-crew coordination.'
    },
    keyPhrases: ['Mental Stamina', 'STEM & Spatial Acuity', 'Multi-Tasking Under Pressure']
  },

  // =========================================================================
  // 3. AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL (AMT)
  // Programs: AMT, A/C Mechanic, Powerplant, Avionics, Airframe, Structures, NDT
  // =========================================================================
  {
    id: 'int-amt-1',
    category: 'Aviation Knowledge',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    isFreePreview: true,
    question: 'How do you handle a situation where a flight is delayed and commercial pressure is applied to sign off an unverified component?',
    amharicQuestion: 'በረራው ስለዘገየ ያልተረጋገጠ የአውሮፕላን ክፍል እንድትፈርሙ ጫና ቢደረግብዎት ምን ያደርጋሉ?',
    starFramework: {
      situation: 'Operations requested immediate release of an aircraft with an unresolved hydraulic pressure transducer alert.',
      task: 'Uphold strict airworthiness standards regardless of commercial schedule pressures.',
      action: 'I refused to sign off until performing complete isolation tests per Maintenance Manual (AMM), identifying a damaged O-ring seal.',
      result: 'Replaced the seal within 25 minutes. Ensured 100% flight safety with zero in-flight incidents.'
    },
    keyPhrases: ['Airworthiness Integrity', 'AMM Compliance', 'Uncompromising Safety Standard']
  },
  {
    id: 'int-amt-2',
    category: 'Behavioral & Scenario',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    isFreePreview: false,
    question: 'Describe a complex troubleshooting accomplishment on a modern turbofan engine or avionics bus.',
    amharicQuestion: 'በዘመናዊ ሞተር ወይም አቪዮኒክስ ላይ ያከናወኑትን ውስብስብ የብልሽት ፍለጋ (Troubleshooting) ስራ ያብራሩ።',
    starFramework: {
      situation: 'An engine FADEC displayed intermittent channel fault codes during pre-flight diagnostics.',
      task: 'Identify root cause systematically without replacing expensive components unnecessarily.',
      action: 'Used multimeter and wiring diagram manuals to isolate pin corrosion inside a main harness connector.',
      result: 'Cleaned and pin-tested the connector, clearing the fault permanently and saving the airline high replacement costs.'
    },
    keyPhrases: ['Systematic Diagnostics', 'Wiring Diagram Mastery', 'Root Cause Analysis']
  },
  {
    id: 'int-amt-3',
    category: 'Leadership & Pressure',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    isFreePreview: false,
    question: 'What protocols do you enforce to ensure zero Foreign Object Debris (FOD) and 100% tool accountability in aircraft hangars?',
    amharicQuestion: 'በአውሮፕላን ጥገና ወቅት ምንም አይነት እቃ ወይም መሳሪያ እንዳይረሳ (FOD Prevention) ምን አይነት ጥንቃቄ ያደርጋሉ?',
    starFramework: {
      situation: 'Completing a major structural C-check inside the main Boeing 777 engine nacelle.',
      task: 'Guarantee that not a single tool, rivet, or washer is left inside the airframe or engine cowl.',
      action: 'I instituted strict shadow-board tool logging before and after the shift, and performed double independent torch inspections of all working cavities.',
      result: '100% tool reconciliation and zero FOD incidents during pre-flight engine run tests.'
    },
    keyPhrases: ['FOD Prevention', 'Shadow-Board Protocol', 'Independent Inspection Sign-Off']
  },

  // =========================================================================
  // 4. COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL
  // =========================================================================
  {
    id: 'int-grd-1',
    category: 'Leadership & Pressure',
    role: 'Ground Operations',
    training_school: 'COMMERCIAL AND GROUND SERVICE TRAINING SCHOOL',
    isFreePreview: true,
    question: 'How do you coordinate a 30-minute rapid turnaround for an inbound widebody flight?',
    amharicQuestion: 'የመጣን አውሮፕላን በ30 ደቂቃ ውስጥ አፅድቶ እና ነዳጅ ሞልቶ መልሶ ለማስነሳት (Turnaround) እንዴት ያስተባብራሉ?',
    starFramework: {
      situation: 'A flight arrived 45 minutes late, leaving only 30 minutes before the next departure window.',
      task: 'Synchronize ramp handling, baggage offload, catering, refueling, and boarding safely.',
      action: 'Conducted quick team briefing, deployed dual-bridge boarding, and maintained real-time radio communication across ground crews.',
      result: 'Achieved an on-time departure with zero safety compromises or lost baggage.'
    },
    keyPhrases: ['Ramp Safety Synchronization', 'On-Time Performance', 'Proactive Delegation']
  }
];
