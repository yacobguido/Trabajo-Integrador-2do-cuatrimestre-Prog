import * as fs from "fs";
import { Persona } from "./Persona";
import { Alumno } from "./Alumno";
import { Materia } from "./Materia";
import { Profesor } from "./Profesor";
import { Contrato } from "./Contrato";

const readLineSync = require("readline-sync");
const alumnosJSON = "alumnos.json";
const profesoresJSON = "profesores.json"
const students = JSON.parse(fs.readFileSync(alumnosJSON, 'utf-8'));
const teachers = JSON.parse(fs.readFileSync(profesoresJSON, 'utf-8'));

export class Gestor{
    private persona: Persona[] = [];
    public constructor(persona: Persona[]){
        this.persona = persona;
    }
    setAlumno(){
        const name = readLineSync.question("Nombre del alumno: ");
        const lastName = readLineSync.question("Apellido del Alumno: ");
        const dni = readLineSync.question("DNI: ");
        const email = readLineSync.question("Email: ")
        const matricula = readLineSync.question("matricula: ");
        const fechaMatriculacion = readLineSync.question("Fecha de Matriculacion(yyyy/mm/dd): ").toLocaleString();
        const estudiante = new Alumno(name, lastName, dni, email, matricula, fechaMatriculacion,);

        for (let i = 0; i < 3; i++) {
            const materiaNombre = readLineSync.question(`Ingrese el nombre de la materia ${i + 1}: `);
            const notaMateria = readLineSync.question(`Nota de la materia ${i + 1}: `);
            const materia = new Materia(materiaNombre, notaMateria);
            estudiante.setMateria(materia);
        }
        students.push(estudiante);
        fs.writeFileSync(alumnosJSON, JSON.stringify(students, null, 2), 'utf-8');
    }
    setProfesor(){
        const name = readLineSync.question("Nombre del profesor: ");
        const lastName = readLineSync.question("Apellido del Profesor: ");
        const dni = readLineSync.question("DNI: ");
        const email = readLineSync.question("Email: ")
        const materia = readLineSync.question("Materia: ")
        const profesor = new Profesor(name, lastName, dni, email, materia,);
        for(let i=0; i< 1; i++){
            const startingDate = readLineSync.question("Fecha de inicio(yyyy/mm/dd): ");
            const expiringDate = readLineSync.question("Fecha de expiración(yyyy/mm/dd: ");
            const contrato = new Contrato(startingDate, expiringDate);
            profesor.setContrato(contrato);
        }
        teachers.push(profesor);
        fs.writeFileSync(profesoresJSON, JSON.stringify(teachers, null, 2), 'utf-8');
    }
    getMateriasAlumno(lastName: string): any[] {
        const alumnoEncontrado = students.find((alumno: any) => alumno.lastName === lastName);
        if (alumnoEncontrado) {           
            return alumnoEncontrado.materia;
        } else {
            console.log("No se encontró ningún alumno con ese apellido.");
            return [];
        }
    }
    getPromedioAlumno(lastName: string): number {
        const alumnoEncontrado = students.find((alumno: any) => alumno.lastName === lastName);
        if (alumnoEncontrado) {
            let sumaNota = 0;
            for(let i = 0; i < alumnoEncontrado.materia.length; i++){
                sumaNota += parseFloat(alumnoEncontrado.materia[i].nota);
            }
            const promedio = sumaNota / alumnoEncontrado.materia.length
            return promedio;
        }else{
            console.log("No se encontró ningún alumno con ese apellido.");
            return 0;
        }
    }
    getAlumno(lastName:string): any[]{
        const alumnoEncontrado = students.find((alumno: any) => alumno.lastName === lastName);
        if(alumnoEncontrado){
            const name = alumnoEncontrado.name;
            const lastName = alumnoEncontrado.lastName;
            const dni = alumnoEncontrado.dni;
            const email = alumnoEncontrado.email;
            const matricula = alumnoEncontrado.matricula;
            const fechaMatriculacion = alumnoEncontrado.fechaMatriculacion.toLocaleString();
            console.log(`Alumno: ${name} ${lastName}\ndni: ${dni}\nemail: ${email}\nmatricula: ${matricula}\nfecha de matriculación: ${fechaMatriculacion}`);
            const materias = this.getMateriasAlumno(alumnoEncontrado.lastName);
            for(let i = 0; i < materias.length; i++){
                console.log(`Materia ${i + 1}: ${materias[i].materia} Nota: ${materias[i].nota}`)
                }
            const promedio = this.getPromedioAlumno(alumnoEncontrado.lastName)
            console.log(`promedio ${promedio}` );
            return [name, lastName, materias, promedio];
            
        }else{
            console.log("No se encontró ningún alumno con ese apellido.");
            return [];
        }
    }
    getAllAlumnos(){
        for (let i = 0; i < students.length; i++) {
            const alumno = students[i];
            const materias = this.getMateriasAlumno(alumno.lastName);
            console.log(`Alumno: ${alumno.name} ${alumno.lastName}\n dni: ${alumno.dni}\n email: ${alumno.email}\n matricula: ${alumno.matricula}\n fechaMatriculacion: ${alumno.fechaMatriculacion}`)
            for(let i = 0; i < materias.length; i++){
                console.log(`Materia ${i + 1}: ${materias[i].materia}\n Nota: ${materias[i].nota}\n `)
                }
        }
    }

