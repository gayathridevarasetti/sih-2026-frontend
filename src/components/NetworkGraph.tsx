import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";

interface Txn {
  sender: string;
  receiver: string;
  risk: string;
}

export default function NetworkGraph({
  transactions,
}: {
  transactions: Txn[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodesMap = new Map<string, any>();
    const edges: any[] = [];

    transactions.forEach((t) => {
      const isHigh = t.risk === "CRITICAL" || t.risk === "HIGH";

      const color = isHigh ? "#ef4444" : "#06b6d4";

      // Sender node
      if (!nodesMap.has(t.sender)) {
        nodesMap.set(t.sender, {
          id: t.sender,
          label: t.sender,
          color: {
            background: "#1e293b",
            border: color,
          },
        });
      }

      // Receiver node
      if (!nodesMap.has(t.receiver)) {
        nodesMap.set(t.receiver, {
          id: t.receiver,
          label: t.receiver,
          color: {
            background: "#1e293b",
            border: color,
          },
        });
      }

      // Transaction edge
      edges.push({
        from: t.sender,
        to: t.receiver,
        color: {
          color: isHigh ? "#f87171" : "#38bdf8",
        },
        arrows: "to",
      });
    });

    const data = {
      nodes: new DataSet(Array.from(nodesMap.values())),
      edges: new DataSet(edges),
    };

    const options = {
      nodes: {
        shape: "box",
        font: {
          color: "#f8fafc",
          face: "monospace",
        },
        borderWidth: 2,
      },
      physics: {
        stabilization: false,
        barnesHut: {
          springLength: 100,
        },
      },
      height: "350px",
    };

    const network = new Network(
      containerRef.current,
      data,
      options
    );

    // Cleanup when component is removed/re-rendered
    return () => {
      network.destroy();
    };
  }, [transactions]);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-2xl">
      <h3 className="text-sm font-semibold uppercase text-slate-400 mb-2 font-mono">
        Real-time Mule Topology Network
      </h3>

      <div
        ref={containerRef}
        className="w-full h-[350px] bg-slate-950/50 rounded-lg border border-slate-800/80"
      />
    </div>
  );
}
