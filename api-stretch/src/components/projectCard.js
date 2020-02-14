import React from 'react';

const ProjectCard = ({project}) => {

    return(
        <div>
            <h3>Name: {project.name}</h3>
            <p>Description: {project.description}</p>
            <p>Completed: {project.completed}</p>
        </div>
    )
};

export default ProjectCard