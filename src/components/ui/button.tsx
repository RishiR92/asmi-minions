import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-3xl text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-elevated tap-glow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline: "border border-input glass hover:glass-sheet hover:border-primary/30",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft hover:shadow-aqua-glow",
        ghost: "hover:glass hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "gradient-primary text-white shadow-glow hover:shadow-glow hover:scale-[1.03] cta-glow tap-glow font-medium relative overflow-hidden",
        pill: "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground rounded-full shadow-soft hover:shadow-elevated transition-all duration-300",
      },
      size: {
        default: "h-12 px-7 py-3.5 min-h-[48px] text-[15px]",
        sm: "h-10 rounded-2xl px-5 text-[14px]",
        lg: "h-14 rounded-3xl px-9 min-h-[56px] text-[16px]",
        icon: "h-11 w-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
