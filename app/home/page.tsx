
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/atoms/button"
import { logout } from "@/app/api/auth/logout/actions"
import { AuthStoreSync } from "@/components/ui/organisms/auth-store-sync"

export default async function Home() {

  const supabase = await createClient()

  const {
    data: {
      user
    }
  } = await supabase.auth.getUser()


  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle()


  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-4 px-4 py-10 sm:px-6">
      <AuthStoreSync
        user={{
          id: user.id,
          email: user.email ?? null
        }}
      />

      <h1>
        Welcome {user.email}
      </h1>

      <p>
        User ID: {user.id}
      </p>

      <p>
        Profile: {profile ? "loaded" : "missing"}
      </p>

      <form action={logout}>
        <Button type="submit" className="mt-2">
          Log out
        </Button>
      </form>
    </main>
  )
}