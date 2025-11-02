"use client"

import React from "react"

const MapSection = () => {
    return (
        <section className="relative w-full sm:pt-[60px] pt-10">
            <div className="ct-container">
                <div className="w-full flex justify-center py-10">
                    <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-md">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.725707983807!2d72.86616567503764!3d21.242722780460703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fc43e7b9bc3%3A0xe254fa3c6b65cca7!2sCapital%20Lawns!5e0!3m2!1sen!2sin!4v1762118646126!5m2!1sen!2sin" // 👈 paste your embed URL here
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-2xl"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MapSection