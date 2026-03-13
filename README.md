# AI-Driven Adaptive Quiz System

### Flight Dispatcher Knowledge Assessment (EASA Framework)

## Project Overview

This project implements an **AI-powered adaptive quiz platform** designed to evaluate knowledge relevant to **Flight Dispatcher training under the EASA framework**.

The system dynamically generates aviation-related questions using an AI model and adapts the quiz difficulty according to the user's performance. Each quiz session provides **unique questions**, ensuring a fresh and engaging learning experience.

The platform focuses on core aviation knowledge areas such as:

* Aviation Navigation
* Aviation Meteorology
* Flight Dispatcher operational concepts

The project demonstrates the integration of **Artificial Intelligence with modern full-stack web technologies** to create an interactive learning and assessment system.

---

## Core Features

### AI-Generated Questions

Questions are generated dynamically using an **AI language model through the OpenRouter API**.
Each request produces a unique multiple-choice aviation question relevant to dispatcher training.

---

### Adaptive Difficulty System

The quiz consists of **10 progressive difficulty levels**.

The system automatically adapts based on user performance:

* Correct answer → user advances to the next level
* Incorrect answer → user attempts another question at the same level
* Difficulty increases as levels progress

This approach simulates **adaptive learning environments** used in modern training platforms.

---

### Instant Evaluation and Feedback

After submitting an answer, the system immediately:

* Evaluates the response
* Displays whether the answer is correct or incorrect
* Provides a short explanation for the correct answer
* Loads the next question dynamically

---

### Performance Summary

Once the quiz is completed, the system displays:

* Total correct answers
* Final performance percentage
* Final achieved level

This provides a clear understanding of the user’s knowledge level.

---

### Clean and User-Friendly Interface

The interface is designed to be:

* Simple and intuitive
* Responsive across devices
* Focused on clarity and usability

This ensures the user can concentrate fully on the quiz content.

---

## Technology Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Shadcn UI


### Backend

* Next.js API Routes

### AI Integration

* OpenRouter API
* Large Language Models for question generation and explanations

### Deployment

* Ubuntu VPS
* PM2 Process Manager
* Nginx Reverse Proxy

---

## System Architecture

User Interface (React / Next.js)
↓
Next.js API Route
↓
OpenRouter AI API
↓
AI generates aviation question
↓
Quiz engine evaluates answer and updates level

This architecture allows **dynamic content generation with minimal backend complexity**.

---

## Project Structure

```
app/
  api/generate-question/route.ts
  layout.tsx
  page.tsx
  globals.css

components/
  quiz/
    quiz-container.tsx
    question-card.tsx
    quiz-header.tsx
    level-progress.tsx

lib/
  utils.ts

public/
```

---
## Application Screenshots

### Quiz Question Interface

The question interface displays the AI-generated aviation question, answer options, and allows the user to submit their response. Immediate feedback is provided after submission.

![Quiz Question Page](./screenshots/question-page.png)
![Hosted through pm2](./screenshots/hosted_pm2.png)


## Installation and Setup

### 1. Clone the repository

```
git clone [https://github.com/PROTOX11/ifoa.git]
cd ifoa
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```
OPENROUTER_API_KEY=your api key
```

---

### 4. Start the development server

```
npm run dev
```

Open the application:

```
http://localhost:3000
```

---

## Production Deployment (VPS)

### Build the project

```
npm run build
```

---

### Start production server

```
PORT=3005 npm start
```

---

### Run using PM2 (recommended)

```
pm2 start npm --name ai-quiz -- start -- --port 3005
pm2 save
```

---

## Example AI Response Format

The AI service returns quiz questions in JSON format:

```
{
 "question": "What effect does a headwind have on aircraft ground speed?",
 "options": [
   "Increase ground speed",
   "Decrease ground speed",
   "No effect",
   "Change aircraft altitude"
 ],
 "correctAnswer": 1,
 "explanation": "Headwinds oppose aircraft motion and reduce ground speed.",
 "category": "Navigation"
}
```

---

## Artificial Intelligence Usage

AI is integrated into the system to provide:

* Dynamic question generation
* Difficulty scaling
* Answer evaluation
* Automated explanations
* Variation in quiz content

This ensures each quiz session can generate **unique and contextually relevant aviation questions**.

---

## Evaluation Criteria Addressed

This project demonstrates the following key competencies:

* System design and architecture
* Integration of AI services
* Adaptive learning logic
* Clean code structure
* Scalable deployment
* User-focused interface design

---

## Author

**Prakash Kumar**
prakashkr2894@gmail.com
Software Developer
MERN Stack | AI-Integrated Systems
