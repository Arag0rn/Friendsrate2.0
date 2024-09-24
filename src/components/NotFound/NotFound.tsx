import words from "./words.json";
import "./circle.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const NotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => navigate("/", { replace: false }), 3000);
	}, []);

	return (
		<div className="text white text-center bg-[#010817] w-dvw h-dvh flex justify-center items-center castom-circle">
			<div className="flex flex-col">
				<h1 className="font-bold text-[179px] text-[#ECF8FF] leading-[247px]">
					{words.code}
				</h1>
				<p className=" font-bold text-[36px] leading-[50px] text-[#B4E3FF] mt-[-29px]">
					{words.text}
				</p>
			</div>
		</div>
	);
};
