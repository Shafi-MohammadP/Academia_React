import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { BaseUrl, tutorlistingUrl } from "../../Constants/Constants";
import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["name", "Email", "Bio", "Qualifications", "status", ""];

export function MembersTable() {
  const [tutor, setTutor] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(tutorlistingUrl);
        setTutor(response.data);
      } catch (error) {
        console.log(error, "this error found");
      }
    };

    fetchData();
  }, [change]);
  const handleBlock = async (value) => {
    const apiUrl = `${BaseUrl}dashboard/userBlockAndUnblock/${value}/`;
    const tokenDataString = localStorage.getItem("authToken");
    const tokenData = JSON.parse(tokenDataString);
    const accessToken = tokenData ? tokenData.access : null;
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === 200) {
        setChange(!change);
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      console.log(err, "Error found during fetching");
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Teachers List
            </Typography>
            <Typography color="gray" className=" font-normal"></Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tutor.map(
              (
                { tutor_details, bio, qualification, is_blocked, user },
                index
              ) => {
                const isLast = index === tutor.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <Avatar src={img} alt={name} size="sm" /> */}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tutor_details.username
                              ? tutor_details.username
                              : `${tutor_details.first_name} ${tutor_details.last_name}`}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tutor_details.email}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {/* {org} */}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {bio}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {qualification}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={tutor_details.is_active ? "Active" : "Block"}
                          color={tutor_details.is_active ? "green" : "red"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton
                          variant="text"
                          onClick={() => handleBlock(user)}
                        >
                          <PencilIcon
                            // onClick={() => handleBlock(user)}
                            className="h-4 w-4"
                          />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
