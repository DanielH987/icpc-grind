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
    javaScript: 'js',
    python: 'python',
    cpp: 'cpp',
    java: 'java',
  };

  const backendLanguage = languageMap[language];

  if (!backendLanguage) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  let sanitizedCode = code;

  if (language === 'python') {
    // Remove print(...) statements
    sanitizedCode = code.replace(/^\s*print\(.*?\)\s*$/gm, '');
  } else if (language === 'javaScript') {
    // Remove console.log(...) statements
    sanitizedCode = code.replace(/^\s*console\.log\(.*?\)\s*;?\s*$/gm, '');
  } else if (language === 'cpp') {
    // Remove std::cout << ...; and printf(...) statements
    sanitizedCode = code
      .replace(/^\s*std::cout\s*<<.*?;\s*$/gm, '')
      .replace(/^\s*printf\(.*?\);\s*$/gm, '');
  }


  try {
    const response = await fetch(`${ICPC_BACKEND_URL}/runSecret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: sanitizedCode,
        language,
        problemId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Execution failed' });
    }

    return res.json({
      output: data || data.error || 'Execution failed'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Execution failed', details: error });
  }
}
