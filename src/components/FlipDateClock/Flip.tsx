/* eslint-disable */
"use client";

import { useEffect, useRef } from "react";
// @ts-ignore
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

type FlipProps = {
  value?: number | string;
  className?: string;
}

const Flip = ({ value, className = "" }: FlipProps) => {
  const tickRef = useRef<HTMLDivElement>(null);
  const tickInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!tickRef.current) return;

    if (!tickInstanceRef.current) {
      tickInstanceRef.current = Tick.DOM.create(tickRef.current, {
        value,
      });
    }

    return () => {
      if (tickRef.current) {
        Tick.DOM.destroy(tickRef.current);
        tickInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (tickInstanceRef.current) {
      tickInstanceRef.current.value = value;
    }
  }, [value]);

  return (
    <div
      ref={tickRef}
      className={`tick ${className}`}
    >
      <div data-repeat="true" aria-hidden="true">
        <span data-view="flip">Tick</span>
      </div>
    </div>
  );
}

export default Flip