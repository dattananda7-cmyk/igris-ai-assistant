const axios = require('axios');
const env = require('./env');
const logger = require('../utils/logger');

const openaiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Send a message to OpenAI GPT and get a response
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Additional options (temperature, max_tokens, etc.)
 * @returns {Promise<string>} - AI response text
 */
const sendMessage = async (messages, options = {}) => {
  try {
    const response = await openaiClient.post('/chat/completions', {
      model: options.model || env.OPENAI_MODEL,
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 2000,
      top_p: options.top_p || 0.9,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    logger.error('OpenAI API Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI response');
  }
};

/**
 * Stream a message from OpenAI GPT
 * Note: Streaming requires different handling - this is a placeholder
 */
const streamMessage = async (messages, options = {}) => {
  // Streaming implementation for real-time responses
  // This would typically be used with WebSockets
  return sendMessage(messages, options);
};

module.exports = {
  openaiClient,
  sendMessage,
  streamMessage
};
