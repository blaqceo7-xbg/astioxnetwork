import { useAuth } from "@/app/context/AuthContext";
import StatCircle from "./StatCircle";

export default function StatsGrid() {
  const { user } = useAuth();
  const totalRevenue = 1000000;

  const revenueStats = [
    { label: "Total Balance", amount: user.balance, color: "#000" },
    { label: "Available", amount: user.earnings, color: "#000" },
    { label: "Total Deposit", amount: user.total_deposit, color: "#000" },
    { label: "Withdrawals", amount: user.total_withdrawal, color: "#000" },
    { label: "Total Earning", amount: user.earnings, color: "#000" },
    { label: "Commission", amount: user.commissions, color: "#000" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {revenueStats.map((stat, index) => (
        <div
          key={index}
          className="transition"
        >
          <StatCircle
            amount={stat.amount}
            total={totalRevenue}
            label={stat.label}
            color={stat.color}
          />
        </div>
      ))}
    </div>
  );
}
