import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { useGetPortfolioContent } from "@workspace/api-client-react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: content, isLoading } = useGetPortfolioContent();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-serif">Loading Portfolio...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive font-serif text-lg">Unable to load content.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Hero data={content.hero} />
        <Experience data={content.experience} />
        <Projects data={content.projects} />
        <Skills data={content.skills} />
        <Education education={content.education} achievements={content.achievements} />
        <Contact data={content.hero} />
      </main>
    </div>
  );
}
