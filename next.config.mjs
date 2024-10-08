/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MODEL_TEMPERATURE: process.env.MODEL_TEMPERATURE,
    MODEL_CHOICE: process.env.MODEL_CHOICE,
    SYSTEM_PROMPT: process.env.SYSTEM_PROMPT,
  },
};

export default nextConfig;
