import { useState, useRef, useEffect, useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import "./FloatingChatBot.css";

export default function FloatingChatBot() {
  const { isQuizActive } = useContext(QuizContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm your CodeK learning assistant. How can I help you with your coding journey today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Close chatbot when quiz starts
  useEffect(() => {
    if (isQuizActive) {
      setIsOpen(false);
    }
  }, [isQuizActive]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const conversationContext = messages
        .slice(-6)
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n");

      // التعديل هنا ليكون الرد افتراضياً بالإنجليزية
      const prompt = `
You are the official AI assistant for CodeK, a coding education platform (Web, AI, Cyber Security).

Current Conversation Context:
${conversationContext}

New User Message: ${userMessage}

Instructions:
1. Respond in English by default.
2. ONLY respond in Arabic if the user addresses you in Arabic.
3. Be professional, educational, and encouraging.
4. Use code snippets or bullet points for technical explanations.
`;

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Server response error");
      }

      const data = await response.json();
      const botReply = data.response || data.reply;

      if (!botReply) throw new Error("Invalid response");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply.trim() },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Sorry, I'm having trouble connecting. Please ensure the server is running.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isQuizActive && (
        <button
          className={`chat-toggle-btn ${isOpen ? "hidden" : ""}`}
          onClick={() => setIsOpen(true)}
          title="Chat with AI Assistant"
        >
          🤖
        </button>
      )}

      {isOpen && !isQuizActive && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <span className="online-dot"></span>
              <h3>CodeK Assistant</h3>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role}`}>
                <div className="message-content">{m.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message assistant">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              rows={1}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
