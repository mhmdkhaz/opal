import { useState, useCallback } from "react";

const useImageZoom = () => {
  const [zoomLevel, setZoomLevel] = useState(1); // مستوى التكبير الافتراضي
  const [position, setPosition] = useState({ x: 0, y: 0 }); // موضع الصورة
  const [isDragging, setIsDragging] = useState(false); // حالة السحب
  const [startPos, setStartPos] = useState({ x: 0, y: 0 }); // نقطة البداية عند السحب

  /**
   * 🔹 التكبير والتصغير عند تمرير عجلة الماوس
   * - التكبير سلس أكثر (0.05 لكل تمرير)
   * - لا يسمح بتجاوز الحدود (1x إلى 3x)
   */
  const handleWheel = useCallback((event) => {
    event.preventDefault();

    setZoomLevel((prevZoom) => {
      let newZoom = prevZoom + event.deltaY * -0.005;
      return Math.min(Math.max(newZoom, 1), 3);
    });
  }, []);

  /**
   * 🔹 عند بدء السحب بالماوس
   * - يتم تمكين السحب فقط إذا كان مستوى التكبير أكبر من 1
   */
  const handleMouseDown = useCallback(
    (event) => {
      if (zoomLevel > 1) {
        setIsDragging(true);
        setStartPos({
          x: event.clientX - position.x,
          y: event.clientY - position.y,
        });
      }
    },
    [zoomLevel, position]
  );

  /**
   * 🔹 عند تحريك الماوس أثناء السحب
   * - يتم تحديث موقع الصورة مع التأكد من أنها لا تخرج عن الإطار
   */
  const handleMouseMove = useCallback(
    (event) => {
      if (!isDragging) return;

      setPosition((prevPos) => {
        const newX = event.clientX - startPos.x;
        const newY = event.clientY - startPos.y;

        const maxMove = 100 * (zoomLevel - 1); // تحديد الحد الأقصى للحركة
        return {
          x: Math.min(Math.max(newX, -maxMove), maxMove),
          y: Math.min(Math.max(newY, -maxMove), maxMove),
        };
      });
    },
    [isDragging, startPos, zoomLevel]
  );

  /**
   * 🔹 عند إفلات زر الماوس
   * - يتم تعطيل وضع السحب
   */
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /**
   * 🔹 عند النقر المزدوج، يتم إعادة ضبط التكبير والموقع
   */
  const resetZoom = useCallback(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    zoomLevel,
    position,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetZoom,
  };
};

export default useImageZoom;
