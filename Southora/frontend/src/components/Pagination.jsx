export default function Pagination({ page, totalPages, onPageChange }) {
  const lastPage = Math.min(totalPages || 1, 50);
  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>← Previous</button>
      <span>Page <strong>{page}</strong> of {lastPage}</span>
      <button disabled={page >= lastPage} onClick={() => onPageChange(page + 1)}>Next →</button>
    </div>
  );
}
