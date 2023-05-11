import { Gestor, getPeople } from "./Gestor";
const student = getPeople();
const gestor = new Gestor(student);
class consola{
    setconsole(){
        const readLineSync = require("readline-sync");
        console.log('Opciones a seleccionar:\nnumero 1: NuevoAlumno\nnumero 2: NuevoProfesor\nnumero 3: Alumnos\nnumero 4: Profesores\nnumero 5: BuscarAlumno\nnumero 6: BuscarProfesor\nnumero 7: ProfesoresPorAlumno\nnumero 8: AlumnosPorProfesor\nnumero 9: PromedioAlumnos')
        const seleccionar :string= readLineSync.question("ingrese numero de la funcion a desarrollar: ");

        switch (seleccionar) {
            case "1":
                gestor.setAlumno();
                break;
            case "2":
                gestor.setProfesor();
                break;
            case "3":
                gestor.getAllAlumnos();
                break;
            case "4":
                gestor.getProfesores();
                break;
            case "5":
                gestor.getAlumno('Cepeda');
                break;
            case "6":
                gestor.getProfesor('Fernandez');
                break;
            case "7":
                gestor.getProfesoresPorAlumno('Bellusci');
                break;
            case "8":
                gestor.getAlumnosPorProfesor('Alfonsin');
                break;
            case "9":
                gestor.getPromedioAlumnos();
                break;
            default:
                console.log("el numero ingresado no corresponde a ninguna opcion")
                 break;
            
        }
    
    }
}

const Consola =new consola();
Consola.setconsole();
