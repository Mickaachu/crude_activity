import { useState, useEffect } from "react";

const Home = () => {
    const [users, setUser] = useState(null);
    useEffect(() => {
      fetch("http://localhost:1111/api/userList")
        .then((res) => res.json())
        .then((data) => setUser(data));
    }, []);

  return (
      <div className="container">
        <h1>Welcome!</h1>
        <h2>Please see Users below</h2>
        <ul>
          {
            // {users ? (
            //   users.map((user) => (
            //     <li>
            //       {user.userName}
            //     </li>
            //   ))
            // ) : (
            //   <div>Loading...</div>
            // )

            users ? (
              users.map((user) => (
                <li>
                  {user.name} - {user.username} 
                </li>
              ))
            ) : (
              <em>Loading...</em>
            )
            
          }
        </ul>
    
      </div>
    );
}

export default Home;