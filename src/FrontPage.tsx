import React, { useEffect, useState } from 'react';

const LogoIcon: React.FC = () => {
	return (
		<div className="bg-transparent">
			<img src="images/fightform-text-transparent.png" alt="FIGHTFORM logo" className="h-6 bg-transparent"/>
		</div>
	)
}

interface MenuBarProps {
	isVisible: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ isVisible }) => {
	return (
		<div className={`flex flex-row sticky bg-black items-center justify-center w-full top-0 text-lg h-16 border-b-2 border-zinc-300 transition-transform duration-100 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
		< LogoIcon />
		</div>
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
				You can support the project by following us @fightformgg on <a href="https://twitter.com/fightformgg">Twitter</a> or <a href="https://instagram.com/fightformgg">Insta</a>.
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
	const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  useEffect(() => {
  	const handleScroll = () => {
  	  const currentScrollY = window.scrollY;

  	  // Show the header when scrolling up, hide it when scrolling down
  	  if (currentScrollY < lastScrollY) {
  	    setIsVisible(true); // scrolling up
  	  } else {
  	    setIsVisible(false); // scrolling down
  	  }

  	  setLastScrollY(currentScrollY);
  	};
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

	return (
		<div className="flex flex-col min-h-screen h-auto">
			< MenuBar isVisible={isVisible} />
			<div className="w-full flex items-center justify-center">
				<img src="images/fightform-front.png" alt="FIGHTFORM front view" className="w-max bg-transparent"/>
			</div>
			<div className="flex-grow">
				< SloganCard />
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
				img="fightform-left.png"
				imgRight={false}
			/>
			< DetailCard
				title="Control You Can Trust"
				text="FIGHTFORM builds on trusted open-source firmware, configurable right in your browser with a USB connection."
				img="fightform-right-thumb-buttons.png"
				imgRight={true}
			/>
			< DetailCard
				title="Did I Mention the Tripod?"
				text="You can put it on a tripod. Tripod sold separately. But worth contemplating."
				img="fightform-hub-io.png"
				imgRight={false}
			/>

			<div className="flex-grow pb-12">
				< PageBottomCard />
			</div>
			< Footer />
		</div>
	)
}

export default FrontPage
