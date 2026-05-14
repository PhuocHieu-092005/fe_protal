import React, { useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import aiService from "../services/aiService";

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    content: "Xin chào, mình có thể hỗ trợ bạn tìm việc, CV và đồ án.",
  },
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  const canSend = useMemo(() => message.trim().length > 0 && !sending, [message, sending]);

  const scrollToEnd = () => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = message.trim();
    if (!content || sending) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setSending(true);
    scrollToEnd();

    try {
      const response = await aiService.sendAiChatMessage(content);
      const reply = response?.reply || response?.data?.reply || response?.data || response?.message;

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: reply || "Mình chưa nhận được phản hồi phù hợp.",
        },
      ]);
    } catch (error) {
      console.error("Lỗi chat AI:", error);
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            error?.response?.data?.message ||
            "Hiện tại mình chưa thể phản hồi. Bạn thử lại sau nhé.",
        },
      ]);
    } finally {
      setSending(false);
      scrollToEnd();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] text-left">
      {open && (
        <section className="mb-4 flex h-[520px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-slate-100 bg-slate-950 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Bot size={21} />
              </div>
              <div>
                <h2 className="text-sm font-bold">Trợ lý AI</h2>
                <p className="text-xs text-slate-300">Hỗ trợ nhanh trong hệ thống</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    item.role === "user"
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-400 shadow-sm">
                  Đang trả lời...
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-100 bg-white p-4">
            <div className="flex items-end gap-3">
              <textarea
                rows={2}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                }}
                placeholder="Nhập câu hỏi của bạn..."
                className="min-h-[48px] flex-1 resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl transition hover:bg-blue-600"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
