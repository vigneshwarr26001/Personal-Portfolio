import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Instagram, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function Hero() {
  const { personalInfo, heroContent, socialLinks } = portfolioData;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Animated Background Code & Database Content */}
      {/* Left side - Coding animations - Desktop only */}
      <div className="hidden lg:block absolute left-12 top-1/4 pointer-events-none select-none">
        <motion.div
          className="text-primary/60 font-mono text-sm"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <motion.div
            animate={{ y: [-240, 240] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="space-y-2 overflow-hidden h-20"
          >
            <p>$ npm install</p>
            <p className="text-green-600 dark:text-green-400">✓ Dependencies ready</p>
            <p>$ npm run dev</p>
            <p className="text-green-600 dark:text-green-400">✓ Server running on 3000</p>
            <p>$ npm test</p>
            <p className="text-green-600 dark:text-green-400">✓ All tests passed (156)</p>
            <p>$ npm run build</p>
            <p className="text-green-600 dark:text-green-400">✓ Built successfully</p>
            <p>$ git add .</p>
            <p className="text-green-600 dark:text-green-400">✓ Staging complete</p>
            <p>$ git commit -m "feat: new features"</p>
            <p className="text-green-600 dark:text-green-400">✓ [main a1f3d2a]</p>
            <p>$ git push origin main</p>
            <p className="text-green-600 dark:text-green-400">✓ Push successful</p>
            <p>$ npm run deploy</p>
            <p className="text-green-600 dark:text-green-400">✓ Deployed to production</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Database animations - Desktop only */}
      <div className="hidden lg:block absolute right-12 top-2/5 pointer-events-none select-none text-right">
        <motion.div
          className="text-blue-600 dark:text-blue-400 font-mono text-sm"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [-240, 240] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 1.5 }}
            className="space-y-2 overflow-hidden h-20"
          >
            <p>SELECT * FROM users</p>
            <p className="text-green-600 dark:text-green-400">↳ 5,234 rows returned</p>
            <p>CREATE TABLE projects</p>
            <p className="text-green-600 dark:text-green-400">✓ Schema created</p>
            <p>INSERT INTO events</p>
            <p className="text-green-600 dark:text-green-400">✓ 12,543 records</p>
            <p>UPDATE users SET active=true</p>
            <p className="text-green-600 dark:text-green-400">✓ 8,932 rows updated</p>
            <p>SELECT COUNT(*) FROM logs</p>
            <p className="text-green-600 dark:text-green-400">↳ 156,789 entries</p>
            <p>DELETE FROM cache</p>
            <p className="text-green-600 dark:text-green-400">✓ Cache cleared</p>
            <p>VACUUM ANALYZE</p>
            <p className="text-green-600 dark:text-green-400">✓ Database optimized</p>
            <p>BACKUP DATABASE</p>
            <p className="text-green-600 dark:text-green-400">✓ Backup complete</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle animated code elements background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="code-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <text x="10" y="20" fontSize="10" fill="currentColor" fontFamily="monospace">&lt;/&gt;</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#code-pattern)" opacity="0.5" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center max-w-4xl"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <p className="text-muted-foreground text-base tracking-wide uppercase">
                {heroContent.greeting}
              </p>
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-gradient">{heroContent.name}</span>
              </h1>
              <h2 className="text-xl lg:text-2xl font-medium text-muted-foreground tracking-wide">
                {personalInfo.title}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              {heroContent.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="relative z-10 flex items-center gap-2">
                  {heroContent.cta.primary}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center gap-3"
            >
              {socialLinks.map((link) => {
                const iconMap = {
                  Github: Github,
                  Linkedin: Linkedin,
                  Instagram: Instagram,
                  Mail: Mail,
                };

                const IconComponent =
                  iconMap[link.icon as keyof typeof iconMap];

                return (
                  <motion.div
                    key={link.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-11 w-11 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.name}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="sr-only">{link.name}</span>
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
