"use client";


export type SkyButtonType = {
    children: React.ReactNode,
    onClick:() => void
}

const SkyButton = (props:SkyButtonType) => {
    const { children, onClick }=props;
  return (
    <button onClick={onClick}>
        {children}
    </button>
  );
}

export default SkyButton;