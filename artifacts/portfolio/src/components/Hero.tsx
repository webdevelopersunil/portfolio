import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ArrowRight } from "lucide-react";
import type { HeroContent } from "@workspace/api-client-react";

export default function Hero({ data }: { data: HeroContent }) {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/40 via-background to-background -z-10" />
      
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          {data.availableForWork && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-foreground text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for new opportunities
            </div>
          )}
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
            {data.title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
            {data.tagline}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium shadow-lg"
            >
              View My Work
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background hover:bg-secondary/30 transition-colors font-medium text-foreground"
            >
              Contact Me
            </a>
          </div>
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href={`mailto:${data.email}`} className="hover:text-primary transition-colors p-2 -m-2">
              <Mail className="w-5 h-5" />
            </a>
            <a href={`tel:${data.phone}`} className="hover:text-primary transition-colors p-2 -m-2">
              <Phone className="w-5 h-5" />
            </a>
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 -m-2">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 -m-2">
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:ml-auto w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-border/50"
        >
          <img
            src="/hero.png"
            alt={data.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
