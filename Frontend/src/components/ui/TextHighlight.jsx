import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({ trialWarn: false });

const TextHighlight = ({ children, className = "" }) => {
  const textRef = useRef(null);
  const splitRef = useRef(null);
  const masksRef = useRef([]);

  const createMaskEffect = () => {
    if (!textRef.current) return;

    masksRef.current.forEach((mask) => mask.remove());
    masksRef.current = [];

    splitRef.current = new SplitText(textRef.current, { type: "lines" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 70%",
        end: "bottom 50%",
        scrub: 0.4,
        markers: false,
      },
    });

    splitRef.current.lines.forEach((target, index) => {
      gsap.set(target, { color: "#111" });

      const mask = document.createElement("span");
      mask.className = "mask";
      target.append(mask);
      masksRef.current.push(mask);

      timeline
        .to(
          mask,
          {
            scaleX: 0,
            transformOrigin: "right center",
            ease: "none",
            duration: 0.4,
          },
          index * 0.3
        )
        .to(
          target,
          {
            color: "#000000",
            duration: 0.2,
            ease: "none",
          },
          "<+=0.1"
        );
    });
  };

  useEffect(() => {
    createMaskEffect();

    const handleResize = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (splitRef.current) {
        splitRef.current.split();
      }
      createMaskEffect();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={`relative ${className}`}
      style={{ display: "inline-block" }}
    >
      {children}
      <style jsx>{`
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ffffff;
          transform-origin: right center;
          pointer-events: none;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default TextHighlight;

