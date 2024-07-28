
import useAuthContext from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children,allowedRoles}) => {
    const {token,role}=useAuthContext()
  
   const isAllowed=allowedRoles.includes(role)
   const accessibleRoute=token&& isAllowed?children:<Navigate to="/login" replace={true}/>
  return (
    accessibleRoute
  )
}

export default ProtectedRoute