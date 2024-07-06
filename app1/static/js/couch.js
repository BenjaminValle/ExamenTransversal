const coaches = [
    {
        name: "Alex Rodríguez",
        specialty: "Artes Marciales Mixtas",
        experience: "10 años de experiencia",
        certifications: "Certificación en Defensa Personal",
        description: "Entrenador profesional con más de 10 años de experiencia en artes marciales mixtas. Especialista en técnicas de defensa personal, ha entrenado a cientos de estudiantes en la importancia de la autodefensa y la disciplina. Su enfoque único combina habilidades físicas con estrategias mentales para preparar a sus alumnos para cualquier situación. Alex ha sido mentor de varios campeones locales y es conocido por su dedicación y pasión por el deporte.",
        imageUrl: "/couch1.jpg"
    },
    {
        name: "María González",
        specialty: "Boxeo",
        experience: "8 años de experiencia",
        certifications: "Campeona Nacional de Boxeo",
        description: "Campeona nacional de boxeo, María González posee habilidades excepcionales en el entrenamiento de boxeadores tanto amateurs como profesionales. Con más de 8 años de experiencia, María ha desarrollado programas de entrenamiento que mejoran la técnica, velocidad y resistencia de sus alumnos. Su enfoque profesional y motivador ha ayudado a muchos boxeadores a alcanzar sus metas y competir a nivel nacional e internacional. María es conocida por su atención al detalle y su capacidad para inspirar a sus alumnos.",
        imageUrl: "/couch4.jpg"
    },
    {
        name: "Laura Sánchez",
        specialty: "Yoga y Mindfulness",
        experience: "6 años de experiencia",
        certifications: "Instructora Certificada de Yoga y Mindfulness",
        description: "Especialista en yoga y mindfulness, Laura Sánchez combina técnicas de respiración y meditación para mejorar el bienestar físico y mental de sus alumnos. Con 6 años de experiencia, Laura ha ayudado a muchas personas a encontrar equilibrio y paz interior a través de sus clases. Su enfoque integral promueve la salud holística y el crecimiento personal. Laura es reconocida por su habilidad para crear un ambiente tranquilo y acogedor, donde los alumnos pueden aprender y crecer.",
        imageUrl: "/couch5.jpg"
    },
    {
        name: "Juan Martínez",
        specialty: "Entrenamiento Funcional y Acondicionamiento Físico",
        experience: "7 años de experiencia",
        certifications: "Certificación en Entrenamiento Funcional",
        description: "Juan Martínez es un experto en entrenamiento funcional y acondicionamiento físico con 7 años de experiencia. Ha ayudado a cientos de personas a alcanzar sus objetivos de fitness a través de programas personalizados y rigurosos. Su enfoque se basa en mejorar la funcionalidad y el rendimiento físico de sus alumnos, adaptando cada sesión a las necesidades individuales. Juan es conocido por su compromiso y dedicación, lo que lo convierte en un mentor invaluable para aquellos que buscan transformar su vida a través del fitness.",
        imageUrl: "/couch2.jpg"
    },
    {
        name: "Diego Pérez",
        specialty: "Halterofilia",
        experience: "9 años de experiencia",
        certifications: "Certificación en Halterofilia, Certificación en Desarrollo de Fuerza",
        description: "Diego Pérez es un entrenador de halterofilia con un enfoque en el desarrollo de la fuerza y la técnica. Con 9 años de experiencia, ha entrenado a atletas de nivel internacional, ayudándoles a mejorar su rendimiento y alcanzar nuevos récords. Su conocimiento profundo de la halterofilia y su capacidad para motivar a sus alumnos lo han convertido en uno de los entrenadores más respetados en su campo. Diego es conocido por su enfoque meticuloso y su capacidad para sacar lo mejor de cada atleta.",
        imageUrl: "/couch3.jpg"
    },
    {
        name: "Ana López",
        specialty: "Nutrición Deportiva y Entrenamiento Personalizado",
        experience: "5 años de experiencia",
        certifications: "Nutricionista Certificada, Entrenadora Personal Certificada",
        description: "Ana López es una experta en nutrición deportiva y entrenamiento personalizado. Con 5 años de experiencia, ayuda a sus clientes a alcanzar sus metas de salud y fitness de manera sostenible. Ana crea planes de nutrición y entrenamiento adaptados a las necesidades individuales, asegurando resultados óptimos. Su enfoque holístico y su dedicación al bienestar de sus clientes la han hecho muy popular entre aquellos que buscan mejorar su salud de manera integral. Ana es conocida por su empatía y su capacidad para inspirar cambios positivos en la vida de sus clientes.",
        imageUrl: "/couch6.jpg"
    }
];

document.querySelectorAll('.button_couch').forEach((button, index) => {
    button.addEventListener('click', () => {
        loadCoachData(index);
    });
});

function loadCoachData(index) {
    const coach = coaches[index];
    const imgPath = document.getElementById("staticImgPath").value;
    document.getElementById('coachName').textContent = coach.name;
    document.getElementById('coachSpecialty').textContent = coach.specialty;
    document.getElementById('coachExperience').textContent = coach.experience;
    document.getElementById('coachCertifications').textContent = coach.certifications;
    document.getElementById('coachDescription').textContent = coach.description;
    document.getElementById('coachImage').src = imgPath + coach.imageUrl;
    $('#modalCoach').modal('show');
}

function cerrarModalCoach() {
    $('#modalCoach').modal('hide');
}
