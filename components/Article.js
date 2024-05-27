
import styles from '../styles/Article.module.css';
import Image from 'next/image';

function Article(props) {
 console.log(props);

    return (
        <div className={styles.articles} >
            <h3>{props.title}</h3>
            <Image src={props.image_url} alt={props.title} width={300} height={260} />
            <h4 style={{ textAlign: "right" }}>- </h4>
            <div className={styles.divider}></div>        
            <p>{props.description}</p>
        </div>
    );
}

export default Article;