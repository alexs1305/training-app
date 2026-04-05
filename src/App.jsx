import { useState, useEffect } from 'react'
import './App.css'
import { baseModules } from './modules'

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
  // For regular lessons, randomly select questions from the combined pool of
  // questions + variantQuestions each time the lesson is started, so users
  // see different questions and in a different order on every attempt.
  const [questionQueue, setQuestionQueue] = useState(() => {
    if (lesson.isRevision) return lesson.questions
    const pool = [...lesson.questions, ...(lesson.variantQuestions || [])]
    const shuffled = shuffleArray(pool)
    return shuffled.slice(0, lesson.questions.length)
  })
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
      const xp = questionQueue.length * 10
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
