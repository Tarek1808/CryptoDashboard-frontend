import styles from '../styles/News.module.css';
import MenuBar from './MenuBar';
import Header from './Header';
import { useEffect, useState } from 'react';
import Article from './Article';



function News() {
  const [newsDataN, setNewsDataN] = useState([]);
  console.log(newsDataN);

  //

  useEffect(() => {

    fetch('http://localhost:3000/news')
      .then(response => response.json())
      .then(dataN => {
        if (dataN.result) {
          console.log(dataN.news.results)
          setNewsDataN(dataN.news.results.slice(0, 5));
          
        // let description = dataN.description;
        //    if (description.length > 200) {
        //     description = `${description.substring(0, 200)}+ '...`;
        //    }
        }
      },);
  }, []);

  let news;
  if (newsDataN && newsDataN.length > 0) {
    news = newsDataN.map((dataN, i) =>
    (
      <Article
        key={i}
        image={dataN.image_url}
        title={dataN.title}
        description={dataN.description}
        link={dataN.link} />
        
    )
    )
  }


  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.menubar}>
          <MenuBar />
        </div>
        <div className={styles.rightContent}>
          <h1 className={styles.title}>
            News
          </h1>
          <div className={styles.cadre}>
            {news}
           
          </div>
          <div className={styles.table}>

          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
