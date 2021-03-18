
import {Request,Response} from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem{
    week_day: number,
    from: string,
    to: string
}


export default class ClassesController{
    async index(request: Request,response:Response){
        const filters = request.query;
        
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;
        


        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            //where exist will apply the filters of the classes
            .whereExists(function(this: any){
                    this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=','users.id')
            .select(['classes.*','users.*']); //return the values of classes and users after the join

        return response.json(classes);
    }


    async create(request: Request,response:Response){
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        //cria uma transacão para finalizar apenas quando todas as tabelas receberem import
        const trx = await db.transaction();
    
        try {
            //Faz o insert dos users(professores)no banco e armazena os ids num array  
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
    
            //retorna o primeiro user
            const user_id = insertedUsersIds[0];
    
    
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })
            
            const class_id = insertedClassesIds[0];
    
            //Funcção que percorre os intens da variavel schedule
            //para converter a hora para minutos
            const classSchedule = schedule.map((scheduleItem:ScheduleItem) =>{
                return{
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });
    
            await trx('class_schedule').insert(classSchedule);
            
            //apenas insere no banco no commit
            await trx.commit();
    
            return response.status(201).send();
        } catch (error) {
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while crating new class'
            });
        }
    }
}