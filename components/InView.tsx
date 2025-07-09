import { useEffect, useRef, ReactNode } from 'react';

interface InViewProps {
  children: ReactNode;
  onEnter?: () => void;
  once?: boolean;
  threshold?: number;
}

const InView: React.FC<InViewProps> = ({ children, onEnter, once = true, threshold = 0.1 }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter?.();
          if (once) observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [onEnter, once, threshold]);

  return <div ref={ref}>{children}</div>;
};

export default InView;
