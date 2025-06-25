const announcements = [
  {
    title: "Policy Update",
    description: "New leave policy effective from July 1st.",
    date: "June 12, 2025",
  },
  {
    title: "Town Hall",
    description: "Quarterly Town Hall on July 15 at 4 PM.",
    date: "June 11, 2025",
  },
];

export default function Announcements() {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <a href="#" className="text-sm text-blue-500 hover:underline">
          View all
        </a>
      </div>
      <ul className="space-y-3">
        {announcements.map((item, idx) => (
          <li key={idx} className="border-b pb-2">
            <p className="font-medium text-gray-800">{item.title}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
            <p className="text-xs text-gray-400">{item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
