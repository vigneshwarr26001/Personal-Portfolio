import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  lines: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
  className?: string
}

export function Typewriter({ 
  lines, 
  typeSpeed = 50, 
  deleteSpeed = 30, 
  pauseTime = 1500,
  className = "" 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentLine = lines[currentLineIndex]
    
    if (isTyping) {
      // Typing animation
      if (displayText.length < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentLine.slice(0, displayText.length + 1))
        }, typeSpeed)
        return () => clearTimeout(timer)
      } else {
        // Finished typing current line
        const timer = setTimeout(() => {
          if (currentLineIndex < lines.length - 1) {
            setIsTyping(false)
          }
        }, pauseTime)
        return () => clearTimeout(timer)
      }
    } else {
      // Deleting animation (only if not the last line)
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deleteSpeed)
        return () => clearTimeout(timer)
      } else {
        // Move to next line
        setCurrentLineIndex((prev) => (prev + 1) % lines.length)
        setIsTyping(true)
      }
    }
  }, [displayText, currentLineIndex, isTyping, lines, typeSpeed, deleteSpeed, pauseTime])

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <motion.div 
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span>{displayText}</span>
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        |
      </span>
    </motion.div>
  )
}