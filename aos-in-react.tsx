 useEffect(() => {
        AOS.init({
            duration: 1000,
        });

        const lenis = new Lenis({
            duration: 2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy(); // Cleanup on component unmount
        };
    }, []);
