import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/Auth/operations';
import { TelegramLogin } from '../TelegramLogin';


const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невалідний формат електронної пошти')
    .matches(
      /^[-?\w.?%?]+@\w+.{1}\w{2,4}$/,
      'Невалідний формат електронної пошти'
    )
    .required('Введіть електронну пошту'),
  password: Yup.string()
    .required('Введіть пароль')
    .min(8, 'Пароль повинен містити щонайменше 8 символів')
    .max(30, 'Пароль повинен містити не більше 30 символів')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@+.\-*$£€&!?:;,~^#(){}[\]|\/\\'"])/,
      'Пароль повинен містити великі, малі літери, цифри та спеціальні символи'
    )
});

export const SignInComponent = () => {
    const dispatch:Dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, action) => {
        console.log('onSubmit сработал');
        action.resetForm();
        setShowPassword(true)
          setIsError(false);
        dispatch(logIn(values))
      setIsError(true);
      setErrorMessage('Електронна пошта вже зареєстрована');
    },
  });


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Реєстрація</h2>

        <form onSubmit={(e) => { console.log('Форма сабмитится'); formik.handleSubmit(e); }} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Електронна пошта
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Введіть електронну пошту"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
            {isError && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`mt-1 block w-full px-3 py-2 border ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Введіть пароль"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>


          <div className="text-xs text-gray-600">
            Я погоджуюся з{' '}
            <a href="/terms" target="_blank" className="text-indigo-600 hover:underline">
              умовами
            </a>{' '}
            і{' '}
            <a href="/privacy-policy" target="_blank" className="text-indigo-600 hover:underline">
              політикою конфіденційності
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Зареєструватися
          </button>

          <div className="text-center text-sm mt-4 text-gray-600">
            Вже маєте акаунт?{' '}
            <a href="/sign-in" className="text-indigo-600 hover:underline">
              Увійдіть
            </a>
          </div>

          <div className="flex items-center justify-around mt-6">
              <TelegramLogin />
            <a href="https://api.friendsrate.org/api/user/google" className="flex items-center space-x-2">
              <span className="text-gray-700">Google</span>
            </a>
          </div>

        </form>
      </div>
    </div>
  );
};