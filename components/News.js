import styles from '../styles/Wallets.module.css';
import MenuBar from './MenuBar';
import Header from './Header';
import { useEffect, useState } from 'react';
import Article from './Article';



function News() {
  const [newsData, setNewsData] = useState([]);

  const news = newsData.map((data, i) => {
    return (
      <Article key={i}
        image={data.image_url}
        title={data.title}
        description={data.description}
        link={data.link} />
    )
  })


  useEffect(() => {
    console.log('actif')
    fetch('http://localhost:3000/news')
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log(data.news.results)
           setNewsData(data.news.results)
          console.log(newsData);
          //  document.querySelector('#icon').src = data.image_url;
          //  document.querySelector('#title').src = data.title;
          //  document.querySelector('#description').src = data.description;
          //  document.querySelector('#link').src = data.link;
          //  let description = data.description;
          //  if (description.lenght > 200) {
          //   description = description.substring(0, 200) + '...';
          //  }
        }
      }, []);
  })


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
            <Article />
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
