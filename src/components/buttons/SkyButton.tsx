"use client";


export type SkyButtonType = {
    children: React.ReactNode,
    onClick?:() => void,
    type?: "submit" | "reset" | "button" | undefined;
}

const SkyButton = (props:SkyButtonType) => {
    const { children, onClick, type="button" }=props;
  return (
    <button type={type} onClick={onClick}>
        {children}
    </button>
  );
}

export default SkyButton;