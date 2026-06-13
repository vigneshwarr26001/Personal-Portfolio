'use client'

import { motion } from 'framer-motion'

const codingAnimations = [
  {
    title: "Code Compilation",
    lines: [
      "$ npm run build",
      "✓ Built successfully",
      "$ git commit",
      "✓ [main a1f3d2a]"
    ]
  },
  {
    title: "Schema Definition",
    lines: [
      "$ psql -U admin",
      "CREATE TABLE users {",
      "  id UUID PRIMARY KEY",
      "✓ Table created"
    ]
  },
  {
    title: "Data Pipeline",
    lines: [
      "$ airflow trigger_dag",
      "✓ Extracting data...",
      "✓ Transforming...",
      "✓ Loading complete"
    ]
  },
  {
    title: "Kafka Producer",
    lines: [
      "$ kafka-console-producer",
      "✓ Publishing events...",
      "sent: 1,243 messages",
      "✓ Pipeline active"
    ]
  }
]

const databaseAnimations = [
  {
    title: "Table Operations",
    lines: [
      "CREATE TABLE orders {",
      "  id INT, amount DECIMAL",
      "  created_at TIMESTAMP",
      "✓ Schema initialized"
    ]
  },
  {
    title: "Data Pipeline",
    lines: [
      "SELECT * FROM events",
      "✓ 12,543 records",
      "TRANSFORM pipeline",
      "✓ Processing complete"
    ]
  },
  {
    title: "Kafka Consumer",
    lines: [
      "$ kafka-consumer-groups",
      "✓ Consuming messages",
      "lag: 0 (caught up)",
      "✓ Real-time ingestion"
    ]
  },
  {
    title: "ETL Pipeline",
    lines: [
      "EXTRACT FROM source",
      "✓ 50,000 rows",
      "LOAD INTO warehouse",
      "✓ Sync complete"
    ]
  }
]

const DataAnimation = ({ data, position, delay }: { data: typeof codingAnimations[0][], position: 'left' | 'right', delay: number }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [data.length])

  const textColor = position === 'left' ? 'text-primary/60' : 'text-blue-600 dark:text-blue-400'
  const containerClass = position === 'left'
    ? 'absolute left-12 top-1/3'
    : 'absolute right-12 top-2/5 text-right'

  return (
    <div className={`${containerClass} pointer-events-none select-none`}>
      <motion.div
        className={`${textColor} font-mono text-sm`}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay }}
      >
        <motion.div
          className="space-y-2 overflow-hidden h-20"
          animate={{ y: [-80, 0, 80] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          key={currentIndex}
        >
          {data[currentIndex].lines.map((line, idx) => (
            <p key={idx} className={line.includes('✓') ? 'text-green-600 dark:text-green-400' : ''}>
              {line}
            </p>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

import React from 'react'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />

      {/* Subtle animated gradient orbs for depth */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-15 bg-gradient-to-r from-primary/20 to-blue-500/20"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '5%' }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-10 bg-gradient-to-r from-blue-500/15 to-cyan-500/15"
        animate={{
          y: [0, -40, 0],
          x: [0, -25, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Coding & Schema Definition animation - Left */}
      <DataAnimation data={codingAnimations} position="left" delay={0} />

      {/* Database & Kafka Pipeline animation - Right */}
      <DataAnimation data={databaseAnimations} position="right" delay={1.5} />

      {/* Tech stack indicator */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 pointer-events-none select-none">
        <motion.div
          className="flex gap-6 text-primary/50 font-mono text-xs font-semibold"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <motion.span
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            React
          </motion.span>
          <motion.span
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }}
          >
            Node.js
          </motion.span>
          <motion.span
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
          >
            MongoDB
          </motion.span>
          <motion.span
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
          >
            Kafka
          </motion.span>
          <motion.span
            animate={{ y: [-3, 0, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
          >
            AWS
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}
