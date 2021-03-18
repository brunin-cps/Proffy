import React, {TextareaHTMLAttributes} from 'react';

import './styles.css';


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    name: string;

}

const Textarea:React.FC<TextareaProps> = ({label,name,...rest }) =>{
    return(
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>   
            <textarea id={name} {...rest}/>
        </div>
    );
}


/* function Textarea(){
    return(
        <div className="Textarea-block">
            <label htmlFor="subject">Materia</label>   
            <Textarea type="text" id="subject"/>
        </div>
    );
}
 */
export default Textarea;