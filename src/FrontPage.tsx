import React from 'react';


const LogoIcon: React.FC = () => {
	return (
		<div className="bg-transparent">
			<img src="images/fightform-logo-transparent-low-quality.png" alt="FIGHTFORM logo" className="h-10 bg-transparent"/>
		</div>
	)
}

const StickyHeader: React.FC = () => {
	return (
		<div className="flex flex-row sticky bg-black items-center justify-between w-full top-0 text-lg h-16 border-b-2 border-zinc-300">
		<div className="absolute left-0 right-0 flex items-center justify-center">
			< LogoIcon /> 
		</div>
		</div>
	)
}

const SloganCard: React.FC = () => {
	return (
		<div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
			<h1 className="pb-2 whitespace-nowrap">
				AT YOUR FINGERTIPS
			</h1>
			<p className="text-center max-w-2xl">
				Fightform. The controller designed to meet you at your level.
			</p>
		</div>
	)
}

const PageBottomCard: React.FC = () => {
	return (
		<div className="flex flex-col items-center pt-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
			{/* <h2 className="pb-2">
				FIND YOUR FORM
			</h2> */}
			<p className="text-center max-w-2xl">
				You can support the project by following @fightformgg on <a href="https://twitter.com/fightformgg">Twitter</a> or <a href="https://instagram.com/fightformgg">Insta</a>.
			</p>
		</div>
	)
}


function StoryCard() {
	return (
		<div className="flex flex-col items-center pt-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
			<h2 className="pb-2">
				WHAT IS FIGHTFORM?
			</h2>
			<p className="text-left max-w-3xl leading-relaxed indent-8">
				Fightform is the culmination of 3 years of solo effort to develop the most optimal FGC controller for the human body.
				It uses science-backed ergonomics and a weightless design via a tripod to deliver unparalleled gaming comfort.
				The controller is not designed to be held - you simply adjust the tripod to your lap height if you're sitting, or play standing by adjusting the base angle of the controller downward and raising it to your hand height.
				Fightform is a late-stage prototype and is not available yet.
			</p>
		</div>
	)
}

const FrontPage: React.FC = () => {

	return (
		<div className="flex flex-col min-h-screen h-auto">
			< StickyHeader />
			<div className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<img src="images/fightform-v2-front-line-art-gradient-no-logo.png" alt="FIGHTFORM front view" className="w-full max-w-4xl bg-transparent"/>
			</div>
			<div className="flex-grow">
				< SloganCard />
				{/* < EmailSignup signupId={"top"} /> */}
			</div>
			<StoryCard />
			{/* < DetailCard
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
			/> */}
			<div className="flex-grow pb-12">
				< PageBottomCard />
				{/* < EmailSignup signupId={"bottom"}/> */}
			</div>
			{/* < Footer /> */}
		</div>
	)
}

export default FrontPage
