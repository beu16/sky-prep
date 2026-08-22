import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'int_01',
    school: 'cabin_crew',
    competency: 'Conflict Resolution & Customer Excellence',
    title: {
      en: 'Handling a Disruptive Passenger at 35,000 Feet',
      am: 'በበረራ ላይ የተበሳጨ መንገደኛን ማስተናገድ',
      or: 'Imalaa Aare Qabachuu',
      ti: 'ዝተቖጥዐ ተጓዓዚ ምእንጋድ'
    },
    question: {
      en: 'Tell me about a time when you dealt with an extremely upset customer or passenger. How did you resolve the situation while maintaining safety and professionalism?',
      am: 'በጣም የተናደደን ደንበኛ ወይም መንገደኛ ስላስተናገዱበት ጊዜ ይንገሩኝ? የደንበኛውን ቅሬታ እየፈቱ ደህንነትን እና ሙያዊ ጨዋነትን እንዴት ጠበቁ?',
      or: 'Yeroo maamila aare tokko simattan naaf ibsaa? Haala nageenyaa osoo hin miadhin akkamitti furmaata kennitan?',
      ti: 'ዝተቖጥዐ ዓሚል ዘተኣናገድኩምሉ ግዜ ግለጹለይ? ከመይ ጌርኩም ናይ ደሕንነትን ሞያን ስነ-ምግባር ሓሊኹም ፈቲሕኩምዎ?'
    },
    starFramework: {
      situation: 'Describe the setting, the passenger distress trigger (e.g., flight delay, meal choice unavailable), and cabin atmosphere.',
      task: 'Identify your duty: maintain flight safety, de-escalate tension, and uphold airline 5-star hospitality reputation.',
      action: 'Actively listened with open posture, acknowledged emotion without admitting liability, provided alternative solutions, and kept the senior purser updated.',
      result: 'The passenger calmed down, thanked the crew upon arrival, and no safety disruption occurred.'
    },
    bestModelAnswer: {
      en: 'In my previous customer service role, a passenger became visibly agitated because their preferred dietary meal was missing. I immediately lowered my voice, maintained calm eye contact, and listened actively without interrupting. I acknowledged their frustration empathetically and consulted with the galley lead to curate a tailored meal selection using first-class fruit and artisan cheeses. The customer felt valued and personally commended the crew upon landing.',
      am: 'በቀድሞ የስራ ልምዴ አንድ ደንበኛ የመረጡት ምግብ ባለመገኘቱ ምክንያት ተበሳጭተው ነበር። ድምፄን ዝቅ በማድረግ እና በአክብሮት በማዳመጥ ችግራቸውን ተረዳሁ። ከዋና ሀላፊው ጋር በመነጋገር ከፕሪሚየም ክላስ ፍራፍሬ እና አማራጭ ምግቦችን አዘጋጅቼ አቀረብኩላቸው። ደንበኛው በተደረገላቸው መስተንግዶ ተደስተው በረራው ሲጠናቀቅ ምስጋና አቅርበዋል።',
      or: 'Maamilli tokko nyaata barbaade dhabee yeroo aaru, tasgabiin dhaggeeffadhee filannoo biraa qopheesseefii gammachuun akka deebi\'u godheera.',
      ti: 'ሓደ ዓሚል ዝደለዮ መግቢ ብምስኣኑ ምስ ተቖጥዐ፡ ብትዕግስቲ ሰሚዐ ካልእ መማረጺ ብምቕራብ ብሰላም ክዓርፍ ገይረዮ።'
    },
    evaluatorChecklist: [
      'Remains calm under pressure and speaks with controlled intonation',
      'Demonstrates high empathy without violating airline rules',
      'Uses structured S-T-A-R methodology clearly',
      'Prioritizes safety and cockpit team communication'
    ],
    audioScript: 'In my customer service experience, empathetic listening and swift resolution turn dissatisfied passengers into lifelong airline advocates.'
  },
  {
    id: 'int_02',
    school: 'pilot',
    competency: 'Crew Resource Management (CRM) & Aeronautical Decision Making',
    title: {
      en: 'Managing In-Flight Disagreements & Decision Making',
      am: 'በበረራ ወቅት የአስተያየት ልዩነትን እና ውሳኔን መምራት',
      or: 'Murtee Balalii fi Qindoomina Garee',
      ti: 'ኣብ በረራ ዝግበር ናይ ውሳነ ኣወሳስዳን ምትሕብባርን'
    },
    question: {
      en: 'Describe a situation where a crew member had a conflicting opinion on an operational decision. How did you communicate and reach a safe outcome?',
      am: 'ከስራ ባልደረባዎ ጋር በውሳኔ ላይ የተለያየ ሀሳብ ያጋጠመዎትን ሁኔታ ይግለጹ? ደህንነቱ የተጠበቀ ውጤት ላይ ለመድረስ እንዴት ተግባቡ?',
      or: 'Yeroo yaada garaagaraa qabaattan akkamitti waliigaltee nageenyaa irra geessan?',
      ti: 'ኣብ ውሳነ ምስ መሳርሕትኹም ሓሳብ ምስ ዘይሰማማዕ ከመይ ጌርኩም ናብ ሰላማዊ ውሳነ በጺሕኩም?'
    },
    starFramework: {
      situation: 'Navigating marginal weather near destination with deteriorating runway visual range (RVR).',
      task: 'Ensure absolute adherence to SOP minimums while balancing fuel endurance and alternate airport planning.',
      action: 'Advocated using standard assertive phraseology: "I have a safety concern regarding fuel reserves and minimums."',
      result: 'Jointly conducted briefed holding pattern, decided on diversion to designated alternate with comfortable reserves.'
    },
    bestModelAnswer: {
      en: 'During a simulated cross-country flight with adverse weather, my co-pilot was inclined to attempt an approach below legal minima. I utilized standard CRM assertiveness: I stated the concern clearly, referenced the operational flight plan fuel status, and proposed holding for 10 minutes or initiating a diversion to our dry alternate. We mutually agreed to divert, landing safely with 45 minutes of required reserve fuel intact.',
      am: 'በአስቸጋሪ የአየር ሁኔታ ወቅት አብሮኝ የሚበረው ፓይለት ዝቅተኛ እይታ ባለበት እንዲያርፍ ሀሳብ አቀረበ። የአቪዬሽን ደንብን በማስታወስ የነዳጅ መጠናችንን እና አማራጭ ኤርፖርታችንን በመጥቀስ በጋራ ውይይት ወደ አማራጭ ኤርፖርት በሰላም እንድናርፍ አድርገናል።',
      or: 'Haala qilleensa rakkisaa keessatti seera hordofuun xiyyaara gara buufata nagaatti qajeelchinee nagaan qubanneerra.',
      ti: 'ኣብ ጽንኩር ኩነታት ኣየር ሕጊ ብምኽታል ናብ ውሑስ መዕርፎ ነፈርቲ ብሰላም ዓሊብና።'
    },
    evaluatorChecklist: [
      'Strict adherence to Standard Operating Procedures (SOPs)',
      'Constructive assertiveness and non-defensive communication',
      'Situational awareness regarding fuel reserves and alternates',
      'Prioritizes safety above schedule pressure'
    ]
  }
];
