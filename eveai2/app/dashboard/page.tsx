'use client';

import React, { useState, FormEvent } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Box, Stack, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image'; // Ensure you have 'next/image' for optimized images'

const typingSpeed = 50; 

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<{ id: string; role: string; content: string; isEditing?: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [editMessage, setEditMessage] = useState<{ id: string; content: string } | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;

  // Function to add typing effect
  const typeMessage = async (message: string) => {
    // Add a placeholder message
    const newMessage = { id: Date.now().toString(), role: 'assistant', content: '' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Typing effect
    for (let i = 0; i < message.length; i++) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          content: message.slice(0, i + 1)
        };
        return updatedMessages;
      });
      await new Promise((resolve) => setTimeout(resolve, typingSpeed));
    }
  };

  const GenerateAIContent = async (input: string) => {
    if (!apiKey) {
      console.error('API key is not set');
      return 'Error: API key is not configured.';
    }

    // Normalize input and check if it contains any form of greeting
    const normalizedInput = input.toLowerCase();
    const greetings = ['hi', 'hello', 'hey', 'hola', 'bonjour', 'greetings'];

    if (greetings.some(greeting => normalizedInput.includes(greeting))) {
      // Simulate delay for greetings
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      return 'Hi, I am EVE, how can I assist you today?';
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const result = await model.generateContent(input);
      const response = await result.response;
      const text = await response.text();

      return text;
    } catch (error) {
      console.error('Error:', error);
      return 'Error generating AI response. Please try again.';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editMessage) {
      // Update the message being edited
      setMessages((prevMessages) => 
        prevMessages.map((message) => 
          message.id === editMessage.id ? { ...message, content: input, isEditing: false } : message
        )
      );
      setEditMessage(null);
    } else {
      // Add new message
      const userMessage = { id: Date.now().toString(), role: 'user', content: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const aiMessageContent = await GenerateAIContent(input);

      // Start typing effect for AI message
      await typeMessage(aiMessageContent);
    }

    // Clear the input box after sending the message
    setInput('');
  };

  const handleEditClick = (id: string, content: string) => {
    setEditMessage({ id, content });
    setInput(content);
  };

  const handleCancelEdit = () => {
    setEditMessage(null);
    setInput('');
  };

  return (
    <Box 
      sx={{
        width: '100%', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        bgcolor: 'ffffff',
        overflow: 'hidden', // Prevent scrolling on the outer container
        position: 'relative' // Required for absolute positioning of the logo
      }}
    >
      <Box
        sx={{
          width: '680px',
          height: '780px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          bgcolor: 'white',
          border: '0px solid #ddd',
          overflow: 'hidden'
        }}
      >
        <Stack 
          direction="column"
          spacing={2}
          sx={{ 
            p: 2,
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {messages.map((message) => (
            <Box 
              key={message.id} 
              sx={{
                display: 'flex', 
                justifyContent: message.role === 'assistant' ? 'flex-start' : 'flex-end',
                width: '100%'
              }}
            >
              <Box 
                sx={{
                  bgcolor: message.role === 'assistant' ? 'primary.main' : 'secondary.main',
                  color: 'white',
                  borderRadius: 5,
                  p: 2,
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap', // Preserve whitespace formatting
                  position: 'relative'
                }}
              >
                {message.content}
                {message.role === 'user' && !message.isEditing && (
                  <IconButton
                    onClick={() => handleEditClick(message.id, message.content)}
                    sx={{ 
                      position: 'absolute', 
                      right: 0, 
                      top: 0,
                      mt: 0,
                      mb: 0
                    }}
                  >
                    <EditIcon sx={{ color: 'white' }} />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
          {editMessage && (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid #ddd',
                p: 1,
              }}
            >
              <TextField
                label="Edit Message"
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                  color="error"
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<SendIcon />}
                >
                  Send
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
        {!editMessage && (
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{
              display: 'flex', 
              alignItems: 'center', 
              p: 2,
              borderTop: '0px solid #ddd'
            }}
          >
            <TextField
              label="Message"
              fullWidth 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="outlined"
              sx={{ mr: 2 }}
            />
            <Button variant="contained" type="submit">Send</Button>
          </Box>
        )}
      </Box>
      <Box 
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          src="/eve.png" // Make sure the path is correct
          alt="Logo"
          fill // Use `fill` for responsive images
          style={{ objectFit: 'contain' }} // Replace objectFit with style
          sizes="(max-width: 768px) 50vw, 25vw" // Define sizes for responsiveness if needed
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
