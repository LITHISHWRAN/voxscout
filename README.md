
## VoxScout – AI Recruiter Voice Agent

**VoxScout** is an AI-powered recruiter voice agent that automates candidate screening through real-time conversational interviews. It leverages voice AI to simulate human-like recruiter interactions, evaluate responses, and streamline the hiring pipeline.

Built using **Next.js**, **Murf Falcon (voice AI)**, and **Cline Bot (agent orchestration)**, VoxScout enables companies to conduct scalable, intelligent, and consistent interviews without manual intervention.

---

## 🚀 What Problem It Solves (WHY)

Traditional hiring is:

* Time-consuming (manual screening calls)
* Inconsistent (different recruiters → different evaluations)
* Hard to scale (limited interviewer bandwidth)

**VoxScout replaces first-round screening with an AI voice agent** that:

* Conducts structured interviews
* Listens and responds dynamically
* Collects and evaluates candidate responses

---

## ⚙️ Core Features (WHAT)

*  **AI Voice Interviews** – Real-time recruiter-like conversations using Murf Falcon
*  **Dynamic Questioning** – Adapts questions based on candidate responses
*  **Candidate Evaluation** – Structured data collection for decision-making
*  **Automated Screening Pipeline** – No human required for initial rounds
*  **Web Interface** – Built with Next.js for seamless interaction
*  **Agent Orchestration** – Powered by Cline Bot for flow control

---

## 🧱 Tech Stack (HOW)

* **Frontend**: Next.js (App Router, React)
* **Backend**: Node.js (API routes / server actions)
* **Voice AI**: Murf Falcon
* **Agent Logic**: Cline Bot
* **Database**: (Optional – MongoDB / PostgreSQL)
* **Deployment**: Vercel / Docker

---

##  System Flow (Mental Model)

1. Candidate starts interview
2. Voice agent initiates conversation
3. Murf Falcon handles speech generation + processing
4. Cline Bot controls:

   * Question flow
   * Context memory
   * Response handling
5. Responses stored + analyzed
6. Recruiter gets structured output

---

## 🛠️ Setup (Minimal but Correct)

```bash
# Clone repo
git clone https://github.com/your-username/voxscout.git

cd voxscout

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run locally
npm run dev
```

---

## 🔑 Environment Variables

```
MURF_API_KEY=
CLINE_API_KEY=
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
```

---

##  Deployment

* Frontend: Vercel
* Backend: Vercel serverless / Docker container
* Voice APIs: External (Murf Falcon)

---

##  Future Improvements

* Emotion detection in voice
* Resume parsing + adaptive interviews
* AI scoring model for hiring decisions
* Multi-language voice interviews

---

##  Use Cases

* Startup hiring automation
* Mass recruitment screening
* Technical pre-interviews
* HR process optimization
