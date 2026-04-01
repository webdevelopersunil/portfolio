import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, portfolioSectionsTable } from "@workspace/db";
import {
  UpdateHeroContentBody,
  UpdateExperienceContentBody,
  UpdateProjectsContentBody,
  UpdateSkillsContentBody,
  UpdateEducationContentBody,
  UpdateAchievementsContentBody,
  GetPortfolioContentResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

async function getSection(section: string): Promise<unknown> {
  const [row] = await db
    .select()
    .from(portfolioSectionsTable)
    .where(eq(portfolioSectionsTable.section, section));
  return row?.content ?? null;
}

async function upsertSection(section: string, content: unknown): Promise<void> {
  await db
    .insert(portfolioSectionsTable)
    .values({ section, content: content as Record<string, unknown> })
    .onConflictDoUpdate({
      target: portfolioSectionsTable.section,
      set: { content: content as Record<string, unknown>, updatedAt: new Date() },
    });
}

router.get("/content", async (req, res): Promise<void> => {
  const [hero, experience, projects, skills, education, achievements] = await Promise.all([
    getSection("hero"),
    getSection("experience"),
    getSection("projects"),
    getSection("skills"),
    getSection("education"),
    getSection("achievements"),
  ]);

  const content = GetPortfolioContentResponse.parse({ hero, experience, projects, skills, education, achievements });
  res.json(content);
});

router.put("/content/hero", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateHeroContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await upsertSection("hero", parsed.data);
  req.log.info("Hero content updated");
  res.json(parsed.data);
});

router.put("/content/experience", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateExperienceContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await upsertSection("experience", parsed.data);
  req.log.info("Experience content updated");
  res.json(parsed.data);
});

router.put("/content/projects", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateProjectsContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await upsertSection("projects", parsed.data);
  req.log.info("Projects content updated");
  res.json(parsed.data);
});

router.put("/content/skills", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateSkillsContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await upsertSection("skills", parsed.data);
  req.log.info("Skills content updated");
  res.json(parsed.data);
});

router.put("/content/education", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateEducationContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await upsertSection("education", parsed.data);
  req.log.info("Education content updated");
  res.json(parsed.data);
});

router.put("/content/achievements", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateAchievementsContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  await upsertSection("achievements", parsed.data);
  req.log.info("Achievements content updated");
  res.json(parsed.data);
});

