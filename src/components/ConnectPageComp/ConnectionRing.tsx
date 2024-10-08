
import { ConnectionIcon } from '../Logo'

export const ConnectionRing = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <div className="relative w-[366px] h-[366px]">

      <div className="absolute top-[50%] left-[50%] w-[274px] h-[274px] rounded-full bg-[#B4E3FF] ring-container transform -translate-x-[50%] -translate-y-[50%] z-30"></div>


      <div className="absolute top-[50%] left-[50%] w-[324px] h-[324px] rounded-full bg-[#D5EEFF] ring-container transform -translate-x-[50%] -translate-y-[50%] z-20"></div>

      <div className="absolute top-[50%] left-[50%] w-[366px] h-[366px] rounded-full bg-[#ECF8FF] ring-container transform -translate-x-[50%] -translate-y-[50%] z-10"></div>


      <div className="absolute top-[50%] left-[50%] w-[216px] h-[216px] bg-[#80D3FF] rounded-full transform -translate-x-[50%] -translate-y-[50%] z-40">
      <ConnectionIcon width={64} height={73} style={{position: "absolute", top: "50%", left: "50%",  transform: "translate(-50%, -50%)"}}/>
      </div>
    </div>
    <span className="text-center text-[#ECF8FF] font-fixel text-3xl font-bold leading-normal">Searching a new stranger...</span>

  </div>
  )
}
