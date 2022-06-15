import React from 'react'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProjectBox = ({ data }) => {
    let navigate = useNavigate();
    return (
        <div>
            <Card className='h-100 project-card' onClick={() => navigate(`/project/${data.name}`)}>
                <Card.Body className='d-flex flex-column p-3'>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>{data.description}</Card.Text>
                    <Card.Text className='text-muted mt-auto'>
                        <small>
                            Last updated on {new Date(data.modified_at).toLocaleString()}
                        </small>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProjectBox;