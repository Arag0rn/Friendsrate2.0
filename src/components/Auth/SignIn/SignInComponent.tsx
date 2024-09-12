
import TelegramLogin from '../TelegramLogin';
import { Logo } from '../../Logo';

export const SignInComponent = () => {

  return (
    <div className="container flex flex-col items-center h-screen relative mx-auto">
    <Logo width={230} height={230} style={{position: 'absolute', top: '144px'}}/>


          <div className="flex flex-col items-center mt-6 absolute bottom-[48px] px-[25px] w-[400px]">
            <p className='text-[48px] font-bold text-center text-[#E4F2FF]'>Discover a New Way to <span className='text-[#0274FF] leading-[120%] tracking-[-1.44px] italic'>Connect</span></p>
            <div className='mt-[22px]'>
              <TelegramLogin />
              </div>
            {/* <a href="https://api.friendsrate.org/api/user/google" className="flex items-center space-x-2">
              <span className="text-gray-700">Google</span>
            </a> */}
          </div>
    </div>
  );
};