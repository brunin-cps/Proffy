import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/pageHeader';
import Input from '../../components/input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';


import './styles.css';
import api from '../../services/api';


function TeacherForm(){
    const history = useHistory();
    //Save the values of the form, so after he can sendo to database
    const [name,setName]= useState('');
    const [avatar,setAvatar]= useState('');
    const [whatsapp,setWhatsapp]= useState('');
    const [bio,setBio]= useState('');
    const [subject,setSubject]= useState('');
    const [cost,setCost]= useState('');


    const [scheduleItens,setScheduleItens] = useState([
        {week_day: 0, from: '', to: ''},
    ])


    function addNewScheduleItem(){
        setScheduleItens([
            ...scheduleItens,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ]);
    }

    //setScheduleItemValue(0,'week_day','2)
    function setScheduleItemValue(position: number,field:string,value:string){
        const updatedScheduleItem = scheduleItens.map((scheduleItem,index) =>{
            if (index === position) {
                return{ ...scheduleItem,[field]: value};//sobreescreve se o valor no field for igual
            }
            return scheduleItem;
        })
        setScheduleItens(updatedScheduleItem);
    }

    function handleCreateClass(e:FormEvent){
        e.preventDefault();
        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(() =>{
            alert('Professor/Aula Cadastrada com sucesso!');
            history.push('/');
        }).catch(() =>{
            alert('Erro no Cadastro');
        })
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrivel que voce quer dar aulas."
                description = "O primeiro passo é preencher esse formulario de inscrição"></PageHeader>

                <main>
                    <form onSubmit={handleCreateClass}>
                        <fieldset>
                            <legend>Seus dados</legend>
                            <Input name="name" label="Nome Completo" value={name} onChange={ (e) => { setName(e.target.value)}}></Input>
                            <Input name="avatar" label="Avatar" value={avatar} onChange={ (e) => { setAvatar(e.target.value)}}></Input>
                            <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={ (e) => { setWhatsapp(e.target.value)}}></Input>
                            <Textarea name="bio" label="Biografia" value={bio} onChange={ (e) => { setBio(e.target.value)}}></Textarea>
                        </fieldset>

                        <fieldset>
                            <legend>Sobre a aula</legend>
                            <Select
                                name="subject"
                                label="Matéria"
                                value={subject}
                                onChange={ (e) => { setSubject(e.target.value)}}
                                options={[
                                    {value: 'Artes', label: 'Artes'},
                                    {value: 'Biologia', label: 'Biologia'},
                                    {value: 'Ciências', label: 'Ciências'},
                                    {value: 'Educação Fisica', label: 'Educação Fisica'},
                                    {value: 'Física', label: 'Física'},
                                    {value: 'História', label: 'História'},
                                    {value: 'Português', label: 'Português'},
                                    {value: 'Matemática', label: 'Matemática'},
                                    {value: 'Química', label: 'Química'},
                                    {value: 'Geografia', label: 'Geografia'},

                                ]}></Select>
                            <Input type="number"name="cost" label="Custo da sua hora por aula" value={cost} onChange={ (e) => { setCost(e.target.value)}}></Input>
                            
                        </fieldset>

                        <fieldset>
                            <legend>
                                Horários Disponiveis
                                <button type="button" onClick={addNewScheduleItem}> + Novo Horário</button>    
                            </legend>
                        
                            {scheduleItens.map((scheduleItem,index)=>{
                                return(
                                    <div key={scheduleItem.week_day} className="schedule-item">
                                        <Select
                                            name="subject"
                                            label="Matéria"
                                            value = {scheduleItem.week_day}
                                            onChange = {e => setScheduleItemValue(index,'week_day',e.target.value)}
                                            options={[
                                                {value: '0', label: 'Domingo'},
                                                {value: '1', label: 'Segunda-feira'},
                                                {value: '2', label: 'Terça-feira'},
                                                {value: '3', label: 'Quarta-feira'},
                                                {value: '4 Fisica', label: 'Quinta-feira'},
                                                {value: '5', label: 'Sexta-feira'},
                                                {value: '6', label: 'Sabado'}

                                        ]}></Select>
                                        <Input name="from" label="Das" type="time" value={scheduleItem.from}onChange = {e => setScheduleItemValue(index,'from',e.target.value)}></Input>
                                        <Input name="to" label="Até" type="time" value={scheduleItem.to} onChange = {e => setScheduleItemValue(index,'to',e.target.value)}></Input>
                                    </div>
                                );
                            })}
                        </fieldset>

                        <footer>
                            <p>
                                <img src={warningIcon} alt="Aviso importante"/>
                                Importante <br />
                                Preencha todos os dados
                            </p>
                            <button type="submit">Salvar Cadastro</button>
                        </footer>
                    </form>
                </main>
        </div>
    )
}
export default TeacherForm;