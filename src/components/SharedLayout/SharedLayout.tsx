import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BackgroundBlurs from '../BlurSpot';
import sprite from '../../assets/icons.svg';

const SharedLayout = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1024);
    const [isNeutralBackground, setIsNeutralBackground] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const checkNeutralBackground = () => {
            const neutralContainer = document.querySelector('.mark');
            if (neutralContainer) {
                setIsNeutralBackground(true);
            } else {
                setIsNeutralBackground(false);
            }
        };

        checkNeutralBackground();

        window.addEventListener('popstate', checkNeutralBackground);

        return () => window.removeEventListener('popstate', checkNeutralBackground);
    }, [window.location.pathname]);

    return (
        <div className="flex flex-col lg:flex-row ">
            <BackgroundBlurs />

            <div
                className={`${isMobile
                    ? 'fixed top-16 left-0 right-0 w-[357px] mx-auto'
                    : 'absolute top-5 right-5 w-[282px]'
                    } flex h-[70px] p-[10px] pr-[15px] justify-between items-center gap-[14px] bg-neutral rounded-[20px] z-50`}
            >
            </div>

            <nav
                className={`${isMobile
                    ? `fixed bottom-0 w-full p-6 mb-[34px] flex justify-center bg-transparent`
                    : `lg:w-[120px] lg:static h-screen items-center rounded-custom p-[35px] bg-neutral`
                    }`}
            >
                <ul className="flex flex-row lg:flex-col lg:justify-center items-center gap-4 lg:gap-6 h-full">
                    <li>
                        <Link to="mainpage" className="">
                            <div className={`w-[75px] h-[75px] lg:w-10 lg:h-10 ${isNeutralBackground ? 'bg-base-100' : 'bg-neutral'} lg:bg-neutral  rounded-full flex items-center justify-center lg:rounded-none relative group`}>
                                <div className={`w-[80%] lg:w-full h-[80%] lg:h-full lg:p-[5px] flex items-center justify-center transition-all duration-300 ease-in-out ${isNeutralBackground ? 'hover:bg-neutral' : 'hover:bg-base-100'}  lg:hover:bg-accent hover:rounded-full lg:hover:rounded-[15px]`}>
                                    <svg className={`w-6 h-6 lg:w-10 lg:h-10 ${isNeutralBackground ? 'fill-neutral' : 'fill-primary'} lg:fill-primary  transition-colors group-hover:fill-current`}>
                                        <use href={`${sprite}#icon-home`} />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className=" -ml-[29px] lg:hidden ">
                        <svg className={`w-[26px] h-[57px] ${isNeutralBackground ? 'fill-base-100' : 'fill-neutral'}`}>
                            <use href={`${sprite}#icon-separete`} />
                        </svg>
                    </li>

                    <li className=" -ml-[29.8px] lg:-ml-0">
                        <Link to="rating" className="">
                            <div className={`w-[75px] h-[75px] lg:w-10 lg:h-10 ${isNeutralBackground ? 'bg-base-100' : 'bg-neutral'} lg:bg-neutral rounded-full flex items-center justify-center lg:rounded-none relative group`}>
                                <div className={`w-[80%] lg:w-full h-[80%] lg:h-full lg:p-[5px] flex items-center justify-center transition-all duration-300 ease-in-out ${isNeutralBackground ? 'hover:bg-neutral' : 'hover:bg-base-100'}  lg:hover:bg-accent hover:rounded-full lg:hover:rounded-[15px]`}>
                                    <svg className={`w-6 h-6 lg:w-10 lg:h-10 ${isNeutralBackground ? 'stroke-neutral' : 'stroke-primary'} lg:stroke-primary fill-none transition-colors group-hover:stroke-current`}>
                                        <use href={`${sprite}#icon-star`} />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className=" -ml-[29px] lg:hidden">
                        <svg className={`w-[26px] h-[57px] ${isNeutralBackground ? 'fill-base-100' : 'fill-neutral'}`}>
                            <use href={`${sprite}#icon-separete`} />
                        </svg>
                    </li>

                    <li className=" -ml-[29.8px] lg:-ml-0">
                        <Link to="rating" className="">
                            <div className={`w-[75px] h-[75px] lg:w-10 lg:h-10 ${isNeutralBackground ? 'bg-base-100' : 'bg-neutral'} lg:bg-neutral  rounded-full flex items-center justify-center lg:rounded-none relative group`}>
                                <div className={`w-[80%] lg:w-full h-[80%] lg:h-full lg:p-[5px] flex items-center justify-center transition-all duration-300 ease-in-out ${isNeutralBackground ? 'hover:bg-neutral' : 'hover:bg-base-100'}  lg:hover:bg-accent hover:rounded-full lg:hover:rounded-[15px]`}>
                                    <svg className={`w-6 h-6 lg:w-10 lg:h-10 ${isNeutralBackground ? 'stroke-neutral' : 'stroke-primary'} lg:stroke-primary fill-none transition-colors group-hover:stroke-current`}>
                                        <use href={`${sprite}#icon-bell`} />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className=" -ml-[29px] lg:hidden">
                        <svg className={`w-[26px] h-[57px] ${isNeutralBackground ? 'fill-base-100' : 'fill-neutral'}`}>
                            <use href={`${sprite}#icon-separete`} />
                        </svg>
                    </li>

                    <li className=" -ml-[29.8px] lg:-ml-0">
                        <Link to="profile" className="">
                            <div className={`w-[75px] h-[75px] lg:w-10 lg:h-10 ${isNeutralBackground ? 'bg-base-100' : 'bg-neutral'} lg:bg-neutral  rounded-full flex items-center justify-center lg:rounded-none relative group`}>
                                <div className={`w-[80%] lg:w-full h-[80%] lg:h-full lg:p-[5px] flex items-center justify-center transition-all duration-300 ease-in-out ${isNeutralBackground ? 'hover:bg-neutral' : 'hover:bg-base-100'}  lg:hover:bg-accent hover:rounded-full lg:hover:rounded-[15px]`}>
                                    <svg className={`w-6 h-6 lg:w-10 lg:h-10 ${isNeutralBackground ? 'fill-neutral' : 'fill-primary'} lg:fill-primary  transition-colors group-hover:fill-current`}>
                                        <use href={`${sprite}#icon-profile`} />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className=" -ml-[29px] lg:hidden">
                        <svg className={`w-[26px] h-[57px] ${isNeutralBackground ? 'fill-base-100' : 'fill-neutral'}`}>
                            <use href={`${sprite}#icon-separete`} />
                        </svg>
                    </li>

                    <li className="mt-auto -ml-[29.8px] lg:-ml-0">
                        <Link to="setting" className="">
                            <div className={`w-[75px] h-[75px] lg:w-10 lg:h-10 ${isNeutralBackground ? 'bg-base-100' : 'bg-neutral'} lg:bg-neutral  rounded-full flex items-center justify-center lg:rounded-none relative group`}>
                                <div className={`w-[80%] lg:w-full h-[80%] lg:h-full lg:p-[5px] flex items-center justify-center transition-all duration-300 ease-in-out ${isNeutralBackground ? 'hover:bg-neutral' : 'hover:bg-base-100'}  lg:hover:bg-accent hover:rounded-full lg:hover:rounded-[15px]`}>
                                    <svg className={`w-6 h-6 lg:w-10 lg:h-10 ${isNeutralBackground ? 'fill-neutral' : 'fill-primary'} lg:fill-primary  transition-colors group-hover:fill-current`}>
                                        <use href={`${sprite}#icon-setting`} />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default SharedLayout;