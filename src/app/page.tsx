"use client";

import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
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

  // Filter questions
  // Don't show assigned questions
  const displayedQuestions = useMemo(() => {
    return questions?.filter((q) => !q.assigned);
  }, [questions]);

  return (
    <>
      <main>
        <ul>
          {displayedQuestions?.map((item, index) => (
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
