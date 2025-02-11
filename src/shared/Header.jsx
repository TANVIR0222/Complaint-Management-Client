import { BsBox } from "react-icons/bs";
import { Link } from "react-router";
import  useUser  from "../Hooks/useUser";
import UserLogout from "../components/UserLogout";

const Header = () => {
  const [user] = useUser();
    
  return (
    <div className="bg-gray-100 p-4 shadow-md">
      {/* Main container with responsive max width and padding */}
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo & Title Section */}
        <div className="flex items-center gap-4">
          <Link to={"/"}>
            {/* Logo Icon */}
            <BsBox className="text-primary" size={45} />
          </Link>
          {/* Title with responsive text size */}
          <h1 className="text-lg md:text-xl font-medium text-center md:text-left">
            Effortless Complaint Management
          </h1>
        </div>

        {/* Login Button Section */}
        <UserLogout user={user?.data} />
      </div>
    </div>
  );
};

export default Header;
