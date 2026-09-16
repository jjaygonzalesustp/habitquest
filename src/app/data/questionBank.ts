export interface Question {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'knowledge';
}

export interface PracticalQuestion {
  id: string;
  question: string;
  correctPool: string[];
  wrongPool: string[];
  explanation: string;
  topic: string;
  difficulty: 'practical';
}

export type QuestionType = Question | PracticalQuestion;

// Legacy format - still just arrays
interface LegacySubjectQuestions {
  [key: string]: Question[];
}

// New format with tiers
export interface SubjectQuestions {
  [key: string]: {
    knowledge: Question[];
    practical: PracticalQuestion[];
  };
}

export const rawQuestionBank: LegacySubjectQuestions = {
  "Digital Electronics": [
    {
      id: "de1",
      question:
        "What is the base of the binary numbering system?",
      choices: ["1", "2", "3", "4"],
      correctAnswer: 1,
      explanation:
        "The base is 2. It uses only two digits, 0 and 1, to represent all numerical values. This corresponds to the 'on' and 'off' states of electronic transistors.",
      topic: "Number Systems",
    },
    {
      id: "de2",
      question: "What is the primary function of a NOT gate?",
      choices: [
        "Multiplication",
        "Addition",
        "Inversion",
        "Comparison",
      ],
      correctAnswer: 2,
      explanation:
        "A NOT gate performs inversion. If the input is 1, the output is 0, and vice versa. It is often referred to as an inverter in digital logic.",
      topic: "Logic Gates",
    },
    {
      id: "de3",
      question: "Which gate is known as a 'Universal Gate'?",
      choices: ["AND", "OR", "NAND", "XOR"],
      correctAnswer: 2,
      explanation:
        "The NAND (or NOR) gate is called universal because any other logic gate (AND, OR, NOT) can be created using only these gates. This simplifies manufacturing processes.",
      topic: "Logic Gates",
    },
    {
      id: "de4",
      question: "What is a 'bit'?",
      choices: [
        "A group of 8 numbers",
        "The smallest unit of data",
        "A type of transistor",
        "A clock signal",
      ],
      correctAnswer: 1,
      explanation:
        "A bit is the smallest unit of data in a computer. It represents a binary digit, which can hold a value of either 0 or 1.",
      topic: "Data Representation",
    },
    {
      id: "de5",
      question:
        "How many bits are typically found in a single byte?",
      choices: ["4", "8", "16", "32"],
      correctAnswer: 1,
      explanation:
        "There are 8 bits in one byte. This standard allows for 256 different combinations ($2^8$), which is enough to represent standard alphanumeric characters.",
      topic: "Data Representation",
    },
    {
      id: "de6",
      question: "In an AND gate, when is the output high (1)?",
      choices: [
        "When any input is 1",
        "When all inputs are 1",
        "When all inputs are 0",
        "When inputs are different",
      ],
      correctAnswer: 1,
      explanation:
        "The output is high (1) only if all its inputs are high (1). If any input is 0, the output remains 0. It acts like a logical multiplier.",
      topic: "Logic Gates",
    },
    {
      id: "de7",
      question: "What is the primary use of a Flip-Flop?",
      choices: [
        "To amplify voltage",
        "To store one bit of data",
        "To invert a signal",
        "To count pulses",
      ],
      correctAnswer: 1,
      explanation:
        "A flip-flop is a bistable multivibrator used to store one bit of data. It remains in a steady state until a trigger (like a clock pulse) changes its output.",
      topic: "Sequential Logic",
    },
    {
      id: "de8",
      question: "What is the purpose of a Multiplexer (MUX)?",
      choices: [
        "To store data",
        "To select one of several inputs",
        "To perform addition",
        "To convert Analog to Digital",
      ],
      correctAnswer: 1,
      explanation:
        "A MUX selects one of several input signals and forwards it to a single output line. It acts like a digitally controlled multi-position switch.",
      topic: "Combinational Logic",
    },
    {
      id: "de9",
      question:
        "Which mathematical branch is used to simplify digital circuits?",
      choices: [
        "Calculus",
        "Linear Algebra",
        "Boolean Algebra",
        "Trigonometry",
      ],
      correctAnswer: 2,
      explanation:
        "Boolean Algebra deals with variables that have two possible values: true (1) or false (0). It is the mathematical foundation for analyzing digital logic.",
      topic: "Boolean Logic",
    },
    {
      id: "de10",
      question:
        "According to De Morgan's Theorem, what is the complement of a product (NOT(A AND B))?",
      choices: [
        "NOT A AND NOT B",
        "A OR B",
        "NOT A OR NOT B",
        "A AND B",
      ],
      correctAnswer: 2,
      explanation:
        "De Morgan's Theorem states that the complement of a product is equal to the sum of the complements ($\overline{A \cdot B} = \overline{A} + \overline{B}$).",
      topic: "Boolean Logic",
    },
    {
      id: "de11",
      question:
        "Which component converts binary input into a specific output signal for displays?",
      choices: [
        "Encoder",
        "Decoder",
        "Multiplexer",
        "Register",
      ],
      correctAnswer: 1,
      explanation:
        "A decoder converts coded input (like binary) into a specific output signal. For example, a BCD-to-7-segment decoder lights up numeric displays.",
      topic: "Combinational Logic",
    },
    {
      id: "de12",
      question:
        "What defines sequential logic compared to combinational logic?",
      choices: [
        "Higher voltage",
        "Use of memory",
        "Faster speed",
        "Fewer gates",
      ],
      correctAnswer: 1,
      explanation:
        "Sequential logic output depends on both current inputs and previous states (memory), whereas combinational logic depends only on current inputs.",
      topic: "Sequential Logic",
    },
    {
      id: "de13",
      question: "What is the function of a 'clock signal'?",
      choices: [
        "To keep time",
        "To coordinate action timing",
        "To power the IC",
        "To reset the circuit",
      ],
      correctAnswer: 1,
      explanation:
        "A clock signal is an oscillating signal that ensures all components in a digital system update their states simultaneously to prevent errors.",
      topic: "Sequential Logic",
    },
    {
      id: "de14",
      question:
        "What are the two outputs produced by a Half-Adder?",
      choices: [
        "Sum and Difference",
        "Product and Carry",
        "Sum and Carry",
        "Input and Output",
      ],
      correctAnswer: 2,
      explanation:
        "A Half-Adder is a circuit that adds two single-bit binary numbers, producing a Sum (S) and a Carry (C) as results.",
      topic: "Arithmetic Circuits",
    },
    {
      id: "de15",
      question: "What is an Integrated Circuit (IC)?",
      choices: [
        "A single transistor",
        "A collection of fabricated components",
        "A battery",
        "A type of software",
      ],
      correctAnswer: 1,
      explanation:
        "An IC is a semiconductor wafer where thousands of transistors, resistors, and capacitors are fabricated to act as one unit.",
      topic: "IC Technology",
    },
    {
      id: "de16",
      question:
        "What does 'Logic High' typically represent in a 5V system?",
      choices: ["0V", "2.5V", "5V", "-5V"],
      correctAnswer: 2,
      explanation:
        "Logic High represents a voltage near the supply voltage (5V), signifying binary 1, while Logic Low is near 0V, signifying binary 0.",
      topic: "Circuit Fundamentals",
    },
    {
      id: "de17",
      question: "What is 'Propagation Delay'?",
      choices: [
        "Power loss",
        "Time for output to react to input",
        "Signal interference",
        "Clock speed",
      ],
      correctAnswer: 1,
      explanation:
        "It is the time it takes for an input change to produce an output change. This delay is a limiting factor for how fast a processor can run.",
      topic: "Circuit Fundamentals",
    },
    {
      id: "de18",
      question:
        "Which gate outputs a 0 only if all inputs are 0?",
      choices: ["AND", "NAND", "OR", "XOR"],
      correctAnswer: 2,
      explanation:
        "An OR gate output is high (1) if at least one input is high. It only outputs a 0 if every single input is in the low (0) state.",
      topic: "Logic Gates",
    },
    {
      id: "de19",
      question: "What is a 'Register' in digital electronics?",
      choices: [
        "A power supply",
        "A group of flip-flops",
        "A type of cable",
        "A cooling fan",
      ],
      correctAnswer: 1,
      explanation:
        "A register is a group of flip-flops used to store multiple bits of data. They are the fastest storage elements within a CPU.",
      topic: "Memory Elements",
    },
    {
      id: "de20",
      question: "Why is Hexadecimal used in digital systems?",
      choices: [
        "It is faster",
        "It uses less power",
        "It represents 4 bits per character",
        "It is based on 10",
      ],
      correctAnswer: 2,
      explanation:
        "Hexadecimal (base-16) is used to represent 4 bits of binary data with one character (0-9, A-F), making long binary strings easier for humans to read.",
      topic: "Number Systems",
    },
    {
      id: "de21",
      question: "What is a 'nibble' in digital computing?",
      choices: ["2 bits", "4 bits", "16 bits", "32 bits"],
      correctAnswer: 1,
      explanation:
        "A nibble is a group of 4 bits, or half of a byte. It is particularly useful because one hexadecimal digit represents exactly one nibble.",
      topic: "Data Representation",
    },
    {
      id: "de22",
      question:
        "Which type of memory loses its data when power is removed?",
      choices: ["ROM", "EEPROM", "RAM", "Flash"],
      correctAnswer: 2,
      explanation:
        "RAM (Random Access Memory) is volatile, meaning it requires power to maintain stored information. ROM is non-volatile and keeps data without power.",
      topic: "Memory",
    },
    {
      id: "de23",
      question: "What is the function of a Digital Comparator?",
      choices: [
        "To add numbers",
        "To compare binary values",
        "To store data",
        "To count pulses",
      ],
      correctAnswer: 1,
      explanation:
        "A comparator is a circuit that compares two binary numbers and determines if they are equal, or if one is greater than the other.",
      topic: "Combinational Logic",
    },
    {
      id: "de24",
      question: "What does the term 'fan-out' refer to?",
      choices: [
        "Cooling a chip",
        "Inputs a gate can drive",
        "Number of gates in a circuit",
        "Clock frequency",
      ],
      correctAnswer: 1,
      explanation:
        "Fan-out is the maximum number of digital inputs that the output of a single logic gate can reliably drive without signal degradation.",
      topic: "Circuit Fundamentals",
    },
    {
      id: "de25",
      question:
        "Which device converts continuous analog signals into binary numbers?",
      choices: ["DAC", "Multiplexer", "ADC", "Flip-Flop"],
      correctAnswer: 2,
      explanation:
        "An Analog-to-Digital Converter (ADC) converts real-world signals like sound or temperature into discrete binary data for processors.",
      topic: "Data Conversion",
    },
    {
      id: "de26",
      question: "What defines a 'Ripple Counter'?",
      choices: [
        "Synchronous clocking",
        "Clocking flip-flops in series",
        "Random counting",
        "High-speed addition",
      ],
      correctAnswer: 1,
      explanation:
        "In a ripple counter, the clock pulse ripples through flip-flops; the output of one flip-flop serves as the clock for the next.",
      topic: "Sequential Logic",
    },
    {
      id: "de27",
      question:
        "An 'Active Low' signal performs its function when the voltage is at which state?",
      choices: [
        "Logic 1",
        "Logic 0",
        "High Voltage",
        "Floating",
      ],
      correctAnswer: 1,
      explanation:
        "Active Low signals trigger when they are at 0 (ground). They are often denoted with a bar over the name, such as /RESET.",
      topic: "Circuit Fundamentals",
    },
    {
      id: "de28",
      question:
        "What is the primary purpose of a Pull-up Resistor?",
      choices: [
        "To increase current",
        "To prevent floating inputs",
        "To decrease voltage",
        "To store charge",
      ],
      correctAnswer: 1,
      explanation:
        "Pull-up resistors ensure an input stays at a High state (1) when no other signal is present, preventing erratic 'floating' behavior.",
      topic: "Circuit Fundamentals",
    },
    {
      id: "de29",
      question: "What is a 'MUX tree' used for?",
      choices: [
        "Data storage",
        "Expanding input selection",
        "Clock generation",
        "Signal amplification",
      ],
      correctAnswer: 1,
      explanation:
        "A MUX tree combines multiple multiplexers to select from a very large number of inputs, often used in complex routing.",
      topic: "Combinational Logic",
    },
    {
      id: "de30",
      question:
        "Which circuit is used to clean up noisy or slow-moving signals into square waves?",
      choices: [
        "Schmitt Trigger",
        "Full Adder",
        "D Flip-Flop",
        "OR Gate",
      ],
      correctAnswer: 0,
      explanation:
        "A Schmitt Trigger uses hysteresis to convert a noisy analog signal into a clean digital signal, preventing false triggers.",
      topic: "Circuit Fundamentals",
    },
    {
      id: "de31",
      question:
        "In Gray Code, how many bits change between successive values?",
      choices: ["One", "Two", "Four", "All bits"],
      correctAnswer: 0,
      explanation:
        "Gray Code is a binary system where only one bit changes at a time. This is critical in mechanical encoders to prevent errors.",
      topic: "Number Systems",
    },
    {
      id: "de32",
      question:
        "A Magnitude Comparator is essential for which component?",
      choices: [
        "Power Supply",
        "Arithmetic Logic Unit (ALU)",
        "Cooling Fan",
        "Hard Drive",
      ],
      correctAnswer: 1,
      explanation:
        "Magnitude comparators allow the ALU to perform logical decisions like 'Is A greater than B?', which is fundamental to programming.",
      topic: "Combinational Logic",
    },
    {
      id: "de33",
      question:
        "Where is the 'Least Significant Bit' (LSB) located in a binary string?",
      choices: ["Leftmost", "Rightmost", "Middle", "It varies"],
      correctAnswer: 1,
      explanation:
        "The LSB is the rightmost bit. It determines whether a binary integer is even (0) or odd (1).",
      topic: "Data Representation",
    },
    {
      id: "de34",
      question:
        "What is the primary function of a Shift Register?",
      choices: [
        "Mathematical addition",
        "Moving data laterally",
        "Converting AC to DC",
        "Signal filtering",
      ],
      correctAnswer: 1,
      explanation:
        "Shift registers move data bit-by-bit through a chain of flip-flops, often used for serial-to-parallel data conversion.",
      topic: "Sequential Logic",
    },
    {
      id: "de35",
      question: "What does a Decoder detect on its inputs?",
      choices: [
        "Analog noise",
        "A specific binary code",
        "Voltage drops",
        "Clock speed",
      ],
      correctAnswer: 1,
      explanation:
        "A decoder looks for a specific combination of bits and activates a specific output when that 'code' is recognized.",
      topic: "Combinational Logic",
    },
    {
      id: "de36",
      question:
        "Why is CMOS technology widely used in modern ICs?",
      choices: [
        "Highest power usage",
        "Low static power consumption",
        "Needs no clock",
        "Made of wood",
      ],
      correctAnswer: 1,
      explanation:
        "CMOS (Complementary Metal-Oxide-Semiconductor) is favored because it uses very little power and has high noise immunity.",
      topic: "IC Technology",
    },
    {
      id: "de37",
      question: "What does an Encoder do?",
      choices: [
        "Decodes signals",
        "Converts input to binary code",
        "Amplifies sound",
        "Slows down the clock",
      ],
      correctAnswer: 1,
      explanation:
        "An encoder is the opposite of a decoder; it takes an active input (like a key press) and converts it into a binary output.",
      topic: "Combinational Logic",
    },
    {
      id: "de38",
      question:
        "What is the main purpose of using a Karnaugh Map (K-map)?",
      choices: [
        "To draw circuits",
        "To simplify Boolean expressions",
        "To store data",
        "To measure voltage",
      ],
      correctAnswer: 1,
      explanation:
        "K-maps are visual tools that help engineers simplify Boolean logic, allowing them to build circuits with the fewest possible gates.",
      topic: "Boolean Logic",
    },
    {
      id: "de39",
      question: "What is 'Setup Time' in a Flip-Flop?",
      choices: [
        "Time to power up",
        "Time data must be stable before clock",
        "Time between pulses",
        "Time to reset",
      ],
      correctAnswer: 1,
      explanation:
        "Setup time is the minimum duration the data signal must be steady at the input before the clock edge arrives to ensure a valid output.",
      topic: "Sequential Logic",
    },
    {
      id: "de40",
      question:
        "An 'Open Collector' output requires what to reach a Logic High state?",
      choices: [
        "A Capacitor",
        "A Pull-up Resistor",
        "A Transistor",
        "A Battery",
      ],
      correctAnswer: 1,
      explanation:
        "Open collector outputs can pull a signal to ground but cannot drive it high on their own; they need an external resistor to pull the voltage up.",
      topic: "Circuit Fundamentals",
    },
  ],
  "Internet of Things": [
    {
    id: "iot1",
    question: "What constitutes the 'Thing' in the Internet of Things?",
    choices: ["Only computers", "Any physical object with sensors", "The internet cable", "A human user"],
    correctAnswer: 1,
    explanation: "A 'Thing' is any physical object embedded with sensors that can connect and exchange data over the internet.",
    topic: "IoT Basics",
  },
  {
    id: "iot2",
    question: "What is the role of an Actuator in an IoT system?",
    choices: ["To collect data", "To perform a physical action", "To store energy", "To encrypt messages"],
    correctAnswer: 1,
    explanation: "An actuator receives a signal and performs a physical action, like opening a valve or moving a motor.",
    topic: "Hardware",
  },
  {
    id: "iot3",
    question: "What is the primary function of a Sensor?",
    choices: ["To move objects", "To detect environmental input", "To provide power", "To route internet traffic"],
    correctAnswer: 1,
    explanation: "A sensor detects physical inputs (like heat or light) and converts them into data.",
    topic: "Hardware",
  },
  {
    id: "iot4",
    question: "Why is the MQTT protocol popular in IoT?",
    choices: ["High power usage", "It is lightweight", "It only works with video", "It requires high bandwidth"],
    correctAnswer: 1,
    explanation: "MQTT is lightweight and designed for low-bandwidth, high-latency environments.",
    topic: "Protocols",
  },
  {
    id: "iot5",
    question: "What is 'Edge Computing'?",
    choices: ["Cloud storage", "Processing data near the source", "Using only wired cables", "Web design"],
    correctAnswer: 1,
    explanation: "Edge computing processes data near the source to reduce latency and bandwidth usage.",
    topic: "Architecture",
  },
  {
    id: "iot6",
    question: "What is an IoT Gateway?",
    choices: ["A physical door", "A bridge between devices and cloud", "A type of sensor", "An internet browser"],
    correctAnswer: 1,
    explanation: "A gateway acts as a bridge between local devices and the central cloud.",
    topic: "Architecture",
  },
  {
    id: "iot7",
    question: "Which network is best for long-range, low-power IoT sensors?",
    choices: ["Wi-Fi", "Bluetooth", "LPWAN", "Fiber Optics"],
    correctAnswer: 2,
    explanation: "LPWAN allows sensors to communicate over long ranges while consuming very little battery power.",
    topic: "Connectivity",
  },
  {
    id: "iot8",
    question: "In IoT, what is the 'Cloud' used for?",
    choices: ["Power generation", "Data storage and analytics", "Physical movement", "Sensor protection"],
    correctAnswer: 1,
    explanation: "The cloud provides remote servers to store and process massive amounts of IoT data.",
    topic: "Architecture",
  },
  {
    id: "iot9",
    question: "What is Zigbee?",
    choices: ["A type of sensor", "A mesh network protocol", "A brand of car", "A computer monitor"],
    correctAnswer: 1,
    explanation: "Zigbee is a low-power mesh network standard used in smart homes and industrial control.",
    topic: "Connectivity",
  },
  {
    id: "iot10",
    question: "What does M2M stand for?",
    choices: ["Man-to-Mobile", "Machine-to-Machine", "Memory-to-Memory", "Monitor-to-Mouse"],
    correctAnswer: 1,
    explanation: "Machine-to-Machine refers to direct communication between devices without human intervention.",
    topic: "IoT Basics",
  },
  {
    id: "iot11",
    question: "Why does an IoT device need an IP Address?",
    choices: ["To measure temperature", "To be identified on a network", "To save battery", "To move physically"],
    correctAnswer: 1,
    explanation: "An IP Address is a unique identifier that allows a device to be found and contacted on a network.",
    topic: "Connectivity",
  },
  {
    id: "iot12",
    question: "What is the relationship between Big Data and IoT?",
    choices: ["IoT replaces Big Data", "IoT generates data for Big Data", "They are unrelated", "Big Data powers sensors"],
    correctAnswer: 1,
    explanation: "IoT generates the massive data streams that Big Data tools analyze for insights.",
    topic: "Data Management",
  },
  {
    id: "iot13",
    question: "How does IoT benefit 'Smart Agriculture'?",
    choices: ["Faster tractors", "Automated soil monitoring", "Better tasting fruit", "Cheaper seeds"],
    correctAnswer: 1,
    explanation: "IoT sensors monitor conditions like soil moisture to automatically optimize resources.",
    topic: "Applications",
  },
  {
    id: "iot14",
    question: "What is a 'Digital Twin'?",
    choices: ["A second device", "A virtual model of a physical object", "An AI robot", "A backup battery"],
    correctAnswer: 1,
    explanation: "A digital twin is a virtual model that uses real-time data to simulate an object's performance.",
    topic: "Architecture",
  },
  {
    id: "iot15",
    question: "What is the main advantage of Bluetooth Low Energy (BLE)?",
    choices: ["Highest speed", "Battery conservation", "Longest range", "Best video quality"],
    correctAnswer: 1,
    explanation: "BLE is designed to send small packets of data while preserving battery life.",
    topic: "Connectivity",
  },
  {
    id: "iot16",
    question: "What is 'Latency' in IoT communication?",
    choices: ["Total bandwidth", "Time delay in response", "Battery life", "Signal strength"],
    correctAnswer: 1,
    explanation: "Latency is the time delay between a trigger and the system's response.",
    topic: "Data Management",
  },
  {
    id: "iot17",
    question: "What is the function of an IoT Protocol?",
    choices: ["To power devices", "Rules for data transmission", "To make devices smaller", "To protect against heat"],
    correctAnswer: 1,
    explanation: "An IoT protocol provides the rules that allow different devices to understand each other.",
    topic: "Protocols",
  },
  {
    id: "iot18",
    question: "What is 'Security by Design'?",
    choices: ["Making devices look good", "Integrating security from the start", "Hiding the device", "Adding a password later"],
    correctAnswer: 1,
    explanation: "Security by Design integrates protection into the product from the earliest development phase.",
    topic: "Security",
  },
  {
    id: "iot19",
    question: "What is 'Firmware'?",
    choices: ["Hard plastic casing", "Permanent software on hardware", "A type of battery", "Cloud storage space"],
    correctAnswer: 1,
    explanation: "Firmware is the permanent software programmed into hardware to control its functions.",
    topic: "Hardware",
  },
  {
    id: "iot20",
    question: "Which of these is an example of 'Wearable Technology'?",
    choices: ["Smartwatch", "Smart Tractor", "Industrial Robot", "Smart Thermostat"],
    correctAnswer: 0,
    explanation: "Wearables are IoT devices worn on the body, like smartwatches or fitness trackers.",
    topic: "Applications",
  },
  {
    id: "iot21",
    question: "Which IP version provides enough address space for billions of IoT devices?",
    choices: ["IPv2", "IPv4", "IPv6", "HTTP"],
    correctAnswer: 2,
    explanation: "IPv6 uses 128-bit addresses, offering a massive address space essential for IoT growth.",
    topic: "Connectivity",
  },
  {
    id: "iot22",
    question: "In a 'Smart City,' IoT is primarily used to:",
    choices: ["Make people taller", "Improve urban efficiency", "Replace the internet", "Stop all traffic"],
    correctAnswer: 1,
    explanation: "Smart Cities use sensors to optimize energy, traffic, and waste management.",
    topic: "Applications",
  },
  {
    id: "iot23",
    question: "What is the 'Payload' in an IoT data packet?",
    choices: ["The battery weight", "The actual data message", "The routing header", "The metal casing"],
    correctAnswer: 1,
    explanation: "The payload is the core data message being sent, excluding network headers.",
    topic: "Data Management",
  },
  {
    id: "iot24",
    question: "What does 'OTA' stand for in IoT device management?",
    choices: ["Over-the-Air", "Open-Task-Area", "Offline-Task-Array", "Optical-Tele-Axis"],
    correctAnswer: 0,
    explanation: "Over-the-Air allows wireless firmware updates without physical device access.",
    topic: "Maintenance",
  },
  {
    id: "iot25",
    question: "What is CoAP used for?",
    choices: ["Cooling sensors", "Constrained device web transfer", "Heavy data video", "Charging batteries"],
    correctAnswer: 1,
    explanation: "CoAP is a specialized web transfer protocol for constrained nodes and networks.",
    topic: "Protocols",
  },
  {
    id: "iot26",
    question: "Which IoT layer gathers data from the environment?",
    choices: ["Application Layer", "Network Layer", "Perception Layer", "Transport Layer"],
    correctAnswer: 2,
    explanation: "The Perception Layer (physical layer) consists of the sensors and actuators.",
    topic: "Architecture",
  },
  {
    id: "iot27",
    question: "What technology do 'Beacons' use for signals?",
    choices: ["Fiber Optics", "Bluetooth Low Energy", "Satellite", "AM Radio"],
    correctAnswer: 1,
    explanation: "Beacons use BLE to transmit proximity signals to nearby smart devices.",
    topic: "Connectivity",
  },
  {
    id: "iot28",
    question: "What is the 'brain' of most small IoT devices?",
    choices: ["Supercomputer", "Microcontroller (MCU)", "Hard Drive", "Power Supply"],
    correctAnswer: 1,
    explanation: "A Microcontroller (MCU) processes data and controls communication in IoT hardware.",
    topic: "Hardware",
  },
  {
    id: "iot29",
    question: "How does IoT improve logistics via 'Asset Tracking'?",
    choices: ["Faster shipping", "Real-time location monitoring", "Cheaper boxes", "Better drivers"],
    correctAnswer: 1,
    explanation: "Asset tracking uses GPS/RFID for real-time monitoring of goods and equipment.",
    topic: "Applications",
  },
  {
    id: "iot30",
    question: "What is 'Interoperability'?",
    choices: ["Internet speed", "Ability of systems to work together", "Battery life", "Physical size"],
    correctAnswer: 1,
    explanation: "Interoperability is the ability of different IoT systems and devices to communicate.",
    topic: "Standards",
  },
  {
    id: "iot31",
    question: "LoRaWAN is optimized for which scenario?",
    choices: ["High-speed video", "Long-range, low-power communication", "Short-range Wi-Fi", "Gaming"],
    correctAnswer: 1,
    explanation: "LoRaWAN is designed for long-range communication for battery-powered end-nodes.",
    topic: "Connectivity",
  },
  {
    id: "iot32",
    question: "What is Predictive Maintenance?",
    choices: ["Fixing broken items", "Using data to predict failures", "Painting machines", "Hiring mechanics"],
    correctAnswer: 1,
    explanation: "It uses sensor data to predict when maintenance is needed before a failure occurs.",
    topic: "Applications",
  },
  {
    id: "iot33",
    question: "What is a 'Node' in an IoT network?",
    choices: ["A connection point", "A type of sensor", "The cloud server", "The internet provider"],
    correctAnswer: 0,
    explanation: "A node is any connected device that can send, receive, or forward data.",
    topic: "Connectivity",
  },
  {
    id: "iot34",
    question: "Where do users typically interact with IoT data?",
    choices: ["Perception Layer", "Application Layer", "Network Layer", "Physical Layer"],
    correctAnswer: 1,
    explanation: "The Application Layer provides the dashboards and apps for user interaction.",
    topic: "Architecture",
  },
  {
    id: "iot35",
    question: "What does IIoT focus on?",
    choices: ["Smart homes", "Industrial manufacturing", "Social media", "Personal fitness"],
    correctAnswer: 1,
    explanation: "Industrial IoT focuses on manufacturing, automation, and industrial big data.",
    topic: "Applications",
  },
  {
    id: "iot36",
    question: "What is a 'Data Silo'?",
    choices: ["A storage tank", "Isolated data that isn't shared", "A fast computer", "A group of sensors"],
    correctAnswer: 1,
    explanation: "Data silos are isolated collections of data that hinder a unified view of operations.",
    topic: "Data Management",
  },
  {
    id: "iot37",
    question: "What is the purpose of an 'Edge Gateway'?",
    choices: ["To power devices", "Local data processing and filtering", "To store video", "To connect to satellites"],
    correctAnswer: 1,
    explanation: "Edge Gateways process and filter data locally before sending it to the cloud.",
    topic: "Architecture",
  },
  {
    id: "iot38",
    question: "What does 'Internet of Everything' (IoE) include beyond 'Things'?",
    choices: ["Space and stars", "People, data, and processes", "Only more sensors", "Wireless cables"],
    correctAnswer: 1,
    explanation: "IoE emphasizes the connection between people, data, processes, and things.",
    topic: "IoT Basics",
  },
  {
    id: "iot39",
    question: "What is 'Shadow IoT'?",
    choices: ["IoT in the dark", "Unauthorized devices on a network", "Stealth drones", "IoT for weather"],
    correctAnswer: 1,
    explanation: "Shadow IoT refers to unauthorized devices connected to a network without IT approval.",
    topic: "Security",
  },
  {
    id: "iot40",
    question: "Why is an RTOS used in IoT devices?",
    choices: ["To browse the web", "To process data with strict timing", "To save storage", "To look like Windows"],
    correctAnswer: 1,
    explanation: "RTOS provides immediate, consistent processing for time-sensitive tasks.",
    topic: "Hardware",
  },
  ],
  "Physics for Automotive": [
    {
    id: "pa1",
    question: "What is Newton’s First Law of Motion often called?",
    choices: ["Law of Acceleration", "Law of Inertia", "Law of Gravity", "Law of Action-Reaction"],
    correctAnswer: 1,
    explanation: "Newton’s First Law states objects resist changes in motion, a property called inertia.",
    topic: "Mechanics",
  },
  {
    id: "pa2",
    question: "What is the formula for calculating Work?",
    choices: ["W = m * g", "W = F * d * cos(θ)", "W = 1/2 * m * v²", "W = V * I"],
    correctAnswer: 1,
    explanation: "Work equals force times displacement in the direction of the force.",
    topic: "Energy and Work",
  },
  {
    id: "pa3",
    question: "Which is a Vector quantity?",
    choices: ["Mass", "Temperature", "Velocity", "Time"],
    correctAnswer: 2,
    explanation: "Velocity is a vector because it has both magnitude and direction.",
    topic: "Measurement",
  },
  {
    id: "pa4",
    question: "Kinetic energy depends on which factors?",
    choices: ["Mass and Height", "Force and Distance", "Mass and Velocity", "Pressure and Volume"],
    correctAnswer: 2,
    explanation: "Kinetic energy is calculated as $KE = 1/2 m v^2$.",
    topic: "Energy and Work",
  },
  {
    id: "pa5",
    question: "What is Ohm’s Law?",
    choices: ["V = I / R", "V = I * R", "V = I + R", "V = R / I"],
    correctAnswer: 1,
    explanation: "Ohm’s Law relates voltage, current, and resistance as $V = I \cdot R$.",
    topic: "Electricity",
  },
  {
    id: "pa6",
    question: "Acceleration due to gravity on Earth is roughly:",
    choices: ["5.5 m/s²", "9.8 m/s²", "12.0 m/s²", "3.1 m/s²"],
    correctAnswer: 1,
    explanation: "On Earth, gravity accelerates objects at approximately 9.8 m/s².",
    topic: "Mechanics",
  },
  {
    id: "pa7",
    question: "Power is measured in:",
    choices: ["Joules", "Newtons", "Watts", "Pascals"],
    correctAnswer: 2,
    explanation: "Watts represent one Joule of work done per second.",
    topic: "Energy and Work",
  },
  {
    id: "pa8",
    question: "Energy based on position is:",
    choices: ["Kinetic", "Thermal", "Potential", "Electrical"],
    correctAnswer: 2,
    explanation: "Potential energy is energy stored due to an object's position or state.",
    topic: "Energy and Work",
  },
  {
    id: "pa9",
    question: "What force opposes motion between surfaces?",
    choices: ["Gravity", "Friction", "Magnetism", "Tension"],
    correctAnswer: 1,
    explanation: "Friction resists the relative motion of surfaces in contact.",
    topic: "Mechanics",
  },
  {
    id: "pa10",
    question: "Energy cannot be created or destroyed, only:",
    choices: ["Created", "Destroyed", "Transformed", "Lost"],
    correctAnswer: 2,
    explanation: "This is the Law of Conservation of Energy.",
    topic: "Energy and Work",
  },
  {
    id: "pa11",
    question: "Velocity differs from speed because it has:",
    choices: ["Magnitude", "Direction", "Acceleration", "Mass"],
    correctAnswer: 1,
    explanation: "Velocity is a vector; it requires a direction.",
    topic: "Mechanics",
  },
  {
    id: "pa12",
    question: "Rate of change of velocity is:",
    choices: ["Speed", "Inertia", "Acceleration", "Momentum"],
    correctAnswer: 2,
    explanation: "Acceleration measures how quickly velocity changes.",
    topic: "Mechanics",
  },
  {
    id: "pa13",
    question: "Density is Mass divided by:",
    choices: ["Weight", "Force", "Volume", "Area"],
    correctAnswer: 2,
    explanation: "Density is mass per unit volume.",
    topic: "Matter",
  },
  {
    id: "pa14",
    question: "Pressure is Force per unit:",
    choices: ["Volume", "Mass", "Area", "Time"],
    correctAnswer: 2,
    explanation: "Pressure is force applied perpendicular to a surface area.",
    topic: "Matter",
  },
  {
    id: "pa15",
    question: "Force keeping an object in circular motion:",
    choices: ["Centrifugal", "Centripetal", "Friction", "Gravity"],
    correctAnswer: 1,
    explanation: "Centripetal force is directed toward the center of a circular path.",
    topic: "Mechanics",
  },
  {
    id: "pa16",
    question: "Bending of light between media:",
    choices: ["Reflection", "Refraction", "Diffraction", "Absorption"],
    correctAnswer: 1,
    explanation: "Refraction occurs as light speed changes in different media.",
    topic: "Waves and Optics",
  },
  {
    id: "pa17",
    question: "Rotational equivalent of force:",
    choices: ["Work", "Torque", "Power", "Momentum"],
    correctAnswer: 1,
    explanation: "Torque causes objects to rotate around an axis.",
    topic: "Mechanics",
  },
  {
    id: "pa18",
    question: "Heat naturally flows from:",
    choices: ["Cold to Hot", "Low to High Pressure", "Hot to Cold", "Solid to Gas"],
    correctAnswer: 2,
    explanation: "Heat transfers from higher temperature to lower temperature.",
    topic: "Thermodynamics",
  },
  {
    id: "pa19",
    question: "Frequency is cycles per unit:",
    choices: ["Distance", "Volume", "Time", "Mass"],
    correctAnswer: 2,
    explanation: "Frequency (Hertz) is cycles per second.",
    topic: "Waves and Optics",
  },
  {
    id: "pa20",
    question: "For current to flow, a circuit must be:",
    choices: ["Open", "Closed", "Parallel", "Insulated"],
    correctAnswer: 1,
    explanation: "A closed path is required for electrical charge to flow.",
    topic: "Electricity",
  },
  {
    id: "pa21",
    question: "What is the Doppler Effect?",
    choices: ["Wave speed change", "Wave frequency change", "Amplitude change", "Color change"],
    correctAnswer: 1,
    explanation: "Doppler Effect is frequency change due to relative motion.",
    topic: "Waves and Optics",
  },
  {
    id: "pa22",
    question: "Why do ships float?",
    choices: ["Pascal", "Archimedes", "Bernoulli", "Newton"],
    correctAnswer: 1,
    explanation: "Buoyant force equals the weight of displaced fluid.",
    topic: "Fluid Mechanics",
  },
  {
    id: "pa23",
    question: "Electric Current unit:",
    choices: ["Volt", "Ohm", "Ampere", "Watt"],
    correctAnswer: 2,
    explanation: "Amperes measure the rate of charge flow.",
    topic: "Electricity",
  },
  {
    id: "pa24",
    question: "Opposition to current flow:",
    choices: ["Voltage", "Capacitance", "Resistance", "Inductance"],
    correctAnswer: 2,
    explanation: "Resistance hinders the flow of electrons.",
    topic: "Electricity",
  },
  {
    id: "pa25",
    question: "External magnetic field flow:",
    choices: ["South to North", "North to South", "East to West", "Center to Edge"],
    correctAnswer: 1,
    explanation: "Magnetic field lines exit the North and enter the South pole.",
    topic: "Magnetism",
  },
  {
    id: "pa26",
    question: "Ability to conduct heat:",
    choices: ["Specific Heat", "Thermal Conductivity", "Expansion", "Density"],
    correctAnswer: 1,
    explanation: "Thermal conductivity is the rate of heat passage through a material.",
    topic: "Thermodynamics",
  },
  {
    id: "pa27",
    question: "In reflection, angle of incidence equals:",
    choices: ["Refraction", "Reflection", "90 deg", "Focal length"],
    correctAnswer: 1,
    explanation: "The angle of approach equals the angle of departure.",
    topic: "Waves and Optics",
  },
  {
    id: "pa28",
    question: "Transverse Wave motion:",
    choices: ["Circle", "Parallel", "Perpendicular", "Stationary"],
    correctAnswer: 2,
    explanation: "Medium particles move perpendicular to wave travel.",
    topic: "Waves and Optics",
  },
  {
    id: "pa29",
    question: "Longitudinal Wave example:",
    choices: ["Radio", "Sound", "X-ray", "Light"],
    correctAnswer: 1,
    explanation: "Sound waves compress and rarefy the medium in line with travel.",
    topic: "Waves and Optics",
  },
  {
    id: "pa30",
    question: "Newton's Third Law states:",
    choices: ["F=ma", "Inertia", "Action-Reaction", "Gravity"],
    correctAnswer: 2,
    explanation: "Every action has an equal and opposite reaction.",
    topic: "Mechanics",
  },
  {
    id: "pa31",
    question: "Electrical Power formula:",
    choices: ["P = V / I", "P = V + I", "P = V * I", "P = I / V"],
    correctAnswer: 2,
    explanation: "Power is the product of Voltage and Current.",
    topic: "Electricity",
  },
  {
    id: "pa32",
    question: "1st Law of Thermodynamics is about:",
    choices: ["Mass", "Momentum", "Energy", "Charge"],
    correctAnswer: 2,
    explanation: "It is a statement of conservation of energy.",
    topic: "Thermodynamics",
  },
  {
    id: "pa33",
    question: "Absolute Zero is:",
    choices: ["0 deg C", "Water freezing", "Lowest theoretical temp", "-100 K"],
    correctAnswer: 2,
    explanation: "Absolute Zero is 0 K, where molecular motion ceases.",
    topic: "Thermodynamics",
  },
  {
    id: "pa34",
    question: "Frequency match causing larger amplitude:",
    choices: ["Friction", "Resonance", "Refraction", "Inertia"],
    correctAnswer: 1,
    explanation: "Resonance occurs when driving frequency matches natural frequency.",
    topic: "Waves and Optics",
  },
  {
    id: "pa35",
    question: "Direct measure of inertia:",
    choices: ["Weight", "Volume", "Mass", "Density"],
    correctAnswer: 2,
    explanation: "Mass determines an object's resistance to motion change.",
    topic: "Mechanics",
  },
  {
    id: "pa36",
    question: "Charge storage ability:",
    choices: ["Resistance", "Inductance", "Capacitance", "Voltage"],
    correctAnswer: 2,
    explanation: "Capacitance measures a system's ability to hold electric charge.",
    topic: "Electricity",
  },
  {
    id: "pa37",
    question: "Isotopes differ in:",
    choices: ["Protons", "Electrons", "Neutrons", "Charge"],
    correctAnswer: 2,
    explanation: "Isotopes have the same protons but different neutron counts.",
    topic: "Nuclear Physics",
  },
  {
    id: "pa38",
    question: "Speed of light ($c$):",
    choices: ["3e5 m/s", "3e6 m/s", "3e8 m/s", "3e9 m/s"],
    correctAnswer: 2,
    explanation: "Light travels at roughly $3 \times 10^8$ meters per second in a vacuum.",
    topic: "Waves and Optics",
  },
  {
    id: "pa39",
    question: "Momentum formula:",
    choices: ["F * t", "m * a", "m * v", "F * d"],
    correctAnswer: 2,
    explanation: "Momentum is mass times velocity ($p=mv$).",
    topic: "Mechanics",
  },
  {
    id: "pa40",
    question: "Unit of Potential Difference:",
    choices: ["Ohm", "Ampere", "Volt", "Coulomb"],
    correctAnswer: 2,
    explanation: "Volts measure the electric potential difference between points.",
    topic: "Electricity",
  },
  ],
  "Automotive Trivia": [
    {
    id: "at1",
    question: "First modern automobile inventor:",
    choices: ["Ford", "Benz", "Daimler", "Ferrari"],
    correctAnswer: 1,
    explanation: "Karl Benz patented the first internal combustion car in 1886.",
    topic: "History",
  },
  {
    id: "at2",
    question: "First assembly line mass-produced car:",
    choices: ["Beetle", "Model T", "Corvette", "Mini"],
    correctAnswer: 1,
    explanation: "The Ford Model T made cars affordable via the assembly line.",
    topic: "History",
  },
  {
    id: "at3",
    question: "GT stands for:",
    choices: ["Gas Turbo", "Grand Touring", "Gear Trans", "General Type"],
    correctAnswer: 1,
    explanation: "Grand Tourer cars mix luxury and high performance.",
    topic: "Terminology",
  },
  {
    id: "at4",
    question: "Who makes the 911?",
    choices: ["BMW", "Audi", "Porsche", "Mercedes"],
    correctAnswer: 2,
    explanation: "The 911 is Porsche's flagship rear-engine sports car.",
    topic: "Brands",
  },
  {
    id: "at5",
    question: "Best selling car of all time:",
    choices: ["F-150", "Golf", "Corolla", "Civic"],
    correctAnswer: 2,
    explanation: "The Toyota Corolla has sold over 50 million units.",
    topic: "Industry Facts",
  },
  {
    id: "at6",
    question: "Birthplace of Ferrari:",
    choices: ["Germany", "France", "Italy", "USA"],
    correctAnswer: 2,
    explanation: "Italy is famous for supercar brands like Ferrari.",
    topic: "Brands",
  },
  {
    id: "at7",
    question: "First production car over 200 mph:",
    choices: ["Countach", "F40", "959", "F1"],
    correctAnswer: 1,
    explanation: "The Ferrari F40 hit 201 mph in 1987.",
    topic: "Performance",
  },
  {
    id: "at8",
    question: "Tachometer measures:",
    choices: ["Speed", "Fuel", "RPM", "Oil"],
    correctAnswer: 2,
    explanation: "RPM measures engine crankshaft rotations per minute.",
    topic: "Instrumentation",
  },
  {
    id: "at9",
    question: "Volkswagen Beetle purpose:",
    choices: ["Elite", "People", "Military", "Racers"],
    correctAnswer: 1,
    explanation: "Volkswagen literally means 'People's Car'.",
    topic: "History",
  },
  {
    id: "at10",
    question: "Rolls-Royce ornament:",
    choices: ["Bentley", "Rolls-Royce", "Jaguar", "Aston"],
    correctAnswer: 1,
    explanation: "The 'Spirit of Ecstasy' is the iconic Rolls-Royce mascot.",
    topic: "Brands",
  },
  {
    id: "at11",
    question: "Nürburgring nickname:",
    choices: ["Danger Zone", "Green Hell", "Iron Ring", "Devil's Path"],
    correctAnswer: 1,
    explanation: "Jackie Stewart called it 'The Green Hell'.",
    topic: "Racing",
  },
  {
    id: "at12",
    question: "Modern high-performance EV pioneer:",
    choices: ["Toyota", "Tesla", "Nissan", "GM"],
    correctAnswer: 1,
    explanation: "Tesla made electric cars desirable and fast.",
    topic: "Brands",
  },
  {
    id: "at13",
    question: "Main engine cooling part:",
    choices: ["Alternator", "Radiator", "Carburetor", "Transmission"],
    correctAnswer: 1,
    explanation: "The radiator dissipates heat from the engine coolant.",
    topic: "Mechanical",
  },
  {
    id: "at14",
    question: "1 Horsepower in Watts:",
    choices: ["500", "746", "1000", "1250"],
    correctAnswer: 1,
    explanation: "One mechanical horsepower is about 746 Watts.",
    topic: "Performance",
  },
  {
    id: "at15",
    question: "DeLorean movie fame:",
    choices: ["Bond", "Fast/Furious", "Back to Future", "Mad Max"],
    correctAnswer: 2,
    explanation: "The DMC-12 was the time machine in Back to the Future.",
    topic: "Pop Culture",
  },
  {
    id: "at16",
    question: "Turbocharger purpose:",
    choices: ["Cooling", "Increase air intake", "Reduce fuel", "Clean exhaust"],
    correctAnswer: 1,
    explanation: "It forces more air into the engine for more power.",
    topic: "Mechanical",
  },
  {
    id: "at17",
    question: "Audi rings represent:",
    choices: ["4WD", "4 founding companies", "4 wins", "4 continents"],
    correctAnswer: 1,
    explanation: "They represent the merger of four brands into Auto Union.",
    topic: "Brands",
  },
  {
    id: "at18",
    question: "Engine with triangular rotors:",
    choices: ["Diesel", "V12", "Rotary", "Boxer"],
    correctAnswer: 2,
    explanation: "The Wankel rotary engine uses rotors instead of pistons.",
    topic: "Mechanical",
  },
  {
    id: "at19",
    question: "Lexus parent company:",
    choices: ["Honda", "Nissan", "Toyota", "Mitsubishi"],
    correctAnswer: 2,
    explanation: "Lexus is Toyota's luxury vehicle division.",
    topic: "Brands",
  },
  {
    id: "at20",
    question: "Moon buggy speed:",
    choices: ["8 mph", "25 mph", "50 mph", "100 mph"],
    correctAnswer: 0,
    explanation: "The Lunar Roving Vehicle topped out around 8 mph.",
    topic: "History",
  },
  {
    id: "at21",
    question: "Part of the Motorsport Triple Crown:",
    choices: ["Daytona", "Le Mans", "Dakar", "Bathurst"],
    correctAnswer: 1,
    explanation: "Triple Crown = Le Mans, Monaco GP, and Indy 500.",
    topic: "Racing",
  },
  {
    id: "at22",
    question: "BMW's original industry:",
    choices: ["Bikes", "Aircraft Engines", "Tractors", "Ships"],
    correctAnswer: 1,
    explanation: "BMW started by making engines for airplanes.",
    topic: "History",
  },
  {
    id: "at23",
    question: "Ferrari horse origin:",
    choices: ["Jockey", "Fighter Pilot", "General", "Ferrari's Dad"],
    correctAnswer: 1,
    explanation: "It was the emblem of Italian ace Francesco Baracca.",
    topic: "Brands",
  },
  {
    id: "at24",
    question: "Sleeper car definition:",
    choices: ["Bed inside", "Unassuming but fast", "Quiet", "Self-driving"],
    correctAnswer: 1,
    explanation: "Sleepers look slow/stock but are highly modified.",
    topic: "Terminology",
  },
  {
    id: "at25",
    question: "3-point seatbelt inventor:",
    choices: ["Ford", "Mercedes", "Volvo", "Toyota"],
    correctAnswer: 2,
    explanation: "Volvo shared the patent for free to improve safety.",
    topic: "Safety",
  },
  {
    id: "at26",
    question: "F1 DRS means:",
    choices: ["Direct Steering", "Drag Reduction System", "Driver Response", "Rocket"],
    correctAnswer: 1,
    explanation: "DRS reduces drag to increase top speed for passing.",
    topic: "Racing",
  },
  {
    id: "at27",
    question: "Boxer engine cylinders are:",
    choices: ["V shape", "Opposed horizontally", "Vertical", "Line"],
    correctAnswer: 1,
    explanation: "Pistons move like boxers punching each other.",
    topic: "Mechanical",
  },
  {
    id: "at28",
    question: "Japanese 'Godzilla' car:",
    choices: ["Supra", "RX-7", "GT-R", "NSX"],
    correctAnswer: 2,
    explanation: "The Nissan GT-R earned the name for racing dominance.",
    topic: "Pop Culture",
  },
  {
    id: "at29",
    question: "Rotary Le Mans winner:",
    choices: ["Diesel", "Hybrid", "Rotary", "V16"],
    correctAnswer: 2,
    explanation: "The Mazda 787B is the only rotary car to win Le Mans.",
    topic: "Racing",
  },
  {
    id: "at30",
    question: "4WD vs AWD difference:",
    choices: ["Speed", "4WD is off-road focus", "Fuel", "Wheels"],
    correctAnswer: 1,
    explanation: "4WD is usually manual/heavy duty; AWD is automatic.",
    topic: "Terminology",
  },
  {
    id: "at31",
    question: "Bentley/Bugatti owner:",
    choices: ["BMW", "VW Group", "Stellantis", "Ford"],
    correctAnswer: 1,
    explanation: "Both fall under the Volkswagen Group umbrella.",
    topic: "Brands",
  },
  {
    id: "at32",
    question: "Monocoque supports load by:",
    choices: ["Steel frame", "External skin", "Engine", "Floor"],
    correctAnswer: 1,
    explanation: "The body structure itself supports the vehicle load.",
    topic: "Mechanical",
  },
  {
    id: "at33",
    question: "Original 'Pony Car':",
    choices: ["Camaro", "Mustang", "Challenger", "Firebird"],
    correctAnswer: 1,
    explanation: "The 1964 Ford Mustang defined the pony car class.",
    topic: "History",
  },
  {
    id: "at34",
    question: "Ceramic brake benefit:",
    choices: ["Cheap", "Cold performance", "Resist heat fade", "Life"],
    correctAnswer: 2,
    explanation: "They perform better under extreme heat than steel.",
    topic: "Mechanical",
  },
  {
    id: "at35",
    question: "Top Gear track type:",
    choices: ["Highway", "Mall", "Aerodrome", "Forest"],
    correctAnswer: 2,
    explanation: "The track is located at Dunsfold Aerodrome.",
    topic: "Pop Culture",
  },
  {
    id: "at36",
    question: "AWD stands for:",
    choices: ["All-Wheel Drive", "Automatic Wheel", "Advanced", "Anti-Drift"],
    correctAnswer: 0,
    explanation: "All-Wheel Drive sends power to all four tires.",
    topic: "Terminology",
  },
  {
    id: "at37",
    question: "Cadillac named after founder of:",
    choices: ["NY", "Detroit", "Chicago", "LA"],
    correctAnswer: 1,
    explanation: "Named after Antoine de la Mothe Cadillac (Detroit).",
    topic: "History",
  },
  {
    id: "at38",
    question: "Muscle Car engine type:",
    choices: ["Flat-4", "V8", "Straight-6", "Twin-V6"],
    correctAnswer: 1,
    explanation: "Classic muscle cars are defined by large V8 engines.",
    topic: "History",
  },
  {
    id: "at39",
    question: "Crumple Zone purpose:",
    choices: ["Weight", "Absorb impact", "Protect engine", "Aero"],
    correctAnswer: 1,
    explanation: "They deform to soak up energy during a crash.",
    topic: "Safety",
  },
  {
    id: "at40",
    question: "McLaren F1 engine status:",
    choices: ["Turbo", "Supercharged", "Naturally Aspirated", "Hybrid"],
    correctAnswer: 2,
    explanation: "It is the fastest naturally aspirated production car.",
    topic: "Performance",
  },
  ],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getQuestionsForDay(
  subject: string,
  dayNumber: number,
): Question[] {
  const subjectQuestions = questionBank[subject] || [];

  if (subjectQuestions.length === 0) {
    console.error("No questions found for subject:", subject);
    return [];
  }

  const seed =
    subject
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) *
    dayNumber;
  const shuffled = shuffleArray(subjectQuestions, seed);

  return shuffled.slice(0, 4);
}