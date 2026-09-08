export function TypingIndicator() {
  return (
    <div className="flex space-x-1.5 items-center px-4 py-3 bg-[#111] border border-neutral-800 rounded-2xl w-20 justify-center shadow-sm">
      <div className="w-2 h-2 bg-[#ffbf23] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-[#ffbf23] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-[#ffbf23] rounded-full animate-bounce"></div>
    </div>
  );
}
