import React from "react";
import { Skeleton } from "antd-mobile";

export default function MSkeleton({ active = true }) {
  return (
    <div className="p-2">
      <Skeleton.Paragraph lineCount={5} block active={active} />
      
      <Skeleton.Paragraph lineCount={5} block active={active} />
      
      <Skeleton.Paragraph lineCount={5} block active={active} />
      
      <Skeleton.Paragraph lineCount={5} block active={active} />
      
    </div>
  );
}
