const data = [
  { name: "Amit Sharma", department: "Engineering", date: "June 10, 2025" },
  { name: "Neha Jain", department: "Marketing", date: "June 11, 2025" },
  { name: "Rahul Verma", department: "HR", date: "June 12, 2025" },
];

export default function ApprovalTable() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Recent Approvals</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="py-2">Name</th>
            <th>Department</th>
            <th>Date Approved</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, idx) => (
            <tr key={idx} className="border-b last:border-none text-gray-700">
              <td className="py-2">{person.name}</td>
              <td>{person.department}</td>
              <td>{person.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
