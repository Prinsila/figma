import { useState, useEffect } from 'react';
import { FileText, Download, Sparkles, Save, History } from 'lucide-react';

interface SavedSummary {
  id: string;
  summary: any;
  timestamp: string;
  meetingType: string;
}

export function MeetingNotesProcessor() {
  const [rawNotes, setRawNotes] = useState('');
  const [meetingType, setMeetingType] = useState('team');
  const [savedSummaries, setSavedSummaries] = useState<SavedSummary[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [summary, setSummary] = useState<{
    title: string;
    date: string;
    attendees: string;
    keyPoints: string[];
    actionItems: string[];
    decisions: string[];
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processMeeting = () => {
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const today = new Date().toLocaleDateString('sv-SE');

      setSummary({
        title: meetingType === 'team' ? 'Team Meeting Summary' : meetingType === 'board' ? 'Board Meeting Summary' : 'Project Planning Summary',
        date: today,
        attendees: 'Team members present',
        keyPoints: [
          'Discussed upcoming equality workshop for local schools',
          'Reviewed survey results from recent youth integration program',
          'Analyzed feedback from Convention on the Rights of the Child training sessions',
          'Evaluated effectiveness of current diversity initiatives'
        ],
        actionItems: [
          'Finalize workshop materials by end of week',
          'Prepare survey summary report for board presentation',
          'Schedule follow-up sessions with participating schools',
          'Update website with latest research findings'
        ],
        decisions: [
          'Approved budget allocation for autumn integration programs',
          'Agreed to expand outreach to three additional municipalities',
          'Committed to intersectional approach in all new projects'
        ]
      });

      setIsProcessing(false);
    }, 2000);
  };

  const downloadSummary = () => {
    if (!summary) return;

    const content = `${summary.title}\nDate: ${summary.date}\n\nATTENDEES\n${summary.attendees}\n\nKEY DISCUSSION POINTS\n${summary.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nACTION ITEMS\n${summary.actionItems.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\nDECISIONS MADE\n${summary.decisions.map((d, i) => `${i + 1}. ${d}`).join('\n')}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-summary-${summary.date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveSummary = () => {
    if (!summary) return;

    const newSummary: SavedSummary = {
      id: Date.now().toString(),
      summary,
      timestamp: new Date().toLocaleString('sv-SE'),
      meetingType
    };

    const updated = [newSummary, ...savedSummaries];
    setSavedSummaries(updated);
    localStorage.setItem('jamlikt-meeting-summaries', JSON.stringify(updated));
  };

  const loadHistory = () => {
    const saved = localStorage.getItem('jamlikt-meeting-summaries');
    if (saved) {
      setSavedSummaries(JSON.parse(saved));
    }
    setShowHistory(true);
  };

  const loadSavedSummary = (saved: SavedSummary) => {
    setSummary(saved.summary);
    setMeetingType(saved.meetingType);
    setShowHistory(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('jamlikt-meeting-summaries');
    if (saved) {
      setSavedSummaries(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">Meeting Notes Processor</h2>
          <p className="text-muted-foreground">Transform raw meeting notes into structured summaries</p>
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
            <h3>Saved Meeting Summaries</h3>
            <button
              onClick={() => setShowHistory(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
          </div>
          {savedSummaries.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No saved summaries yet</p>
          ) : (
            <div className="space-y-3">
              {savedSummaries.map((saved) => (
                <button
                  key={saved.id}
                  onClick={() => loadSavedSummary(saved)}
                  className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm">{saved.summary.title}</h4>
                    <span className="text-xs text-muted-foreground">{saved.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Date: {saved.summary.date}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Meeting Type</label>
          <select
            value={meetingType}
            onChange={(e) => setMeetingType(e.target.value)}
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg"
          >
            <option value="team">Team Meeting</option>
            <option value="board">Board Meeting</option>
            <option value="planning">Project Planning</option>
            <option value="stakeholder">Stakeholder Meeting</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Raw Meeting Notes</label>
          <textarea
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            placeholder="Paste your meeting notes here... Include discussions, decisions, and action items."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg h-48 resize-none"
          />
        </div>

        <button
          onClick={processMeeting}
          disabled={!rawNotes || isProcessing}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isProcessing ? 'Processing...' : 'Generate Summary'}
        </button>
      </div>

          {summary && (
            <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <h3>{summary.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={saveSummary}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={downloadSummary}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground">Date: {summary.date}</p>
              <p className="text-muted-foreground">Attendees: {summary.attendees}</p>
            </div>

            <div>
              <h4 className="mb-2">Key Discussion Points</h4>
              <ul className="space-y-2">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2">Action Items</h4>
              <ul className="space-y-2">
                {summary.actionItems.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-muted-foreground">□</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2">Decisions Made</h4>
              <ul className="space-y-2">
                {summary.decisions.map((decision, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-muted-foreground">✓</span>
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
