//@ts-check
import { useDispatch } from 'react-redux'
import { logingOut } from '../pages/loginPage/loginSlice'
/**
 * Component - ClearLocalStorage
 */

export function ClearLocalStorage() {
  const dispatch = useDispatch()
  localStorage.removeItem('token')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
  dispatch(logingOut())
}
