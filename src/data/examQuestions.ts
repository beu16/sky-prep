import { ExamQuestion } from '../types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // =========================================================================
  // 1. CABIN CREW TRAINING SCHOOL
  // Programs: Initial Cabin Crew, Senior Cabin Crew, VIP/Executive, Safety & Emergency
  // =========================================================================
  {
    id: 'cc-1',
    category: 'English',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'During boarding, a passenger refuses to stow their heavy handbag under the seat or in the overhead bin. Which response demonstrates professional airline courtesy and authority?',
    amharicQuestion: 'ተሳፋሪው ቦርሳውን ከመቀመጫው ስር ወይም ከላይ ሳጥን ውስጥ ለማስቀመጥ ፈቃደኛ ካልሆነ የትኛው አነጋገር ሙያዊ ጨዋነትን እና ህግን ያሳያል?',
    options: [
      '"For your safety and aviation regulations, all taxiways and aisle exits must remain clear in case of emergency. May I assist you in securing it?"',
      '"You have to put it away right now or I will tell the captain to remove you from this flight."',
      '"Just keep it on your lap until we take off and then put it down on the aisle floor."',
      '"If you do not want to follow rules, airline travel is not suitable for you."'
    ],
    amharicOptions: [
      '"ለደህንነትዎ እና ለአቪዬሽን ህግጋት ሲባል የመተላለፊያ መንገዶች ክፍት መሆን አለባቸው። እንዳስቀምጥልዎ ላግዝዎት?"',
      '"አሁኑኑ ካላስቀመጡ ካፒቴኑ ከበረራው እንዲያወጣዎት አደርጋለሁ።"',
      '"እስክንነሳ ድረስ እቅፍዎ ላይ ያድርጉትና ከዚያ ወለሉ ላይ ያስቀምጡት።"',
      '"ህጉን መከተል ካልፈለጉ በረራ ለእርስዎ አይሆንም።"'
    ],
    correctIndex: 0,
    explanation: 'Professional cabin crew combine regulatory safety compliance with polite, solution-oriented assistance and empathy.',
    amharicExplanation: 'ሙያዊ የበረራ አስተናጋጆች የደህንነት ህግጋትን በአክብሮት እና ተሳፋሪን በመርዳት መንፈስ ያስፈጽማሉ።'
  },
  {
    id: 'cc-2',
    category: 'Aviation Safety & Regulations',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'What is the maximum target time allotted for a full emergency evacuation of a commercial transport aircraft in accordance with ICAO / FAA standards?',
    amharicQuestion: 'በዓለም አቀፍ የአቪዬሽን ህግ (ICAO/FAA) መሰረት የአደጋ ጊዜ የተሳፋሪዎች ሙሉ ማውጣት (Evacuation) በስንት ሰከንድ ውስጥ መጠናቀቅ አለበት?',
    options: [
      '90 seconds with 50% of exits available',
      '180 seconds with all doors open',
      '60 seconds under full runway lighting',
      '120 seconds using all slide rafts'
    ],
    amharicOptions: [
      'በ 90 ሰከንድ ውስጥ (50% የሚሆኑት በሮች ብቻ ቢሰሩ እንኳን)',
      'በ 180 ሰከንድ ውስጥ (ሁሉም በሮች ክፍት ሆነው)',
      'በ 60 ሰከንድ ውስጥ (ሙሉ የመብራት አቅርቦት እያለ)',
      'በ 120 ሰከንድ ውስጥ'
    ],
    correctIndex: 0,
    explanation: 'Standard certification requires a full commercial aircraft evacuation within 90 seconds using only half the emergency exits.',
    amharicExplanation: 'ዓለም አቀፍ የአቪዬሽን ማረጋገጫ መስፈርት ግማሹ የአደጋ ጊዜ በሮች ብቻ ቢሰሩ እንኳን በ90 ሰከንድ ውስጥ ተሳፋሪዎችን ማስወጣትን ይጠይቃል።'
  },
  {
    id: 'cc-3',
    category: 'Aviation Safety & Regulations',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'In the event of sudden cabin depressurization at 35,000 feet, what is the immediate first action of a cabin crew member?',
    amharicQuestion: 'በ 35,000 ጫማ ከፍታ ላይ ድንገተኛ የካቢን አየር ግፊት መቀነስ (Depressurization) ቢያጋጥም የበረራ አስተናጋጅ የመጀመሪያው አስቸኳይ እርምጃ ምንድነው?',
    options: [
      'Immediately don the nearest oxygen mask and secure yourself before assisting others',
      'Rush through the cabin shouting instructions to all passengers',
      'Call the flight deck on the interphone to ask what happened',
      'Begin serving water to passengers experiencing hypoxia'
    ],
    amharicOptions: [
      'ወዲያውኑ በአቅራቢያ የሚገኘውን የኦክስጅን ማስክ በማድረግ እራስን ማዳንና ማስጠበቅ',
      'ወደ ካቢኑ በመሮጥ ለተሳፋሪዎች መመሪያዎችን መጮህ',
      'ወደ አብራሪው በመደወል ምን እንደተፈጠረ መጠየቅ',
      'የመተንፈስ ችግር ላጋጠማቸው ውሃ ማደል መጀመር'
    ],
    correctIndex: 0,
    explanation: 'Time of Useful Consciousness (TUC) at 35,000 ft is only 30-60 seconds. Crew must secure their own oxygen mask first to avoid losing consciousness.',
    amharicExplanation: 'በከፍተኛ ከፍታ ላይ ያለ ኦክስጅን ሰው በ30-60 ሰከንድ ውስጥ ራሱን ስለሚስት፤ አስተናጋጁ በመጀመሪያ የራሱን ማስክ ማድረግ አለበት።'
  },
  {
    id: 'cc-4',
    category: 'English',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'Select the sentence that demonstrates correct aviation terminology and grammar:',
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
    id: 'cc-5',
    category: 'Customer & Flight Operations',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
    question: 'A passenger in seat 14B exhibits symptoms of severe choking and cannot cough or speak. What emergency first-aid protocol should you apply?',
    amharicQuestion: 'በመቀመጫ 14B ላይ ያለ ተሳፋሪ ምግብ ታንቆ መናገር እና ማሳል ቢያቅተው ምን አይነት የመጀመሪያ ህክምና እርዳታ ይሰጣል?',
    options: [
      'Deliver up to 5 back blows followed by 5 abdominal thrusts (Heimlich maneuver)',
      'Give the passenger a glass of hot water to wash down the blockage',
      'Have the passenger lie down flat and perform chest compressions immediately',
      'Administer supplemental oxygen at 4 liters per minute'
    ],
    amharicOptions: [
      '5 የጀርባ ምቶች በመስጠት እና የሆድ እምብርት ግፊት (Heimlich maneuver) በማድረግ የታነቀውን ማስወጣት',
      'የታነቀውን እንዲያወርድ የሞቀ ውሃ መስጠት',
      'ተኛ አድርጎ የደረት ግፊት (CPR) መጀመር',
      'ኦክስጅን በ 4 ሊትር በደቂቃ መስጠት'
    ],
    correctIndex: 0,
    explanation: 'For conscious choking victims with severe airway obstruction, alternating 5 firm back blows with 5 abdominal thrusts is standard protocol.',
    amharicExplanation: 'ሰው ሳያውቅ ሳይስት ምግብ ሲያንቀው 5 የጀርባ ምት እና 5 የሆድ መጫን (Heimlich) ዘዴ መጠቀም አለም አቀፍ ህግ ነው።'
  },
  {
    id: 'cc-6',
    category: 'General Knowledge',
    role: 'Cabin Crew',
    training_school: 'CABIN CREW TRAINING SCHOOL',
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

  // =========================================================================
  // 2. PILOT TRAINING SCHOOL
  // Programs: Commercial Pilot (CPL/Cadet), Multi-Engine & Instrument, ATP, Basic Ground
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

  // =========================================================================
  // 3. AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL (AMT)
  // Programs: A/C Mechanic, Maintenance Technician, Powerplant, Structure, Avionics, Airframe
  // =========================================================================
  {
    id: 'amt-1',
    category: 'Technical Aptitude',
    role: 'Aircraft Maintenance (AMT)',
    training_school: 'AIRCRAFT MAINTENANCE TECHNICIAN TRAINING SCHOOL',
    question: 'In a modern turbofan gas turbine engine, what is the primary function of the bypass air flowing through the outer fan duct?',
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
  }
];
