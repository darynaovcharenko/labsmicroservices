import React, { useState, useEffect } from 'react';

function App() {
  const [news, setNews] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', author: '' });
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://192.168.49.2/news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.log('Error fetching news:', error);
    }
  };

  const createArticle = async () => {
    try {
      const response = await fetch('http://192.168.49.2/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArticle)
      });
      const data = await response.json();
      setNews([...news, data]);
      setNewArticle({ title: '', content: '', author: '' });
    } catch (error) {
      console.log('Error creating article:', error);
    }
  };

  const updateArticle = async () => {
    try {
      const response = await fetch(`http://192.168.49.2/news/${selectedArticle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedArticle)
      });
      const data = await response.json();
      const updatedNews = news.map((article) => {
        if (article.id === data.id) {
          return data;
        }
        return article;
      });
      setNews(updatedNews);
      setSelectedArticle(null);
    } catch (error) {
      console.log('Error updating article:', error);
    }
  };

  const deleteArticle = async (id) => {
    try {
      const response = await fetch(`http://192.168.49.2/news/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      const filteredNews = news.filter((article) => article.id !== data.id);
      setNews(filteredNews);
    } catch (error) {
      console.log('Error deleting article:', error);
    }
  };

  const handleEditClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCancelClick = () => {
    setSelectedArticle(null);
  };

  return (
      <div>
        <h1>News Articles</h1>
        <ul>
          {news.map((article) => (
              <li key={article.id}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <p>Author: {article.author}</p>
                {selectedArticle && selectedArticle.id === article.id ? (
                    <div>
                      <input
                          type="text"
                          value={selectedArticle.title}
                          onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
                      />
                      <textarea
                          value={selectedArticle.content}
                          onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
                      ></textarea>
                      <input
                          type="text"
                          value={selectedArticle.author}
                          onChange={(e) => setSelectedArticle({ ...selectedArticle, author: e.target.value })}
                      />
                      <button onClick={updateArticle}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                ) : (
                    <div>
                      <button onClick={() => handleEditClick(article)}>Edit</button>
                      <button onClick={() => deleteArticle(article.id)}>Delete</button>
                    </div>
                )}
              </li>
          ))}
        </ul>
        <h2>Create New Article</h2>
        <input
            type="text"
            placeholder="Title"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
        />
        <textarea
            placeholder="Content"
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
        ></textarea>
        <input
            type="text"
            placeholder="Author"
            value={newArticle.author}
            onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
        />
        <button onClick={createArticle}>Create</button>
      </div>
  );
}

export default App;
