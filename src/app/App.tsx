import { useState } from "react";
import {
  FileText,
  MessagesSquare,
  Newspaper,
  Globe,
  BarChart,
  Users,
} from "lucide-react";
import { ContentCreator } from "./components/ContentCreator";
import { MeetingNotesProcessor } from "./components/MeetingNotesProcessor";
import { SurveySummarizer } from "./components/SurveySummarizer";
import { UsageStats } from "./components/UsageStats";
import { HelpPanel } from "./components/HelpPanel";

type Tool =
  | "social"
  | "blog"
  | "website"
  | "meeting"
  | "survey";

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool | null>(
    null,
  );

  const tools = [
    {
      id: "social" as Tool,
      name: "Social Media Posts",
      description: "Generate engaging social media content",
      icon: MessagesSquare,
      category: "content",
    },
    {
      id: "blog" as Tool,
      name: "Blog Articles",
      description: "Create in-depth blog posts",
      icon: Newspaper,
      category: "content",
    },
    {
      id: "website" as Tool,
      name: "Website Content",
      description: "Write compelling website copy",
      icon: Globe,
      category: "content",
    },
    {
      id: "meeting" as Tool,
      name: "Meeting Notes",
      description: "Summarize meeting discussions",
      icon: FileText,
      category: "admin",
    },
    {
      id: "survey" as Tool,
      name: "Survey Analysis",
      description: "Extract insights from surveys",
      icon: BarChart,
      category: "admin",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Help Panel */}
      <HelpPanel />

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl">
                Jämlikt.nu AI Assistant
              </h1>
              <p className="text-muted-foreground text-sm">
                Content creation & admin tools for equality
                advocacy
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!activeTool ? (
          <div className="space-y-8">
            {/* Content Creation Section */}
            <section>
              <div className="mb-4">
                <h2 className="mb-1">Content Creation</h2>
                <p className="text-muted-foreground">
                  Generate impactful content for your advocacy
                  work
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools
                  .filter((t) => t.category === "content")
                  .map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors text-left group"
                      >
                        <Icon className="w-8 h-8 text-primary mb-3" />
                        <h3 className="mb-2 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {tool.description}
                        </p>
                      </button>
                    );
                  })}
              </div>
            </section>

            {/* Admin Tasks Section */}
            <section>
              <div className="mb-4">
                <h2 className="mb-1">Admin Tasks</h2>
                <p className="text-muted-foreground">
                  Streamline administrative work and analysis
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools
                  .filter((t) => t.category === "admin")
                  .map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors text-left group"
                      >
                        <Icon className="w-8 h-8 text-primary mb-3" />
                        <h3 className="mb-2 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {tool.description}
                        </p>
                      </button>
                    );
                  })}
              </div>
            </section>

            {/* Usage Stats */}
            <section>
              <UsageStats />
            </section>

            {/* Mission Statement */}
            <div className="p-6 bg-muted rounded-lg border-l-4 border-primary">
              <h3 className="mb-2">About Jämlikt.nu</h3>
              <p className="text-muted-foreground mb-3">
                We work to improve the living conditions of
                children, young people, and adults through human
                rights and the Convention on the Rights of the
                Child.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Equality
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Diversity
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Integration
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Democracy
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Human Rights
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setActiveTool(null)}
              className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to tools
            </button>

            <div className="bg-card border border-border rounded-lg p-6 max-w-4xl mx-auto">
              {(activeTool === "social" ||
                activeTool === "blog" ||
                activeTool === "website") && (
                <ContentCreator type={activeTool} />
              )}
              {activeTool === "meeting" && (
                <MeetingNotesProcessor />
              )}
              {activeTool === "survey" && <SurveySummarizer />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}