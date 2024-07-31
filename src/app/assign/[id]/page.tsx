"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuestions } from "~/lib/hooks/use-questions";
import { useUsers } from "~/lib/hooks/use-users";

type FormalValues = {
  assignTo: string;
};

export default function AssignQuestion() {
  const { register, handleSubmit } = useForm<FormalValues>();
  const [questions, setQuestions] = useQuestions();
  const [users] = useUsers();
  const { id } = useParams<{ id: string }>();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<FormalValues> = (values) => {
    const newQuestions = questions?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          assignedToId: values.assignTo,
          assigned: true,
        };
      }

      return item;
    });

    // Assign question to a user
    setQuestions(newQuestions);

    // Go to main page
    push("/");
  };

  const assignableUsers = useMemo(() => {
    const currentQuestion = questions?.find((q) => q.id === id);

    if (!currentQuestion) return [];

    // Filter by non admin and the user that created original question
    return (
      users?.filter((user) => !user.admin && currentQuestion.id !== user.id) ||
      []
    );
  }, [users, id, questions]);

  return (
    <>
      <h1>Assign Question</h1>
      <p>Assign question to an expert</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("assignTo")} className="text-black">
          {assignableUsers.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit Question</button>
      </form>
    </>
  );
}
