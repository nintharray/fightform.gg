import React from 'react';
import EmailSignup from './EmailSignup';
import { IoLogoGameControllerB } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";


const LogoIcon: React.FC = () => {
	return (
		<div className="bg-transparent">
			<img src="images/fightform-text-transparent.png" alt="FIGHTFORM logo" className="h-6 bg-transparent"/>
		</div>
	)
}

const StickyHeader: React.FC = () => {
	return (
		<div className="flex flex-row sticky bg-black items-center justify-between w-full top-0 text-lg h-16 border-b-2 border-zinc-300">
		<div className="absolute left-0 right-0 flex items-center justify-center">
			< LogoIcon /> 
		</div>
		< ConfiguratorButton />
		</div>
	)
}

const ConfiguratorButton: React.FC = () => {
	return (
    <a href="/configure" target="_blank" rel="noopener noreferrer">
			<div className="p-4">
				<div className="p-1 rounded-full bg-white text-black text-2xl flex flex-nowrap transition-transform duration-300 transform hover:scale-110">
					<IoLogoGameControllerB />
					<IoMdSettings />
				</div>
			</div>
		</a>
	)
}

const SloganCard: React.FC = () => {
	return (
		<div className="flex flex-col items-center ">
			<h1 className="pb-2">
				AT YOUR FINGERTIPS
			</h1>
			<p className="text-center">
				FIGHTFORM. The controller designed to meet you at your level.
			</p>
		</div>
	)
}

const PageBottomCard: React.FC = () => {
	return (
		<div className="flex flex-col items-center pt-6 px-2">
			<h2 className="pb-2">
				FIND YOUR FORM
			</h2>
			<p className="text-center">
				You can support the project by following us @fightformgg on <a href="https://twitter.com/fightformgg" target="_blank" rel="noopener noreferrer">Twitter</a> or <a href="https://instagram.com/fightformgg" target="_blank" rel="noopener noreferrer">Insta</a>.
			</p>
		</div>
	)
}

interface DetailCardProps {
	title: string;
	text: string;
	img: string;
	imgRight: boolean;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, text, img, imgRight }) => {
	return (
		<div className="w-full flex justify-evenly">
			{ !imgRight ? (
				<img src={`images/${img}`} alt="FIGHTFORM render" className="w-1/2 bg-transparent"/>
			) : ( <></> )}
			<div className="flex flex-col max-w-[50vw] items-center justify-center p-4">
				<h2 className="text-center font-bold italic pb-2">
					{title}
				</h2>
				<p className="text-center">
					{text}
				</p>
			</div>
			{ imgRight ? (
				<img src={`images/${img}`} alt="FIGHTFORM render" className="w-1/2 bg-transparent"/>
			) : ( <></> )}
		</div>
	)
}

const Footer: React.FC = () => {
	return (
		<footer className="flex flex-row items-center justify-center border-t-2 border-zinc-300 h-24">
		<p className="xl:text-base lg:text-base">
			(c) FIGHTFORM 2024. Product images are not final.
		</p>	
		</footer>
	)
}

const FrontPage: React.FC = () => {

	return (
		<div className="flex flex-col min-h-screen h-auto">
			< StickyHeader />
			<div className="w-full flex items-center justify-center">
				<img src="images/fightform-front.png" alt="FIGHTFORM front view" className="w-max bg-transparent"/>
			</div>
			<div className="flex-grow">
				< SloganCard />
				< EmailSignup signupId={"top"} />
			</div>
			< DetailCard
				title="All Game, No Pain"
				text="FIGHTFORM uses a neutral grip design which minimizes forearm and wrist strain. Play without compromise."
				img="fightform-right.png"
				imgRight={true}
			/>
			< DetailCard
				title="Switch it Up"
				text="No gummy analog sticks. No mushy membranes. Only the crisp sound of slim, tactile keyboard switches - rated for millions of presses."
				img="fightform-right-thumb-buttons.png"
				imgRight={false}
			/>
			< DetailCard
				title="Control You Can Trust"
				text="FIGHTFORM builds on trusted open-source firmware, configurable right in your browser with a USB connection."
				img="fightform-hub-io.png"
				imgRight={true}
			/>
			<div className="flex-grow pb-12">
				< PageBottomCard />
				< EmailSignup signupId={"bottom"}/>
			</div>
			< Footer />
		</div>
	)
}

export default FrontPage
