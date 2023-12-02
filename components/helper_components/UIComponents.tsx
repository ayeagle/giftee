import React, { ReactNode } from "react";

//hopefully this will upload now

export function FlexRow(spacing: string = "center", children: ReactNode) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", justifyContent: spacing }}
    >
      {children}
    </div>
  );
}


export function FlexCol(spacing: string = "center", children: ReactNode) {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", justifyContent: spacing }}
      >
        {children}
      </div>
    );
  }
  