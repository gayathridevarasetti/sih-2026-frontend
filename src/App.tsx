import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ShieldCheck,
  Zap,
  Server,
  Activity,
} from "lucide-react";

import NetworkGraph from "./components/NetworkGraph";
import LocationMap from "./components/LocationMap";

interface Txn {
  id: string;
  time: string;
  sender: string;
  receiver: string;
  amount: number;
  bank: string;
  score: number;
  risk: string;
  reason: string;
  city?: string;
  lat?: number;
  lng?: number;
  ip?: string;
}

export default function App() {
  const [transactions, setTransactions] = useState<Txn[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(
      "ws://127.0.0.1:8000/ws/live-stream"
    );

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const incomingTxn: Txn = JSON.parse(event.data);

        setTransactions((prev) => [
          incomingTxn,
          ...prev.slice(0, 19),
        ]);
      } catch (err) {
        console.error("Stream parse error:", err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "CRITICAL":
        return "bg-red-500/20 text-red-400 border-red-500/50";

      case "HIGH":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";

      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";

      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">

      {/* HEADER */}
      <header className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">

        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider">
            CyberShield AI{" "}
            <span className="text-cyan-400 text-sm">
              SIH26184
            </span>
          </h1>

          <p className="text-xs text-slate-400">
            Real-time Mule Network Detection & Stream Monitoring
          </p>
        </div>

        <div className="flex items-center space-x-4">

          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Server className="w-4 h-4 text-emerald-400" />

            <span className="text-xs font-mono">
              FastAPI :8000
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />

            <span className="text-xs font-mono">
              ML Engine Active
            </span>
          </div>

        </div>

      </header>


      {/* MAIN */}
      <main className="max-w-5xl mx-auto">

        {/* NETWORK GRAPH */}
        <NetworkGraph transactions={transactions} />


        {/* LOCATION MAP */}
        <LocationMap />


        {/* LIVE FRAUD STREAM */}
        <div className="w-full bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-2xl">

          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">

            <div className="flex items-center space-x-3">

              <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />

              <h2 className="text-xl font-bold">
                Live Fraud Stream Feed
              </h2>

            </div>

            <div className="flex items-center space-x-2">

              <span
                className={`w-3 h-3 rounded-full ${
                  isConnected
                    ? "bg-emerald-500 animate-ping"
                    : "bg-rose-500"
                }`}
              />

              <span className="text-xs font-mono text-slate-400">
                {isConnected
                  ? "WEBSOCKET LIVE"
                  : "BACKEND OFFLINE"}
              </span>

            </div>

          </div>


          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2">

            {transactions.map((txn, index) => (

              <div
                key={`${txn.id}-${index}`}
                className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50 flex items-center justify-between"
              >

                <div className="flex items-start space-x-3">

                  {txn.risk === "CRITICAL" ||
                  txn.risk === "HIGH" ? (

                    <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />

                  ) : (

                    <ShieldCheck className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />

                  )}

                  <div>

                    <div className="flex items-center space-x-2">

                      <span className="font-mono text-sm font-semibold">
                        {txn.sender}
                      </span>

                      <span className="text-slate-500 text-xs">
                        ➔
                      </span>

                      <span className="font-mono text-sm font-semibold">
                        {txn.receiver}
                      </span>

                      <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded">
                        {txn.bank}
                      </span>

                    </div>

                    <p className="text-xs text-slate-400 mt-1">
                      {txn.reason}
                    </p>

                  </div>

                </div>


                <div className="flex items-center space-x-4">

                  <div className="text-right">

                    <p className="font-mono font-bold">
                      ₹{txn.amount.toLocaleString("en-IN")}
                    </p>

                    <p className="text-xs text-slate-500">
                      {txn.time}
                    </p>

                  </div>

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${getRiskBadge(
                      txn.risk
                    )}`}
                  >
                    {txn.score} | {txn.risk}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}