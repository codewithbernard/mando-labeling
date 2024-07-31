"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useQuestions } from "~/lib/hooks/use-questions";

export default function Home() {
  const [questions] = useQuestions();
  const { push } = useRouter();

  const openAssignModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const questionId = event.currentTarget.dataset["id"];

    if (questionId) {
      push(`/assign/${questionId}`);
    }
  };

  return (
    <>
      <main>
        <ul>
          {questions?.map((item, index) => (
            <li
              key={`${item.question}-${index}`}
              className="flex items-center justify-between"
            >
              {item.question}

              <button data-id={item.id} onClick={openAssignModal}>
                Assign question to an expert
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

//adityaviswanathan;
