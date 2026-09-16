import { PracticalQuestion } from "./questionBank";

/**
 * PRACTICAL LEVEL QUESTIONS
 *
 * Add your unique practical questions here. These questions use answer pools
 * instead of fixed choices.
 *
 * Structure:
 * - correctPool: Array of correct answers (one will be randomly selected)
 * - wrongPool: Array of wrong answers (three will be randomly selected)
 * - The system will combine 1 correct + 3 wrong answers and shuffle them
 *
 * Example:
 * {
 *   id: "de1_practical",
 *   question: "In a real circuit, what component would you use to convert AC to DC?",
 *   correctPool: ["Bridge rectifier", "Diode bridge", "Rectifier circuit"],
 *   wrongPool: ["Transformer", "Capacitor", "Resistor", "Inductor", "Transistor"],
 *   explanation: "A bridge rectifier converts AC to DC by using four diodes...",
 *   topic: "Power Electronics",
 *   difficulty: 'practical' as const
 * }
 */

export const practicalQuestions: {
  [subject: string]: PracticalQuestion[];
} = {
  "Digital Electronics": [
    {
      id: "de1_practical",
      question:
        "Computers use 'Binary,' which is like a light switch that can only be ON (1) or OFF (0). If we want to represent more complex information like the letter 'A', how does the computer handle it?",
      correctPool: [
        "It strings multiple 1s and 0s together in a row to create unique patterns.",
        "It uses groups of 8 switches (a Byte) to provide enough combinations for different data.",
        "It combines these simple signals into sequences where the position of each digit changes its meaning.",
      ],
      wrongPool: [
        "It fades the light switch to halfway (0.5) to represent letters.",
        "It changes the color of the electricity flowing through the wires.",
        "It uses a different shaped switch for every word in the dictionary.",
        "It waits for the user to flip the switch manually for every single calculation.",
        "It uses 10 different positions for a single switch instead of two.",
        "It sends the 1s through the air and the 0s through the floor.",
        "It vibrates the switch to create a 'maybe' state.",
        "It only works if the switch is kept in the ON position forever.",
        "It turns the switch into a dial that goes from 1 to 100.",
      ],
      explanation:
        "Computers are made of billions of tiny transistors that act as switches. By grouping these (e.g., 01000001 for 'A'), they can represent any complex information.",
      topic: "Number Systems",
      difficulty: "practical" as const,
    },
    {
      id: "de2_practical",
      question:
        "In digital logic, an 'AND gate' is like a security system with two locks. What is the only way the 'door' (output) will open?",
      correctPool: [
        "Both Key A AND Key B must be turned at the same time.",
        "The signal must be 'True' on the first input AND 'True' on the second input.",
        "Both switches must be in the ON position; if even one is OFF, the door stays shut.",
      ],
      wrongPool: [
        "If you turn either Key A OR Key B, the door opens.",
        "If you leave both keys at home, the door opens automatically.",
        "The door only opens if Key A is turned and Key B is broken.",
        "You must turn Key A three times very fast.",
        "The door opens if the room is bright enough.",
        "You have to shout at the door until the sensor hears you.",
        "The door only opens if it is exactly midnight.",
        "If you turn both keys, the door actually locks tighter.",
        "The door stays open forever once you turn the first key.",
      ],
      explanation:
        "The AND gate is a fundamental rule: it requires all conditions to be '1' to result in a '1'.",
      topic: "Logic Gates",
      difficulty: "practical" as const,
    },
    {
      id: "de3_practical",
      question:
        "An 'OR gate' is like a hallway with two light switches. How can you get the light to turn on?",
      correctPool: [
        "The light turns on if you flip switch A, OR switch B, or both.",
        "It only stays dark if both switches are turned OFF at the same time.",
        "The output is 'True' as long as at least one input is 'True'.",
      ],
      wrongPool: [
        "The light only turns on if both switches are OFF.",
        "Flipping switch A turns the light on, but flipping B turns it off.",
        "You must flip both switches exactly at the same millisecond.",
        "The light only works during the daytime.",
        "You must flip the switches in a specific secret code.",
        "The light turns on if you stand exactly in the middle of the room.",
        "Turning on both switches at once will blow the fuse.",
        "The switches only work if they are wet.",
        "One switch is for the light, and the other is for the fan.",
      ],
      explanation:
        "The OR gate provides flexibility; it only needs one '1' to produce a '1'.",
      topic: "Logic Gates",
      difficulty: "practical" as const,
    },
    {
      id: "de4_practical",
      question:
        "A 'Flip-Flop' is a basic part of a computer's memory. What is its main job?",
      correctPool: [
        "It 'remembers' a single 1 or 0 until a new signal tells it to change.",
        "It holds onto a piece of information even after the original signal stops.",
        "It acts like a digital latch that stays in one position until it is toggled.",
      ],
      wrongPool: [
        "It flips the computer upside down to cool the processor.",
        "It deletes all your files every time you click a button.",
        "It changes 1s into 2s to make the computer faster.",
        "It makes the screen blink to save energy.",
        "It decides which website you should visit next.",
        "It converts the computer's electricity into battery power.",
        "It physically moves the mouse cursor across the screen.",
        "It translates English into Binary for the printer.",
        "It makes the computer's cooling fan spin backwards.",
      ],
      explanation:
        "Memory is just a collection of these 'latches' that hold a state (On or Off) until they are told otherwise.",
      topic: "Memory Elements",
      difficulty: "practical" as const,
    },
    {
      id: "de5_practical",
      question:
        "Most digital systems have a 'Clock.' What does this clock do for the computer?",
      correctPool: [
        "It acts like a heartbeat that tells all the parts when to take their next step.",
        "It keeps all the different components 'in sync' so they work together at the right time.",
        "It sends a steady pulse that coordinates the movement of data.",
      ],
      wrongPool: [
        "It tells the user when it is time to take a break.",
        "It counts how many hours the computer has been turned on.",
        "It makes the computer run faster when the sun is out.",
        "It sets the alarm for the computer's wake-up time.",
        "It controls the speed of the internet connection.",
        "It calculates the time remaining until the battery dies.",
        "It adjusts the brightness of the screen based on the time of day.",
        "It records the date and time you created a file.",
        "It spins the hard drive in a clockwise direction only.",
      ],
      explanation:
        "Just like a conductor in an orchestra, the clock ensures every part of the computer moves on the same beat.",
      topic: "Sequential Logic",
      difficulty: "practical" as const,
    },
    {
      id: "de6_practical",
      question:
        "In digital electronics, a 'NOT gate' is often called an 'Inverter.' If you send an 'ON' signal (1) into it, what comes out the other side?",
      correctPool: [
        "An 'OFF' signal (0); it always gives the exact opposite of what it receives.",
        "A 'False' signal; it flips the input like a mirror flips an image.",
        "Nothing (0); it acts like a 'No' man who disagrees with everything you say.",
      ],
      wrongPool: [
        "A stronger 'ON' signal because it doubles the power.",
        "A 'Maybe' signal that blinks on and off.",
        "The same 'ON' signal because it just passes it through.",
        "Two 'ON' signals at the same time.",
        "A random signal that changes every second.",
        "A signal that sounds like a bell.",
        "A '10' because it multiplies the number by ten.",
        "A signal that only works if you say 'please'.",
        "An 'ON' signal, but only on Tuesdays.",
      ],
      explanation:
        "The NOT gate is the simplest rule: whatever goes in, the opposite comes out. It is used to flip logic.",
      topic: "Logic Gates",
      difficulty: "practical" as const,
    },
    {
      id: "de7_practical",
      question:
        "Humans usually count using 10 digits (0–9), but computers only have two (0 and 1). To count to the number 'two' in binary, what does a computer have to do?",
      correctPool: [
        "It moves to a new column, writing it as '10' (one-zero).",
        "It starts a 'tens' place early, just like we do when we hit 10.",
        "It uses a 1 and a 0 together because it ran out of single digits after 1.",
      ],
      wrongPool: [
        "It draws a '2' but makes it very small.",
        "It waits for someone to give it a third switch.",
        "It writes '11' because two 1s make a two.",
        "It just stays at '1' and hopes you don't notice.",
        "It uses a capital 'B' for binary.",
        "It turns the '1' sideways.",
        "It subtracts 1 from 0.",
        "It blinks the light twice really fast.",
        "It makes a 'V' shape with the wires.",
      ],
      explanation:
        "Just like we go from 9 to 10 because we ran out of digits, a computer goes from 1 to 10 when it hits its limit.",
      topic: "Number Systems",
      difficulty: "practical" as const,
    },
    {
      id: "de8_practical",
      question:
        "How does a digital system handle an electrical signal that is supposed to be a '1' but is a little bit weak or 'noisy'?",
      correctPool: [
        "It rounds the signal to the nearest '1' as long as it is above a certain threshold.",
        "It ignores the fuzziness and treats anything 'high enough' as a solid ON.",
        "It cleans the signal up by deciding it's either a clear 1 or a clear 0, with no middle ground.",
      ],
      wrongPool: [
        "It stops working until the noise goes away.",
        "It plays a loud static noise to warn the user.",
        "It averages the noise and makes a '0.5' signal.",
        "It changes the color of the screen to gray.",
        "It asks the user to clean the wires with a cloth.",
        "It turns the 1 into a 0 just to be safe.",
        "It stores the noise as a secret music file.",
        "It speeds up the clock to outrun the noise.",
        "It sends the noise back to where it came from.",
      ],
      explanation:
        "This is the great advantage of digital: it doesn't care about small errors. If a signal is 'mostly on,' it counts as ON.",
      topic: "Circuit Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "de9_practical",
      question:
        "Imagine a digital calculator. When you press the '5' button, that is an Input. What is the Output?",
      correctPool: [
        "The number '5' appearing on the screen.",
        "The light patterns that form the shape of a '5' on the display.",
        "The final result of the calculation that is sent to the user.",
      ],
      wrongPool: [
        "The battery power inside the calculator.",
        "The plastic case that holds the buttons.",
        "The sound of the button clicking.",
        "The memory of the last number you typed.",
        "The heat generated by the processor.",
        "The finger you used to press the button.",
        "The instruction manual in the box.",
        "The time of day shown in the corner.",
        "The price you paid for the calculator.",
      ],
      explanation:
        "In any digital system, the Input is what you tell it, and the Output is how it answers back.",
      topic: "System Basics",
      difficulty: "practical" as const,
    },
    {
      id: "de10_practical",
      question:
        "A 'Multiplexer' (or MUX) is like a selector. If four different devices are trying to send a message but there is only one wire, what does the MUX do?",
      correctPool: [
        "It picks one person at a time to use the wire based on a 'selection' signal.",
        "It acts as a gatekeeper that chooses which input gets to go to the output.",
        "It switches between the different inputs so they can share the single path.",
      ],
      wrongPool: [
        "It tangles all the messages together into one big knot.",
        "It tells everyone to wait until tomorrow.",
        "It makes four copies of the wire so everyone is happy.",
        "It deletes the messages that are too long.",
        "It sends all the messages at the exact same time, causing a crash.",
        "It turns the messages into electricity to power a lightbulb.",
        "It only lets the loudest person talk.",
        "It sends the messages to a printer instead of the wire.",
        "It forces everyone to use the same name.",
      ],
      explanation:
        "A MUX allows many devices to share one path by 'selecting' which one is active at any given moment.",
      topic: "Combinational Logic",
      difficulty: "practical" as const,
    },
    {
      id: "de11_practical",
      question:
        "A 'Decoder' is like a translator. If a computer sends a binary code like '01,' how might a decoder use that to talk to a 4-story elevator?",
      correctPool: [
        "It translates the code '01' into a signal that specifically opens the door on Floor 1.",
        "It takes a small code and uses it to turn on one specific output out of many possibilities.",
        "It reads the pattern and 'unlocks' the single correct path that matches that pattern.",
      ],
      wrongPool: [
        "It hides the code so nobody else can see it.",
        "It makes the elevator move to all floors at once.",
        "It turns the numbers into music for the passengers.",
        "It counts how many people are inside the elevator.",
        "It cleans the floor of the elevator using a robot.",
        "It sends the code to the basement to be destroyed.",
        "It changes the binary 01 into the word 'Apple'.",
        "It makes the elevator go faster if the code is high.",
        "It stops the elevator between floors to save energy.",
      ],
      explanation:
        "Decoders take compressed information (like a 2-bit code) and expand it to trigger a specific real-world action.",
      topic: "Combinational Logic",
      difficulty: "practical" as const,
    },
    {
      id: "de12_practical",
      question:
        "You often hear about 'Computer Chips' or Integrated Circuits (ICs). What are these actually made of?",
      correctPool: [
        "Thousands or millions of tiny switches (transistors) etched onto a small piece of silicon.",
        "A giant collection of microscopic logic gates packed into a single square.",
        "Many separate electronic parts shrunk down and connected on one tiny 'wafer'.",
      ],
      wrongPool: [
        "Actual potato chips that have been dried out.",
        "Small pieces of magnetic wood.",
        "Tiny batteries glued together in a row.",
        "Pieces of glass with ink drawings on them.",
        "A single large lightbulb that changes colors.",
        "Pressed flowers and copper wire.",
        "Very thin layers of colorful paper.",
        "Liquid metal kept in a plastic bag.",
        "Small stones that have been polished.",
      ],
      explanation:
        "An IC is like a whole city of electronics shrunk down to the size of a fingernail so they can work faster and use less power.",
      topic: "IC Technology",
      difficulty: "practical" as const,
    },
    {
      id: "de13_practical",
      question:
        "In a digital circuit, how does the hardware physically 'know' if a signal is a 1 or a 0?",
      correctPool: [
        "It measures the voltage: 'High' voltage usually means 1, and 'Low' (near zero) means 0.",
        "It checks if there is a strong electrical pressure (1) or almost no pressure (0).",
        "It treats a flow of electricity as an 'ON' and a lack of flow as an 'OFF'.",
      ],
      wrongPool: [
        "It weighs the wire to see if it is heavier with a 1.",
        "It listens for the wire to whistle when a 1 goes through.",
        "It smells the wire for a '1' scent.",
        "It asks the battery for permission to be a 1.",
        "It checks if the wire is hot or cold.",
        "It looks at the color of the wire's insulation.",
        "It counts how many electrons are sitting still.",
        "It measures the length of the wire.",
        "It checks if the wire is straight or curved.",
      ],
      explanation:
        "Digital logic is just electricity at two different levels. Typically, 5 Volts represents a '1' and 0 Volts represents a '0'.",
      topic: "Circuit Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "de14_practical",
      question:
        "Sometimes a signal gets weak because it has to travel through a very long wire. A 'Buffer' is used to help. What is its job?",
      correctPool: [
        "It 're-strengthens' the signal so it can keep going without changing the 1 into a 0.",
        "It acts like a relay runner who takes a tired signal and passes it on with fresh energy.",
        "It boosts the power of the 1 or 0 so it stays clear over long distances.",
      ],
      wrongPool: [
        "It slows the signal down so it doesn't get dizzy.",
        "It turns all the 1s into 0s to save money.",
        "It stops the signal and stores it in a box forever.",
        "It makes the wire thicker by adding tape.",
        "It translates the signal into a different language.",
        "It adds random numbers to the signal to confuse hackers.",
        "It turns the electricity into a sound wave.",
        "It cools the wire down with a small fan.",
        "It makes the signal blink like a Christmas light.",
      ],
      explanation:
        "A buffer doesn't change the logic; it just ensures the signal is strong enough to reach its destination.",
      topic: "Circuit Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "de15_practical",
      question:
        "If a computer wants to send 8 bits of data, it can send them in 'Parallel.' What does that look like?",
      correctPool: [
        "It sends all 8 bits at the same time using 8 separate wires.",
        "It works like an 8-lane highway where 8 cars can travel side-by-side.",
        "It delivers the whole group at once instead of one-by-one.",
      ],
      wrongPool: [
        "It sends one bit, waits an hour, and then sends the next.",
        "It mixes all the bits together into a single '8' signal.",
        "It sends the bits in a circle until they get where they are going.",
        "It only sends the 1s and forgets about the 0s.",
        "It sends the bits through a single wire very, very slowly.",
        "It prints the bits on a piece of paper.",
        "It uses a single wire but changes the color for each bit.",
        "It sends the bits backwards starting from the last one.",
        "It sends the bits through the air using a tiny radio.",
      ],
      explanation:
        "Parallel is fast because it uses multiple paths at once, though it requires more wires than Serial communication.",
      topic: "Data Transfer",
      difficulty: "practical" as const,
    },
    {
      id: "de16_practical",
      question:
        "Digital alarm clock numbers are made of 7 glowing bars. How does digital logic make the number '1' appear?",
      correctPool: [
        "It sends an 'ON' signal to only the two vertical bars on the right side.",
        "It uses a decoder to pick exactly which segments need power for that specific shape.",
        "It turns off 5 bars and leaves 2 bars on to create the vertical shape.",
      ],
      wrongPool: [
        "It draws a '1' using a tiny robotic pen inside the glass.",
        "It blinks all the bars so fast they look like a 1.",
        "It turns on all the bars and hopes you can see the 1.",
        "It uses a small mirror to reflect a 1 from a nearby lamp.",
        "It makes the clock vibrate in the shape of a 1.",
        "It changes the color of the entire screen to '1-colored'.",
        "It only works if the room is dark.",
        "It rotates the bars until they line up.",
        "It uses a tiny lightbulb for every possible number.",
      ],
      explanation:
        "By turning on specific combinations of the 7 bars (segments), we can represent all the digits from 0 to 9.",
      topic: "Combinational Logic",
      difficulty: "practical" as const,
    },
    {
      id: "de17_practical",
      question:
        "In the digital world, what is 'Propagation Delay'?",
      correctPool: [
        "The tiny amount of time it takes for a signal to travel from the input to the output.",
        "The short pause between flipping a switch and the signal reacting.",
        "The 'travel time' required for electricity to move through the internal gates.",
      ],
      wrongPool: [
        "When the computer decides to take a nap.",
        "The time it takes for the user to think of a number.",
        "A mistake where the computer forgets what it was doing.",
        "When the battery runs out of power.",
        "The time it takes to plug the computer into the wall.",
        "When the internet connection is too slow.",
        "A physical block in the wire like a kink in a hose.",
        "When the computer screen gets too dusty.",
        "The time it takes for the cooling fan to start.",
      ],
      explanation:
        "Even though it's measured in billionths of a second, signals still take time to move through hardware components.",
      topic: "Circuit Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "de18_practical",
      question:
        "Some critical systems (like on a spaceship) use 'Redundancy.' In digital logic, what does this usually mean?",
      correctPool: [
        "Having multiple computers do the same math and 'voting' on the right answer.",
        "Building a backup circuit that takes over if the first one breaks.",
        "Using extra hardware to double-check that a signal is correct.",
      ],
      wrongPool: [
        "Making the computer use more electricity than it needs.",
        "Printing out every calculation on paper.",
        "Deleting the same file twice.",
        "Having the computer ask the user 'Are you sure?' every time.",
        "Using very long wires that wrap around the room.",
        "Painting the circuit board a bright red color.",
        "Making the computer work only during the daytime.",
        "Forcing the computer to count to a million before starting.",
        "Giving the computer a second keyboard that doesn't work.",
      ],
      explanation:
        "Redundancy is like having a spare tire; if one component fails, the system has a backup to keep running safely.",
      topic: "System Reliability",
      difficulty: "practical" as const,
    },
    {
      id: "de19_practical",
      question:
        "Some memory is 'Volatile' (like RAM). What happens to the data in Volatile memory when you turn the power off?",
      correctPool: [
        "It disappears completely; it needs electricity to 'hold' the information.",
        "The memory goes blank, like a chalkboard being erased.",
        "The data is lost because there is no power to maintain the internal state.",
      ],
      wrongPool: [
        "It gets saved to a secret cloud in the sky.",
        "It turns into a physical photo inside the computer.",
        "It stays there forever even if the battery is removed.",
        "It makes the computer smell like smoke.",
        "It moves into the power cord to wait for next time.",
        "It changes from binary into a different language.",
        "It makes a loud 'pop' sound.",
        "It causes the screen to turn bright green.",
        "It stays, but only the 1s are kept.",
      ],
      explanation:
        "Volatile memory requires constant power to store bits. Non-volatile memory (like a USB drive) keeps data without power.",
      topic: "Memory",
      difficulty: "practical" as const,
    },
    {
      id: "de20_practical",
      question:
        "At the end of the day, what is the ultimate goal of all these gates, switches, and binary signals?",
      correctPool: [
        "To process information and make decisions based on a set of rules.",
        "To take data from the world, change it, and produce a useful result.",
        "To perform complex tasks by breaking them down into millions of simple steps.",
      ],
      wrongPool: [
        "To make the world as complicated as possible.",
        "To use up all the electricity in the house.",
        "To replace humans with giant calculators.",
        "To make noise and heat to keep people warm.",
        "To create pretty patterns of green light on a board.",
        "To keep the silicon industry in business.",
        "To hide secrets from the average person.",
        "To make sure nobody has to do math ever again.",
        "To turn the internet into a giant game of tag.",
      ],
      explanation:
        "Digital electronics take the complexity of the world and turn it into simple 'Yes/No' logic so that machines can help us solve problems.",
      topic: "System Basics",
      difficulty: "practical" as const,
    },
    // Add more practical questions below...
  ],

  "Internet of Things": [
    {
      id: "iot1_practical",
      question:
        "The 'Internet of Things' (IoT) is like giving a brain to everyday objects. What is the most basic 'loop' a Smart Thermostat follows to work?",
      correctPool: [
        "It senses the room temperature, decides if it’s too cold, and tells the heater to turn on.",
        "It gathers data from the air, compares it to a goal, and takes an action to reach that goal.",
        "It monitors the environment, checks against a setting, and triggers a device to change the condition.",
      ],
      wrongPool: [
        "It waits for the heater to tell it that the room is already hot.",
        "It turns on every appliance in the house at once to stay busy.",
        "It records the sound of the wind and plays it back to the user.",
        "It asks the user to stand next to it to provide body heat.",
        "It predicts the future by looking out the window with a camera.",
        "It only works if the user physically touches the wall unit.",
        "It sends an email to the power company every time it feels a breeze.",
        "It deletes all saved data every time the temperature changes.",
        "It uses a motor to physically open the windows when it gets cold.",
      ],
      explanation:
        "IoT relies on the 'Sense-Think-Act' cycle: Sensors gather data, the processor makes a decision, and the actuator (like a heater) performs the action.",
      topic: "IoT Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "iot2_practical",
      question:
        "An IoT 'Sensor' is like a human sense organ. If a smart security system wants to know if a window was opened, which 'sense' does it use?",
      correctPool: [
        "A magnetic sensor that detects when two parts of the window frame move apart.",
        "A contact sensor that breaks an electrical circuit when the window moves.",
        "A proximity sensor that notices the distance between the frame and the glass has changed.",
      ],
      wrongPool: [
        "A microphone to hear if the window is feeling sad.",
        "A battery tester to see if the window is 'tired'.",
        "A scale to weigh the glass every five seconds.",
        "A thermometer to see if the window has a fever.",
        "A lightbulb that shines on the window to keep it awake.",
        "A GPS tracker to see if the house has moved to a new city.",
        "A sensor that measures how much the window likes the curtains.",
        "A clock that counts how old the glass is.",
        "A fan that blows on the window to see if it wobbles.",
      ],
      explanation:
        "Sensors measure physical properties (like distance, light, or magnetism) to turn real-world events into digital data.",
      topic: "Sensors",
      difficulty: "practical" as const,
    },
    {
      id: "iot3_practical",
      question:
        "IoT devices often use 'The Cloud.' What is the best way to describe what the Cloud does for a small smart doorbell?",
      correctPool: [
        "It acts as a giant, remote brain that stores video and sends alerts to your phone.",
        "It provides extra memory and processing power that the tiny doorbell hardware doesn't have.",
        "It is a central server that connects your phone to your doorbell from anywhere in the world.",
      ],
      wrongPool: [
        "It is a physical weather cloud that follows the doorbell to keep it cool.",
        "It is a way for the doorbell to talk to birds flying nearby.",
        "It makes the doorbell float so it is easier for visitors to see.",
        "It turns the doorbell's electricity into rain to water the porch.",
        "It hides the doorbell from burglars using a digital mist.",
        "It is a giant hard drive buried in the user's backyard.",
        "It sends a physical balloon to the house to deliver messages.",
        "It makes the doorbell ring louder when it is cloudy outside.",
        "It replaces the internet with a system of pipes and steam.",
      ],
      explanation:
        "The 'Cloud' refers to powerful remote servers that handle the heavy data storage and thinking for small IoT devices.",
      topic: "Cloud Computing",
      difficulty: "practical" as const,
    },
    {
      id: "iot4_practical",
      question:
        "A smart farm uses a 'Moisture Sensor.' If the sensor breaks and always reports the soil is 'Dry' (even when it's wet), what will happen?",
      correctPool: [
        "The system will keep watering the plants forever, potentially flooding the field.",
        "The 'brain' will follow the false data and trigger the water pumps unnecessarily.",
        "The system will waste water because it cannot see the true state of the soil.",
      ],
      wrongPool: [
        "The plants will grow into giant beanstalks instantly.",
        "The system will call the fire department to report a drought.",
        "The water in the pipes will turn into steam to save space.",
        "The sun will shine brighter to help the 'dry' soil.",
        "The sensor will start growing its own roots to find water.",
        "The computer will turn into a watering can.",
        "The plants will start talking to the farmer through the app.",
        "The system will move the farm to a rainier location.",
        "The water will freeze automatically to stay in the soil longer.",
      ],
      explanation:
        "IoT systems are only as good as their data. If a sensor sends 'bad data,' the system will take the wrong action.",
      topic: "Data Integrity",
      difficulty: "practical" as const,
    },
    {
      id: "iot5_practical",
      question:
        "Why do devices like Smart Watches use 'Low-Energy Bluetooth' instead of high-speed Wi-Fi for everything?",
      correctPool: [
        "To save battery life so the watch doesn't die in just a few hours.",
        "Because sending small bits of data (like a heartbeat) doesn't need a high-power connection.",
        "To minimize energy drain while staying constantly connected to a phone.",
      ],
      wrongPool: [
        "Because Wi-Fi is too heavy and would make the watch weigh 10 pounds.",
        "Because watches are afraid of the 'big' internet.",
        "To make sure the watch only works when the user is standing still.",
        "Because Bluetooth signals are more colorful than Wi-Fi signals.",
        "So the watch can't see the user's private emails.",
        "To prevent the watch from spinning around the user's wrist.",
        "Because Wi-Fi only works if you are underwater.",
        "To stop the watch from turning into a smartphone.",
        "Because Bluetooth is the only signal that works in the dark.",
      ],
      explanation:
        "IoT design is all about balance. Low-power protocols are used for small devices to keep them running for days or years on one charge.",
      topic: "Connectivity",
      difficulty: "practical" as const,
    },
    {
      id: "iot6_practical",
      question:
        "In an IoT factory, a machine sends a 'Heartbeat' signal every second. What is the purpose of this signal?",
      correctPool: [
        "To tell the main computer that the machine is still 'alive' and connected.",
        "To act as a constant check-in so the system knows the machine hasn't failed.",
        "To provide a regular pulse that confirms the communication link is working.",
      ],
      wrongPool: [
        "To pump oil through the machine like biological blood.",
        "To make a rhythmic drumming sound to keep workers happy.",
        "To count how many seconds the machine has existed since it was built.",
        "To generate heat to keep the factory warm in the winter.",
        "To tell the machine's mother that it is doing a good job.",
        "To synchronize the machine with the local radio station.",
        "To charge the battery using the power of sound waves.",
        "To prevent the machine from getting lonely.",
        "To signal that the machine wants to go on vacation.",
      ],
      explanation:
        "A 'Heartbeat' is a simple status message used in IoT to monitor if a device is still online and functioning.",
      topic: "Device Management",
      difficulty: "practical" as const,
    },
    {
      id: "iot7_practical",
      question: "What is an 'Actuator' in an IoT system?",
      correctPool: [
        "The part that takes action, like a motor opening a blind or a switch turning on a light.",
        "The 'hands' of the system that convert a digital command into physical movement.",
        "Any component that performs a physical task based on a signal from the controller.",
      ],
      wrongPool: [
        "A sensor that smells when the trash can is full.",
        "A special battery that never runs out of power.",
        "A person who pretends to be a robot in a movie.",
        "The plastic box that holds all the wires together.",
        "A cable that connects the computer to the wall.",
        "A software program that deletes old files.",
        "The screen that shows the user the temperature.",
        "A speaker that plays music when you walk by.",
        "The person who bought the device at the store.",
      ],
      explanation:
        "While sensors 'input' information, actuators are the 'outputs' that physically do work in the real world.",
      topic: "Hardware",
      difficulty: "practical" as const,
    },
    {
      id: "iot8_practical",
      question: "What is a 'Gateway' in an IoT network?",
      correctPool: [
        "A bridge that collects data from many small sensors and sends it to the internet.",
        "A translator that helps local devices speak the language of the 'Cloud'.",
        "A central hub that manages communication between low-power devices and the web.",
      ],
      wrongPool: [
        "A physical wooden gate that protects sensors from animals.",
        "A vacuum that sucks up digital signals from the floor.",
        "A solar panel that turns sunlight into Wi-Fi signals.",
        "A security guard who watches the computer all night.",
        "A hole in the wall where the internet enters the house.",
        "A secret password that only the owner knows.",
        "A device that makes the internet go faster by cooling it down.",
        "A light that turns green when the internet is 'full'.",
        "A printer that prints out every signal the sensors send.",
      ],
      explanation:
        "Many IoT devices are too simple to talk to the internet directly; they talk to a Gateway, which then talks to the internet.",
      topic: "Connectivity",
      difficulty: "practical" as const,
    },
    {
      id: "iot9_practical",
      question:
        "A 'Smart City' uses trash cans that alert the city when they are full. How does this practically save money?",
      correctPool: [
        "Trucks only drive to the cans that need emptying, saving fuel and time.",
        "It prevents workers from wasting time checking empty bins on a fixed schedule.",
        "It allows for 'On-Demand' trash collection based on real need instead of a calendar.",
      ],
      wrongPool: [
        "The trash cans compress the trash into expensive gold bars.",
        "The cans walk themselves to the dump when they are full.",
        "The cans charge people a fee every time they throw something away.",
        "The trash turns into electricity inside the can to power the streetlights.",
        "The cans use a vacuum to pull trash from people's homes.",
        "The city sells the data of what people throw away to advertisers.",
        "The cans shrink the trash so it never has to be emptied.",
        "The cans freeze the trash so it doesn't smell bad.",
        "The cans use a laser to destroy the trash instantly.",
      ],
      explanation:
        "IoT efficiency comes from 'Optimized Logistics'—using data to decide exactly when and where to use human resources.",
      topic: "IoT Applications",
      difficulty: "practical" as const,
    },
    {
      id: "iot10_practical",
      question:
        "Why is 'Security' a bigger concern for an IoT Smart Lock than for a traditional metal lock?",
      correctPool: [
        "An internet-connected lock can be 'tricked' by someone from across the world.",
        "A digital mistake or hack can result in the physical door being unlocked.",
        "The lock is 'visible' to anyone on the internet, not just people standing at the door.",
      ],
      wrongPool: [
        "The internet makes the metal in the lock turn into soft plastic.",
        "Smart locks are more likely to explode if they see a cat.",
        "You have to pay a monthly fee for the lock to stay closed.",
        "The lock will only open if you sing a song to it.",
        "The keyhole moves to a different spot every night.",
        "The lock uses so much power it might melt the door.",
        "The lock will tell the neighbors your secrets.",
        "A smart lock is heavier than a normal door.",
        "The lock requires a satellite to be directly overhead to work.",
      ],
      explanation:
        "Cyber-physical security is critical because digital vulnerabilities can lead to real-world physical safety risks.",
      topic: "Security",
      difficulty: "practical" as const,
    },
    {
      id: "iot11_practical",
      question:
        "Some IoT devices use 'Edge Computing.' What does this mean in a practical sense?",
      correctPool: [
        "The device processes data 'on the spot' instead of sending it to a far-away server.",
        "The device makes its own decisions locally to avoid the delay of the internet.",
        "The 'brain' of the system is located right where the action is happening.",
      ],
      wrongPool: [
        "The device only works if it is placed on the edge of a table.",
        "The device uses a sharp edge to cut through electrical wires.",
        "The computer is shaped like a triangle with three edges.",
        "The device only works during the 'edge' of the morning and evening.",
        "The data is stored in the very corner of the hard drive.",
        "The device is built using only recycled edges of metal.",
        "The internet signal is 'sharpened' to make it go through walls.",
        "The user must stand on the edge of the room to use the app.",
        "The device balances on a thin wire to save space.",
      ],
      explanation:
        "Edge computing reduces 'Latency' (delay). It's like thinking for yourself instead of calling a friend for the answer every time.",
      topic: "Edge Computing",
      difficulty: "practical" as const,
    },
    {
      id: "iot12_practical",
      question:
        "An IoT 'Smart Grid' manages electricity for a city. If everyone turns on their AC at once, how does it help?",
      correctPool: [
        "It can slightly adjust thousands of smart thermostats to prevent the whole grid from crashing.",
        "It balances the power load in real-time by asking some devices to use less energy for a few minutes.",
        "It automatically distributes power to where it is needed most based on live data.",
      ],
      wrongPool: [
        "It creates more electricity out of thin air using magnets.",
        "It turns all the TVs to a channel about icebergs to make people feel colder.",
        "It tells the AC units to run on 'magic' mode to save power.",
        "It shuts down the water supply to give more energy to the lights.",
        "It makes the sun go behind a cloud to cool the city down.",
        "It forces everyone to go to sleep at the same time.",
        "It turns the electricity into a liquid that flows faster.",
        "It asks the power lines to stretch so they can hold more power.",
        "It sends a robot to every house to fan the occupants by hand.",
      ],
      explanation:
        "Smart Grids use two-way communication to balance supply and demand, making the energy system more 'elastic' and reliable.",
      topic: "IoT Applications",
      difficulty: "practical" as const,
    },
    {
      id: "iot13_practical",
      question:
        "If a 'Smart Fridge' wants to tell you that you are out of milk, how does it physically know the carton is empty?",
      correctPool: [
        "A built-in scale on the fridge shelf measures the weight of the milk.",
        "A camera inside uses 'computer vision' to see the level of milk in the bottle.",
        "A light sensor detects that more light is passing through the shelf where the milk usually sits.",
      ],
      wrongPool: [
        "It asks the milk how it is feeling today.",
        "It uses a tiny robot to drink the milk to check the taste.",
        "It counts how many times the user thought about cereal.",
        "It smells the kitchen to see if it smells like cookies.",
        "It measures the height of the person opening the door.",
        "It checks the user's bank account to see if they bought milk.",
        "It calls the grocery store to see if they sold any milk lately.",
        "It vibrates the fridge to see if the milk sloshes.",
        "It waits for the milk to send it a text message.",
      ],
      explanation:
        "IoT devices use physical sensors (weight, sight, light) to 'see' the status of non-digital objects like food.",
      topic: "Sensors",
      difficulty: "practical" as const,
    },
    {
      id: "iot14_practical",
      question: "What is 'Latency' in an IoT system?",
      correctPool: [
        "The time delay between a sensor detecting an event and the system taking an action.",
        "The 'lag' it takes for a signal to travel to the Cloud and back.",
        "The speed of the response; lower latency means a faster reaction.",
      ],
      wrongPool: [
        "The amount of dust that gathers on the sensor over time.",
        "The weight of the device including its batteries.",
        "How much the device 'likes' the person using it.",
        "The number of times the device has been dropped.",
        "The color of the wires inside the machine.",
        "The total cost of the internet bill every month.",
        "The distance between the device and the floor.",
        "How loud the device beeps when it is finished.",
        "The temperature of the room where the device is kept.",
      ],
      explanation:
        "Latency is the 'waiting time'. In systems like self-driving cars or medical IoT, low latency is a matter of safety.",
      topic: "Network Performance",
      difficulty: "practical" as const,
    },
    {
      id: "iot15_practical",
      question:
        "In a 'Smart Home,' if a smoke detector senses a fire, what is a helpful 'Action' it could take through IoT?",
      correctPool: [
        "It could turn on all lights and unlock the smart locks to help you escape.",
        "It could send an immediate GPS alert to the fire department with your address.",
        "It could shut off the HVAC fan so it doesn't spread smoke to other rooms.",
      ],
      wrongPool: [
        "It could hide all your favorite toys in the garden.",
        "It could start a fan to blow the smoke into the neighbor's house.",
        "It could change the TV channel to a show about water.",
        "It could spray the walls with colorful paint to mark the fire.",
        "It could make the fridge freeze all the food instantly.",
        "It could play loud dance music to wake up the whole street.",
        "It could order a new house on the internet.",
        "It could turn the water in the sink into juice.",
        "It could delete your social media accounts for safety.",
      ],
      explanation:
        "The power of IoT is 'Orchestration'—multiple devices working together to solve a complex problem like an emergency.",
      topic: "IoT Applications",
      difficulty: "practical" as const,
    },
    {
      id: "iot16_practical",
      question:
        "What does it mean for an IoT device to be 'Plug and Play'?",
      correctPool: [
        "The device works automatically as soon as it is plugged in, with no difficult setup.",
        "The software configures itself without the user needing to write code.",
        "The system is designed to be user-friendly and start working immediately.",
      ],
      wrongPool: [
        "The device only works if you are playing a musical instrument.",
        "The device turns into a toy after you use it once.",
        "You have to plug it into a bathtub to make it work.",
        "The device only works if you are standing in a playground.",
        "The user must play a game of chess against the device to unlock it.",
        "The device requires a physical key made of wood.",
        "The device only works while it is being tossed in the air.",
        "The device must be plugged into a potato to get power.",
        "The user has to act like a robot for the device to 'play'.",
      ],
      explanation:
        "'Plug and Play' means the complex technical 'handshake' between the device and the network is hidden from the user.",
      topic: "Usability",
      difficulty: "practical" as const,
    },
    {
      id: "iot17_practical",
      question:
        "A wearable 'Fall Detector' for the elderly uses an 'Accelerometer.' How does it logically know a fall happened?",
      correctPool: [
        "It detects a sudden high-speed drop followed by a total lack of movement.",
        "It measures a specific pattern of gravity and impact that matches a human falling.",
        "It notices a violent change in direction and speed that is different from normal walking.",
      ],
      wrongPool: [
        "It listens for the person to say 'Oops!'.",
        "It checks the GPS to see if the person is now underground.",
        "It feels the person's heartbeat stop for ten minutes.",
        "It asks the floor if it was hit by a person lately.",
        "It measures how much the person's clothes are wrinkled.",
        "It counts how many times the person's glasses fell off.",
        "It checks if the person's shoes are still tied.",
        "It sees if the person is looking at the ceiling.",
        "It uses a thermometer to see if the floor is cold.",
      ],
      explanation:
        "Accelerometers measure 'G-force' and speed. Computers can distinguish between a 'trip and fall' and just 'sitting down quickly'.",
      topic: "Sensors/Logic",
      difficulty: "practical" as const,
    },
    {
      id: "iot18_practical",
      question:
        "What is 'Interoperability' in the world of IoT?",
      correctPool: [
        "The ability for devices from different brands to talk to each other and work together.",
        "A standard that allows a Samsung fridge to talk to a Philips lightbulb.",
        "Ensuring that different systems can exchange and use the same information.",
      ],
      wrongPool: [
        "Making sure the devices don't get into a physical fight.",
        "Ensuring that the device is made of 100% recycled paper.",
        "The ability for a device to operate while underwater.",
        "Making sure the device can survive a fall from a tall building.",
        "The skill of the person who invented the device.",
        "A law that says you can only own one smart device.",
        "The ability for a device to turn into a car.",
        "Ensuring the device never uses any electricity.",
        "The process of painting all your devices the same color.",
      ],
      explanation:
        "Interoperability is the 'Common Language' of IoT. Without it, you would need a different app for every single lightbulb in your house.",
      topic: "Standards",
      difficulty: "practical" as const,
    },
    {
      id: "iot19_practical",
      question:
        "What is 'Predictive Maintenance' in an IoT-connected factory?",
      correctPool: [
        "Using sensors to hear or feel a machine failing *before* it actually breaks down.",
        "Analyzing data patterns to schedule repairs only when the machine actually needs them.",
        "Monitoring heat and vibration to catch problems in their early stages.",
      ],
      wrongPool: [
        "Asking a psychic to tell you when the machine will break.",
        "Waiting for the machine to explode before fixing it.",
        "Replacing every part of the machine every single day just in case.",
        "Painting the machine a new color so it feels better.",
        "Using the machine until it turns into a pile of rust.",
        "Asking the workers to guess when the machine is tired.",
        "Turning the machine off forever so it never breaks.",
        "Buying a new machine every time the old one gets dusty.",
        "Telling the machine to 'try harder' so it doesn't fail.",
      ],
      explanation:
        "Predictive maintenance saves millions by fixing small issues before they become catastrophic 'breakdowns'.",
      topic: "IoT Applications",
      difficulty: "practical" as const,
    },
    {
      id: "iot20_practical",
      question:
        "What is the primary purpose of an 'IP Address' for an IoT device?",
      correctPool: [
        "It acts like a digital 'home address' so other devices can find it on the network.",
        "It provides a unique ID that allows data to be sent to the correct machine.",
        "It allows the internet to 'route' messages specifically to that one device.",
      ],
      wrongPool: [
        "It tells the device the physical street address of the owner.",
        "It measures the 'Internet Pressure' inside the wires.",
        "It is a secret code that makes the device go faster.",
        "It is the price the user paid for the internet connection.",
        "It tells the device what the weather is like in London.",
        "It is a list of all the other devices the user has ever owned.",
        "It acts like a battery meter for the Wi-Fi signal.",
        "It is the name of the person who built the device.",
        "It tells the device how many people are in the room.",
      ],
      explanation:
        "Just like a house needs an address to receive mail, every IoT device needs an IP address to receive data.",
      topic: "Networking",
      difficulty: "practical" as const,
    },
    // Add more practical questions below...
  ],

  "Physics for Automotive": [
    {
      id: "phy1_practical",
      question:
        "Imagine you are sliding a heavy wooden box across a carpeted floor. You notice the bottom of the box feels warm after you stop. Why did the box get hot?",
      correctPool: [
        "The 'rubbing' force called friction turned your movement energy into heat energy.",
        "Molecules on the surfaces bumped into each other so hard that they generated thermal energy.",
        "Friction acted as a 'brake' that converted the energy of motion into heat.",
      ],
      wrongPool: [
        "The carpet was already hot from the sun before you started.",
        "The box was trying to start a fire to help you move it.",
        "Energy was destroyed and replaced with heat by the floor.",
        "Moving objects naturally absorb heat from the air to get faster.",
        "The box is made of a special 'heat-generating' wood.",
        "Friction creates a vacuum that pulls heat from the Earth's core.",
        "Gravity gets heavier as you push, which creates warmth.",
        "The box gets hot because it is tired from moving.",
        "Static electricity from your socks traveled into the box.",
      ],
      explanation:
        "Energy cannot be destroyed. When friction stops an object, that 'movement energy' (Kinetic Energy) is converted into 'heat energy' (Thermal Energy).",
      topic: "Thermodynamics & Friction",
      difficulty: "practical" as const,
    },
    {
      id: "phy2_practical",
      question:
        "If you are standing on a skateboard and throw a heavy backpack forward as hard as you can, what happens to you?",
      correctPool: [
        "You roll backward because every action has an equal and opposite reaction.",
        "The force you used to push the bag also pushed back on your body.",
        "The 'kickback' from the throw sends you in the opposite direction.",
      ],
      wrongPool: [
        "You fly forward even faster than the backpack.",
        "You stay perfectly still because the backpack is not part of your body.",
        "The skateboard explodes due to the sudden weight change.",
        "You sink into the ground because the backpack was holding you up.",
        "You spin in a circle because of the wind the bag made.",
        "Gravity stops working for a second while the bag is in the air.",
        "You move forward because you are 'following' the backpack.",
        "The skateboard wheels lock up to prevent you from moving.",
        "Nothing happens unless someone else is watching you.",
      ],
      explanation:
        "Newton's Third Law states that for every action, there is an equal and opposite reaction. Pushing the bag forward pushes you backward.",
      topic: "Newton's Laws",
      difficulty: "practical" as const,
    },
    {
      id: "phy3_practical",
      question:
        "Why is it much harder to stop a massive truck than a small car, even if they are both moving at the same slow speed?",
      correctPool: [
        "The truck has more 'Momentum' because it has a much higher mass.",
        "Its heavy weight makes it want to keep moving forward (Inertia).",
        "More mass means it takes a lot more force to change its state of motion.",
      ],
      wrongPool: [
        "The truck's tires are made of a more slippery kind of rubber.",
        "The truck is taller, so the wind pushes it forward more.",
        "Small cars have 'magic' brakes that work instantly.",
        "The truck is trying to get to its destination faster.",
        "The truck's engine is still running while it tries to stop.",
        "Gravity pulls harder on small cars than it does on trucks.",
        "The truck is made of magnetic metal that sticks to the road.",
        "Large vehicles don't believe in stopping.",
        "The truck has more air inside it, which makes it float forward.",
      ],
      explanation:
        "Momentum is Mass times Velocity. Because the truck is much heavier (more mass), it has much more 'oomph' keeping it moving.",
      topic: "Momentum & Inertia",
      difficulty: "practical" as const,
    },
    {
      id: "phy4_practical",
      question:
        "Why do you feel 'pulled' to the side when a car takes a very sharp turn?",
      correctPool: [
        "Your body wants to keep moving in a straight line while the car moves sideways.",
        "Inertia makes your body resist the change in direction.",
        "The car is moving away from your current path, making it feel like you are being pushed.",
      ],
      wrongPool: [
        "The car door is a giant magnet pulling on your clothes.",
        "The wind inside the car is blowing you toward the window.",
        "The tires are throwing gravity out of the side of the car.",
        "The car is tilting so much that you are literally falling.",
        "The steering wheel is pushing air at you.",
        "Your brain is trying to jump out of the car.",
        "The road is slanted to make people fall over.",
        "Centrifugal force is a real physical ghost pushing you.",
        "The seatbelts are pulling you toward the door.",
      ],
      explanation:
        "This is Inertia. An object in motion wants to stay in a straight line. When the car turns, your body tries to keep going straight until the car door pushes you into the turn.",
      topic: "Inertia",
      difficulty: "practical" as const,
    },
    {
      id: "phy5_practical",
      question:
        "If you drop a bowling ball and a feather in a room where all the air has been sucked out (a vacuum), which one hits the ground first?",
      correctPool: [
        "They hit at the exact same time because gravity pulls on everything equally.",
        "Both fall at the same rate because there is no air to slow the feather down.",
        "They land together because without air resistance, weight doesn't change falling speed.",
      ],
      wrongPool: [
        "The bowling ball hits first because it is heavier.",
        "The feather hits first because it is more aerodynamic.",
        "The feather floats to the ceiling because there is no air.",
        "They both float forever because there is no air.",
        "The bowling ball breaks into pieces before it hits.",
        "The feather turns into a 1s and 0s digital signal.",
        "Gravity doesn't work if there is no air to carry it.",
        "The bowling ball moves sideways instead of down.",
        "The feather disappears because it needs air to exist.",
      ],
      explanation:
        "In a vacuum, gravity accelerates all objects at the same rate ($9.8\text{ m/s}^2$). On Earth, air normally holds the feather back, but without air, everything falls the same.",
      topic: "Gravity",
      difficulty: "practical" as const,
    },
    {
      id: "phy6_practical",
      question:
        "How does a thermos keep hot coffee warm for a long time?",
      correctPool: [
        "It has a vacuum layer that prevents heat from traveling through air.",
        "It blocks heat from escaping by removing the material (air) that heat would travel through.",
        "The double-wall design acts as a barrier that heat cannot easily cross.",
      ],
      wrongPool: [
        "It has a small battery that keeps the coffee lit.",
        "It uses a tiny heater hidden in the lid.",
        "It reflects the cold back into the room.",
        "It turns the coffee into a solid so it stays hot.",
        "It uses magic mirrors to double the heat.",
        "It absorbs heat from the person holding it.",
        "The coffee is scared to get cold inside the dark bottle.",
        "It adds extra caffeine to the coffee to keep it 'active'.",
        "It vibrates the liquid to keep the molecules moving.",
      ],
      explanation:
        "Heat travels through matter. By having a vacuum (empty space) between two walls, the heat has no 'path' to escape the bottle.",
      topic: "Heat Transfer",
      difficulty: "practical" as const,
    },
    {
      id: "phy7_practical",
      question:
        "If you use a longer wrench to loosen a stuck bolt, why is it easier than using a short wrench?",
      correctPool: [
        "The longer handle gives you more 'Leverage' (Torque).",
        "You are applying the same force at a greater distance from the center.",
        "It multiplies your effort by using a longer 'lever arm'.",
      ],
      wrongPool: [
        "The long wrench is heavier and crushes the bolt.",
        "Long wrenches are made of a stronger, 'looser' metal.",
        "The bolt is afraid of long tools.",
        "The air helps you push harder on longer things.",
        "Long wrenches heat up the bolt as you pull.",
        "A long wrench changes the bolt into a nut.",
        "The wrench uses the Earth's rotation to help you.",
        "The extra metal in the handle acts like a magnet.",
        "Long tools don't have to follow the rules of physics.",
      ],
      explanation:
        "Torque is Force $\times$ Distance. By increasing the distance (the handle length), you create much more turning power with the same amount of muscle.",
      topic: "Levers & Torque",
      difficulty: "practical" as const,
    },
    {
      id: "phy8_practical",
      question:
        "Why does a metal spoon feel much colder than a wooden spoon when they are both sitting in the same room?",
      correctPool: [
        "Metal is a 'Conductor' that sucks the heat away from your hand very quickly.",
        "Wood is an 'Insulator' that doesn't let heat move through it easily.",
        "The metal is actually the same temperature, but it steals your body heat faster.",
      ],
      wrongPool: [
        "Metal generates 'cold energy' naturally.",
        "The wooden spoon is actually much hotter than the room.",
        "Metal spoons are made in a freezer.",
        "The wood absorbs the heat from the sun better.",
        "The metal spoon is hollow and filled with ice.",
        "Your hand is allergic to metal.",
        "Metal is a liquid that looks like a solid.",
        "The wooden spoon has a tiny fur coat.",
        "Gravity pulls coldness into metal but not wood.",
      ],
      explanation:
        "Both spoons are the same temperature. Metal feels colder because it is a great conductor—it pulls heat out of your warm hand much faster than wood does.",
      topic: "Thermal Conductivity",
      difficulty: "practical" as const,
    },
    {
      id: "phy9_practical",
      question:
        "When you pump air into a bicycle tire, why does the pump feel warm near the bottom?",
      correctPool: [
        "Squeezing the air molecules together very fast creates heat.",
        "Compressing a gas increases its temperature.",
        "The work you do to squish the air is converted into thermal energy.",
      ],
      wrongPool: [
        "The rubber in the tire is burning.",
        "The pump is friction-less, so it makes heat from nothing.",
        "The sun is shining on the metal pump.",
        "The ground is heating up the pump from below.",
        "Electricity is leaking from the tire into the pump.",
        "The pump is trying to melt the air to make it fit.",
        "The handle is pulling heat from your hands into the base.",
        "Bicycle tires are naturally 100 degrees.",
        "The pump has a small fire inside it to push the air.",
      ],
      explanation:
        "When you compress a gas (like air), you are forcing molecules into a smaller space. This 'work' increases the temperature of the gas.",
      topic: "Thermodynamics",
      difficulty: "practical" as const,
    },
    {
      id: "phy10_practical",
      question:
        "Why do you see lightning *before* you hear the thunder?",
      correctPool: [
        "Light travels much faster than sound.",
        "Sound waves take more time to move through the air than light waves.",
        "Light reaches your eyes almost instantly, while sound 'crawls' to your ears.",
      ],
      wrongPool: [
        "Thunder happens a few minutes after the lightning ends.",
        "The lightning creates the thunder, then deletes it.",
        "Light is louder than sound, so you see it first.",
        "The rain blocks the sound but lets the light through.",
        "Light travels in a straight line, but sound moves in circles.",
        "Your eyes are faster than your ears.",
        "Thunder only happens if the lightning hits a tree.",
        "Sound is afraid of the dark.",
        "The clouds absorb the sound but reflect the light.",
      ],
      explanation:
        "Light travels at $300,000\text{ km/s}$, while sound travels at only about $0.34\text{ km/s}$. This massive speed difference creates the delay.",
      topic: "Waves & Speed",
      difficulty: "practical" as const,
    },
    {
      id: "phy11_practical",
      question:
        "How does a heavy steel ship stay afloat on water while a small steel nail sinks?",
      correctPool: [
        "The ship is shaped to push aside a weight of water equal to its own weight.",
        "The ship is mostly filled with air, making its average density lower than water.",
        "The ship displaces enough water to create an upward 'Buoyant Force'.",
      ],
      wrongPool: [
        "The ship has giant magnets that pull it toward the sky.",
        "Saltwater is like a solid floor for large objects.",
        "The ship is moving too fast to sink.",
        "The ship's paint makes it slippery so it can't go down.",
        "The ship has thousands of balloons hidden in the floor.",
        "The ocean is shallower where the ships are.",
        "Steel floats only if it is shaped like a bowl.",
        "A nail is heavier than a whole ship in physics.",
        "The captain uses the steering wheel to keep it up.",
      ],
      explanation:
        "Buoyancy depends on density and displacement. A ship is huge and full of air, so it weighs less than the total volume of water it displaces.",
      topic: "Buoyancy & Density",
      difficulty: "practical" as const,
    },
    {
      id: "phy12_practical",
      question:
        "If you are on a moving train and jump straight up into the air, where do you land?",
      correctPool: [
        "In the exact same spot you jumped from, because you are also moving with the train.",
        "On the same tile, because you kept your 'train speed' while in the air.",
        "In the same place, because Inertia keeps you moving forward with the floor.",
      ],
      wrongPool: [
        "At the very back of the train because the train moved under you.",
        "Outside the train through the roof.",
        "You hit the front wall of the train.",
        "You float in the air until the train stops.",
        "You land in the next car forward.",
        "You land on the ceiling.",
        "Gravity doesn't work on moving trains.",
        "You land slightly to the left due to the Earth's spin.",
        "You disappear and reappear at the station.",
      ],
      explanation:
        "Inertia! Because you were already moving at 60mph with the train, your body continues moving 60mph even while your feet are off the floor.",
      topic: "Inertia",
      difficulty: "practical" as const,
    },
    {
      id: "phy13_practical",
      question:
        "Why do bridges have 'combs' or gaps in the road that look like they don't fit perfectly?",
      correctPool: [
        "To give the bridge space to expand when it gets hot in the summer.",
        "To prevent the bridge from buckling or cracking as the metal grows in the heat.",
        "To allow for thermal expansion and contraction during different seasons.",
      ],
      wrongPool: [
        "To help the cars grip the road better.",
        "To let rain water fall into the river below.",
        "To make a funny noise when cars drive over them.",
        "Because the engineers ran out of concrete.",
        "To give the bridge a 'zipper' so it can be moved.",
        "To catch falling keys and coins.",
        "To prevent the bridge from being too heavy.",
        "To slow down speeding cars.",
        "To let the bridge breathe in more oxygen.",
      ],
      explanation:
        "Most materials expand when they get hot. Expansion joints (the gaps) allow the bridge to get longer in the summer without breaking itself.",
      topic: "Thermal Expansion",
      difficulty: "practical" as const,
    },
    {
      id: "phy14_practical",
      question:
        "If you shine a flashlight at a mirror, the light bounces back. What is this called?",
      correctPool: [
        "Reflection: The light waves hit a smooth surface and bounce off at the same angle.",
        "Specular Reflection: The mirror reflects the light instead of absorbing it.",
        "A 'Bounce' where the light hits a surface it cannot pass through.",
      ],
      wrongPool: [
        "Refraction: The mirror bends the light into a rainbow.",
        "Absorption: The mirror eats the light to stay shiny.",
        "Magnification: The mirror makes the light 10 times bigger.",
        "Shadowing: The mirror creates a dark spot.",
        "Transmission: The light goes through the mirror to the other side.",
        "Diffraction: The light breaks into tiny pieces.",
        "Convection: The mirror heats up the light.",
        "Inversion: The mirror turns the light into a shadow.",
        "Radiation: The mirror creates its own new light.",
      ],
      explanation:
        "Reflection occurs when waves (like light) encounter a surface that does not absorb the energy but instead sends it back.",
      topic: "Light & Waves",
      difficulty: "practical" as const,
    },
    {
      id: "phy15_practical",
      question:
        "Why is it easier to lift a heavy bucket of water while it is still underwater than once it is out of the water?",
      correctPool: [
        "The water pushes up on the bucket with a buoyant force.",
        "The weight of the water the bucket displaces helps lift it.",
        "The surrounding water is 'helping' you carry the load.",
      ],
      wrongPool: [
        "The bucket becomes made of wood while underwater.",
        "Gravity doesn't work under the surface of a lake.",
        "The water is trying to push the bucket to the moon.",
        "The air is much heavier than the water.",
        "Water makes your muscles 10 times stronger.",
        "The bucket is trying to hide from the sun.",
        "The fish are pushing the bucket up for you.",
        "Underwater, the bucket has no mass at all.",
        "The bucket is full of air while it is underwater.",
      ],
      explanation:
        "Archimedes' Principle! Any object in a fluid is pushed upward by a force equal to the weight of the fluid it displaces.",
      topic: "Buoyancy",
      difficulty: "practical" as const,
    },
    {
      id: "phy16_practical",
      question:
        "Why does a magnifying glass make a fire if you hold it in the sun?",
      correctPool: [
        "It 'Refracts' or bends the sunlight so it all meets at one tiny, hot point.",
        "It concentrates all the sun's energy from a large area into a single 'focus'.",
        "The curved lens gathers many light rays and focuses their heat together.",
      ],
      wrongPool: [
        "The glass is made of frozen fire.",
        "The glass is a magnet for heat.",
        "The lens creates new light that wasn't there before.",
        "The glass acts as a mirror that reflects the ground.",
        "The glass sucks the oxygen out of the air to make a flame.",
        "The lens makes the sun move closer to the Earth.",
        "The glass is actually a very small laser.",
        "It works by blocking the cold wind.",
        "The glass turns the light into a physical matchstick.",
      ],
      explanation:
        "A convex lens bends light rays toward a central point. By focusing a wide area of sunlight into a tiny dot, the temperature at that dot becomes high enough to burn.",
      topic: "Optics & Refraction",
      difficulty: "practical" as const,
    },
    {
      id: "phy17_practical",
      question:
        "If you are in a car and it crashes, why does the 'Airbag' save your life?",
      correctPool: [
        "It increases the 'Time' of the impact, which reduces the force on your body.",
        "It spreads the force of the crash over a larger area of your body.",
        "It acts as a soft cushion that slows your head down more gradually.",
      ],
      wrongPool: [
        "It turns the crash into a bounce.",
        "It makes the car stop before it hits anything.",
        "It absorbs all the gravity in the car.",
        "It fills the car with oxygen so you can breathe better.",
        "It makes you fall asleep so you don't feel the hit.",
        "It pushes the car backward away from the crash.",
        "It turns the metal of the car into soft foam.",
        "It deletes the energy of the crash from existence.",
        "It holds your head perfectly still so it never moves.",
      ],
      explanation:
        "Impulse = Force $\times$ Time. By increasing the time it takes for your head to stop, the airbag significantly lowers the force of the impact.",
      topic: "Force & Impulse",
      difficulty: "practical" as const,
    },
    {
      id: "phy18_practical",
      question:
        "What happens to a gas (like air) when you heat it up in a closed container?",
      correctPool: [
        "The molecules move faster and hit the walls harder, increasing the pressure.",
        "The pressure inside the container goes up because the air wants to expand.",
        "The energy you added makes the gas 'push' harder against the lid.",
      ],
      wrongPool: [
        "The gas turns into a solid metal.",
        "The gas disappears and creates a vacuum.",
        "The gas gets heavier and sinks to the bottom.",
        "The gas turns into a liquid immediately.",
        "The air molecules stop moving to save energy.",
        "The container gets smaller to keep the air warm.",
        "The gas changes its color to bright red.",
        "The pressure goes down because the air is tired.",
        "The air turns into pure electricity.",
      ],
      explanation:
        "Temperature is a measure of molecular speed. Hotter molecules move faster and collide more violently with the container, increasing pressure.",
      topic: "Gas Laws",
      difficulty: "practical" as const,
    },
    {
      id: "phy19_practical",
      question:
        "Why can you see your breath on a cold winter day?",
      correctPool: [
        "The warm water vapor in your breath cools down and turns into tiny liquid droplets.",
        "The gas from your lungs 'Condenses' into a mist when it hits the cold air.",
        "Your breath turns from an invisible gas into a visible 'cloud' of tiny water bits.",
      ],
      wrongPool: [
        "Your breath is freezing into solid ice cubes in the air.",
        "The cold air is made of white smoke.",
        "You are breathing out actual clouds from the sky.",
        "The cold air makes your lungs turn white.",
        "Your breath is reacting with the oxygen to make fire.",
        "The white mist is actually nitrogen gas.",
        "The sun is reflecting off the cold air.",
        "Your breath is more 'solid' than the winter air.",
        "The cold air is sucking the color out of your body.",
      ],
      explanation:
        "This is Condensation. Warm, moist air from your lungs can't stay as a gas when it hits cold air, so it turns into a tiny liquid mist.",
      topic: "Phase Changes",
      difficulty: "practical" as const,
    },
    {
      id: "phy20_practical",
      question:
        "If you swing a bucket of water over your head in a fast circle, why doesn't the water fall out?",
      correctPool: [
        "The water's inertia wants to keep it moving in a straight line, pushing it into the bottom of the bucket.",
        "The circular motion creates a 'Centripetal' effect that keeps the water pressed against the container.",
        "The speed of the swing is fast enough that the water is 'pushed' outward more than gravity pulls it down.",
      ],
      wrongPool: [
        "The water becomes sticky when it moves in a circle.",
        "Gravity stops working when things go upside down fast.",
        "The bucket has a lid that you just didn't see.",
        "The air pressure holds the water in like a plug.",
        "The water is frozen for a split second.",
        "Centrifugal force is a physical shield that blocks gravity.",
        "The bucket is a giant magnet for water.",
        "Moving in a circle makes the water weigh nothing.",
        "The bucket creates its own gravity inside.",
      ],
      explanation:
        "Inertia! The water 'wants' to fly off in a straight line. Since the bucket is in the way, the water is constantly being pressed against the bottom of the bucket as it turns.",
      topic: "Circular Motion",
      difficulty: "practical" as const,
    },
    // Add more practical questions below...
  ],

  "Automotive Trivia": [
    {
      id: "at1_practical",
      question:
        "A car engine is often called an 'Internal Combustion Engine.' In simple terms, how does it create the power to move the wheels?",
      correctPool: [
        "It uses small, controlled explosions of fuel and air to push pistons down.",
        "It traps exploding gas in a cylinder to force a metal rod to move.",
        "It converts the heat energy from burning gasoline into mechanical movement.",
      ],
      wrongPool: [
        "It uses the wind from the radiator to spin the tires.",
        "It burns fuel to create steam that turns a water wheel.",
        "It uses magnets to pull the car forward toward the horizon.",
        "It works like a giant rubber band that you wind up with a key.",
        "The fuel is used as a lubricant to slide the car down the road.",
        "It creates a vacuum in front of the car that sucks it forward.",
        "The battery handles 100% of the movement while the engine just makes noise.",
        "It uses the weight of the passengers to squeeze the tires.",
        "It turns the gasoline into electricity immediately to power a fan.",
      ],
      explanation:
        "Inside the engine, a mix of air and fuel is ignited by a spark. The resulting explosion creates pressure that pushes a piston, which eventually turns the wheels.",
      topic: "Engine Basics",
      difficulty: "practical" as const,
    },
    {
      id: "at2_practical",
      question:
        "What is the main purpose of 'Engine Oil' in a vehicle?",
      correctPool: [
        "To lubricate moving metal parts so they don't grind together and melt.",
        "To reduce friction and carry heat away from the inside of the engine.",
        "To create a slippery layer between fast-moving components to prevent wear.",
      ],
      wrongPool: [
        "To act as the primary fuel that the engine burns to move.",
        "To keep the tires soft so they don't pop on the highway.",
        "To clean the windshield from the inside of the car.",
        "To provide a liquid for the air conditioner to use for cooling.",
        "To make the exhaust smell like flowers.",
        "To fill the gaps in the gas tank so it doesn't leak.",
        "To help the brakes slide more easily against the wheels.",
        "To provide weight to the front of the car so it doesn't fly away.",
        "To turn the headlights on through a chemical reaction.",
      ],
      explanation:
        "Engines are made of metal rubbing against metal at high speeds. Without oil, the friction would create so much heat that the engine would weld itself shut (seize).",
      topic: "Maintenance",
      difficulty: "practical" as const,
    },
    {
      id: "at3_practical",
      question:
        "If your car has a 'Flat Battery,' why can you often start it by connecting it to another car's battery with jumper cables?",
      correctPool: [
        "You are 'borrowing' the electrical pressure (voltage) from the healthy battery to turn your starter motor.",
        "The working car provides the initial spark needed to get your engine's cycle started.",
        "It creates a temporary bridge that lets electricity flow into your car's electrical system.",
      ],
      wrongPool: [
        "The cables pull gasoline from the other car into your engine.",
        "The other car's engine 'scares' your engine into working.",
        "You are transferring the 'spirit' of the working car into the broken one.",
        "The red and black colors of the wires heat up the engine block.",
        "It reloads the music in your radio so the car feels ready to drive.",
        "The cables act as a tow rope that pulls the electricity forward.",
        "It drains the bad air out of your battery so new air can fit.",
        "The electricity turns the dead battery into a magnet.",
        "It only works if both cars are the exact same color.",
      ],
      explanation:
        "A battery's main job is to provide the massive surge of electricity needed to spin the 'Starter Motor.' Jumper cables let you use a different battery to perform that task.",
      topic: "Electrical Systems",
      difficulty: "practical" as const,
    },
    {
      id: "at4_practical",
      question:
        "Why do cars have a 'Radiator' filled with liquid (coolant)?",
      correctPool: [
        "To move heat away from the engine and release it into the air.",
        "To keep the engine at a safe temperature so it doesn't overheat and break.",
        "To circulate liquid through the engine block to soak up excess thermal energy.",
      ],
      wrongPool: [
        "To provide drinking water for the passengers in an emergency.",
        "To wash the road as you drive so the tires stay clean.",
        "To spray the engine with cold water whenever it sees a fire.",
        "To make the car heavier so it handles better in the wind.",
        "To boil the gasoline before it goes into the engine.",
        "To act as a storage tank for extra wind.",
        "To provide the liquid that makes the 'new car smell'.",
        "To keep the battery from getting too dry.",
        "To turn the steam from the exhaust back into gold.",
      ],
      explanation:
        "Burning fuel creates immense heat. The radiator acts like a heat exchanger, taking hot liquid from the engine and cooling it down with outside air.",
      topic: "Cooling Systems",
      difficulty: "practical" as const,
    },
    {
      id: "at5_practical",
      question: "What is the job of the 'Alternator' in a car?",
      correctPool: [
        "It uses the engine's movement to generate electricity and recharge the battery while you drive.",
        "It acts like a small generator that powers the lights and radio once the engine is running.",
        "It converts mechanical energy into electrical energy to keep the system powered.",
      ],
      wrongPool: [
        "It alternates between using gas and using water.",
        "It changes the color of the car based on how fast you go.",
        "It switches the driver's seat from left to right.",
        "It is a backup engine in case the main one stops working.",
        "It decides which direction the tires should spin.",
        "It turns the radio volume up when you go faster.",
        "It filters the air so the driver can breathe better.",
        "It is the part that makes the turn signals blink.",
        "It stores the extra gasoline that doesn't fit in the tank.",
      ],
      explanation:
        "The battery starts the car, but the Alternator keeps it running. It recharges the battery so it doesn't go dead while you are using the lights or AC.",
      topic: "Electrical Systems",
      difficulty: "practical" as const,
    },
    {
      id: "at6_practical",
      question:
        "Most modern cars use 'Disc Brakes.' How do they physically stop the car?",
      correctPool: [
        "They squeeze a metal disc (rotor) with friction pads, like a hand squeezing a spinning plate.",
        "They use hydraulic pressure to press pads against a spinning wheel part to create friction.",
        "They turn the movement of the wheel into heat energy by rubbing two surfaces together.",
      ],
      wrongPool: [
        "They drop a heavy anchor into the pavement.",
        "They stick a metal rod into the spokes of the wheel.",
        "They blow air in the opposite direction to push the car back.",
        "They use a giant magnet to pull the car toward the ground.",
        "They turn off the engine and wait for the car to get tired.",
        "They fill the tires with lead to make them too heavy to spin.",
        "They spray glue on the tires to make them stick to the road.",
        "They use a parachute that pops out of the trunk.",
        "They flip the transmission into 'Reverse' instantly.",
      ],
      explanation:
        "Braking is all about friction. When you step on the pedal, pads squeeze a spinning disc. This friction slows the disc down and converts the movement into heat.",
      topic: "Braking Systems",
      difficulty: "practical" as const,
    },
    {
      id: "at7_practical",
      question:
        "What does the 'Transmission' (or Gearbox) do for a car?",
      correctPool: [
        "It acts like the gears on a bike, helping the engine stay at a comfortable speed while the car goes fast or slow.",
        "It adjusts how much power or speed is sent to the wheels based on how hard the engine is working.",
        "It allows the car to go fast on the highway without the engine spinning out of control.",
      ],
      wrongPool: [
        "It transmits radio signals to other cars nearby.",
        "It is the part that stores the spare tire.",
        "It moves the gasoline from the back of the car to the front.",
        "It tells the driver when it is time to change the oil.",
        "It turns the steering wheel into a gas pedal.",
        "It filters the exhaust so it doesn't look black.",
        "It is a computer that plays movies for the kids in the back.",
        "It makes the car float over bumps in the road.",
        "It is the tank that holds the wiper fluid.",
      ],
      explanation:
        "Engines have a 'sweet spot' where they work best. The transmission uses different gear sizes to make sure the wheels turn at the right speed for the engine's power.",
      topic: "Drivetrain",
      difficulty: "practical" as const,
    },
    {
      id: "at8_practical",
      question:
        "Why is it dangerous to drive with 'Bald Tires' (tires with no tread)?",
      correctPool: [
        "They cannot channel water away, which makes the car slide on wet roads (hydroplaning).",
        "The lack of grooves means the tire has less 'grip' to help you stop or turn quickly.",
        "They are much more likely to pop because the rubber has become very thin.",
      ],
      wrongPool: [
        "The car will look embarrassing to other drivers.",
        "Bald tires make the radio stop working.",
        "Smooth tires make the car go too fast for the engine to handle.",
        "The wind will blow the car off the road because the tires are too light.",
        "The car will start to sink into the asphalt.",
        "Bald tires cause the gasoline to evaporate faster.",
        "The steering wheel will spin in circles by itself.",
        "The car will only be able to drive in reverse.",
        "The tires will start to grow hair to try and fix themselves.",
      ],
      explanation:
        "Tread grooves are like rain gutters. They push water out of the way so the rubber can actually touch the road. Without them, you slide on top of the water.",
      topic: "Tires & Safety",
      difficulty: "practical" as const,
    },
    {
      id: "at9_practical",
      question:
        "What is the purpose of the 'Suspension' (springs and shocks) in a car?",
      correctPool: [
        "To absorb bumps in the road so the car stays level and the tires stay in contact with the ground.",
        "To keep the passengers comfortable by 'soaking up' the energy from potholes.",
        "To prevent the car's frame from bouncing uncontrollably after a bump.",
      ],
      wrongPool: [
        "To hold the car up so it doesn't touch the ground at all.",
        "To make the car bounce like a trampoline for fun.",
        "To provide a place for the engine to sit.",
        "To keep the doors from falling off during a turn.",
        "To spray oil on the road to make it smoother.",
        "To help the car jump over small obstacles.",
        "To connect the radio to the antenna.",
        "To store extra air for the tires.",
        "To make the car turn into a boat in deep water.",
      ],
      explanation:
        "Suspension isn't just for comfort; it's for safety. It ensures that your tires stay pressed against the road, even when the ground is uneven.",
      topic: "Chassis & Handling",
      difficulty: "practical" as const,
    },
    {
      id: "at10_practical",
      question:
        "What does the 'Catalytic Converter' do in the exhaust system?",
      correctPool: [
        "It uses a chemical reaction to turn harmful engine gases into less dangerous ones.",
        "It acts as a filter that cleans the 'smoke' before it leaves the tailpipe.",
        "It reduces the pollution coming out of the car by breaking down toxic chemicals.",
      ],
      wrongPool: [
        "It converts the car into a faster version of itself.",
        "It turns the exhaust noise into beautiful music.",
        "It captures the heat and turns it into extra gasoline.",
        "It is a secondary engine that works on gravity.",
        "It changes the color of the smoke to match the car's paint.",
        "It stores the carbon dioxide to use for the air conditioner.",
        "It makes the car smell like a new laptop.",
        "It prevents the tailpipe from getting too long.",
        "It turns the heat from the engine into electricity for the lights.",
      ],
      explanation:
        "The 'Cat' contains precious metals that react with engine exhaust to turn Carbon Monoxide and other toxins into harmless water vapor and Nitrogen.",
      topic: "Exhaust & Emissions",
      difficulty: "practical" as const,
    },
    {
      id: "at11_practical",
      question:
        "If you see 'Smoke' coming from your brakes after a long drive down a mountain, what is likely happening?",
      correctPool: [
        "The brakes are 'fading' because they have become too hot from constant rubbing.",
        "The friction pads have reached a temperature where the chemicals inside are starting to burn.",
        "The kinetic energy of the car has been turned into more heat than the brakes can handle.",
      ],
      wrongPool: [
        "The car is trying to signal for help.",
        "The mountain air is reacting with the tires to make steam.",
        "The brakes are trying to cook a meal for the driver.",
        "The brake fluid has turned into gasoline.",
        "The wheels are spinning so fast they are melting the road.",
        "The car is entering 'Turbo' mode automatically.",
        "The smoke is just dust from the mountain rocks.",
        "The brake pedal is too heavy for the car.",
        "The car is using smoke to hide from other drivers.",
      ],
      explanation:
        "Brakes stop a car by turning movement into heat. On a long mountain descent, the heat builds up faster than it can escape, leading to 'Brake Fade' and smoke.",
      topic: "Braking Systems",
      difficulty: "practical" as const,
    },
    {
      id: "at12_practical",
      question:
        "Why should you check your 'Tire Pressure' regularly?",
      correctPool: [
        "Under-inflated tires make the engine work harder and waste more gasoline.",
        "The wrong pressure can cause the tires to wear out unevenly and pop sooner.",
        "Proper pressure ensures the tire has the best 'footprint' on the road for safety.",
      ],
      wrongPool: [
        "So the tires don't get lonely and deflate on purpose.",
        "Because the air inside the tire gets old and needs to be refreshed.",
        "To make sure the tires stay the same color as the rims.",
        "To prevent the car from floating away in high winds.",
        "To make the radio sound clearer.",
        "Because air is the main fuel for the headlights.",
        "To keep the spare tire from getting jealous.",
        "To prevent the steering wheel from getting too hot.",
        "Because the car will grow taller if you add more air.",
      ],
      explanation:
        "Tire pressure affects everything: fuel economy, safety, and how long the tires last. Changes in outdoor temperature can also change your tire pressure.",
      topic: "Maintenance",
      difficulty: "practical" as const,
    },
    {
      id: "at13_practical",
      question:
        "What is the purpose of the 'Air Filter' in a car engine?",
      correctPool: [
        "To stop dirt and sand from getting inside the engine and scratching the metal parts.",
        "To make sure only clean oxygen enters the cylinders for the fire to burn.",
        "To act as a shield that keeps bugs and debris out of the sensitive intake system.",
      ],
      wrongPool: [
        "To provide a place for the cabin air to stay.",
        "To make the engine sound like a vacuum cleaner.",
        "To trap the gasoline so it doesn't leak out of the front.",
        "To turn the wind into extra horsepower.",
        "To keep the engine's 'breath' smelling fresh.",
        "To filter the music coming through the speakers.",
        "To cool down the battery with fresh air.",
        "To prevent the driver from breathing engine fumes.",
        "To act as a cushion in case of a crash.",
      ],
      explanation:
        "An engine 'breathes' a huge amount of air. If dirt gets in, it acts like sandpaper, quickly destroying the pistons and cylinders.",
      topic: "Engine Basics",
      difficulty: "practical" as const,
    },
    {
      id: "at14_practical",
      question:
        "What does 'ABS' (Anti-lock Braking System) do during an emergency stop?",
      correctPool: [
        "It pulses the brakes on and off very fast to keep the wheels from sliding (skidding).",
        "It allows the driver to keep steering the car even while braking as hard as possible.",
        "It prevents the tires from 'locking up' and losing their grip on the road.",
      ],
      wrongPool: [
        "It makes the car stop instantly like it hit a wall.",
        "It activates a secondary engine to pull the car backward.",
        "It screams a loud warning to the other drivers.",
        "It fills the tires with glue to help them stick.",
        "It turns off the engine to save gasoline during the stop.",
        "It makes the car jump over the obstacle.",
        "It inflates the seatbelts to protect the passengers.",
        "It automatically calls 911 before you even hit anything.",
        "It reverses the direction of the headlights.",
      ],
      explanation:
        "If your wheels stop spinning (lock up), you can't steer. ABS pumps the brakes hundreds of times per second so you can stop quickly *and* steer around trouble.",
      topic: "Safety Systems",
      difficulty: "practical" as const,
    },
    {
      id: "at15_practical",
      question:
        "Why does a car need a 'Differential' (the gears between the wheels)?",
      correctPool: [
        "To allow the outside wheel to spin faster than the inside wheel when taking a turn.",
        "Because when you turn a corner, the wheels have to travel different distances.",
        "To prevent the tires from skipping and dragging on the pavement during a turn.",
      ],
      wrongPool: [
        "To make the car look different from other cars.",
        "To calculate the difference between the gas and the brake.",
        "To tell the difference between daytime and nighttime.",
        "To store the extra power for the air conditioner.",
        "To turn the car into a 4-wheel drive at the push of a button.",
        "To help the car drive over sand and water.",
        "To change the radio station automatically.",
        "To keep the engine from getting too loud.",
        "To make the car more 'difficult' for thieves to steal.",
      ],
      explanation:
        "When you turn, the wheel on the outside of the curve has to travel a longer path than the one on the inside. The differential allows them to spin at different speeds.",
      topic: "Drivetrain",
      difficulty: "practical" as const,
    },
    {
      id: "at16_practical",
      question:
        "In a car with an 'Automatic Transmission,' what does the 'Park' setting actually do?",
      correctPool: [
        "It slides a metal pin (parking pawl) into a gear to physically lock the transmission from turning.",
        "It acts as a mechanical lock that keeps the wheels from rolling forward or backward.",
        "It prevents the output shaft of the gearbox from moving at all.",
      ],
      wrongPool: [
        "It turns off the car's gravity so it stays in one spot.",
        "It tells the car that it is time to go to sleep.",
        "It turns on all the brakes with 100% power.",
        "It drops a small brick under the tire automatically.",
        "It disconnects the tires from the car.",
        "It makes the car invisible to traffic police.",
        "It empties the gas tank into a safety box.",
        "It pulls the steering wheel into the dashboard.",
        "It only works if the car is in a parking lot.",
      ],
      explanation:
        "Setting a car to 'P' engages a 'Parking Pawl.' It's a tiny metal arm that locks the gears. (This is why you should also use the handbrake on hills!)",
      topic: "Drivetrain",
      difficulty: "practical" as const,
    },
    {
      id: "at17_practical",
      question: "What is the job of the 'Spark Plug'?",
      correctPool: [
        "To provide the tiny bolt of lightning that sets the fuel-air mixture on fire.",
        "To start the 'combustion' process inside the engine cylinder.",
        "To act as the matchstick that lights the engine's internal explosions.",
      ],
      wrongPool: [
        "To provide light for the engine so it can see what it's doing.",
        "To plug the holes in the gas tank.",
        "To give the driver a small 'spark' of energy to stay awake.",
        "To connect the car to the internet.",
        "To clean the electricity before it gets to the battery.",
        "To keep the engine from making too much noise.",
        "To store the static electricity from the seats.",
        "To turn the air into gasoline.",
        "To provide a place for the car keys to stay.",
      ],
      explanation:
        "Without a spark, the fuel won't burn. The spark plug takes high-voltage electricity and creates a spark at exactly the right millisecond.",
      topic: "Engine Basics",
      difficulty: "practical" as const,
    },
    {
      id: "at18_practical",
      question: "Why do cars have a 'Muffler' (or Silencer)?",
      correctPool: [
        "To bounce the sound of the engine's explosions around until they cancel each other out.",
        "To reduce the noise coming from the exhaust pipe so the car isn't too loud.",
        "To use acoustic chambers to quiet the 'booms' created by the engine.",
      ],
      wrongPool: [
        "To keep the engine warm like a scarf.",
        "To trap the smoke so it never leaves the car.",
        "To make the car sound like a race car even if it's slow.",
        "To filter the bugs out of the exhaust.",
        "To provide a place for the tailpipe to grow.",
        "To turn the engine noise into a radio signal.",
        "To keep the gasoline from getting too loud.",
        "To make the car more 'muffled' so it can hide in the dark.",
        "To prevent the car from talking to other cars.",
      ],
      explanation:
        "An engine is basically a series of explosions. A muffler uses clever 'sound engineering' to direct those sound waves so they soften before leaving the car.",
      topic: "Exhaust Systems",
      difficulty: "practical" as const,
    },
    {
      id: "at19_practical",
      question:
        "What does a 'Turbocharger' actually do to make an engine more powerful?",
      correctPool: [
        "It uses exhaust wind to blow more air into the engine, allowing it to burn more fuel.",
        "It 'recycles' the energy from the exhaust to squeeze extra air into the cylinders.",
        "It acts like a high-powered fan that forces the engine to 'breathe' more than usual.",
      ],
      wrongPool: [
        "It gives the driver a shot of caffeine through the steering wheel.",
        "It turns the gasoline into a liquid that is 10 times stronger.",
        "It makes the car's clock run faster so you arrive sooner.",
        "It uses a rocket on the back of the car for extra speed.",
        "It changes the car's color to bright red.",
        "It makes the tires spin at 1,000 miles per hour.",
        "It removes the weight of the car using magnets.",
        "It makes the engine sound like a spaceship.",
        "It only works if you yell 'Turbo!' out the window.",
      ],
      explanation:
        "More air + More fuel = More power. A Turbo uses 'wasted' exhaust gas to spin a fan that crams extra air into the engine.",
      topic: "Engine Performance",
      difficulty: "practical" as const,
    },
    {
      id: "at20_practical",
      question: "What is the purpose of 'Fuel Injectors'?",
      correctPool: [
        "To spray a fine mist of gasoline into the engine at the perfect time.",
        "To replace the old 'carburetor' by digitally controlling how much gas the engine gets.",
        "To 'atomize' the fuel so it burns as efficiently as possible.",
      ],
      wrongPool: [
        "To give the car an 'injection' of medicine when it's sick.",
        "To spray the road with gas to keep other cars away.",
        "To fill the gas tank from the inside.",
        "To turn the gasoline into a solid block of ice.",
        "To spray the driver with water if they fall asleep.",
        "To inject the music into the engine for better rhythm.",
        "To store the extra fuel in the tires.",
        "To turn the air into gasoline using a magic filter.",
        "To make the exhaust look like a rainbow.",
      ],
      explanation:
        "Injectors act like sophisticated spray bottles. They ensure the engine gets exactly the right amount of fuel in a mist that is easy to ignite.",
      topic: "Fuel Systems",
      difficulty: "practical" as const,
    },
    // Add more practical questions below...
  ],
  "Computer Programming": [
    {
      id: "cp1_practical",
      question:
        "You're asked to design a program to convert Centigrade to Fahrenheit before writing any actual code. What should you create first to plan out the logic?",
      correctPool: [
        "An algorithm, pseudocode, or flowchart outlining the steps.",
        "A step-by-step plan such as an algorithm or flowchart, before writing any C code.",
      ],
      wrongPool: [
        "The final compiled executable file.",
        "A user manual for the finished program.",
        "The list of syntax errors from the compiler.",
        "A finished GUI design.",
        "The program's version control history.",
      ],
      explanation:
        "Before coding, the solution is designed using an algorithm, flowchart, or pseudocode to plan the logic clearly.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp2_practical",
      question:
        "While tracing through a flowchart, you reach a diamond shape with two paths leaving it. What does this diamond represent?",
      correctPool: [
        "A decision point where the flow branches based on a condition.",
        "A yes/no or true/false decision in the program logic.",
      ],
      wrongPool: [
        "The starting point of the program.",
        "A step that only performs calculations.",
        "A step that inputs data from the keyboard.",
        "The end of the program.",
        "A subroutine call.",
      ],
      explanation: "The diamond symbol in a flowchart always represents a decision point.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp3_practical",
      question:
        "You need to explain your program's logic to a non-programmer teammate without showing actual code syntax. Which tool is most appropriate?",
      correctPool: [
        "Pseudocode, since it uses structured, natural-language-like steps.",
        "A flowchart or pseudocode, since both avoid real programming syntax.",
      ],
      wrongPool: [
        "The compiled machine code.",
        "The raw C source file.",
        "A debugger's memory dump.",
        "The linker's object file.",
      ],
      explanation: "Pseudocode and flowcharts describe logic in a language-independent, easy-to-read way.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp4_practical",
      question:
        "After building and testing a solution, you find it does not solve the original problem. According to the problem-solving steps, what should you do next?",
      correctPool: [
        "Go back to generating possible solutions and try again.",
        "Return to the 'generate possible solutions' step and repeat the process.",
      ],
      wrongPool: [
        "Immediately give up on the problem.",
        "Ship the program anyway without changes.",
        "Delete the original problem statement.",
        "Skip straight to documentation.",
      ],
      explanation:
        "If evaluating the result shows the solution doesn't solve the problem, the process restarts at generating solutions.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp5_practical",
      question:
        "Your algorithm never produces a result and keeps running forever. Which property of a valid algorithm is being violated?",
      correctPool: [
        "Finiteness — an algorithm must terminate after a finite number of steps.",
        "It violates finiteness, since a proper algorithm must eventually stop.",
      ],
      wrongPool: [
        "Input, since it needs more input values.",
        "Output, since it needs to print more.",
        "Effectiveness, since instructions are too simple.",
        "Definiteness, since the steps are too clear.",
      ],
      explanation: "Finiteness requires an algorithm to terminate after a finite number of steps.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp6_practical",
      question:
        "You're drawing a flowchart and need to show that user input is being read from the keyboard. Which symbol should you use?",
      correctPool: [
        "The parallelogram (input/output) symbol.",
        "A parallelogram, since it represents input or output operations.",
      ],
      wrongPool: ["A rectangle.", "An oval.", "A diamond.", "A circle (connector)."],
      explanation: "The parallelogram symbol is used for input and output operations in a flowchart.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp7_practical",
      question:
        "A classmate's algorithm to check if a number is even or odd never explains how to decide; it just says 'do the even/odd thing.' What property is missing?",
      correctPool: [
        "Definiteness — each step must be unambiguous and clearly defined.",
        "It lacks definiteness, since the step isn't precisely defined.",
      ],
      wrongPool: [
        "Finiteness, since it never explains what to output.",
        "Input, because no numbers are used.",
        "It is only missing an ending symbol.",
      ],
      explanation: "Definiteness requires each algorithm step to be unambiguous and clearly performable.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp8_practical",
      question:
        "You want to convert your finished algorithm into a form a computer can actually execute. What is this translated, directly executable form called?",
      correctPool: [
        "Machine language, or 'the coded program'.",
        "The program is translated into machine language that the computer executes.",
      ],
      wrongPool: [
        "A flowchart.",
        "Pseudocode.",
        "An English paragraph.",
        "A user requirements document.",
      ],
      explanation: "The specification is translated into machine language, the coded program the computer executes.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp9_practical",
      question:
        "During software development, right after 'Program Coding', you run the program and check for errors. What stage is this?",
      correctPool: ["Compilation & Execution.", "The Compilation and Execution stage."],
      wrongPool: [
        "Problem Analysis.",
        "Design (Algorithm/Flowchart).",
        "Documentation.",
        "Requirement gathering.",
      ],
      explanation:
        "The process flows: Problem Analysis, Design, Program Coding, Compilation & Execution, Debugging & Testing, Documentation.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp10_practical",
      question:
        "Two programmers solve the same problem using different numbers of steps and different amounts of time. What does this demonstrate about algorithms?",
      correctPool: [
        "Multiple valid algorithms can exist for the same problem, varying in steps and efficiency.",
        "Several different algorithms can solve the same problem with differing efficiency.",
      ],
      wrongPool: [
        "Only one algorithm can ever exist for a problem.",
        "Algorithms must always use the same number of steps.",
        "One of them necessarily made a logic error.",
        "Algorithms can't vary by time taken.",
      ],
      explanation: "Different algorithms can solve the same problem, varying in the steps, time, and effort required.",
      topic: "Problem Solving & Algorithms",
      difficulty: "practical" as const,
    },
    {
      id: "cp11_practical",
      question:
        "You declare `int a, b, c;` then try to store the value 5000000 into `c` on a typical 2-byte int compiler. What is likely to happen?",
      correctPool: [
        "The value overflows the int's range and produces an incorrect/unexpected result.",
        "It overflows since 5000000 exceeds a typical int's storage capacity.",
      ],
      wrongPool: [
        "It works perfectly with no issues.",
        "The compiler automatically converts c to a double.",
        "It gets stored as a string instead.",
        "C rejects the assignment at runtime with a dialog box.",
      ],
      explanation: "A value exceeding an int's range overflows and produces an incorrect result.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp12_practical",
      question:
        "You want a variable that can only ever hold a single character like 'A' or '7'. Which data type keyword should you declare it with?",
      correctPool: ["char", "The char data type."],
      wrongPool: ["int", "float", "void", "double"],
      explanation: "char is the data type used to store a single character.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp13_practical",
      question: "A teammate names a variable `2total` and the compiler rejects it. Why is this identifier invalid?",
      correctPool: [
        "Identifiers must start with a letter, not a digit.",
        "The first character of an identifier cannot be a number.",
      ],
      wrongPool: [
        "Identifiers can't contain the word 'total'.",
        "Identifiers must be all uppercase.",
        "Identifiers can't be longer than 5 characters.",
        "Identifiers can't contain vowels.",
      ],
      explanation: "C identifiers must begin with a letter (or underscore), never a digit.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp14_practical",
      question:
        "You need a function whose header file provides console-specific functions like getch(). Which header should you include?",
      correctPool: ["conio.h", "The conio.h header file."],
      wrongPool: ["stdio.h", "math.h", "string.h", "time.h"],
      explanation: "getch() is defined in the conio.h console I/O header.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp15_practical",
      question:
        "You want to give an existing data type an easier-to-read alternate name in your code. Which C feature lets you do this?",
      correctPool: [
        "The typedef statement.",
        "typedef, which defines a new name for an existing data type.",
      ],
      wrongPool: ["The #include directive.", "The struct keyword.", "A comment.", "The sizeof operator."],
      explanation: "typedef creates a new identifier that represents an existing data type.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp16_practical",
      question:
        "While reading requirements you see the constant `36.0` flagged as an invalid decimal integer constant. Why is that?",
      correctPool: [
        "It contains a decimal point, which integer constants can't have.",
        "Decimal integer constants can't include a period.",
      ],
      wrongPool: [
        "It's too large a number.",
        "It starts with the wrong digit.",
        "It contains a letter.",
        "Integer constants can't start with 3.",
      ],
      explanation: "A decimal point makes 36.0 a floating-point constant, not a valid integer constant.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp17_practical",
      question:
        "Your documentation section at the top of a C file explains the program's purpose and author. How does the compiler treat this section?",
      correctPool: [
        "It ignores the documentation section entirely, since it's enclosed in comments.",
        "The compiler skips it because comment lines are ignored.",
      ],
      wrongPool: [
        "It executes the documentation as the first instructions.",
        "It converts it into a variable declaration.",
        "It causes a compile error.",
        "It becomes part of the printed output.",
      ],
      explanation: "Statements in the documentation section are enclosed in comments and ignored by the compiler.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp18_practical",
      question:
        "You need to store a value with 14 digits of decimal precision, more than float provides. Which primary data type should you use?",
      correctPool: ["double", "The double data type, for extra precision."],
      wrongPool: ["char", "int", "void", "short"],
      explanation: "double provides about 14 digits of precision, more than the 6 digits float offers.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp19_practical",
      question: "In `struct st1 { int a; float b; char c; };`, what category does struct itself belong to?",
      correctPool: ["A derived data type.", "struct is one of C's derived data types."],
      wrongPool: [
        "A primary data type.",
        "A keyword-only construct with no type.",
        "A user-defined function.",
        "A preprocessor directive.",
      ],
      explanation: "Structures, unions, and enumerations are derived data types in C.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp20_practical",
      question: "You write `void main()` as your program's entry function. What does the void keyword communicate here?",
      correctPool: [
        "That main() does not return any value.",
        "It specifies main() returns no value to the calling process.",
      ],
      wrongPool: [
        "That main() takes no parameters.",
        "That the program will crash.",
        "That main() is optional.",
        "That the function is private.",
      ],
      explanation: "void as a return type means the function doesn't return a value.",
      topic: "C Fundamentals",
      difficulty: "practical" as const,
    },
    {
      id: "cp21_practical",
      question: "You want to print a variable's floating-point value on the screen. Which printf() conversion specifier fits?",
      correctPool: ["%f", "The %f conversion specifier."],
      wrongPool: ["%d", "%c", "%s", "%p"],
      explanation: "%f is used to display a floating-point value.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp22_practical",
      question:
        "Your scanf() call isn't receiving the number the user types correctly. What should you check first about your format string?",
      correctPool: [
        "That the conversion specifier matches the variable's data type (e.g. %d for int).",
        "Whether the format specifier used matches the data type being read.",
      ],
      wrongPool: [
        "Whether the monitor is turned on.",
        "Whether the program has a title.",
        "Whether printf() was called an even number of times.",
        "Whether the file was saved with a .txt extension.",
      ],
      explanation: "scanf()'s format specifier must match the type of the variable being read into.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp23_practical",
      question:
        "You call `scanf(\"%d\", num);` (forgetting the & sign) and the program crashes. What is the most likely cause?",
      correctPool: [
        "scanf() needs a pointer (&num); omitting & means it's not writing to the variable's actual memory address.",
        "Forgetting the & means scanf() isn't given a valid address to store the input.",
      ],
      wrongPool: [
        "scanf() only works with strings.",
        "The variable name is misspelled.",
        "printf() must be called first.",
        "%d only works with float variables.",
      ],
      explanation: "scanf() requires a pointer argument; without &, it lacks a valid memory address to write to.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp24_practical",
      question:
        "You want to display an integer, a float, and a string all using ONE printf() call. Is this possible in C?",
      correctPool: [
        "Yes, by including multiple conversion specifiers in one format string with matching arguments.",
        "Yes, a single printf() can take several format specifiers and arguments together.",
      ],
      wrongPool: [
        "No, each printf() can only output one data type.",
        "No, you always need three separate printf() statements.",
        "Yes, but only for two data types at once.",
        "No, C doesn't support mixed-type output.",
      ],
      explanation: "printf() accepts multiple format specifiers and arguments in a single call.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp25_practical",
      question: "You use getch() after your output statements. What is the practical effect of this call for the user?",
      correctPool: [
        "It pauses the screen, waiting for the user to press any key before continuing.",
        "It blocks execution until any key is pressed, keeping the output visible.",
      ],
      wrongPool: [
        "It clears the screen immediately.",
        "It restarts the program.",
        "It prints a character to the file.",
        "It closes the program instantly.",
      ],
      explanation: "getch() waits for a single keypress, which is often used to pause the screen before it closes.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp26_practical",
      question:
        "You need to read a value that could be entered in decimal, octal, or hexadecimal form in scanf(). Which conversion character handles all three?",
      correctPool: ["i", "The %i conversion character interprets decimal, octal, or hexadecimal integers."],
      wrongPool: ["d", "c", "s", "u"],
      explanation: "The %i specifier reads a data item as a decimal, octal, or hexadecimal integer.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp27_practical",
      question:
        "You're deciding between printf() and putchar() to output a single character efficiently without any formatting overhead. Which is the unformatted choice?",
      correctPool: [
        "putchar(), since it outputs a character as-is with no format specifier.",
        "putchar() is the unformatted function suited for this.",
      ],
      wrongPool: [
        "printf(), since it is unformatted.",
        "scanf(), since it handles output too.",
        "fclose(), since it releases resources.",
      ],
      explanation: "putchar() outputs a single character directly, without needing a format specifier.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp28_practical",
      question: "A printf() call uses the specifier %u. What kind of data item is expected?",
      correctPool: ["An unsigned decimal integer.", "%u expects an unsigned decimal integer value."],
      wrongPool: [
        "A signed floating-point number.",
        "A single character.",
        "A hexadecimal string.",
        "A pointer address only.",
      ],
      explanation: "%u displays a data item as an unsigned decimal integer.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp29_practical",
      question:
        "Your program prompts for a number then a character, but the character input seems to get skipped due to a leftover character in the input buffer. What explains this?",
      correctPool: [
        "Leftover whitespace in the input buffer after a numeric scanf() read can interfere with a following %c read.",
        "scanf()'s handling of the newline left behind after a %d read can be picked up by the next %c read.",
      ],
      wrongPool: [
        "The compiler ignoring the second scanf() call.",
        "getch() disabling scanf() permanently.",
        "printf() clearing the input buffer automatically.",
        "The keyboard driver malfunctioning.",
      ],
      explanation: "A leftover newline character from a prior numeric read can be consumed by the next %c read.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp30_practical",
      question:
        "Which function would you choose to write formatted numeric and text data together in one output call, e.g. combining a name and a score?",
      correctPool: [
        "printf(), using multiple format specifiers in one call.",
        "printf() with a format string containing both %s and %d, for example.",
      ],
      wrongPool: ["putchar(), called repeatedly for each character.", "fclose()", "scanf()", "getch()"],
      explanation: "printf() can combine multiple format specifiers to output mixed data types in one call.",
      topic: "Input & Output",
      difficulty: "practical" as const,
    },
    {
      id: "cp31_practical",
      question:
        "You calculate a student's average with `avg = total / count;` where both total and count are int, and the result always comes out as a whole number, losing the decimal part. What's happening?",
      correctPool: [
        "Integer division is being performed, which truncates the fractional part.",
        "Since both operands are int, C performs integer arithmetic and drops the decimal portion.",
      ],
      wrongPool: [
        "C is rounding to the nearest whole number.",
        "printf() is hiding the decimals automatically.",
        "The compiler is broken.",
        "Division always requires floats explicitly in C.",
      ],
      explanation: "Dividing two integers in C performs integer division, truncating any fractional part.",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp32_practical",
      question:
        "In an if condition, you want to check whether BOTH a user's age is 18 or older AND their score is above 75. Which operator combines these two conditions?",
      correctPool: [
        "The logical AND operator (&&).",
        "&&, since both conditions need to be true simultaneously.",
      ],
      wrongPool: [
        "The logical OR operator (||).",
        "The modulus operator (%).",
        "The assignment operator (=).",
        "The bitwise AND operator alone, without &&.",
      ],
      explanation: "&& (logical AND) requires both conditions to be true for the whole expression to be true.",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp33_practical",
      question:
        "You write `if (x = 5)` intending to compare x to 5, but it always evaluates as true regardless of x's original value. What mistake did you make?",
      correctPool: [
        "Using the assignment operator (=) instead of the equality operator (==).",
        "A single = assigns 5 to x rather than comparing it, so the expression is always true.",
      ],
      wrongPool: [
        "Using the wrong data type for x.",
        "Forgetting a semicolon.",
        "Using an invalid identifier.",
        "Missing an else clause.",
      ],
      explanation: "A single = performs assignment, not comparison; == is the equality operator.",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp34_practical",
      question: "Given `a = 10; b = 15; x = (a > b) ? a : b;`, what value ends up in x?",
      correctPool: [
        "15, since b is greater than a.",
        "x becomes 15 because a > b is false, so exp3 (b) is chosen.",
      ],
      wrongPool: ["10", "25", "0", "An error occurs."],
      explanation: "Since a > b is false, the ternary operator evaluates to exp3, which is b (15).",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp35_practical",
      question:
        "You want the numerical size, in bytes, that an int occupies on your system without looking it up manually. Which operator gives you this at compile time?",
      correctPool: ["sizeof, e.g. sizeof(int)", "The sizeof operator returns the byte size of a type or variable."],
      wrongPool: ["The % operator.", "The & operator.", "The ! operator.", "The , (comma) operator."],
      explanation: "sizeof returns the size, in bytes, occupied by a data type, variable, or constant.",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp36_practical",
      question:
        "You need to reverse the truth value of a condition, so that a true expression becomes false and vice versa. Which operator does this?",
      correctPool: ["The logical NOT operator (!)", "! reverses the value of a single expression."],
      wrongPool: ["The && operator.", "The || operator.", "The += operator.", "The == operator."],
      explanation: "The logical NOT (!) operator inverts the truth value of the expression it's applied to.",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp37_practical",
      question: "In `x += 1;`, what is the equivalent long-form statement?",
      correctPool: ["x = x + 1;", "It's shorthand for x = x + 1;"],
      wrongPool: ["x = 1;", "x = x - 1;", "x = x * 1;", "x++ + 1;"],
      explanation: "+= is a shorthand assignment operator; x += 1 means x = x + 1.",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp38_practical",
      question:
        "You combine several related assignments using the comma operator: `value = (x = 10, y = 5, x + y);`. What ends up stored in value?",
      correctPool: [
        "15, the value of the rightmost expression in the comma list.",
        "value becomes 15, since the comma operator evaluates left to right and returns the rightmost result.",
      ],
      wrongPool: ["10", "5", "0", "An error, since comma can't be used this way."],
      explanation: "The comma operator evaluates expressions left to right; the value of the whole expression is the rightmost one (x + y = 15).",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp39_practical",
      question:
        "An arithmetic expression mixes * and + with no parentheses. Which operator group is evaluated first according to C's precedence rules?",
      correctPool: [
        "Multiplicative operators (*, /, %), evaluated before additive operators (+, -).",
        "* has higher precedence than + and is evaluated first.",
      ],
      wrongPool: [
        "Additive operators are always evaluated first.",
        "They are evaluated strictly right to left regardless of type.",
        "Addition and multiplication always have equal precedence.",
        "It depends on which comes first alphabetically.",
      ],
      explanation: "Multiplicative operators have higher priority than additive operators in C's precedence rules.",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp40_practical",
      question:
        "You need to manipulate individual bits of a data value, such as shifting bits left. Which category of operators provides this capability?",
      correctPool: [
        "Bitwise operators, such as << and >>.",
        "Bitwise operators are used for this kind of bit-level manipulation.",
      ],
      wrongPool: [
        "Relational operators.",
        "Logical operators.",
        "Assignment operators only.",
        "Conditional operators.",
      ],
      explanation: "Bitwise operators (&, |, ^, <<, >>) manipulate data at the individual bit level.",
      topic: "Operators & Expressions",
      difficulty: "practical" as const,
    },
    {
      id: "cp41_practical",
      question:
        "You need your program to run a menu loop's body at least once before ever checking the exit condition. Which loop fits best?",
      correctPool: [
        "do-while loop",
        "A do-while loop, since it always executes the body at least once before testing the condition.",
      ],
      wrongPool: ["for loop", "while loop", "if statement", "switch statement"],
      explanation: "A do-while loop checks its condition after the loop body runs, guaranteeing at least one execution.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp42_practical",
      question:
        "Inside a for loop counting from 1 to 10, you want to completely stop the loop the moment the counter hits 5, skipping the rest of the iterations entirely. Which statement should you use?",
      correctPool: ["break", "The break statement exits the loop immediately."],
      wrongPool: ["continue", "goto only", "return only", "exiting the whole program with no statement"],
      explanation: "break immediately terminates the loop and transfers control to the statement after it.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp43_practical",
      question:
        "In a loop that prints numbers 1 to 20, you want to skip printing multiples of 3 but keep looping through the rest. Which statement lets you skip just that iteration?",
      correctPool: ["continue", "The continue statement skips the rest of that iteration and moves to the next one."],
      wrongPool: ["break", "goto, unconditionally", "switch", "default"],
      explanation: "continue skips the remaining code in the current iteration and proceeds to the next one.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp44_practical",
      question:
        "You're building a menu system with many possible numeric choices (1-8), each requiring different code. Which control structure keeps this cleaner than a long chain of if-else-if?",
      correctPool: ["A switch statement", "switch is well suited for selecting among several discrete values of one variable."],
      wrongPool: [
        "A single if statement.",
        "A do-while loop by itself.",
        "A goto-only structure.",
        "A nested for loop.",
      ],
      explanation: "switch is designed for choosing among many discrete values of a single variable.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp45_practical",
      question:
        "You wrote a switch statement but forgot to add break after each case, and selecting case 1 also runs case 2 and case 3. What C behavior explains this?",
      correctPool: [
        "Fall-through — without break, execution continues into the next case.",
        "Missing break statements cause fall-through into subsequent cases.",
      ],
      wrongPool: [
        "The compiler randomly executes extra cases.",
        "default always runs first.",
        "case labels must be in numeric order or all run.",
        "switch requires an else block.",
      ],
      explanation: "Without break, execution falls through and continues into the next case's statements.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp46_practical",
      question:
        "You need to check three levels of division (First, Second, Third) for a student's percentage, where each check depends on the previous one failing. Which structure fits naturally?",
      correctPool: ["if...else if...else chain", "A chain of if, else if, and else, evaluated in sequence."],
      wrongPool: [
        "A single switch on a float value.",
        "A do-while loop.",
        "A goto loop only.",
        "Nested for loops.",
      ],
      explanation: "if...else if...else naturally handles a sequence of dependent conditions.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp47_practical",
      question:
        "You want your loop to keep asking the user for numbers until they enter 0 or a negative number, summing them as they go, testing the exit condition at the bottom of the loop. Which loop naturally supports this pattern?",
      correctPool: [
        "do-while loop",
        "A do-while loop, since the sum is accumulated before the condition is checked at the end.",
      ],
      wrongPool: ["for loop only", "if statement", "switch statement", "goto with no loop"],
      explanation: "A do-while loop accumulates the sum first, then checks the exit condition at the bottom.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp48_practical",
      question: "In your for loop `for(i=1; i<10; ++i)`, what determines when the loop stops running?",
      correctPool: [
        "The test condition i < 10 becoming false.",
        "The loop stops once the condition i < 10 evaluates to false.",
      ],
      wrongPool: [
        "Reaching the break keyword only.",
        "The initialization statement running again.",
        "A fixed number of exactly 9 runs regardless of the condition.",
        "The increment statement alone stopping it.",
      ],
      explanation: "The for loop's test condition is checked before each iteration and stops the loop once false.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp49_practical",
      question:
        "You want to unconditionally jump to a specific labeled section of code if a number entered is negative, skipping the rest of the normal flow. Which statement, paired with a label, does this directly?",
      correctPool: ["goto", "The goto statement jumps to a labeled statement elsewhere in the program."],
      wrongPool: ["continue", "break", "switch", "return only, without goto"],
      explanation: "goto unconditionally transfers control to a labeled statement.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp50_practical",
      question:
        "You have nested if statements checking three conditions to determine the largest of three numbers. What is this structure called when an if is placed inside another if's block?",
      correctPool: ["Nested if statement", "This is called a nested if, or nested if-else, statement."],
      wrongPool: ["A switch chain.", "A do-while structure.", "A goto sequence.", "An unrelated syntax error."],
      explanation: "Placing an if statement inside the body of another if statement creates a nested if statement.",
      topic: "Control Statements",
      difficulty: "practical" as const,
    },
    {
      id: "cp51_practical",
      question: "You declare `int numbers[5] = {10, 20, 30, 40, 50};` and want the value 30. Which index do you use?",
      correctPool: ["numbers[2]", "Index 2, since arrays are zero-indexed and 30 is the third element."],
      wrongPool: ["numbers[3]", "numbers[30]", "numbers[1]", "numbers[5]"],
      explanation: "Zero-based indexing means the third element (30) is at index 2.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp52_practical",
      question:
        "Your program accidentally writes to `numbers[5]` on an array declared as `int numbers[5];`. What is the risk of this operation?",
      correctPool: [
        "It's out of bounds and leads to undefined behavior, possibly corrupting other memory.",
        "Writing past the valid index range causes undefined behavior since index 5 doesn't exist in a 5-element array.",
      ],
      wrongPool: [
        "C automatically expands the array to fit.",
        "It safely wraps around to index 0.",
        "Nothing happens; it's always safe.",
        "It converts the array into a different data type.",
      ],
      explanation: "Index 5 is out of bounds for a 5-element array (valid indices are 0-4), causing undefined behavior.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp53_practical",
      question:
        "You need to store a 3-row, 4-column table of exam scores. Which declaration correctly creates this structure?",
      correctPool: ["int scores[3][4];", "A two-dimensional array declared as int scores[3][4];"],
      wrongPool: ["int scores[4];", "int scores[3];", "int scores[7];", "int scores(3,4);"],
      explanation: "A 3-row, 4-column table needs a 2D array declared as int scores[3][4];",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp54_practical",
      question:
        "Given `int matrix[3][4]` filled row by row starting at 1, with the second row being {5,6,7,8}, what value is stored at matrix[1][2]?",
      correctPool: [
        "7, the third element of the second row.",
        "matrix[1][2] is 7, since row index 1 is the second row and column index 2 is the third value in it.",
      ],
      wrongPool: ["6", "8", "2", "1"],
      explanation: "Row index 1 is the second row {5,6,7,8}; column index 2 within it is the value 7.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp55_practical",
      question:
        "You store a name using `char name[] = \"John\";` and need to print it with printf(). Which format specifier displays it correctly?",
      correctPool: ["%s", "The %s specifier is used to print a null-terminated string."],
      wrongPool: ["%d", "%c", "%f", "%p"],
      explanation: "%s is the format specifier for printing a string.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp56_practical",
      question:
        "You declare `char greeting2[5] = {'H','e','l','l','o'};` without a null terminator. What practical problem could this cause when printed with %s?",
      correctPool: [
        "printf() may read past the array's end looking for a null terminator, producing garbage or crashing.",
        "Without the null terminator, string functions won't know where the string ends and may read out-of-bounds memory.",
      ],
      wrongPool: [
        "It will print identically to a properly terminated string with no issues.",
        "C automatically adds the null terminator when printing.",
        "It converts automatically to an integer.",
        "It causes a compile-time error instead.",
      ],
      explanation: "Without a null terminator, string-reading functions don't know where the string ends and may read out of bounds.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp57_practical",
      question:
        "You need to copy the contents of one string into another string variable. Which standard library function is designed for this?",
      correctPool: ["strcpy()", "The strcpy() function from string.h copies one string into another."],
      wrongPool: ["strlen()", "printf()", "scanf()", "sizeof()"],
      explanation: "strcpy() copies the contents of one string into another.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp58_practical",
      question:
        "To find out how many characters are in a string (excluding the null terminator), which function would you call?",
      correctPool: ["strlen()", "strlen() returns the length of a string, not counting the null terminator."],
      wrongPool: ["strcpy()", "strcat()", "sizeof() only", "strcmp()"],
      explanation: "strlen() returns a string's length, not counting its null terminator.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp59_practical",
      question:
        "You loop through an array using `for (i = 0; i < 5; i++)` to print each of its 5 elements. Why does the loop use `i < 5` rather than `i <= 5`?",
      correctPool: [
        "Because valid indices only go up to 4, so i must stay less than 5 to avoid going out of bounds.",
        "Using i <= 5 would access index 5, which is out of bounds for a 5-element array.",
      ],
      wrongPool: [
        "Because <= is invalid syntax in C.",
        "Because it makes the loop run faster only.",
        "Because arrays require exactly 4 iterations always.",
        "It doesn't matter which is used.",
      ],
      explanation: "A 5-element array has valid indices 0-4; i <= 5 would access the out-of-bounds index 5.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp60_practical",
      question:
        "You want to store the names of 5 students, each as a string, in one array. Which array declaration style fits this?",
      correctPool: [
        "A 2D character array, e.g. char names[5][10];",
        "char names[5][10]; — an array of 5 strings, each up to 9 characters plus a null terminator.",
      ],
      wrongPool: ["A single int array.", "A single float variable.", "char names[10];", "int names[5][10];"],
      explanation: "A 2D char array like char names[5][10] stores 5 separate strings.",
      topic: "Arrays & Strings",
      difficulty: "practical" as const,
    },
    {
      id: "cp61_practical",
      question:
        "You're building a program to manage student records, each needing a name, age, and grade together as one unit. What C feature best models this?",
      correctPool: [
        "A structure (struct)",
        "Defining a struct, e.g. struct student, to group these related fields together.",
      ],
      wrongPool: ["A single int variable.", "A for loop.", "A single char variable.", "A #define macro only."],
      explanation: "A structure groups related variables of different types under a single name.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp62_practical",
      question:
        "Given `struct student { char name[50]; int age; float grade; }; struct student s1;`, how do you correctly assign 20 to s1's age?",
      correctPool: ["s1.age = 20;", "Using the dot operator: s1.age = 20;"],
      wrongPool: ["s1->age = 20;", "age.s1 = 20;", "s1[age] = 20;", "student.age = 20;"],
      explanation: "The dot operator accesses a structure variable's members: s1.age = 20;",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp63_practical",
      question: "You declare `struct Person person1;` without assigning any values. What happens to its members by default?",
      correctPool: [
        "They receive default initialization: numeric members become 0, char members become '\\0'.",
        "Default initialization sets numeric fields to 0 and character fields to the null character.",
      ],
      wrongPool: [
        "The program refuses to compile.",
        "They contain 'Hello World' by default.",
        "They automatically copy from another structure.",
        "Structures cannot be declared without values.",
      ],
      explanation: "Default initialization sets numeric members to 0, char members to '\\0', and pointers to NULL.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp64_practical",
      question:
        "You want a Person structure to store someone's birthdate using its own day/month/year structure inside it. What is this technique called?",
      correctPool: [
        "Nested structures, where one structure is a member of another.",
        "Structure nesting — embedding a Date structure inside a Person structure.",
      ],
      wrongPool: [
        "Structure inheritance.",
        "Structure overloading.",
        "Array flattening.",
        "Structure casting.",
      ],
      explanation: "A nested structure incorporates one structure as a member of another.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp65_practical",
      question: "Given `person1.birthdate.year = 1990;`, which structure does 'year' actually belong to?",
      correctPool: [
        "The nested Date structure (birthdate), not Person directly.",
        "year belongs to the Date structure, which is nested inside Person as the birthdate member.",
      ],
      wrongPool: [
        "The Person structure directly.",
        "It belongs to neither structure.",
        "It's a standalone global variable.",
        "It belongs to the main() function.",
      ],
      explanation: "year is a member of the nested Date structure, accessed through the birthdate member of Person.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp66_practical",
      question:
        "You need to store records for 5 employees, each with an ID, name, and join date. What's the most appropriate structure design?",
      correctPool: [
        "An array of structures, e.g. struct Employee employees[5];",
        "A structure array holding 5 Employee structures.",
      ],
      wrongPool: [
        "Five separate unrelated int variables.",
        "A single string containing all data.",
        "A 2D int array only.",
        "A single float variable.",
      ],
      explanation: "A structure array holds multiple instances of the same structure, ideal for a list of records.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp67_practical",
      question: "In `struct Employee employees[3];`, how do you access the name of the second employee (index 1)?",
      correctPool: ["employees[1].name", "Using array indexing plus the dot operator: employees[1].name"],
      wrongPool: ["employees.name[1]", "employees[1]->name()", "name[employees][1]", "employees(1).name"],
      explanation: "Array indexing combines with the dot operator: employees[1].name accesses the second element's name.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp68_practical",
      question:
        "You initialize a structure like `struct Person person1 = {.age = 25, .name = \"John Doe\"};` with explicit member names, in a different order than declared. Does this work correctly in C?",
      correctPool: [
        "Yes, naming the members explicitly means the order doesn't matter.",
        "Yes, because explicit member-name initialization removes the requirement to match declaration order.",
      ],
      wrongPool: [
        "No, the order must always match declaration order regardless of naming.",
        "No, this syntax is invalid in C entirely.",
        "Yes, but only for structures with exactly two members.",
        "No, only default initialization is allowed with named members.",
      ],
      explanation: "Explicitly naming members while initializing removes the need to match declaration order.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp69_practical",
      question:
        "A colleague says structures are only useful for numbers. Which example best demonstrates that structures can group mixed data types?",
      correctPool: [
        "A struct combining a char array (name), an int (age), and a float (grade) together.",
        "A structure like struct student { char name[50]; int age; float grade; }; showing multiple data types in one unit.",
      ],
      wrongPool: [
        "An array containing only integers.",
        "A single float variable.",
        "A for loop counting to 10.",
        "A string containing only digits.",
      ],
      explanation: "A structure combining char, int, and float members proves it can group mixed data types.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp70_practical",
      question:
        "You want to model a real-world employee, including their hire date represented by its own set of day/month/year fields, all within one Employee record. Which two C features work together to achieve this?",
      correctPool: [
        "Structures combined with nested structures.",
        "A structure containing another structure as a member (nested structures).",
      ],
      wrongPool: [
        "Arrays combined with loops only.",
        "Pointers combined with recursion only.",
        "Global variables combined with macros.",
        "Functions combined with switch statements only.",
      ],
      explanation: "Nesting a Date structure inside an Employee structure models this kind of composite record.",
      topic: "Structures",
      difficulty: "practical" as const,
    },
    {
      id: "cp71_practical",
      question:
        "Your program tries to read from 'data.txt' but the file doesn't exist on disk. What does fopen() return, and what should your program do?",
      correctPool: [
        "fopen() returns NULL, and the program should check for this and handle the error instead of using the pointer.",
        "It returns NULL; you should test for NULL and avoid using the invalid file pointer.",
      ],
      wrongPool: [
        "fopen() creates the file silently with no way to detect it.",
        "fopen() crashes the program with no return value.",
        "fopen() returns 0 and continues normally with a blank pointer.",
        "fopen() automatically searches other folders for a similarly named file.",
      ],
      explanation: "fopen() returns NULL when it fails to open a file; the program must check for this before proceeding.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp72_practical",
      question:
        "After writing data to a file with fprintf(), your program exits without calling fclose(). What practical risk does this create?",
      correctPool: [
        "Pending buffered data may never be written to disk, and system resources may not be released properly.",
        "Data can be lost because it wasn't flushed to disk, and the file resource isn't properly released.",
      ],
      wrongPool: [
        "Nothing; fclose() is purely optional with no consequences.",
        "The file becomes read-only automatically.",
        "The program automatically calls fclose() for you at compile time.",
        "The data is written twice.",
      ],
      explanation: "fclose() ensures pending data is flushed to disk and releases the file's system resources.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp73_practical",
      question:
        "You need to read one line of text at a time from a file into a string buffer, rather than character by character. Which function is best suited?",
      correctPool: ["fgets()", "fgets() reads a line (or up to a limit) of text from a file into a string variable."],
      wrongPool: ["fputc()", "fopen()", "fclose()", "sizeof()"],
      explanation: "fgets() is used to read a string (a line of text) from a file.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp74_practical",
      question:
        "You want to append single characters one at a time to build up a file's content, mirroring how fgetc() reads characters one at a time. Which output function pairs with fgetc()?",
      correctPool: ["fputc()", "fputc() writes a single character, pairing with fgetc() for character-by-character I/O."],
      wrongPool: ["fprintf()", "fscanf()", "fgets()", "fopen()"],
      explanation: "fputc() writes one character at a time, the write counterpart to fgetc().",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp75_practical",
      question:
        "While reading a file character by character in a while loop, you need a condition to stop the loop exactly when there's no more data left. What should the loop check for?",
      correctPool: [
        "Whether the character read equals EOF.",
        "The loop should continue while (ch = fgetc(file)) != EOF.",
      ],
      wrongPool: [
        "Whether the character equals NULL.",
        "Whether the character equals 0.",
        "Whether 100 characters have been read, regardless of content.",
        "Whether the file size in bytes is even.",
      ],
      explanation: "fgetc() returns the constant EOF once the end of the file is reached.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp76_practical",
      question:
        "You need to open a file so you can add new content to the end of it without erasing what's already there. Which fopen() mode best fits appending data?",
      correctPool: [
        "\"a\", the append mode.",
        "The append mode (\"a\"), which adds new data to the end of the file without erasing existing content.",
      ],
      wrongPool: [
        "\"r\", read mode.",
        "\"w\", write mode, since it always appends.",
        "\"x\", which doesn't exist as a mode.",
        "\"c\", a nonexistent create-only mode.",
      ],
      explanation: "The \"a\" (append) mode adds data to the end of a file without erasing existing content.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp77_practical",
      question:
        "You wrote name and age data to a file using fprintf(), then need to read those same values back using fscanf(). What should you make sure of between the format strings used?",
      correctPool: [
        "That the fscanf() format specifiers correspond to how the data was written with fprintf().",
        "The read and write format specifiers must correspond so the data types line up correctly.",
      ],
      wrongPool: [
        "That fscanf() and fprintf() are called the same number of times only, regardless of format.",
        "That the file is renamed before reading.",
        "That fclose() is skipped between writing and reading.",
        "That the file extension is .c.",
      ],
      explanation: "The format specifiers used to write and later read the data must correspond to the data types involved.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp78_practical",
      question:
        "You call `fopen(\"example.txt\", \"w\")` on a file that already contains important data. What happens to the existing content?",
      correctPool: [
        "It gets overwritten/erased, since \"w\" mode truncates the existing file.",
        "Write mode (\"w\") erases the file's previous contents when opening it.",
      ],
      wrongPool: [
        "The new data is appended after the old content.",
        "fopen() refuses to open it and returns an error.",
        "The old content is backed up automatically.",
        "Nothing changes until fclose() is called.",
      ],
      explanation: "Opening a file in \"w\" mode truncates (erases) any existing content in that file.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp79_practical",
      question:
        "Your program reads data from a file successfully but forgets to check if fopen() actually succeeded first. In a real deployment where the file might be missing, what could this oversight cause?",
      correctPool: [
        "The program could crash or behave unpredictably by dereferencing a NULL file pointer.",
        "Skipping the NULL check risks using an invalid file pointer, leading to crashes or undefined behavior.",
      ],
      wrongPool: [
        "Nothing, since fopen() always succeeds in practice.",
        "The compiler will catch this automatically at compile time.",
        "The operating system will silently create a substitute file.",
        "It only affects the file's timestamp.",
      ],
      explanation: "Using a file pointer without checking for NULL first risks crashes if fopen() actually failed.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
    {
      id: "cp80_practical",
      question:
        "You need to write structured, labeled data like a student's name and age to a file in a readable text format, similar to how printf() formats console output. Which file function directly parallels printf() but targets a file?",
      correctPool: ["fprintf()", "fprintf() is printf()'s file-writing counterpart, using the same format-string style."],
      wrongPool: ["fputc()", "fgetc()", "fopen()", "fclose()"],
      explanation: "fprintf() writes formatted data to a file, just as printf() does for the console.",
      topic: "File Handling",
      difficulty: "practical" as const,
    },
  ],
};

/**
 * HOW TO ADD NEW PRACTICAL QUESTIONS:
 *
 * 1. Find your subject in the practicalQuestions object above
 * 2. Add a new question object to the array:
 *    {
 *      id: "unique_id_practical",
 *      question: "Your question here?",
 *      correctPool: ["Correct answer 1", "Correct answer 2"],
 *      wrongPool: ["Wrong 1", "Wrong 2", "Wrong 3", "Wrong 4", "Wrong 5"],
 *      explanation: "Why the answer is correct...",
 *      topic: "Topic name",
 *      difficulty: 'practical' as const
 *    }
 * 3. Make sure:
 *    - id is unique and ends with "_practical"
 *    - correctPool has at least 1 answer
 *    - wrongPool has at least 3 answers (more is better for variety)
 *    - difficulty is exactly: 'practical' as const
 *
 * The system will automatically:
 * - Pick 1 random answer from correctPool
 * - Pick 3 random answers from wrongPool
 * - Shuffle all 4 answers
 * - Track which position is correct
 */