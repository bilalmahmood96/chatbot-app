# 🧠 Chatbot App

A simple AI-powered chatbot interface built using **Next.js**, **Google Vertex AI**, and **Tailwind CSS**. This app demonstrates the integration of a large language model (LLM) API with a modern web UI, offering a clean and interactive chat experience.

---

## 🚀 Tech Stack

- **Next.js** – React framework for building server-rendered and statically generated web applications  
- **Tailwind CSS** – Utility-first CSS framework for responsive UI design  
- **Google Vertex AI (PaLM)** – Large language model API used for generating chat responses  
- **TypeScript** – Type-safe development  
- **ESLint & Prettier** – Code linting and formatting

---

## 📦 Features

- Ask natural language questions and get intelligent responses  
- Uses Vertex AI PaLM model via REST API  
- Simple and modern UI built with Tailwind CSS  
- Environment variables support for API key management  
- Responsive layout suitable for desktop and mobile

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bilalmahmood96/chatbot-app.git
cd chatbot-app


2. Install dependencies

Make sure you have Node.js (18+) installed.

npm install
# or
yarn install


3. Set up environment variables

Create a .env.local file in the root directory and add your Google Vertex AI API key:

NEXT_PUBLIC_GCP_CREDENTIALS
NEXT_PUBLIC_GCP_CLIENT_EMAIL

You can obtain the API key from Google Cloud Vertex AI.


4. Run the development server

npm run dev
# or
yarn dev
Open your browser at http://localhost:3000

📁 Project Structure
python
Copy
Edit
chatbot-app/
├── pages/
│   └── index.tsx        # Main chat UI
├── components/
│   └── Chat.tsx         # Chat component (input/output logic)
├── utils/
│   └── chat.ts          # Vertex AI API request logic
├── styles/
│   └── globals.css      # Tailwind base styles
├── .env.local           # API key for Vertex AI
├── next.config.js       # Next.js configuration
🧪 Example Usage
Ask: “Tell me a fun fact about space.”

Response: “Did you know that one day on Venus is longer than its year?”

