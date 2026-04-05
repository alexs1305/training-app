// MODULE 3 — Implement an Agentic Solution (5-10%)
export default {
  id: 3,
  title: "Agentic AI Solutions",
  description: "Building agents with Microsoft Foundry Agent Service and multi-agent orchestration (5–10%)",
  lessons: [
    {
      title: "Understanding AI Agents",
      questions: [
        {
          question: "What distinguishes an AI agent from a standard LLM chat completion call?",
          answers: [
            "Agents use larger models with more parameters",
            "Agents can autonomously plan and execute multi-step tasks by calling tools and taking actions, not just generating a single text response",
            "Agents always require human approval before responding",
            "Agents use a different API protocol than chat completions"
          ],
          correct: 1,
          explanation: "An AI agent uses an LLM as its reasoning engine but extends it with the ability to use tools (function calling, code execution, search), maintain state, plan multi-step sequences, and take actions autonomously to achieve a goal."
        },
        {
          question: "In the Microsoft Foundry Agent Service, what is the role of a 'tool' in an agent configuration?",
          answers: [
            "A UI component in the Foundry portal",
            "A callable function or capability (e.g., code interpreter, file search, custom API) that the agent can invoke to complete tasks",
            "A deployment region configuration",
            "A safety filter applied to outputs"
          ],
          correct: 1,
          explanation: "Tools extend an agent's capabilities beyond text generation. Built-in tools in the Foundry Agent Service include code interpreter (executes Python code) and file search (retrieves from uploaded files). Custom tools are defined as function schemas the agent can call."
        },
        {
          question: "Your organization needs an AI system where one 'orchestrator' agent breaks down a complex task and delegates subtasks to specialized 'worker' agents. What is this pattern called?",
          answers: [
            "Single-agent RAG",
            "Multi-agent orchestration",
            "Prompt chaining",
            "Federated learning"
          ],
          correct: 1,
          explanation: "Multi-agent orchestration is a pattern where a top-level orchestrator agent decomposes a complex task into subtasks and routes them to specialized agents. Each worker agent completes its subtask and returns results to the orchestrator."
        }
      ],
      variantQuestions: [
        {
          question: "How does an AI agent differ from a single chat completion call to an LLM?",
          answers: [
            "Agents use proprietary models unavailable through the standard API",
            "Agents can autonomously use tools, maintain state, and execute multi-step plans to complete a goal",
            "Agents automatically fine-tune themselves based on user feedback",
            "Agents bypass content safety filters for unrestricted capabilities"
          ],
          correct: 1,
          explanation: "While a chat completion returns a single response, an AI agent can iteratively invoke tools (code execution, search, APIs), retain context across steps, and plan a sequence of actions to accomplish complex goals."
        },
        {
          question: "A complex research task needs one agent to plan the work and three specialized agents to handle data retrieval, analysis, and report writing independently. What design pattern does this describe?",
          answers: [
            "Sequential prompt chaining with a single model",
            "Multi-agent orchestration with an orchestrator and specialist worker agents",
            "Parallel RAG with multiple independent vector stores",
            "Federated fine-tuning across distributed datasets"
          ],
          correct: 1,
          explanation: "Multi-agent orchestration uses a top-level orchestrator to decompose a goal and delegate subtasks to specialist worker agents. Each worker operates independently and returns results for the orchestrator to synthesize."
        }
      ]
    },
    {
      title: "Building and Deploying Agents",
      questions: [
        {
          question: "When building a custom agent with the Microsoft Agent Framework (Semantic Kernel or AutoGen on Azure), what is a 'planner'?",
          answers: [
            "An Azure resource that schedules agent deployments",
            "A component that generates a step-by-step execution plan for achieving a goal, selecting which plugins/tools to use and in what order",
            "A cost estimation tool for agent operations",
            "A safety review board for agent responses"
          ],
          correct: 1,
          explanation: "A planner is a core component in agent frameworks like Semantic Kernel. Given a goal, the planner uses the LLM to generate an ordered plan of steps and selects the appropriate plugins (functions/tools) to execute at each step."
        },
        {
          question: "Which capability would you enable on a Foundry Agent to allow it to execute Python code to perform data analysis on uploaded CSV files?",
          answers: [
            "File search tool",
            "Code interpreter tool",
            "Function calling with a custom data analysis API",
            "Azure OpenAI fine-tuning"
          ],
          correct: 1,
          explanation: "The code interpreter tool in the Foundry Agent Service allows the agent to write and execute Python code in a sandboxed environment. It can read uploaded files (including CSVs), perform calculations, generate charts, and return results."
        }
      ],
      variantQuestions: [
        {
          question: "A data analyst wants a Foundry Agent to receive uploaded Excel files, run calculations in Python, and return a summary chart. Which agent tool must be enabled?",
          answers: [
            "File search tool (for document retrieval from vector stores)",
            "Code interpreter tool (for executing Python in a sandboxed environment)",
            "Custom function calling with an external analytics API",
            "Azure OpenAI fine-tuning to teach the model data analysis"
          ],
          correct: 1,
          explanation: "The code interpreter tool gives the Foundry Agent a sandboxed Python environment where it can read uploaded files, execute code, generate visualizations, and return results — without any external infrastructure."
        },
        {
          question: "In Semantic Kernel or similar agent frameworks, which component determines which tools to use and in what order when given a high-level goal?",
          answers: [
            "A scheduler that queues tool calls in a fixed order",
            "A planner that uses the LLM to generate a step-by-step execution plan and selects appropriate plugins",
            "A router that maps intent labels to pre-defined tool sequences",
            "An evaluator that scores each tool and picks the highest-scoring one"
          ],
          correct: 1,
          explanation: "A planner is the reasoning component in agent frameworks like Semantic Kernel. Given a goal, it uses the LLM to create a dynamic plan — choosing which tools (plugins) to invoke and in which order — rather than following a fixed workflow."
        }
      ],
      variantQuestions: [
        {
          type: 'text-input',
          question: "In the Microsoft Foundry Agent Service, which built-in tool allows an agent to write and run Python code in a sandboxed environment?",
          acceptedAnswers: ["code interpreter", "Code Interpreter", "code interpreter tool", "Code Interpreter tool"],
          explanation: "The Code Interpreter tool gives a Foundry Agent a sandboxed Python execution environment. It can read uploaded files, run calculations, generate charts, and return results without any external infrastructure."
        }
      ]
    },
    {
      title: "Case Study: AdventureWorks Travel Booking Agent",
      isCaseStudy: true,
      scenario: `AdventureWorks Holidays wants to build an AI travel assistant on Azure that can:

1. Itinerary planning — take a customer's destination and dates, search live flight and hotel availability, and produce a complete itinerary.
2. Data analysis — process uploaded trip-cost CSV files and summarise total spend per category.
3. Delegation — for complex group bookings, hand off accommodation research to a specialist agent while the main agent handles flights.
4. Autonomy — complete these tasks without a human approving each step, but let a human review before any payment is charged.`,
      questions: [
        {
          question: "The travel assistant needs to search flight APIs and hotel databases, maintain conversation context across turns, and produce a final itinerary. A single chat completion cannot do this. What should AdventureWorks build?",
          answers: [
            "A fine-tuned GPT-4 model trained on travel data",
            "An AI agent that can autonomously call tools (flight search API, hotel API) and plan multi-step tasks",
            "A RAG pipeline that retrieves travel information from a static document store",
            "A prompt chain where each API call is made manually by the application"
          ],
          correct: 1,
          explanation: "An AI agent uses an LLM as its reasoning engine but adds the ability to call tools (APIs), maintain state across steps, and plan sequences of actions autonomously — exactly what's needed for dynamic itinerary building."
        },
        {
          question: "A customer uploads a CSV of trip expenses and wants a summary of spend by category. Which Foundry Agent tool should be enabled to process the file with Python?",
          answers: [
            "File search tool — to retrieve text from the uploaded document",
            "Code interpreter tool — to execute Python code that reads and analyses the CSV",
            "Function calling with an external analytics API",
            "Custom content safety filter for financial data"
          ],
          correct: 1,
          explanation: "The code interpreter tool provides a sandboxed Python environment where the agent can read the uploaded CSV, run Pandas or similar analysis, and return a structured summary — all without external infrastructure."
        },
        {
          question: "For large group bookings, AdventureWorks wants one main agent to handle flights while delegating hotel research to a specialist agent. What architectural pattern is this?",
          answers: [
            "Single-agent RAG with multiple vector stores",
            "Multi-agent orchestration — an orchestrator delegates subtasks to specialist worker agents",
            "Prompt chaining — sequential API calls managed by application code",
            "Federated fine-tuning across regional model deployments"
          ],
          correct: 1,
          explanation: "Multi-agent orchestration uses a top-level orchestrator to decompose a goal and delegate subtasks to specialist workers. The orchestrator synthesises results from all workers to produce the final response."
        },
        {
          question: "AdventureWorks wants the agent to act autonomously for planning but pause for human approval before processing any payment. What design principle does this represent?",
          answers: [
            "Removing the agent's tool access for payment functions",
            "Human-in-the-loop — a checkpoint where the agent pauses and requires human confirmation before irreversible actions",
            "Setting temperature=0 to make payment decisions deterministic",
            "Using content safety filters to block payment-related prompts"
          ],
          correct: 1,
          explanation: "Human-in-the-loop (HITL) is a design pattern where an autonomous agent pauses at defined checkpoints — typically before irreversible actions like payments — and waits for a human to review and approve before proceeding."
        }
      ]
    }
  ]
}
