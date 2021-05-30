
import { useContext } from "react"
import { CountdownContext } from "@/context/Countdown";

export const useCountdown = () => useContext(CountdownContext)
export default useCountdown;