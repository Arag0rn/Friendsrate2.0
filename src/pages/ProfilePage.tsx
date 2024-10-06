import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/Auth/selector';
import { useAppDispatch } from '../redux/Hooks/hooks';
import { updateImageProfile } from '../redux/Auth/operations';
import { ChangePhotoImg } from '../components/Images';

const calculateAge = (birthDate: string | undefined): number => {
  if (!birthDate) return 0;
  const birthDateParts = birthDate.split('.');
  if (birthDateParts.length !== 3) return 0;

  const birthDateUser = new Date(birthDateParts.reverse().join('-'));
  if (isNaN(birthDateUser.getTime())) return 0;

  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDateUser.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDateUser.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDateUser.getDate())) {
    age--;
  }
  return age;
};

const ProfilePage: React.FC = () => {
  const userData = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const avatarUrl = userData?.avatarURL as string;

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (
      file.size >= 10 * 1024 * 1024 &&
      !file.type.includes('jpeg') &&
      !file.type.includes('jpg') &&
      !file.type.includes('svg') &&
      !file.type.includes('webp') &&
      !file.type.includes('png')
    ) {
      return;
    }

    dispatch(updateImageProfile(file));
  };

  const averageRate = userData?.rate && userData?.ratingCount ? userData?.rate / userData?.ratingCount : 0;
  const roundedRate = Math.round(averageRate * 100) / 100;

  return (
    <>
    <div className='p-[24px]'>
      <h1 className="text-[24px] font-[600] font-primary text-neutral">Profile</h1>
      <div className="bg-neutral  h-screen flex flex-col mt-[116px] rounded-[35px] p-[25px]">


        <div className="mark ">
          <div className=" mx-auto mb-4 flex justify-between">
          <div className="relative">
      <img
        src={avatarUrl || '/default-avatar.png'}
        alt="User Avatar"
        width={176}
        height={176}
        className="rounded-full max-w-[176px] relative border-[#333E51]"
      />

      <label htmlFor="file" className="absolute bottom-0 right-0  p-[8px] rounded-full cursor-pointer border border-[#333E51] ">
        <input
          id="file"
          type="file"
          className="hidden"
          accept=".jpg, .jpeg, .png, .svg, .webp"
          onChange={handleChangeImage}
        />
        <ChangePhotoImg/>
      </label>
    </div>
            <div className="flex flex-col justify-between">
            <h2 className="text-center text-lg font-semibold text-[#333E51]">{userData?.username || 'Username'}</h2>
              <button className="rounded-[12px] border border-[#333E51] text-black p-[8px] hover:bg-gray-200 transition duration-200 w-[154px]">Edit</button>
            </div>
      
          </div>

       

          {/* <div className="flex items-center justify-center gap-2 my-2">
            <img src="/star-rate.svg" alt="Rating Star" width={20} height={20} />
            <span>{roundedRate || '0.0'}</span>
          </div> */}



          <div className="mt-4">
          <div className="flex justify-between items-center ">
              <span className='text-[#06142E] text-[20px] font-medium'>Username:</span>
              <span className='text-[#06142E] text-[20px] font-medium'>{userData?.username || '--'}</span>
            </div>
            <div className="flex justify-between items-center ">
              <span className='text-[#06142E] text-[20px] font-medium'>Age:</span>
              <span className='text-[#06142E] text-[20px] font-medium'>{calculateAge(userData?.birthday) || '--'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className='text-[#06142E] text-[20px] font-medium'>Gender:</span>
              <span className='text-[#06142E] text-[20px] font-medium'>{userData?.gender || '--'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className='text-[#06142E] text-[20px] font-medium'>Language:</span>
              <span className='text-[#06142E] text-[20px] font-medium'>{userData?.language || '--'}</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">About</h3>
            <p>{userData?.about || 'No information provided'}</p>
          </div>


        </div>


      </div>
      </div>
    </>
  );
};

export default ProfilePage;
