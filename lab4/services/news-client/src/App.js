import React, { useState, useEffect } from 'react';

function App() {
  const [news, setNews] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', author: '' });
  const [selectedArticle, setSelectedArticle] = useState(null);




    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ name: '' , articles:null});
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    useEffect(() => {
      fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://192.168.49.2/authors');
        const data = await response.json();
        setAuthors(data);
        console.log(data)
      } catch (error) {
        console.log('Error fetching authors:', error);
      }
    };

    const createAuthor = async () => {
      try {
        const response = await fetch('http://192.168.49.2/authors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAuthor)
        });
        const data = await response.json();
        setAuthors([...authors, data]);
        setNewAuthor({ name: '' });
      } catch (error) {
        console.log('Error creating author:', error);
      }
    };

    const updateAuthor = async () => {
      try {
        const response = await fetch(`http://192.168.49.2/authors/${selectedAuthor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedAuthor)
        });
        const data = await response.json();
        const updatedAuthors = authors.map((author) => {
          if (author.id === data.id) {
            return data;
          }
          return author;
        });
        setAuthors(updatedAuthors);
        setSelectedAuthor(null);
      } catch (error) {
        console.log('Error updating author:', error);
      }
    };

    const deleteAuthor = async (id) => {
      try {
        const response = await fetch(`http://192.168.49.2/authors/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        const filteredAuthors = authors.filter((author) => author.id !== data.id);
        setAuthors(filteredAuthors);
      } catch (error) {
        console.log('Error deleting author:', error);
      }
    };

    const handleAuthorEditClick = (author) => {
      setSelectedAuthor(author);
    };

    const handleAuthorCancelClick = () => {
      setSelectedAuthor(null);
    };





  useEffect(() => {
    fetchNews();

  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://192.168.49.2/news');
      const data = await response.json();
      setNews(data);
      console.log(data)
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
                <p>AuthorID: {authors.find((author) => author.id === parseInt(article.author))?.name}</p>
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
                      <select
                          value={selectedArticle.author}
                          onChange={(e) => setSelectedArticle({ ...selectedArticle, author: e.target.value })}
                      >
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                              {author.name}
                            </option>
                        ))}
                      </select>
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
        <select
            value={newArticle.author}
            onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
          ))}
        </select>
        <button onClick={createArticle}>Create</button>

        <div>
          <h1>Authors</h1>
          <ul>
            {authors.map((author) => (
                <li key={author.id}>
                  <h3>{author.name}</h3>
                  <p>{author.numberofarticles}</p>
                  {selectedAuthor && selectedAuthor.id === author.id ? (
                      <div>
                        <input
                            type="text"
                            value={selectedAuthor.name}
                            onChange={(e) => setSelectedAuthor({ ...selectedAuthor, name: e.target.value })}
                        />
                        <button onClick={updateAuthor}>Save</button>
                        <button onClick={handleAuthorCancelClick}>Cancel</button>
                      </div>
                  ) : (
                      <div>
                        <button onClick={() => handleAuthorEditClick(author)}>Edit</button>
                        <button onClick={() => deleteAuthor(author.id)}>Delete</button>
                      </div>
                  )}
                </li>
            ))}
          </ul>
          <h2>Create New Author</h2>
          <input
              type="text"
              placeholder="Name"
              value={newAuthor.name}
              onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
          />
          <button onClick={createAuthor}>Create</button>
        </div>
      </div>
  );
}

export default App;
