# Azure AI Certified Engineer Trainer 🎓

A Duolingo-style training application for Microsoft Azure AI Engineer certification preparation.

## ✨ Features

- **📚 Progressive Learning Path** - 5 modules covering key Azure AI topics
- **🔥 Daily Streak Tracking** - Stay motivated with streak counters
- **⭐ XP Points System** - Earn points for correct answers
- **🎯 Interactive Quizzes** - Learn through engaging multiple-choice questions
- **💡 Detailed Explanations** - Understand the 'why' behind each answer
- **💾 Progress Persistence** - Your progress is saved locally

## 📖 Modules Covered

1. **Azure AI Fundamentals** - Core AI concepts and Azure AI services
2. **Computer Vision** - Image analysis, object detection, and OCR
3. **Natural Language Processing** - Text analysis and language understanding
4. **Speech Services** - Speech-to-text, text-to-speech, and translation
5. **Azure OpenAI Service** - GPT models and prompt engineering

## 🚀 Getting Started

### Option 1: Use the Hosted Version
Visit the live app: [Your Azure Static Web App URL will go here]

### Option 2: Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/azure-ai-trainer.git
   cd azure-ai-trainer
   ```

2. Open `azure_ai_trainer.html` in your web browser

That's it! No build process or dependencies required.

## 🎮 How to Use

1. **Start Learning** - Click on any unlocked lesson to begin
2. **Answer Questions** - Select your answer and click "Check Answer"
3. **Read Explanations** - Learn from detailed explanations after each question
4. **Build Your Streak** - Come back daily to maintain your learning streak
5. **Track Progress** - Watch your XP grow as you complete lessons

## 🏗️ Built With

- Pure HTML, CSS, and JavaScript
- No frameworks or dependencies
- Progressive Web App ready
- Mobile responsive design

## 📝 Adding More Content

To add more modules or questions, edit the `modules` array in the JavaScript section of `azure_ai_trainer.html`. Each module contains:

```javascript
{
  id: number,
  title: "Module Title",
  description: "Module description",
  lessons: [
    {
      title: "Lesson Title",
      questions: [
        {
          question: "Your question?",
          answers: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correct: 0, // Index of correct answer
          explanation: "Detailed explanation"
        }
      ]
    }
  ]
}
```

## 🌐 Deployment

This app is deployed on Azure Static Web Apps for fast, global delivery.

### Deploy to Azure Static Web Apps

1. Fork this repository
2. Create an Azure Static Web App in the Azure Portal
3. Connect it to your GitHub repository
4. Deploy automatically on every push to main

## 📊 Progress Tracking

All progress is stored in your browser's localStorage:
- Completed lessons
- Daily streak
- Total XP earned
- Last visit date

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more questions and modules
- Improve the UI/UX
- Fix bugs or add features
- Enhance explanations

## 📄 License

MIT License - feel free to use this for your own learning!

## 🎯 Certification Resources

This app complements official Microsoft Learn resources for the Azure AI Engineer certification:
- [Microsoft Learn - Azure AI Engineer](https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/)
- [AI-102 Exam Guide](https://learn.microsoft.com/en-us/certifications/exams/ai-102)

## 💪 Stay Consistent

Remember: **Consistency beats intensity!** Even 5-10 minutes per day will help you master Azure AI concepts and ace your certification.

---

Built with 💙 for Azure AI learners everywhere
