import { useEffect, useRef } from 'react'

const NOTIFICATION_TIMES = [
  { hour: 12, minute: 0 },
  { hour: 17, minute: 0 }
]

function msUntilNext(hour, minute) {
  const now = new Date()
  const target = new Date()
  target.setHours(hour, minute, 0, 0)
  if (target <= now) target.setDate(target.getDate() + 1)
  return target.getTime() - now.getTime()
}

function hasCompletedSectionToday() {
  try {
    const data = JSON.parse(localStorage.getItem('azureAITrainer') || '{}')
    return data.lastCompletedDate === new Date().toDateString()
  } catch {
    return false
  }
}

function showReminderNotification() {
  if (Notification.permission !== 'granted') return
  if (hasCompletedSectionToday()) return

  new Notification('Keep your streak going! 🔥', {
    body: "You haven't completed a section today. Open the app to extend your streak!",
    icon: '/icon.svg',
    tag: 'streak-reminder',
    renotify: true
  })
}

export function useNotifications() {
  const timersRef = useRef([])

  useEffect(() => {
    if (!('Notification' in window)) return

    function schedule() {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []

      NOTIFICATION_TIMES.forEach(({ hour, minute }) => {
        const fire = () => {
          showReminderNotification()
          const next = setTimeout(fire, 24 * 60 * 60 * 1000)
          timersRef.current.push(next)
        }
        const t = setTimeout(fire, msUntilNext(hour, minute))
        timersRef.current.push(t)
      })
    }

    if (Notification.permission === 'granted') {
      schedule()
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') schedule()
      })
    }

    return () => timersRef.current.forEach(clearTimeout)
  }, [])
}
