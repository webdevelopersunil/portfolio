import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import type { EducationContent, AchievementsContent } from "@workspace/api-client-react";

export default function Education({ 
  education, 
  achievements 
}: { 
  education: EducationContent; 
  achievements: AchievementsContent; 
}) {
  return (
    <section id="education" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-secondary/50 text-primary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold">Education & Training</h3>
            </div>

            <div className="space-y-8">
              {education.items.map((edu, index) => (
                <div key={edu.id || index} className="relative pl-6 border-l border-border">
                  <div className={`absolute -left-[5px] top-2 w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-border'}`} />
                  <h4 className="text-lg font-bold text-foreground">{edu.degree}</h4>
                  <p className="text-primary font-medium mt-1">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {edu.location} • {edu.period} {edu.percentage && `• ${edu.percentage}`}
                  </p>
                </div>
              ))}
              {education.items.length === 0 && (
                <p className="text-muted-foreground pl-6">No education history available.</p>
              )}
            </div>
          </motion.div>

          {/* Achievements Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-secondary/50 text-primary">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold">Achievements</h3>
            </div>

            <div className="space-y-4">
              {achievements.items.map((ach, index) => (
                <div key={ach.id || index} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                  <h4 className="text-lg font-bold text-foreground mb-2">{ach.title}</h4>
                  <p className="text-sm text-muted-foreground">{ach.description}</p>
                </div>
              ))}
              {achievements.items.length === 0 && (
                <p className="text-muted-foreground">No achievements listed.</p>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
