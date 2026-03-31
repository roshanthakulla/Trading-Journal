import DashboardSection from "@/components/Trade/DashboardSection";
import TradeChart from "@/components/Trade/TradeChart";
import TradeCumulative from "@/components/Trade/TradeCumulative";
import TradeList from "@/components/Trade/TradeList";
import TradeStats from "@/components/Trade/TradeStats";


export default function Home() {
  const [trades, setTrades] = useState([]);

  // axios fetch already hai

  return (
    <DashboardSection>

      {/* 📊 Stats */}
      <TradeStats trades={trades} />

      {/* 📈 Charts */}
      <TradeCumulative trades={trades} />
      <TradeChart trades={trades} />

      {/* 📋 Trades */}
      <TradeList trades={trades} />


    </DashboardSection>
  );
}
