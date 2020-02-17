import React, { useState, useEffect } from 'react';
import ProjectCard from './projectCard';

const ProjectList = ({projects}) => {
 
    return(
        <div>
            <h2>Here is a list of projects</h2>
            <div>
               {projects.map(project => {
                   return <ProjectCard key={project.id} project={project} />
               })}
            </div>
        </div>
    )
};

export default ProjectList