import styles from './Profile.module.css';

type Player = {
  img: string
  email: string
  full_name: string
  solve_time: number
  created_at: string
}
function Item(data: Player[]) {
  return (
    <>
      {data.map((value, index) => (
        <div key={index} className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src='./CUBERT.png' alt={value.full_name} className={styles.avatar} />
            <h1 className={styles.rank}>{index+1}</h1>
            <div className={styles.info}>
              <h3 className={styles.name}>{value.full_name}</h3>
              <span className={styles.location}>{value.created_at.slice(0, 10)}</span>
            </div>
          </div>
          <div className={styles.time}>{value.solve_time.toFixed(3)}</div>
        </div>
      ))}
    </>
  );
}
export default function Profile({ Leaderboard }: { Leaderboard: Player[] }) {
  return <div>{Item(Leaderboard)}</div>;
}


