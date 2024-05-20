import styles from '../styles/Login.module.css';
//import SignUp from './SignUp';
//import SignIn from './SignIn';

function Login() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>Dashboard Crypto</header>
            <main className={styles.main}>
                <div className={styles.presentation}>
                   
                    <h2>Welcome to Dashboard Crypto!</h2>
                    <p>Here you can manage your crypto assets...
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la
mise en page avant impression. Le Lorem Ipsum est le faux texte standard de
l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
ensemble des morceaux de texte pour réaliser un livre spécimen de polices de
texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la
bureautique informatique, sans que son contenu n'en soit modifié. Il a été
popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant
des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des
applications de mise en page de texte, comme Aldus PageMaker.

Le Lorem Ipsum est simplement du faux texte employé dans la composition et la
mise en page avant impression. Le Lorem Ipsum est le faux texte standard de
l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
ensemble des morceaux de texte pour réaliser un livre spécimen de polices de
texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la
bureautique informatique, sans que son contenu n'en soit modifié. Il a été
popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant
des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des
applications de mise en page de texte, comme Aldus PageMaker.
                    </p>
                    
                </div>
                <div className={styles.auth}>
                   
                    <button onClick={() => console.log("Sign In")}>Sign In</button>
                    <button onClick={() => console.log("Sign Up")}>Sign Up</button>
                </div>
            </main>
        </div>
    );
}

export default Login;