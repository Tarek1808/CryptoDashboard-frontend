import styles from '../styles/Wallets.module.css';
import MenuBar from './MenuBar';
import Header from './Header';
import { useEffect, useState } from 'react';
import Article from './Article';



function News() {
  const [newsData, setNewsData] = useState([]);
 console.log(newsData);
  
//

  useEffect(() => {
    
    fetch('http://localhost:3000/news')
      .then (response => response.json())
      .then (data => {
        if (data.result) {
          console.log(data.news.results)
           setNewsData(data.news.results.slice[0, 3])
          
          
          //  if (description.lenght > 200) {
          //   description = description.substring(0, 200) + '...';
          //  }
        }
      }, );
  },[]);

let news;
  if (newsData && newsData.length > 0) {
  news = newsData.map((data) => 
     (
      <Article
        image={data.image_url}
        title={data.title}
        description={data.description}
        link={data.link} />
    )
  )}


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
      <p><a href="http://localhost:3001/">Login</a></p>
      <p><a href="http://localhost:3001/addWallet">AddWallet</a></p>
      <p><a href="http://localhost:3001/wallets">Wallets</a></p>
    </div>
  );
}

export default News;
