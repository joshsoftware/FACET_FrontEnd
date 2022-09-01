import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const ProjectBox = (props) => {
    const { data, onClick } = props;

    return (
        <div>
            <Card className='h-100 project-card' onClick={onClick}>
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

ProjectBox.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
}
