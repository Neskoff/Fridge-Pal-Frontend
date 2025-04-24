import * as React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export function FridgePalIcon() {
  return (
    <SvgIcon>
      <svg
        width="200"
        height="300"
        viewBox="0 0 200 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="180"
          height="280"
          rx="40"
          stroke="white"
          strokeWidth="20"
          fill="none"
        />
        <line
          x1="10"
          y1="160"
          x2="190"
          y2="160"
          stroke="white"
          strokeWidth="20"
        />
        <line
          x1="150"
          y1="160"
          x2="150"
          y2="250"
          stroke="white"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <circle cx="70" cy="80" r="10" fill="white" />
        <circle cx="130" cy="80" r="10" fill="white" />
        <path
          d="M70 120 C85 140, 115 140, 130 120"
          stroke="white"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </SvgIcon>
  );
}

export function FridgePalIconWide() {
  return (
    <SvgIcon sx={{ height: 80, width: 190 }}>
      <svg
        fontSize={"10rem"}
        width="600"
        height="300"
        viewBox="0 0 600 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="180"
          height="280"
          rx="40"
          stroke="currentColor"
          strokeWidth="20"
          fill="none"
        />
        <line
          x1="10"
          y1="160"
          x2="190"
          y2="160"
          stroke="currentColor"
          strokeWidth="20"
        />
        <line
          x1="150"
          y1="160"
          x2="150"
          y2="250"
          stroke="currentColor"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <circle cx="70" cy="80" r="10" fill="currentColor" />
        <circle cx="130" cy="80" r="10" fill="currentColor" />
        <path
          d="M70 120 C85 140, 115 140, 130 120"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        <text
          x="220"
          y="170"
          fill="currentColor"
          fontFamily="Arial, sans-serif"
          fontSize="60"
          fontWeight="bold"
        >
          FRIDGE PAL
        </text>
      </svg>
    </SvgIcon>
  );
}

export const NoProducts = () => {
  return (
    <SvgIcon sx={{ height: 300, width: 300 }}>
      <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <text
          x="200"
          y="40"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="18"
          fontWeight="bold"
          fill="white"
        >
          No products yet.
        </text>
        <text
          x="200"
          y="65"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="14"
          fill="white"
        >
          Please add a product to display.
        </text>

        <circle
          cx="200"
          cy="130"
          r="30"
          fill="none"
          stroke="white"
          strokeWidth="3"
        />
        <circle cx="190" cy="120" r="4" fill="white" />
        <circle cx="210" cy="120" r="4" fill="white" />
        <path
          d="M185 145 Q200 130 215 145"
          fill="none"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    </SvgIcon>
  );
};
