import styles from './Profile.module.css'

type Player = {
  img: string
  name: string
  location: string
  time: number
  dt: string
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
            <img src={value.img} alt={value.name} className={styles.avatar} />
            <div className={styles.info}>
              <h3 className={styles.name}>{value.name}</h3>
              <span className={styles.location}>{value.dt}</span>
            </div>
          </div>
          <div className={styles.time}>{value.time}</div>
        </div>
      ))}
    </>
  )
}
