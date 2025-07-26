# 🤖 AI Chatbot Project

A modern, streaming AI-powered chatbot built with **Next.js**, **React**, and **OpenAI**, designed for real-time interactions and scalable customer support solutions.

---

## 🌐 Live Demo

> https://ai-chatbotbybadarqa.netlify.app/

---

## ✨ Features

✅ Modern UI with gradient and responsive design  
✅ Real-time response streaming using `ai` SDK  
✅ Seamless conversation history  
✅ Typing animation + error handling  
✅ Generative responses via OpenAI API (GPT-4o-mini)  
✅ Support-oriented prompt instructions  
✅ Mobile-friendly & production-ready

---

## 🏗️ Tech Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Frontend   | React, Next.js, Tailwind CSS  |
| UI Kit     | [shadcn/ui](https://ui.shadcn.com) |
| Backend    | Next.js API Routes            |
| AI Model   | OpenAI GPT-4o via `ai` SDK    |
| Hosting    | Netlify                       |

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ai-chatbot-project.git
cd ai-chatbot-project

2️⃣ Install dependencies

npm install

3️⃣ Set your OpenAI API key

Create a .env.local file:

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

4️⃣ Run development server

npm run dev

App runs at: http://localhost:3000

🧠** How It Works**

Frontend uses useChat() from the AI SDK to send/receive messages

API routes handle OpenAI requests securely

System prompt guides the AI to act as a professional support assistant

Built-in loading state + error messages ensure a great UX

📁 Project Structure

ai-chatbot-project/

├── app/
│   └── page.tsx           # Main chat UI

├── components/
│   └── ChatMessage.tsx    # Message rendering

├── lib/
│   └── chat.ts            # OpenAI backend handler

├── public/

├── styles/

├── .env.local             # Your API key (not committed)

└── README.md              # You're reading it!

🧑‍💻 **For Developers**

Deploy to Netlify

Push to GitHub

Go to Netlify

Select New Project → Connect GitHub Repo

Set environment variable OPENAI_API_KEY

Build Command: npm run build

Publish Directory: .next

📦 Notes

node_modules/ is ignored via .gitignore

Large files (e.g. next-swc.linux-x64-gnu.node) should not be tracked in Git


Built with ❤️ by Badarqa Shakoor


