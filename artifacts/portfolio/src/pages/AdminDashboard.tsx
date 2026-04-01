import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  useGetMe,
  useGetPortfolioContent,
  useUpdateHeroContent,
  useUpdateExperienceContent,
  useUpdateProjectsContent,
  useUpdateSkillsContent,
  useUpdateEducationContent,
  useUpdateAchievementsContent,
  useLogout,
  HeroContent,
  ExperienceContent,
  ProjectsContent,
  SkillsContent,
  EducationContent,
  AchievementsContent
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, LogOut, ArrowLeft, Save } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: auth, isLoading: authLoading } = useGetMe();
  const { data: content, isLoading: contentLoading } = useGetPortfolioContent();
  const logout = useLogout();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  useEffect(() => {
    if (!authLoading && (!auth || !auth.authenticated)) {
      setLocation("/admin/login");
    }
  }, [auth, authLoading, setLocation]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("portfolio_admin_token");
        toast({ title: "Logged out" });
        setLocation("/admin/login");
      }
    });
  };

  if (authLoading || contentLoading || !content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 selection:bg-primary/20 selection:text-primary pb-24">
      <header className="bg-background border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")} title="Back to site">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-serif text-xl font-bold">Portfolio Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
              Logged in as <span className="text-foreground">{auth?.username}</span>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 mt-8">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="w-full justify-start h-auto flex-wrap p-1 bg-background border border-border rounded-xl shadow-sm mb-8 gap-1">
            <TabsTrigger value="hero" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Hero</TabsTrigger>
            <TabsTrigger value="experience" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Experience</TabsTrigger>
            <TabsTrigger value="projects" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Projects</TabsTrigger>
            <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Skills</TabsTrigger>
            <TabsTrigger value="education" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Education</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="hero"><HeroTab content={content.hero} /></TabsContent>
          <TabsContent value="experience"><ExperienceTab content={content.experience} /></TabsContent>
          <TabsContent value="projects"><ProjectsTab content={content.projects} /></TabsContent>
          <TabsContent value="skills"><SkillsTab content={content.skills} /></TabsContent>
          <TabsContent value="education"><EducationTab content={content.education} /></TabsContent>
          <TabsContent value="achievements"><AchievementsTab content={content.achievements} /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// Section Tab Components
// ----------------------------------------------------------------------

