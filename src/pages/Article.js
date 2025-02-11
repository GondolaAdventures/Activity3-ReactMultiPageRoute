import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Article({ articles }) {
  const { urlId } = useParams();
  const navigate = useNavigate();

  const article = articles.find(({ id }) => id === urlId);

  useEffect(() => {
    if (!article) {
      // Immediately redirect if no article is found.
      navigate('/');
    }
  }, [article, navigate]);

  return (
    <div>
      {!article && <p>No record found. Redirecting...</p>}
      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  );
}
