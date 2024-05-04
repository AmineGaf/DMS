import { Link, useLocation } from "react-router-dom";
import { useUserData } from "./hooks/profileData";

const Profile = () => {
  const location = useLocation();
  const userEmail = location.state;
  

  const {isLoading, data, isError, error} = useUserData(userEmail);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  const user = data.data;

  const details = [
    { Email: `${user.email}` },
    { PhoneNumber: `${user.phoneNumber}` },
    { startDate: `${new Date(user.startDate).toLocaleDateString("en-US")}` },
  ];

  return (
    <div className="flex flex-col p-5 gap-2">
      <div className="text-2xl">Profile</div>
      <div className="flex bg-primary-foreground rounded-md p-5 ">
        <div className="flex gap-3 ">
          <img
            src={user.image.url}
            alt="profileImage"
            className="rounded-full h-[220px] w-[220px]"
          />
          <div className="flex flex-col text-2xl gap-1 ">
            <h1>{user.fullname}</h1>
            <h1 className="text-ring opacity-70">{user.role}</h1>
          </div>
        </div>
        <div className="flex flex-col text-xl ml-[150px]  border-l-2 border-dashed pl-28">
          <h1 className="text-2xl">Personnal details</h1>
          <div className="flex flex-col gap-2">
            {details.map((item, index) => (
              <div key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <p className="text-ring opacity-90">{key}:</p>
                    <p className="">{value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-primary-foreground rounded-md p-5 gap-2">
        <h1 className="text-xl font-semibold">Description</h1>
        <p>{user.description}</p>
      </div>
      <div className="flex flex-col bg-primary-foreground rounded-md p-5 gap-2">
        <h1 className="text-xl font-semibold">Resume</h1>
        <a
          className="hover:text-primary hover:underline"
          href={user.resume.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Resume Here
        </a>
      </div>
      <div className="flex flex-col bg-primary-foreground rounded-md p-5 gap-2">
        <h1 className="text-xl font-semibold">Contract</h1>
        <a
          className="hover:text-primary hover:underline"
          href={user.contract.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Contract Here
        </a>
      </div>
    </div>
  );
};

export default Profile;
