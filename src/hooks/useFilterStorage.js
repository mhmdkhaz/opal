import React, { useState, useEffect } from "react";

export const useFilters = () => {
  const getStoredFilter = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };

  const [selectedColor, setSelectedColor] = useState(
    getStoredFilter("color", "")
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    getStoredFilter("categoryId", "")
  );
  const [discounts, setDiscounts] = useState(getStoredFilter("discounts", ""));
  const [baseSellers, setBaseSellers] = useState(
    getStoredFilter("baseSellers", "")
  );

  useEffect(() => {
    localStorage.setItem("color", JSON.stringify(selectedColor));
    localStorage.setItem("categoryId", JSON.stringify(selectedCategoryId));
    localStorage.setItem("discounts", JSON.stringify(discounts));
    localStorage.setItem("baseSellers", JSON.stringify(baseSellers));
  }, [selectedColor, selectedCategoryId, discounts, baseSellers]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("selectedColor");
      localStorage.removeItem("selectedCategoryId");
      localStorage.removeItem("discounts");
      localStorage.removeItem("baseSellers");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return {
    selectedColor,
    selectedCategoryId,
    discounts,
    baseSellers,
    setSelectedColor,
    setSelectedCategoryId,
    setDiscounts,
    setBaseSellers,
  };
};
