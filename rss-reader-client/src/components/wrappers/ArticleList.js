import React from 'react';
import Article from './Article.js';

function ArticleList({ feedUrl, articles }) {
    return (
        <ul className="article-list">
            { articles.map((article, index) =>
                <Article key={article.link} feedUrl={feedUrl} article={article}/>
            )}
        </ul>
    );
}

export default ArticleList;
