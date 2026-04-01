import { motion } from "framer-motion";
import type { ExperienceContent } from "@workspace/api-client-react";

export default function Experience({ data }: { data: ExperienceContent }) {
  return (
    <section id="experience" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            A track record of building robust systems, leading teams, and delivering enterprise-grade applications.
          </p>
        </motion.div>

        <div className="relative border-l border-primary/20 ml-4 md:ml-6 space-y-16">
          {data.items.map((exp, index) => (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">{exp.role}</h3>
                  <p className="text-lg font-medium text-primary mt-1">{exp.company}</p>
                </div>
                <div className="text-sm font-medium text-muted-foreground bg-background px-4 py-1.5 rounded-full border border-border/50 inline-block w-fit">
                  {exp.startDate} – {exp.endDate || "Present"} • {exp.location}
                </div>
              </div>
              
              <ul className="space-y-3 mt-6">
                {exp.bullets.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          {data.items.length === 0 && (
            <p className="text-muted-foreground pl-8">No experience items available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
