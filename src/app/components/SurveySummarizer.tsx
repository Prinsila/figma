import { useState, useEffect } from 'react';
import { BarChart3, Download, Sparkles, Save, History } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SavedAnalysis {
  id: string;
  insights: any;
  surveyTopic: string;
  timestamp: string;
}

export function SurveySummarizer() {
  const [surveyData, setSurveyData] = useState('');
  const [surveyTopic, setSurveyTopic] = useState('');
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [insights, setInsights] = useState<{
    overview: string;
    keyFindings: string[];
    demographics: any[];
    sentiment: any[];
    recommendations: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSurvey = () => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setInsights({
        overview: `Analysis of ${surveyTopic || 'survey responses'} reveals strong engagement and valuable insights for improving equality and inclusion initiatives.`,
        keyFindings: [
          '87% of respondents indicated that diversity education has positive impact on youth development',
          'Integration programs show 73% satisfaction rate among participants',
          'Parents expressed high interest (92%) in learning more about children\'s rights',
          'Young people identify peer discrimination as primary concern (68%)',
          'Need for multilingual resources highlighted by 81% of non-native speakers'
        ],
        demographics: [
          { category: 'Youth (10-18)', responses: 145 },
          { category: 'Parents', responses: 203 },
          { category: 'Educators', responses: 87 },
          { category: 'Community Leaders', responses: 42 }
        ],
        sentiment: [
          { name: 'Very Satisfied', value: 42, color: '#4ade80' },
          { name: 'Satisfied', value: 31, color: '#60a5fa' },
          { name: 'Neutral', value: 18, color: '#fbbf24' },
          { name: 'Needs Improvement', value: 9, color: '#f87171' }
        ],
        recommendations: [
          'Expand diversity workshops to reach more schools across all municipalities',
          'Develop multilingual resource materials for broader accessibility',
          'Create peer support programs to address youth-identified discrimination',
          'Organize parent education sessions on Convention on the Rights of the Child',
          'Strengthen partnerships with community organizations for integrated approach'
        ]
      });

      setIsAnalyzing(false);
    }, 2500);
  };

  const downloadReport = () => {
    if (!insights) return;

    const content = `SURVEY ANALYSIS REPORT\n${surveyTopic || 'Survey'}\n\nOVERVIEW\n${insights.overview}\n\nKEY FINDINGS\n${insights.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n\nRECOMMENDATIONS\n${insights.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-analysis-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveAnalysis = () => {
    if (!insights) return;

    const newAnalysis: SavedAnalysis = {
      id: Date.now().toString(),
      insights,
      surveyTopic,
      timestamp: new Date().toLocaleString('sv-SE')
    };

    const updated = [newAnalysis, ...savedAnalyses];
    setSavedAnalyses(updated);
    localStorage.setItem('jamlikt-survey-analyses', JSON.stringify(updated));
  };

  const loadHistory = () => {
    const saved = localStorage.getItem('jamlikt-survey-analyses');
    if (saved) {
      setSavedAnalyses(JSON.parse(saved));
    }
    setShowHistory(true);
  };

  const loadSavedAnalysis = (saved: SavedAnalysis) => {
    setInsights(saved.insights);
    setSurveyTopic(saved.surveyTopic);
    setShowHistory(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('jamlikt-survey-analyses');
    if (saved) {
      setSavedAnalyses(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Survey Summarizer</h2>
          <p className="text-muted-foreground">Extract insights and patterns from survey responses</p>
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
            <h3>Saved Survey Analyses</h3>
            <button
              onClick={() => setShowHistory(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
          </div>
          {savedAnalyses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No saved analyses yet</p>
          ) : (
            <div className="space-y-3">
              {savedAnalyses.map((saved) => (
                <button
                  key={saved.id}
                  onClick={() => loadSavedAnalysis(saved)}
                  className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm">{saved.surveyTopic}</h4>
                    <span className="text-xs text-muted-foreground">{saved.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{saved.insights.overview}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Survey Topic</label>
          <input
            type="text"
            value={surveyTopic}
            onChange={(e) => setSurveyTopic(e.target.value)}
            placeholder="E.g., Youth Integration Program Feedback"
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2">Survey Data (CSV or raw responses)</label>
          <textarea
            value={surveyData}
            onChange={(e) => setSurveyData(e.target.value)}
            placeholder="Paste survey responses, CSV data, or response summary here..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg h-48 resize-none"
          />
        </div>

        <button
          onClick={analyzeSurvey}
          disabled={!surveyData || isAnalyzing}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Survey'}
        </button>
      </div>

          {insights && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3>Analysis Results</h3>
                <div className="flex gap-2">
                  <button
                    onClick={saveAnalysis}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={downloadReport}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>
              </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="mb-2">Overview</h4>
            <p>{insights.overview}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 bg-card border border-border rounded-lg">
              <h4 className="mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Response Demographics
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={insights.demographics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="category" tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--foreground)' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="responses" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <h4 className="mb-4">Satisfaction Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={insights.sentiment}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name} (${entry.value}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {insights.sentiment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <h4 className="mb-3">Key Findings</h4>
            <ul className="space-y-2">
              {insights.keyFindings.map((finding, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <h4 className="mb-3">Recommendations</h4>
            <ul className="space-y-2">
              {insights.recommendations.map((rec, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-primary">{index + 1}.</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
