export const ABOUT = [
  "I’m a Computer Science graduate and IBM-certified AI Engineer passionate about building intelligent, practical AI solutions. My interests include LLM systems, RAG pipelines, AI agents, multi-agent orchestration, and backend development, with a focus on turning complex ideas into reliable, real-world applications.",
  "I’m currently seeking opportunities as a Junior AI Engineer or AI Engineer Intern, where I can contribute to impactful projects, strengthen my engineering skills, and grow within a collaborative technical team."
];

export const PROJECTS = [
  {
    "featured": true,
    "title": "Multi-Agent Orchestration System",
    "description": "I built a multi-agent orchestration system where AI agents decompose complex tasks, use tools to execute them, learn from past interactions via persistent memory, and escalate to humans when confidence is low. It’s not an AI demo — it’s production infrastructure for autonomous AI workflows.",
    "note": "Runs fully locally with Ollama. The bundled demo uses scripted agents and fictional data so the showcase is deterministic.",
    "diagram": true,
    "diagramCaption": "Agent hierarchy and decision flow: the supervisor plans, specialists execute through a permission-controlled tool registry, a reviewer validates every result, and a human gate pauses the run when confidence is low or an action is sensitive.",
    "flow": [
      "A complex request arrives, and lessons from similar past tasks are retrieved from long-term memory.",
      "The supervisor decomposes it into a validated plan with dependencies. A low-confidence plan goes to a human first.",
      "Specialists run independent steps in parallel and call tools through a registry that enforces permissions and rate limits.",
      "The reviewer checks each result against the real tool output. A rejection sends the work back with feedback.",
      "Sensitive actions, repeated failures or low scores pause the run until a person approves, edits, rejects or takes over.",
      "The answer is delivered, lessons are saved, and the whole run stays traceable and replayable."
    ],
    "highlights": [
      "Supervisor, four specialist agents (research, data analysis, writing, code execution) and a reviewer, built as a LangGraph state machine with validated plans, bounded retries and a fallback plan when a small model fails.",
      "Tool registry with per-agent permissions, rate limits and a call log. The reviewer judges results against the real tool output, so fabricated answers are caught.",
      "Persistent memory: Redis working memory per task and ChromaDB long-term memory, with importance scoring, consolidation, expiry and delete endpoints.",
      "Human in the loop with four review levels (notify, approve action, approve plan, take over). The run pauses, saves its state and resumes after a decision. Sensitive tools cannot run without approval, enforced in code.",
      "Observability: OpenTelemetry traces with full prompts and responses, a trace explorer, token and cost tracking, and a replay engine that re-runs a task from recorded decisions with edited inputs.",
      "Packaged as a docker compose stack (FastAPI, Celery workers, PostgreSQL, Redis, ChromaDB, two Streamlit UIs) with an automated demo and an offline test suite."
    ],
    "images": [],
    "tags": [
      "LangGraph",
      "Multi-Agent Systems",
      "Agent Orchestration",
      "Tool Calling",
      "Python",
      "FastAPI",
      "Celery",
      "PostgreSQL",
      "Redis",
      "ChromaDB",
      "OpenTelemetry",
      "Docker",
      "Ollama"
    ],
    "github": "https://github.com/Shimaaelkanj/agent-orchestration-system"
  },
  {
    "featured": true,
    "title": "Hybrid RAG for Internal Docs",
    "description": "I built a RAG system with hybrid search that achieves 98% faithfulness and 95% citation accuracy on a 56-question eval suite. Every answer cites its sources, each citation is checked by an LLM judge, and the system says “I don’t know” instead of guessing: 0% hallucination on the 10 questions the documents cannot answer.",
    "stats": [
      [
        "98%",
        "faithfulness"
      ],
      [
        "95%",
        "citation accuracy"
      ],
      [
        "0%",
        "hallucination on unanswerable questions"
      ],
      [
        "56",
        "evaluation questions"
      ]
    ],
    "note": "Measured on a synthetic 8-document corpus and scored by an LLM judge, so the scores carry judge noise. Runs locally (Ollama and local embeddings) or with any OpenAI-compatible API.",
    "diagram": "ragDiagram",
    "diagramCaption": "Ingestion builds a dense index and a keyword index from the same chunks. At query time both are searched, the results are merged and reranked, and a confidence gate decides between a cited answer and an honest “I don’t know”.",
    "blocks": [
      {
        "heading": "Why hybrid beats dense-only on technical documentation",
        "paragraphs": [
          "Technical documentation is full of exact identifiers: error codes like NW-5003, config keys like CACHE_TTL_SECONDS, endpoint paths and function names. Dense (embedding) search matches meaning, so it handles paraphrases well, but it blurs exact tokens: two different error codes can look almost identical to an embedding model.",
          "Keyword search (BM25) is the opposite. It finds an exact code or a rare term instantly, but it fails when the question uses different words than the document, for example asking about “vacation days” when the policy says “annual leave”.",
          "Hybrid retrieval runs both and merges the two ranked lists with Reciprocal Rank Fusion, which uses rank positions so the incompatible score scales never need normalising. A cross-encoder then rereads the top 20 candidates together with the question and keeps the best 5. Each method covers the other’s blind spot."
        ],
        "table": {
          "head": [
            "Query type",
            "Example",
            "Dense search",
            "BM25 keyword search"
          ],
          "rows": [
            [
              "Exact identifier",
              "What does NW-5003 mean?",
              "Weaker: similar codes sit close together",
              "Strong: exact token match"
            ],
            [
              "Paraphrased question",
              "How many vacation days do I get? (the document says “annual leave”)",
              "Strong: matches the meaning",
              "Weak: no shared words"
            ],
            [
              "Mixed question",
              "Why do I get NW-1002 after an hour?",
              "Finds the topic (token expiry)",
              "Finds the code"
            ]
          ],
          "caption": "Typical behaviour of each method. The dashboard’s hybrid vs dense-only toggle compares them side by side on any query."
        },
        "after": [
          "On my small 8-document evaluation corpus, hybrid retrieval already reaches full recall (1.00), so I present this as design rationale rather than a measured margin over dense-only."
        ]
      },
      {
        "heading": "Chunking strategy comparison",
        "paragraphs": [
          "The same 56 questions, models and judge were run against three chunking strategies (500-character chunks, 100 overlap)."
        ],
        "table": {
          "head": [
            "Strategy",
            "Recall",
            "MRR",
            "Context precision",
            "Correctness",
            "Faithfulness",
            "Citation accuracy",
            "False refusal",
            "Hallucinated"
          ],
          "rows": [
            [
              "Fixed",
              "1.00",
              "0.99",
              "0.27",
              "0.79",
              "0.98",
              "0.95",
              "0.11",
              "0.00"
            ],
            [
              "Recursive",
              "1.00",
              "0.99",
              "0.27",
              "0.79",
              "0.98",
              "0.95",
              "0.11",
              "0.00"
            ],
            [
              "Semantic",
              "1.00",
              "0.99",
              "0.27",
              "0.81",
              "0.98",
              "0.95",
              "0.11",
              "0.00"
            ]
          ],
          "caption": "Higher is better, except false refusal and hallucinated. The overall score is 0.93 for all three."
        },
        "after": [
          "Result: a tie. Retrieval is saturated on this small corpus, and semantic chunking’s 0.02 correctness edge is about one question out of 56, which is within judge noise. I kept recursive chunking as the default because it matches the others on quality, keeps section boundaries intact and avoids embedding every sentence at indexing time. Separating the strategies needs a larger corpus of long documents.",
          "The remaining weakness is over-refusal: about 11% of answerable questions were declined by the confidence gate. Tuning that threshold is the next improvement, not changing the chunker."
        ]
      }
    ],
    "highlights": [
      "Ingestion for Markdown, text, HTML and PDF with section and page metadata, three switchable chunking strategies (fixed, recursive, semantic) and near-duplicate detection (cosine similarity above 0.95).",
      "Hybrid retrieval: ChromaDB dense search plus BM25, merged with weighted Reciprocal Rank Fusion and reranked by a cross-encoder.",
      "Grounded answers with [n] citations, per-claim citation verification by an LLM judge, and a composite confidence score (retrieval, citation coverage, completeness).",
      "A refusal path that reports what was found, what was missing and which documents to check, instead of fabricating an answer.",
      "Evaluation framework: a 56-question golden dataset (lookup, multi-hop, unanswerable, ambiguous), metrics for retrieval, correctness, faithfulness and citation accuracy, a chunking comparison report and a CI regression gate.",
      "Versioned FastAPI service with OpenAPI docs, a Streamlit dashboard with clickable citations and a hybrid vs dense-only toggle, and a one-command Docker Compose stack (API, ChromaDB, dashboard)."
    ],
    "images": [],
    "tags": [
      "RAG",
      "Hybrid Search",
      "BM25",
      "Vector Databases",
      "Reranking",
      "LLM Evaluation",
      "Python",
      "FastAPI",
      "Streamlit",
      "ChromaDB",
      "sentence-transformers",
      "Docker",
      "GitHub Actions",
      "Ollama"
    ],
    "github": "https://github.com/Shimaaelkanj/hybrid-rag-internal-docs"
  },
  {
    "featured": true,
    "title": "LoRA Fine-Tuning Pipeline for Medical Q&A",
    "description": "I fine-tuned Qwen2.5-1.5B on medical flashcard data using QLoRA and raised ROUGE-L from 0.186 to 0.307 on 200 held-out questions, cutting answers from 122 to 59 words. Benchmark accuracy stayed flat (83% to 80%, a one-question difference), and the fine-tuned model invented answers about a made-up disease and drug that the base model rejected. I report the failure, not only the gain.",
    "stats": [
      [
        "0.186 → 0.307",
        "ROUGE-L, 200 held-out questions"
      ],
      [
        "122 → 59",
        "average answer length in words (reference: 50)"
      ],
      [
        "83% → 80%",
        "benchmark keyword score, 30 questions (one question)"
      ],
      [
        "17 MB",
        "LoRA adapter, rank 32"
      ]
    ],
    "note": "One run per configuration on a free Colab T4, so small differences may be noise. 3 of 7 planned sweep runs finished. The LLM-judge and general-capability (forgetting) tests were not run, so I make no claim about retained general ability. Learning project, not medical advice.",
    "blocks": [
      {
        "heading": "Where fine-tuning helped and where it hurt",
        "paragraphs": [
          "Fine-tuning changed the style of the answers, not the knowledge. Answers became about half as long and much closer to the flashcard references. Part of the ROUGE-L gain comes simply from the length now matching the references, and benchmark accuracy did not improve."
        ],
        "table": {
          "head": [
            "Metric",
            "Base model",
            "Fine-tuned"
          ],
          "rows": [
            [
              "Test ROUGE-L (200 questions)",
              "0.186",
              "0.307"
            ],
            [
              "Average answer length, test (words; reference 49.6)",
              "122.4",
              "59.4"
            ],
            [
              "Benchmark keyword score (30 questions)",
              "0.833",
              "0.800"
            ],
            [
              "Made-up disease and made-up drug",
              "Refused or denied both (once for the wrong reason)",
              "Invented a treatment and a dose"
            ]
          ],
          "caption": "Same prompt template and greedy decoding for both models. Numbers come from the saved evaluation results."
        },
        "after": [
          "The flashcards always contain an answer, so the model learned to always answer. The keyword metric scored both models 0.20 on the five failure-mode questions, which hid the difference, so I read those answers manually."
        ]
      },
      {
        "heading": "Serving benchmark (vLLM, adapter attached to the base model)",
        "paragraphs": [
          "Both models were served from one vLLM instance and tested at increasing concurrency with no request errors."
        ],
        "table": {
          "head": [
            "Concurrency",
            "Base P50 / P95 (s)",
            "Adapter P50 / P95 (s)",
            "Adapter tokens/s"
          ],
          "rows": [
            [
              "1",
              "3.43 / 4.27",
              "0.77 / 5.37",
              "21"
            ],
            [
              "8",
              "2.00 / 2.32",
              "1.02 / 5.86",
              "117"
            ],
            [
              "32",
              "2.78 / 3.45",
              "1.31 / 7.18",
              "351"
            ],
            [
              "64",
              "3.30 / 4.33",
              "1.94 / 10.53",
              "523"
            ]
          ],
          "caption": "Colab T4, 128 max tokens, short prompts, one run per level. The adapter has a lower median latency because its answers are short, but a heavier tail, probably because it is served unmerged (not verified)."
        },
        "after": []
      }
    ],
    "highlights": [
      "Data pipeline: cleaned and deduplicated 33,955 flashcards, split 80/10/10 with duplicates removed before splitting, plus a 30-question handcrafted benchmark covering easy, hard, edge-case and failure-mode questions.",
      "QLoRA training (4-bit, rank 32, targeting q_proj and v_proj) on a free Colab T4, with MLflow tracking, validation every 25 steps, early stopping and best-checkpoint selection.",
      "Evaluation harness that scores any model on the benchmark and the held-out test split with identical prompts and greedy decoding.",
      "Serving with vLLM: the 17 MB adapter loads on top of the base model, benchmarked up to 64 concurrent requests.",
      "FastAPI A/B endpoint that returns base and fine-tuned answers side by side, plus a replay page that serves saved real outputs without a GPU.",
      "Solved real hardware and library problems: no bf16 on a T4, renamed training arguments, incompatible Colab packages, and GPU quota limits."
    ],
    "images": [
      {
        "src": "/images/project-1.png",
        "alt": "Side-by-side answers to a question about a made-up disease: the base model says it does not exist, the fine-tuned model invents a treatment.",
        "caption": "Replay page: same question, two models. The base model rejects the made-up disease, the fine-tuned model invents a treatment. Real outputs saved from a Colab T4 run.",
        "width": 1180,
        "height": 885
      },
      {
        "src": "/images/project-2.png",
        "alt": "Pipeline diagram: data, training, evaluation, serving and demo stages, with data and demo on a laptop and the middle three on a Colab T4 GPU.",
        "caption": "Pipeline overview: data and demo on a laptop, training, evaluation and serving on a free Colab T4.",
        "width": 1632,
        "height": 638
      }
    ],
    "tags": [
      "LoRA",
      "QLoRA",
      "LLM Fine-Tuning",
      "Hugging Face PEFT",
      "TRL",
      "vLLM",
      "FastAPI",
      "MLflow",
      "Model Evaluation",
      "Python",
      "PyTorch",
      "Google Colab"
    ],
    "github": "https://github.com/Shimaaelkanj"
  }
];

