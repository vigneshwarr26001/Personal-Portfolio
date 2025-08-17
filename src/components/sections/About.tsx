import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { portfolioData } from '@/data/portfolio'

export function About() {
  const { personalInfo, aboutStats, professionalStrengths } = portfolioData

  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get to know more about my journey, skills, and passion for creating digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">My Story</h3>
              <p className="text-muted-foreground leading-relaxed">
                {personalInfo.description} I specialize in building modern, scalable applications 
                using cutting-edge technologies and best practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With over 2 years of experience in software development, I've worked on diverse 
                projects ranging from enterprise applications to mobile apps. My passion lies in 
                creating efficient, user-friendly solutions that make a real difference.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold">What I Bring</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {professionalStrengths.map((strength, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="p-4 rounded-lg bg-card hover:bg-primary/5 transition-all duration-300 border border-border hover:border-primary/20">
                      <h5 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {strength.title}
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {strength.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {aboutStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="hover-lift bg-card-gradient border-border/50 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform">
                        {stat.value}
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}