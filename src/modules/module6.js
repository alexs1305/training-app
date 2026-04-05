// MODULE 6 — Knowledge Mining and Information Extraction (15-20%)
export default {
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
      ],
      variantQuestions: [
        {
          type: 'text-input',
          question: "In Azure AI Search, what is the name of the feature that persists AI-enriched content from the skillset pipeline into Azure Storage as tables, objects, or files for downstream analytics?",
          acceptedAnswers: ["Knowledge Store", "knowledge store", "the knowledge store", "The Knowledge Store"],
          explanation: "The Knowledge Store persists enriched content produced by the skillset pipeline as projections in Azure Storage — as tables, JSON objects, or files — making it independently consumable by analytics tools and ML pipelines."
        }
      ]
    },
    {
      title: "Case Study: Woodgrove Bank Document Intelligence",
      isCaseStudy: true,
      scenario: `Woodgrove Bank processes thousands of documents daily across three departments:

1. Accounts payable — hundreds of supplier invoices from different vendors arrive every day and need key fields (vendor, date, total) extracted automatically.
2. Legal — contract PDFs must be made searchable with AI-enriched metadata (entities, key phrases, sentiment), and the enriched data must also be available to a separate analytics dashboard.
3. Compliance — a new regulation requires all stored documents to be searchable by semantic meaning, not just keywords.`,
      questions: [
        {
          question: "Woodgrove receives invoices from 50 different suppliers, each with a different layout. Which single Document Intelligence approach handles all layouts without building separate models for each?",
          answers: [
            "Use prebuilt-read on all invoices and parse the plain text output",
            "Train one custom model on all 50 invoice layouts mixed together",
            "Use prebuilt-invoice, which automatically handles all invoice layouts",
            "Build a composed model combining custom models for each supplier under one model ID"
          ],
          correct: 3,
          explanation: "A composed model aggregates multiple custom models — each trained for a specific layout — under a single model ID. The service routes each document to the best-matching component model, enabling one API call to handle all supplier formats."
        },
        {
          question: "The legal team wants to index contract PDFs with AI-extracted entities and key phrases AND make those enriched results available to a Power BI dashboard independently of the search index. Which Azure AI Search feature supports the second requirement?",
          answers: [
            "A custom skill that posts enriched data to an external API",
            "The Knowledge Store, which persists skillset enrichments as tables or JSON in Azure Storage",
            "An additional indexer that exports the search index to Azure Blob Storage",
            "Azure AI Language post-processing applied after indexing"
          ],
          correct: 1,
          explanation: "The Knowledge Store persists AI-enriched content from the skillset pipeline into Azure Storage as tables, objects, or files. This makes enriched data independently consumable by downstream analytics tools without going through the search index."
        },
        {
          question: "Compliance requires that lawyers can find contracts containing the concept of 'force majeure' even if a document uses different wording such as 'act of God' or 'unforeseen circumstances'. Which Azure AI Search feature enables this conceptual retrieval?",
          answers: [
            "OData $filter expressions on a keywords field",
            "Lucene full-text query syntax with synonym maps",
            "Semantic ranking, which re-ranks results by conceptual relevance using language models",
            "BM25 keyword scoring with boosting on the content field"
          ],
          correct: 2,
          explanation: "Semantic ranking uses language models to understand the meaning of queries and re-rank results by conceptual relevance, not just keyword frequency. This enables conceptual search where different phrasing of the same idea returns relevant results."
        }
      ]
    }
  ]
}
