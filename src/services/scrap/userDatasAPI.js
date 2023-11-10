/*
import { URL_PROFILE } from '../config'
import axios from 'axios'
import { useState, useEffect } from 'react'

export function GetDatas() {
  const [userData, setUserData] = useState([])
  useEffect(() => {
    userDatas().then((data) => {
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
      })
    })
  }, [])
  return {
    userData,
  }
}

async function userDatas() {
  try {
    const res = await axios.post(URL_PROFILE)
    return res.data.body
  } catch (error) {
    throw new Error(error)
  }
}
*/
