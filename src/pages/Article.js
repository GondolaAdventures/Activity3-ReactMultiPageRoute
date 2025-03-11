import { useNavigate, useParams } from "react-router-dom"
import {getDoc, doc} from 'firebase/firestore';
import {db} from '../firebase/config'
import { useEffect,useState } from 'react';

export default function Article() {
  const { urlId } = useParams()
  const navigate = useNavigate()

  console.log("id: " + urlId)

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const ref = doc(db, 'articles', urlId);
    getDoc(ref)
      .then((snapshot)=>{        
        setArticle(snapshot.data());
      })

  },[])  
  

  // if (!article) {
  //   setTimeout(() => {
  //     navigate('/')
  //   }, 2000)
  // }

  return (
    <div>
      {!article && <p>No records found!</p>}
      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.description}</p>
        </div>
      )}
    </div>
  )
}
