import type { NextApiRequest, NextApiResponse } from 'next';

const ICPC_BACKEND_URL = process.env.ICPC_BACKEND_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code, language, problemId } = req.body;

  if (!code || !language || !problemId) {
    return res.status(400).json({ error: 'Missing code, language, or problemId' });
  }

  const languageMap: Record<string, string> = {
    javascript: 'js',
    python: 'python',
    cpp: 'cpp',
  };

  const backendLanguage = languageMap[language];

  if (!backendLanguage) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  try {
    const response = await fetch(`${ICPC_BACKEND_URL}/runSecret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language: backendLanguage,
        problemId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Execution failed' });
    }

    return res.status(200).json({
      problemId: data.problemId,
      totalCount: data.totalCount,
      passedCount: data.passedCount,
      passed: data.passed,
      message: data.message,
      results: data.results,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Execution failed', details: error });
  }
}
