import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
// ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
// import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-screen bg-white flex items-center justify-center font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">NAME</th>
                      <th className="py-3 px-6 text-left">EMAIL</th>
                      <th className="py-3 px-6 text-left">ADMIN</th>
                      <th className="py-3 px-6 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {users.map((user) => (
                      <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{user._id}</td>
                        <td className="py-3 px-6 text-left">
                          {editableUserId === user._id ? (
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={editableUserName}
                                onChange={(e) => setEditableUserName(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                              />
                              <button
                                onClick={() => updateHandler(user._id)}
                                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                              >
                                <FaCheck />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              {user.username}{" "}
                              <button
                                onClick={() => toggleEdit(user._id, user.username, user.email)}
                              >
                                <FaEdit className="ml-2" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {editableUserId === user._id ? (
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={editableUserEmail}
                                onChange={(e) => setEditableUserEmail(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                              />
                              <button
                                onClick={() => updateHandler(user._id)}
                                className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                              >
                                <FaCheck />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              {user.email}{" "}
                              <button
                                onClick={() => toggleEdit(user._id, user.username, user.email)}
                              >
                                <FaEdit className="ml-2" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-6 text-left">
                          {user.isAdmin ? (
                            <FaCheck style={{ color: "green" }} />
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {!user.isAdmin && (
                            <div className="flex item-center justify-center">
                              <button
                                onClick={() => deleteHandler(user._id)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
