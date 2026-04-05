import { useState, useEffect } from 'react'
import './App.css'

const modules = [
  {
    id: 1,
    title: "Azure AI Fundamentals",
    description: "Core concepts of AI and Azure AI services",
    lessons: [
      {
        title: "Introduction to AI",
        questions: [
          {
            question: "What is the primary purpose of Azure Cognitive Services?",
            answers: [
              "To provide pre-built AI models accessible via APIs",
              "To replace human developers",
              "To store large amounts of data",
              "To manage virtual machines"
            ],
            correct: 0,
            explanation: "Azure Cognitive Services provides pre-built AI capabilities like vision, speech, language, and decision-making through simple API calls, allowing developers to add AI features without building models from scratch."
          },
          {
            question: "Which Azure service would you use for natural language processing?",
            answers: [
              "Azure Computer Vision",
              "Azure Language Service",
              "Azure Speech",
              "Azure Form Recognizer"
            ],
            correct: 1,
            explanation: "Azure Language Service (formerly Text Analytics) provides natural language processing capabilities including sentiment analysis, key phrase extraction, named entity recognition, and language detection."
          }
        ]
      },
      {
        title: "Machine Learning Basics",
        questions: [
          {
            question: "What is the difference between supervised and unsupervised learning?",
            answers: [
              "Supervised uses labeled data, unsupervised finds patterns in unlabeled data",
              "Supervised is faster than unsupervised",
              "Supervised requires more compute power",
              "There is no difference"
            ],
            correct: 0,
            explanation: "Supervised learning uses labeled training data where the correct answer is known, while unsupervised learning finds patterns and structures in data without predefined labels."
          },
          {
            question: "What is Azure Machine Learning workspace used for?",
            answers: [
              "Only for storing data",
              "A centralized place to manage ML resources, experiments, and deployments",
              "Only for deploying models",
              "Managing Azure subscriptions"
            ],
            correct: 1,
            explanation: "Azure ML workspace is the top-level resource that provides a centralized place to work with all artifacts including datasets, experiments, pipelines, models, and endpoints."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Computer Vision",
    description: "Image analysis, object detection, and OCR",
    lessons: [
      {
        title: "Azure Computer Vision API",
        questions: [
          {
            question: "Which Azure service can extract text from images (OCR)?",
            answers: [
              "Azure Language Service",
              "Azure Computer Vision",
              "Azure Bot Service",
              "Azure Search"
            ],
            correct: 1,
            explanation: "Azure Computer Vision includes OCR (Optical Character Recognition) capabilities to extract printed and handwritten text from images and documents."
          },
          {
            question: "What is the maximum image file size for Azure Computer Vision API?",
            answers: [
              "2 MB",
              "4 MB",
              "6 MB",
              "10 MB"
            ],
            correct: 1,
            explanation: "Azure Computer Vision API accepts images up to 4 MB in size. Images should be at least 50x50 pixels for best results."
          }
        ]
      },
      {
        title: "Custom Vision",
        questions: [
          {
            question: "What is Azure Custom Vision used for?",
            answers: [
              "Creating custom image classification and object detection models",
              "Editing images",
              "Storing images",
              "Converting image formats"
            ],
            correct: 0,
            explanation: "Azure Custom Vision allows you to build, deploy, and improve your own custom image classification and object detection models without deep ML expertise."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Natural Language Processing",
    description: "Text analysis, entity recognition, and sentiment analysis",
    lessons: [
      {
        title: "Azure Language Service",
        questions: [
          {
            question: "What does sentiment analysis return?",
            answers: [
              "A number between 0-100",
              "Positive, neutral, or negative with confidence scores",
              "Only positive or negative",
              "The language of the text"
            ],
            correct: 1,
            explanation: "Sentiment analysis returns labels (positive, neutral, negative) along with confidence scores for each sentiment at both the document and sentence level."
          }
        ]
      },
      {
        title: "Language Understanding (LUIS)",
        questions: [
          {
            question: "In LUIS, what is an 'intent'?",
            answers: [
              "A piece of data to extract",
              "The user's goal or purpose in an utterance",
              "A training dataset",
              "An API endpoint"
            ],
            correct: 1,
            explanation: "An intent represents the user's intention or goal. For example, 'BookFlight' or 'CheckWeather'. LUIS uses intents to understand what action the user wants to perform."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Speech Services",
    description: "Speech-to-text, text-to-speech, and translation",
    lessons: [
      {
        title: "Speech Recognition",
        questions: [
          {
            question: "Which Azure service converts speech to text?",
            answers: [
              "Azure Translator",
              "Azure Speech Service",
              "Azure Language",
              "Azure Bot Service"
            ],
            correct: 1,
            explanation: "Azure Speech Service provides speech-to-text (speech recognition) and text-to-speech capabilities, along with speech translation and speaker recognition."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Azure OpenAI Service",
    description: "GPT models, embeddings, and prompt engineering",
    lessons: [
      {
        title: "OpenAI Models",
        questions: [
          {
            question: "What is the main advantage of Azure OpenAI over standard OpenAI?",
            answers: [
              "It's free",
              "Enterprise security, compliance, and Azure integration",
              "It has more models",
              "It's faster"
            ],
            correct: 1,
            explanation: "Azure OpenAI provides the same models as OpenAI but with enterprise-grade security, compliance (GDPR, HIPAA), private networking, and seamless integration with other Azure services."
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

  return (
    <div className="lesson-path">
      {modules.map((mod, modIndex) => {
        const isLocked = !isModuleUnlocked(modIndex, completedLessons)
        const isCompleted = isModuleCompleted(mod.id, completedLessons)
        const hasProgress = mod.lessons.some((_, i) => completedLessons.includes(`${mod.id}-${i}`))

        let statusIcon = '🔒'
        if (!isLocked) statusIcon = isCompleted ? '✅' : '📚'

        const moduleClass = [
          'module',
          isLocked ? 'locked' : '',
          isCompleted ? 'completed' : '',
          hasProgress && !isCompleted ? 'active' : ''
        ].filter(Boolean).join(' ')

        return (
          <div key={mod.id} className={moduleClass}>
            <div className="module-header">
              <div className="module-title">{mod.title}</div>
              <div className="module-status">{statusIcon}</div>
            </div>
            <div className="module-description">{mod.description}</div>
            <div className="module-lessons">
              {mod.lessons.map((lesson, lessonIndex) => {
                const lessonId = `${mod.id}-${lessonIndex}`
                const lessonCompleted = completedLessons.includes(lessonId)
                const lessonLocked = !isLessonUnlocked(mod.id, lessonIndex, completedLessons)

                const dotClass = [
                  'lesson-dot',
                  lessonCompleted ? 'completed' : '',
                  lessonLocked ? 'locked' : ''
                ].filter(Boolean).join(' ')

                return (
                  <div
                    key={lessonIndex}
                    className={dotClass}
                    onClick={() => !lessonLocked && onStartLesson(mod.id, lessonIndex)}
                  >
                    {lessonCompleted ? '✓' : lessonIndex + 1}
                  </div>
                )
              })}
            </div>
          </div>
        )
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
            <span>Azure AI Trainer</span>
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
