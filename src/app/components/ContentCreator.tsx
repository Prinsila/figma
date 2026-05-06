import { useState } from 'react';
import { Sparkles, Copy, Check, Save, History } from 'lucide-react';
import { TemplateSelector, Template } from './TemplateSelector';
import { socialMediaTemplates, blogTemplates, websiteTemplates, contentLibrary } from '../data/templates';

interface ContentCreatorProps {
  type: 'social' | 'blog' | 'website';
}

interface SavedContent {
  id: string;
  content: string;
  topic: string;
  timestamp: string;
  type: string;
}

export function ContentCreator({ type }: ContentCreatorProps) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [focusArea, setFocusArea] = useState('equality');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [savedContents, setSavedContents] = useState<SavedContent[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const contentTypes = {
    social: 'Social Media Post',
    blog: 'Blog Article',
    website: 'Website Content'
  };

  const templates = type === 'social' ? socialMediaTemplates : type === 'blog' ? blogTemplates : websiteTemplates;

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.id);
    setTopic(template.prefilledTopic);
    setTone(template.tone);
    setFocusArea(template.focusArea);
  };

  // Load saved content from localStorage on mount
  useState(() => {
    const saved = localStorage.getItem('jamlikt-saved-content');
    if (saved) {
      setSavedContents(JSON.parse(saved));
    }
  });

  const generateContent = () => {
    setIsGenerating(true);

    // Enhanced AI-like generation with templates and content library
    setTimeout(() => {
      let content = '';
      const library = contentLibrary[focusArea as keyof typeof contentLibrary];
      const randomStat = library.statistics[Math.floor(Math.random() * library.statistics.length)];
      const randomQuote = library.quotes[Math.floor(Math.random() * library.quotes.length)];

      if (type === 'social') {
        const emoji = focusArea === 'childrens-rights' ? '👶' : focusArea === 'diversity' ? '🌍' : focusArea === 'democracy' ? '🗳️' : focusArea === 'integration' ? '🤝' : '⚖️';

        if (tone === 'engaging') {
          content = `${emoji} ${topic}\n\nDid you know? ${randomStat}\n\nAt Jämlikt.nu, we're working every day to change these numbers. Through our ${focusArea.replace('-', ' ')} programs, we empower children, youth, and communities.\n\n💪 Want to make a difference? Join our upcoming workshops!\n\n#Jämlikt #${focusArea.replace('-', '')} #HumanRights #ChildrensRights #MakeADifference`;
        } else if (tone === 'inspiring') {
          content = `${emoji} ${topic}\n\n"${randomQuote}"\n\nEvery child deserves a future free from discrimination. That's why Jämlikt.nu focuses on ${focusArea.replace('-', ' ')}, working at local, national, and international levels.\n\n✨ Together, we're creating lasting change.\n\n#Equality #Inclusion #ChildrensRights #Jämlikt`;
        } else if (tone === 'educational') {
          content = `${emoji} ${topic}\n\nKey insight: ${randomStat}\n\nOur ${focusArea.replace('-', ' ')} initiatives are grounded in:\n✓ Convention on the Rights of the Child\n✓ Intersectional perspective\n✓ Evidence-based approaches\n\nLearn more about our work → jämlikt.nu\n\n#Education #HumanRights #Equality #Jämlikt`;
        } else {
          content = `${emoji} ${topic}\n\nJämlikt.nu announces new ${focusArea.replace('-', ' ')} programs for 2026.\n\nResearch shows: ${randomStat}\n\nOur intersectional approach integrates all grounds of discrimination, working with children, youth, parents, and educators across Sweden and internationally.\n\nFor more information: jämlikt.nu\n\n#Jämlikt #${focusArea.replace('-', '')} #HumanRights`;
        }
      } else if (type === 'blog') {
        content = `# ${topic}\n\n${randomQuote}\n\n## Why This Matters\n\nIn our work at Jämlikt.nu, we've witnessed the transformative power of ${focusArea.replace('-', ' ')} initiatives. The data speaks clearly: ${randomStat}\n\nBut behind every statistic is a child whose life can be changed through dedicated advocacy and education.\n\n## The Challenge We Face\n\nThe Convention on the Rights of the Child establishes that every child has fundamental rights to:\n\n- **Non-discrimination** - Equal treatment regardless of background\n- **Best interests** - Decisions made with the child's welfare as priority  \n- **Life and development** - Access to resources needed to thrive\n- **Participation** - A voice in matters affecting them\n\nYet discrimination persists. Young people continue to face barriers based on ethnicity, religion, disability, socioeconomic status, and other grounds.\n\n## Our Intersectional Approach\n\nAt Jämlikt.nu, we don't see these issues in isolation. Our intersectional perspective recognizes that:\n\n- Children experience multiple, overlapping forms of discrimination\n- Effective solutions must address root causes, not just symptoms\n- ${library.keywords.slice(0, 3).join(', ')} are interconnected\n\nOur programs integrate research, knowledge exchange, and direct engagement:\n\n### Research & Analysis\nEvidence-based projects that illuminate patterns of inequality and identify effective interventions.\n\n### Knowledge Exchange  \nSharing best practices across local, national, and international networks to amplify impact.\n\n### Direct Outreach\nPrograms with children, young people, parents, educators, and community leaders—because real change happens through relationships.\n\n## Measuring Impact\n\n${randomStat} This isn't just a number—it represents real progress in real communities.\n\n## Moving Forward Together\n\nCreating truly equitable conditions for all children requires sustained commitment. It means:\n\n- Listening to young people and centering their voices\n- Challenging discriminatory systems and practices  \n- Building coalitions across sectors and communities\n- Staying grounded in human rights principles\n\nThrough our ${focusArea.replace('-', ' ')} work, we're not just changing policies—we're changing lives.\n\n---\n\n*Jämlikt.nu works to improve living conditions for children, young people, and adults through human rights and the Convention on the Rights of the Child. Learn more about our programs at jämlikt.nu*`;
      } else {
        content = `## ${topic}\n\n> ${randomQuote}\n\n### Building a More Equitable Future\n\nJämlikt.nu is committed to advancing ${focusArea.replace('-', ' ')} through evidence-based programs and advocacy. We work at local, national, and international levels to improve living conditions for children, young people, and adults.\n\n### Our Focus Areas\n\n**Equality** - Creating spaces where all voices are heard and valued\n\n**Diversity** - Celebrating and supporting cultural richness in our communities  \n\n**Integration** - Building bridges and fostering mutual understanding\n\n**Democracy** - Empowering participation, especially among young people\n\n**Human Rights** - Grounding all our work in fundamental rights and dignity\n\n### Impact by the Numbers\n\n${randomStat}\n\nOur intersectional approach ensures that we address all grounds of discrimination, recognizing how different forms of inequality intersect and compound.\n\n### How We Work\n\n**With Children & Youth** - Direct programs that give young people voice and agency\n\n**With Parents & Families** - Resources and education to support children's rights\n\n**With Educators** - Training and tools for creating inclusive environments  \n\n**With Communities** - Building coalitions for systemic change\n\n### Get Involved\n\nWhether you're an educator, parent, young person, or community leader, there's a place for you in this work.\n\n[Explore Our Programs](#programs) | [Upcoming Workshops](#workshops) | [Contact Us](#contact)\n\n---\n\n*Founded on the principles of the Convention on the Rights of the Child, Jämlikt.nu brings human rights to life in communities across Sweden and beyond.*`;
      }

      setGeneratedContent(content);
      setIsGenerating(false);
    }, 1500);
  };

  const saveContent = () => {
    const newContent: SavedContent = {
      id: Date.now().toString(),
      content: generatedContent,
      topic,
      timestamp: new Date().toLocaleString('sv-SE'),
      type: contentTypes[type]
    };

    const updated = [newContent, ...savedContents];
    setSavedContents(updated);
    localStorage.setItem('jamlikt-saved-content', JSON.stringify(updated));
  };

  const loadHistory = () => {
    const saved = localStorage.getItem('jamlikt-saved-content');
    if (saved) {
      setSavedContents(JSON.parse(saved));
    }
    setShowHistory(true);
  };

  const loadSavedContent = (saved: SavedContent) => {
    setGeneratedContent(saved.content);
    setTopic(saved.topic);
    setShowHistory(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">{contentTypes[type]} Generator</h2>
          <p className="text-muted-foreground">Create compelling content focused on equality and human rights</p>
        </div>
        <button
          onClick={loadHistory}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 flex items-center gap-2"
        >
          <History className="w-4 h-4" />
          History
        </button>
      </div>

      {showHistory ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3>Saved Content History</h3>
            <button
              onClick={() => setShowHistory(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
          </div>
          {savedContents.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No saved content yet</p>
          ) : (
            <div className="space-y-3">
              {savedContents.map((saved) => (
                <button
                  key={saved.id}
                  onClick={() => loadSavedContent(saved)}
                  className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm">{saved.topic}</h4>
                    <span className="text-xs text-muted-foreground">{saved.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{saved.type}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{saved.content}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelect={handleTemplateSelect}
          />

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Topic or Main Message</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., Children's right to education"
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg"
                >
                  <option value="professional">Professional</option>
                  <option value="engaging">Engaging</option>
                  <option value="inspiring">Inspiring</option>
                  <option value="educational">Educational</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Focus Area</label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg"
                >
                  <option value="equality">Equality</option>
                  <option value="diversity">Diversity</option>
                  <option value="integration">Integration</option>
                  <option value="democracy">Democracy</option>
                  <option value="childrens-rights">Children's Rights</option>
                  <option value="human-rights">Human Rights</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateContent}
              disabled={!topic || isGenerating}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </button>
          </div>

          {generatedContent && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3>Generated Content</h3>
                <div className="flex gap-2">
                  <button
                    onClick={saveContent}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap max-h-96 overflow-y-auto">
                {generatedContent}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
