// MODULE 5 — Natural Language Processing Solutions (15-20%)
export default {
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
}
