import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import graphlqlRequestClient from "../../client/graphqlRequestClient";
import { INTOUCH_DASHBOARD_USER } from "../../constants/constant";
import { userState } from "../../stores/authState";

interface ApploadingProps {
  children: React.ReactNode;
}

const Apploading = ({ children }: ApploadingProps) => {
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false)
  const setUser = useSetRecoilState(userState)
  const router = useRouter()


  const initialize = () => {
    try {
      const jsonValue = localStorage.getItem(INTOUCH_DASHBOARD_USER)
      if (jsonValue !== null) {
        const userInfo = JSON.parse(jsonValue)
        graphlqlRequestClient.setHeader("authorization", userInfo.accessToken)
        setUser({
          isLoggedIn: true,
          username: userInfo.username,
          userId: userInfo.userId,
          accessToken: userInfo.accessToken,
        })
        setIsLoadingCompleted(true)
      } else {
        router.push("/")
        setIsLoadingCompleted(true)
      }
    } catch (error) {
      console.log(error)
    }    
  }

  useEffect(() => {
    initialize()
  }, [])

  if (!isLoadingCompleted) {
    return null
  }
  
  return (
    <>
      {children}
    </>
  )
 
}

export default Apploading