import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Monitor, Server, Database, Smartphone, Cloud, Code, Settings } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

const iconMap = {
  Monitor,
  Server,
  Database,
  Smartphone,
  Cloud,
  Code,
  Settings,
}

export function Skills() {
  const { skillsData } = portfolioData

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
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="space-y-10">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold">{category}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, skillIndex) => {
                  const IconComponent = iconMap[skill.icon as keyof typeof iconMap]
                  
                  return (
                    <Card key={skillIndex} className="p-4 border border-border hover:border-primary/20 transition-colors">
                      <CardContent className="p-0 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-muted">
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <h4 className="font-medium">{skill.name}</h4>
                          </div>
                          <Badge className={getLevelColor(skill.level)}>
                            {skill.level}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p><span className="font-medium">Experience:</span> {skill.experience}</p>
                          <p>{skill.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}