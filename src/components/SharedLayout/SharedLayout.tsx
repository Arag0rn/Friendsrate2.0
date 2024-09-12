import { NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BackgroundBlurs from '../BlurSpot';
import sprite from '../../assets/icons.svg';

const SharedLayout = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <BackgroundBlurs />
  
      <nav
        className={`${
          isMobile
            ? 'fixed bottom-0 w-full bg-transparent p-6 mb-[34px] flex justify-center'
            : 'lg:w-[120px] lg:static lg:bg-neutral lg:p-[35px] h-screen items-center rounded-custom'
        }`}
      >
        <ul className="flex flex-row lg:flex-col lg:justify-center items-center gap-4 lg:gap-6 h-full">
          <li>
            <NavLink to="/" className="">
              <div className="w-[75px] h-[75px] lg:w-10 lg:h-10 bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10">
                  <use href={`${sprite}#icon-home`} />
                </svg>
              </div>
            </NavLink>
                  </li>
                  <li className=" -ml-[29px] lg:hidden">
                       <svg className="w-[26px] h-[57px] ">
                  <use href={`${sprite}#icon-separete`} />
                </svg>
                  </li>

          <li className=" -ml-[29.8px] lg:-ml-0">
            <NavLink to="/rating" className="">
              <div className="w-[75px] h-[75px] lg:w-10 lg:h-10 bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10  fill-none stroke-primary">
                  <use href={`${sprite}#icon-star`} />
                </svg>
              </div>
            </NavLink>
                  </li>
                  
                  <li className=" -ml-[29px] lg:hidden">
                       <svg className="w-[26px] h-[57px] ">
                  <use href={`${sprite}#icon-separete`} />
                </svg>
                  </li>

          <li className=" -ml-[29.8px] lg:-ml-0">
            <NavLink to="/" className="">
              <div className="w-[75px] h-[75px] lg:w-10 lg:h-10 bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10  fill-none stroke-primary">
                  <use href={`${sprite}#icon-bell`} />
                </svg>
              </div>
            </NavLink>
                  </li>
                  
                  <li className=" -ml-[29px] lg:hidden">
                       <svg className="w-[26px] h-[57px] ">
                  <use href={`${sprite}#icon-separete`} />
                </svg>
                  </li>

          <li className=" -ml-[29.8px] lg:-ml-0">
            <NavLink to="/profile" className="">
              <div className="w-[75px] h-[75px]  lg:w-10 lg:h-10 bg-neutral rounded-full flex items-center justify-center lg:rounded-none hover:p-1  hover:bg-base-100 hover:rounded-full transition-all ">
                <svg className="w-6 h-6 lg:w-10 lg:h-10 fill-current">
                  <use className='flex z-10 ' href={`${sprite}#icon-profile`} />
                </svg>
              </div>
            </NavLink>
                  </li>
                  
                  <li className=" -ml-[29px] lg:hidden">
                       <svg className="w-[26px] h-[57px] ">
                  <use href={`${sprite}#icon-separete`} />
                </svg>
                  </li>

     
          <li className="mt-auto -ml-[29.8px] lg:-ml-0">
            <NavLink to="/setting" className="">
              <div className="w-[75px] h-[75px] lg:w-10 lg:h-10 bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10 ">
                  <use href={`${sprite}#icon-setting`} />
                </svg>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>

   
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;