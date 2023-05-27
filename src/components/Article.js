const Article = ({title, body}) =>{ 
    return (
        <article> 
            <h2>{title}</h2>
            {body}
        </article>
    );
};


export default Article;