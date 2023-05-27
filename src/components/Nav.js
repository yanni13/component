const Nav = ({ topics, onChangeMode}) => {
  return (
      <nav>
          <ol>
              {topics.map((topic)=>(
                  <li key={topic.id} onClick = {() => onChangeMode(topic.id)}>
                      {topic.title}
                  </li>

              ))}

          </ol>
      </nav>
  );
};

export default Nav;