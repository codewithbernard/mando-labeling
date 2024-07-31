"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useQuestions } from "~/lib/hooks/use-questions";

type FormalValues = {
  question: string;
};

export default function CreateQuestion() {
  const { register, handleSubmit } = useForm<FormalValues>();
  const [questions, setQuestions] = useQuestions();

  const onSubmit: SubmitHandler<FormalValues> = (values) => {
    let currentQuestionsJSON = questions || [];

    setQuestions([
      ...currentQuestionsJSON,
      {
        id: `${Math.random() * 1000}`,
        question: values.question,
        createdById: "user.id",
        assigned: false,
        labeled: false,
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="text-black" type="text" {...register("question")} />
      <button type="submit">Submit Question</button>
    </form>
  );
}
