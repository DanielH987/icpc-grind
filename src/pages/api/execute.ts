import type { NextApiRequest, NextApiResponse } from 'next';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const RAPIDAPI_KEY = process.env.JUDGE0_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code, language, expected_output } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: 'Missing code or language' });
  }

  const languageMap: Record<string, number> = {
    javascript: 63, // Node.js
    python: 71, // Python 3
    cpp: 54, // C++
  };

  if (!languageMap[language]) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  try {
    const delete_later = {
      source_code: code,
      language_id: languageMap[language],
      stdin: '',
      expected_output: expected_output,
    }
    const submissionResponse = await fetch(`${JUDGE0_API_URL}?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': RAPIDAPI_KEY!,
      },
      body: JSON.stringify(delete_later),
    });

    console.log(delete_later);

    const submissionResult = await submissionResponse.json();
    console.log(submissionResult);


    return res.json({
      output: submissionResult.stdout || submissionResult.stderr || 'Execution failed',
      status: submissionResult.status.description
    });
  } catch (error) {
    return res.status(500).json({ error: 'Execution failed' });
  }
}
