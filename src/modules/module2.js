// MODULE 2 — Implement Generative AI Solutions (15-20%)
export default {
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
}
