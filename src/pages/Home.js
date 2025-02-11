import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({ articles }) {
  const onlineImageUrl = "https://unsplash.it/640/150?image=2"; // Random image from Unsplash

  return (
    <div className="home">
      <h2>Articles</h2>
      <img src={onlineImageUrl} alt="Online Random" className="home-img" />
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
        </div>
      ))}
    </div>
  );
}