export async function seedPortfolioContent(): Promise<void> {
  const existing = await getSection("hero");
  if (existing) {
    logger.info("Portfolio content already seeded, skipping");
    return;
  }

  const heroContent = {
    name: "Sunil Kumar",
    title: "Software Developer — Laravel & MERN | API & System Architecture",
    tagline: "Experienced SDE in PHP-Laravel with 6+ years, specializing in MERN AI-driven automation & search.",
    email: "sunikumar300@gmail.com",
    phone: "78769-76192",
    linkedin: "linkedin.com/in/sunilrajputthakur",
    github: "github.com/webdevelopersunil",
    availableForWork: true,
  };

  const experienceContent = {
    items: [
      {
        id: "exp-1",
        company: "Oil and Natural Gas Corporation Ltd.",
        payroll: "CIPL",
        role: "Senior Software Developer",
        startDate: "Dec 2023",
        endDate: null,
        location: "New Delhi, India",
        bullets: [
          "Implemented LDAP-based authentication and RBAC using Laravel Sanctum for enterprise-grade security.",
          "Low-level system design (LLD), including API design, database schema, and service layer abstraction.",
          "Designed RBAC using Passport/Spatie/Fortify for secure authentication and authorization.",
          "Implemented optimized full-text content search, reducing document retrieval time by 50%.",
          "Obtained security clearance after successful VAPT closure with zero high-severity vulnerabilities.",
          "Built queue workers and scheduled tasks using Laravel's queue system and Redis.",
          "Implemented design patterns (Repository, Factory, Singleton, Observer) for code reusability.",
        ],
      },
      {
        id: "exp-2",
        company: "Orion eSolutions Pvt. Ltd.",
        payroll: null,
        role: "Senior Software Engineer",
        startDate: "Nov 2021",
        endDate: "April 2023",
        location: "Mohali, Punjab",
        bullets: [
          "Led individual projects end-to-end, demonstrating autonomy and ownership of deliverables.",
          "Designed architecture from database to production for 2TopTech and Reelkids projects.",
          "Adapted to diverse team structures and project dynamics, showcasing collaborative skills.",
          "Ensured thorough understanding of client needs, emphasizing requirements gathering and analysis.",
        ],
      },
      {
        id: "exp-3",
        company: "Techkno Deviser Pvt. Ltd.",
        payroll: null,
        role: "Software Developer",
        startDate: "Oct 2020",
        endDate: "Oct 2021",
        location: "Mohali, Punjab",
        bullets: [
          "Developed Lyrco PMS with notification alert system, roles, project/team creation, and deadline events.",
          "Designed Indeedhost — a hosting management portal with Stripe payment integration.",
          "Served as problem solver and bug resolver for ERP systems.",
        ],
      },
      {
        id: "exp-4",
        company: "Aquatec Innovative Pvt. Ltd.",
        payroll: null,
        role: "Software Engineer",
        startDate: "April 2019",
        endDate: "Aug 2020",
        location: "Mohali, Punjab",
        bullets: [
          "Developed Meme Generator, Token Management System, and JavaScript Web Games.",
          "Designed MyCEO — a comprehensive org management platform with custom sub-domains per user.",
        ],
      },
      {
        id: "exp-5",
        company: "Crew Software Solution Pvt. Ltd.",
        payroll: null,
        role: "Intern",
        startDate: "Oct 2018",
        endDate: "April 2019",
        location: "Mohali, Punjab",
        bullets: [
          "Designed and developed web software using Ajax, HTML/CSS, Laravel, React, and JavaScript.",
          "Handled testing and quality assurance responsibilities alongside development.",
        ],
      },
    ],
  };

  const projectsContent = {
    items: [
      {
        id: "proj-1",
        title: "Request Management System",
        techStack: "PHP 8.2+, Laravel, Inertia, React, MySQL, Tailwind, Redis",
        description: "A PMS to streamline change requests between developers and project managers.",
        bullets: [
          "Designed approval workflows and change management for project managers to control dev tasks.",
          "Implemented RESTful APIs and Redis for caching and queue management of background jobs.",
          "Wrote unit and feature tests using PHPUnit and Pest to ensure code quality.",
        ],
        githubUrl: null,
        period: "January 2024",
      },
      {
        id: "proj-2",
        title: "DMS — Document Management System",
        techStack: "Node.js, Express, MongoDB, Elasticsearch",
        description: "Advanced document management system with optimized search capabilities.",
        bullets: [
          "Built optimized search with metadata filtering, document categorization, and relevance scoring.",
          "Implemented search analytics — query logging, usage insights, and document coverage analysis.",
        ],
        githubUrl: "https://github.com/webdevelopersunil",
        period: "October 2025",
      },
      {
        id: "proj-3",
        title: "2TOP-TECH — Service Provider Software",
        techStack: "PHP 8.x, Laravel, React, RESTful APIs, Stripe, MySQL, Redis",
        description: "A comprehensive service management system connecting restaurants and service providers.",
        bullets: [
          "Web and mobile APIs for job posting, geo-location tracking, billing, and interview management.",
          "Implemented Laravel Sanctum authentication, Eloquent ORM optimization, and Redis caching.",
          "Features: job matching, lat-long active tracking, time-monitoring, and multi-role support.",
        ],
        githubUrl: "https://github.com/webdevelopersunil",
        period: null,
      },
      {
        id: "proj-4",
        title: "Lyrco — Project Management System",
        techStack: "Laravel, MySQL, Redis, Queue Workers",
        description: "A PMS emphasizing team collaboration, communication, and secure access control.",
        bullets: [
          "Project listing, progress tracking, team management, and role-based access control.",
          "Built queue workers for notifications and scheduled tasks for generating reports.",
          "Optimized database queries and implemented Redis caching for improved performance.",
        ],
        githubUrl: "https://github.com/webdevelopersunil",
        period: "August 2025",
      },
    ],
  };

  const skillsContent = {
    categories: [
      { id: "sk-1", title: "Core Languages", skills: ["PHP (8.x)", "JavaScript", "Python", "Node.js", "HTML5", "CSS3"] },
      { id: "sk-2", title: "Frameworks & Libraries", skills: ["Laravel", "React", "Inertia.js", "Express.js", "Eloquent ORM"] },
      { id: "sk-3", title: "Databases & Caching", skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"] },
      { id: "sk-4", title: "API & Security", skills: ["RESTful APIs", "Laravel Sanctum", "Passport", "JWT", "OAuth2", "LDAP", "RBAC"] },
      { id: "sk-5", title: "DevOps & Cloud", skills: ["Docker", "Git", "CI/CD", "AWS (EC2, S3, RDS)", "Nginx", "Apache", "Laravel Forge"] },
      { id: "sk-6", title: "Architecture & Testing", skills: ["SOLID Principles", "Design Patterns", "System Design", "PHPUnit", "Pest", "Agile/Scrum"] },
    ],
  };

  const educationContent = {
    items: [
      {
        id: "edu-1",
        institution: "Hindu Institute of Management and Technology",
        degree: "Master of Computer Applications",
        period: "March 2020 – September 2022",
        location: "Rohtak, Haryana",
        percentage: "74.5%",
      },
      {
        id: "edu-2",
        institution: "All India Jat Heroes Memorial College",
        degree: "Bachelor of Computer Applications",
        period: "February 2014 – May 2018",
        location: "Rohtak, Haryana",
        percentage: "62.4%",
      },
    ],
  };

  const achievementsContent = {
    items: [
      {
        id: "ach-1",
        title: "Team Player Award",
        description: "Recognized at Orion eSolutions for consistently demonstrating collaboration, effective communication, and a proactive approach in fostering a positive team environment.",
      },
      {
        id: "ach-2",
        title: "Spot-On Award",
        description: "Earned at Orion eSolutions for outstanding contributions to projects, recognized by team leads for consistent commitment to excellence and impactful project delivery.",
      },
    ],
  };

  await Promise.all([
    upsertSection("hero", heroContent),
    upsertSection("experience", experienceContent),
    upsertSection("projects", projectsContent),
    upsertSection("skills", skillsContent),
    upsertSection("education", educationContent),
    upsertSection("achievements", achievementsContent),
  ]);

  logger.info("Portfolio content seeded successfully");
}

export default router;
