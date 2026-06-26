"use client";

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";


export type SkyButtonType = {
    children: React.ReactNode,
    onClick?:() => void,
    type?: "submit" | "reset" | "button" | undefined;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const SkyButton = (props:SkyButtonType) => {
    const { children, onClick, type="button", ...rest }=props;
  return (
    <Button type={type} onClick={onClick} {...rest}>
        {children}
    </Button>
  );
}

export default SkyButton;