import Link from "next/link"
import styles from "./header.module.css"


const Header = () =>{
    return(
        <header className={styles.header}>
            <Link href={'/'} className={styles.link}><img src="/faviconWhite.png" className={styles.favicon}/></Link>
            {/* style={{width:'600px', display:'flex'}} */}
            <div > 
                <Link href={'/games/countries'} className={styles.link}>Paises</Link>
                <Link href={'/games/football'} className={styles.link}>Fútbol</Link>
                <Link href={'/games/sports'} className={styles.link}>Deportes</Link>
                {/* <div style={{display:'flex', alignItems:'center'}}>
                    <input type="text" placeholder="Buscar" className={styles.searchInput} />
                    <button className={styles.searchButton}>

                    </button>
                </div> */}
            </div>

        </header>
    )
}

export default Header