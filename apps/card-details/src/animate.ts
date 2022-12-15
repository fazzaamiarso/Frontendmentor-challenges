import gsap from "gsap";

const mm = gsap.matchMedia();
mm.add("(max-width: 1024px)", () => {
  gsap.to(".front__card", {
    keyframes: {
      "0%": { x: 0, y: 0 },
      "100%": { xPercent: -10, yPercent: 55 },
    },
    duration: 0.5,
  });

  gsap.to(".back__card", {
    keyframes: {
      "0%": { x: 0, y: 0 },
      "100%": { xPercent: 10, yPercent: 0 },
    },
    duration: 0.5,
  });
});

mm.add("(min-width: 1024px)", () => {
  gsap.to(".front__card", {
    keyframes: {
      "0%": { x: 0, y: 0 },
      "100%": { xPercent: 10, yPercent: -55 },
    },
    duration: 0.8,
  });

  gsap.to(".back__card", {
    keyframes: {
      "0%": { x: 0, y: 0 },
      "100%": { xPercent: 30, yPercent: 55 },
    },
    duration: 0.8,
  });
});

mm.add("(min-width: 1200px)", () => {
  gsap.to(".front__card", {
    keyframes: {
      "0%": { x: 0, y: 0 },
      "50%": { yPercent: -55, xPercent: 0 },
      "100%": { xPercent: 30, yPercent: -55 },
    },
    duration: 0.8,
  });

  gsap.to(".back__card", {
    keyframes: {
      "0%": { x: 0, y: 0 },
      "50%": { yPercent: 55, xPercent: 0 },
      "100%": { xPercent: 50, yPercent: 55 },
    },
    duration: 0.8,
  });
});
