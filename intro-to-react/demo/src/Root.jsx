import { Link, Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';

export const TaskContext = createContext();

export default function Root() {
  const [tasks, setTasks] = useState([]);
  
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </TaskContext.Provider>
  );
}
