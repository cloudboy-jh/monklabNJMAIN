import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    modelTemperature: parseFloat(process.env.MODEL_TEMPERATURE || '0.7'),
    modelChoice: process.env.MODEL_CHOICE || 'gpt-4o',
    systemPrompt: process.env.SYSTEM_PROMPT || 'You are an AI assistant for MonkLab...'
  });
}