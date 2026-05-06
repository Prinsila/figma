import { useEffect, useState } from 'react';
import { TrendingUp, FileText, MessagesSquare, BarChart } from 'lucide-react';

interface Stats {
  totalContent: number;
  totalMeetings: number;
  totalSurveys: number;
  recentActivity: Array<{ type: string; timestamp: string; title: string }>;
}

export function UsageStats() {
  const [stats, setStats] = useState<Stats>({
    totalContent: 0,
    totalMeetings: 0,
    totalSurveys: 0,
    recentActivity: []
  });

  useEffect(() => {
    const contentStr = localStorage.getItem('jamlikt-saved-content');
    const meetingsStr = localStorage.getItem('jamlikt-meeting-summaries');
    const surveysStr = localStorage.getItem('jamlikt-survey-analyses');

    const content = contentStr ? JSON.parse(contentStr) : [];
    const meetings = meetingsStr ? JSON.parse(meetingsStr) : [];
    const surveys = surveysStr ? JSON.parse(surveysStr) : [];

    const activity = [
      ...content.map((c: any) => ({ type: 'Content', timestamp: c.timestamp, title: c.topic })),
      ...meetings.map((m: any) => ({ type: 'Meeting', timestamp: m.timestamp, title: m.summary.title })),
      ...surveys.map((s: any) => ({ type: 'Survey', timestamp: s.timestamp, title: s.surveyTopic }))
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);

    setStats({
      totalContent: content.length,
      totalMeetings: meetings.length,
      totalSurveys: surveys.length,
      recentActivity: activity
    });
  }, []);

  const exportAllData = () => {
    const contentStr = localStorage.getItem('jamlikt-saved-content');
    const meetingsStr = localStorage.getItem('jamlikt-meeting-summaries');
    const surveysStr = localStorage.getItem('jamlikt-survey-analyses');

    const allData = {
      exportDate: new Date().toISOString(),
      content: contentStr ? JSON.parse(contentStr) : [],
      meetings: meetingsStr ? JSON.parse(meetingsStr) : [],
      surveys: surveysStr ? JSON.parse(surveysStr) : []
    };

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jamlikt-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-card border border-border rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h3>Usage Overview</h3>
        <button
          onClick={exportAllData}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 text-sm"
        >
          Export All Data
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MessagesSquare className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Content Created</span>
          </div>
          <p className="text-2xl font-medium">{stats.totalContent}</p>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Meetings Processed</span>
          </div>
          <p className="text-2xl font-medium">{stats.totalMeetings}</p>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BarChart className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Surveys Analyzed</span>
          </div>
          <p className="text-2xl font-medium">{stats.totalSurveys}</p>
        </div>
      </div>

      {stats.recentActivity.length > 0 && (
        <div>
          <h4 className="mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Recent Activity
          </h4>
          <div className="space-y-2">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <span className="text-xs text-primary">{activity.type}</span>
                  <p className="text-sm">{activity.title}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
