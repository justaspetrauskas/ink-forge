import { redirect } from "next/navigation";

export default async function MarketingPage(): Promise<never> {
  redirect("/signup");
}
