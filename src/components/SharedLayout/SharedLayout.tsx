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
            ? 'fixed bottom-0 w-full bg-base-300 p-4'
            : 'lg:w-[120px] lg:static bg-neutral p-[35px] h-screen items-center rounded-custom'
        }`}
      >
        <ul className="flex flex-row lg:flex-col lg:justify-center items-center gap-4 lg:gap-6 h-full">
          <li>
            <NavLink to="/" className="">
              <div className="w-[75px] h-[75px] bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10 opacity-40">
                  <use href={`${sprite}#icon-home`} />
                </svg>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/rating" className="">
              <div className="w-[75px] h-[75px] bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10 opacity-40 fill-none stroke-primary">
                  <use href={`${sprite}#icon-star`} />
                </svg>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className="">
              <div className="w-[75px] h-[75px] bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10 opacity-40 fill-none stroke-primary">
                  <use href={`${sprite}#icon-bell`} />
                </svg>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className="">
              <div className="w-[75px] h-[75px] bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10 opacity-40">
                  <use href={`${sprite}#icon-profile`} />
                </svg>
              </div>
            </NavLink>
          </li>

     
          <li className="mt-auto">
            <NavLink to="/setting" className="">
              <div className="w-[75px] h-[75px] bg-neutral rounded-full flex items-center justify-center lg:rounded-none">
                <svg className="w-6 h-6 lg:w-10 lg:h-10 opacity-40">
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