import React, {InputHTMLAttributes} from 'react';

import './styles.css';


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    name: string;

}

const Input:React.FC<InputProps> = ({label,name,...rest }) =>{
    return(
        <div className="input-block">
            <label htmlFor={name}>{label}</label>   
            <input type="text" id={name} {...rest}/>
        </div>
    );
}


/* function Input(){
    return(
        <div className="input-block">
            <label htmlFor="subject">Materia</label>   
            <input type="text" id="subject"/>
        </div>
    );
}
 */
export default Input;