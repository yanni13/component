import {useState} from 'react';
import {Header, Nav, Article, Create, Update} from "./components";

const App = () => {
  const [mode, setMode] = useState('WELCOME'); // content에 뭘 띄울지 flag
  const [id, setId] = useState(null);          // 내가 선택한 topic의 id가 뭔지
  const [nextId, setNextId] = useState(4);     // 추가할 topics key 값 관리

  const [topics, setTopics] = useState([       // topics 초기값 결정
    {id: 1, title: 'HTML', body: 'Html is ...'},
    {id: 2, title: 'CSS', body: 'Css is ...'},
    {id: 3, title: 'JavaScript', body: 'Javascript is ...'},
  ]);

  const handleTopicClick = (topicId) => { // 토픽을 클릭하면
    setMode('READ');// 읽기 모드로 변경
    setId(topicId);// 현재 클릭한 토픽의 key값으로 id 값 변
  };

  const handleCreate = (title, body) => { 
    const newTopic = {id:nextId, title:title, body:body};// 새로운 topic 생성...{id, title, body}
		const newTopics = [...topics, newTopic];// 새로은 topics 생성...전개 연산자

		setTopics(newTopics);// 새로운 topics를 기존 topics에 반영
    setMode('READ');// 생성 끝났으면 읽기 모드로 변경
    setId(nextId);// 읽기 모드로 전환할 현재 토픽 key값 지정
    setNextId(nextId + 1);// nextId 값 변화 -> 어떻게?
  };

  const handleUpdate = (title, body) => { 
    // 전달받은 title, body로 해당 topics 값을 변경한 새로운 topics 생성 
    const newTopics = topics.map((topic) => 
      topic.id === id ? {...topic, title: title, body: body} : topic
    );
		// 업데이트된 topics를 기존 topics에 할당
		// 업데이트 끝났으면 읽기모드로
    setTopics(newTopics);
    setMode('READ');
  };

  let content = null;
  let contextControl = null; 
	let topic = null;

	switch (mode) {
    case 'WELCOME': // 입장 모드
      content = <Article title="Welcome" body="Hello, WEB"/>; // 컨텐츠 정의
      break;
    case 'READ': // 읽기 모드
      topic = topics.find((topic) => topic.id === id);
      content = <Article title={topic.title} body={topic.body}/>; // 컨텐츠 정의
      contextControl = <li> {/* 읽기 모드일 때만 보이는 update 버튼 */}
          <a href={'/update/' + id} onClick={(e)=>{ // onClick 이벤트 감지
              e.preventDefault(); // a 태그 기능 막기
              setMode('UPDATE');  // Update 모드로 변경
            }
          }> Update </a>
        </li>
      break;
    case 'CREATE': // 생성 모드
      content = <Create onCreate={handleCreate} />; // Article이 아니라 Create 컴포넌트 호출
      break;
    case 'UPDATE': // 업데이트 모드
      topic = topics.find((topic) => topic.id === id); // 뭘 업데이트 할 건데? 업데이트할 topic 탐색
      content = <Update title={topic.title} body={topic.body} onUpdate={handleUpdate}/> // Aricle이 아닌 Update 불러옴
      break;
    default: break;
  }
  
  return (
    <div>
      <Header 
        title="React" 
        onChangeMode={() => {setMode('WELCOME');}}
      />
      <Nav 
        topics={topics} 
        onChangeMode={handleTopicClick}
      />

      {content}

      <ul>
        <li>
          <a href="/create" onClick={(e)=>{
            e.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>

  );
}

export default App;