export const UNIVERSITY_SUBJECTS = [
  {
    id: "programming-1",
    title: "Programming 1",
    semester: "Semester 1",
    badge: "C++ • Basics",
    longDescription: "شرح كامل عن المادة...",
    chapters: [
      "Introduction to Programming",
      "Variables & Data Types",
      "Conditions",
      "Loops",
      "Functions",
    ],
    objectives: ["فهم أساسيات البرمجة", "حل مسائل منطقية"],
    prerequisites: "لا يوجد",
    quiz: {
      numQuestions: 15,
      estimatedTime: "20–30 min",
    },
  },
  {
    id: "Data-Structures",
    title: "Data Structures",
    semester: "Semester 3",
    badge: "Arrays • Lists",
    longDescription: "شرح كامل عن المادة...",
    chapters: [
      {
        id: "ch1",
        title: "Introduction to Programming",
        file: "/university/data-structures/1-1QUEUE1 .pdf",
      },
      {
        id: "ch2",
        title: "Variables & Data Types",
        file: "/university/data-structures/chapter-2-variables.pdf",
      },
      {
        id: "ch3",
        title: "Loops",
        file: "/university/data-structures/chapter-3-loops.pdf",
      },
    ],

    objectives: ["فهم أساسيات البرمجة", "حل مسائل منطقية"],
    prerequisites: "لا يوجد",
    quiz: {
      numQuestions: 15,
      estimatedTime: "20–30 min",
    },
  },
  {
    id: "db2",
    title: "Data Base 2",
    semester: "Semester 3",
    badge: "Oracle • SQL • DBA",
    longDescription:
      "This course covers advanced database management concepts using Oracle Database 10g, including architecture, creation, storage, security, and more.",
    chapters: [
      {
        id: "ch1",
        title: "Contents at a Glance",
        file: "/university/db2/chapter-1.pdf",
      },
      {
        id: "ch2",
        title: "Oracle Database 10g Components and Architecture",
        file: "/university/db2/chapter-2.pdf",
      },
      {
        id: "ch3",
        title: "Oracle Database 10g Components and Architecture",
        file: "/university/db2/chapter-3.pdf",
      },
      {
        id: "ch4",
        title: "Creating and Controlling a Database",
        file: "/university/db2/chapter-4.pdf",
      },
      {
        id: "ch5",
        title: "Database Storage and Schema Objects",
        file: "/university/db2/chapter-5.pdf",
      },
      {
        id: "ch8",
        title: "User Administration and Security",
        file: "/university/db2/chapter-8.pdf",
      },
      {
        id: "ch12",
        title: "Oracle Database 10g Components and Architecture",
        file: "/university/db2/chapter-12.pdf",
      },
    ],

    objectives: [
      "Understand Oracle database architecture and components",
      "Learn to create, start up, and shut down databases",
      "Manage schema objects and storage",
      "Implement user administration and security policies",
    ],
    prerequisites: "Basic knowledge of databases and SQL",
    quiz: {
      numQuestions: 15,
      estimatedTime: "20–30 min",
    },
  },
  {
    id: "algo-1",
    title: "Algorithms Design and Analysis",
    semester: "Semester 3",
    badge: "Algorithms • Analysis • Complexity",
    longDescription:
      "دورة شاملة في تصميم وتحليل الخوارزميات، تغطي الأساسيات والتقنيات المتقدمة في حل المشكلات الحسابية بكفاءة، مع التركيز على تحليل التعقيد الزمني والمكاني.",
    chapters: [
      {
        id: "ch-all",
        title: "Algorithms Design and Analysis - All Chapters",
        file: "/university/algo/00 - Algorithms All For Students.pdf",
      },
    ],
    objectives: [
      "فهم أساسيات تصميم الخوارزميات",
      "تحليل التعقيد الزمني والمكاني للخوارزميات",
      "إتقان تقنيات مثل Divide and Conquer، Dynamic Programming، Greedy",
      "حل مسائل متقدمة باستخدام الخوارزميات الفعالة",
      "التعرف على مشكلات NP-Complete وطرق التعامل معها",
    ],
    prerequisites: "برمجة 1 وهياكل البيانات الأساسية",
    quiz: {
      numQuestions: 20,
      estimatedTime: "30–45 min",
    },
  },
  {
    id: "digital-logic",
    title: "Digital Logic Fundamentals",
    semester: "Semester 2",
    badge: "Gates • Combinational • Sequential",
    longDescription:
      "دورة شاملة في أساسيات المنطق الرقمي تغطي البوابات المنطقية، الدوائر التركيبية والتسلسلية، تبسيط الدوائر، والتصميم الرقمي باستخدام تقنيات متعددة.",
    chapters: [
      {
        id: "ch1",
        title: "Chapter-1",
        file: "/university/digital - logic/chapter-1.pdf",
      },
      {
        id: "ch2",
        title: "Chapter-2",
        file: "/university/digital - logic/chapter-2.pdf",
      },
      {
        id: "ch3",
        title: "Chapter-3",
        file: "/university/digital - logic/chapter-3.pdf",
      },
      {
        id: "ch4",
        title: "Chapter-4",
        file: "/university/digital - logic/chapter-4.pdf",
      },
      {
        id: "ch5",
        title: "Chapter-5",
        file: "/university/digital - logic/chapter-5.pdf",
      },
      {
        id: "ch6",
        title: "Chapter-6",
        file: "/university/digital - logic/chapter-6.pdf",
      },
      {
        id: "ch7",
        title: "Chapter-7",
        file: "/university/digital - logic/chapter-7.pdf",
      },
    ],
    objectives: [
      "فهم الأنظمة العددية وتحويلاتها",
      "إتقان البوابات المنطقية الأساسية والدوائر التركيبية",
      "تصميم وتحليل الدوائر التسلسلية مثل Flip-Flops والعدادات",
      "تبسيط الدوائر باستخدام خرائط كارنو والجبر البولياني",
      "التعرف على مكونات الأنظمة الرقمية المتكاملة",
    ],
    prerequisites: "أساسيات الحاسب الآلي أو مقدمة في البرمجة",
    quiz: {
      numQuestions: 20,
      estimatedTime: "30–45 min",
    },
  },
  {
    id: "discrete-math",
    title: "Discrete Mathematics",
    semester: "Semester 2",
    badge: "Sets • Logic • Graphs • Proofs",
    longDescription:
      "دورة شاملة في الرياضيات المنفصلة تغطي المجموعات، العلاقات، المنطق، الدوال، الاحتمالات، الرسوم البيانية، الأشجار، والبراهين الرياضية مع تطبيقات في علوم الحاسب.",
    chapters: [
      {
        id: "ch1",
        title: "Chapter1- Sets",
        file: "/university/discrete/chapter1-Sets.pdf",
      },
      {
        id: "ch2",
        title: "Chapter2- Relations",
        file: "/university/discrete/chapter2 - Relations.pdf",
      },
      {
        id: "ch3",
        title: "Chapter3- Functions",
        file: "/university/discrete/chapter3 - Functions.pdf",
      },
      {
        id: "ch4",
        title: "Chapter4- Sequences and Summations",
        file: "/university/discrete/chapter4 - Sequences and Summations.pdf",
      },
      {
        id: "ch5",
        title: "Chapter5- Probabilities",
        file: "/university/discrete/chapter5- Probabilities.pdf",
      },
      {
        id: "ch6",
        title: "Chapter6- Graphs",
        file: "/university/discrete/chapter6 - Graphs.pdf",
      },
      {
        id: "ch7",
        title: "Chapter7- Trees",
        file: "/university/discrete/chapter7 - Trees.pdf",
      },
      {
        id: "ch8",
        title: "Chapter8- Propositional Logic",
        file: "/university/discrete/chapter8 - Propositional Logic.pdf",
      },
      {
        id: "ch9",
        title: "Chapter9- Proofs",
        file: "/university/discrete/chapter9- Proofs.pdf",
      },
    ],
    objectives: [
      "إتقان مفاهيم المجموعات والعلاقات والدوال",
      "فهم المنطق الاقتراحي والبراهين الرياضية",
      "التعرف على الرسوم البيانية والأشجار وتطبيقاتها",
      "حساب الاحتمالات والمتتاليات والمجموعات",
      "تطبيق المفاهيم في حل مسائل علوم الحاسب",
    ],
    prerequisites: "رياضيات تمهيدية أو لا يوجد",
    quiz: {
      numQuestions: 20,
      estimatedTime: "30–45 min",
    },
  },
  {
    id: "Operating-System",
    title: "Operating System",
    semester: "Semester 3",
    badge: "Processes • Memory • Scheduling",
    longDescription:
      "شرح شامل لمادة أنظمة التشغيل وفق عناوين الكتاب، مع التركيز على إدارة العمليات والخيوط، خوارزميات جدولة المعالج، آليات التزامن، وإدارة الذاكرة",

    chapters: [
      {
        id: "ch1",
        title: "Introduction",
        file: "/university/operating system/chapter-1.pptx",
      },
      {
        id: "ch2",
        title: "Operating-System Structures",
        file: "/university/operating system/chapter-2.pptx ",
      },
      {
        id: "ch3",
        title: "Processes",
        file: "/university/operating system/chapter-3.pptx ",
      },
      {
        id: "ch4",
        title: "Threads & Concurrency",
        file: "/university/operating system/chapter-4.pptx ",
      },
      {
        id: "ch5",
        title: "CPU Scheduling",
        file: "/university/operating system/chapter-5.pptx ",
      },
      {
        id: "ch6",
        title: "Synchronization",
        file: "/university/operating system/chapter-6.pptx ",
      },
      {
        id: "ch7",
        title: "Deadlocks",
        file: "/university/operating system/chapter-7.pptx ",
      },
      {
        id: "ch8",
        title: "Main Memory",
        file: "/university/operating system/chapter-8.pptx ",
      },
      {
        id: "ch9",
        title: "Virtual Memory",
        file: "/university/operating system/chapter-9.pptx ",
      },
    ],

    objectives: [
      "فهم أساسيات أنظمة التشغيل",
      "إدارة العمليات والخيوط",
      "تحليل جدولة المعالج",
      "فهم التزامن وحل مشكلة الـ Deadlock",
      "إدارة الذاكرة والذاكرة الافتراضية",
    ],

    prerequisites: "Programming Fundamentals & Data Structures",

    quiz: {
      numQuestions: 30,
      estimatedTime: "45–60 min",
    },
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems",
    semester: "Semester 4",
    badge: "Arduino • Sensors • I/O",
    longDescription:
      "دورة شاملة في أنظمة المضمنة باستخدام Arduino، تغطي البرمجة الأساسية، التعامل مع المدخلات والمخرجات الرقمية والتناظرية، الاتصالات التسلسلية، والحساسات لتصميم مشاريع تفاعلية.",
    chapters: [
      {
        id: "ch1",
        title: "Chapter 1 - Getting Started",
        file: "/university/embedded-systems/chapter 1.pdf",
      },
      {
        id: "ch2",
        title: "Chapter 2 - Making the Sketch Do Your Bidding",
        file: "/university/embedded-systems/chapter 2 (1).pdf",
      },
      {
        id: "ch3",
        title: "Chapter 3 - Using Mathematical Operators",
        file: "/university/embedded-systems/chapter 3.pdf",
      },
      {
        id: "ch4",
        title: "Chapter 4 - Serial Communications",
        file: "/university/embedded-systems/chapter 4.pdf",
      },
      {
        id: "ch5",
        title: "Chapter 5 - Simple Digital and Analog Input",
        file: "/university/embedded-systems/chapter 5.pdf",
      },
      {
        id: "ch6",
        title: "Chapter 6 - Getting Input from Sensors",
        file: "/university/embedded-systems/chapter 6.pdf",
      },
    ],
    objectives: [
      "فهم أساسيات Arduino والبيئة البرمجية",
      "إتقان العمليات الحسابية والتحكم في البرنامج",
      "التعامل مع المدخلات والمخرجات الرقمية والتناظرية",
      "استخدام الاتصالات التسلسلية للتواصل مع الأجهزة",
      "ربط واستخدام الحساسات لجمع البيانات من البيئة",
    ],
    prerequisites: "برمجة 1 وأساسيات الإلكترونيات",
    quiz: {
      numQuestions: 15,
      estimatedTime: "20–30 min",
    },
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    semester: "Semester 4",
    badge: "Processes • Agile • Ethics",
    longDescription:
      "دورة شاملة في هندسة البرمجيات تغطي المفاهيم الأساسية، أخلاقيات المهنة، نماذج العمليات البرمجية، المنهجيات الرشيقة (Agile)، إدارة المشاريع، والتحديات في تطوير البرمجيات الاحترافية.",
    chapters: [
      {
        id: "ch1",
        title: "Chapter 1 - Introduction to Software Engineering",
        file: "/university/MODERN-SOFTWARE-ENGINEER/Ch1.pptx",
      },
      {
        id: "ch2",
        title: "Chapter 2 - Software Processes",
        file: "/university/MODERN-SOFTWARE-ENGINEER/Ch2.pptx",
      },
      {
        id: "ch3",
        title: "Chapter 3 - Agile Software Development",
        file: "/university/MODERN-SOFTWARE-ENGINEER/Ch3 (3).pptx",
      },
    ],
    objectives: [
      "فهم أهمية هندسة البرمجيات والتكاليف المرتبطة بها",
      "التعرف على أخلاقيات المهنة ومسؤوليات المهندس البرمجي",
      "إتقان نماذج عمليات تطوير البرمجيات التقليدية والحديثة",
      "فهم المنهجيات الرشيقة مثل Extreme Programming وScrum",
      "معرفة كيفية التعامل مع التغيير وتوسيع المنهجيات الرشيقة",
    ],
    prerequisites: "برمجة 2 وتحليل وتصميم النظم",
    quiz: {
      numQuestions: 20,
      estimatedTime: "30–45 min",
    },
  },
  {
    id: "Wireless-Networks",
    title: "Wireless Networks",
    semester: "Semester 4",
    badge: "Wireless • Mobile • Protocols",
    longDescription:
      "شرح مادة Wireless Networks حسب عناوين الكتاب، مع التركيز على أساسيات الاتصال اللاسلكي، الطبقة الفيزيائية، بروتوكولات النفاذ، والشبكات الخلوية والمتنقلة.",

    chapters: [
      {
        id: "ch1",
        title: "Introduction to Wireless Networks",
        file: "/university/wireless networks/chapter-1.ppt ",
      },
      {
        id: "ch2",
        title: "Wireless Transmission Fundamentals",
        file: "/university/wireless networks/chapter-2.ppt ",
      },
      {
        id: "ch3",
        title: "Wireless Media Access Control (MAC)",
        file: "/university/wireless networks/chapter-3.pptx ",
      },
      {
        id: "ch4",
        title: "Wireless LANs (IEEE 802.11)",
        file: "/university/wireless networks/chapter-4.pptx ",
      },

      {
        id: "midterm",
        title: "Midterm Revision",
        file: "/university/wireless networks/Midterm-Revision.pptx ",
      },

      {
        id: "ch5",
        title: "Cellular Network Concepts",
        file: "/university/wireless networks/chapter-5.pptx ",
      },
      {
        id: "ch6",
        title: "GSM and UMTS",
        file: "/university/wireless networks/chapter-6.pptx ",
      },
      {
        id: "ch7",
        title: "LTE and 5G Networks",
        file: "/university/wireless networks/chapter-7.pptx ",
      },
      {
        id: "ch8",
        title: "Mobile IP and Mobility Management",
        file: "/university/wireless networks/chapter-8.pptx ",
      },
      {
        id: "ch9",
        title: "Wireless Network Security",
        file: "/university/wireless networks/chapter-9.pptx ",
      },
      {
        id: "ch10",
        title: "Ad Hoc and Sensor Networks",
        file: "/university/wireless networks/chapter-10.ppt ",
      },
      {
        id: "ch11",
        title: "Wireless Multimedia Networks",
        file: "/university/wireless networks/chapter-11.pptx ",
      },
    ],

    objectives: [
      "فهم أساسيات الشبكات اللاسلكية",
      "تحليل آليات الإرسال اللاسلكي",
      "فهم بروتوكولات MAC و WLAN",
      "دراسة الشبكات الخلوية وتطورها",
      "التعامل مع قضايا التنقل والأمان في الشبكات اللاسلكية",
    ],

    prerequisites: "Computer Networks & Data Communications",

    quiz: {
      numQuestions: 35,
      estimatedTime: "50–70 min",
    },
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    semester: "Semester 5",
    badge: "Logic • Search • Inference",
    longDescription:
      "دورة شاملة في الذكاء الاصطناعي تغطي المقدمة، المنطق الاقتراحي والمرتبة الأولى، الاستدلال المنطقي، حل المشكلات بالبحث، والبحث الاستكشافي (Heuristic Search).",
    chapters: [
      {
        id: "ch1",
        title: "Chapter1 - Introduction to AI",
        file: "/university/artificial-intelligence/chapter1 - Introduction to AI.pdf",
      },
      {
        id: "ch2",
        title: "Chapter2 - Propositional Logic",
        file: "/university/artificial-intelligence/chapter2 - Propositional Logic (1).pdf",
      },
      {
        id: "ch3",
        title: "Chapter3 - First-Order Predicate Logic (FOPL)",
        file: "/university/artificial-intelligence/chapter3 - FOPL (1).pdf",
      },
      {
        id: "ch4",
        title: "Chapter4 - Inference in First-Order Predicate Logic",
        file: "/university/artificial-intelligence/chapter4 - Inference in FOPL (1) (1).pdf",
      },
      {
        id: "ch5",
        title: "Chapter5 - Solving Problems By Searching",
        file: "/university/artificial-intelligence/chapter5  - Solving Problems By Searching (1).pdf",
      },
      {
        id: "ch6",
        title: "Chapter6 - Heuristic Search",
        file: "/university/artificial-intelligence/chapter6 - Heuristic Search (1).pdf",
      },
    ],
    objectives: [
      "فهم أساسيات الذكاء الاصطناعي ومجالاته",
      "إتقان المنطق الاقتراحي والمرتبة الأولى",
      "تعلم قواعد الاستدلال في المنطق المرتبة الأولى",
      "إجادة خوارزميات البحث لحل المشكلات",
      "التعرف على تقنيات البحث الاستكشافي وتطبيقاتها",
    ],
    prerequisites: "هياكل البيانات والخوارزميات، الرياضيات المنفصلة",
    quiz: {
      numQuestions: 20,
      estimatedTime: "30–45 min",
    },
  },
  {
    id: "Numerical-Analysis",
    title: "Numerical Analysis",
    semester: "Semester 4",
    badge: "Errors • Interpolation • Integration",
    longDescription:
      "شرح مادة Numerical Analysis حسب كتاب Burden & Faires، مع التركيز على تحليل الأخطاء، حل المعادلات غير الخطية، الاستيفاء، التفاضل والتكامل العددي.",

    chapters: [
      {
        id: "ch1",
        title: "Mathematical Preliminaries and Error Analysis",
        file: "/university/numerical analysis/chapter-1.pdf",
      },
      {
        id: "ch2",
        title: "Solutions of Equations in One Variable",
        file: "/university/numerical analysis/chapter-2.pdf",
      },
      {
        id: "ch3",
        title: "Interpolation and Polynomial Approximation",
        file: "/university/numerical analysis/chapter-3.pdf",
      },
      {
        id: "ch4",
        title: "Numerical Differentiation and Integration",
        file: "/university/numerical analysis/chapter-4.pdf",
      },
      {
        id: "ch5",
        title: "Initial-Value Problems for Ordinary Differential Equations",
        file: "/university/numerical analysis/chapter-5.pdf",
      },
      {
        id: "ch6",
        title: "Direct Methods for Solving Linear Systems",
        file: "/university/numerical analysis/chapter-6.pdf",
      },
      {
        id: "ch7",
        title: "Iterative Techniques in Matrix Algebra",
        file: "/university/numerical analysis/chapter-7.pdf",
      },
    ],

    objectives: [
      "فهم مصادر الأخطاء العددية وطرق تحليلها",
      "حل المعادلات غير الخطية باستخدام الطرق العددية",
      "تطبيق الاستيفاء والتقريب متعدد الحدود",
      "استخدام التفاضل والتكامل العددي",
      "حل أنظمة المعادلات الخطية والمعادلات التفاضلية عددياً",
    ],

    prerequisites: "Calculus, Linear Algebra & Programming Fundamentals",

    quiz: {
      numQuestions: 30,
      estimatedTime: "45–60 min",
    },
  },
];
