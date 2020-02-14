import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import ProjectList from './components/projectList';

function App() {
  const [ projects, setProjects ] = useState('')
    useEffect(() => {
        Axios
            .get('http://localhost:5000/api/projects')
            .then(res => {
                console.log(res)
                setProjects(res.data)
            })
            .catch(err => {
                console.log('could not fetch all projects', err)
            })
    }, [])

  return (
    <div className="App">
      <h1>API Week 1 Stretch</h1>
      {projects.length > 0
        ? <ProjectList projects={projects}/>
        : <h2>One moment, fetching projects!</h2>}
    </div>
  );
}

export default App;
