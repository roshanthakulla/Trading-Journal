
"use client";

export default function TradeStats({ trades }) {
  let total = trades.length;
  let wins = 0;
  let losses = 0;
  let totalProfit = 0;

  trades.forEach((trade) => {
    const qty = trades.qty || 1;
    const pnl =
      trade.type === "buy"
        ? (trade.exitPrice - trade.entryPrice)*qty
        : (trade.entryPrice - trade.exitPrice)*qty;

    totalProfit += pnl;

    if (pnl > 0) wins++;
    else losses++;
  });

  const winRate = total ? ((wins / total) * 100).toFixed(1) : 0;
  const avgProfit = total ? (totalProfit / total).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

      <Card title="Trades" value={total} />
      <Card title="Wins" value={wins} green />
      <Card title="Losses" value={losses} red />
      <Card title="Win Rate" value={`${winRate}%`} />
      <Card title="Total P/L" value={totalProfit} />
      <Card title="Avg P/L" value={avgProfit} />

    </div>
  );
}

function Card({ title, value, green, red }) {
  return (
    <div className="bg-white/70 backdrop-blur-md border rounded-2xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2
        className={`text-lg font-bold ${
          green ? "text-green-600" : red ? "text-red-600" : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
}
