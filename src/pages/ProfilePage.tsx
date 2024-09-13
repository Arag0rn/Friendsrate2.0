import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/Auth/selector';
import { useAppDispatch } from '../redux/Hooks/hooks';
import { updateImageProfile } from '../redux/Auth/operations';

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
      <h1 className="text-[24px] font-[600] font-primary text-neutral">Profile</h1>
      <div className="bg-neutral  h-screen flex flex-col items-center mt-[116px] rounded-[35px]">


        <div className="mark">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img
              src={avatarUrl || '/default-avatar.png'}
              alt="User Avatar"
              width={96}
              height={96}
              className="rounded-full"
            />
            <label htmlFor="file" className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer">
              <input
                id="file"
                type="file"
                className="hidden"
                accept=".jpg, .jpeg, .png, .svg, .webp"
                onChange={handleChangeImage}
              />
              <img src="/change-photo.svg" alt="Change Image" width={20} height={20} />
            </label>
          </div>

          <h2 className="text-center text-lg font-semibold">{userData?.username || 'Username'}</h2>

          <div className="flex items-center justify-center gap-2 my-2">
            <img src="/star-rate.svg" alt="Rating Star" width={20} height={20} />
            <span>{roundedRate || '0.0'}</span>
          </div>



          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span>Age:</span>
              <span>{calculateAge(userData?.birthday) || '--'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Gender:</span>
              <span>{userData?.gender || '--'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Language:</span>
              <span>{userData?.language || '--'}</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">About</h3>
            <p>{userData?.about || 'No information provided'}</p>
          </div>


        </div>


      </div>
    </>
  );
};

export default ProfilePage;
