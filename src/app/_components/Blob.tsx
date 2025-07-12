import React from "react";

export default function Blob({
  title,
  color = "primaryBrand",
}: {
  title: string;
  color?: string;
}) {
  return (
    <div className="w-fit">
      <span
        className={`inline-block whitespace-nowrap rounded-full bg-${color} px-3 py-1.5 text-xs font-medium text-white hover:bg-${color}/50`}
      >
        {title}
      </span>
    </div>
  );
}
