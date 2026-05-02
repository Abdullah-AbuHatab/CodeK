# 🗄️ MongoDB Setup Guide - Quiz with Hints

## الحالة الحالية

النظام يستخدم **MongoDB** لتخزين الأسئلة:

- البيانات توجد في `backend/data/quizData.js` (static في الكود)
- عند بدء البرنامج، تُحمّل البيانات في MongoDB عبر `seedQuizzes.js`
- الـ Frontend يستدعي الأسئلة من backend API (`GET /api/quizzes/:courseId`)

---

## ✅ التحديثات اللي تمّت

1. ✅ أضفت `hint` field لـ كل سؤال في `backend/data/quizData.js`
2. ✅ حدّثت MongoDB schema في `backend/models/Quiz.js` لتخزين الـ hints
3. ✅ نسخت البيانات المحدثة من frontend إلى backend

---

## 🚀 الخطوات لتفعيل الـ Hints

### **الخطوة 1: إعادة تحميل البيانات في MongoDB**

```bash
# في مجلد backend:
cd backend

# شغّل السيد الذي يحمّل البيانات
node seedQuizzes.js
```

**النتيجة المتوقعة:**

```
Connected to MongoDB
All quizzes seeded!
```

### **الخطوة 2: تشغيل Backend**

```bash
node server.js
```

يجب تشوف:

```
✅ Connected to MongoDB Atlas
📊 Database: homework1
✅ AI Server running on port 5000
```

### **الخطوة 3: تشغيل Frontend**

```bash
npm start
```

---

## 📝 كيفية التحقق من الـ Hints

### الطريقة 1: عبر MongoDB Compass

1. اتصل بـ MongoDB
2. ادخل على database `homework1`
3. اختر collection `quizzes`
4. ادخل على أي quiz وتأكد من وجود `hint` في الأسئلة

### الطريقة 2: عبر API

```bash
curl http://localhost:5000/api/quizzes/web-101
```

يجب تشوف الـ response يتضمن `hint` في كل سؤال:

```json
{
  "courseId": "web-101",
  "questions": [
    {
      "id": 1,
      "question": "What does HTML stand for?",
      "options": [...],
      "answer": "Hyper Text Markup Language",
      "hint": "Think about the full name of the markup language..."
    },
    ...
  ]
}
```

---

## 🔄 المسار الكامل للـ Quiz

```
Frontend (Quiz.js)
    ↓
quizService.getQuiz(courseId)
    ↓
GET /api/quizzes/:courseId
    ↓
Backend (quizRoutes.js)
    ↓
Quiz.findOne({ courseId })
    ↓
MongoDB (يرجع الأسئلة مع الـ hints)
    ↓
Frontend يعرض الأسئلة مع زر "💡 AI Hint"
```

---

## 📊 بنية البيانات في MongoDB

```javascript
{
  _id: ObjectId("..."),
  courseId: "web-101",
  questions: [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Tool Multi Language"
      ],
      answer: "Hyper Text Markup Language",
      hint: "Think about the full name of the markup language used for web pages - it involves hypertext and markup." // ✅ الـ hint جديد
    },
    // المزيد من الأسئلة...
  ]
}
```

---

## ⚠️ Troubleshooting

### المشكلة: لا تظهر الـ Hints عند الضغط على الزر

**الحل:**

```bash
# 1. تأكد من تشغيل seedQuizzes
node seedQuizzes.js

# 2. افحص البيانات في MongoDB
# استخدم MongoDB Compass أو:
db.quizzes.findOne({ courseId: "web-101" })

# 3. تأكد من أن Backend يعمل على 5000
netstat -ano | findstr :5000
```

### المشكلة: "Could not retrieve hint" error

```bash
# 1. تأكد من OPENROUTER_API_KEY في .env
echo %OPENROUTER_API_KEY%

# 2. اختبر الـ endpoint مباشرة:
curl -X POST http://localhost:5000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"prompt\":\"test hint request\"}"
```

---

## 📚 الملفات المهمة

| الملف                         | الوصف                        |
| ----------------------------- | ---------------------------- |
| `backend/data/quizData.js`    | البيانات Static مع الـ hints |
| `backend/models/Quiz.js`      | MongoDB Schema (محدّث)       |
| `backend/seedQuizzes.js`      | السكريبت اللي يحمّل البيانات |
| `src/pages/Quiz/Quiz.js`      | الـ Frontend Component       |
| `src/services/quizService.js` | استدعاء API                  |

---

## ✨ النتيجة النهائية

الآن الـ Quiz يعمل بـ:

- ✅ أسئلة محفوظة في MongoDB
- ✅ Hints موجودة في كل سؤال
- ✅ AI يولّد hints إضافية عند الطلب
- ✅ تحليل شامل بعد انتهاء الكويز
- ✅ Roadmap تعليمي مخصص

---

**آخر تحديث**: January 19, 2026
