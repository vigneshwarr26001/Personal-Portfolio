import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { portfolioData } from '@/data/portfolio'

export function Footer() {
  const { personalInfo, socialLinks } = portfolioData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <h3 className="text-2xl font-bold text-gradient">{personalInfo.name}</h3>
            <p className="text-muted-foreground max-w-md">
              {personalInfo.tagline}
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {socialLinks.map((link, index) => {
              const iconMap = {
                Github: Github,
                Linkedin: Linkedin,
                Mail: Mail,
              }
              
              const IconComponent = iconMap[link.icon as keyof typeof iconMap]

              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-12 w-12 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <IconComponent className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                </Button>
              )
            })}
          </motion.div>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              onClick={scrollToTop}
              className="group border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4 mr-2 group-hover:-translate-y-1 transition-transform" />
              Back to Top
            </Button>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-border w-full pt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}