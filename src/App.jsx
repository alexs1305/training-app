import { useState, useEffect } from 'react'
import './App.css'

// ============================================================
// AI-102 ALIGNED MODULES
// Domains (with exam weightings):
//   1. Plan and manage an Azure AI solution (20-25%)
//   2. Implement generative AI solutions (15-20%)
//   3. Implement an agentic solution (5-10%)
//   4. Implement computer vision solutions (10-15%)
//   5. Implement natural language processing solutions (15-20%)
//   6. Implement knowledge mining and information extraction solutions (15-20%)
// ============================================================

const modules = [
  // ─────────────────────────────────────────────────────────
  // MODULE 1 — Plan and manage an Azure AI solution (20-25%)
  // ─────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Plan & Manage Azure AI Solutions",
    description: "Service selection, provisioning, security, monitoring, and Responsible AI (20–25%)",
    lessons: [
      {
        title: "Selecting the Right Azure AI Service",
        questions: [
          {
            question: "A developer needs to build a solution that extracts structured data from invoice PDFs at scale. Which Azure AI service is most appropriate?",
            answers: [
              "Azure AI Vision (image analysis)",
              "Azure Document Intelligence in Foundry Tools",
              "Azure AI Search with a custom skillset",
              "Azure AI Language (key phrase extraction)"
            ],
            correct: 1,
            explanation: "Azure Document Intelligence (formerly Form Recognizer) is purpose-built for extracting structured fields from documents such as invoices, receipts, and forms. It includes prebuilt invoice models that can identify totals, line items, vendor details, etc."
          },
          {
            question: "Your organization wants to add real-time speech translation to a customer service application so agents can speak in English while customers hear their native language. Which service provides this capability?",
            answers: [
              "Azure AI Language with text translation",
              "Azure AI Speech in Foundry Tools with speech translation",
              "Azure AI Translator in Foundry Tools with audio input",
              "Azure OpenAI with Whisper"
            ],
            correct: 1,
            explanation: "Azure AI Speech in Foundry Tools provides speech-to-speech and speech-to-text translation in real time. It supports translating spoken audio from one language and synthesizing the output in another language."
          },
          {
            question: "A solution architect must recommend a service to mine large volumes of unstructured internal documents and make them searchable with AI-enriched metadata (OCR, entity extraction, sentiment). Which service fits best?",
            answers: [
              "Azure Cosmos DB with full-text search",
              "Azure AI Search with a built-in AI skillset",
              "Azure AI Language standalone",
              "Azure OpenAI embeddings only"
            ],
            correct: 1,
            explanation: "Azure AI Search can orchestrate an enrichment pipeline (skillset) that applies AI skills such as OCR, entity recognition, sentiment, and key phrase extraction to documents, storing the enriched results in a searchable index."
          },
          {
            question: "Which Azure AI service should you select to implement a knowledge base for FAQ automation?",
            answers: [
              "Azure AI Language — custom question answering",
              "Azure AI Search semantic ranking",
              "Azure OpenAI fine-tuning",
              "Azure AI Language — named entity recognition"
            ],
            correct: 0,
            explanation: "The custom question answering feature of Azure AI Language is specifically designed to build FAQ-style knowledge bases. You can import Q&A pairs from documents or URLs, then query the knowledge base from a client or bot."
          }
        ]
      },
      {
        title: "Provisioning, Deployment and CI/CD",
        questions: [
          {
            question: "When deploying Azure AI services in a container for use at the edge, which two requirements must always be met for the container to function?",
            answers: [
              "The container must have internet access to send billing data to Azure, and a valid API key must be supplied",
              "The container must be deployed inside an Azure Virtual Network and use managed identity",
              "You must use Docker Compose and expose port 5000",
              "The container must sync data to Azure Blob Storage every hour"
            ],
            correct: 0,
            explanation: "Azure AI service containers still require a connection to Azure to meter usage (billing) and require a valid endpoint/key for authentication. The container itself runs the model locally, but billing telemetry must reach Azure."
          },
          {
            question: "You are integrating Azure AI Foundry into a CI/CD pipeline using GitHub Actions. What is the recommended way to authenticate the pipeline to Azure AI Foundry without storing secrets in the repository?",
            answers: [
              "Store the API key as a GitHub repository secret and reference it in the workflow",
              "Use a service principal with a client secret stored in Azure Key Vault and fetched via the workflow",
              "Use a federated identity credential (workload identity federation) with a managed identity or service principal",
              "Hard-code the subscription ID and key in the workflow YAML"
            ],
            correct: 2,
            explanation: "Workload identity federation (OpenID Connect) allows GitHub Actions to authenticate to Azure without storing long-lived secrets. This is the most secure approach and the current Microsoft best practice for CI/CD pipelines."
          },
          {
            question: "A team needs to deploy the same Azure AI Language resource configuration across development, staging, and production environments consistently. Which approach is recommended?",
            answers: [
              "Manually recreate each resource in the Azure portal for each environment",
              "Use ARM templates or Bicep to define the resource configuration as infrastructure as code",
              "Clone the resource using the Azure CLI cp command",
              "Export the resource from dev and import to production using Azure Data Factory"
            ],
            correct: 1,
            explanation: "Infrastructure as code (IaC) using ARM templates or Bicep ensures repeatable, consistent deployments across environments. This aligns with CI/CD best practices for Azure AI resources."
          }
        ]
      },
      {
        title: "Security, Keys, and Authentication",
        questions: [
          {
            question: "Your company policy prohibits storing API keys in application configuration files. Which authentication approach should Azure AI service clients use instead?",
            answers: [
              "Pass the key as a query string parameter in the URL",
              "Use a managed identity to authenticate calls to Azure AI services",
              "Base64-encode the key and store it in an environment variable",
              "Generate a SAS token from the key each time"
            ],
            correct: 1,
            explanation: "Managed identities (system-assigned or user-assigned) allow Azure-hosted applications to authenticate to Azure AI services without any stored credentials. The identity is managed by Azure AD and automatically rotated."
          },
          {
            question: "An Azure AI resource currently uses key-based authentication. A security review flags that keys should be rotated immediately. What is the safest way to rotate the key with zero application downtime?",
            answers: [
              "Regenerate Key 1, update all apps to use Key 2, then regenerate Key 2",
              "Regenerate both keys simultaneously and push updates to all apps",
              "Delete and recreate the resource with new keys",
              "Disable the resource temporarily, rotate, then re-enable"
            ],
            correct: 0,
            explanation: "Azure AI services provide two keys (Key 1 and Key 2) specifically for zero-downtime rotation. The procedure is: switch apps to Key 2, regenerate Key 1, switch apps back to Key 1, then regenerate Key 2 if needed."
          },
          {
            question: "You want to restrict access to an Azure AI services resource so it can only be called from specific Azure Virtual Networks. Which feature enables this?",
            answers: [
              "Azure Policy assignment",
              "Network access rules (Virtual Network service endpoints or private endpoints)",
              "Azure Front Door WAF policy",
              "RBAC role assignment to the VNet"
            ],
            correct: 1,
            explanation: "Azure AI services support network access rules that allow you to restrict inbound traffic to specific virtual networks (using service endpoints) or use private endpoints to eliminate public network exposure entirely."
          }
        ]
      },
      {
        title: "Responsible AI and Content Safety",
        questions: [
          {
            question: "A chatbot is generating responses that sometimes include harmful or inappropriate content. Which Azure AI feature directly helps detect and block this type of output before it reaches users?",
            answers: [
              "Azure Monitor alerts on token usage",
              "Azure AI Content Safety content filters and blocklists",
              "Azure Policy deny assignments",
              "Azure Defender for AI"
            ],
            correct: 1,
            explanation: "Azure AI Content Safety provides content moderation capabilities including configurable content filters for categories such as hate, violence, sexual content, and self-harm, plus custom blocklists. It can be applied to both inputs and outputs."
          },
          {
            question: "What is a 'prompt shield' in the context of Azure AI Content Safety?",
            answers: [
              "A feature that compresses prompts to reduce token costs",
              "A defense mechanism that detects and blocks prompt injection and jailbreak attempts",
              "A template library for safe prompt construction",
              "An encryption layer for prompts in transit"
            ],
            correct: 1,
            explanation: "Prompt shields (part of Azure AI Content Safety) detect adversarial inputs that attempt to override system instructions (jailbreaks) or inject malicious instructions via user-supplied content (prompt injection attacks)."
          },
          {
            question: "Which of the following BEST describes the 'fairness' principle in Microsoft's Responsible AI framework?",
            answers: [
              "AI systems should always provide the same answer to every user",
              "AI systems should treat all people fairly and not reinforce societal biases or discriminate across demographic groups",
              "AI systems should use equal amounts of compute resources",
              "AI systems must be open source so all can review them"
            ],
            correct: 1,
            explanation: "The fairness principle in Microsoft's Responsible AI framework states that AI systems should treat all people fairly, avoid discriminatory outcomes, and not reinforce harmful biases across gender, race, age, disability, or other demographic characteristics."
          },
          {
            question: "A deployed Azure AI model is producing biased predictions for a certain demographic. According to Responsible AI principles, what should be the FIRST action?",
            answers: [
              "Immediately retire the model",
              "Investigate and measure the bias with fairness assessment tools, then decide on remediation",
              "Add a disclaimer to the application UI",
              "Increase the model's confidence threshold"
            ],
            correct: 1,
            explanation: "The responsible approach is first to measure and understand the bias using fairness assessment tools (such as Azure AI Fairlearn integration). Blind retirement or minimal mitigations (disclaimers) are insufficient without understanding the root cause."
          }
        ]
      },
      {
        title: "Monitoring and Cost Management",
        questions: [
          {
            question: "You need to alert your team when the number of failed API calls to an Azure AI service exceeds 50 in a 5-minute window. Which Azure tool should you configure?",
            answers: [
              "Azure Cost Management + Billing budget alert",
              "Azure Monitor metric alert on the cognitive service resource",
              "Azure Advisor recommendation",
              "Microsoft Defender for Cloud alert"
            ],
            correct: 1,
            explanation: "Azure Monitor supports metric alerts on Azure AI service resources, including the number of errors/failed calls. You configure an alert rule on the relevant metric with a time aggregation window and threshold."
          },
          {
            question: "Which Azure Monitor feature allows you to run queries against diagnostic logs from an Azure AI resource to analyze patterns such as slow requests or authentication failures?",
            answers: [
              "Azure Monitor Metrics Explorer",
              "Azure Log Analytics with Kusto Query Language (KQL)",
              "Azure Monitor Workbooks only",
              "Azure Activity Log export"
            ],
            correct: 1,
            explanation: "Azure Log Analytics lets you write Kusto Query Language (KQL) queries against diagnostic logs sent from Azure AI resources (and other Azure services). This enables deep analysis of request patterns, latency, and error details."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 2 — Implement Generative AI Solutions (15-20%)
  // ─────────────────────────────────────────────────────────
  {
    id: 2,
    title: "Generative AI Solutions",
    description: "Azure OpenAI, prompt engineering, RAG, fine-tuning, and Microsoft Foundry (15–20%)",
    lessons: [
      {
        title: "Azure OpenAI in Foundry Models",
        questions: [
          {
            question: "A company wants to use GPT-4o to analyze customer feedback images alongside text. Which deployment capability supports this?",
            answers: [
              "GPT-4o can only process text; images require a separate vision model",
              "Large multimodal models (LMMs) in Azure OpenAI support both image and text inputs in the same call",
              "Use DALL-E to convert the image to a text description first, then pass that to GPT-4",
              "Submit the image to Azure AI Vision first and concatenate the result with the text"
            ],
            correct: 1,
            explanation: "GPT-4o and other large multimodal models (LMMs) in Azure OpenAI natively accept both text and image inputs in a single API call using the vision capability, removing the need for a separate preprocessing step."
          },
          {
            question: "What is the purpose of the 'temperature' parameter when calling an Azure OpenAI completion endpoint?",
            answers: [
              "It sets the CPU thermal throttle limit for the deployment",
              "It controls the randomness/creativity of the model output — higher values produce more varied responses",
              "It determines how many tokens are generated",
              "It selects the model version to use"
            ],
            correct: 1,
            explanation: "Temperature (0 to 2) controls output randomness. A temperature of 0 makes responses nearly deterministic (always picking the highest-probability token), while higher values introduce more variation and creativity."
          },
          {
            question: "Which Azure OpenAI model is used specifically for generating images from text prompts?",
            answers: [
              "GPT-4o",
              "text-embedding-ada-002",
              "DALL-E",
              "Whisper"
            ],
            correct: 2,
            explanation: "DALL-E is the Azure OpenAI model for image generation. Given a text prompt, it generates corresponding images. GPT-4o handles text/vision, text-embedding-ada-002 generates embeddings, and Whisper handles speech-to-text."
          },
          {
            question: "You are submitting a chat completion request to Azure OpenAI and need the model to always respond as a formal customer service representative. Which part of the API call defines this behavior?",
            answers: [
              "The 'user' role message",
              "The 'system' role message",
              "The 'assistant' role message",
              "The 'temperature' parameter set to 0"
            ],
            correct: 1,
            explanation: "The 'system' message in the chat completions API is used to set the persona, tone, and behavioral guidelines for the model. It acts as persistent instructions that shape all subsequent assistant responses in the conversation."
          }
        ]
      },
      {
        title: "RAG and Grounding with Your Data",
        questions: [
          {
            question: "What is the primary purpose of the Retrieval-Augmented Generation (RAG) pattern in a generative AI solution?",
            answers: [
              "To fine-tune a base model on proprietary data permanently",
              "To dynamically retrieve relevant context from a knowledge store and include it in the prompt so the model generates grounded, accurate answers",
              "To cache model responses and serve them from a CDN",
              "To reduce hallucinations by lowering the temperature to zero"
            ],
            correct: 1,
            explanation: "RAG retrieves relevant documents or data at query time (often from a vector store or Azure AI Search) and injects them into the prompt as context. This grounds the model's response in real data without the cost of fine-tuning."
          },
          {
            question: "In a RAG pipeline using Azure AI Search as the retriever and Azure OpenAI as the generator, which step converts documents into a numerical representation that captures semantic meaning?",
            answers: [
              "Tokenization with the BPE tokenizer",
              "Vectorization using an embedding model (e.g., text-embedding-ada-002)",
              "Sentiment analysis with Azure AI Language",
              "OCR extraction with Azure Document Intelligence"
            ],
            correct: 1,
            explanation: "Embedding models convert text into high-dimensional vectors that capture semantic meaning. Azure AI Search stores these vectors in a vector index, enabling similarity search to find the most relevant documents for a query."
          },
          {
            question: "When configuring a prompt flow in Azure AI Foundry for a RAG solution, what is the role of the 'grounding' node?",
            answers: [
              "It grounds the deployment to a specific Azure region",
              "It retrieves relevant context from a connected data source and makes it available to the LLM node",
              "It validates that all inputs comply with content safety policies",
              "It formats the model output into a structured JSON response"
            ],
            correct: 1,
            explanation: "In Azure AI Foundry prompt flows, a grounding node queries a retrieval source (such as Azure AI Search or a vector index) and injects the retrieved content as context that the LLM node can use to generate a grounded answer."
          }
        ]
      },
      {
        title: "Prompt Engineering and Fine-Tuning",
        questions: [
          {
            question: "A developer wants GPT-4 to consistently output JSON without extra prose. Which prompt engineering technique is MOST reliable for this?",
            answers: [
              "Increasing the temperature to 1.5",
              "Using few-shot examples in the prompt that show input-to-JSON mappings, combined with explicit JSON output instructions",
              "Decreasing the max_tokens to force brevity",
              "Adding 'please' to the prompt to be polite"
            ],
            correct: 1,
            explanation: "Few-shot prompting with explicit output format instructions is the most reliable approach. Providing two or three input/output examples in JSON format trains the model in context on the expected output shape. Azure OpenAI also supports a 'response_format: json_object' parameter."
          },
          {
            question: "When should you consider fine-tuning an Azure OpenAI model rather than relying on prompt engineering alone?",
            answers: [
              "When you want the model to know about events after its knowledge cutoff",
              "When you need consistent stylistic or formatting behavior that is too verbose to include in every prompt, or when few-shot examples alone are insufficient",
              "Fine-tuning should always be done before prompt engineering",
              "When you need to reduce the token limit of the model"
            ],
            correct: 1,
            explanation: "Fine-tuning is appropriate when you need the model to consistently adopt a specific style, format, or domain behavior that would otherwise require lengthy few-shot examples in every prompt. It is not a substitute for RAG when up-to-date knowledge is required."
          },
          {
            question: "Which of the following is an example of a 'chain-of-thought' prompting technique?",
            answers: [
              "Giving the model a single-sentence instruction",
              "Asking the model to reason step-by-step before providing its final answer",
              "Providing 50 training examples in the prompt",
              "Setting temperature to 0 for deterministic output"
            ],
            correct: 1,
            explanation: "Chain-of-thought (CoT) prompting instructs the model to reason through a problem step by step before producing a final answer. This significantly improves accuracy on complex reasoning, math, and multi-step tasks."
          }
        ]
      },
      {
        title: "Microsoft Foundry and Model Evaluation",
        questions: [
          {
            question: "In Azure AI Foundry, what is a 'hub' and how does it relate to 'projects'?",
            answers: [
              "A hub is a billing entity; projects are free sub-resources",
              "A hub is a shared governance container (network, security, shared connections) that can contain multiple projects; each project is an isolated workspace for a team or application",
              "A hub is a deployed model endpoint; projects are test environments",
              "A hub and a project are the same thing with different names"
            ],
            correct: 1,
            explanation: "In Azure AI Foundry, a hub provides shared infrastructure (networking, security, shared AI connections) and governance, while projects are isolated workspaces within the hub where teams build and test AI solutions. Multiple projects can share one hub."
          },
          {
            question: "You have deployed a prompt flow and want to evaluate its quality using built-in metrics. Which metric would you use to assess whether the model's answers are factually supported by the retrieved context?",
            answers: [
              "Groundedness",
              "Coherence",
              "Fluency",
              "Similarity"
            ],
            correct: 0,
            explanation: "The 'groundedness' metric in Azure AI Foundry evaluations measures how well the model's response is supported by the retrieved context/documents. A low groundedness score indicates the model may be hallucinating content not present in the source."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 3 — Implement an Agentic Solution (5-10%)
  // ─────────────────────────────────────────────────────────
  {
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
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 4 — Implement Computer Vision Solutions (10-15%)
  // ─────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Computer Vision Solutions",
    description: "Image analysis, custom models, OCR, and video analysis (10–15%)",
    lessons: [
      {
        title: "Image Analysis with Azure AI Vision",
        questions: [
          {
            question: "When making an image analysis request to Azure Vision in Foundry Tools, you want to receive objects detected in the image AND a generated caption. Which visual features should you include in the request?",
            answers: [
              "Tags and Description",
              "Objects and Caption",
              "Categories and Faces",
              "Read and SmartCrops"
            ],
            correct: 1,
            explanation: "Azure Vision's Image Analysis 4.0 API supports specifying visual features. 'Objects' returns bounding boxes and labels for detected objects; 'Caption' returns a human-readable description. Both can be requested in a single API call."
          },
          {
            question: "You call the Azure AI Vision Read API on an image and receive the following response structure: pages > lines > words. What does each 'word' object contain?",
            answers: [
              "Only the recognized text string",
              "The recognized text string, confidence score, and bounding polygon coordinates",
              "A URL to the cropped word image",
              "The font family and size detected"
            ],
            correct: 1,
            explanation: "Each word object in the Read API response contains the recognized text content, a confidence score (0-1), and a bounding polygon that specifies the exact location of the word on the image/page."
          },
          {
            question: "A retail application needs to analyze security camera footage to count the number of people present in a zone at any given time. Which Azure AI Vision feature supports this?",
            answers: [
              "Image Analysis object detection",
              "Azure AI Video Indexer face identification",
              "Azure Vision in Foundry Tools Spatial Analysis",
              "Custom Vision people-counting model"
            ],
            correct: 2,
            explanation: "Spatial Analysis (part of Azure Vision in Foundry Tools) is designed for real-time people detection and movement tracking in live video streams, including zone-based occupancy counting and social distancing monitoring."
          }
        ]
      },
      {
        title: "Custom Vision Models",
        questions: [
          {
            question: "You are building a custom image classification model to distinguish between 5 product categories. After training, the model shows 95% precision but only 60% recall for one category. What does this indicate?",
            answers: [
              "The model frequently misclassifies other categories as this category",
              "The model correctly identifies this category when it predicts it, but misses many true instances of this category",
              "The model never predicts this category",
              "The training data for this category was not uploaded"
            ],
            correct: 1,
            explanation: "High precision (95%) means when the model predicts this category, it is usually right. Low recall (60%) means the model is missing 40% of true instances of this category — those are false negatives. This often indicates insufficient or unvaried training images for that class."
          },
          {
            question: "What is the minimum recommended number of labeled images per tag when training a Custom Vision classification model?",
            answers: [
              "5 images",
              "15 images",
              "50 images",
              "200 images"
            ],
            correct: 1,
            explanation: "Microsoft recommends at least 15 images per tag to train a Custom Vision model, with 50+ for production quality. The images should be varied in angle, lighting, background, and scale to improve model generalization."
          },
          {
            question: "After training and evaluating a Custom Vision model, what step is required before a client application can call it via API?",
            answers: [
              "Export the model to ONNX format",
              "Publish the iteration to a prediction resource endpoint",
              "Download the model weights and host them yourself",
              "Approve the model in the Azure portal compliance dashboard"
            ],
            correct: 1,
            explanation: "A trained Custom Vision model iteration must be published to a prediction resource before it exposes an API endpoint. Publishing makes the model available via the Prediction API URL with the prediction key."
          },
          {
            question: "You want to build a custom object detection model entirely through code (no portal) using the Custom Vision SDK. Which SDK operations are required in order?",
            answers: [
              "Create project → Upload and tag images → Train model → Publish iteration → Call prediction API",
              "Create project → Publish iteration → Upload images → Train model",
              "Upload images → Tag images → Deploy model → Create project",
              "Fine-tune a base model → Export → Deploy"
            ],
            correct: 0,
            explanation: "The code-first Custom Vision workflow requires: (1) create a project with object detection type, (2) upload and tag images with regions, (3) trigger training, (4) publish the trained iteration, (5) use the prediction endpoint."
          }
        ]
      },
      {
        title: "Video Analysis",
        questions: [
          {
            question: "A media company wants to automatically generate transcripts, identify key topics, and detect speakers from uploaded video content. Which Azure service is best suited for this?",
            answers: [
              "Azure AI Vision Spatial Analysis",
              "Azure Media Services",
              "Azure AI Video Indexer",
              "Azure AI Speech batch transcription"
            ],
            correct: 2,
            explanation: "Azure AI Video Indexer provides comprehensive video insights including automatic transcription, speaker identification, topic detection, face detection, OCR, sentiment analysis, and keyframe extraction — all without custom model training."
          },
          {
            question: "When using Azure AI Video Indexer, how do you retrieve the insights generated from an indexed video?",
            answers: [
              "Download a PDF report from the portal",
              "Call the Video Indexer REST API with the video ID to get the JSON insights",
              "Subscribe to an Azure Event Grid event",
              "Query an automatically created Azure AI Search index"
            ],
            correct: 1,
            explanation: "After a video is indexed, you call the Video Indexer REST API (GET /Videos/{videoId}/Index) with the account ID and access token to retrieve the full JSON insights object containing all extracted metadata."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 5 — Natural Language Processing Solutions (15-20%)
  // ─────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Natural Language Processing",
    description: "Text analysis, translation, speech, custom language models, and question answering (15–20%)",
    lessons: [
      {
        title: "Text Analysis with Azure AI Language",
        questions: [
          {
            question: "A healthcare application needs to identify and redact patient names, dates of birth, and phone numbers from clinical notes. Which Azure AI Language feature is most appropriate?",
            answers: [
              "Key phrase extraction",
              "Named entity recognition (NER)",
              "Personally identifiable information (PII) detection and redaction",
              "Sentiment analysis"
            ],
            correct: 2,
            explanation: "The PII detection feature in Azure AI Language identifies and can optionally redact entities like person names, dates, phone numbers, addresses, and medical record numbers. It includes a Healthcare PII variant with medical-specific entities."
          },
          {
            question: "You submit a document to Azure AI Language sentiment analysis and receive a sentiment of 'mixed' at the document level but 'negative' at the sentence level for two out of five sentences. What does this indicate?",
            answers: [
              "An error in the API response",
              "The document contains both positive and negative sentiment across different sentences, resulting in a mixed overall score",
              "The model could not determine sentiment for the document",
              "The language was not detected correctly"
            ],
            correct: 1,
            explanation: "Sentiment analysis operates at both document and sentence levels. A document can be labeled 'mixed' when it contains sentences with differing sentiments (some positive, some negative). The sentence-level scores help identify which parts are negative."
          },
          {
            question: "Azure AI Language's named entity recognition (NER) returns an entity with category 'Organization' and subcategory 'Medical'. What does this tell you?",
            answers: [
              "The entity is a drug name",
              "The text contains a mention of a medical organization (e.g., a hospital or clinic)",
              "The entity is a medical procedure",
              "The document is classified as a medical record"
            ],
            correct: 1,
            explanation: "NER categorizes recognized entities by type. Category 'Organization' with subcategory 'Medical' indicates a named medical organization such as a hospital, clinic, or healthcare company was found in the text."
          }
        ]
      },
      {
        title: "Translation with Azure AI Translator",
        questions: [
          {
            question: "You need to translate product documentation from English into 20 languages while preserving the HTML formatting tags. Which Azure AI Translator feature handles this correctly?",
            answers: [
              "The standard text translation endpoint with textType=html",
              "The document translation feature, which processes entire documents and preserves formatting",
              "Azure AI Language with language detection",
              "Azure OpenAI with a multilingual translation prompt"
            ],
            correct: 1,
            explanation: "Document translation is a Translator feature that processes complete documents (Word, PDF, HTML, etc.) asynchronously, preserving the original document structure and formatting while translating content into target languages."
          },
          {
            question: "What is a custom translation model in Azure AI Translator used for?",
            answers: [
              "Translating between languages not supported by the standard service",
              "Improving translation quality for domain-specific terminology (e.g., legal, medical, technical) by training on parallel sentence pairs from your domain",
              "Enabling real-time translation of audio",
              "Reducing costs by caching frequently translated phrases"
            ],
            correct: 1,
            explanation: "Custom Translator allows you to train a model on your own parallel (source + target) sentence pairs. This improves quality for industry-specific vocabulary and phrasing that the base model may not handle optimally."
          }
        ]
      },
      {
        title: "Speech Processing with Azure AI Speech",
        questions: [
          {
            question: "You want the text-to-speech output of your application to speak numbers as words (e.g., '42' as 'forty-two') and add a pause after each sentence. Which technology allows fine-grained control of synthesized speech?",
            answers: [
              "Phoneme substitution tables",
              "Speech Synthesis Markup Language (SSML)",
              "Neural text-to-speech default voice settings",
              "Azure AI Language text normalization"
            ],
            correct: 1,
            explanation: "SSML (Speech Synthesis Markup Language) is an XML-based markup that allows fine-grained control of speech synthesis including prosody (rate, pitch, volume), pauses (<break>), number pronunciation, phoneme specification, and voice selection."
          },
          {
            question: "A call center application uses Azure AI Speech to transcribe customer calls in real time. Some industry-specific terms are being recognized incorrectly. What should you configure?",
            answers: [
              "Increase the audio sample rate",
              "A custom speech model trained on domain-specific audio and transcripts",
              "Switch from real-time to batch transcription",
              "Enable profanity filtering"
            ],
            correct: 1,
            explanation: "Custom speech lets you train a speech recognition model on domain-specific audio and transcription data. This improves recognition accuracy for specialized vocabulary, acronyms, and speaking styles common in your industry."
          },
          {
            question: "Which Azure AI Speech feature enables you to identify the action a user intends (e.g., 'turn on lights' → TurnOnDevice intent) from spoken input?",
            answers: [
              "Speech-to-text with keyword recognition",
              "Intent recognition, which integrates speech recognition with a CLU or LUIS language model",
              "Speaker recognition",
              "Pronunciation assessment"
            ],
            correct: 1,
            explanation: "Intent recognition combines Azure AI Speech recognition with a language understanding model (CLU/LUIS) to both transcribe speech and classify the intent in a single call, enabling voice-controlled applications."
          }
        ]
      },
      {
        title: "Custom Language Models and Question Answering",
        questions: [
          {
            question: "You are building a Conversational Language Understanding (CLU) model. After training, the model correctly predicts an intent but identifies the wrong span of text as the entity. What should you do?",
            answers: [
              "Add more intents to the model",
              "Review and correct entity labels in the training utterances, then retrain and re-evaluate",
              "Lower the confidence threshold for entity extraction",
              "Increase the number of deployment slots"
            ],
            correct: 1,
            explanation: "Entity labeling quality directly affects span extraction accuracy. Review utterances where the entity is mislabeled, correct them in the Language Studio, add more varied examples, retrain the model, and re-evaluate to confirm improvement."
          },
          {
            question: "In a custom question answering project, a user asks a question but the returned answer is from the wrong FAQ document. Which feature helps guide the system toward the correct answer with follow-up questions?",
            answers: [
              "Chit-chat personality",
              "Multi-turn conversation (follow-up prompts)",
              "Alternate phrasing",
              "Confidence threshold adjustment"
            ],
            correct: 1,
            explanation: "Multi-turn conversation allows you to define follow-up prompts on Q&A pairs. When a question is ambiguous, the system can present clarifying options to the user. These prompts create a tree structure of related questions and answers."
          },
          {
            question: "You need to provide a question answering service in 15 different languages using the same knowledge base content. What does Azure AI Language custom question answering provide for this scenario?",
            answers: [
              "You must create 15 separate projects, one per language",
              "Multi-language question answering — a single project can be configured to support multiple languages and detect the query language automatically",
              "Azure AI Translator must be used to pre-translate all queries to English before querying",
              "Language detection is not supported in question answering"
            ],
            correct: 1,
            explanation: "Azure AI Language custom question answering supports multi-language projects where content is stored in multiple languages and the service automatically detects the language of the incoming query and matches it to the appropriate language content."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 6 — Knowledge Mining and Information Extraction (15-20%)
  // ─────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Knowledge Mining & Information Extraction",
    description: "Azure AI Search, Document Intelligence, and Content Understanding (15–20%)",
    lessons: [
      {
        title: "Azure AI Search — Index and Skillsets",
        questions: [
          {
            question: "In Azure AI Search, what is the purpose of a 'skillset'?",
            answers: [
              "A set of Azure RBAC roles assigned to search developers",
              "A pipeline of AI enrichment steps applied to documents during indexing (e.g., OCR, entity recognition, sentiment)",
              "A collection of query templates for the search index",
              "A configuration file that maps index fields to data source columns"
            ],
            correct: 1,
            explanation: "A skillset defines an ordered pipeline of cognitive skills (built-in or custom) applied during document indexing. Each skill receives inputs and produces outputs that are passed to subsequent skills or stored in the index, enriching documents with AI-extracted metadata."
          },
          {
            question: "A custom skill in Azure AI Search is implemented as an Azure Function. What format must the function accept and return?",
            answers: [
              "Plain text input and output",
              "A JSON payload with a 'values' array of record objects (each with 'recordId', 'data', and optionally 'errors'/'warnings')",
              "A CSV file upload",
              "An XML document conforming to the OASIS standard"
            ],
            correct: 1,
            explanation: "Custom skills in Azure AI Search must conform to the custom skill interface: they accept a JSON body with a 'values' array where each element has a recordId and data inputs, and they must return a JSON response with the same structure containing output data for each record."
          },
          {
            question: "You want users to search your document index and get results ranked by semantic relevance rather than just keyword frequency. What must you configure on your Azure AI Search index?",
            answers: [
              "Enable geographic filtering on the index",
              "Configure a semantic configuration and use semantic ranking in queries",
              "Add a scoring profile with freshness boosting",
              "Switch the indexer to use the Push API"
            ],
            correct: 1,
            explanation: "Semantic ranking in Azure AI Search uses language models to re-rank results by semantic relevance. You must define a semantic configuration (specifying which fields contain titles, keywords, and content) and use queryType=semantic in your query."
          },
          {
            question: "What is the 'Knowledge Store' feature in Azure AI Search?",
            answers: [
              "A separate Azure Cognitive Search tier for large indexes",
              "A destination where enriched content from the skillset pipeline can be persisted as projections (tables, objects, or files) in Azure Storage for downstream use",
              "An embedded vector database for storing embeddings",
              "A built-in QA system on top of the search index"
            ],
            correct: 1,
            explanation: "The Knowledge Store lets you persist enriched documents created during indexing into Azure Storage as tables, JSON objects, or files. This allows downstream applications, analytics tools, or ML pipelines to consume the AI-enriched data independently of the search index."
          },
          {
            question: "You need to search an Azure AI Search index for all documents where the 'price' field is between 100 and 500 AND the 'category' field equals 'electronics'. Which query syntax supports filtering?",
            answers: [
              "Simple query syntax with a keyword string",
              "OData filter expression using $filter with range and equality operators",
              "Lucene regex queries",
              "Full-text semantic search only"
            ],
            correct: 1,
            explanation: "Azure AI Search uses OData $filter expressions for structured filtering. The filter $filter=price ge 100 and price le 500 and category eq 'electronics' combines a range filter with an equality check and is applied before or after full-text scoring."
          }
        ]
      },
      {
        title: "Azure Document Intelligence",
        questions: [
          {
            question: "Which Azure Document Intelligence prebuilt model would you use to extract vendor name, invoice date, invoice total, and line items from supplier invoices?",
            answers: [
              "prebuilt-read",
              "prebuilt-layout",
              "prebuilt-invoice",
              "prebuilt-businessCard"
            ],
            correct: 2,
            explanation: "The prebuilt-invoice model is specifically trained to identify and extract fields common to invoices including vendor name, customer name, invoice ID, invoice date, due date, line items, subtotals, taxes, and totals."
          },
          {
            question: "You need to extract data from a proprietary order form that has a unique layout not covered by any prebuilt model. Which Document Intelligence approach should you use?",
            answers: [
              "Use prebuilt-read to extract all text and parse it manually",
              "Train a custom extraction model using labeled samples of your order forms",
              "Use Azure AI Vision OCR and write custom parsing logic",
              "Submit the forms to Azure AI Language for entity extraction"
            ],
            correct: 1,
            explanation: "When prebuilt models don't match your document type, you train a custom Document Intelligence extraction model. You provide labeled samples (5-15+ documents with field annotations), train the model, and it learns to extract your specific fields from new documents."
          },
          {
            question: "Your organization processes invoices from 10 different vendors, each with a different layout. You want a single API call to handle all layouts. What Document Intelligence feature enables this?",
            answers: [
              "A composed model that combines multiple custom models for different layouts under a single model ID",
              "A batch processing job with layout auto-detection",
              "The prebuilt-invoice model handles all layouts automatically",
              "Train one custom model on all 10 invoice types mixed together"
            ],
            correct: 0,
            explanation: "A composed model in Azure Document Intelligence combines multiple custom models (each trained on a specific document type/layout) into a single model ID. When you analyze a document, the service automatically routes it to the best-matching component model."
          }
        ]
      },
      {
        title: "Azure Content Understanding in Foundry Tools",
        questions: [
          {
            question: "Azure Content Understanding in Foundry Tools can process which types of content in a single pipeline?",
            answers: [
              "Text and images only",
              "Documents, images, videos, and audio",
              "Structured database records only",
              "Only PDF and Word documents"
            ],
            correct: 1,
            explanation: "Azure Content Understanding (in Foundry Tools) is a multimodal ingestion pipeline that can process documents, images, videos, and audio files — extracting text, entities, tables, images, summaries, and classifications from each content type."
          },
          {
            question: "You want to extract all tables, entity mentions, and embedded images from a batch of research PDFs and store them for downstream analysis. Which Content Understanding operation supports this?",
            answers: [
              "OCR-only pipeline with table detection",
              "Extract entities, tables, and images from documents using the Content Understanding ingestion pipeline",
              "Azure AI Search indexer with layout skill",
              "Azure Document Intelligence prebuilt-layout"
            ],
            correct: 1,
            explanation: "Azure Content Understanding provides a comprehensive extraction pipeline that can simultaneously extract structured elements — tables, entity mentions, and embedded images — from documents in a single pass, making them available for downstream consumption."
          }
        ]
      }
    ]
  }
]

function isModuleCompleted(moduleId, completedLessons) {
  const mod = modules.find(m => m.id === moduleId)
  return mod.lessons.every((_, index) => completedLessons.includes(`${moduleId}-${index}`))
}

function isModuleUnlocked(moduleIndex, completedLessons) {
  if (moduleIndex === 0) return true
  return isModuleCompleted(modules[moduleIndex - 1].id, completedLessons)
}

function isLessonUnlocked(moduleId, lessonIndex, completedLessons) {
  if (moduleId === 1 && lessonIndex === 0) return true
  if (lessonIndex > 0) return completedLessons.includes(`${moduleId}-${lessonIndex - 1}`)
  const moduleIndex = modules.findIndex(m => m.id === moduleId)
  if (moduleIndex > 0) return isModuleCompleted(modules[moduleIndex - 1].id, completedLessons)
  return false
}

function getTotalProgress(completedLessons) {
  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
  return (completedLessons.length / totalLessons) * 100
}

function LessonPath({ userData, onStartLesson }) {
  const { completedLessons } = userData

  // Build a flat ordered list of all path nodes (modules + their lessons interleaved)
  const allNodes = []
  modules.forEach((mod, modIndex) => {
    const isModLocked = !isModuleUnlocked(modIndex, completedLessons)
    const isModCompleted = isModuleCompleted(mod.id, completedLessons)
    allNodes.push({ type: 'module', mod, isLocked: isModLocked, isCompleted: isModCompleted })
    mod.lessons.forEach((lesson, lessonIndex) => {
      const lessonCompleted = completedLessons.includes(`${mod.id}-${lessonIndex}`)
      const lessonLocked = !isLessonUnlocked(mod.id, lessonIndex, completedLessons)
      allNodes.push({ type: 'lesson', lesson, mod, lessonIndex, isCompleted: lessonCompleted, isLocked: lessonLocked })
    })
  })

  return (
    <div className="vertical-path">
      {allNodes.map((node, index) => {
        const isLast = index === allNodes.length - 1

        if (node.type === 'module') {
          return (
            <div key={`mod-${node.mod.id}`} className="vp-row">
              <div className="vp-node-col">
                <div className={`vp-node vp-module-node ${node.isCompleted ? 'vp-completed' : node.isLocked ? 'vp-locked' : 'vp-available'}`}>
                  {node.isLocked ? '🔒' : node.isCompleted ? '✓' : node.mod.id}
                </div>
                {!isLast && <div className={`vp-connector ${node.isCompleted ? 'vp-connector-done' : ''}`} />}
              </div>
              <div className={`vp-label vp-module-label ${node.isLocked ? 'vp-label-locked' : ''}`}>
                <div className="vp-module-title">{node.mod.title}</div>
                <div className="vp-module-desc">{node.mod.description}</div>
              </div>
            </div>
          )
        } else {
          return (
            <div
              key={`lesson-${node.mod.id}-${node.lessonIndex}`}
              className={`vp-row ${!node.isLocked ? 'vp-row-clickable' : ''}`}
              onClick={() => !node.isLocked && onStartLesson(node.mod.id, node.lessonIndex)}
            >
              <div className="vp-node-col">
                <div className={`vp-node vp-lesson-node ${node.isCompleted ? 'vp-completed' : node.isLocked ? 'vp-locked' : 'vp-available'}`}>
                  {node.isCompleted ? '✓' : node.lessonIndex + 1}
                </div>
                {!isLast && <div className={`vp-connector ${node.isCompleted ? 'vp-connector-done' : ''}`} />}
              </div>
              <div className={`vp-label vp-lesson-label ${node.isLocked ? 'vp-label-locked' : ''}`}>
                <div className="vp-lesson-title">{node.lesson.title}</div>
                {node.isCompleted && <span className="vp-badge-done">Completed</span>}
                {!node.isLocked && !node.isCompleted && <span className="vp-badge-start">Start →</span>}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

function QuizView({ mod, lesson, onComplete, onBack }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [xpGained, setXpGained] = useState(0)

  const question = lesson.questions[questionIndex]

  function handleSelectAnswer(index) {
    if (answered) return
    setSelectedAnswer(index)
  }

  function handleCheckAnswer() {
    if (selectedAnswer === null) return
    setAnswered(true)
    if (selectedAnswer === question.correct) {
      setScore(s => s + 1)
    }
  }

  function handleNext() {
    if (questionIndex + 1 < lesson.questions.length) {
      setQuestionIndex(i => i + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      const finalScore = selectedAnswer === question.correct ? score + 1 : score
      const xp = finalScore * 10
      setXpGained(xp)
      setShowResult(true)
      onComplete(xp)
    }
  }

  function getAnswerClass(index) {
    const classes = ['answer']
    if (!answered) {
      if (index === selectedAnswer) classes.push('selected')
    } else {
      if (index === question.correct) classes.push('correct')
      else if (index === selectedAnswer) classes.push('incorrect')
    }
    return classes.join(' ')
  }

  if (showResult) {
    const percentage = (xpGained / 10 / lesson.questions.length) * 100
    let icon, title, message
    if (percentage === 100) {
      icon = '🎉'; title = 'Perfect!'; message = 'You got all questions correct!'
    } else if (percentage >= 70) {
      icon = '🌟'; title = 'Great Job!'; message = `You got ${xpGained / 10} out of ${lesson.questions.length} correct!`
    } else {
      icon = '💪'; title = 'Keep Practicing!'; message = `You got ${xpGained / 10} out of ${lesson.questions.length} correct. Try again to master this lesson!`
    }

    return (
      <div className="result-modal">
        <div className="result-content">
          <div className="result-icon">{icon}</div>
          <div className="result-title">{title}</div>
          <div className="result-message">{message}</div>
          <div className="xp-gained">+{xpGained} XP</div>
          <button className="btn btn-primary" onClick={onBack}>Continue Learning</button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <button className="back-button" onClick={onBack}>← Back to Lessons</button>
      <div className="quiz-header">
        <div className="quiz-title">{lesson.title}</div>
        <div className="quiz-progress">Question {questionIndex + 1} of {lesson.questions.length}</div>
      </div>
      <div className="question-card">
        <div className="question-text">{question.question}</div>
        <div className="answers">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className={getAnswerClass(index)}
              onClick={() => handleSelectAnswer(index)}
              disabled={answered}
            >
              {answer}
            </button>
          ))}
        </div>
        {answered && (
          <div className="explanation">
            <div className="explanation-title">💡 Explanation</div>
            <div className="explanation-text">{question.explanation}</div>
          </div>
        )}
      </div>
      <div className="quiz-actions">
        {!answered && (
          <button
            className="btn btn-primary"
            onClick={handleCheckAnswer}
            disabled={selectedAnswer === null}
          >
            Check Answer
          </button>
        )}
        {answered && (
          <button className="btn btn-secondary" onClick={handleNext}>
            Continue
          </button>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem('azureAITrainer')) || {
      streak: 0,
      xp: 0,
      lastVisit: null,
      completedLessons: []
    }
  })
  const [activeLesson, setActiveLesson] = useState(null)

  useEffect(() => {
    setUserData(prev => {
      const today = new Date().toDateString()
      if (prev.lastVisit === today) return prev

      let streak = prev.streak
      if (prev.lastVisit === new Date(Date.now() - 86400000).toDateString()) {
        streak++
      } else if (prev.lastVisit) {
        streak = 1
      } else {
        streak = 1
      }

      const updated = { ...prev, streak, lastVisit: today }
      localStorage.setItem('azureAITrainer', JSON.stringify(updated))
      return updated
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('azureAITrainer', JSON.stringify(userData))
  }, [userData])

  function handleStartLesson(moduleId, lessonIndex) {
    const mod = modules.find(m => m.id === moduleId)
    setActiveLesson({ mod, lessonIndex })
  }

  function handleLessonComplete(xp) {
    const { mod, lessonIndex } = activeLesson
    const lessonId = `${mod.id}-${lessonIndex}`
    setUserData(prev => {
      const completedLessons = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId]
      return { ...prev, completedLessons, xp: prev.xp + xp }
    })
  }

  function handleBack() {
    setActiveLesson(null)
  }

  const progress = getTotalProgress(userData.completedLessons)

  return (
    <div className="container">
      <div className="header">
        <div className="header-top">
          <div className="logo">
            <span>☁️</span>
            <span>Azure AI Trainer — AI-102</span>
          </div>
          <div className="stats">
            <div className="stat streak">
              <span className="stat-icon">🔥</span>
              <span>{userData.streak}</span>
            </div>
            <div className="stat xp">
              <span className="stat-icon">⭐</span>
              <span>{userData.xp}</span>
            </div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="main-content">
        {activeLesson ? (
          <QuizView
            mod={activeLesson.mod}
            lesson={activeLesson.mod.lessons[activeLesson.lessonIndex]}
            onComplete={handleLessonComplete}
            onBack={handleBack}
          />
        ) : (
          <LessonPath userData={userData} onStartLesson={handleStartLesson} />
        )}
      </div>
    </div>
  )
}
