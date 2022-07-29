import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { FormInput } from '../Inputs';

const KeyValuePairsFormField = ({ data, setData }) => {
    const [inputFields, setInputFields] = useState([
        {
            key: "", 
            value: ""
        }
    ]);

    // useEffect(() => {
    //     let properties = {};
    //     inputFields.map(e => {
    //         properties[e.key] = e.value
    //     });
    //     setData(properties);
    // }, [inputFields]);
    
    const onchange = (e, index) => {
        const values = [...inputFields]
        values[index][e.target.name] = e.target.value;

        let properties = {};
        values.map(e => {
            properties[e.key] = e.value
        });
        setData(properties);
    }

    const onAddField = () => {
        setInputFields([...inputFields, {"key": "", "value": ""}])
    }

    const removeField = (index) => {
        let values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    useEffect(() => {
        let values = [];
        Object.entries(data).map(([key, val], index) => {
            let properties = {};
            properties["key"] = key;
            properties["value"] = val;
            values.push(properties);
        });
        setInputFields(values);
    }, [data])
    

    return (
        <div>
            {inputFields.map((e, index) => {
                return (
                    <div className="d-flex justify-content-between align-items-center" key={index}>
                        <FormInput 
                            name="key"
                            handlechange={(event) => onchange(event, index)}
                            value={e.key}
                            placeholder="Key"
                            style={{width: '45%'}}
                        />
                        <FormInput 
                            name="value"
                            handlechange={(event) => onchange(event, index)}
                            value={e.value}
                            placeholder="Value"
                            style={{width: '45%'}}
                        />
                        <Button variant='danger' className='m-0 mb-3 py-2 px-1 d-flex justify-content-between align-items-center' onClick={() => removeField(index)}>
                            <Trash />
                        </Button>
                    </div>
                )
            })}
            <div className="text-center">
                <Button 
                    variant='success'
                    onClick={onAddField}
                    size="sm"
                >
                    + Add New
                </Button>
            </div>
        </div>
    )
}

export default KeyValuePairsFormField;