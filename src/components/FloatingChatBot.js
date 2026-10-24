import { useState, useRef, useEffect, useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { askTutor, toChatHistory } from "../services/chatService";
import "./FloatingChatBot.css";

export default function FloatingChatBot() {
  const { isQuizActive } = useContext(QuizContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm your CodeK learning assistant. How can I help you with your coding journey today?",
      // UI-only entries are never sent to the model as conversation history.
      local: true,
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
      // The tutor's instructions (language, tone, hint-first) live on the
      // server; the client only sends the new message plus recent turns.
      const botReply = await askTutor({
        message: userMessage,
        history: toChatHistory(messages),
      });

      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      const needsLogin =
        error.code === "AUTH_REQUIRED" || error.code === "AUTH_INVALID";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: needsLogin
            ? "🔒 Please log in to chat with the CodeK assistant."
            : "⚠️ Sorry, I'm having trouble connecting. Please ensure the server is running.",
          local: true,
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
          type="button"
          className={`chat-toggle-btn ${isOpen ? "hidden" : ""}`}
          onClick={() => setIsOpen(true)}
          title="Chat with AI Assistant"
          aria-label="Open AI assistant chat"
          aria-expanded={isOpen}
          aria-controls="codek-chat-window"
        >
          <span aria-hidden="true">🤖</span>
        </button>
      )}

      {isOpen && !isQuizActive && (
        <div
          id="codek-chat-window"
          className="chat-window"
          role="dialog"
          aria-label="CodeK AI assistant"
          aria-modal="false"
        >
          <div className="chat-header">
            <div className="header-info">
              <span className="online-dot" aria-hidden="true"></span>
              <h3>CodeK Assistant</h3>
            </div>
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div
            className="chat-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role}`}>
                <div className="message-content">{m.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message assistant" aria-label="Assistant is typing">
                <div className="typing-indicator" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <label htmlFor="codek-chat-input" className="visually-hidden">
              Your question for the assistant
            </label>
            <textarea
              id="codek-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              type="button"
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
