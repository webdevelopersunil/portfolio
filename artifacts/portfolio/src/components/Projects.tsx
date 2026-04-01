import { motion } from "framer-motion";
import { ArrowRight, Code2, Database, Layers, Search } from "lucide-react";
import type { ProjectsContent } from "@workspace/api-client-react";

export default function Projects({ data }: { data: ProjectsContent }) {
  // Use a stable array of icons for variety
  const icons = [Search, Layers, Code2, Database];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Featured Architecture
            </h2>
            <p className="text-lg text-muted-foreground">
              Deep dives into systems I've designed and built, focusing on scalability, performance, and clean code.
            </p>
          </div>
          <a href="https://github.com/webdevelopersunil" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-medium hover:underline pb-1">
            View Github <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.items.map((project, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-sm font-mono text-primary mb-4 pb-4 border-b border-border/50">
                  {project.techStack}
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <ul className="space-y-2">
                  {project.bullets.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
          {data.items.length === 0 && (
            <p className="col-span-full text-muted-foreground">No projects featured yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
