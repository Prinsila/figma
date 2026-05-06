import { Lightbulb, X } from 'lucide-react';
import { useState } from 'react';

export function HelpPanel() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 flex items-center justify-center"
      >
        <Lightbulb className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-card border border-border rounded-lg shadow-xl p-6 max-h-[600px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Quick Tips
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-sm">Content Creation Best Practices</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Use templates to jumpstart your content</li>
            <li>• Be specific with your topic for better results</li>
            <li>• Save important content for future reference</li>
            <li>• Match tone to your audience (parents, youth, educators)</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-sm">Meeting Notes Tips</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Include attendees, decisions, and action items</li>
            <li>• Note specific deadlines and responsibilities</li>
            <li>• Save summaries for board reporting</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-sm">Survey Analysis Tips</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Include both quantitative and qualitative data</li>
            <li>• Note demographic information when relevant</li>
            <li>• Use insights to inform program development</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="mb-2 text-sm">Future Enhancements</h4>
          <p className="text-sm text-muted-foreground mb-2">
            This tool currently uses smart templates and content patterns. To unlock real AI-powered generation:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Connect Supabase for user authentication</li>
            <li>• Add an Anthropic API key for Claude AI</li>
            <li>• Enable cloud storage for team collaboration</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="mb-2 text-sm">Data Privacy</h4>
          <p className="text-sm text-muted-foreground">
            All content is currently stored locally in your browser. No data is sent to external servers. Export your data regularly as a backup.
          </p>
        </div>
      </div>
    </div>
  );
}
