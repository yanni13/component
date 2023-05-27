import { useState } from 'react';

const Update = ({ title, body, onUpdate }) => {
  const [Title, setTitle] = useState(title);
  const [Body, setBody] = useState(body);

  const Submit = (e) => {
    e.preventDefault();
    onUpdate(Title, Body);
  };

  return (
    <form onSubmit={Submit}>
        <h2>Update</h2>
        <p>
        <input 
            type="text"
            placeholder="title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
        />
        </p>
        <p>
        <textarea
            placeholder="body"
            value={Body}
            onChange={(e) => setBody(e.target.value)}
         ></textarea>
        </p>
         <button type="submit">Update</button>
    </form>
  );
};

export default Update;