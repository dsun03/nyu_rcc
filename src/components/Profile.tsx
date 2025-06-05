import styles from './Profile.module.css'

type Player = {
  img: string
  email: string
  full_name: string
  solve_time: number
  created_at: string
}

export default function Profile({ Leaderboard }: { Leaderboard: Player[] }) {
  return <div>{Item(Leaderboard)}</div>
}

function Item(data: Player[]) {
  return (
    <>
      {data.map((value, index) => (
        <div key={index} className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src='./CUBERT.png' alt={value.email} className={styles.avatar} />
            <div className={styles.info}>
              <h3 className={styles.name}>{value.full_name}</h3>
              <span className={styles.location}>{value.created_at.slice(0, 10)}</span>
            </div>
          </div>
          <div className={styles.time}>{value.solve_time}</div>
        </div>
      ))}
    </>
  )
}
