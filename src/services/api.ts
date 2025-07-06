const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface AnalysisResult {
  success: boolean;
  analysisId: string;
  score: number;
  analysis: {
    strengths: string[];
    improvements: string[];
    keywords: string[];
    atsScore: number;
    suggestions: string[];
  };
  rewrittenResume: string;
  coverLetter: string;
}

export interface AnalysisHistory {
  _id: string;
  fileName: string;
  fileType: 'text' | 'file';
  targetRole: string;
  score: number;
  createdAt: string;
}

class ApiService {
  // Resume Analysis
  async analyzeResumeText(resumeText: string, targetRole: string, userId: string): Promise<AnalysisResult> {
    const response = await fetch(`${API_URL}/analyze/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText,
        targetRole,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    return response.json();
  }

  async analyzeResumeFile(file: File, targetRole: string, userId: string): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', targetRole);
    formData.append('userId', userId);

    const response = await fetch(`${API_URL}/analyze/file`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    return response.json();
  }

  async getAnalysisHistory(userId: string): Promise<AnalysisHistory[]> {
    const response = await fetch(`${API_URL}/analyses/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch analysis history');
    }

    return response.json();
  }

  async getAnalysisDetails(analysisId: string) {
    const response = await fetch(`${API_URL}/analysis/${analysisId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch analysis details');
    }

    return response.json();
  }

  async deleteAnalysis(analysisId: string) {
    const response = await fetch(`${API_URL}/analysis/${analysisId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete analysis');
    }

    return response.json();
  }

  async downloadResume(analysisId: string) {
    try {
      const response = await fetch(`${API_URL}/download/resume/${analysisId}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to download resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-enhanced-${new Date().getTime()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }

  async downloadCoverLetter(analysisId: string) {
    try {
      const response = await fetch(`${API_URL}/download/coverletter/${analysisId}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to download cover letter');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cover-letter-${new Date().getTime()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }

  async downloadReport(analysisId: string) {
    try {
      const response = await fetch(`${API_URL}/download/report/${analysisId}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to download report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analysis-report-${new Date().getTime()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();