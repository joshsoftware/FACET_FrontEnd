import React, { useEffect, useState } from 'react'
import { FormCheckBox, FormInput } from '../../../../forms/Inputs';

const CheckBoxWithNumField = (
    {
        label,
        value,
        name,
        handlechange,
        ...props
    }
) => {
    const [isChecked, setIsChecked] = useState(false);

    const onchange = (e) => {
        let val = e.target.value;
        if (val==='') {
            val=0;
        }
        handlechange(e.target.name, val);
    }

    useEffect(() => {
        if(!isChecked) {
            handlechange(name, null)
        } else {
            handlechange(name, 0)
        }
    }, [isChecked])
    

    return (
        <>
            <FormCheckBox 
                label={label}
                value={isChecked} 
                handlechange={() => setIsChecked(!isChecked)}
                className="py-2"
            />
            {isChecked&&(
                <FormInput 
                    type="number"
                    name={name}
                    value={value}
                    handlechange={onchange}
                />
            )}
        </>
    )
}

export default CheckBoxWithNumField;