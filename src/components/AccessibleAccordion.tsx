"use client";

import React, { useState } from "react";

type Item = {
  question: string;
  answer: string;
};

export default function AccessibleAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently asked questions</h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <AccordionItem
            key={idx}
            index={idx}
            question={item.question}
            answer={item.answer}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}

function AccordionItem({
  index,
  question,
  answer,
  open,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  return (
    <details open={open} className="bg-white/5 rounded-lg">
      <summary
        id={buttonId}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }}
        className="w-full list-none text-left flex items-center justify-between gap-3 cursor-pointer font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
      >
        <strong>{question}</strong>
        <svg
          aria-hidden="true"
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="mt-2"
        tabIndex={open ? 0 : -1}
      >
        {answer}
      </div>
    </details>
  );
}
