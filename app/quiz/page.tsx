import { permanentRedirect } from "next/navigation"

type QuizPageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>
}

export default async function LegacyQuizRedirect({ searchParams }: QuizPageProps) {
  const params =
    searchParams && typeof (searchParams as Promise<unknown>).then === "function"
      ? await (searchParams as Promise<Record<string, string | string[] | undefined>>)
      : (searchParams ?? {})

  const nextParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "string") nextParams.append(key, item)
      })
      continue
    }

    if (typeof value === "string") {
      nextParams.set(key, value)
    }
  }

  if (!nextParams.has("source")) {
    nextParams.set("source", "legacy-quiz")
  }

  if (!nextParams.has("from")) {
    nextParams.set("from", "/quiz")
  }

  permanentRedirect(`/start?${nextParams.toString()}`)
}
