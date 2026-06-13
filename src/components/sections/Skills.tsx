'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Monitor, Server, Database, Cloud, Code, Settings, Shield, ChevronDown } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'
import { useState } from 'react'

const iconMap = {
  Monitor,
  Server,
  Database,
  Cloud,
  Code,
  Settings,
  Shield,
}

export function Skills() {
  const { skillsData } = portfolioData
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-badge-expert text-badge-expert-foreground'
      case 'advanced':
        return 'bg-badge-advanced text-badge-advanced-foreground'
      case 'intermediate':
        return 'bg-badge-intermediate text-badge-intermediate-foreground'
      case 'beginner':
        return 'bg-badge-beginner text-badge-beginner-foreground'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            My Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert in full-stack development, distributed systems, and cloud-native technologies
          </p>
        </motion.div>

        <div className="space-y-8">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => {
            const isExpanded = expandedCategories.has(category)
            const displayedSkills = isExpanded ? skills : skills.slice(0, 3)
            const hasMore = skills.length > 3

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Category Header with Click Action */}
                <div
                  onClick={(e) => {
                    if (hasMore) {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleCategory(category)
                    }
                  }}
                  className={`flex items-center justify-between mb-5 pb-3 border-b border-border/50 group ${hasMore ? 'cursor-pointer' : ''}`}
                >
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                  {hasMore && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium bg-primary/10 text-primary border-primary/20"
                      >
                        {isExpanded ? 'Collapse' : `+${skills.length - 3} more`}
                      </Badge>
                      <ChevronDown
                        className={`h-5 w-5 text-primary/60 group-hover:text-primary transition-all duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Skills Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {displayedSkills.map((skill, skillIndex) => {
                      const IconComponent = iconMap[skill.icon as keyof typeof iconMap]

                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          layout
                        >
                          <Card className="p-4 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 h-full group cursor-default">
                            <CardContent className="p-0 space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors flex-shrink-0">
                                    <IconComponent className="h-5 w-5 group-hover:text-primary transition-colors" />
                                  </div>
                                  <h4 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                                    {skill.name}
                                  </h4>
                                </div>
                                <Badge className={`${getLevelColor(skill.level)} text-xs flex-shrink-0`}>
                                  {skill.level}
                                </Badge>
                              </div>

                              <div className="text-xs sm:text-sm text-muted-foreground">
                                <p><span className="font-medium">Experience:</span> {skill.experience}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Collapse/Expand Hint */}
                {hasMore && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-muted-foreground text-center pt-4 group-hover:text-primary/60 cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleCategory(category)
                    }}
                  >
                    {isExpanded ? 'Click to collapse' : `Click to view all ${skills.length} skills`}
                  </motion.p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}