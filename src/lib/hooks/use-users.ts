import { useLocalStorage } from "react-use";

type User = {
  id: string;
  admin: boolean;
  name: string;
};

export const useUsers = () =>
  useLocalStorage<User[]>("user", [
    { id: "safas", admin: true, name: "John Doe" },
    { id: "safas124", admin: false, name: "Don Joe" },
  ]);
