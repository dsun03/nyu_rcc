export const Leaderboard = [
    {
        name: "Shawn Hanna",
        location: "India",
        time : 8.92,
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Fidel Hand",
        location: "USA",
        time : 10.10,
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Bessie Hickle",
        location: "Chaina",
        time : 1.11,
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Adella Wunsch",
        location: "Japan",
        time : 23.011,
        img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-06-01"
    },
    {
        name: "Clair O'Connell",
        location: "London",
        time : 1.2,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Kameron Prosacco",
        location: "Canada",
        time : 93.2,
        img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Shawn Hanna",
        location: "India",
        time : 8.92,
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Fidel Hand",
        location: "USA",
        time : 10.10,
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Bessie Hickle",
        location: "Chaina",
        time : 1.11,
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Adella Wunsch",
        location: "Japan",
        time : 23.011,
        img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-06-01"
    },
    {
        name: "Clair O'Connell",
        location: "London",
        time : 1.2,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    },
    {
        name: "Kameron Prosacco",
        location: "Canada",
        time : 93.2,
        img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2025-05-10"
    }
]

export function addTimeToDatabase(newTime: string) {
  const entry = {
    name: "Big Papi", // hardcoded for now
    location: "US",
    time: parseFloat(newTime),
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    dt: new Date().toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    })
  }

  Leaderboard.push(entry)
  console.log("Updated Leaderboard:", Leaderboard)
}