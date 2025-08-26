import styles from './Profile.module.css';

type Player = {
  img: string
  email: string
  full_name: string
  solve_time: number
  created_at: string
}

export default function Profile({ Leaderboard, timeFormat, showAll }: {
                Leaderboard: Player[];
                timeFormat: (seconds: number) => string;
                showAll: boolean;
              }) {
  function Item(data: Player[]) {
    return (
        <div className={styles.leaderboardContainer}>
          <h1 className={styles.leaderboardHeader}>{showAll ? "All Solvers" : "Top 10 Solvers"}</h1>
            {data.map((value, index) => (
              <div key={index} className={`${styles.card} ${
                index === 0
                  ? styles.gold
                  : index === 1
                  ? styles.silver
                  : index === 2
                  ? styles.bronze
                  : ''
              }`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src='./CUBERT.png' alt={value.full_name} className={styles.avatar} />
                  <h1 className={styles.rank}>{index+1}</h1>
                  <div className={styles.info}>
                    <h3 className={styles.name}>{value.full_name}</h3>
                    <span className={styles.location}>{value.created_at.slice(0, 10)}</span>
                  </div>
                </div>
                <div className={styles.time}>{timeFormat(value.solve_time)}</div>
              </div>
            ))}
        </div>
      );
    }

  return <div>{Item(Leaderboard)}</div>;
}


