import { motion } from "framer-motion";
import React from "react";

import AnimatedButton from "../../ui/AnimatedButton";
import type { MenuPaginationProps } from "./types";

const MenuPagination: React.FC<MenuPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <AnimatedButton
        type="button"
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(Math.max(1, currentPage - 1));
        }}
      >
        <span className="material-icons md-18 mr-2">chevron_left</span>
        Prev
      </AnimatedButton>

      {pages.map((page) => (
        <motion.button
          key={page}
          type="button"
          onClick={() => {
            onPageChange(page);
          }}
          className={
            `min-w-[44px] px-4 py-2 rounded-full text-sm font-semibold border transition-all ` +
            (page === currentPage
              ? "bg-primary text-white border-primary shadow-[0_8px_24px_rgba(214,110,110,0.35)]"
              : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10")
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page}
        </motion.button>
      ))}

      <AnimatedButton
        type="button"
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(Math.min(totalPages, currentPage + 1));
        }}
      >
        Next
        <span className="material-icons md-18 ml-2">chevron_right</span>
      </AnimatedButton>
    </div>
  );
};

export default MenuPagination;
