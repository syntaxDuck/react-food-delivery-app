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
  const end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <nav className="mt-8" aria-label="Menu pagination">
      <ul className="flex flex-wrap items-center justify-center gap-3 list-none p-0">
        <li>
          <AnimatedButton
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => {
              onPageChange(Math.max(1, currentPage - 1));
            }}
            aria-label="Go to previous page"
          >
            <span className="material-icons md-18 mr-2">chevron_left</span>
            Prev
          </AnimatedButton>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <motion.button
              type="button"
              onClick={() => {
                onPageChange(page);
              }}
              className={
                `min-w-[44px] px-4 py-2 rounded-full text-sm font-semibold border transition-all ` +
                (page === currentPage
                  ? "bg-primary text-text border-primary shadow-lg"
                  : "bg-bg-light/20 text-text/80 border-border/50 hover:bg-bg-light/30")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to page ${String(page)}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </motion.button>
          </li>
        ))}

        <li>
          <AnimatedButton
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => {
              onPageChange(Math.min(totalPages, currentPage + 1));
            }}
            aria-label="Go to next page"
          >
            Next
            <span className="material-icons md-18 ml-2">chevron_right</span>
          </AnimatedButton>
        </li>
      </ul>
    </nav>
  );
};

export default MenuPagination;
