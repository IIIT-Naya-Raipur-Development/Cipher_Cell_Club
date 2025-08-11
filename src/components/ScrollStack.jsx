import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 0,
  itemScale = 0.05,
  itemStackDistance = 20,
  stackPosition = "10vh",
  scaleEndPosition = "10%",
  baseScale = 0.8,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].offsetTop;
          const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform || 
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const handleWindowScroll = useCallback(() => {
    if (!scrollerRef.current) return;
    
    const container = scrollerRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const cards = container.querySelectorAll('.scroll-stack-card');
    
    cards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate how close the card is to the center of the viewport
      const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
      const maxDistance = windowHeight / 2;
      const proximity = Math.max(0, 1 - (distanceFromCenter / maxDistance));
      
      // Calculate stacking effect based on card index and scroll position
      const isActive = cardRect.top <= viewportCenter && cardRect.bottom >= viewportCenter;
      const isAbove = cardRect.bottom < viewportCenter;
      const isBelow = cardRect.top > viewportCenter;
      
      let scale = 1;
      let translateY = 0;
      let opacity = 1;
      let zIndex = cards.length - i;
      
      if (isAbove) {
        // Cards that have scrolled past - make them smaller and stack
        scale = baseScale - (i * itemScale);
        translateY = -itemStackDistance * (i + 1);
        opacity = 0.8;
        zIndex = i;
      } else if (isActive) {
        // Active card - full size
        scale = 1;
        translateY = 0;
        opacity = 1;
        zIndex = cards.length + 10;
      } else if (isBelow) {
        // Cards coming up - slightly smaller
        scale = baseScale + (proximity * (1 - baseScale));
        translateY = itemStackDistance * proximity;
        opacity = 0.7 + (proximity * 0.3);
        zIndex = cards.length - i;
      }

      card.style.transform = `translateY(${translateY}px) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
    });
  }, [baseScale, itemScale, itemStackDistance]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [handleWindowScroll]);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
    >
      {children}
    </div>
  );
};

export default ScrollStack;