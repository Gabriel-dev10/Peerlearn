import type { Badge } from './badge.decorator'

interface BadgeRule extends Badge {
  threshold: number
}

const BADGE_RULES: BadgeRule[] = [
  { threshold: 30, icon: '🌱', name: 'Iniciante' },
  { threshold: 100, icon: '🏅', name: 'Mentor' },
  { threshold: 300, icon: '⭐', name: 'Lenda' },
]

export function earnedBadges(xp: number): Badge[] {
  return BADGE_RULES.filter((rule) => xp >= rule.threshold).map((rule) => ({
    icon: rule.icon,
    name: rule.name,
  }))
}
