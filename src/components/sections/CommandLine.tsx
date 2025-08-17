import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Terminal } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'
import { useState, useRef, useEffect } from 'react'

export function CommandLine() {
  const { personalInfo, skillsData, experienceData, projectsData, contactInfo } = portfolioData
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{ command: string; output: string[] }[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: () => [
      'Available commands:',
      '  whoami       - Display personal information',
      '  skills       - List technical skills',
      '  experience   - Show work experience',
      '  projects     - Display featured projects',
      '  contact      - Get contact information',
      '  clear        - Clear terminal',
      '  help         - Show this help message'
    ],
    whoami: () => [
      `Name: ${personalInfo.name}`,
      `Title: ${personalInfo.title}`,
      `Location: ${personalInfo.location}`,
      `Description: ${personalInfo.description}`
    ],
    skills: () => {
      const skills: string[] = ['Technical Skills:']
      Object.entries(skillsData).forEach(([category, skillList]) => {
        skills.push(`  ${category}:`)
        skillList.forEach(skill => {
          skills.push(`    - ${skill.name} (${skill.level})`)
        })
      })
      return skills
    },
    experience: () => {
      const exp: string[] = ['Professional Experience:']
      experienceData.forEach(job => {
        exp.push(`  ${job.position} at ${job.company}`)
        exp.push(`  ${job.period} - ${job.location}`)
        exp.push(`  ${job.description}`)
        exp.push('')
      })
      return exp
    },
    projects: () => {
      const proj: string[] = ['Featured Projects:']
      projectsData.filter(p => p.featured).forEach(project => {
        proj.push(`  ${project.title}`)
        proj.push(`  ${project.description}`)
        proj.push(`  Live: ${project.liveUrl}`)
        proj.push('')
      })
      return proj
    },
    contact: () => [
      'Contact Information:',
      `  Email: ${contactInfo.email}`,
      `  Phone: ${contactInfo.phone}`,
      `  Location: ${contactInfo.address}`
    ],
    clear: () => {
      setHistory([])
      return []
    }
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    if (trimmedCmd === '') return

    const output = commands[trimmedCmd as keyof typeof commands]
      ? commands[trimmedCmd as keyof typeof commands]()
      : [`Command not found: ${cmd}`, 'Type "help" for available commands.']

    if (trimmedCmd !== 'clear') {
      setHistory(prev => [...prev, { command: cmd, output }])
    }
    
    setCommandHistory(prev => [...prev, cmd])
    setInput('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex] || '')
        }
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    // Show initial help message
    setHistory([{ command: 'help', output: commands.help() }])
  }, [])

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-black/95 border-primary/20 shadow-2xl hover:shadow-glow transition-all duration-500">
            <CardContent className="p-6">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Terminal className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-mono">terminal ~ portfolio</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div 
                ref={terminalRef}
                className="space-y-2 max-h-96 overflow-y-auto font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Command History */}
                {history.map((entry, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">$</span>
                      <span className="text-white">{entry.command}</span>
                    </div>
                    {entry.output.map((line, lineIndex) => (
                      <div key={lineIndex} className="text-gray-300 ml-4">
                        {line}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Current Input */}
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-white outline-none border-none"
                    placeholder="Type a command..."
                    autoFocus
                  />
                  <span className="text-white animate-pulse">|</span>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-gray-500 text-xs font-mono">
                  Interactive portfolio terminal. Type 'help' to see available commands.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}