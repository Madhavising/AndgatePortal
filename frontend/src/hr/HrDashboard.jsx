import Card from "../components/Card";
import RecentApprovals from "./RecentApprovals";
import Announcements from "./Announcements";
import { useSelector } from "react-redux";

const HrDashboard =() => {
    const user = useSelector((state) => state.user);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const fullName = `${capitalize(user?.userData?.firstName)} ${capitalize(
    user?.userData?.lastName
  )}`.trim();


  return (
    <div className="h-full">
      <h2 className="text-2xl font-semibold mb-2">👋 Welcome back,{fullName}!</h2>
      <p className="text-gray-500 mb-6">
        Here’s what’s happening with your team today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="New Joinees" value={12} icon="user" />
        <Card title="Approved Today" value={8} icon="check" />
        <Card title="Pending Approvals" value={4} icon="clock" />
        <Card title="Documents Received" value={19} icon="file" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentApprovals />
        <Announcements />
      </div>
    </div>
  );
}

export default HrDashboard;
