import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { Card } from 'react-bootstrap';

const ProjectBoxSkeleton = () => {
    return (
        <div>
            <Card className='h-100 project-card'>
                <Card.Body className='d-flex flex-column p-3'>
                    <Card.Title>
                        <Skeleton height={25}/>
                    </Card.Title>
                    <Skeleton count={2.5} />
                    <Skeleton count={0.8} />
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProjectBoxSkeleton;