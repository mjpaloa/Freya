import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  return (
    <div className="pagination-bar">
      <div className="pagination-info">
        Showing <strong>{startItem}–{endItem}</strong> of <strong>{totalItems}</strong> results
      </div>

      <div className="pagination-controls">
        <div className="per-page-selector">
          <span>Show</span>
          {[10, 20].map((count) => (
            <button
              key={count}
              className={`per-page-btn ${itemsPerPage === count ? 'active' : ''}`}
              onClick={() => { onItemsPerPageChange(count); onPageChange(1); }}
            >
              {count}
            </button>
          ))}
        </div>

        <div className="page-nav">
          <button
            className="page-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('ellipsis');
              acc.push(p);
              return acc;
            }, [])
            .map((item, idx) =>
              item === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="page-ellipsis">…</span>
              ) : (
                <button
                  key={item}
                  className={`page-btn page-number ${currentPage === item ? 'active' : ''}`}
                  onClick={() => onPageChange(item as number)}
                >
                  {item}
                </button>
              )
            )}

          <button
            className="page-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
