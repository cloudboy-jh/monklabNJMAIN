import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('Missing OpenAI API key');
      }

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: process.env.MODEL_CHOICE || 'gpt-4-0125-preview',
          messages: req.body.messages,
          temperature: parseFloat(process.env.MODEL_TEMPERATURE || '0.7'),
          max_tokens: req.body.max_tokens,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      res.status(500).json({
        error: 'Error processing your request',
        details: error.response?.data || error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
