import { useLocalStorage } from "react-use";

type Question = {
  id: string;
  question: string;
  assigned: boolean;
  labeled: boolean;
  assignedToId: string;
  createdById: string;
};

export const useQuestions = () => useLocalStorage<Question[]>("questions", []);
