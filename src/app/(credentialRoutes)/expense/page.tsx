import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense",
  description: "This is Expense page",
};

export default async function Expense() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <div>This is expense</div>;
}