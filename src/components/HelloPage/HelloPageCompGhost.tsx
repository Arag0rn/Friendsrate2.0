import { Logo, TwiterIcon, TelegramIcon} from "../Logo"

export const HelloPageCompLoad = () => {
  return (
    <div className="container flex flex-col items-center h-screen">
        <div className="flex w-[287px] gap-[16px] items-center">
        <Logo width={70} height={70}/>
        <h1 className="text-white text-[36px] font-semibold">FriendsRate</h1>
        </div>

        <div className="flex flex-col items-center">

            <p className="text-[20px] text-gray-300 font-medium">Stay tuned</p>
            <p className="text-gray-50 text-[24px] font-semibold">Official channels for info</p>
            <div className="flex justify-center gap-[19px]">
            <div className="rounded-[30px] border-2 border-[#99A2B1] bg-[rgba(236,248,255,0.1)] p-[26px]">
            <TwiterIcon width={30} height={30}/>
            </div>
            <div className="rounded-[30px] border-2 border-[#99A2B1] bg-[rgba(236,248,255,0.1)] p-[26px]">
            <TelegramIcon width={34} height={34}/>
            </div>
        
            </div>    
            <p className="text-[20px] text-gray-700 font-medium">@friendsrate</p>
        </div>
    </div>
  )
}
