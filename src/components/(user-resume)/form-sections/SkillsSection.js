"use client";

import { useState, memo } from "react";

function TagInput({ label, tags = [], onAdd, onRemove, placeholder }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const val = input.trim().replace(/,$/, "");
      if (val && !tags.includes(val)) {
        onAdd(val);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onRemove(tags.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus-within:border-[#7c6dfa] transition-all min-h-[44px]">
        {tags.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 bg-[#7c6dfa]/20 text-[#a99bf7] text-xs px-2.5 py-1 rounded-full">
            {tag}
            <button onClick={() => onRemove(i)} className="hover:text-white ml-0.5 leading-none">
              ×
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none"
        />
      </div>
      <p className="text-xs text-white/25">Press Enter or comma to add a skill</p>
    </div>
  );
}

function SkillsSection({ data, onChange }) {
  const update = (type, newTags) => {
    onChange({ ...data, [type]: newTags });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold text-white/70">Skills</h2>
      <TagInput
        label="Technical Skills"
        tags={data.technical}
        onAdd={(v) => update("technical", [...data.technical, v])}
        onRemove={(i) => update("technical", data.technical.filter((_, j) => j !== i))}
        placeholder="React, Node.js, Python…"
      />
      <TagInput
        label="Soft Skills"
        tags={data.soft}
        onAdd={(v) => update("soft", [...data.soft, v])}
        onRemove={(i) => update("soft", data.soft.filter((_, j) => j !== i))}
        placeholder="Leadership, Communication…"
      />
    </div>
  );
}export default memo(SkillsSection);