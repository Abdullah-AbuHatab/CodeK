// src/components/pages/quizData.js

export const QUIZZES = {
  "web-101": [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Tool Multi Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      id: 2,
      question: "Which tag is used for a paragraph?",
      options: ["<p>", "<div>", "<span>", "<h1>"],
      answer: "<p>",
    },
    {
      id: 3,
      question: "Which attribute is used for images?",
      options: ["src", "href", "alt", "title"],
      answer: "src",
    },
    {
      id: 4,
      question: "CSS stands for?",
      options: [
        "Cascading Style Sheets",
        "Colorful Style Sheets",
        "Computer Style Sheets",
        "Creative Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      id: 5,
      question: "Which property changes text color?",
      options: ["color", "background-color", "font-size", "text-align"],
      answer: "color",
    },
    {
      id: 6,
      question: "Which tag is used for a list item?",
      options: ["<li>", "<ul>", "<ol>", "<list>"],
      answer: "<li>",
    },
    {
      id: 7,
      question: "Which symbol is used for class in CSS?",
      options: [".", "#", "*", "$"],
      answer: ".",
    },
    {
      id: 8,
      question: "Which HTML element is for the largest heading?",
      options: ["<h1>", "<h6>", "<header>", "<title>"],
      answer: "<h1>",
    },
    {
      id: 9,
      question: "How do you link an external CSS file?",
      options: [
        '<link rel="stylesheet" href="style.css">',
        '<style src="style.css">',
        '<css href="style.css">',
        '<script src="style.css">',
      ],
      answer: '<link rel="stylesheet" href="style.css">',
    },
    {
      id: 10,
      question: "Which CSS property controls layout direction?",
      options: ["flex-direction", "position", "display", "align-items"],
      answer: "flex-direction",
    },
  ],

  "modern-js": [
    {
      id: 1,
      question: "Which method converts JSON to an object?",
      options: [
        "JSON.stringify()",
        "JSON.parse()",
        "JSON.object()",
        "JSON.convert()",
      ],
      answer: "JSON.parse()",
    },
    {
      id: 2,
      question: "Which keyword declares a block-scoped variable?",
      options: ["var", "let", "const", "both let and const"],
      answer: "both let and const",
    },
    {
      id: 3,
      question: "Arrow functions use which syntax?",
      options: ["=>", "->", "::", "~>"],
      answer: "=>",
    },
    {
      id: 4,
      question: "Which method adds elements to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: "push()",
    },
    {
      id: 5,
      question: "What does '===' mean?",
      options: [
        "equal value and type",
        "equal value only",
        "not equal",
        "assignment",
      ],
      answer: "equal value and type",
    },
    {
      id: 6,
      question: "Which object represents the browser environment?",
      options: ["window", "document", "navigator", "console"],
      answer: "window",
    },
    {
      id: 7,
      question: "Template literals use which quotes?",
      options: ["`backticks`", "'single'", '"double"', "~tilde~"],
      answer: "`backticks`",
    },
    {
      id: 8,
      question: "Which array method loops over items?",
      options: ["forEach()", "map()", "filter()", "reduce()"],
      answer: "forEach()",
    },
    {
      id: 9,
      question: "What is NaN in JavaScript?",
      options: ["Not a Number", "Null value", "Empty string", "Boolean false"],
      answer: "Not a Number",
    },
    {
      id: 10,
      question: "Which keyword is used to define a function?",
      options: ["function", "def", "fun", "lambda"],
      answer: "function",
    },
  ],

  "react-fundamentals": [
    {
      id: 1,
      question: "What hook is used to manage state?",
      options: ["useState", "useEffect", "useRef", "useReducer"],
      answer: "useState",
    },
    {
      id: 2,
      question: "Which prop is used to pass data?",
      options: ["state", "props", "context", "ref"],
      answer: "props",
    },
    {
      id: 3,
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "Java Syntax Extension",
        "JSON Syntax eXtension",
        "JavaScript Extension",
      ],
      answer: "JavaScript XML",
    },
    {
      id: 4,
      question: "Which hook handles side effects?",
      options: ["useState", "useEffect", "useMemo", "useCallback"],
      answer: "useEffect",
    },
    {
      id: 5,
      question: "React components must start with?",
      options: ["Capital letter", "Lowercase letter", "_underscore", "$dollar"],
      answer: "Capital letter",
    },
    {
      id: 6,
      question: "How do you render lists in React?",
      options: ["map()", "forEach()", "filter()", "reduce()"],
      answer: "map()",
    },
    {
      id: 7,
      question: "Which prop allows children?",
      options: ["children", "child", "inner", "content"],
      answer: "children",
    },
    {
      id: 8,
      question: "Which hook keeps a reference to a DOM node?",
      options: ["useRef", "useState", "useEffect", "useContext"],
      answer: "useRef",
    },
    {
      id: 9,
      question: "React Router is used for?",
      options: ["Navigation", "Styling", "State management", "Forms"],
      answer: "Navigation",
    },
    {
      id: 10,
      question: "Which function defines a component?",
      options: ["function", "class", "object", "module"],
      answer: "function",
    },
  ],

  "ai-basics": [
    {
      id: 1,
      question: "What is supervised learning?",
      options: [
        "Learning without labels",
        "Learning from labeled data",
        "Learning from scratch",
        "Learning by reinforcement",
      ],
      answer: "Learning from labeled data",
    },
    {
      id: 2,
      question: "Which is NOT a type of ML?",
      options: ["Supervised", "Unsupervised", "Reinforcement", "Classical"],
      answer: "Classical",
    },
    {
      id: 3,
      question: "What does AI stand for?",
      options: [
        "Artificial Intelligence",
        "Automated Interface",
        "Analog Input",
        "Active Integration",
      ],
      answer: "Artificial Intelligence",
    },
    {
      id: 4,
      question: "Which algorithm is used for classification?",
      options: ["Decision Tree", "Linear Regression", "K-Means", "PCA"],
      answer: "Decision Tree",
    },
    {
      id: 5,
      question: "What is a neural network?",
      options: [
        "A computing system inspired by the brain",
        "A linear model",
        "A type of database",
        "A visualization tool",
      ],
      answer: "A computing system inspired by the brain",
    },
    {
      id: 6,
      question: "Which is a common application of AI?",
      options: [
        "Recommendation systems",
        "Paper writing",
        "Spreadsheet formulas",
        "Email sending",
      ],
      answer: "Recommendation systems",
    },
    {
      id: 7,
      question: "Unsupervised learning is used for?",
      options: [
        "Labeling data",
        "Clustering data",
        "Training models",
        "Optimizing code",
      ],
      answer: "Clustering data",
    },
    {
      id: 8,
      question: "Which language is most used for ML?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: "Python",
    },
    {
      id: 9,
      question: "What is overfitting?",
      options: [
        "Model too simple",
        "Model too complex",
        "Missing features",
        "Wrong dataset",
      ],
      answer: "Model too complex",
    },
    {
      id: 10,
      question: "Which metric evaluates classification?",
      options: ["Accuracy", "Loss", "Precision", "Recall"],
      answer: "Accuracy",
    },
  ],

  "ml-intro": [
    {
      id: 1,
      question: "Which metric is used for classification?",
      options: ["Accuracy", "Loss", "Gradient", "Epochs"],
      answer: "Accuracy",
    },
    {
      id: 2,
      question: "What is overfitting?",
      options: [
        "Model too simple",
        "Model too complex, fits training data too closely",
        "Model trained on wrong data",
        "Model with missing features",
      ],
      answer: "Model too complex, fits training data too closely",
    },
    {
      id: 3,
      question: "Which method splits dataset?",
      options: [
        "train_test_split()",
        "split_data()",
        "divide()",
        "partition()",
      ],
      answer: "train_test_split()",
    },
    {
      id: 4,
      question: "Supervised learning requires?",
      options: ["Labeled data", "Unlabeled data", "No data", "Random data"],
      answer: "Labeled data",
    },
    {
      id: 5,
      question: "Which algorithm is for regression?",
      options: [
        "Linear Regression",
        "Decision Tree",
        "K-Means",
        "Random Forest",
      ],
      answer: "Linear Regression",
    },
    {
      id: 6,
      question: "Which library is for ML in Python?",
      options: ["scikit-learn", "React", "jQuery", "NumPy"],
      answer: "scikit-learn",
    },
    {
      id: 7,
      question: "Which activation function is common?",
      options: ["ReLU", "CSS", "HTML", "fetch()"],
      answer: "ReLU",
    },
    {
      id: 8,
      question: "Overfitting can be reduced by?",
      options: ["Regularization", "Adding noise", "Ignoring data", "None"],
      answer: "Regularization",
    },
    {
      id: 9,
      question: "What is a dataset?",
      options: ["Collection of data", "A program", "A variable", "A function"],
      answer: "Collection of data",
    },
    {
      id: 10,
      question: "Which metric is for model evaluation?",
      options: ["Accuracy", "CSS", "HTML", "JS"],
      answer: "Accuracy",
    },
  ],

  "cyber-fundamentals": [
    {
      id: 1,
      question: "Which is a common cyber attack?",
      options: ["Phishing", "Painting", "Hosting", "Networking"],
      answer: "Phishing",
    },
    {
      id: 2,
      question: "What is the purpose of a firewall?",
      options: [
        "Store files",
        "Protect networks from unauthorized access",
        "Create malware",
        "Monitor employee activity",
      ],
      answer: "Protect networks from unauthorized access",
    },
    {
      id: 3,
      question: "Which is a secure password?",
      options: ["123456", "password", "MyP@ssw0rd!", "abcdef"],
      answer: "MyP@ssw0rd!",
    },
    {
      id: 4,
      question: "Two-factor authentication uses?",
      options: [
        "Password only",
        "SMS/code + password",
        "Email only",
        "Fingerprint only",
      ],
      answer: "SMS/code + password",
    },
    {
      id: 5,
      question: "VPN stands for?",
      options: [
        "Virtual Private Network",
        "Visual Private Node",
        "Variable Public Network",
        "Verified Personal Network",
      ],
      answer: "Virtual Private Network",
    },
    {
      id: 6,
      question: "Which is NOT a malware type?",
      options: ["Virus", "Worm", "Trojan", "HTML"],
      answer: "HTML",
    },
    {
      id: 7,
      question: "SSL is used for?",
      options: ["Encrypt data", "Delete data", "Modify data", "Send emails"],
      answer: "Encrypt data",
    },
    {
      id: 8,
      question: "What is phishing?",
      options: [
        "Fake website/email to steal info",
        "Website hack",
        "Data backup",
        "Firewall type",
      ],
      answer: "Fake website/email to steal info",
    },
    {
      id: 9,
      question: "Public key encryption uses?",
      options: ["Asymmetric key", "Symmetric key", "No key", "Password only"],
      answer: "Asymmetric key",
    },
    {
      id: 10,
      question: "Which port is used by HTTPS?",
      options: ["80", "443", "22", "21"],
      answer: "443",
    },
  ],
  //////////////////////////////// المواد الجامعية ////////////////////////////////
  "programming-1": [
    {
      id: 1,
      question: "Who is the creator of C++?",
      options: [
        "Dennis Ritchie",
        "Bjarne Stroustrup",
        "James Gosling",
        "Guido van Rossum",
      ],
      answer: "Bjarne Stroustrup",
    },
    {
      id: 2,
      question:
        "Which of the following is the correct way to output 'Hello World' in C++?",
      options: [
        'printf("Hello World");',
        'cout << "Hello World";',
        'System.out.println("Hello World");',
        'print("Hello World");',
      ],
      answer: 'cout << "Hello World";',
    },
    {
      id: 3,
      question:
        "What is the default access specifier for members of a class in C++?",
      options: ["public", "private", "protected", "friend"],
      answer: "private",
    },
    {
      id: 4,
      question: "Which operator is used for dynamic memory allocation in C++?",
      options: ["malloc", "alloc", "new", "calloc"],
      answer: "new",
    },
    {
      id: 5,
      question: "Which header is required to use cin and cout?",
      options: ["<stdio.h>", "<conio.h>", "<iostream>", "<stdlib.h>"],
      answer: "<iostream>",
    },
    {
      id: 6,
      question: "What is the scope resolution operator in C++?",
      options: ["::", "->", ".", "*"],
      answer: "::",
    },
    {
      id: 7,
      question: "Which of the following is not a fundamental data type in C++?",
      options: ["int", "float", "bool", "string"],
      answer: "string",
    },
    {
      id: 8,
      question: "What does OOP stand for?",
      options: [
        "Object Oriented Programming",
        "Ordered Object Programming",
        "Object Operated Programming",
        "Operational Object Programming",
      ],
      answer: "Object Oriented Programming",
    },
    {
      id: 9,
      question:
        "Which concept allows one function name to have multiple implementations?",
      options: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
      answer: "Polymorphism",
    },
    {
      id: 10,
      question:
        "What is the process of deriving a new class from an existing class called?",
      options: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"],
      answer: "Inheritance",
    },
    {
      id: 11,
      question: "Which keyword is used to create a class in C++?",
      options: ["class", "struct", "object", "type"],
      answer: "class",
    },
    {
      id: 12,
      question: "What will be the output of cout << 5 + 10 << endl; ?",
      options: ["5 + 10", "15", "510", "Compilation error"],
      answer: "15",
    },
    {
      id: 13,
      question: "Which of the following is a valid identifier in C++?",
      options: ["_myVar", "2var", "my-var", "my var"],
      answer: "_myVar",
    },
    {
      id: 14,
      question: "What is the size of 'char' data type in C++?",
      options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
      answer: "1 byte",
    },
    {
      id: 15,
      question:
        "Which function is called automatically when an object is created?",
      options: [
        "Destructor",
        "Main function",
        "Constructor",
        "Virtual function",
      ],
      answer: "Constructor",
    },
    {
      id: 16,
      question: "In C++, multiple inheritance is supported.",
      options: ["True", "False"],
      answer: "True",
    },
    {
      id: 17,
      question:
        "What is the output of the following code?\nint x = 10;\ncout << x++ << endl;",
      options: ["10", "11", "9", "Compilation error"],
      answer: "10",
    },
    {
      id: 18,
      question: "Which of the following is used to define a constant in C++?",
      options: ["const", "define", "final", "static"],
      answer: "const",
    },
    {
      id: 19,
      question:
        "Wrapping of data and functions into a single unit is known as:",
      options: ["Abstraction", "Polymorphism", "Encapsulation", "Inheritance"],
      answer: "Encapsulation",
    },
    {
      id: 20,
      question:
        "Which access specifier allows members to be accessed only within the same class?",
      options: ["public", "protected", "private", "friend"],
      answer: "private",
    },
  ],
  "Data-Structures": [
    {
      id: 1,
      question:
        "What is the time complexity to add an element at the beginning of a singly linked list?",
      options: ["a. O(n)", "b. O(1)", "c. O(log n)", "d. O(n²)"],
      answer: "b. O(1)",
    },
    {
      id: 2,
      question: "Which principle does a stack follow?",
      options: ["a. FIFO", "b. Random access", "c. LIFO", "d. Sorted order"],
      answer: "c. LIFO",
    },
    {
      id: 3,
      question: "Which principle does a queue follow?",
      options: ["a. LIFO", "b. Priority", "c. FIFO", "d. Random"],
      answer: "c. FIFO",
    },
    {
      id: 4,
      question:
        "In a binary search tree (BST), where are smaller values stored relative to the root?",
      options: [
        "a. Right subtree",
        "b. Anywhere",
        "c. Left subtree",
        "d. Same node",
      ],
      answer: "c. Left subtree",
    },
    {
      id: 5,
      question:
        "What is the time complexity of push and pop in an array-based stack?",
      options: ["a. O(n)", "b. O(1)", "c. O(log n)", "d. O(n²)"],
      answer: "b. O(1)",
    },
    {
      id: 6,
      question:
        "What does the 'next' pointer of the last node in a singly linked list point to?",
      options: [
        "a. head",
        "b. previous node",
        "c. null",
        "d. itself (circular)",
      ],
      answer: "c. null",
    },
    {
      id: 7,
      question:
        "In a full binary tree with I internal nodes, how many leaves L are there?",
      options: ["a. L = 2^I - 1", "b. L = I - 1", "c. L = I + 1", "d. L = 2I"],
      answer: "c. L = I + 1",
    },
    {
      id: 8,
      question: "What traversal prints BST nodes in sorted ascending order?",
      options: ["a. Postorder", "b. Preorder", "c. Level order", "d. Inorder"],
      answer: "d. Inorder",
    },
    {
      id: 9,
      question: "Time complexity of search in a balanced binary search tree?",
      options: ["a. O(1)", "b. O(n)", "c. O(n log n)", "d. O(log n)"],
      answer: "d. O(log n)",
    },
    {
      id: 10,
      question: "What is the postorder traversal order for a binary tree?",
      options: [
        "a. Root, left, right",
        "b. Left, root, right",
        "c. Right, left, root",
        "d. Left, right, root",
      ],
      answer: "d. Left, right, root",
    },
    {
      id: 11,
      question: "Which operation removes an element from a stack?",
      options: ["a. enqueue", "b. push", "c. pop", "d. peek"],
      answer: "c. pop",
    },
    {
      id: 12,
      question:
        "In an array-based circular queue, how is space efficiency improved?",
      options: [
        "a. By shifting elements",
        "b. By resizing",
        "c. Using modulo for indices",
        "d. Not possible",
      ],
      answer: "c. Using modulo for indices",
    },
    {
      id: 13,
      question:
        "When deleting a node with two children in a BST, what typically replaces it?",
      options: [
        "a. Parent",
        "b. Left child",
        "c. Inorder successor",
        "d. Right child",
      ],
      answer: "c. Inorder successor",
    },
    {
      id: 14,
      question:
        "Time complexity to count elements in a linked list without a size variable?",
      options: ["a. O(log n)", "b. O(1)", "c. None", "d. O(n)"],
      answer: "d. O(n)",
    },
    {
      id: 15,
      question:
        "What is the time complexity of enqueue and dequeue in a linked-list-based queue?",
      options: ["a. Both O(n)", "b. O(log n)", "c. O(1)", "d. O(n)"],
      answer: "c. O(1)",
    },
    {
      id: 16,
      question: "Which operation adds an element to a queue?",
      options: ["a. dequeue", "b. push", "c. enqueue", "d. peek"],
      answer: "c. enqueue",
    },
    {
      id: 17,
      question: "What is the height of a binary tree?",
      options: [
        "a. Total nodes",
        "b. Number of leaves",
        "c. Longest path edges from root to leaf",
        "d. Width",
      ],
      answer: "c. Longest path edges from root to leaf",
    },
    {
      id: 18,
      question: "In a stack, new elements are added at the:",
      options: ["a. Middle", "b. Bottom", "c. Anywhere", "d. Top"],
      answer: "d. Top",
    },
    {
      id: 19,
      question:
        "When inserting a value larger than the root in a BST, it goes to the:",
      options: ["a. Ignore", "b. Left", "c. Replace root", "d. Right"],
      answer: "d. Right",
    },
    {
      id: 20,
      question:
        "Which operation typically requires traversing the list in a singly linked list?",
      options: [
        "a. Delete from beginning",
        "b. Add at beginning",
        "c. Search",
        "d. Add at end (with tail)",
      ],
      answer: "c. Search",
    },
  ],
  "algo-1": [
    {
      id: 1,
      question:
        "The running time of the standard matrix multiplication algorithm (3 nested loops) is",
      options: ["O(n log n)", "O(n²)", "O(n³)", "O(n)"],
      answer: "O(n³)",
    },
    {
      id: 2,
      question: "Time complexity of breadth-first search is",
      options: ["O(E²)", "O(V²)", "O(V+E²)", "O(V+E)"],
      answer: "O(V+E)",
    },
    {
      id: 3,
      question: "A pivot element to partition unsorted list is used in",
      options: [
        "Tree sort",
        "Selection sort",
        "Quick sort",
        "Bubble sort",
        "Merge sort",
      ],
      answer: "Quick sort",
    },
    {
      id: 4,
      question:
        "What is T(n) for the code: nested loop i from 0 to n, j from 0 to n, print()",
      options: ["T(n)=n*n", "T(n)=n", "T(n)=2*n", "T(n)=n+n"],
      answer: "T(n)=n*n",
    },
    {
      id: 5,
      question:
        "What is T(n) for line number 2 in the given pseudocode (nested while loop)?",
      options: ["T(n)=n+1", "T(n)=n", "T(n)=n log n", "T(n)=2n+1"],
      answer: "T(n)=n",
    },
    {
      id: 6,
      question:
        "Most computer scientists use _____ to design and represent algorithms",
      options: [
        "low-level programming languages",
        "pseudocode",
        "natural languages",
        "high-level programming languages",
      ],
      answer: "pseudocode",
    },
    {
      id: 7,
      question: "The output of the code: for i in range(2,0): print(i)",
      options: ["0,0,1,0", "0,1", "error", "none of the mentioned"],
      answer: "error",
    },
    {
      id: 8,
      question:
        "The space factor when determining the efficiency of algorithm is measured by",
      options: [
        "Counting the average memory needed by the algorithm",
        "Counting the minimum disk space needed by the algorithm",
        "Counting the minimum memory needed by the algorithm",
        "Counting the maximum memory needed by the algorithm",
        "Counting the maximum disk space needed by the algorithm",
      ],
      answer: "Counting the maximum memory needed by the algorithm",
    },
    {
      id: 9,
      question:
        "If every node u in G is adjacent to every other node v in G, a graph is said to be",
      options: [
        "Finite",
        "Isolated",
        "Complete",
        "Regular",
        "Strongly connected",
      ],
      answer: "Complete",
    },
    {
      id: 10,
      question: "Select the true statement",
      options: [
        "Quick sort takes O(n² log n) time in its worst case",
        "Merge sort takes T(n)=2T(n/2)+O(n)",
        "None of the mentioned answers",
        "Both Quick and Merge sort algorithms have a recurrence T(n)=2T(n/4)+O(n²)",
        "Quick sort takes O(n²) time in its average case",
      ],
      answer: "Merge sort takes T(n)=2T(n/2)+O(n)",
    },
    {
      id: 11,
      question:
        "In general, there may be many legal topological orders for a given DAG.",
      options: ["True", "False"],
      answer: "True",
    },
    {
      id: 12,
      question:
        "The theta notation for counting frequencies code using dictionary is",
      options: ["Θ(n²)", "Θ(n log n)", "Θ(n)", "Θ(1)"],
      answer: "Θ(n)",
    },
    {
      id: 13,
      question:
        "The best case, in terms of the asymptotic running time, for QuickSort happens when:",
      options: [
        "The array is sorted in reverse",
        "The array is already sorted",
        "The number of elements to the right of the pivot is approximately equivalent to the number of elements to the left of the pivot",
        "All elements of the array are equal",
      ],
      answer:
        "The number of elements to the right of the pivot is approximately equivalent to the number of elements to the left of the pivot",
    },
    {
      id: 14,
      question: "The Divide-and-Conquer algorithm is",
      options: [
        "breaking the problem into several sub-problems that are like the original problem but smaller in size, solve the subproblems recursively, and then combine these solutions to create a solution to the original problem.",
        "none of the others options",
        "an algorithmic strategy that makes the best optimal choice at each small stage with the goal of this eventually leading to a globally optimum solution.",
        "is given a sequence of input and finds a sequence of solutions that build incrementally while adapting to the changes in the input.",
      ],
      answer:
        "breaking the problem into several sub-problems that are like the original problem but smaller in size, solve the subproblems recursively, and then combine these solutions to create a solution to the original problem.",
    },
    {
      id: 15,
      question: "A minimum spanning tree T —",
      options: [
        "The result of the BFS ALGORITHM.",
        "a tree that connects all vertices of maximum weight.",
        "a tree that connects all vertices.",
        "a tree that connects all vertices of minimum weight.",
      ],
      answer: "a tree that connects all vertices of minimum weight.",
    },
    {
      id: 16,
      question: "If T(n) = 5n log n + 900n, then T(n) ∈",
      options: ["True", "False"],
      answer: "True",
    },
    {
      id: 17,
      question: "The merge sort algorithm closely follows:",
      options: [
        "the greedy method.",
        "Dynamic Programming method.",
        "the divide-and-conquer method.",
        "Incremental method.",
      ],
      answer: "the divide-and-conquer method.",
    },
    {
      id: 18,
      question:
        "When applying the master method to solve the recurrence function: T(n) = 2T(n/2) + n lg n, The solution will be",
      options: [
        "Θ(nlogn)",
        "Θ(n)",
        "Θ(nlog² n)",
        "Master method does not apply",
      ],
      answer: "Θ(nlog² n)",
    },
    {
      id: 19,
      question: "3ⁿ grows slower than 2ⁿ.",
      options: ["True", "False"],
      answer: "False",
    },
    {
      id: 20,
      question: "In a graph if e=[u, v], Then u and v are called",
      options: [
        "adjacent nodes",
        "all of the other solutions are true",
        "neighbors",
        "endpoints of e",
      ],
      answer: "adjacent nodes",
    },
  ],
  "Wireless-Networks": [
    {
      id: 1,
      question:
        "In GSM, the handoff with common MSC consists of how many steps?",
      options: ["a. 8", "b. 6", "c. 1", "d. 5"],
      answer: "b. 6",
    },
    {
      id: 2,
      question:
        "In mobility approaches, communication from correspondent to mobile goes through home agent, then forwarded to remote called?",
      options: [
        "a. direct routing",
        "b. foreign routing",
        "c. indirect routing",
        "d. All of mentioned is true",
      ],
      answer: "c. indirect routing",
    },
    {
      id: 3,
      question: "Channel correction mechanism is?",
      options: [
        "a. OFDM",
        "b. Diversity techniques",
        "c. Forward error correction and MIMO",
        "d. All of mentioned is true",
      ],
      answer: "d. All of mentioned is true",
    },
    {
      id: 4,
      question: "The physical layer specifies?",
      options: [
        "a. The data rate",
        "b. All of the mentioned is true",
        "c. Characteristics of the transmission medium",
        "d. The nature of the signals",
      ],
      answer: "b. All of the mentioned is true",
    },
    {
      id: 5,
      question: "Which standard defines wireless LAN operation?",
      options: [
        "a. IEEE 802.1",
        "b. IEEE 802.3",
        "c. IEEE 802.1x",
        "d. IEEE 802.11",
      ],
      answer: "d. IEEE 802.11",
    },
    {
      id: 6,
      question: "Piconet in Bluetooth is?",
      options: [
        "a. Makes efficient use of bandwidth",
        "b. Device in one piconet may exist as master or slave in another piconet",
        "c. Allows many devices to share same area",
        "d. None of the mentioned is true",
      ],
      answer: "d. None of the mentioned is true",
    },
    {
      id: 7,
      question:
        "In Bluetooth, the link transmission technique in which data are transmitted in one direction at a time is called?",
      options: [
        "a. FH-CDMA",
        "b. a time division duplex (TDD)",
        "c. None of the mentioned is true",
        "d. code division multiple access (CDMA)",
      ],
      answer: "b. a time division duplex (TDD)",
    },
    {
      id: 8,
      question: "In Class 3, maximum range in Bluetooth frequency power is?",
      options: [
        "a. Outputs 100 mW",
        "b. output is 1 mW",
        "c. None of the mentioned is true",
        "d. Outputs 2.4 mW",
      ],
      answer: "b. output is 1 mW",
    },
    {
      id: 9,
      question: "In Bluetooth Scatternet features?",
      options: [
        "a. Basic unit of Bluetooth networking",
        "b. Allows many devices to share same area",
        "c. Master determines channel and phase",
        "d. Master and one to seven slave devices",
      ],
      answer: "b. Allows many devices to share same area",
    },
    {
      id: 10,
      question:
        "Compared with DSSS, which one does OFDM leverage to achieve its superior data rates?",
      options: [
        "a. Wider 20-MHz channel width",
        "b. 48 subcarriers in a channel",
        "c. Faster chipping rates",
        "d. Higher-frequency band",
      ],
      answer: "b. 48 subcarriers in a channel",
    },
    {
      id: 11,
      question:
        "Which standards cannot use multiple spatial streams on a transmitter and a receiver?",
      options: [
        "a. 802.11b",
        "b. 802.11a",
        "c. 802.11n and 802.11ac",
        "d. 802.11g",
      ],
      answer: "a. 802.11b",
    },
    {
      id: 12,
      question:
        "In GSM handoff between MSCs, first MSC visited during call remains routed through?",
      options: ["a. anchor MSC", "b. MSC", "c. HOME network", "d. PSTN"],
      answer: "a. anchor MSC",
    },
    {
      id: 13,
      question:
        "To avoid interference problems when placing a new 802.11n transmitter, your transmitter's signal should be how much greater than others?",
      options: ["a. (+20) dB", "b. (+10) dB", "c. (+3) dB", "d. 0 dB"],
      answer: "a. (+20) dB",
    },
    {
      id: 14,
      question:
        "Put the following modulation schemes in order of number of possible changes to the carrier signal, from lowest to highest.",
      options: ["a. 64-QAM", "b. 16-QAM", "c. QPSK", "d. DBPSK"],
      answer: "d. DBPSK → QPSK → 16-QAM → 64-QAM",
    },
    {
      id: 15,
      question:
        "In mobility approaches, correspondent gets foreign address of mobile, sends directly to mobile is called?",
      options: [
        "a. direct routing",
        "b. foreign routing",
        "c. indirect routing",
        "d. All of mentioned is true",
      ],
      answer: "a. direct routing",
    },
    {
      id: 16,
      question:
        "Bluetooth features include universal short-range wireless capability up to?",
      options: [
        "a. 10 m can share up to 2.1 Mbps",
        "b. Devices within 10 m can share up to 2.1 Mbps",
        "c. All of the mentioned is true",
        "d. Uses 2.4-GHz band",
      ],
      answer: "c. All of the mentioned is true",
    },
    {
      id: 17,
      question: "Which device is used to connect two networks?",
      options: [
        "a. Router",
        "b. Intermediate System (IS)",
        "c. End System (ES)",
        "d. Bridge",
      ],
      answer: "d. Bridge",
    },
    {
      id: 18,
      question:
        "In the graph of cellular network architecture, which component represents the Mobile Switching Center?",
      options: [
        "a. mobile users",
        "b. base station (BS)",
        "c. air-interface",
        "d. Mobile switching center",
      ],
      answer: "d. Mobile switching center",
    },
    {
      id: 19,
      question:
        "In Bluetooth, a network formed by interconnecting multiple piconets is called?",
      options: [
        "a. Piconet",
        "b. Scatternet",
        "c. Ad-hoc network",
        "d. Master network",
      ],
      answer: "b. Scatternet",
    },
    {
      id: 20,
      question:
        "In GSM architecture, the database that stores subscriber information permanently is?",
      options: ["a. VLR", "b. HLR", "c. AUC", "d. EIR"],
      answer: "b. HLR",
    },
  ],
  "Operating-System": [
    {
      id: 1,
      question: "Run time mapping from virtual to physical address is done by",
      options: ["MMU", "none of the mentioned", "CPU", "PCI"],
      answer: "MMU",
    },
    {
      id: 2,
      question:
        "Which of the following is a criterion to evaluate a scheduling algorithm?",
      options: [
        "Waiting Time: Amount of time spent ready to run but not running.",
        "All of the other.",
        "CPU Utilization: Keep CPU utilization as high as possible.",
        "Throughput: number of processes completed per unit time.",
      ],
      answer: "All of the other.",
    },
    {
      id: 3,
      question: "In Direct Communication:",
      options: [
        "Link established only if processes share a common mailbox",
        "Processes must name each other explicitly",
        "A link may be associated with many processes",
        "Messages are directed and received from mailboxes",
      ],
      answer: "Processes must name each other explicitly",
    },
    {
      id: 4,
      question:
        "The wait operation of the semaphore basically works on the basic ______ system call.",
      options: ["wait()", "stop()", "hold()", "block()"],
      answer: "wait()",
    },
    {
      id: 5,
      question: "The Resource-allocation-Graph algorithm is used:",
      options: [
        "to fix a deadlocked state",
        "to prevent deadlock in operating systems",
        "to detect deadlock in operating systems",
        "to prevent or detect deadlock in operating system",
      ],
      answer: "to detect deadlock in operating systems",
    },
    {
      id: 6,
      question:
        "An optimal scheduling algorithm in terms of minimizing the average waiting time of a given set of processes is:",
      options: [
        "FCFS scheduling algorithm",
        "Shortest job - first scheduling algorithm",
        "other",
        "Round robin scheduling algorithm",
      ],
      answer: "Shortest job - first scheduling algorithm",
    },
    {
      id: 7,
      question: "The main disadvantage of spinlocks?",
      options: [
        "they are unreliable sometimes",
        "they are not sufficient for many process",
        "they are too complex for programmers",
        "they require busy waiting",
      ],
      answer: "they require busy waiting",
    },
    {
      id: 8,
      question: "Non-Preemptive Scheduling is occur in:",
      options: [
        "Switches from running to waiting state",
        "Switches from waiting to ready",
        "Switches from running to ready state",
        "Other",
      ],
      answer: "Switches from running to waiting state",
    },
    {
      id: 9,
      question:
        "Consider a logical address of 16 pages of 1024 bytes each, mapped onto a physical memory of 64 frames. How many bits are there in the logical address?",
      options: ["16 bits", "14 bits", "None of the others", "1024 bits"],
      answer: "14 bits",
    },
    {
      id: 10,
      question:
        "In one of the deadlock prevention methods, impose a total ordering of all resource types... This violates the __________ condition of deadlock.",
      options: [
        "Circular Wait",
        "Mutual exclusion",
        "Hold and Wait",
        "No Preemption",
      ],
      answer: "Circular Wait",
    },
    {
      id: 11,
      question: "The average turnaround time can be improved:",
      options: [
        "as the time-quantum size decrease.",
        "If most processes not finish the CPU burst in single time quantum.",
        "as the time-quantum size increase.",
        "If most processes finish their next CPU burst in single time quantum.",
      ],
      answer:
        "If most processes finish their next CPU burst in single time quantum.",
    },
    {
      id: 12,
      question:
        "_____ is an instruction that forces any change in memory to be propagated to all other processors.",
      options: [
        "A Mutual exclusion.",
        "A semaphore",
        "A memory barrier",
        "A race condition",
      ],
      answer: "A memory barrier",
    },
    {
      id: 13,
      question: "A process may include a heap to save:",
      options: [
        "global variables",
        "temporary data",
        "program counter",
        "Dynamic variables",
      ],
      answer: "Dynamic variables",
    },
    {
      id: 14,
      question:
        "What is interprocess COMMUNICATION between two threads of same process?",
      options: [
        "None of the mentioned",
        "A COMMUNICATION between two threads of same process",
        "A COMMUNICATION between two process",
        "None of the mentioned",
      ],
      answer: "None of the mentioned",
    },
    {
      id: 15,
      question:
        "Which of the following multithreading models that does not support Multiprocessors?",
      options: ["Many-to-Many", "One-to-One", "Many-to-One", "Two-level model"],
      answer: "Many-to-One",
    },
    {
      id: 16,
      question: "A trap is",
      options: [
        "A synchronous interrupt caused by an exception",
        "An interrupt caused by an exception",
        "A software-generated interrupt caused by an exception",
        "None of the above",
      ],
      answer: "A software-generated interrupt caused by an exception",
    },
    {
      id: 17,
      question:
        "Switching the CPU to another Process requires saving state of the old process and loading new process state is called as",
      options: [
        "Process Blocking",
        "Context Switch",
        "Time Sharing",
        "None of the above",
      ],
      answer: "Context Switch",
    },
    {
      id: 18,
      question:
        "This scheme is called swapping. The process is swapped out, and is later swapped in by:",
      options: [
        "Medium-Term Scheduler",
        "Short-term scheduler",
        "Long Term Scheduling",
        "None of the above",
      ],
      answer: "Medium-Term Scheduler",
    },
    {
      id: 19,
      question: "Direct Communication means:",
      options: [
        "Messages are directed and received from mailboxes",
        "Processes must name each other explicitly",
        "All of them",
        "A thread",
      ],
      answer: "Processes must name each other explicitly",
    },
    {
      id: 20,
      question: "A critical region is",
      options: [
        "a program segment that has not been proved bug-free",
        "a program segment where shared resources are not accessed",
        "one which is enclosed by a pair of wait and signal operations on semaphores",
        "a program segment that often causes unexpected system crashes",
      ],
      answer:
        "one which is enclosed by a pair of wait and signal operations on semaphores",
    },
  ],
  "discrete-math": [
    {
      id: 1,
      question:
        "The running time of the standard matrix multiplication algorithm (3 nested loops) is",
      options: ["O(n log n)", "O(n²)", "O(n³)", "O(n)"],
      answer: "O(n³)",
    },
    {
      id: 2,
      question: "Time complexity of breadth-first search is",
      options: ["O(E²)", "O(V²)", "O(V+E²)", "O(V+E)"],
      answer: "O(V+E)",
    },
    {
      id: 3,
      question: "A pivot element to partition unsorted list is used in",
      options: [
        "Tree sort",
        "Selection sort",
        "Quick sort",
        "Bubble sort",
        "Merge sort",
      ],
      answer: "Quick sort",
    },
    {
      id: 4,
      question:
        "What is T(n) for the code: nested loop i from 0 to n, j from 0 to n, print()",
      options: ["T(n)=n*n", "T(n)=n", "T(n)=2*n", "T(n)=n+n"],
      answer: "T(n)=n*n",
    },
    {
      id: 5,
      question:
        "What is T(n) for line number 2 in the given pseudocode (nested while loop)?",
      options: ["T(n)=n+1", "T(n)=n", "T(n)=n log n", "T(n)=2n+1"],
      answer: "T(n)=n",
    },
    {
      id: 6,
      question:
        "Most computer scientists use _____ to design and represent algorithms",
      options: [
        "low-level programming languages",
        "pseudocode",
        "natural languages",
        "high-level programming languages",
      ],
      answer: "pseudocode",
    },
    {
      id: 7,
      question: "The output of the code: for i in range(2,0): print(i)",
      options: ["0,0,1,0", "0,1", "error", "none of the mentioned"],
      answer: "error",
    },
    {
      id: 8,
      question:
        "The space factor when determining the efficiency of algorithm is measured by",
      options: [
        "Counting the average memory needed by the algorithm",
        "Counting the minimum disk space needed by the algorithm",
        "Counting the minimum memory needed by the algorithm",
        "Counting the maximum memory needed by the algorithm",
        "Counting the maximum disk space needed by the algorithm",
      ],
      answer: "Counting the maximum memory needed by the algorithm",
    },
    {
      id: 9,
      question:
        "If every node u in G is adjacent to every other node v in G, a graph is said to be",
      options: [
        "Finite",
        "Isolated",
        "Complete",
        "Regular",
        "Strongly connected",
      ],
      answer: "Complete",
    },
    {
      id: 10,
      question: "Select the true statement",
      options: [
        "Quick sort takes O(n² log n) time in its worst case",
        "Merge sort takes T(n)=2T(n/2)+O(n)",
        "None of the mentioned answers",
        "Both Quick and Merge sort algorithms have a recurrence T(n)=2T(n/4)+O(n²)",
        "Quick sort takes O(n²) time in its average case",
      ],
      answer: "Merge sort takes T(n)=2T(n/2)+O(n)",
    },
    {
      id: 11,
      question:
        "In general, there may be many legal topological orders for a given DAG.",
      options: ["True", "False"],
      answer: "True",
    },
    {
      id: 12,
      question:
        "The theta notation for counting frequencies code using dictionary is",
      options: ["Θ(n²)", "Θ(n log n)", "Θ(n)", "Θ(1)"],
      answer: "Θ(n)",
    },
    {
      id: 13,
      question:
        "The best case, in terms of the asymptotic running time, for QuickSort happens when:",
      options: [
        "The array is sorted in reverse",
        "The array is already sorted",
        "The number of elements to the right of the pivot is approximately equivalent to the number of elements to the left of the pivot",
        "All elements of the array are equal",
      ],
      answer:
        "The number of elements to the right of the pivot is approximately equivalent to the number of elements to the left of the pivot",
    },
    {
      id: 14,
      question: "The Divide-and-Conquer algorithm is",
      options: [
        "breaking the problem into several sub-problems that are like the original problem but smaller in size, solve the subproblems recursively, and then combine these solutions to create a solution to the original problem.",
        "none of the others options",
        "an algorithmic strategy that makes the best optimal choice at each small stage with the goal of this eventually leading to a globally optimum solution.",
        "is given a sequence of input and finds a sequence of solutions that build incrementally while adapting to the changes in the input.",
      ],
      answer:
        "breaking the problem into several sub-problems that are like the original problem but smaller in size, solve the subproblems recursively, and then combine these solutions to create a solution to the original problem.",
    },
    {
      id: 15,
      question: "A minimum spanning tree T —",
      options: [
        "The result of the BFS ALGORITHM.",
        "a tree that connects all vertices of maximum weight.",
        "a tree that connects all vertices.",
        "a tree that connects all vertices of minimum weight.",
      ],
      answer: "a tree that connects all vertices of minimum weight.",
    },
    {
      id: 16,
      question: "If T(n) = 5n log n + 900n, then T(n) ∈",
      options: ["True", "False"],
      answer: "True",
    },
    {
      id: 17,
      question: "The merge sort algorithm closely follows:",
      options: [
        "the greedy method.",
        "Dynamic Programming method.",
        "the divide-and-conquer method.",
        "Incremental method.",
      ],
      answer: "the divide-and-conquer method.",
    },
    {
      id: 18,
      question:
        "When applying the master method to solve the recurrence function: T(n) = 2T(n/2) + n lg n, The solution will be",
      options: [
        "Θ(nlogn)",
        "Θ(n)",
        "Θ(nlog² n)",
        "Master method does not apply",
      ],
      answer: "Θ(nlog² n)",
    },
    {
      id: 19,
      question: "3ⁿ grows slower than 2ⁿ.",
      options: ["True", "False"],
      answer: "False",
    },
    {
      id: 20,
      question: "In a graph if e=[u, v], Then u and v are called",
      options: [
        "adjacent nodes",
        "all of the other solutions are true",
        "neighbors",
        "endpoints of e",
      ],
      answer: "adjacent nodes",
    },
  ],
  "digital-logic": [
    {
      id: 1,
      question: "The two types of gates which are called universal gates are:",
      options: ["AND/NAND", "AND/OR", "OR/NOR", "NAND/NOR"],
      answer: "NAND/NOR",
    },
    {
      id: 2,
      question: "The logic gate that gives the complement of its input is:",
      options: ["XOR", "Inverter", "OR", "AND"],
      answer: "Inverter",
    },
    {
      id: 3,
      question:
        "Which of the following expressions is in the POS (Product of Sums) form?",
      options: ["(A+B)(C+D)", "AB + CD", "A.B.C", "A+B+C"],
      answer: "(A+B)(C+D)",
    },
    {
      id: 4,
      question: "Applying DeMorgan's theorem to the expression (AB)'C we get:",
      options: ["A' + B'C", "A'C + B'C", "A' + B' + C", "A'B'C"],
      answer: "A'C + B'C",
    },
    {
      id: 5,
      question: "What is the Boolean expression for a 2 input XNOR gate?",
      options: ["X = A'B' + AB", "X = AB", "X = A+B", "X = A'B + AB'"],
      answer: "X = A'B' + AB",
    },
    {
      id: 6,
      question: "K-map is used for:",
      options: [
        "function minimization",
        "logic gate creation",
        "function maximization",
        "None of them",
      ],
      answer: "function minimization",
    },
    {
      id: 7,
      question: "A K map with 2 variables has:",
      options: ["32 cells", "4 cells", "8 cells", "16 cells"],
      answer: "4 cells",
    },
    {
      id: 8,
      question:
        "The binary number for decimal -17 into signed 6-bit numbers in Sign-Magnitude system is:",
      options: ["110011", "110001", "101111", "None of the Above"],
      answer: "110001",
    },
    {
      id: 9,
      question: "The 1s complement of signed 9-bit numbers 101100100 is:",
      options: ["010011011", "110011011", "010011000", "001100100"],
      answer: "010011011",
    },
    {
      id: 10,
      question: "The binary number 110110110 is equal to the decimal number:",
      options: ["480", "338", "438", "512"],
      answer: "438",
    },
    {
      id: 11,
      question:
        "Determine the values of A, B, C, and D that make the product term AB'C'D equal to 1:",
      options: [
        "A=0, B=1, C=1, D=0",
        "A=1, B=1, C=1, D=1",
        "A=1, B=0, C=0, D=1",
        "A=0, B=0, C=0, D=0",
      ],
      answer: "A=1, B=0, C=0, D=1",
    },
    {
      id: 12,
      question: "In S-R flip-flop, if Q=0 the output is said to be:",
      options: ["Reset", "Previous state", "Current state", "Set"],
      answer: "Reset",
    },
    {
      id: 13,
      question: "A J-K flip-flop is in a 'no change' condition when:",
      options: ["J=1, K=1", "J=0, K=1", "J=0, K=0", "J=1, K=0"],
      answer: "J=0, K=0",
    },
    {
      id: 14,
      question: "How is a J-K flip-flop made to toggle?",
      options: ["J=0, K=1", "J=0, K=0", "J=1, K=1", "J=1, K=0"],
      answer: "J=1, K=1",
    },
    {
      id: 15,
      question: "The output of a D latch will not change if:",
      options: [
        "Enable is not active",
        "D is LOW",
        "all of the above",
        "The output is LOW",
      ],
      answer: "Enable is not active",
    },
    {
      id: 16,
      question:
        "If A, B and C are the inputs of a full adder then the carry is given by:",
      options: [
        "(A AND B) OR (A AND B)C",
        "A XOR B XOR (A XOR B) AND C",
        "A AND B OR (A XOR B) AND C",
        "A OR B OR (A AND B) C",
      ],
      answer: "A AND B OR (A XOR B) AND C",
    },
    {
      id: 17,
      question:
        "An asynchronous counter differs from a synchronous counter in:",
      options: [
        "The type of flip-flop used",
        "The number of states in its sequence",
        "The method of clocking",
        "None of them",
      ],
      answer: "The method of clocking",
    },
    {
      id: 18,
      question:
        "A 4-bit binary counter has a terminal count (maximum count) of:",
      options: ["4", "10", "15", "16"],
      answer: "15",
    },
    {
      id: 19,
      question:
        "In a multiplexer, the selection of a particular input line is controlled by:",
      options: [
        "Data Input",
        "Control Input (Select lines)",
        "Logic Gates",
        "Both Control Input and Data Input",
      ],
      answer: "Control Input (Select lines)",
    },
    {
      id: 20,
      question:
        "The time required for a pulse to go from its LOW level to its HIGH level is called the:",
      options: [
        "The pulse width (tW)",
        "rise time (tr)",
        "periodic",
        "fall time (tf)",
      ],
      answer: "rise time (tr)",
    },
  ],
  "artificial-intelligence": [
    {
      id: 1,
      question: "What is the primary focus of 'Weak AI'?",
      options: [
        "Duplication of intelligence to understand it",
        "Simulation of intelligence to make computers more useful",
        "Mimicking the human mind and its neural structure",
        "Performing tasks exactly the way a human might do",
      ],
      answer: "Simulation of intelligence to make computers more useful",
    },
    {
      id: 2,
      question:
        "Which early expert system was designed to identify the structure of chemical compounds?",
      options: ["MYCIN", "XCON", "DENDRAL", "PROSPECTOR"],
      answer: "DENDRAL",
    },
    {
      id: 3,
      question:
        "The term 'Artificial Intelligence' was proposed by John McCarthy in which year?",
      options: ["1950", "1956", "1943", "1965"],
      answer: "1956",
    },
    {
      id: 4,
      question:
        "According to the document, 'Intelligence' includes the ability to:",
      options: [
        "Learn and understand",
        "Reason and think",
        "Solve problems efficiently",
        "All of the above",
      ],
      answer: "All of the above",
    },
    {
      id: 5,
      question:
        "In the Turing Test, a machine is considered intelligent if it can:",
      options: [
        "Process data faster than a human",
        "Fool a human interrogator into believing it is a person",
        "Solve complex mathematical equations",
        "Play a game of chess perfectly",
      ],
      answer: "Fool a human interrogator into believing it is a person",
    },
    {
      id: 6,
      question:
        "Which expert system is specifically used for diagnosing infectious blood diseases?",
      options: ["DENDRAL", "MYCIN", "DIPMETER", "ELIZA"],
      answer: "MYCIN",
    },
    {
      id: 7,
      question:
        "In Propositional Logic, a 'Tautology' is a proposition that is:",
      options: [
        "Always false",
        "Sometimes true and sometimes false",
        "Always true",
        "Neither true nor false",
      ],
      answer: "Always true",
    },
    {
      id: 8,
      question:
        "Which of the following is NOT a component of a defined Search Problem?",
      options: ["Initial state", "Goal test", "Branching factor", "Path cost"],
      answer: "Branching factor",
    },
    {
      id: 9,
      question: "In a search tree, the 'Branching Factor' (BF) is defined as:",
      options: [
        "The maximum depth of the tree",
        "The number of children at each node",
        "The total number of nodes in the tree",
        "The depth of the optimal solution",
      ],
      answer: "The number of children at each node",
    },
    {
      id: 10,
      question:
        "Which search strategy is guaranteed to find the optimal solution (highest quality)?",
      options: [
        "Depth-First Search (DFS)",
        "Breadth-First Search (BFS)",
        "Hill Climbing",
        "Depth-Limited Search (DLS)",
      ],
      answer: "Breadth-First Search (BFS)",
    },
    {
      id: 11,
      question: "The evaluation function used in the A* search algorithm is:",
      options: [
        "f(n) = g(n)",
        "f(n) = h(n)",
        "f(n) = g(n) + h(n)",
        "f(n) = g(n) - h(n)",
      ],
      answer: "f(n) = g(n) + h(n)",
    },
    {
      id: 12,
      question:
        "A major challenge in Hill Climbing search where a state is better than all neighbors but not the global best is called:",
      options: ["Plateau", "Ridge", "Local Maxima", "Dead end"],
      answer: "Local Maxima",
    },
    {
      id: 13,
      question: "In the Minimax algorithm, the player 'MAX' attempts to:",
      options: [
        "Minimize the opponent's score",
        "Maximize their own advantage/score",
        "Choose moves randomly",
        "End the game as quickly as possible",
      ],
      answer: "Maximize their own advantage/score",
    },
    {
      id: 14,
      question: "What is the purpose of 'Alpha-Beta Pruning' in game trees?",
      options: [
        "To increase the depth of the search",
        "To reduce the number of nodes that need to be examined",
        "To change the rules of the game",
        "To help the MIN player win",
      ],
      answer: "To reduce the number of nodes that need to be examined",
    },
    {
      id: 15,
      question: "Chess is classified as what type of game?",
      options: [
        "Deterministic with Perfect Information",
        "Chance with Perfect Information",
        "Deterministic with Imperfect Information",
        "Chance with Imperfect Information",
      ],
      answer: "Deterministic with Perfect Information",
    },
    {
      id: 16,
      question:
        "Which programming language was developed by John McCarthy in 1958 for AI work?",
      options: ["PROLOG", "LISP", "Java", "C++"],
      answer: "LISP",
    },
    {
      id: 17,
      question:
        "The first match where Deep Blue defeated world champion Garry Kasparov occurred in:",
      options: ["1950", "1996 (First Game) / 1997 (Match win)", "1986", "2010"],
      answer: "1996 (First Game) / 1997 (Match win)",
    },
    {
      id: 18,
      question: "In logic, the 'Conjunction' (p ∧ q) is true only when:",
      options: [
        "p is true",
        "q is true",
        "Both p and q are true",
        "Either p or q is true",
      ],
      answer: "Both p and q are true",
    },
    {
      id: 19,
      question:
        "Which AI sub-discipline deals with gaining high-level understanding from digital images or videos?",
      options: [
        "Natural Language Processing",
        "Computer Vision",
        "Robotics",
        "Machine Learning",
      ],
      answer: "Computer Vision",
    },
    {
      id: 20,
      question:
        "A 'Proposition' in logic is defined as a declarative sentence that is:",
      options: [
        "Always true",
        "Either true or false, but not both",
        "A question or a command",
        "Only applicable to mathematical equations",
      ],
      answer: "Either true or false, but not both",
    },
  ],
  "embedded-systems": [
    {
      id: 1,
      question:
        'String txt1 = "Al-Huson University College";\nString txt2 = "Huson";\nvoid setup() { Serial.begin(9600); Serial.println(txt1.indexOf(txt2)); }',
      options: ["a. Huson University College", "b. 4", "c. 3", "d. Huson"],
      answer: "c",
    },
    {
      id: 2,
      question: "digitalWrite(pin, value)",
      options: [
        "a. value: HIGH or LOW",
        "b. value: 0 or 1023",
        "c. value: 0 to 255",
        "d. value: 0 or 5 volt",
      ],
      answer: "a",
    },
    {
      id: 3,
      question:
        "const int LED_BUILTIN = 8;\nvoid setup() { pinMode(ledPin, OUTPUT); Serial.begin(9600); pinMode(LED_BUILTIN, OUTPUT); Serial.println(LED_BUILTIN); }\nvoid loop() { digitalWrite(LED_BUILTIN, HIGH); delay(1000); digitalWrite(LED_BUILTIN, LOW); delay(1000); }",
      options: ["a. 8", "b. 20", "c. 13", "d. error"],
      answer: "d",
    },
    {
      id: 4,
      question:
        "void setup() { Serial.begin(9600); Serial.println(ceil(5.2)); }",
      options: ["a. 5", "b. 5.5", "c. 6", "d. 5.2"],
      answer: "c",
    },
    {
      id: 5,
      question:
        "int myValue = 0;\nvoid setup() { myValue = myValue - 1; myValue = 1; Serial.begin(9600); Serial.println(myValue); }",
      options: ["a. 1", "b. -2", "c. 2", "d. -1"],
      answer: "b",
    },
    {
      id: 6,
      question:
        "void setup() { Serial.begin(9600); Serial.println(floor(-1.1)); }",
      options: ["a. -1.00", "b. 1.00", "c. 2.00", "d. -2.00"],
      answer: "d",
    },
    {
      id: 7,
      question: "myMinValue = min(myValue, 200);",
      options: [
        "a. myMaxValue will be the larger of myVal or 100",
        "b. myMinValue will be the smaller than 200",
        "c. myMaxValue will be the larger than 100",
        "d. myMinValue will be the smaller of myVal or 200",
      ],
      answer: "d",
    },
    {
      id: 8,
      question: "DHT22 Sensor is",
      options: [
        "a. Distance sensor",
        "b. Light sensor",
        "c. Temperature and humidity sensor",
        "d. color sensor",
      ],
      answer: "c",
    },
    {
      id: 9,
      question: "random(12);",
      options: [
        "a. returns a random number between 0 and max 12",
        "b. returns a random number between 1 and max 12",
        "c. returns a random number between 0 and max 11",
        "d. returns a random number between 1 and max 11",
      ],
      answer: "c",
    },
    {
      id: 10,
      question:
        "void setup() { Serial.begin(9600); Serial.println( floor(-1.1) ); }",
      options: ["a. -1.00", "b. -2.00", "c. 2.00", "d. 1.00"],
      answer: "b",
    },
    {
      id: 11,
      question: "The only difference between IR light and visible light is",
      options: [
        "a. the frequency and voltage",
        "b. the wavelength",
        "c. the frequency and wavelength",
        "d. the current and voltage",
      ],
      answer: "c",
    },
    {
      id: 12,
      question: "Servos are controlled by sending",
      options: [
        "a. one LOW digital signal",
        "b. only 5volt DC",
        "c. electrical pulse of variable width (PWM)",
        "d. one HIGH digital signal",
      ],
      answer: "c",
    },
    {
      id: 13,
      question:
        'String txt1 = "Al-Huson";\nString txt2 = "College";\nvoid setup() { Serial.begin(9600); Serial.println(txt2); Serial.println("="); Serial.println(txt2.length()); Serial.println(txt1.endsWith(txt2)); }',
      options: [
        "a. College=7",
        "b. Al-Huson= 8",
        "c. Huson= 5",
        "d. College=7 0",
      ],
      answer: "d",
    },
    {
      id: 14,
      question:
        'String a="bird ";\nvoid setup() { Serial.begin(9600); a.substring(3); Serial.println( a.substring(3)); }',
      options: ["a. bird", "b. d", "c. bid", "d. id"],
      answer: "d",
    },
    {
      id: 15,
      question:
        "Configure the specified pin to behave either as an input or an output",
      options: [
        "a. PinMode(pin mode)",
        "b. pinMode(pin mode)",
        "c. pinmode(pin mode)",
        "d. PINMode(pin mode)",
      ],
      answer: "b",
    },
    {
      id: 16,
      question: "In light sensors: Resistance inversely proportional to light",
      options: ["True", "False"],
      answer: "True",
    },
    {
      id: 17,
      question: "Arduino Analog input pins",
      options: [
        "a. Takes input voltage up to 5 v pins A1 to A6 on the board",
        "b. Takes input voltage up to 5 v pins A0 to A5 on the board",
        "c. Takes input voltage up to 3.3 v pins A0 to A5 on the board",
        "d. Takes input voltage up to 5 v pins 1 to 13 on the board",
      ],
      answer: "b",
    },
    {
      id: 18,
      question:
        "int myValue=5;\nvoid setup() { Serial.begin(9600); myValue = pow(2,3); Serial.println( myValue-=1 %2); }",
      options: ["a. 8", "b. 2", "c. 5", "d. 1"],
      answer: "d",
    },
    {
      id: 19,
      question:
        'String a="University ";\nvoid setup() { Serial.begin(9600); a.substring(3); Serial.println( a.substring(2,4)); }',
      options: ["a. iver", "b. niv", "c. N iv", "d. ive"],
      answer: "c",
    },
    {
      id: 20,
      question: "analogWrite(pin, value)",
      options: [
        "a. value: the duty cycle between 0 (always off) and 1023 (always on)",
        "b. value: the duty cycle between 0 (always off) and 1024 (always on)",
        "c. value: the duty cycle between 0 (always off) and 255 (always on)",
        "d. value: the duty cycle between 0 (always off) and 512 (always on)",
      ],
      answer: "c",
    },
  ],
  "Numerical-Analysis": [
    {
      id: 1,
      question:
        "MYCIN is one of the earliest expert system projects. What is the main function of MYCIN?",
      options: [
        "a. Used for blood disease diagnosis",
        "b. A computer configuration system",
        "c. Used in identifying the structure of chemical compounds",
        "d. Used for geological data analysis for minerals",
      ],
      answer: "a",
    },
    {
      id: 2,
      question:
        "Assume f(x) is a continuous function on the closed interval [5.1, 9.4] and you applied the bisection method to solve f(x)=0. If the minimum number of iterations you did is 23. Compute the tolerance error.",
      options: ["a. 10⁸", "b. 10⁻⁹", "c. 10⁻⁸", "d. 10⁻⁶", "e. 10⁶"],
      answer: "c",
    },
    {
      id: 3,
      question: "One of the following numbers is in a normalized decimal form:",
      options: [
        "a. 3.4885 × 10⁴",
        "b. 0.1286 × 10⁴",
        "c. -12.0337 × 10⁻⁴",
        "d. 12.0337 × 10⁻⁴",
        "e. -0.1286 × 10⁴",
      ],
      answer: "c",
    },
    {
      id: 4,
      question:
        "If the Newton method is applied to determine a solution accurate to within 10⁻³ for f(x) = x + √x. What is the value of x₁, assuming x₀=6? (rounded to 4 decimal places)",
      options: [
        "a. 16.6166",
        "b. -1.0171",
        "c. 13.0171",
        "d. -4.6166",
        "e. -195.7144",
      ],
      answer: "b",
    },
    {
      id: 5,
      question:
        "If X = 15.7414, find the relative percentage error when approximating X by Y = 15.26.",
      options: [
        "a. 48.14%",
        "b. 3.15%",
        "c. 3.06%",
        "d. 0.0306%",
        "e. 0.4814%",
      ],
      answer: "c",
    },
    {
      id: 6,
      question: "Use 3-digit arithmetic chopping to compute: 2/8 + log(52)",
      options: ["a. -1.96", "b. 1.97", "c. 2.01", "d. 1.96", "e. -1.97"],
      answer: "b",
    },
    {
      id: 7,
      question:
        "If f(x) is a real continuous function in the range of [-7.86,12.08], where f(-7.86)=-24.25 and f(12.08)=2.736. Which of the following is correct for f(x)?",
      options: [
        "a. There are exactly two roots in this range",
        "b. There is exactly one root in this range",
        "c. There are an infinite number of roots in this range",
        "d. There is at least one root in this range",
        "e. There are an even number of roots or there is no root in this range",
      ],
      answer: "d",
    },
    {
      id: 8,
      question:
        "What form do you need to change your matrix into when using Gauss elimination method?",
      options: [
        "a. row echelon form",
        "b. augmented form",
        "c. standard form",
        "d. reduced row echelon form",
      ],
      answer: "a",
    },
    {
      id: 9,
      question:
        "What is the contrapositive of the following English sentence:\nIf x is evenly divisible by 4, then x is evenly divisible by 2",
      options: [
        "a. If x is evenly divisible by 4, then x is evenly divisible by 2",
        "b. If x is not evenly divisible by 2, then x is not evenly divisible by 4",
        "c. If x is evenly divisible by 2, then x is evenly divisible by 4",
        "d. If x is not evenly divisible by 4, then x is not evenly divisible by 2",
      ],
      answer: "b",
    },
    {
      id: 10,
      question:
        "Which of the following methods depends on finding the determinant of a matrix?",
      options: [
        "a. Jacobi",
        "b. Newton Raphson",
        "c. Cramer",
        "d. Richardson",
        "e. Gauss-Seidel",
      ],
      answer: "c",
    },
    {
      id: 11,
      question:
        "If A = 60.442, find the relative error when approximating A by B = 61 (rounded to 3 decimal places)",
      options: ["a. -0.558", "b. -0.009", "c. 0.009", "d. 0.923", "e. 0.558"],
      answer: "c",
    },
    {
      id: 12,
      question: "Use 3-digit arithmetic chopping to compute: 3/9 + log(18)",
      options: ["a. 1.63", "b. 1.59", "c. 1.58", "d. -1.59", "e. -1.58"],
      answer: "c",
    },
    {
      id: 13,
      question:
        "If f(x) is a real continuous function in the range of [6.52,10.96], where f(6.52)=17.58 and f(10.96)=-6.652. Which of the following is correct for f(x)?",
      options: [
        "a. There are an infinite number of roots in this range",
        "b. There is at least one root in this range",
        "c. There are exactly two roots in this range",
        "d. There is exactly one root in this range",
        "e. There are an even number of roots or there is no root in this range",
      ],
      answer: "b",
    },
    {
      id: 14,
      question:
        "Find the minimum number of iterations required by the bisection method to solve f(x)=0 with the tolerance 10⁻³. Assume f(x) is a continuous function on the closed interval [4,11].",
      options: ["a. 12", "b. 13", "c. 15", "d. 11", "e. 14"],
      answer: "e",
    },
    {
      id: 15,
      question:
        "The Newton-Raphson method of finding roots of nonlinear equations falls under the category of ________ methods.",
      options: [
        "a. bracketing",
        "b. direct",
        "c. graphical",
        "d. random",
        "e. open",
      ],
      answer: "e",
    },
    {
      id: 16,
      question:
        "Regular Expression for language L1=b*aba(a+b)*, The language L1 can be describe as:",
      options: [
        "A. Length at least is even",
        "B. Start with letter b and end with letter b",
        "C. Length at least is odd",
        "D. Start with letter a and end with letter a",
      ],
      answer: "C",
    },
    {
      id: 17,
      question:
        "If A = 60.31, find the relative error when approximating A by B = 61 (rounded to 3 decimal places)",
      options: ["a. -0.011", "b. 0.011", "c. -0.69", "d. 0.114", "e. 0.69"],
      answer: "b",
    },
    {
      id: 18,
      question:
        "If f(x) is a real continuous function in the range of [-9.72,13.69], where f(-9.72)=-22.739 and f(13.69)=-7.203. Which of the following is correct for f(x)?",
      options: [
        "a. There are an even number of roots or there is no root in this range",
        "b. There are an infinite number of roots in this range",
        "c. There is at least one root in this range",
        "d. There is exactly one root in this range",
        "e. There are exactly two roots in this range",
      ],
      answer: "a",
    },
  ],
  db2: [
    {
      id: 1,
      question: "Which component is not part of the Oracle instance?",
      options: [
        "Control Files",
        "Shared pool",
        "System Global Area",
        "Process monitor",
      ],
      answer: "Process monitor",
    },
    {
      id: 2,
      question:
        "What is the biggest advantage of having the control files on different disks?",
      options: [
        "Writes are concurrent, so having control files on different disks speeds up control file writes.",
        "Guards against failure.",
        "Faster archiving.",
        "Database performance.",
      ],
      answer: "Guards against failure.",
    },
    {
      id: 3,
      question:
        "Which initialization parameter cannot be changed after creating the database?",
      options: [
        "all the initialization parameters can be changed as and when required.",
        "DB_NAME",
        "DB_BLOCK_SIZE",
        "CONTROL_FILES",
      ],
      answer: "DB_BLOCK_SIZE",
    },
    {
      id: 4,
      question:
        "Which file records all changes made to the database and is used only when recovering an instance?",
      options: [
        "Archive log file",
        "Alert log file",
        "Redo log file",
        "Control file",
      ],
      answer: "Redo log file",
    },
    {
      id: 5,
      question:
        "A user issues a commit statement on the Oracle database. Which of the following choices indicates what Oracle must do next?",
      options: [
        "Save changes made to data in data file.",
        "Wait for feedback from user to write redo to disk.",
        "Write redo indicating transaction has been committed.",
        "Eliminate data block from buffer cache to make room for new changes.",
      ],
      answer: "Write redo indicating transaction has been committed.",
    },
    {
      id: 6,
      question:
        "Which of the following is an invalid database start-up option?",
      options: [
        "STARTUP FORCE",
        "STARTUP NORMAL",
        "STARTUP NOMOUNT",
        "STARTUP MOUNT",
      ],
      answer: "STARTUP NORMAL",
    },
    {
      id: 7,
      question:
        "Which of the following types of statements can use a temporary tablespace?",
      options: [
        "An index creation",
        "All Mentioned",
        "A hash join operation",
        "SQL statements with a GROUP BY clause",
      ],
      answer: "All Mentioned",
    },
    {
      id: 8,
      question:
        "You did not assign a temporary tablespace when you created user MARK. If MARK runs a sort query, where will Oracle handle this sort?",
      options: [
        "TEMP tablespace",
        "The default temporary tablespace you created with the CREATE DATABASE command",
        "MARK tablespace",
        "SYSTEM tablespace",
      ],
      answer:
        "The default temporary tablespace you created with the CREATE DATABASE command",
    },
    {
      id: 9,
      question:
        "By default, how much tablespace can any account use for a new table?",
      options: [
        "None",
        "Unlimited space, including autoextends",
        "Up to the current free space in the tablespace",
        "Up to the default quota established at tablespace creation time",
      ],
      answer: "None",
    },
    {
      id: 10,
      question:
        "Which of the following statements gives user desmond the ability to alter table gl.accounts?",
      options: [
        "allow desmond to alter table gl.accounts;",
        "grant alter on gl.accounts to desmond;",
        "grant alter table to desmond;",
        "grant alter to desmond on gl.accounts;",
      ],
      answer: "grant alter on gl.accounts to desmond;",
    },
    {
      id: 11,
      question:
        "Which of the following system privileges can allow the grantee to masquerade as another user and therefore should be granted judiciously?",
      options: [
        "ALTER USER",
        "All Mentioned",
        "CREATE ANY PROCEDURE",
        "CREATE ANY JOB",
      ],
      answer: "All Mentioned",
    },
    {
      id: 12,
      question:
        "Which of the following statements enables the role user_admin in the current session?",
      options: [
        "alter role user_admin enable;",
        "set role user_admin;",
        "alter session enable role user_admin;",
        "alter session set role user_admin;",
      ],
      answer: "set role user_admin;",
    },
    {
      id: 13,
      question:
        "Which of the following statements creates an Oracle account, but lets the operating system authenticate logons?",
      options: [
        "create user ops$admin identified by os;",
        "create user ops$admin nopassword;",
        "create user ops$admin authenticated by os;",
        "create user ops$admin identified externally;",
      ],
      answer: "create user ops$admin identified externally;",
    },
    {
      id: 14,
      question:
        "Which of the following statements gives user desmond the ability to alter table gl.accounts as well as give this ability to other accounts?",
      options: [
        "grant alter any table to desmond with grant option;",
        "grant alter on gl.accounts to desmond with admin option;",
        "grant alter any table to desmond with admin option;",
        "grant alter any table with grant option to desmond;",
      ],
      answer: "grant alter any table to desmond with admin option;",
    },
    {
      id: 15,
      question:
        "You initially set up user GARFIELD with QUOTA 5 M ON users_1 tablespace. You now need to increase that to 20 M. Which statement would you issue?",
      options: [
        "ALTER QUOTA GARFIELD ADD 15M on users_1;",
        "ALTER USER GARFIELD TABLESPACE users_1 QUOTA 20M;",
        "ALTER USER GARFIELD QUOTA 20M on users_1;",
        "ALTER USER GARFIELD QUOTA 15M on users_1;",
      ],
      answer: "ALTER USER GARFIELD QUOTA 20M on users_1;",
    },
    {
      id: 16,
      question:
        "User system granted SELECT ANY TABLE to user ian using WITH ADMIN OPTION. Ian then granted SELECT ANY TABLE to user stuart. Ian has left the company, and his account is dropped. What happens to Stuart's privileges?",
      options: [
        "Stuart loses his privileges if Ian was dropped with the CASCADE REVOKE option",
        "Stuart retains his privileges.",
        "Stuart loses his privileges.",
        "Stuart retains his privileges if Ian was dropped with the NOCASCADE REVOKE option.",
      ],
      answer: "Stuart retains his privileges.",
    },
    {
      id: 17,
      question:
        "If you have two redo log groups with four members each, how many disks does Oracle recommend to keep the redo log files?",
      options: ["Four", "Eight", "Two", "One"],
      answer: "Eight",
    },
    {
      id: 18,
      question:
        "Which of the following information is available in control file?",
      options: [
        "DB Creation Time",
        "Datafile locations",
        "Archive mode",
        "Flashback mode",
      ],
      answer: "Datafile locations",
    },
    {
      id: 19,
      question:
        "When an Oracle database is created, which user is automatically created and granted the DBA role?",
      options: ["SYSTEM", "SCOTT", "SYS & SYSTEM", "SYS"],
      answer: "SYS",
    },
    {
      id: 20,
      question:
        "When a transaction modifies the database, Oracle copies the original data before modifying it. The original copy of the modified data is called",
      options: ["Undone Data", "Archive data", "Undo data", "Redo data"],
      answer: "Undo data",
    },
  ],
  "software-engineering": [
    {
      id: 1,
      question: "What is the primary disadvantage of a group interview?",
      options: [
        "Participants do not want to voice their opinion",
        "It slows down the process",
        "Scheduling",
        "Interviewees argue with each other",
      ],
      answer: "Scheduling",
    },
    {
      id: 2,
      question: "The incremental model of software development is",
      options: [
        "A good approach when a working core product is required quickly",
        "A reasonable approach when requirements are well defined",
        "The best approach to use for projects with large development teams",
        "A revolutionary model that is not used for commercial products",
      ],
      answer: "A good approach when a working core product is required quickly",
    },
    {
      id: 3,
      question:
        "Which of the following depicts the various state transitions or changes an object can experience during its lifetime?",
      options: [
        "Sequence diagram",
        "Collaboration diagram",
        "State diagram",
        "Component diagram",
        "Entity relationship diagram",
      ],
      answer: "State diagram",
    },
    {
      id: 4,
      question:
        "CASE tools that enable the automatic generation of program and database definition code directly from the design documents are:",
      options: [
        "code generators",
        "compilers",
        "documentation generators",
        "form and report generators",
        "interpreters",
      ],
      answer: "code generators",
    },
    {
      id: 5,
      question: "Acceptance tests are normally conducted by the:",
      options: ["Developer", "Systems engineers", "End users", "Test team"],
      answer: "End users",
    },
    {
      id: 6,
      question: "One advantage of open-ended questions in an interview is:",
      options: [
        "They work well when the answers to the questions are well known",
        "The interviewee is restricted to providing just a few answers",
        "A significant amount of time can be devoted to each interviewee",
        "Previously unknown information can result",
      ],
      answer: "Previously unknown information can result",
    },
    {
      id: 7,
      question: "Rational Rose models have:",
      options: [
        "Deployment View",
        "Logical View",
        "Use Case View",
        "Component View",
        "All choices",
      ],
      answer: "All choices",
    },
    {
      id: 8,
      question:
        "Which of the items listed below is not one of the software engineering layers?",
      options: ["Process", "Methods", "Tools", "Manufacturing"],
      answer: "Manufacturing",
    },
    {
      id: 9,
      question:
        "If it's unlikely that major changes in requirements will be requested as the project proceeds, the best software process model is",
      options: [
        "Spiral development model",
        "Waterfall model",
        "Evolutionary development Model",
        "Incremental development",
      ],
      answer: "Waterfall model",
    },
    {
      id: 10,
      question:
        "The repository of all data definitions for all organizational applications is the:",
      options: [
        "information repository",
        "organisation's database",
        "data storage location",
        "data dictionary",
      ],
      answer: "data dictionary",
    },
    {
      id: 11,
      question: "Prototyping is most useful for requirements gathering when:",
      options: [
        "Data are not readily available",
        "There is uncertainty about some aspects of the system",
        "Possible designs are simple and require an abstract form to fully evaluate",
        "User requirements are well understood",
      ],
      answer: "There is uncertainty about some aspects of the system",
    },
    {
      id: 12,
      question: "Most organisations use CASE to:",
      options: [
        "Increase job security",
        "Simplify program maintenance",
        "Reduce the cost of training personnel",
        "Improve confidence in the IS department",
      ],
      answer: "Simplify program maintenance",
    },
    {
      id: 13,
      question: "The spiral model of software development",
      options: [
        "Ends with the delivery of the software product",
        "Is more chaotic than the incremental model",
        "Includes project risks evaluation during each iteration",
        "All of the above",
      ],
      answer: "All of the above",
    },
    {
      id: 14,
      question:
        "On a use-case diagram, the type of relationship that arises when one use case references another use case is called a(n):",
      options: [
        "extends relationship",
        "definitive relationship",
        "recursive relationship",
        "working relationship",
        "include relationship",
      ],
      answer: "include relationship",
    },
    {
      id: 15,
      question:
        "Which of the following is a reason for directly observing end users?",
      options: [
        "The analyst gets a snapshot image of the person or task being observed",
        "Employees will alter their performance if they know that they are being observed",
        "Observations are not very time consuming",
        "People often do not have a completely accurate appreciation of what they do or how they do it",
      ],
      answer:
        "People often do not have a completely accurate appreciation of what they do or how they do it",
    },
    {
      id: 16,
      question:
        "PowerDesigner provides a wide range of models and diagrams for all your modeling needs.",
      options: ["True", "False"],
      answer: "True",
    },
    {
      id: 17,
      question:
        "Traditional methods of collecting systems requirements include:",
      options: [
        "Individual interviews",
        "Observing workers",
        "Group interviews",
        "All of the above",
      ],
      answer: "All of the above",
    },
    {
      id: 18,
      question: "What is the first guideline in effective interviewing?",
      options: [
        "Set an appointment",
        "Take notes",
        "Prepare a checklist",
        "Prepare questions",
      ],
      answer: "Set an appointment",
    },
    {
      id: 19,
      question:
        "Software Requirement Specification (SRS) is a document that contains:",
      options: [
        "Functional Requirements",
        "Non-functional Requirements",
        "A+B",
        "None of the above",
      ],
      answer: "A+B",
    },
    {
      id: 20,
      question:
        "On an activity diagram, what is used to show parallel activities?",
      options: ["an arrow", "a swimlane", "a diamond", "a synchronization bar"],
      answer: "a synchronization bar",
    },
  ],
};
