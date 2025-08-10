"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useI18n } from "./i18n-provider"

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const options = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "it", label: "Italiano" },
    { code: "pt", label: "Português" },
  ] as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Globe className="size-4" />
          <span className="hidden sm:inline">{options.find((o) => o.code === locale)?.label ?? "Idioma"}</span>
          <span className="sm:hidden uppercase">{locale}</span>
          <span className="sr-only">Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt) => (
          <DropdownMenuItem key={opt.code} onClick={() => setLocale(opt.code as any)}>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
