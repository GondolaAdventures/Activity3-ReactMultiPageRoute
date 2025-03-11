import { Link, useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import EditIcon from '../assets/edit.svg';
import './Home.css';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const ref = collection(db, 'articles');
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(results);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id);
    await deleteDoc(ref);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Filter articles based on the search query
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <h2>Articles</h2>
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="articles-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div key={article.id} className="card">
              <div className="card-header">
                <h3>{article.title}</h3>
                <div className="card-actions">
                  <img 
                    className="icon"
                    onClick={() => handleEdit(article.id)}
                    src={EditIcon} alt="edit icon" 
                    title="Edit Article"
                  />
                  <img 
                    className="icon"
                    onClick={() => handleDelete(article.id)}
                    src={DeleteIcon} alt="delete icon" 
                    title="Delete Article"
                  />
                </div>
              </div>
              <p className="author">Written by <strong>{article.author}</strong></p>
              <Link to={`/articles/${article.id}`} className="read-more">Read More...</Link>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}
