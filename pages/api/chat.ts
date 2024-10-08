import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Check the API key
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('Missing OpenAI API key');
      }

      // Log the request body for debugging
      console.log('Request body:', req.body);

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        req.body,
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Return the OpenAI API response
      res.status(200).json(response.data);
    } catch (error: any) {
      // Improved error logging
      console.error('Error:', error.response?.data || error.message);

      // Return a 500 status with detailed error
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
