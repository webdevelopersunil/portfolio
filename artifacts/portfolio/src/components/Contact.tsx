import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from "lucide-react";
import type { HeroContent } from "@workspace/api-client-react";

export default function Contact({ data }: { data: HeroContent }) {
  return (
    <section id="contact" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-background rounded-[2.5rem] p-8 md:p-16 border border-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
                Let's build something <span className="text-primary italic">great.</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-md leading-relaxed">
                Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-6">
                <a href={`mailto:${data.email}`} className="flex items-center gap-6 group w-fit">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                    <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {data.email}
                    </p>
                  </div>
                </a>
                
                <a href={`tel:${data.phone}`} className="flex items-center gap-6 group w-fit">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                    <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {data.phone}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-6 group w-fit">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                    <p className="text-lg font-bold text-foreground">
                      New Delhi, India
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              <div className="bg-secondary/30 rounded-3xl p-8 border border-border/50">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Connect Online</h3>
                
                <div className="space-y-4">
                  {data.linkedin && (
                    <a
                      href={data.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <Linkedin className="w-6 h-6 text-primary" />
                        <span className="font-medium text-foreground">LinkedIn Profile</span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  )}
                  
                  {data.github && (
                    <a
                      href={data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <Github className="w-6 h-6 text-primary" />
                        <span className="font-medium text-foreground">Github Portfolio</span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-12 text-sm text-muted-foreground text-center lg:text-right">
                <p>© {new Date().getFullYear()} {data.name}. Crafted with intent.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
