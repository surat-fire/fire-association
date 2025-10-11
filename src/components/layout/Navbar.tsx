// components/Navbar.js
import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

const Navbar = () => {
	return (
		<nav className="absolute top-10 left-0 right-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					<div className="hidden w-full md:flex items-center justify-between gap-8 bg-white/95 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
						<Link href="/">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
									<svg
										className="w-5 h-5 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
									</svg>
								</div>
								<div>
									<div className="text-xl font-bold text-gray-900">SURAT</div>
									<div className="text-xs text-gray-600">FIRE ASSOCIATION</div>
								</div>
							</div>
						</Link>
						<div className="md:flex items-center gap-8">
							<Link href="/" className="text-gray-900 font-medium hover:text-red-600 transition">
								Home
							</Link>
							<Link href="/about" className="text-gray-600 hover:text-red-600 transition">
								About Us
							</Link>
							<Link href="/event" className="text-gray-600 hover:text-red-600 transition">
								Event
							</Link>
							<Link href="/blog" className="text-gray-600 hover:text-red-600 transition">
								Blog
							</Link>
							<Link href="/member" className="text-gray-600 hover:text-red-600 transition">
								Member
							</Link>
						</div>
						<div>
							<Link href="/contact">
								<Button>
									Contact Us
								</Button>
							</Link>
						</div>
					</div>
					<button className="md:hidden bg-white p-3 rounded-full shadow-lg">
						<svg
							className="w-6 h-6 text-gray-900"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;