// MODULE 1 — Plan and manage an Azure AI solution (20-25%)
export default {
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
}
