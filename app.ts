import { Gestor, getPeople } from "./Gestor";
const student = getPeople();

const gestor = new Gestor(student);

// gestor.setAlumno();
// gestor.setProfesor();

// gestor.getAllAlumnos();
// gestor.getPromedioAlumnos();
// gestor.getMateriasAlumno('Cepeda');
// gestor.getPromedioAlumno('Yacob');
// gestor.getAlumno('Bellusci')
// console.table(student)
// gestor.getProfesor('Fernandez');
// gestor.getProfesores();
// gestor.getAlumnosPorProfesor('Alfonsin');
gestor.getProfesoresPorAlumno('Yacob');