    getPromedioAlumnos() {
        for (let i = 0; i < students.length; i++) {
            const alumno = students[i];
            const materias = this.getMateriasAlumno(alumno.lastName);
            console.log(`Alumno: ${alumno.name} ${alumno.lastName}`);
            for(let i = 0; i < materias.length; i++){
                console.log(`Materia ${i + 1}: ${materias[i].materia} Nota: ${materias[i].nota}`)
                }
            let sumaNotas = 0;
            for (let j = 0; j < materias.length; j++) {
                sumaNotas += parseFloat(materias[j].nota);
            }
            const promedio = sumaNotas / materias.length;
            console.log(`Promedio: ${promedio}\n`);
        }
    }


    public getProfesoresPorAlumno(lastName: string): void {
        const alumnoEncontrado = students.find((alumno: any) => alumno.lastName === lastName);
        if (!alumnoEncontrado) {
            console.log("No se encontró ningún alumno con ese Apellido");
            return;
        }
        const profesoresDelAlumno: string[] = [];
        alumnoEncontrado.materia.forEach((materia: any ) => {
            const profesorDeLaMateria = teachers.find(
            (profesor: any) => profesor.materia === materia.materia
            );
            if (profesorDeLaMateria) {
                const nombreCompletoProfesor = `${profesorDeLaMateria.name} ${profesorDeLaMateria.lastName}`;
            if (!profesoresDelAlumno.includes(nombreCompletoProfesor)) {
                profesoresDelAlumno.push(nombreCompletoProfesor);
            }
            }
        });
        if (profesoresDelAlumno.length === 0) {
            console.log("El alumno no tiene profesores asignados");
            return;
        }       
        const Name = alumnoEncontrado.name; 
        console.log(
            `Los profesores del alumno/a ${Name} ${lastName} son: ${profesoresDelAlumno.join(
            ", "
            )}`
        );
    }
    getContratoProfesor(lastName :string):any{
        const profesorEncontrado = teachers.find((profesor: any) => profesor.lastName === lastName);
        if (profesorEncontrado){
            
            return profesorEncontrado.contrato;

        }
        else {
            console.log("No se encontró ningún profesor con ese apellido.");
            return [];
        }
    }

    getProfesor(lastName: string): any{
        const profesorEncontrado = teachers.find((Profesor: any) => Profesor.lastName === lastName);
        if(profesorEncontrado){
            const contrato = this.getContratoProfesor(profesorEncontrado.lastName);
            console.log(`profesor: ${profesorEncontrado.name} ${profesorEncontrado.lastName}\n dni: ${profesorEncontrado.dni}\n email: ${profesorEncontrado.email}\n materia: ${profesorEncontrado.materia}`)
            for(let i = 0; i < contrato.length; i++){
                console.log(`contrato:\n "startingDate": ${contrato[i].startingDate}\n "expiringDate": ${contrato[i].expiringDate} \n`) 
            }
        
        }else{
           console.log("No se encontró ningún profesor con ese apellido.");
           return [];
        }
    
        }
    
    getProfesores() {
        for (let i = 0; i < teachers.length; i++) {
            const Profesor = teachers[i];
            const Contrato = this.getContratoProfesor(Profesor.lastName);
            console.log(`profesor: ${Profesor.name} ${Profesor.lastName}\n dni: ${Profesor.dni}\n email: ${Profesor.email}\n materia: ${Profesor.materia}`)
            for(let i = 0; i < Contrato.length; i++){
                console.log(`contrato:\n "startingDate": ${Contrato[i].startingDate}\n "expiringDate": ${Contrato[i].expiringDate} \n`)
            } 
        }
    } 
    
    public getAlumnosPorProfesor(lastName: string): any {
        const alumnosPorProfesor: any = [];
        const profesorEncontrado = teachers.find((profesor: any) => profesor.lastName === lastName);
        if (profesorEncontrado) {
            for (let i = 0; i < students.length; i++) {
                const alumno = students[i];
                const materiaDelAlumno = alumno.materia.find((materia: any) => materia.materia === profesorEncontrado.materia);
                if (materiaDelAlumno) {
                    alumnosPorProfesor.push( `${ alumno.name} ${alumno.lastName}`);
                }
            }
            const Name = profesorEncontrado.name
            console.log(`el profesor/a ${Name} ${lastName} tiene como alumnos a: ${alumnosPorProfesor.join(",")}`);
            return alumnosPorProfesor;
        } else {
            console.log("No se encontró ningún profesor con ese apellido.");
            
            return [];
        }
    }

}
export function getPeople() {
    try {
        const data = JSON.parse(fs.readFileSync(alumnosJSON, 'utf8'));
        const school = data.map((data: any) => new Alumno(data.name, data.lastName, data.dni, data.email, data.matricula, data.fechaMatriculacion));
        return school;
    } catch (error) {
        console.log(error);
        return [];
    }
}

