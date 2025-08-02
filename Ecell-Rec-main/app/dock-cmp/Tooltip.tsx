import React, { useState, ReactNode, ReactElement } from "react";

interface TooltipProviderProps {
  children: ReactNode;
}

interface TooltipProps {
  children: ReactNode;
}

interface TooltipTriggerProps {
  children: ReactElement;
}

interface TooltipContentProps {
  children: ReactNode;
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>;
}

export function Tooltip({ children }: TooltipProps) {
  return <>{children}</>;
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && (
        <div
          className="absolute z-10 p-2 text-white bg-gray-800 rounded-md shadow-lg"
          style={{
            top: "-35px",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <TooltipContent>{children.props["aria-label"]}</TooltipContent>
        </div>
      )}
    </div>
  );
}

export function TooltipContent({ children }: TooltipContentProps) {
  return <div>{children}</div>;
}