export const SKILLS = [
  [
    "AI & Machine Learning",
    "<circle cx=\"5\" cy=\"6\" r=\"2\"/><circle cx=\"5\" cy=\"18\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><circle cx=\"19\" cy=\"12\" r=\"2\"/><path d=\"M7 6l3.5 5M7 18l3.5-5M14 12h3\"/>",
    "span3 core",
    [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "NLP",
      "Computer Vision",
      "Model Fine-Tuning",
      "LoRA / QLoRA"
    ]
  ],
  [
    "LLM Engineering",
    "<path d=\"M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z\"/><path d=\"M9 12h.01M12 12h.01M15 12h.01\"/>",
    "span3 core",
    [
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "Hybrid Search",
      "Vector Databases",
      "Prompt Engineering",
      "AI Agents",
      "Multi-Agent Systems",
      "Agent Orchestration",
      "Tool Calling",
      "LLM Evaluation"
    ]
  ],
  [
    "Programming & Backend Development",
    "<path d=\"M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14\"/>",
    "",
    [
      "Python",
      "FastAPI",
      "Django",
      "REST APIs",
      "SQL",
      "PostgreSQL",
      "MongoDB"
    ]
  ],
  [
    "Data Engineering",
    "<ellipse cx=\"12\" cy=\"6\" rx=\"7\" ry=\"3\"/><path d=\"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6\"/>",
    "",
    [
      "Data Analysis",
      "Data Processing",
      "Pandas",
      "NumPy",
      "ETL Concepts",
      "Data Pipelines"
    ]
  ],
  [
    "Cloud & DevOps",
    "<path d=\"M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9.5 4.3 4.3 0 0 1 17.5 18H7z\"/>",
    "",
    [
      "AWS",
      "Docker",
      "Linux",
      "Git & GitHub",
      "CI/CD Fundamentals"
    ]
  ]
];

export const CERTS = [
  [
    "AI Engineering Professional Certificate (V3)",
    "IBM"
  ],
  [
    "Machine Learning with Python (V2)",
    "IBM"
  ],
  [
    "Advanced Deep Learning Specialist",
    "IBM"
  ],
  [
    "AWS re/Start Graduate",
    "AWS"
  ],
  [
    "Cloud Practitioner",
    "AWS"
  ],
  [
    "Data Analysis with Python",
    "freeCodeCamp"
  ],
  [
    "Scientific Computing with Python",
    "freeCodeCamp"
  ]
];
