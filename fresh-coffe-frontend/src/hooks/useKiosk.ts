import { useContext } from "react"
import { KioskContext } from "../context/KioskProvider";



export const useKiosk=()=>{
 const ctx = useContext(KioskContext)
  if (!ctx) {
    throw new Error("useKiosk must be used within a KioskProvider")
  }
    return ctx;
}



