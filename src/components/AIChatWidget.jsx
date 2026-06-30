import React, { useMemo, useRef, useState } from "react";
import {
  Bot,
  BriefcaseBusiness,
  Code2,
  FileUser,
  GraduationCap,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import aiService from "../services/aiService";

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Xin chào! Mình là trợ lý AI của HITCJOB. Mình có thể hỗ trợ bạn tìm dự án, CV, sinh viên và các công nghệ đang được quan tâm.",
  },
];

const quickSuggestions = [
  {
    id: "top-project",
    label: "Top dự án nổi bật",
    message: "Top dự án nổi bật",
    icon: Star,
  },
  {
    id: "react-project",
    label: "Tìm dự án React",
    message: "Tìm dự án React",
    icon: Search,
  },
  {
    id: "java-student",
    label: "Tìm sinh viên Java",
    message: "Tìm sinh viên Java",
    icon: BriefcaseBusiness,
  },
  {
    id: "top-cv",
    label: "Top CV được quan tâm",
    message: "Top CV được quan tâm",
    icon: FileUser,
  },
  {
    id: "popular-technology",
    label: "Công nghệ phổ biến",
    message: "Công nghệ phổ biến",
    icon: Code2,
  },
  {
    id: "d21-student",
    label: "Tìm sinh viên khóa D21",
    message: "Tìm sinh viên khóa D21",
    icon: GraduationCap,
  },
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [sending, setSending] = useState(false);

  const endRef = useRef(null);

  const canSend = useMemo(
    () => message.trim().length > 0 && !sending,
    [message, sending],
  );

  const scrollToEnd = () => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 50);
  };

  const sendMessage = async (rawContent) => {
    const content = rawContent.trim();

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

      const reply =
        response?.reply ||
        response?.data?.reply ||
        response?.data ||
        response?.message;

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

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion.message);
  };

  return (
    <div className="fixed bottom-20 right-3 z-[90] text-left sm:bottom-6 sm:right-6">
      {open && (
        <section className="mb-2 flex h-[390px] w-[308px] max-w-[calc(100vw-1.25rem)] flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.22)] sm:mb-4 sm:h-[560px] sm:w-[410px] sm:rounded-[24px] sm:shadow-[0_24px_70px_rgba(15,23,42,0.24)]">
          {/* Header */}
          <header className="relative overflow-hidden bg-slate-950 px-3 py-3 text-white sm:px-5 sm:pb-4 sm:pt-4">
            <div className="absolute -right-10 -top-16 h-36 w-36 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="absolute -bottom-16 left-20 h-28 w-40 rounded-full bg-indigo-500/15 blur-3xl" />

            <div className="relative flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-inner sm:h-11 sm:w-11 sm:rounded-2xl">
                  <Bot size={18} className="sm:h-[22px] sm:w-[22px]" />

                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400 sm:-right-1 sm:-top-1 sm:h-3 sm:w-3" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h2 className="truncate text-[12px] font-bold sm:text-[15px]">
                      Trợ lý AI HITCJOB
                    </h2>

                    <span className="rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-blue-200 sm:px-2 sm:text-[9px]">
                      Beta
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-[8px] text-slate-300 sm:text-[11px]">
                    Hỗ trợ việc làm, CV và dự án sinh viên
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Đóng trợ lý AI"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white sm:h-9 sm:w-9 sm:rounded-xl"
              >
                <X size={16} className="sm:h-[18px] sm:w-[18px]" />
              </button>
            </div>
          </header>

          {/* Nội dung tin nhắn */}
          <div className="flex-1 space-y-2 overflow-y-auto bg-[#F8FAFC] p-2.5 sm:space-y-3 sm:p-4">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {item.role === "assistant" && (
                  <div className="mr-1.5 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm sm:mr-2 sm:h-7 sm:w-7 sm:rounded-xl">
                    <Bot size={12} className="sm:h-[14px] sm:w-[14px]" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] whitespace-pre-line px-3 py-2 text-[10px] leading-4 shadow-sm sm:max-w-[82%] sm:px-4 sm:py-3 sm:text-[13px] sm:leading-5 ${
                    item.role === "user"
                      ? "rounded-xl rounded-br-sm bg-blue-600 text-white sm:rounded-2xl sm:rounded-br-md"
                      : "rounded-xl rounded-bl-sm border border-slate-200 bg-white text-slate-700 sm:rounded-2xl sm:rounded-bl-md"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="mr-1.5 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm sm:mr-2 sm:h-7 sm:w-7 sm:rounded-xl">
                  <Bot size={12} className="sm:h-[14px] sm:w-[14px]" />
                </div>

                <div className="flex items-center gap-1 rounded-xl rounded-bl-sm border border-slate-200 bg-white px-3 py-2 shadow-sm sm:gap-1.5 sm:rounded-2xl sm:rounded-bl-md sm:px-4 sm:py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Gợi ý nhanh */}
          <div className="border-t border-slate-100 bg-white px-2.5 pt-2 sm:px-4 sm:pt-3">
            <div className="mb-1.5 flex items-center gap-1 text-[9px] font-bold text-slate-700 sm:mb-2 sm:gap-1.5 sm:text-[11px]">
              <Sparkles
                size={12}
                className="text-blue-600 sm:h-[14px] sm:w-[14px]"
              />
              <span>Gợi ý nhanh</span>
            </div>

            <div className="-mx-0.5 flex gap-1.5 overflow-x-auto px-0.5 pb-2 [scrollbar-width:thin] sm:-mx-1 sm:gap-2 sm:px-1 sm:pb-3">
              {quickSuggestions.map((suggestion) => {
                const Icon = suggestion.icon;

                return (
                  <button
                    key={suggestion.id}
                    type="button"
                    disabled={sending}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="group inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-white px-2.5 text-[8px] font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:gap-2 sm:px-3.5 sm:text-[11px]"
                  >
                    <Icon
                      size={11}
                      className="text-blue-600 transition group-hover:scale-110 sm:h-[14px] sm:w-[14px]"
                    />

                    <span>{suggestion.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ô nhập */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-100 bg-white p-2 sm:p-4"
          >
            <div className="flex items-end gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 transition focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm sm:gap-2 sm:rounded-2xl sm:p-1.5">
              <textarea
                rows={1}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage(message);
                  }
                }}
                placeholder="Nhập câu hỏi về CV, việc làm, dự án..."
                className="max-h-16 min-h-[34px] flex-1 resize-none bg-transparent px-2 py-2 text-[9px] font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:max-h-24 sm:min-h-[42px] sm:px-3 sm:py-2.5 sm:text-[13px]"
              />

              <button
                type="submit"
                disabled={!canSend}
                aria-label="Gửi tin nhắn"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:h-10 sm:w-10 sm:rounded-xl"
              >
                <Send size={14} className="sm:h-[17px] sm:w-[17px]" />
              </button>
            </div>

            <p className="mt-1.5 truncate text-center text-[7px] text-slate-400 sm:mt-2 sm:text-[9px]">
              AI có thể mắc lỗi. Vui lòng kiểm tra thông tin quan trọng.
            </p>
          </form>
        </section>
      )}

      {/* Chỉ hiển thị nút mở khi chat đang đóng */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Mở trợ lý AI"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-600 sm:h-14 sm:w-14"
        >
          <span className="absolute inset-0 rounded-full border border-blue-400/30 opacity-0 transition group-hover:scale-125 group-hover:opacity-100" />

          <MessageCircle size={21} className="sm:h-[24px] sm:w-[24px]" />

          <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 sm:h-3.5 sm:w-3.5" />
        </button>
      )}
    </div>
  );
}
