import type { NextApiRequest, NextApiResponse } from 'next';

const ICPC_BACKEND_URL = process.env.ICPC_BACKEND_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code, language, input, answers } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: 'Missing code or language' });
  }

  const languageMap: Record<string, string> = {
    js: 'js',
    python: 'python',
    cpp: 'cpp',
  };

  if (!languageMap[language]) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  try {
    const submissionResponse = await fetch(`${ICPC_BACKEND_URL}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: language,
        code,
        input,
        answers,
      }),
    });

    const submissionResult = await submissionResponse.json();

    return res.json({
      output: submissionResult || submissionResult.error || 'Execution failed'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Execution failed', details: error });
  }
}
