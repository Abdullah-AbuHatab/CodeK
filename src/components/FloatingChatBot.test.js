import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FloatingChatBot from "./FloatingChatBot";
import { QuizContext } from "../context/QuizContext";
import { toChatHistory } from "../services/chatService";

const renderBot = ({ isQuizActive = false } = {}) =>
  render(
    <QuizContext.Provider value={{ isQuizActive, setIsQuizActive: () => {} }}>
      <FloatingChatBot />
    </QuizContext.Provider>,
  );

const jsonResponse = (status, body) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});

const send = (text) => {
  const input = screen.getByLabelText("Your question for the assistant");
  fireEvent.change(input, { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: "Send message" }));
};

beforeAll(() => {
  // jsdom does not implement scrollIntoView.
  Element.prototype.scrollIntoView = jest.fn();
});

beforeEach(() => {
  global.fetch = jest.fn();
  localStorage.clear();
});

test("sends { message, history } and shows the tutor's reply", async () => {
  global.fetch
    .mockResolvedValueOnce(jsonResponse(200, { reply: "First answer", response: "First answer" }))
    .mockResolvedValueOnce(jsonResponse(200, { reply: "Second answer" }));
  renderBot();
  fireEvent.click(screen.getByRole("button", { name: "Open AI assistant chat" }));

  send("What is a loop?");
  expect(await screen.findByText("First answer")).toBeInTheDocument();

  const [url, init] = global.fetch.mock.calls[0];
  expect(url).toMatch(/\/chat$/);
  // The greeting is UI-only, so the first request carries no history.
  expect(JSON.parse(init.body)).toEqual({ message: "What is a loop?", history: [] });

  send("And a while loop?");
  expect(await screen.findByText("Second answer")).toBeInTheDocument();
  expect(JSON.parse(global.fetch.mock.calls[1][1].body)).toEqual({
    message: "And a while loop?",
    history: [
      { role: "user", content: "What is a loop?" },
      { role: "assistant", content: "First answer" },
    ],
  });
});

test("shows a login hint when the server requires sign-in", async () => {
  global.fetch.mockResolvedValueOnce(
    jsonResponse(401, { code: "AUTH_REQUIRED", message: "Please log in to use the AI tutor." }),
  );
  renderBot();
  fireEvent.click(screen.getByRole("button", { name: "Open AI assistant chat" }));
  send("hello");
  expect(
    await screen.findByText("🔒 Please log in to chat with the CodeK assistant."),
  ).toBeInTheDocument();
});

test("keeps the connection-error message for other failures and sends the token when logged in", async () => {
  localStorage.setItem("token", "abc.def.ghi");
  global.fetch.mockResolvedValueOnce(jsonResponse(504, { code: "AI_TIMEOUT", message: "slow" }));
  renderBot();
  fireEvent.click(screen.getByRole("button", { name: "Open AI assistant chat" }));
  send("hello");
  await waitFor(() =>
    expect(screen.getByText(/having trouble connecting/)).toBeInTheDocument(),
  );
  expect(global.fetch.mock.calls[0][1].headers.Authorization).toBe("Bearer abc.def.ghi");
});

test("hides the assistant while a quiz is active", () => {
  renderBot({ isQuizActive: true });
  expect(screen.queryByRole("button", { name: "Open AI assistant chat" })).toBeNull();
});

test("toChatHistory drops local entries and keeps the most recent turns", () => {
  const messages = [
    { role: "assistant", content: "greeting", local: true },
    ...Array.from({ length: 8 }, (_, i) => ({
      role: i % 2 ? "assistant" : "user",
      content: `turn ${i}`,
    })),
    { role: "assistant", content: "error notice", local: true },
  ];
  const history = toChatHistory(messages, 6);
  expect(history).toHaveLength(6);
  expect(history[0]).toEqual({ role: "user", content: "turn 2" });
  expect(history.every((m) => !("local" in m))).toBe(true);
});
