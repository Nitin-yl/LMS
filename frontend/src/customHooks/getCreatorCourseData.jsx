import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { setCreatorCourseData } from '../redux/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const getCreatorCourseData = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
  return (
    useEffect(()=>{
    if(!userData) return; // Skip if user not logged in
    const getCreatorData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreatorcourses" , {withCredentials:true})
        
         await dispatch(setCreatorCourseData(result.data))

        
        console.log(result.data)
        
      } catch (error) {
        // 400 is expected when user is not logged in or lacks permission
        if(error.response?.status !== 400) {
          console.error("Failed to fetch creator courses:", error)
          toast.error(error.response?.data?.message || "Failed to fetch courses")
        }
      }
      
    }
    getCreatorData()
  },[userData])
  )
}

export default getCreatorCourseData
