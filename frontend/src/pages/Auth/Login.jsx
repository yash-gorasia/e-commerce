import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading, isError, error }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
  return (
    <div>

    </div>
  )
}

export default Login
