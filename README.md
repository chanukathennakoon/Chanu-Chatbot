# Chanu-Chatbot
# 💬 Chanu AI Chatbot

A beautiful web-based chatbot using Google's Gemini API with support for:
- Chat interaction
- PDF file reading
- File attachment display
- Clear chat button
- "Bot is thinking..." 

##  Features

-  Clean, responsive UI with HTML/CSS
-  PDF file support: reads and extracts text using `pdfjs-dist`
-  File attachment support
-  Clear chat button
-  Loading indicator
  
## Folder Structure
├── index.html # UI structure
├── style.css # Styling
├── script.js # Logic + Gemini API calls
└── README.md # This file

![image](https://github.com/user-attachments/assets/77fea720-6828-4339-b943-14f5260f0714)


## This project uses:
Gemini API
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY

## PDF Support
This chatbot uses pdfjs-dist to extract text from uploaded .pdf files.
Upload a PDF with the 📎 icon.
The bot reads and sends the extracted text to Gemini.


## Credits
Google Gemini API
PDF.js by Mozilla
Emoji icons from Twemoji
