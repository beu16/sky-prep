import { ExamQuestion } from '../types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // --- ENGLISH GRAMMAR & VOCABULARY (Cabin Crew & General) ---
  {
    id: 'eng-1',
    category: 'English',
    role: 'Cabin Crew',
    question: 'Choose the sentence that demonstrates correct aviation terminology and grammar:',
    amharicQuestion: 'ትክክለኛውን የአቪዬሽን ቋንቋ አጠቃቀም እና ሰዋሰው የያዘውን ዓረፍተ ነገር ይምረጡ፡',
    options: [
      'The flight crew was forced to divert due to adverse weather conditions.',
      'The flight crew was forced to convert due to adverse weather conditions.',
      'The flight crew was forced to revert due to adverse weather conditions.',
      'The flight crew was forced to advert due to adverse weather conditions.'
    ],
    amharicOptions: [
      'በረራው በአስቸጋሪ የአየር ሁኔታ ምክንያት ወደ ሌላ ማረፊያ (divert) ለማድረግ ተገደደ።',
      'በረራው በአስቸጋሪ የአየር ሁኔታ ምክንያት convert ለማድረግ ተገደደ።',
      'በረራው በአስቸጋሪ የአየር ሁኔታ ምክንያት revert ለማድረግ ተገደደ።',
      'በረራው በአስቸጋሪ የአየር ሁኔታ ምክንያት advert ለማድረግ ተገደደ።'
    ],
    correctIndex: 0,
    explanation: 'In aviation, "divert" means to alter the course or destination of an aircraft, especially due to unexpected weather or emergency.',
    amharicExplanation: 'በአቪዬሽን "divert" ማለት በድንገተኛ አየር ሁኔታ ወይም በቴክኒክ ምክንያት የአውሮፕላኑን የማረፊያ አቅጣጫ መቀየር ማለት ነው።'
  },
  {
    id: 'eng-2',
    category: 'English',
    role: 'Ground Operations',
    question: 'Select the synonym for the word "Punctual" as expected in airline operations:',
    amharicQuestion: 'በአየር መንገድ ስራዎች ውስጥ "Punctual" ለሚለው ቃል ተመሳሳይ ትርጉም ያለው የትኛው ነው?',
    options: [
      'Flexible',
      'Prompt / On-time',
      'Precarious',
      'Hesitant'
    ],
    correctIndex: 1,
    explanation: '"Punctual" means arriving or happening at the arranged time. In airlines, punctual operations are critical to maintain flight schedules.',
    amharicExplanation: '"Punctual" ማለት በሰዓቱ የሚገኝ ወይም በታቀደው ሰዓት ስራውን የሚያከናውን ማለት ነው።'
  },
  {
    id: 'eng-3',
    category: 'English',
    role: 'Cabin Crew',
    question: 'Fill in the blank: "All cabin crew members must __________ strict safety standards during emergency procedures."',
    amharicQuestion: 'ባዶ ቦታውን ይሙሉ: "All cabin crew members must __________ strict safety standards during emergency procedures."',
    options: [
      'adhere to',
      'comply withing',
      'abide on',
      'follow into'
    ],
    correctIndex: 0,
    explanation: 'The idiom "adhere to" means to follow or conform strictly to rules or guidelines.',
    amharicExplanation: '"adhere to" ማለት ህጎችን እና መመሪያዎችን በጥብቅ መከተል ማለት ነው።'
  },
  {
    id: 'eng-4',
    category: 'English',
    role: 'Pilot / Cadet',
    question: 'Identify the antonym of "Turbulent":',
    amharicQuestion: 'የ "Turbulent" (የተናወጠ/የታወከ) ተቃራኒ ቃል የትኛው ነው?',
    options: [
      'Agitated',
      'Tranquil / Calm',
      'Chaotic',
      'Rigid'
    ],
    correctIndex: 1,
    explanation: '"Turbulent" describes rough, unstable conditions. "Tranquil" or "Calm" represents smooth, undisturbed conditions.',
    amharicExplanation: '"Tranquil / Calm" ማለት ፀጥ ያለ እና የተረጋጋ የአየር ሁኔታ ማለት ነው።'
  },
  {
    id: 'eng-5',
    category: 'English',
    role: 'Aircraft Maintenance (AMT)',
    question: 'Which word correctly completes the maintenance log entry: "The maintenance engineer inspected the hydraulic lines and found no __________ leaks."',
    amharicQuestion: 'የትኛው ቃል ዓረፍተ ነገሩን ያጠናቅቃል፡ "The maintenance engineer inspected the hydraulic lines and found no __________ leaks."',
    options: [
      'perceptible',
      'percepting',
      'perceptual',
      'perceptively'
    ],
    correctIndex: 0,
    explanation: '"Perceptible" is an adjective meaning noticeable or able to be seen/detected.',
    amharicExplanation: '"Perceptible" ማለት በግልፅ የሚታይ ወይም የሚታወቅ ማለት ነው።'
  },

  // --- NUMERICAL REASONING (Pilots, AMT & Ops) ---
  {
    id: 'num-1',
    category: 'Numerical Reasoning',
    role: 'Pilot / Cadet',
    question: 'A Boeing 787 Dreamliner burns approximately 5,400 kg of fuel per hour in cruise flight. How much fuel is burned during a 6.5-hour international flight?',
    amharicQuestion: 'አንድ ቦይንግ 787 አውሮፕላን በሰአት 5,400 ኪ.ግ ነዳጅ ይጠቀማል። ለ 6.5 ሰአት በረራ ምን ያህል ነዳጅ ያስፈልጋል?',
    options: [
      '32,100 kg',
      '35,100 kg',
      '37,400 kg',
      '34,800 kg'
    ],
    correctIndex: 1,
    explanation: '5,400 kg/hr × 6.5 hrs = 35,100 kg.',
    amharicExplanation: '5,400 ኪ.ግ × 6.5 ሰአት = 35,100 ኪ.ግ ነዳጅ።'
  },
  {
    id: 'num-2',
    category: 'Numerical Reasoning',
    role: 'Ground Operations',
    question: 'An aircraft departs the capital hub airport at 08:45 AM local time on a 4-hour flight. If the destination is 2 hours ahead in time zone, what local time does it land?',
    amharicQuestion: 'አንድ አውሮፕላን ጠዋት 08:45 ላይ ተነስቶ ለ4 ሰአት ይበራል። ማረፊያው ከነበረበት ቦታ በ2 ሰአት የሚቀድም ከሆነ በቦታው ስንት ሰአት ይደርሳል?',
    options: [
      '12:45 PM',
      '01:45 PM',
      '02:45 PM',
      '03:45 PM'
    ],
    correctIndex: 2,
    explanation: 'Departure 08:45 + 4 hours duration = 12:45 PM (origin time). Adding 2 hours time zone shift = 02:45 PM destination local time.',
    amharicExplanation: '08:45 + 4 ሰአት የበረራ ጊዜ = 12:45 ከሰአት። የ2 ሰአት የሰአት ቀጣና ልዩነት ሲደመርበት = 02:45 PM ይደርሳል።'
  },
  {
    id: 'num-3',
    category: 'Numerical Reasoning',
    role: 'Aircraft Maintenance (AMT)',
    question: 'An aircraft landing gear component requires torque specification of 150 Nm. If a wrench calibration is off by +8%, what torque reading should be applied on the torque tool?',
    amharicQuestion: 'የአውሮፕላን እግር ብሎን 150 Nm ቶርክ ይፈልጋል። የቶርክ መለኪያው በ +8% የሚበልጥ ከሆነ በመሳሪያው ላይ ስንት መነበብ አለበት?',
    options: [
      '138.9 Nm',
      '162.0 Nm',
      '142.0 Nm',
      '158.0 Nm'
    ],
    correctIndex: 1,
    explanation: '150 Nm × 1.08 = 162.0 Nm.',
    amharicExplanation: '150 × 1.08 = 162.0 Nm.'
  },
  {
    id: 'num-4',
    category: 'Numerical Reasoning',
    role: 'Cabin Crew',
    question: 'A flight carries 240 passengers. If 15% requested vegetarian meals, 25% requested chicken, and the remaining selected beef, how many passengers chose beef?',
    amharicQuestion: 'በአንድ በረራ ላይ 240 ተሳፋሪዎች አሉ። 15% የቪጂቴሪያን፣ 25% የዶሮ ምግብ ቢመርጡ፤ ቀሪዎቹ የበሬ ምግብ የመረጡት ስንት ተሳፋሪዎች ናቸው?',
    options: [
      '120 passengers',
      '144 passengers',
      '96 passengers',
      '108 passengers'
    ],
    correctIndex: 1,
    explanation: 'Vegetarian (15%) + Chicken (25%) = 40%. Remaining for beef = 60%. 240 × 0.60 = 144 passengers.',
    amharicExplanation: '40% ሌላ ከመረጡ ቀሪው 60% ነው። 240 × 0.60 = 144 ተሳፋሪዎች።'
  },

  // --- VERBAL REASONING ---
  {
    id: 'verb-1',
    category: 'Verbal Reasoning',
    role: 'Cabin Crew',
    question: 'Read the statement: "In the event of cabin depressurization, flight attendants must immediately secure their own oxygen masks before assisting passengers." What logical inference is guaranteed?',
    amharicQuestion: 'ምን ይረዳል: "የአየር ግፊት በካቢን ውስጥ ቢቀንስ አስተናጋጆች ለሌሎች ከመስጠታቸው በፊት የራሳቸውን የኦክስጅን ማስክ ማድረግ አለባቸው።"',
    options: [
      'Passengers are incapable of putting on their own oxygen masks.',
      'Flight attendants cannot safely assist others if they become incapacitated by hypoxia.',
      'Oxygen masks operate automatically only for crew members.',
      'Depressurization only occurs during high altitude cruising flight.'
    ],
    correctIndex: 1,
    explanation: 'Securing one\'s own mask first ensures the crew member remains conscious to help others effectively.',
    amharicExplanation: 'አስተናጋጁ መጀመሪያ ማስክ የማያደርግ ከሆነ ራሱን ስቶ ሌሎችን መረዳት አይችልም።'
  },
  {
    id: 'verb-2',
    category: 'Verbal Reasoning',
    role: 'Pilot / Cadet',
    question: 'If all commercial pilots must undergo bi-annual simulator checkrides, and Captain Samuel completed a checkride 4 months ago, which statement MUST be true?',
    amharicQuestion: 'ሁሉም የንግድ አውሮፕላን አብራሪዎች በየ6 ወሩ በሲሙሌተር መፈተን ካለባቸው እና ካፒቴን ሳሙኤል ከ4 ወር በፊት ከተፈተነ የትኛው እውነት ነው?',
    options: [
      'Captain Samuel is due for another checkride in 2 months.',
      'Captain Samuel does not need to fly for the next 2 months.',
      'Captain Samuel has failed his previous simulator checkride.',
      'Captain Samuel is exempt from annual medical exams.'
    ],
    correctIndex: 0,
    explanation: 'Bi-annual checkride means every 6 months. Having completed one 4 months ago leaves 2 months until the next checkride.',
    amharicExplanation: 'በየ6 ወሩ ከሆነ እና 4 ወር ካለፈው የሚቀረው 2 ወር ብቻ ነው።'
  },
  {
    id: 'verb-3',
    category: 'Verbal Reasoning',
    role: 'Aircraft Maintenance (AMT)',
    question: 'Statement: "No maintenance release can be issued unless all Deferred Maintenance Items (DMI) comply with the Minimum Equipment List (MEL)." Which conclusion follows strictly?',
    amharicQuestion: 'የትኛው መደምደሚያ ትክክል ነው: "ሁሉም የዘገዩ የጥገና ክፍሎች ከMEL ህግ ጋር ካልተስማሙ በስተቀር አውሮፕላኑ ለበረራ አይለቀቅም።"',
    options: [
      'An aircraft with unaddressed MEL non-compliant items cannot receive a maintenance release.',
      'All maintenance items can be deferred indefinitely.',
      'The MEL is determined solely by the lead line technician.',
      'Maintenance releases are only required for international long-haul flights.'
    ],
    correctIndex: 0,
    explanation: 'If MEL compliance is a strict condition for release, any non-compliance blocks the release.',
    amharicExplanation: 'ከMEL ህግ ውጭ የሆነ ብልሽት ካለ አውሮፕላኑ መብረር አይችልም።'
  },

  // --- AVIATION KNOWLEDGE (Pilot, AMT, Cabin Crew & Ground) ---
  {
    id: 'gen-1',
    category: 'General Knowledge',
    role: 'Pilot / Cadet',
    question: 'What does the standard aviation acronym "ICAO" stand for?',
    amharicQuestion: 'የአቪዬሽን ምህፃረ ቃል "ICAO" ሙሉ ትርጉም ምንድን ነው?',
    options: [
      'International Civil Aviation Organization',
      'International Commercial Aircraft Operation',
      'Intercontinental Cabin Air Officer',
      'Integrated Control Aviation Overview'
    ],
    correctIndex: 0,
    explanation: 'ICAO stands for International Civil Aviation Organization, the UN specialized agency for global aviation safety and standards.',
    amharicExplanation: 'ICAO ማለት International Civil Aviation Organization (ዓለም አቀፍ የሲቪል አቪዬሽን ድርጅት) ማለት ነው።'
  },
  {
    id: 'gen-2',
    category: 'General Knowledge',
    role: 'Cabin Crew',
    question: 'Which piece of emergency equipment on commercial aircraft is designed specifically to assist passengers in smoke-filled cabin evacuations?',
    amharicQuestion: 'በጢስ የተሞላ አየር ለመተንፈስ እና ከካቢን ለማመልጥ የሚረዳው የደህንነት መሳሪያ የትኛው ነው?',
    options: [
      'Protective Breathing Equipment (PBE / Smoke Hood)',
      'Crash Axe',
      'Megaphone',
      'ELT Emergency Locator Transmitter'
    ],
    correctIndex: 0,
    explanation: 'PBE (Protective Breathing Equipment) or Smoke Hood provides breathable oxygen to crew members while operating in smoke or toxic fumes.',
    amharicExplanation: 'PBE (Protective Breathing Equipment) አስተናጋጆች በጢስ ውስጥ ኦክስጅን አግኝተው ስራቸውን እንዲሰሩ ይረዳል።'
  },
  {
    id: 'gen-3',
    category: 'General Knowledge',
    role: 'Aircraft Maintenance (AMT)',
    question: 'In jet engine operation, what is the primary function of the turbine section located downstream of the combustion chamber?',
    amharicQuestion: 'በጄት ሞተር ውስጥ ከኮምበስሽን ቻምበር በኋላ ያለው የተርባይን (Turbine) ዋነኛ ተግባር ምንድነው?',
    options: [
      'To extract energy from hot expanding gases to drive the compressor and fan shafts',
      'To compress incoming cold atmospheric air before ignition',
      'To store reserve hydraulic fluid for thrust reversers',
      'To filter fuel contamination before injection'
    ],
    correctIndex: 0,
    explanation: 'The turbine extracts thermal and kinetic energy from high-velocity combustion gases to drive the compressor, fan, and engine accessories.',
    amharicExplanation: 'ተርባይን ከተቃጠለው ሙቅ አየር ጉልበት በመውሰድ ኮምፕረሰሩን እና ፋኑን ያሸከረክራል።'
  },
  {
    id: 'gen-4',
    category: 'General Knowledge',
    role: 'Ground Operations',
    question: 'What is the standard IATA code for Dangerous Goods Regulations governing air cargo transport?',
    amharicQuestion: 'አደገኛ ቁሳቁሶችን በአየር ለመጓጓዝ የሚያገለግለው የIATA መመሪያ ምንድን ነው?',
    options: [
      'DGR (Dangerous Goods Regulations)',
      'NOTAM (Notice to Airmen)',
      'METAR (Meteorological Aerodrome Report)',
      'ATC (Air Traffic Control)'
    ],
    correctIndex: 0,
    explanation: 'IATA DGR (Dangerous Goods Regulations) is the global standard for shipping hazardous materials safely by air.',
    amharicExplanation: 'DGR ማለት አደገኛ ቁሳቁሶችን በአውሮፕላን በጥንቃቄ የማጓጓዣ መመሪያ ነው።'
  },
  {
    id: 'gen-5',
    category: 'General Knowledge',
    role: 'Pilot / Cadet',
    question: 'What weather phenomenon causes a sudden, violent shift in wind speed and direction, posing critical hazard during takeoff and landing approaches?',
    amharicQuestion: 'በማረፍ እና በመነሳት ወቅት ለአውሮፕላን በጣም አደገኛ የሆነው የንፋስ አቅጣጫ እና ፍጥነት ድንገተኛ መቀያየር ምንድን ነው?',
    options: [
      'Microburst / Wind Shear',
      'Cirrus Cloud Formation',
      'Thermal Inversion',
      'Trade Wind Drift'
    ],
    correctIndex: 0,
    explanation: 'Microbursts and low-level wind shear cause rapid loss of airspeed and lift, making them extremely dangerous during low-altitude maneuvers.',
    amharicExplanation: 'Wind Shear / Microburst ድንገተኛ የንፋስ ሀይል እና አቅጣጫ መቀየር በመፍጠር አውሮፕላኑን ለአደጋ ይዳርጋል።'
  },
  // --- ETHIOPIAN AIRLINES SPECIFIC RECRUITMENT QUESTIONS ---
  {
    id: 'et-1',
    category: 'General Knowledge',
    role: 'Cabin Crew',
    question: 'What is the main hub airport and IATA 3-letter code for Ethiopian Airlines?',
    amharicQuestion: 'የኢትዮጵያ አየር መንገድ ዋና መነሻ ማዕከል (Hub) ኤርፖርት እና የ IATA ኮድ የትኛው ነው?',
    options: [
      'Addis Ababa Bole International Airport (ADD)',
      'Nairobi Jomo Kenyatta Airport (NBO)',
      'Cairo International Airport (CAI)',
      'Johannesburg OR Tambo Airport (JNB)'
    ],
    correctIndex: 0,
    explanation: 'Addis Ababa Bole International Airport (IATA: ADD) is the primary hub of Ethiopian Airlines, connecting over 130 international destinations.',
    amharicExplanation: 'የኢትዮጵያ አየር መንገድ ዋና ማዕከል አዲስ አበባ ቦሌ ዓለም አቀፍ ኤርፖርት (ADD) ነው።'
  },
  {
    id: 'et-2',
    category: 'General Knowledge',
    role: 'Cabin Crew',
    question: 'Which global airline alliance did Ethiopian Airlines officially join in December 2011?',
    amharicQuestion: 'የኢትዮጵያ አየር መንገድ በዲሴምበር 2011 የትኛውን ዓለም አቀፍ የአየር መንገድ ጥረት (Alliance) ተቀላቀለ?',
    options: [
      'Star Alliance',
      'SkyTeam',
      'Oneworld',
      'Arab Air Carriers Organization'
    ],
    correctIndex: 0,
    explanation: 'Ethiopian Airlines officially became the 28th member of Star Alliance in December 2011.',
    amharicExplanation: 'የኢትዮጵያ አየር መንገድ በ2011 እ.ኤ.አ የስታር አሊያንስ (Star Alliance) አባል ሆኗል።'
  },
  {
    id: 'et-3',
    category: 'Numerical Reasoning',
    role: 'Ground Operations',
    question: 'A passenger traveling on Ethiopian Airlines has 28 kg of luggage. If the free allowance is 23 kg and excess baggage fee is 350 ETB per excess kg, how much must the passenger pay?',
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
  },
  {
    id: 'et-4',
    category: 'English',
    role: 'Cabin Crew',
    question: 'Select the sentence with the correct preposition: "Passengers are kindly requested to remain seated __________ the seatbelt sign is turned off."',
    amharicQuestion: 'ትክክለኛውን ቃል ይምረጡ: "Passengers are kindly requested to remain seated __________ the seatbelt sign is turned off."',
    options: [
      'until',
      'since',
      'during',
      'alongside'
    ],
    correctIndex: 0,
    explanation: '"Until" indicates continuing in a state up to the specified time when the seatbelt sign is extinguished.',
    amharicExplanation: '"until" (እስከሚጠፋ ድረስ) የሚለው ቃል ትክክለኛው ሰዋሰዋዊ አጠቃቀም ነው።'
  }
];
