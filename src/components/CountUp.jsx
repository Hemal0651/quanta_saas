import { useEffect, useRef, useState } from 'react';

export default function CountUp({
  from = 0,
  to = 100,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2,
  className = '',
  ...props
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // easeOutCubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = from + (to - from) * easedProgress;

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(to);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [from, to, duration]);

  const formattedValue = count.toFixed(decimals);

  return (
    <span ref={ref} className={className} {...props}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