function HeroTab({ content }: { content: HeroContent }) {
  const [data, setData] = useState(content);
  const update = useUpdateHeroContent();
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate({ data }, {
      onSuccess: () => toast({ title: "Hero updated successfully" }),
      onError: () => toast({ title: "Error updating Hero", variant: "destructive" })
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>Personal details and main landing area.</CardDescription>
          </div>
          <Button onClick={handleSave} disabled={update.isPending}>
            {update.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Tagline</Label>
            <Textarea value={data.tagline} onChange={e => setData({ ...data, tagline: e.target.value })} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>LinkedIn URL</Label>
            <Input value={data.linkedin} onChange={e => setData({ ...data, linkedin: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>GitHub URL</Label>
            <Input value={data.github} onChange={e => setData({ ...data, github: e.target.value })} />
          </div>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Checkbox 
            id="availableForWork" 
            checked={data.availableForWork} 
            onCheckedChange={checked => setData({ ...data, availableForWork: checked as boolean })}
          />
          <Label htmlFor="availableForWork" className="font-medium cursor-pointer">Available for new opportunities</Label>
        </div>
      </CardContent>
    </Card>
  );
}

function ExperienceTab({ content }: { content: ExperienceContent }) {
  const [data, setData] = useState(content);
  const update = useUpdateExperienceContent();
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate({ data }, {
      onSuccess: () => toast({ title: "Experience updated successfully" }),
      onError: () => toast({ title: "Error updating Experience", variant: "destructive" })
    });
  };

  const addItem = () => {
    setData({
      items: [...data.items, { id: crypto.randomUUID(), company: "", payroll: null, role: "", startDate: "", endDate: null, location: "", bullets: [] }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ items: newItems });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Manage your professional work history.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Add</Button>
            <Button onClick={handleSave} disabled={update.isPending}>
              {update.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {data.items.map((item, index) => (
          <div key={item.id} className="p-6 border border-border rounded-xl bg-background/50 relative group">
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input 
                  value={item.company} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].company = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input 
                  value={item.role} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].role = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input 
                  value={item.startDate} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].startDate = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input 
                  value={item.endDate || ""} 
                  placeholder="Leave empty for Present"
                  onChange={e => {
                    const items = [...data.items];
                    items[index].endDate = e.target.value || null;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Payroll (optional)</Label>
                <Input 
                  value={item.payroll || ""} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].payroll = e.target.value || null;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  value={item.location} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].location = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Highlights (one per line)</Label>
                <Textarea 
                  value={item.bullets.join("\n")}
                  rows={5}
                  onChange={e => {
                    const items = [...data.items];
                    items[index].bullets = e.target.value.split("\n").filter(Boolean);
                    setData({ items });
                  }} 
                />
              </div>
            </div>
          </div>
        ))}
        {data.items.length === 0 && <p className="text-center text-muted-foreground py-8 border border-dashed rounded-xl">No experience items yet.</p>}
      </CardContent>
    </Card>
  );
}

function ProjectsTab({ content }: { content: ProjectsContent }) {
  const [data, setData] = useState(content);
  const update = useUpdateProjectsContent();
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate({ data }, {
      onSuccess: () => toast({ title: "Projects updated successfully" }),
      onError: () => toast({ title: "Error updating Projects", variant: "destructive" })
    });
  };

  const addItem = () => {
    setData({
      items: [...data.items, { id: crypto.randomUUID(), title: "", techStack: "", description: "", bullets: [], githubUrl: null, period: null }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ items: newItems });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Featured systems and architectures.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Add</Button>
            <Button onClick={handleSave} disabled={update.isPending}>
              {update.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {data.items.map((item, index) => (
          <div key={item.id} className="p-6 border border-border rounded-xl bg-background/50 relative group">
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={item.title} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].title = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <Input 
                  value={item.techStack} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].techStack = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL (optional)</Label>
                <Input 
                  value={item.githubUrl || ""} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].githubUrl = e.target.value || null;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Period (optional)</Label>
                <Input 
                  value={item.period || ""} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].period = e.target.value || null;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea 
                  value={item.description} 
                  rows={2}
                  onChange={e => {
                    const items = [...data.items];
                    items[index].description = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Features (one per line)</Label>
                <Textarea 
                  value={item.bullets.join("\n")}
                  rows={4}
                  onChange={e => {
                    const items = [...data.items];
                    items[index].bullets = e.target.value.split("\n").filter(Boolean);
                    setData({ items });
                  }} 
                />
              </div>
            </div>
          </div>
        ))}
        {data.items.length === 0 && <p className="text-center text-muted-foreground py-8 border border-dashed rounded-xl">No projects yet.</p>}
      </CardContent>
    </Card>
  );
}

function SkillsTab({ content }: { content: SkillsContent }) {
  const [data, setData] = useState(content);
  const update = useUpdateSkillsContent();
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate({ data }, {
      onSuccess: () => toast({ title: "Skills updated successfully" }),
      onError: () => toast({ title: "Error updating Skills", variant: "destructive" })
    });
  };

  const addItem = () => {
    setData({
      categories: [...data.categories, { id: crypto.randomUUID(), title: "", skills: [] }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...data.categories];
    newItems.splice(index, 1);
    setData({ categories: newItems });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Technical arsenal categorized by domain.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Add</Button>
            <Button onClick={handleSave} disabled={update.isPending}>
              {update.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.categories.map((cat, index) => (
            <div key={cat.id} className="p-5 border border-border rounded-xl bg-background/50 relative group">
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md w-8 h-8"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Category Title</Label>
                  <Input 
                    value={cat.title} 
                    onChange={e => {
                      const categories = [...data.categories];
                      categories[index].title = e.target.value;
                      setData({ categories });
                    }} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Skills (comma separated)</Label>
                  <Textarea 
                    value={cat.skills.join(", ")}
                    rows={3}
                    onChange={e => {
                      const categories = [...data.categories];
                      categories[index].skills = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                      setData({ categories });
                    }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {data.categories.length === 0 && <p className="text-center text-muted-foreground py-8 border border-dashed rounded-xl">No skill categories yet.</p>}
      </CardContent>
    </Card>
  );
}

function EducationTab({ content }: { content: EducationContent }) {
  const [data, setData] = useState(content);
  const update = useUpdateEducationContent();
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate({ data }, {
      onSuccess: () => toast({ title: "Education updated successfully" }),
      onError: () => toast({ title: "Error updating Education", variant: "destructive" })
    });
  };

  const addItem = () => {
    setData({
      items: [...data.items, { id: crypto.randomUUID(), institution: "", degree: "", period: "", location: "", percentage: null }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ items: newItems });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Education</CardTitle>
            <CardDescription>Academic background.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Add</Button>
            <Button onClick={handleSave} disabled={update.isPending}>
              {update.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.items.map((item, index) => (
          <div key={item.id} className="p-6 border border-border rounded-xl bg-background/50 relative group">
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input 
                  value={item.degree} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].degree = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input 
                  value={item.institution} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].institution = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Period</Label>
                <Input 
                  value={item.period} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].period = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  value={item.location} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].location = e.target.value;
                    setData({ items });
                  }} 
                />
              </div>
              <div className="space-y-2">
                <Label>Percentage / GPA (optional)</Label>
                <Input 
                  value={item.percentage || ""} 
                  onChange={e => {
                    const items = [...data.items];
                    items[index].percentage = e.target.value || null;
                    setData({ items });
                  }} 
                />
              </div>
            </div>
          </div>
        ))}
        {data.items.length === 0 && <p className="text-center text-muted-foreground py-8 border border-dashed rounded-xl">No education items yet.</p>}
      </CardContent>
    </Card>
  );
}

function AchievementsTab({ content }: { content: AchievementsContent }) {
  const [data, setData] = useState(content);
  const update = useUpdateAchievementsContent();
  const { toast } = useToast();

  const handleSave = () => {
    update.mutate({ data }, {
      onSuccess: () => toast({ title: "Achievements updated successfully" }),
      onError: () => toast({ title: "Error updating Achievements", variant: "destructive" })
    });
  };

  const addItem = () => {
    setData({
      items: [...data.items, { id: crypto.randomUUID(), title: "", description: "" }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ items: newItems });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Awards and recognitions.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Add</Button>
            <Button onClick={handleSave} disabled={update.isPending}>
              {update.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((item, index) => (
            <div key={item.id} className="p-5 border border-border rounded-xl bg-background/50 relative group">
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-md w-8 h-8"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Award Title</Label>
                  <Input 
                    value={item.title} 
                    onChange={e => {
                      const items = [...data.items];
                      items[index].title = e.target.value;
                      setData({ items });
                    }} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={item.description} 
                    rows={3}
                    onChange={e => {
                      const items = [...data.items];
                      items[index].description = e.target.value;
                      setData({ items });
                    }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {data.items.length === 0 && <p className="text-center text-muted-foreground py-8 border border-dashed rounded-xl">No achievements yet.</p>}
      </CardContent>
    </Card>
  );
}
