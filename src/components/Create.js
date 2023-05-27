import { useState } from 'react';

const Create = ({ onCreate }) => { 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  const Submit = (e) => {
    e.preventDefault();//새로고침 방지하기 위한 코드
    onCreate(title, body);//생성된 값 추가시키기
  };

  return (
    <>
    <form onSubmit={Submit}>
        <h2>Create</h2>
        <p>
        <input 
            type="text" 
            placeholder="Title" //칸안에 글이 표시되게 하고 싶어서 placeholder 사용
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
        />
        </p>
        <p>
        <textarea 
            placeholder="body" 
            value={body}
            onChange={(e) => setBody(e.target.value)}
        ></textarea>
        </p>
      <button type="submit">Create</button>
    </form>
    </>
    
  ); 
};

export default Create;