import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { CustomModal } from '../../../CustomComponents';
import JSONView from '../../../JSONView';
import { FormInput, FormSelect } from '../../../forms/Inputs';
import { useParams } from 'react-router-dom';
import { SaveButton } from '../../../forms/Buttons';
import { useDispatch } from 'react-redux';
import { addCommentRequest } from '../../../../store/Reports/actions';

const TestdatOutcomeModal = ({ show, handleClose, data }) => {
    const { projectName, reportId, tname } = useParams();
    let dispatch = useDispatch();

    const [formData, setFormData] = useState(
        {
            field: data.name,
            status: "",
            comment: "",
            reportId: reportId,
            testcase: tname,
            testdata: data.testdata_name,
            project: projectName
        }   
    )
    const [previousData, setPreviousData] = useState(data);
    const [isChanged, setIsChanged] = useState(false);

    const onchange = (name, value) => {
        if(name==="status"){
            if(value!==previousData.status){
                setIsChanged(true)
            } else {
                setIsChanged(false)
            }
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCommentRequest(formData));
    }

    useEffect(() => {
        let prevStatus = data.status==="mpassed"?"passed":data.status==="mfailed"?"failed":data.status;
        setPreviousData(prevState => ({
            ...prevState,
            status: prevStatus
        }))
        setFormData(prevState => ({
            ...prevState,
            status: prevStatus,
            comment: data.comment || ""
        }))
    }, [data])
    
    return (
        <CustomModal
            show={show}
            size="lg"
            handleClose={handleClose}
            title={data.name}
        >
            <CustomModal.Body>
                <Row className='mb-3'>
                    <Col md={6}>
                        <label>Expected Value</label>
                        <JSONView 
                            data={data.value}
                        />
                    </Col>
                    <Col md={6}>
                        <label>Response Value</label>
                        <JSONView 
                            data={data.value}
                        />
                    </Col>
                </Row>

                <FormSelect 
                    label="Status"
                    options={[{label: "Passed", value:"passed"}, {label: "Failed", value:"failed"}]}
                    value={formData.status}
                    name="status"
                    handlechange={onchange}
                    isRequired
                />

                <FormInput 
                    label="Comment"
                    type="textarea"
                    rows={2}
                    placeholder="Write the testdata here..."
                    name="comment"
                    value={formData.comment}
                    handlechange={(e) => onchange(e.target.name, e.target.value)}
                    disabled={!isChanged}
                    isRequired
                />
                {isChanged&&(
                    <>
                        <SaveButton 
                            handleClick={handleSubmit}
                            disabled={!isChanged || formData.comment.length===0}
                        />
                    </>
                )}

            </CustomModal.Body>
        </CustomModal>
    )
}

export default TestdatOutcomeModal;