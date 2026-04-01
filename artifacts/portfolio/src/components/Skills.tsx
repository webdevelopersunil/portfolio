import { motion } from "framer-motion";
import type { SkillsContent } from "@workspace/api-client-react";

export default function Skills({ data }: { data: SkillsContent }) {
  return (
    <section id="skills" className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
                Technical Arsenal
              </h2>
              <p className="text-lg text-secondary/80 leading-relaxed">
                A carefully curated stack focused on building scalable, secure, and performant enterprise applications. I believe in choosing the right tool for the job.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.categories.map((category, index) => (
              <motion.div
                key={category.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/5 border border-secondary/10 rounded-3xl p-8 hover:bg-background/10 transition-colors"
              >
                <h3 className="text-xl font-serif font-bold text-primary mb-6">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIndex) => (
                    <span
                      key={sIndex}
                      className="px-4 py-2 rounded-full bg-background/10 text-primary-foreground text-sm font-medium border border-secondary/5 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
            {data.categories.length === 0 && (
              <p className="col-span-full text-secondary/50">No skill categories available yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
