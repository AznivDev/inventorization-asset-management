import { useCallback } from "react";
import { Link } from "react-router-dom";

interface IProps {
  last: number;
  className?: string;
}

export const CustomTablePagination = (props: IProps) => {
  const { last, className } = props;

  const pages = useCallback(() => {
    const pages = [];
    for (let i = 1; i <= last; i++) pages.push(i);
    return pages;
  }, [last]);

  return (
    <nav className={className ?? ""}>
      <ul className="pagination justify-content-center">
        <li className="page-link disabled">
          <Link to="?page=1" className="text-dark">
            First
          </Link>
        </li>
        {pages().map((page, index) => (
          <Link to={`?page=${page}`} key={index} className="text-dark">
            <li className="page-link text-dark">{page}</li>
          </Link>
        ))}
        <li className="page-link">
          <Link to={`?page=${last}`} className="text-dark">
            Last
          </Link>
        </li>
      </ul>
    </nav>
  );
};
