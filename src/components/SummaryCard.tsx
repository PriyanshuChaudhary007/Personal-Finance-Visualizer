
type SummaryCardProps = {
  title: string;
  value: string;
  color: string;
};

export default function SummaryCard({ title, value, color }: SummaryCardProps) {
  return (
    <div
      className={`text-white p-4 rounded-xl shadow-lg ${color} flex flex-col`}
    >
      <h3 className="text-sm uppercase font-medium mb-1">{title}</h3>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
