
import styles from '../styles/Article.module.css';
import Image from 'next/image';

function Article(props) {


    return (
        <div className={styles.articles} >
            <h3>{props.title}</h3>
            <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
            <div className={styles.divider}></div>
            <Image src={props.image_url} alt={props.title} width={300} height={260} />
            <p>{props.description}</p>
        </div>
    );
}

export default Article;