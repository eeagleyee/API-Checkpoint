import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Space, Typography } from "antd";

const { Title, Text } = Typography;

const UserList = () => {
  const [listOfUsers, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Space
      direction="vertical"
      size={[16, 24, 32]}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {listOfUsers.map((user) => (
        <Card
          key={user.id}
          title={
            <Title level={4} className="text-gray-800">
              {user.name}
            </Title>
          }
          extra={
            <a
              href={`https://${user.website}`}
              className="text-blue-500 hover:text-blue-700"
            >
              WEBSITE
            </a>
          }
          style={{
            width: "100%",
            backgroundColor: "#f3f4f6", // Background color for the card
            color: "#333", // Text color
            borderRadius: "8px", // Rounded corners
          }}
          className="hover:shadow-xl" // Add shadow on hover
        >
          <Text strong className="text-gray-600">
            Username:
          </Text>{" "}
          <Text>{user.username}</Text>
          <br />
          <Text strong className="text-gray-600">
            Phone:
          </Text>{" "}
          <Text>{user.phone}</Text>
          <br />
          <Text strong className="text-gray-600">
            Email:
          </Text>{" "}
          <Text>{user.email}</Text>
          <br />
          <Text strong className="text-gray-600">
            Address:
          </Text>{" "}
          <Text>
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </Text>
          <br />
          <Text strong className="text-gray-600">
            Company:
          </Text>{" "}
          <Text>{user.company.name}</Text>
        </Card>
      ))}
    </Space>
  );
};

export default UserList;
