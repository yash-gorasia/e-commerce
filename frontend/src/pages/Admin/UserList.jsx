import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation } from '../../redux/api/usersApiSlice';

const UserList = () => {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery();

    

  return (
    <div>
      This is userList
    </div>
  )
}

export default UserList
