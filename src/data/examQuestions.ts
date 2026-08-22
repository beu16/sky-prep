import { ExamQuestion } from '../types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // Cabin Crew Questions
  {
    id: 'cc_01',
    school: 'cabin_crew',
    category: 'safety_security',
    question: {
      en: 'During passenger boarding, you observe an anxious passenger with a carry-on bag partially blocking the emergency exit row. What is your immediate and correct action?',
      am: 'ተሳፋሪዎች ሲገቡ አንድ የተጨነቀ መንገደኛ የእጅ ቦርሳውን በድንገተኛ መውጫ ረድፍ ላይ ከፊል ዘግቶት ተመለከቱ። ፈጣን እና ትክክለኛ እርምጃዎ ምንድነው?',
      or: 'Yeroo imaltoonni seenan, imalaan tokko boorsaa harkaatiin karra balaa cufuuf yoo jedhu argitan, tarkaanfiin keessan maali?',
      ti: 'ተጓዓዝቲ ኣብ ዝኣትዉሉ ግዜ፡ ሓደ ተጓዓዚ ቦርሳኡ ኣብ ናይ ሓደጋ መውጺ ቦታ ዓጽይዎ እንተሪኢኹም፡ እንታይ ትገብሩ?'
    },
    options: {
      en: [
        'Politely explain aviation regulations, assist them in stowing the bag in the overhead locker, and assess their exit-row readiness.',
        'Ignore the bag until the aircraft doors are fully closed and cross-checked.',
        'Immediately demand that the passenger swap seats to the back without explanation.',
        'Place the bag under the seat in front of the emergency exit row.'
      ],
      am: [
        'የአቪዬሽን ህጉን በጨዋነት በማስረዳት ቦርሳውን ከላይ ባለው ሻንጣ ማስቀመጫ እንዲያደርጉ መርዳት እና ለመውጫ ዝግጁነታቸውን ማረጋገጥ።',
        'የአውሮፕላኑ በር እስኪዘጋ ድረስ ቦርሳውን ችላ ማለት።',
        'መንገደኛው ያለምንም ማብራሪያ ወዲያውኑ ወደ ኋላ ወንበር እንዲቀየር ማስገደድ።',
        'ቦርሳውን ከድንገተኛ መውጫ ወንበር ስር ማስቀመጥ።'
      ],
      or: [
        'Seera aviyeeshinii ibsuun boorsaa iddoo isaatti akka kaa\'an gargaaruu fi qophiin karra balaa isaanii mirkaneessuu.',
        'Hanga balballi cufamutti boorsaa dhiisuu.',
        'Osoo hin ibsin imalticha gara duubaatti jijjiiruu.',
        'Boorsaa jala karra balaatti kaa\'uu.'
      ],
      ti: [
        'ሕጊ ኣቪየሽን ብትሕትና ብምግላጽ ቦርሳ ኣብ ናይ ላዕሊ ቦታ ክቐምጥ ምሕጋዝን ድልውነቶም ምፍታሽን።',
        'ማዕጾ ነፋሪት ክሳብ ዝዕጾ ሸለል ምባል.',
        'ብዘይ መብርሂ ናብ ድሕሪት መንበር ክቕየር ምግባር.',
        'ቦርሳ ትሕቲ መንበር ናይ ሓደጋ መውጺ ምቕማጥ.'
      ]
    },
    correctAnswer: 0,
    explanation: {
      en: 'International aviation safety rules require all emergency exit pathways to remain 100% unobstructed during taxi, takeoff, and landing.',
      am: 'በአለም አቀፍ የአቪዬሽን ደንብ መሰረት በድንገተኛ መውጫ አካባቢ ምንም አይነት ሻንጣ ወይም እንቅፋት መኖር ፈጽሞ የተከለከለ ነው።',
      or: 'Akka seera idil-addunyaatti karaan balaa yeroo hunda qulqulluu fi banaa ta\'uu qaba.',
      ti: 'ብመሰረት ዓለም-ለኸ ሕጊ ኣቪየሽን፡ ናይ ሓደጋ መውጺ መስመር ብፍጹም ክዕጾ የብሉን።'
    },
    audioText: 'International aviation safety rules strictly mandate that all emergency exit pathways remain 100% unobstructed.'
  },
  {
    id: 'cc_02',
    school: 'cabin_crew',
    category: 'aviation_knowledge',
    question: {
      en: 'What is the minimum pressure threshold indication for the portable Halon Fire Extinguisher pre-flight inspection?',
      am: 'ከበረራ በፊት በሚደረግ ፍተሻ ተንቀሳቃሽ የሃሎን እሳት ማጥፊያ የፕሬዠር መለኪያ በየትኛው ዞን ውስጥ መሆን አለበት?',
      or: 'Qorannoo balalii duraatiin meeshaan ibidda dhaamsu (Halon) qajeelfama kam keessatti argamuu qaba?',
      ti: 'ቅድሚ በረራ ዝግበር ፍተሻ ናይ ሃሎን ሓዊ መጥፍኢ ኣብ ምንታይ ደረጃ ክኸውን ኣለዎ?'
    },
    options: {
      en: [
        'The pressure gauge needle must be firmly inside the GREEN operating zone.',
        'The pressure gauge needle should point to the RED refill zone.',
        'The safety pin should be removed and left unsealed.',
        'The gauge reading does not matter as long as the cylinder is full.'
      ],
      am: [
        'የፕሬዠር መርፌው በአረንጓዴው (GREEN) ትክክለኛ የስራ ክልል ውስጥ መሆን አለበት።',
        'የፕሬዠር መርፌው በቀዩ (RED) ውስጥ መሆን አለበት።',
        'የደህንነት ፒኑ ተነስቶ ክፍት መሆን አለበት።',
        'ሲሊንደሩ እስካለ ድረስ የፕሬዠሩ ንባብ አያስፈልግም።'
      ],
      or: [
        'Kallattiin safartuu halluu MAGARIISA (Green) keessa ta\'uu qaba.',
        'Halluu DIIMA keessa ta\'uu qaba.',
        'Piniin nageenyaa buqqifamuu qaba.',
        'Safartuun barbaachisaa miti.'
      ],
      ti: [
        'ናይ ፕሬዠር መርፍእ ኣብ ቀጠልያ (GREEN) ዞን ክኸውን ኣለዎ።',
        'ናይ ፕሬዠር መርፍእ ኣብ ቀይሕ (RED) ክኸውን ኣለዎ።',
        'ፒን ደሕንነት ተፈቲሑ ክተርፍ ኣለዎ።',
        'መለክዒ ኣድላዪ ኣይኮነን።'
      ]
    },
    correctAnswer: 0,
    explanation: {
      en: 'Pre-flight equipment check mandates that Halon and BCF extinguishers have their safety pin intact with wire seal, and the pressure needle strictly positioned in the green arc.',
      am: 'ከበረራ በፊት የሚደረግ የደህንነት ፍተሻ የሃሎን እሳት ማጥፊያ የደህንነት ሽቦው ያልተበጠሰ እና መርፌው በአረንጓዴው ዞን ላይ መሆኑን ማረጋገጥ ግዴታ ነው።',
      or: 'Qorannoo balalii duraa irratti piniin eegumsaa jiraachuu fi safartuun magariisa keessa ta\'uun dirqama.',
      ti: 'ቅድሚ በረራ ዝግበር ናይ ደሕንነት ፍተሻ መርፍእ ኣብ ቀጠልያ ዞን ምዃኑ ምርግጋጽ ኣድላዪ እዩ።'
    }
  },
  {
    id: 'cc_03',
    school: 'cabin_crew',
    category: 'situational_judgment',
    question: {
      en: 'A passenger reports feeling lightheaded and short of breath at 36,000 feet. What is your prioritized cabin crew emergency response sequence?',
      am: 'በ 36,000 ጫማ በረራ ላይ አንድ መንገደኛ የማዞር ስሜት እና የመተንፈስ እጥረት እንዳጋጠመው ቢነግርዎ ቅድሚያ የሚሰጡት እርምጃ ምንድነው?',
      or: 'Imalaan tokko balalii irratti yoo dhukkubsate, tarkaanfiin jalqabaa maali?',
      ti: 'ተጓዓዚ ኣብ በረራ ርእሲ ምዘርን ናይ ምትንፋስ ጸገምን እንተኣጋጢምዎ እንታይ ትገብሩ?'
    },
    options: {
      en: [
        'Inform the Senior Cabin Crew / Captain, administer supplemental first-aid oxygen, position the passenger comfortably, and page for a medical doctor on board.',
        'Offer a cold alcoholic beverage and ask them to rest their eyes.',
        'Tell the passenger it is normal cabin pressure and return to your galley duties.',
        'Initiate immediate rapid evacuation preparation without consulting cockpit.'
      ],
      am: [
        'ለዋና የበረራ ሀላፊ/ካፒቴን ማሳወቅ፣ ተጨማሪ ኦክሲጅን መስጠት፣ መንገደኛውን በሚመች ሁኔታ ማስቀመጥ እና በአውሮፕላኑ ውስጥ ዶክተር ካለ በድምፅ ማጉያ መጠየቅ።',
        'ቀዝቃዛ የአልኮል መጠጥ ሰጥቶ እንዲያርፍ ማድረግ።',
        'የተለመደ የአየር ግፊት መሆኑን ነግሮ ወደ ስራዎ መመለስ።',
        'ካፒቴኑን ሳያማክሩ የድንገተኛ አደጋ ማስጠንቀቂያ መጀመር።'
      ],
      or: [
        'Kaapiteeniif beeksisuu, Oksijiinii kennuu, imalticha boqochiisuu fi ogeessa yaalaa barbaaduu.',
        'Dhugaatii alkoolii kennuu.',
        'Dhiisanii deebi\'uu.',
        'Osoo kaapiteenii hin gaafatin balaa labsuu.'
      ],
      ti: [
        'ንካፕተን ምሕባር፣ ኦክሲጅን ምሃብ፣ ተጓዓዚ ምዕራፍን ሓኪም እንተልዩ ምሕታትን።',
        'መስተ ምሃብ.',
        'ሸለል ምባል.',
        'ብዘይ ፍቓድ ካፕተን ናይ ሓደጋ ምድላው ምጅማር.'
      ]
    },
    correctAnswer: 0,
    explanation: {
      en: 'Hypoxia or cardiac distress at cruising altitude requires rapid delivery of medical oxygen, flight deck notification, and in-flight medical volunteer assistance.',
      am: 'በከፍተኛ ከፍታ ላይ የሚፈጠር የኦክሲጅን እጥረት ወዲያውኑ የኦክሲጅን ህክምና፣ የበረራ መሪውን ማሳወቅ እና የህክምና ባለሙያ ድጋፍ ይጠይቃል።',
      or: 'Hanqinni qilleensaa balalii irratti hatattamaan oksijiinii fi gargaarsa yaalaa barbaada.',
      ti: 'ኣብ በረራ ዘጋጥም ሕጽረት ኦክሲጅን ቀልጢፍካ ኦክሲጅን ምሃብን ንሓኪም ምሕባርን የድሊ።'
    }
  },

  // Commercial Pilot Questions
  {
    id: 'pl_01',
    school: 'pilot',
    category: 'aviation_knowledge',
    question: {
      en: 'What aerodynamic phenomenon occurs when the angle of attack exceeds the critical alpha, causing turbulent airflow separation over the upper wing surface?',
      am: 'የአውሮፕላን ክንፍ አንግል ከተፈቀደው ወሰን በላይ ሲያልፍ እና የአየር ፍሰት ሲቋረጥ የሚፈጠረው ክስተት ምን ይባላል?',
      or: 'Yeroo qilleensi koochoo xiyyaaraa irraa kukkutu maaltu uumama?',
      ti: 'ናይ ነፋሪት ኣየር ምፍሳስ ምስ ዝቋረጽ ዝፍጠር ናይ ኤሮዳይናሚክስ ኩነታት እንታይ ይበሃል?'
    },
    options: {
      en: [
        'Aerodynamic Stall (Loss of Lift)',
        'Mach Tuck Over-speed',
        'Ground Effect Cushioning',
        'Dutch Roll Oscillations'
      ],
      am: [
        'ኤሮዳይናሚክ ስቶል / የአየር ማንሳት ሀይል መቋረጥ (Aerodynamic Stall)',
        'ማክ ተክ (Mach Tuck)',
        'ግራውንድ ኢፌክት (Ground Effect)',
        'ዳች ሮል (Dutch Roll)'
      ],
      or: [
        'Istoolii Aviyeeshinii (Aerodynamic Stall)',
        'Maak Tak (Mach Tuck)',
        'Giraawundi Iffeektii',
        'Daach Rool'
      ],
      ti: [
        'ኤሮዳይናሚክ ስቶል (Aerodynamic Stall)',
        'ማክ ተክ',
        'ግራውንድ ኢፌክት',
        'ዳች ሮል'
      ]
    },
    correctAnswer: 0,
    explanation: {
      en: 'An aerodynamic stall occurs when the angle of attack exceeds the critical angle (typically 15-18 degrees), leading to immediate airflow boundary separation and loss of lift.',
      am: 'ስቶል የሚከሰተው የክንፉ አንግል ከከፍተኛው ወሰን በላይ ሲያልፍ አየሩ ከክንፉ ላይ ተበታትኖ አውሮፕላኑን የማንሳት ሀይሉ ሲጠፋ ነው።',
      or: 'Istooliin kan uumamu yeroo koochoon xiyyaaraa qilleensa qabachuu dadhabuudha.',
      ti: 'ስቶል ዝፍጠር ናይ ክንፊ ዓቕሚ ምልዓል ምስ ዝጠፍእ እዩ።'
    }
  },
  {
    id: 'pl_02',
    school: 'pilot',
    category: 'technical_aptitude',
    question: {
      en: 'If an aircraft is flying at a true airspeed (TAS) of 420 knots with a direct headwind of 40 knots, what is the resulting Ground Speed (GS)?',
      am: 'አውሮፕላኑ በ 420 ኖት ፍጥነት እየበረረ በፊቱ 40 ኖት የሚነፍስ ንፋስ ቢያጋጥመው የመሬት ፍጥነቱ (Ground Speed) ስንት ይሆናል?',
      or: 'Xiyyaarri tokko saffisa 420n utuu balali\'uu bubbeen 40 fuulduraan yoo dhufe, saffisni lafaa meeqa ta\'a?',
      ti: 'ነፋሪት ብ 420 ኖት እንዳበረረት ብቕድሚት 40 ኖት ንፋስ እንተመጺእዋ፡ ፍጥነት መሬት ክንደይ ይኸውን?'
    },
    options: {
      en: [
        '380 knots (Ground Speed = TAS - Headwind)',
        '460 knots (Ground Speed = TAS + Headwind)',
        '420 knots (Ground Speed is unaffected by wind)',
        '340 knots (Double headwind compensation)'
      ],
      am: [
        '380 ኖት (Ground Speed = 420 - 40)',
        '460 ኖት (Ground Speed = 420 + 40)',
        '420 ኖት (ንፋሱ ምንም ለውጥ አያመጣም)',
        '340 ኖት'
      ],
      or: [
        '380 noots (420 - 40)',
        '460 noots (420 + 40)',
        '420 noots',
        '340 noots'
      ],
      ti: [
        '380 ኖት (420 - 40)',
        '460 ኖት (420 + 40)',
        '420 ኖት',
        '340 ኖት'
      ]
    },
    correctAnswer: 0,
    explanation: {
      en: 'Ground Speed equals True Airspeed minus Headwind component (420 - 40 = 380 kts). With a tailwind, you would add it.',
      am: 'የመሬት ፍጥነት ማለት ትክክለኛው የበረራ ፍጥነት ሲቀነስ የፊት ንፋስ (420 - 40 = 380 ኖት) ነው።',
      or: 'Saffisni lafaa = Saffisa balalii - Bubbee fuulduraa (420 - 40 = 380).',
      ti: 'ፍጥነት መሬት = ፍጥነት በረራ ሲቀነስ ንፋስ ቅድሚት (420 - 40 = 380).'
    }
  },

  // Aircraft Maintenance Technician (AMT) Questions
  {
    id: 'amt_01',
    school: 'amt',
    category: 'technical_aptitude',
    question: {
      en: 'In high-bypass turbofan jet engines, what primary component compresses atmospheric air before it enters the combustion chamber?',
      am: 'በዘመናዊ ጄት ኢንጅን ውስጥ አየር ወደ ማቃጠያ ክፍሉ (combustion chamber) ከመግባቱ በፊት በከፍተኛ ፕሬዠር የሚጨምቀው ክፍል የትኛው ነው?',
      or: 'Mootora xiyyaaraa keessatti qilleensa kan ukkaamsu kamidha?',
      ti: 'ኣብ ሞተር ነፋሪት ኣየር ዘጽዕቕ ክፍሊ እንታይ ይበሃል?'
    },
    options: {
      en: [
        'Axial-flow compressor stages (Low and High Pressure Compressor spools)',
        'Exhaust thrust reverser cascades',
        'Fuel metering unit bypass valves',
        'Hydraulic reservoir return line filters'
      ],
      am: [
        'የአክሲያል ኮምፕረሰር ክፍሎች (Low & High Pressure Compressor)',
        'የጭስ መመለሻ ትረስት ሪቨርሰር (Thrust Reverser)',
        'የነዳጅ መቆጣጠሪያ ቫልቭ',
        'የሃይድሮሊክ ፊልተር'
      ],
      or: [
        'Koompireesara (Compressor stages)',
        'Tarasti Riveersara',
        'Vaালvii Boba\'aa',
        'Fiiltarii Haayidrooliksii'
      ],
      ti: [
        'ኮምፕረሰር (Compressor stages)',
        'ትረስት ሪቨርሰር',
        'ናይ ነዳዲ ቫልቭ',
        'ናይ ሃይድሮሊክ ፊልተር'
      ]
    },
    correctAnswer: 0,
    explanation: {
      en: 'The axial compressor spools consist of alternating rotor blades and stator vanes that progressively compress incoming air to optimal high pressure before fuel injection in the combustor.',
      am: 'ኮምፕረሰሩ ተከታታይ ተንቀሳቃሽ እና ቋሚ ቢላዋዎች ያሉት ሲሆን አየሩን በከፍተኛ ጫና ጨምቆ ወደ ማቃጠያው ክፍል ያስገባል።',
      or: 'Koompireesarri qilleensa ukkaamsee gara iddoo gubannootti erga.',
      ti: 'ኮምፕረሰር ኣየር ኣጽዒቑ ናብ መንዳዲ ክፍል የሕልፍ።'
    }
  },

  // Commercial & Ground Services Questions
  {
    id: 'com_01',
    school: 'commercial',
    category: 'situational_judgment',
    question: {
      en: 'A passenger at the check-in concourse presents a valid ticket but has a passport expiring in 45 days for a destination requiring 6 months validity. What is the standard protocol?',
      am: 'የመግቢያ ቼክ-ኢን ላይ ያለ መንገደኛ ትኬት አለው ነገር ግን ፓስፖርቱ ከ 45 ቀናት በኋላ የሚያበቃ ሲሆን መድረሻው ሀገር ቢያንስ የ 6 ወር ፀንቶ የመቆየት ግዴታ ቢኖረው ትክክለኛው አሰራር ምንድነው?',
      or: 'Imalaan tokko paaspoortiin isaa guyyaa 45 qofa yoo hafe, biyyi inni deemu immoo ji\'a 6 yoo barbaade maaltu godhama?',
      ti: 'ፓስፖርት ተጓዓዚ 45 መዓልቲ ጥራይ እንተተሪፍዎ፡ እታ ሃገር ድማ 6 ወርሒ እንተሓቲታ እንታይ ይግበር?'
    },
    options: {
      en: [
        'Check destination Timatic entry requirements, inform the passenger politely about immigration non-compliance, and assist with rebooking procedures.',
        'Issue the boarding pass anyway and let destination immigration handle it.',
        'Confiscate the passenger’s ticket immediately without explanation.',
        'Charge the passenger a manual override fee at the gate.'
      ],
      am: [
        'የመድረሻ ሀገሩን Timatic የኢሚግሬሽን ህግ ማረጋገጥ፣ ለመንገደኛው በጨዋነት ህጉን ማስረዳት እና ትኬቱን ወደ ሌላ ቀን እንዲቀይር መርዳት።',
        'የመሳፈሪያ ወረቀት ሰጥቶ መድረሻ ሀገሩ ላይ እንዲመለስ ማድረግ።',
        'ያለምንም ማብራሪያ ትኬቱን መቀማት።',
        'ተጨማሪ ክፍያ አስከፍሎ ማሳፈር።'
      ],
      or: [
        'Seera Timatic ilaaluun imaltichaaf ibsuu fi tikeettii jijjiiruuf gargaaruu.',
        'Boordiing paasii kennuun dhiisuu.',
        'Tikeettii irraa fudhachuu.',
        'Kaffaltii dabalataa kaffalchiisuu.'
      ],
      ti: [
        'ሕጊ Timatic ብምርኣይ ንተጓዓዚ ምግላጽን ትኬት ንኽቕይር ምሕጋዝን።',
        'ቦርዲንግ ፓስ ምሃብ.',
        'ትኬት ምምንዛዕ.',
        'ተወሳኺ ክፍሊት ምሕታት.'
      ]
    },
    correctAnswer: 0,
    explanation: {
      en: 'Airlines are liable for heavy international fines (INAD) if they board passengers who do not meet destination country passport validity thresholds.',
      am: 'አየር መንገዶች የመግቢያ መስፈርት ያላሟላ መንገደኛ ካሳፈሩ ከፍተኛ የአለም አቀፍ የገንዘብ ቅጣት (INAD fine) ይጣልባቸዋል።',
      or: 'Daandiin qilleensaa imalaa seera hin guunne yoo fe\'e adabbii cimaan adabama.',
      ti: 'መስፈርቲ ዘየማልአ ተጓዓዚ ዘሳፈረ ነፋሪት ከቢድ መቕጻዕቲ ይወርዶ።'
    }
  }
];
