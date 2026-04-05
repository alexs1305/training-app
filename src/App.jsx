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

const baseModules = [
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
        ],
        variantQuestions: [
          {
            question: "Which Azure AI service is specifically designed to extract structured fields — such as totals, dates, and line items — from supplier invoices?",
            answers: [
              "Azure AI Vision (image analysis)",
              "Azure Document Intelligence",
              "Azure AI Search with enrichment",
              "Azure AI Language NER"
            ],
            correct: 1,
            explanation: "Azure Document Intelligence includes prebuilt models (such as prebuilt-invoice) that extract structured fields from documents. It is purpose-built for document understanding, unlike Vision (general image analysis) or Language (text-level NLP)."
          },
          {
            question: "A customer service team needs English-speaking agents to be instantly heard in the customer's native language during live calls. Which Azure service makes real-time speech translation possible?",
            answers: [
              "Azure AI Translator with batch audio input",
              "Azure AI Speech with speech translation",
              "Azure OpenAI GPT-4o with audio input",
              "Azure AI Language text translation"
            ],
            correct: 1,
            explanation: "Azure AI Speech provides real-time speech translation that can transcribe and translate spoken audio from one language and synthesize the output in another language, enabling live multilingual conversations."
          },
          {
            question: "An enterprise wants employees to search a large internal document library, with AI automatically tagging documents with detected entities and sentiment. Which Azure service should form the core of this solution?",
            answers: [
              "Azure Blob Storage with Azure AI Language",
              "Azure AI Search with a built-in AI skillset",
              "Azure OpenAI embeddings stored in Cosmos DB",
              "Azure AI Language standalone API"
            ],
            correct: 1,
            explanation: "Azure AI Search orchestrates a skillset enrichment pipeline that applies OCR, entity recognition, key phrase extraction, and sentiment analysis during indexing — producing AI-enriched, searchable document collections."
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
        ],
        variantQuestions: [
          {
            question: "An Azure AI container is deployed on a factory floor without direct internet access. Which statement correctly describes the billing implication?",
            answers: [
              "Billing is waived for air-gapped edge deployments",
              "The container must periodically reach Azure over the internet to send usage/billing telemetry",
              "Billing is calculated locally and reconciled monthly offline",
              "Containers are billed by compute hours, not API usage"
            ],
            correct: 1,
            explanation: "Even when running locally, Azure AI service containers must maintain internet connectivity to report metered usage to Azure. Without this, the container will eventually refuse to process requests."
          },
          {
            question: "Your DevOps team wants GitHub Actions to deploy Azure AI resources without any long-lived secrets stored in the repository. Which authentication mechanism achieves this?",
            answers: [
              "GitHub repository secrets containing the Azure subscription key",
              "Workload identity federation (OIDC) using a managed identity or service principal",
              "A service principal client secret retrieved from Azure Key Vault at runtime",
              "A hard-coded access token refreshed daily by a scheduled job"
            ],
            correct: 1,
            explanation: "Workload identity federation allows GitHub Actions to exchange a GitHub OIDC token for an Azure access token with no long-lived secrets stored anywhere. This is Microsoft's recommended approach for CI/CD pipelines."
          },
          {
            question: "A new team member needs to create identical Azure AI resource configurations in a new region. Which tool ensures the configuration is exactly reproducible?",
            answers: [
              "Manually copy settings from the Azure portal",
              "Define the resource as an ARM template or Bicep file and deploy it",
              "Export from the existing region using the Azure CLI cp command",
              "Use Azure Data Factory to clone the resource"
            ],
            correct: 1,
            explanation: "ARM templates and Bicep files define Azure resources as code, making deployments fully repeatable and version-controlled. This is the infrastructure-as-code best practice for consistent multi-environment deployments."
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
        ],
        variantQuestions: [
          {
            question: "An Azure App Service application calls Azure AI services. To avoid storing credentials anywhere, which authentication approach should you configure?",
            answers: [
              "Store the API key encrypted in app settings",
              "Assign a managed identity to the App Service and grant it Cognitive Services User role",
              "Use a service principal client secret referenced from a config file",
              "Generate a SAS token from Key 1 on every request"
            ],
            correct: 1,
            explanation: "A managed identity provides a credential-free way for Azure resources to authenticate. Assigning one to the App Service and granting it the Cognitive Services User role means the app never holds or manages a secret."
          },
          {
            question: "You suspect Key 1 of an Azure AI resource was exposed in a log file. How should you remediate this without interrupting live applications that currently use Key 1?",
            answers: [
              "Regenerate both keys simultaneously so the old key stops working immediately",
              "Update all applications to use Key 2 first, then regenerate Key 1",
              "Delete and recreate the entire Azure AI resource",
              "Temporarily disable the resource while rotating the key"
            ],
            correct: 1,
            explanation: "Azure AI services provide two keys to enable zero-downtime rotation. The safe procedure is: move apps to Key 2, then regenerate Key 1. Apps continue working on Key 2 throughout the rotation."
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
        ],
        variantQuestions: [
          {
            question: "You want to prevent an Azure OpenAI-powered assistant from returning violent or hate-filled content to users. Which Azure service provides configurable content filters for this purpose?",
            answers: [
              "Azure Monitor with custom alert rules on response text",
              "Azure AI Content Safety with content filters and blocklists",
              "Azure Policy deny assignments on the OpenAI endpoint",
              "Microsoft Defender for Cloud threat detection"
            ],
            correct: 1,
            explanation: "Azure AI Content Safety provides content filters that classify and block harmful categories (hate, violence, sexual content, self-harm) in both inputs and outputs. Custom blocklists let you add domain-specific forbidden terms."
          },
          {
            question: "A recruitment tool consistently ranks candidates from one gender lower than equally qualified candidates of another gender. Which Microsoft Responsible AI principle is being violated?",
            answers: [
              "Reliability & Safety — the system is not behaving predictably",
              "Fairness — the system is discriminating across demographic groups",
              "Privacy & Security — personal data is being misused",
              "Transparency — the model's decision process is not explained"
            ],
            correct: 1,
            explanation: "The Fairness principle requires AI systems to avoid reinforcing societal biases or discriminating against people based on characteristics such as gender, race, age, or disability."
          },
          {
            question: "A user crafts a message designed to make an AI assistant ignore its system instructions and reveal confidential data. Which Azure AI Content Safety feature is designed to detect this attack?",
            answers: [
              "Content filters for violence and hate speech",
              "Prompt shields for jailbreak and prompt injection detection",
              "Groundedness evaluation in Azure AI Foundry",
              "Azure Monitor anomaly detection on token usage"
            ],
            correct: 1,
            explanation: "Prompt shields detect jailbreak attempts (adversarial prompts trying to override system instructions) and prompt injection attacks (malicious content injected via user input). They are a distinct feature from content category filters."
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
        ],
        variantQuestions: [
          {
            question: "Your operations team wants an automatic notification whenever an Azure AI service's error rate spikes above a threshold in a given time window. Which Azure capability should they configure?",
            answers: [
              "An Azure Cost Management budget alert",
              "An Azure Monitor metric alert rule on the AI service resource",
              "An Azure Advisor recommendation policy",
              "A Microsoft Defender for Cloud security alert"
            ],
            correct: 1,
            explanation: "Azure Monitor metric alerts watch a specific metric (such as failed call count) on an Azure resource and trigger notifications when thresholds are breached. This is distinct from cost alerts, which track spending, not errors."
          },
          {
            question: "A data engineer needs to write a query to identify the top 10 slowest requests to an Azure AI service over the past 7 days. Which Azure tool supports this type of log analysis?",
            answers: [
              "Azure Monitor Metrics Explorer (chart-based metric visualization)",
              "Azure Log Analytics with Kusto Query Language (KQL)",
              "Azure Cost Management usage reports",
              "Azure Activity Log filtered export"
            ],
            correct: 1,
            explanation: "Azure Log Analytics stores diagnostic log data and supports KQL queries for deep analysis. You can filter, group, sort, and aggregate log records to find patterns like the slowest requests, authentication failures, or high-latency calls."
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
        ],
        variantQuestions: [
          {
            question: "A developer sets temperature=0 when calling an Azure OpenAI completion endpoint. What effect does this have on the model output?",
            answers: [
              "The model generates no output",
              "The model nearly always picks the highest-probability token, producing highly consistent output",
              "The model generates maximum creative and varied output",
              "The model switches to the smallest available deployment"
            ],
            correct: 1,
            explanation: "Temperature=0 makes the model select the highest-probability token at each step, producing nearly deterministic, consistent responses. Higher temperatures increase randomness and creativity."
          },
          {
            question: "A developer needs Azure OpenAI to generate product images from text descriptions. Which model family should they deploy?",
            answers: [
              "GPT-4o (multimodal text and image understanding)",
              "text-embedding-ada-002 (for generating visual embeddings)",
              "DALL-E (image generation from text prompts)",
              "Whisper (audio and visual tasks)"
            ],
            correct: 2,
            explanation: "DALL-E is the Azure OpenAI model family for generating images from text descriptions. GPT-4o processes both text and images as inputs but does not generate images; Whisper handles speech; text-embedding-ada-002 generates text vectors."
          },
          {
            question: "You want an Azure OpenAI chatbot to always respond in the tone of a polite insurance expert, regardless of the user's message. Where in the Chat Completions API should this instruction be placed?",
            answers: [
              "In the first 'user' message at the start of the conversation",
              "In the 'system' role message",
              "In an 'assistant' message that precedes the user turn",
              "In the 'temperature' parameter"
            ],
            correct: 1,
            explanation: "The 'system' message establishes the model's persona, tone, and persistent rules before any user turn. It acts as standing instructions that apply throughout the conversation."
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
        ],
        variantQuestions: [
          {
            question: "A product chatbot hallucinates answers not found in your company documentation. You need it to answer only from your documents without retraining the model. Which pattern should you adopt?",
            answers: [
              "Fine-tune the base model on your entire documentation corpus",
              "Implement Retrieval-Augmented Generation (RAG) so relevant documents are injected into each prompt",
              "Lower the model temperature to 0.1 to reduce creativity",
              "Increase max_tokens to allow the model to include more context"
            ],
            correct: 1,
            explanation: "RAG retrieves relevant documents at query time and injects them as prompt context. This grounds the model's answers in your actual documentation without the cost and complexity of fine-tuning, and it keeps answers up-to-date as documents change."
          },
          {
            question: "In a RAG pipeline, documents are converted to vectors before indexing. What is the purpose of this vectorization step?",
            answers: [
              "It encrypts document content before storage for security",
              "It converts text into numerical representations that capture semantic meaning, enabling similarity-based retrieval",
              "It compresses documents to reduce storage costs",
              "It tokenizes documents for BM25 keyword search"
            ],
            correct: 1,
            explanation: "Vectorization (embedding) converts text into high-dimensional numerical vectors where semantically similar text is close together. This enables the retriever to find documents that are conceptually relevant to a query, even without exact keyword matches."
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
        ],
        variantQuestions: [
          {
            question: "You need GPT-4 to reliably output valid JSON. You've added instructions in the system message but the model still occasionally deviates. What additional technique most reliably enforces the format?",
            answers: [
              "Raise temperature to 2.0 to explore more output formats",
              "Include few-shot examples showing correct JSON input/output pairs alongside explicit format instructions",
              "Reduce max_tokens to force a shorter, simpler output",
              "Enable streaming mode so partial JSON can be parsed incrementally"
            ],
            correct: 1,
            explanation: "Few-shot prompting with concrete examples is the most reliable in-context format enforcement technique. Azure OpenAI also supports response_format: json_object for strict JSON output."
          },
          {
            question: "A company wants the model to consistently use their brand abbreviations and writing style without embedding a style guide in every prompt. What is the most efficient solution?",
            answers: [
              "Fine-tune the model on examples written in their brand voice",
              "Include the full style guide as a system message in every API call",
              "Use prompt chaining to review and rewrite every response",
              "Adjust temperature and top_p to match the brand's desired tone"
            ],
            correct: 0,
            explanation: "Fine-tuning bakes consistent style, tone, and vocabulary into the model weights. This is ideal when few-shot examples or system messages would be too lengthy or still produce inconsistent results."
          },
          {
            question: "A user asks the model to solve a multi-step algebra problem. Which prompting technique encourages the model to show its working before giving the final answer?",
            answers: [
              "Zero-shot prompting with a direct question",
              "Chain-of-thought prompting (e.g., 'think step by step')",
              "Few-shot prompting with final answers only",
              "Temperature reduction to eliminate randomness"
            ],
            correct: 1,
            explanation: "Chain-of-thought (CoT) prompting instructs the model to reason through problems incrementally. Phrases like 'think step by step' or providing worked examples significantly improve accuracy on multi-step reasoning tasks."
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
        ],
        variantQuestions: [
          {
            question: "Multiple product teams need to build separate AI solutions but share the same Azure networking, security policies, and AI service connections. What Azure AI Foundry resource structure supports this?",
            answers: [
              "Create a separate Hub per team so each team has full autonomy",
              "Create one Hub with multiple Projects — one per team — sharing the Hub's infrastructure",
              "Create a shared Azure AI Services multi-key resource and distribute keys to each team",
              "Use Azure Resource Group RBAC to partition a single workspace per team"
            ],
            correct: 1,
            explanation: "In Azure AI Foundry, a Hub provides shared governance and infrastructure. Multiple Projects within the Hub inherit that shared networking and security while each maintaining an isolated workspace for their team's development."
          },
          {
            question: "After deploying a RAG prompt flow, users report that answers often contain facts not present in any retrieved document. Which Azure AI Foundry evaluation metric quantifies this problem?",
            answers: [
              "Fluency — measures how natural and grammatically correct the output is",
              "Coherence — measures logical flow between sentences",
              "Groundedness — measures whether responses are supported by the retrieved context",
              "Similarity — measures closeness to a reference answer"
            ],
            correct: 2,
            explanation: "A low groundedness score indicates the model is generating content not found in the retrieved documents — a hallucination. Groundedness is the key metric to monitor in RAG systems."
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
        ],
        variantQuestions: [
          {
            question: "A developer wants a single Azure Vision API call to return both a list of detected objects with bounding boxes and a natural language caption of the scene. Which two visual features should they specify?",
            answers: [
              "Tags and Faces",
              "Objects and Caption",
              "Read and SmartCrops",
              "Categories and Description"
            ],
            correct: 1,
            explanation: "Azure Vision Image Analysis 4.0 supports requesting multiple visual features in one call. 'Objects' returns detected objects with bounding boxes; 'Caption' returns a generated natural language description of the image."
          },
          {
            question: "A shopping centre security team needs to monitor live CCTV feeds and alert staff when more than 50 people are present in a restricted area. Which Azure AI Vision capability is purpose-built for this?",
            answers: [
              "Custom Vision object detection model trained on crowd images",
              "Azure AI Video Indexer for post-recording analysis",
              "Spatial Analysis for real-time people detection and zone occupancy in video streams",
              "Image Analysis batch processing on captured frames"
            ],
            correct: 2,
            explanation: "Spatial Analysis is specifically designed for real-time video stream analysis, including zone-based people counting and movement tracking. Unlike batch or post-hoc analysis tools, it operates on live feeds."
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
        ],
        variantQuestions: [
          {
            question: "Your Custom Vision classification model achieves 92% precision but only 58% recall for the 'damaged' product category. What does the low recall tell you?",
            answers: [
              "The model over-predicts 'damaged' — too many false positives",
              "The model misses many genuinely damaged products — high false negatives for that class",
              "The 'damaged' class was excluded from the training dataset",
              "The model has too many training images for this class"
            ],
            correct: 1,
            explanation: "Recall measures the proportion of actual positives correctly identified. Low recall (58%) means the model is missing 42% of truly damaged products (false negatives), even though when it does predict 'damaged' it is usually right (high precision)."
          },
          {
            question: "After training a Custom Vision model, a developer calls the Prediction API endpoint but receives an HTTP 404 error. Which step was most likely skipped?",
            answers: [
              "The model was not exported to ONNX format before deployment",
              "The trained iteration was not published to a prediction resource endpoint",
              "The training images were uploaded in an unsupported format",
              "The confidence threshold was not set in the portal"
            ],
            correct: 1,
            explanation: "A trained Custom Vision iteration must be explicitly published to a prediction resource. Without publishing, no prediction endpoint URL exists, resulting in a 404 when attempting to call the API."
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
        ],
        variantQuestions: [
          {
            question: "A media production company wants to automatically generate speaker-labeled transcripts, extract key topics, and detect scene changes from thousands of uploaded video files. Which Azure service provides all of these capabilities without custom model training?",
            answers: [
              "Azure AI Speech batch transcription (transcription only, no video insights)",
              "Azure AI Video Indexer (comprehensive video AI insights out of the box)",
              "Azure Media Services with a custom processing pipeline",
              "Azure AI Language text analytics applied to manually extracted frames"
            ],
            correct: 1,
            explanation: "Azure AI Video Indexer provides comprehensive, built-in video insights including speech-to-text, speaker identification, topic detection, face detection, OCR, sentiment analysis, and keyframe extraction — all without custom training."
          },
          {
            question: "After Azure AI Video Indexer finishes processing a video, a developer needs to programmatically extract the list of identified speakers and their spoken segments. How should they retrieve this data?",
            answers: [
              "Download the auto-generated PDF transcript from the portal",
              "Call the Video Indexer REST API with the video ID to retrieve the full JSON insights",
              "Subscribe to an Azure Event Grid topic that emits speaker segments",
              "Query the Azure AI Search index automatically created during indexing"
            ],
            correct: 1,
            explanation: "Video insights are retrieved via the Video Indexer REST API (GET /Videos/{videoId}/Index). The response is a comprehensive JSON object containing all extracted metadata including speakers, topics, transcripts, and sentiment."
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
        ],
        variantQuestions: [
          {
            question: "A legal firm needs to share contracts with external reviewers but must first remove all names, addresses, and national ID numbers. Which Azure AI Language feature automates this?",
            answers: [
              "Sentiment analysis to detect sensitive content",
              "PII detection and redaction",
              "Key phrase extraction",
              "Custom named entity recognition"
            ],
            correct: 1,
            explanation: "The PII detection and redaction feature of Azure AI Language identifies personal data categories (names, addresses, phone numbers, ID numbers) and can replace them with placeholders, making documents safe to share."
          },
          {
            question: "An Azure AI Language NER response labels a span of text as category 'Organization', subcategory 'Medical'. Which type of entity was detected?",
            answers: [
              "A medication or pharmaceutical drug name",
              "A named medical institution such as a hospital, clinic, or healthcare company",
              "A medical procedure or clinical treatment",
              "A healthcare regulatory body or standard"
            ],
            correct: 1,
            explanation: "NER entity categories describe the type of real-world object mentioned. 'Organization / Medical' indicates a named healthcare institution — not a drug, procedure, or regulation."
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
        ],
        variantQuestions: [
          {
            question: "A company needs to translate thousands of Word and PDF product manuals from English into 12 languages while keeping original formatting, tables, and images intact. Which Azure AI Translator feature handles this?",
            answers: [
              "Standard text translation with textType=html to preserve markup",
              "Document translation, which processes full documents asynchronously and preserves layout",
              "Azure AI Language with language detection and Azure OpenAI for rewriting",
              "Batch text translation with manual post-processing to restore formatting"
            ],
            correct: 1,
            explanation: "Document translation processes complete documents (Word, PDF, HTML, etc.) while preserving the original document structure, tables, and formatting. It translates content without requiring manual layout reconstruction."
          },
          {
            question: "A pharmaceutical company finds the base Azure AI Translator produces poor results for drug names and clinical terminology. What should they implement?",
            answers: [
              "Switch to a different Azure region to access a more specialised base model",
              "Train a Custom Translator model on parallel (source/target) sentence pairs from their domain",
              "Enable real-time audio translation mode for better terminology handling",
              "Configure a custom blocklist to prevent mistranslation of specific terms"
            ],
            correct: 1,
            explanation: "Custom Translator lets you train on domain-specific parallel corpora. This significantly improves quality for specialised vocabulary — such as medical, legal, or technical terms — that the general base model may translate poorly."
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
        ],
        variantQuestions: [
          {
            question: "You want the text-to-speech output in your app to pause for 2 seconds between sections and pronounce '£42.50' as 'forty-two pounds fifty'. Which technology gives you this level of control?",
            answers: [
              "Phoneme substitution table configuration",
              "Speech Synthesis Markup Language (SSML) with prosody and say-as elements",
              "Default neural voice settings in the Azure portal",
              "Azure AI Language text normalization preprocessing"
            ],
            correct: 1,
            explanation: "SSML is an XML-based standard for controlling speech synthesis. It supports prosody (rate, pitch, volume), break elements for pauses, say-as for number/currency pronunciation, and voice selection — none of which are available through the plain text TTS endpoint."
          },
          {
            question: "A contact centre uses Azure AI Speech for real-time transcription, but the model struggles with industry jargon and product codes specific to the company. What is the recommended solution?",
            answers: [
              "Increase the audio sample rate to improve recognition accuracy",
              "Train a custom speech model on domain-specific audio and transcripts",
              "Switch from real-time transcription to batch processing",
              "Enable profanity filtering to remove ambiguous terms"
            ],
            correct: 1,
            explanation: "Custom speech lets you train a speech recognition model on your own audio samples and transcripts. This adapts the model to domain-specific vocabulary, product codes, and speaking styles not well-covered by the base model."
          },
          {
            question: "A smart home app needs to understand spoken commands such as 'set the thermostat to 22 degrees' and trigger the correct device action. Which Azure AI Speech feature maps spoken input to structured intents?",
            answers: [
              "Keyword recognition for wake-word detection",
              "Intent recognition integrated with a CLU language model",
              "Speaker verification for identity confirmation",
              "Pronunciation assessment for speech quality scoring"
            ],
            correct: 1,
            explanation: "Intent recognition combines speech-to-text with a CLU or LUIS language understanding model in a single API call. The spoken command is transcribed and the intent (e.g., SetThermostat) and entities (e.g., temperature=22) are extracted simultaneously."
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
        ],
        variantQuestions: [
          {
            question: "A CLU model predicts the correct intent for every test utterance but consistently extracts the wrong portion of text as the entity. What is the most effective corrective action?",
            answers: [
              "Add more distinct intents to the model to reduce ambiguity",
              "Review and correct entity span labels in the training utterances, then retrain",
              "Lower the entity confidence threshold to capture more candidates",
              "Increase the number of deployment slots to run multiple model versions"
            ],
            correct: 1,
            explanation: "Entity extraction accuracy depends on the quality and consistency of span labels in training data. Reviewing and correcting mislabeled examples — then retraining and re-evaluating — directly addresses span extraction errors."
          },
          {
            question: "Your question answering knowledge base is used by customers in English, French, and Spanish. What feature eliminates the need to maintain three separate projects?",
            answers: [
              "Automatic query pre-translation to English using Azure AI Translator",
              "Multi-language question answering — a single project detects the query language and matches it to the right content",
              "Three separate projects, one per language, each sharing the same knowledge base file",
              "Language detection is not supported — all queries must be in one language"
            ],
            correct: 1,
            explanation: "Azure AI Language custom question answering supports multi-language projects. Content can be stored in multiple languages, and the service automatically detects the query language and matches it to the appropriate content — no separate projects required."
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
        ],
        variantQuestions: [
          {
            question: "An indexer in Azure AI Search applies OCR, entity recognition, and key phrase extraction to uploaded PDFs before storing results. What is the component that orchestrates these AI enrichment steps called?",
            answers: [
              "An indexer pipeline stage",
              "A skillset",
              "A scoring profile",
              "A semantic configuration"
            ],
            correct: 1,
            explanation: "A skillset defines an ordered pipeline of cognitive skills applied during indexing. Each skill receives inputs and produces outputs passed to subsequent skills or mapped to index fields, enabling rich AI enrichment of documents."
          },
          {
            question: "Users search your Azure AI Search index for documents and expect results ranked by conceptual relevance rather than keyword frequency. What must be configured to achieve semantic ranking?",
            answers: [
              "A geographic filter applied to result documents",
              "A semantic configuration with semantic ranking enabled in queries",
              "A freshness boosting scoring profile",
              "An OData $orderby clause on a relevance field"
            ],
            correct: 1,
            explanation: "Semantic ranking uses language models to re-rank Azure AI Search results by semantic relevance. It requires a semantic configuration defining which fields contain titles, keywords, and content, and queries must use queryType=semantic."
          },
          {
            question: "Your AI enrichment pipeline produces structured tables, entity mentions, and image embeddings from document indexing. You want these enriched outputs available to a downstream analytics tool independent of the search index. Which Azure AI Search feature stores them in Azure Storage?",
            answers: [
              "A vector index projection",
              "The Knowledge Store",
              "Azure Synapse Analytics linked service",
              "An indexer output field mapping"
            ],
            correct: 1,
            explanation: "The Knowledge Store persists enriched content produced by the skillset pipeline as projections in Azure Storage — as tables, JSON objects, or files. This makes AI-enriched data independently consumable by analytics tools, ML pipelines, or dashboards."
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
        ],
        variantQuestions: [
          {
            question: "A finance team needs to automatically extract the vendor name, invoice date, total amount, and individual line items from hundreds of supplier invoices. Which Document Intelligence model is purpose-built for this?",
            answers: [
              "prebuilt-read — extracts plain text only",
              "prebuilt-layout — extracts document structure and tables",
              "prebuilt-invoice — extracts invoice-specific fields",
              "prebuilt-businessCard — extracts contact information"
            ],
            correct: 2,
            explanation: "The prebuilt-invoice model is trained specifically to identify and extract invoice fields: vendor name, customer name, invoice number, dates, line items, subtotals, taxes, and totals. prebuilt-read and prebuilt-layout do not provide this semantic field extraction."
          },
          {
            question: "A logistics company processes order forms from 6 different suppliers, each with a distinct layout. They want one API endpoint to handle all form types automatically. Which Document Intelligence approach enables this?",
            answers: [
              "Train a single custom model on all 6 layouts mixed together",
              "Use a composed model that combines separate custom models for each layout under one model ID",
              "Use the prebuilt-layout model, which detects form type automatically",
              "Submit all forms to a batch processing job with layout auto-selection"
            ],
            correct: 1,
            explanation: "A composed model aggregates multiple custom models — each trained for a specific layout — under a single model ID. The service routes each incoming document to the best-matching component model, enabling one API call to handle multiple form types."
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
        ],
        variantQuestions: [
          {
            question: "A research institution wants a single ingestion pipeline to process scientific PDFs, video lectures, and audio recordings — extracting text, tables, entities, and summaries from all content types. Which Azure service supports this multimodal extraction?",
            answers: [
              "Azure Document Intelligence prebuilt-layout (documents only)",
              "Azure Content Understanding in Foundry Tools (documents, images, video, and audio)",
              "Azure AI Search indexer with built-in cognitive skills (documents and images only)",
              "Azure AI Vision batch analysis (images and video only)"
            ],
            correct: 1,
            explanation: "Azure Content Understanding in Foundry Tools is a multimodal ingestion service that processes documents, images, videos, and audio in a single pipeline — extracting text, tables, entities, classifications, and summaries from all content types."
          },
          {
            question: "A data engineering team needs to extract all named entities, embedded images, and tabular data from a large batch of research PDFs in one automated pass. Which Azure Content Understanding operation achieves this?",
            answers: [
              "OCR-only pipeline with post-processing scripts for tables and images",
              "The Content Understanding ingestion pipeline, which extracts entities, tables, and images simultaneously",
              "Azure AI Search indexer using the layout cognitive skill",
              "Azure Document Intelligence prebuilt-layout for structural extraction"
            ],
            correct: 1,
            explanation: "The Azure Content Understanding ingestion pipeline extracts multiple element types — entities, tables, and embedded images — from documents in a single pass. This avoids the need to chain separate OCR, NER, and image extraction tools."
          }
        ]
      }
    ]
  }
]

// ============================================================
// REVISION LESSON GENERATION
// Randomly selects questions from all previous modules to
// create mixed-review lessons inserted into each module.
// ============================================================

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function createRevisionLesson(moduleIndex, allModules, revNumber) {
  const revisionPool = []
  for (let i = 0; i < moduleIndex; i++) {
    allModules[i].lessons.forEach(lesson => {
      // Prefer variant questions for revision — same knowledge, different phrasing
      // so users must retrieve understanding rather than recall a pattern
      const pool = (lesson.variantQuestions && lesson.variantQuestions.length > 0)
        ? lesson.variantQuestions
        : lesson.questions
      pool.forEach(q => revisionPool.push(q))
    })
  }
  const selected = shuffleArray(revisionPool).slice(0, 5)
  return {
    title: `Revision ${revNumber} — Mixed Review`,
    isRevision: true,
    questions: selected
  }
}

function buildModulesWithRevision(allBaseModules) {
  return allBaseModules.map((mod, index) => {
    if (index === 0) return mod // No revision for first module

    const rev1 = createRevisionLesson(index, allBaseModules, 1)
    const rev2 = createRevisionLesson(index, allBaseModules, 2)

    const lessons = [...mod.lessons]
    // Insert first revision at ~1/3 through the lesson list, second at ~2/3
    const pos1 = Math.max(1, Math.floor(lessons.length / 3))
    const pos2 = Math.max(pos1 + 1, Math.floor((2 * lessons.length) / 3) + 1)

    lessons.splice(pos2, 0, rev2)
    lessons.splice(pos1, 0, rev1)

    return { ...mod, lessons }
  })
}

const modules = buildModulesWithRevision(baseModules)

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
                <div className={`vp-node vp-lesson-node ${node.isCompleted ? 'vp-completed' : node.isLocked ? 'vp-locked' : 'vp-available'}${node.lesson.isRevision ? ' vp-revision' : ''}`}>
                  {node.isCompleted ? '✓' : node.lesson.isRevision ? '🔄' : node.lessonIndex + 1}
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
  const [questionQueue, setQuestionQueue] = useState(lesson.questions)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [incorrectQuestions, setIncorrectQuestions] = useState([])
  const [roundNumber, setRoundNumber] = useState(1)
  const [showRoundSummary, setShowRoundSummary] = useState(false)
  const [retryQueue, setRetryQueue] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [xpGained, setXpGained] = useState(0)

  const question = questionQueue[questionIndex]

  function handleSelectAnswer(index) {
    if (answered) return
    setSelectedAnswer(index)
  }

  function handleCheckAnswer() {
    if (selectedAnswer === null) return
    setAnswered(true)
    if (selectedAnswer !== question.correct) {
      setIncorrectQuestions(prev => [...prev, question])
    }
  }

  function handleNext() {
    if (questionIndex + 1 < questionQueue.length) {
      setQuestionIndex(i => i + 1)
      setSelectedAnswer(null)
      setAnswered(false)
      return
    }

    // End of round — incorrectQuestions is already updated by handleCheckAnswer
    if (incorrectQuestions.length === 0) {
      // All questions answered correctly — complete the lesson
      const xp = lesson.questions.length * 10
      setXpGained(xp)
      setShowResult(true)
      onComplete(xp)
    } else {
      // Some questions were wrong — show round summary and prepare retry
      setRetryQueue(incorrectQuestions)
      setShowRoundSummary(true)
    }
  }

  function handleRetry() {
    setQuestionQueue(retryQueue)
    setQuestionIndex(0)
    setSelectedAnswer(null)
    setAnswered(false)
    setIncorrectQuestions([])
    setRoundNumber(r => r + 1)
    setShowRoundSummary(false)
    setRetryQueue([])
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
    return (
      <div className="result-modal">
        <div className="result-content">
          <div className="result-icon">🎉</div>
          <div className="result-title">Perfect!</div>
          <div className="result-message">You answered all questions correctly!</div>
          <div className="xp-gained">+{xpGained} XP</div>
          <button className="btn btn-primary" onClick={onBack}>Continue Learning</button>
        </div>
      </div>
    )
  }

  if (showRoundSummary) {
    const correctInRound = questionQueue.length - retryQueue.length
    return (
      <div className="result-modal">
        <div className="result-content">
          <div className="result-icon">💪</div>
          <div className="result-title">Round {roundNumber} Complete!</div>
          <div className="result-message">
            You got {correctInRound} out of {questionQueue.length} correct.
            <br />
            {retryQueue.length} question{retryQueue.length !== 1 ? 's' : ''} need{retryQueue.length === 1 ? 's' : ''} more practice — keep going!
          </div>
          <button className="btn btn-primary" onClick={handleRetry}>Practice Missed Questions</button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <button className="back-button" onClick={onBack}>← Back to Lessons</button>
      <div className="quiz-header">
        <div className="quiz-title">{lesson.isRevision ? '🔄 ' : ''}{lesson.title}</div>
        <div className="quiz-progress">
          Question {questionIndex + 1} of {questionQueue.length}
          {roundNumber > 1 && <span className="retry-badge">Retry Round {roundNumber}</span>}
        </div>
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

  useEffect(() => {
    if ('setAppBadge' in navigator) {
      if (userData.streak > 0) {
        navigator.setAppBadge(userData.streak).catch(() => {})
      } else {
        navigator.clearAppBadge().catch(() => {})
      }
    }
  }, [userData.streak])

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
