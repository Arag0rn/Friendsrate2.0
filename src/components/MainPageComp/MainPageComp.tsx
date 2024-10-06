import { Link } from "react-router-dom"
import { Logo } from "../Logo"


export const MainPageComp = () => {
  return (
    <div className="container flex flex-col items-center h-screen">
    <Link className="pointer" to={"/connect"}><Logo width={230} height={230} style={{ marginTop: "201px"}} /></Link>
    <span className="text-center font-bold text-[28.843px] leading-normal">Let’s talk
</span>
    </div>
  )
}
