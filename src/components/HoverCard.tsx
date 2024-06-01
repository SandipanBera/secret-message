import { CalendarDays } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function Hovercard({children,content}:{children:React.ReactNode,content:string}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
       {children}
      </HoverCardTrigger>
          <HoverCardContent className="w-80  flex justify-center items-start">
        {content}
      </HoverCardContent>
    </HoverCard>
  )
}
