// src/components/Animation.jsx
import React, { useEffect, useState } from "react";
import LogoImage from "../assets/logoviny.png"; // <- Importación activa del logo en imagen

export default function Animation() {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [showAnimation, setShowAnimation] = useState(true);
    const [titleScale, setTitleScale] = useState(0.95);
    const [titleOpacity, setTitleOpacity] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleOpacity(1);
            setTitleScale(1);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 15);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setFadeOut(true);
            setTitleScale(1.1);
            const timer = setTimeout(() => {
                setShowAnimation(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    if (!showAnimation) {
        return null;
    }

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center
                bg-black z-50 transition-opacity duration-500
                ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
            {/* Logo en texto (desactivado) */}
            {/**/}
            <h1
                className="text-3xl sm:text-5xl font-medium font-lavish text-white py-10 text-center transition-transform duration-1000 ease-out"
                style={{
                    transform: `scale(${titleScale})`,
                    opacity: titleOpacity,
                    textShadow: "0 0 20px rgba(0, 0, 0, 0.8)"
                }}
            >
                Restaurant la Masia
            </h1>


            {/* Logo en imagen (activo)
            <img
                src={LogoImage}
                alt="Sommelier"
                className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto mb-10 transition-transform duration-1000 ease-out"
                style={{
                    transform: `scale(${titleScale})`,
                    opacity: titleOpacity,
                    filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))"
                }}
            />*/}

            {/* Barra de carga de extremo a extremo */}
            <div className="w-full h-0.5 bg-transparent overflow-hidden mt-6">
                <div
                    className="h-full bg-gray-100"
                    style={{ width: `${progress}%`, transition: 'width 15ms linear' }}
                />
            </div>
        </div>
    );
}
