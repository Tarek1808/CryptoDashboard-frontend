
import styles from '../styles/Article.module.css';
import Image from 'next/image';

function Article(props) {
    console.log(props);
        const MAX_DESCRIPTION_LENGTH = 200;

        let description = props.description || '';
           if (description.length > MAX_DESCRIPTION_LENGTH) {
            description = `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
           }

    return (
        <div className={styles.articles} >
            <div className={styles.case}>
                <div className={styles.imageCase}>
                    <Image className={styles.image}
                        src={props.image}
                        alt={props.title}
                        width={150}
                        height={150} />
                </div>
            </div>
            {/* <h4 style={{ textAlign: "right" }}>- </h4> */}
            <div className={styles.divider}></div>
            <div className={styles.text}>
                <h3 className={styles.title}>{props.title}</h3>
                <p className={styles.description}>{description}</p>
                <a className={styles.link} href={props.link} target="_blank">source:{props.link} </a>
            </div>
        </div>
    );
}
// if (description.lenght > 200) {
//     description = description.substring(0, 200) + '...';
//    }

export default Article;