import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { google } from "../../../redux/Auth/slice";

export const Redirect = () => {
    const { accessToken } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Используем для перенаправления после успешного выполнения
    const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки

    useEffect(() => {
        const handleGoogleAuth = async () => {
            if (accessToken) {
                try {
                    await dispatch(google(accessToken)); // Дождаться выполнения действия
                    navigate("/mainpage"); // Перенаправляем на главную страницу
                } catch (error) {
                    console.error("Ошибка при обработке токена Google:", error);
                    // Обработка ошибки, возможно, нужно показать пользователю сообщение
                } finally {
                    setIsLoading(false); // Завершаем состояние загрузки
                }
            }
        };

        handleGoogleAuth();
    }, [accessToken, dispatch, navigate]);

    // Пока идет обработка, показываем загрузку
    if (isLoading) {
        return <div>Redirecting...</div>;
    }

    return (
        <div className="text-white">
            Redirect
        </div>
    );
};