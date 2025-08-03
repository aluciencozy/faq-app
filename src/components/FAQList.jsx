import React, { useState, useEffect } from "react";
import FAQItem from "./FAQItem";
import faqData from "../data/faqData";

const FAQList = ({ toggleDarkMode, darkMode }) => {
  const [openId, setOpenId] = useState(null);
  const [expandAll, setExpandAll] = useState(false);

  const toggleItem = (id) => {
    if (expandAll) {
      setExpandAll(false);
    }
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const toggleExpandAll = () => {
    setExpandAll((prev) => !prev);
    setOpenId(null);
  };

  useEffect(() => {
    if (openId && typeof window !== "undefined") {
      setTimeout(() => {
        const element = document.getElementById(`faq-item-${openId}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [openId]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text text-center sm:text-left w-full sm:w-auto">
          Frequently Asked Questions
        </h2>
        <div className="flex items-center space-x-4">
          <button className="btn" onClick={toggleExpandAll}>
            <i
              className={`bx bx-${
                expandAll ? "shrink-right" : "expand-right"
              } text-lg`}
            ></i>
            <span>{expandAll ? "Collapse All" : "Expand All"}</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition duration-300 cursor-pointer"
          >
            <i className={`bx bx-${darkMode ? "sun" : "moon"} text-xl`}></i>
          </button>
        </div>
      </div>
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-indigo-100/50 dark:border-indigo-900/30 transition duration-300 overflow-hidden">
        {faqData.map((item) => (
          <FAQItem
            key={item.id}
            item={item}
            toggleItem={toggleItem}
            isOpen={expandAll || openId === item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQList;
