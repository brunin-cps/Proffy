import React from 'react';
import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import './styles.css';


//Define as tipagens de um objeto
interface PageHeaderProps{
    title: String;
    description?: String;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description ? <p>{props.description}</p>: null}
                {props.children}
            </div>
            
        </header>
    );
}

export default PageHeader;