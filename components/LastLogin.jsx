import { FaCircle } from "react-icons/fa";

const LastActive = ({ info }) => {
  // Format the date
  const formattedDate = info?.userDetails?.lastLogin
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date(info.userDetails.lastLogin))
    : "N/A";

  return (
    <div className="flex text-[12px] text-green-700 items-center gap-2 text-wrap w-fit">
      <p className="font-bold">Last active:</p>
      <p>{formattedDate}</p>
      <FaCircle className="text-green-500" title="Active" />
    </div>
  );
};

export default LastActive;