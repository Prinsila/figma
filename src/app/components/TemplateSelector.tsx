import { Check } from 'lucide-react';

export interface Template {
  id: string;
  name: string;
  description: string;
  focusArea: string;
  tone: string;
  prefilledTopic: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string | null;
  onSelect: (template: Template) => void;
}

export function TemplateSelector({ templates, selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block">Quick Templates</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`p-4 border rounded-lg text-left transition-all ${
              selectedTemplate === template.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm">{template.name}</h4>
              {selectedTemplate === template.id && (
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
