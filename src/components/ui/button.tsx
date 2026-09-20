import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[#173F35] text-white hover:bg-[#204F43] shadow-sm",
        primary: "bg-[#173F35] text-white hover:bg-[#204F43] shadow-sm",
        secondary:
          "bg-[#E8F4B8] text-[#173F35] font-semibold hover:bg-[#DCEDB0] shadow-xs",
        destructive:
          "bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FCD2D2] border border-[#DC2626]/20",
        outline:
          "border border-[#E2E8E4] bg-white text-[#111E19] hover:bg-[#F0F2EB] shadow-2xs",
        ghost:
          "hover:bg-[#F0F2EB] text-[#617369] hover:text-[#111E19]",
        link: "text-[#173F35] underline-offset-4 hover:underline",
        lime: "bg-[#E8F4B8] text-[#173F35] font-semibold hover:bg-[#DCEDB0]",
      },
      size: {
        default: "h-10 px-4 py-2 min-h-[40px]",
        sm: "h-8.5 rounded-lg px-3 text-xs min-h-[34px]",
        lg: "h-12 rounded-xl px-6 text-base font-semibold min-h-[48px]",
        pill: "h-10 px-5 rounded-full min-h-[40px]",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  fullWidth = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    fullWidth?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }), fullWidth && "w-full")}
      {...props}
    />
  )
}

export { Button, buttonVariants }
