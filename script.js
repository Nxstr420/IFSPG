// ==========================================
// IRON FORCE - POWERLIFTING
// JavaScript principal
// ==========================================


// ==========================================
// MENÚ MOBILE
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});


// Cerrar menú al hacer click en un enlace

document.querySelectorAll(".navbar nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});


// ==========================================
// CALCULADORA 1RM
// ==========================================

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", () => {

    const weight = parseFloat(
        document.getElementById("weight").value
    );

    const reps = parseInt(
        document.getElementById("reps").value
    );

    const result = document.getElementById("oneRM");


    if (!weight || !reps || weight <= 0 || reps <= 0) {

        result.textContent = "DATOS INVÁLIDOS";

        return;
    }


    if (reps === 1) {

        result.textContent = `${weight.toFixed(1)} KG`;

        return;
    }


    // Fórmula de Epley
    const oneRM = weight * (1 + reps / 30);

    result.textContent = `${oneRM.toFixed(1)} KG`;
});


// ==========================================
// CAMBIO DE DÍAS
// ==========================================

const workouts = {

    lunes: {
        day: "LUNES • FUERZA",
        title: "SENTADILLA PESADA",
        time: 75,
        exercises: [
            ["S", "Sentadilla trasera", "Principal • Fuerza", "5 × 5", "80%"],
            ["L", "Peso muerto rumano", "Accesorio", "4 × 8", "65%"],
            ["P", "Prensa de piernas", "Hipertrofia", "3 × 12", "RPE 8"],
            ["C", "Core / Abdominales", "Accesorio", "3 × 15", "RPE 7"]
        ]
    },

    martes: {
        day: "MARTES • UPPER",
        title: "PRESS BANCA",
        time: 70,
        exercises: [
            ["B", "Press banca", "Principal • Fuerza", "5 × 5", "80%"],
            ["R", "Remo con barra", "Espalda", "4 × 8", "RPE 8"],
            ["D", "Press militar", "Hombros", "3 × 8", "RPE 7"],
            ["T", "Extensión de tríceps", "Accesorio", "3 × 12", "RPE 8"]
        ]
    },

    miercoles: {
        day: "MIÉRCOLES • RECUPERACIÓN",
        title: "RECUPERACIÓN ACTIVA",
        time: 45,
        exercises: [
            ["C", "Cardio ligero", "Recuperación", "20 min", "RPE 5"],
            ["M", "Movilidad de cadera", "Movilidad", "3 × 10", "RPE 5"],
            ["S", "Movilidad de hombros", "Movilidad", "3 × 10", "RPE 5"],
            ["A", "Abdominales", "Core", "3 × 15", "RPE 6"]
        ]
    },

    jueves: {
        day: "JUEVES • FUERZA",
        title: "PESO MUERTO",
        time: 80,
        exercises: [
            ["D", "Peso muerto", "Principal • Fuerza", "5 × 3", "82%"],
            ["S", "Sentadilla frontal", "Piernas", "4 × 6", "70%"],
            ["G", "Hip thrust", "Glúteos", "3 × 10", "RPE 8"],
            ["C", "Core", "Accesorio", "3 × 15", "RPE 7"]
        ]
    },

    viernes: {
        day: "VIERNES • VOLUMEN",
        title: "PRESS BANCA VOLUMEN",
        time: 65,
        exercises: [
            ["B", "Press banca", "Volumen", "4 × 8", "70%"],
            ["I", "Press inclinado", "Pecho", "3 × 10", "RPE 8"],
            ["R", "Remo con mancuerna", "Espalda", "4 × 10", "RPE 8"],
            ["T", "Tríceps", "Accesorio", "3 × 15", "RPE 8"]
        ]
    }

};


const days = document.querySelectorAll(".day");

days.forEach(dayButton => {

    dayButton.addEventListener("click", () => {

        days.forEach(button => {
            button.classList.remove("active");
        });

        dayButton.classList.add("active");

        const selectedDay = dayButton.dataset.day;

        loadWorkout(selectedDay);
    });

});


function loadWorkout(day) {

    const workout = workouts[day];

    if (!workout) return;


    document.getElementById("workoutDay").textContent =
        workout.day;

    document.getElementById("workoutTitle").textContent =
        workout.title;

    document.getElementById("workoutTime").textContent =
        workout.time;


    const exerciseList =
        document.getElementById("exerciseList");

    exerciseList.innerHTML = "";


    workout.exercises.forEach(exercise => {

        const element = document.createElement("div");

        element.className = "exercise";

        element.innerHTML = `
            <div class="exercise-info">

                <span class="exercise-icon">
                    ${exercise[0]}
                </span>

                <div>
                    <h4>${exercise[1]}</h4>
                    <p>${exercise[2]}</p>
                </div>

            </div>

            <div class="exercise-data">

                <strong>${exercise[3]}</strong>

                <span>${exercise[4]}</span>

            </div>

            <button class="complete-btn">
                ✓
            </button>
        `;


        exerciseList.appendChild(element);
    });


    activateCompleteButtons();
}


// ==========================================
// COMPLETAR EJERCICIOS
// ==========================================

function activateCompleteButtons() {

    const buttons =
        document.querySelectorAll(".complete-btn");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("completed");

            updateProgress();
        });

    });
}


function updateProgress() {

    const completed =
        document.querySelectorAll(".complete-btn.completed").length;

    const total =
        document.querySelectorAll(".complete-btn").length;


    if (total === 0) return;


    const percentage =
        Math.round((completed / total) * 100);


    console.log(`Entrenamiento completado: ${percentage}%`);
}


// Activar botones inicialmente

activateCompleteButtons();


// ==========================================
// MODAL DE LEVANTAMIENTOS
// ==========================================

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalBody =
    document.getElementById("modalBody");


const liftData = {

    "Sentadilla": {
        title: "SENTADILLA",
        text:
            "Programa orientado a desarrollar fuerza y estabilidad en el tren inferior.",
        exercises: [
            "Calentamiento: 10 minutos",
            "Sentadilla: 5 × 5 al 80%",
            "Sentadilla pausada: 3 × 5",
            "Peso muerto rumano: 4 × 8",
            "Descanso: 3-5 minutos"
        ]
    },

    "Press banca": {
        title: "PRESS BANCA",
        text:
            "Entrenamiento centrado en aumentar la fuerza del pecho, hombros y tríceps.",
        exercises: [
            "Calentamiento específico",
            "Press banca: 5 × 5 al 80%",
            "Press banca pausado: 3 × 5",
            "Remo con barra: 4 × 8",
            "Descanso: 2-4 minutos"
        ]
    },

    "Peso muerto": {
        title: "PESO MUERTO",
        text:
            "Trabajo enfocado en desarrollar la cadena posterior y la fuerza máxima.",
        exercises: [
            "Calentamiento: 10 minutos",
            "Peso muerto: 5 × 3 al 82%",
            "Peso muerto rumano: 3 × 8",
            "Hip thrust: 3 × 10",
            "Descanso: 3-5 minutos"
        ]
    }

};


document.querySelectorAll(".lift-btn").forEach(button => {

    button.addEventListener("click", () => {

        const exercise =
            button.dataset.exercise;

        const data =
            liftData[exercise];


        modalTitle.textContent =
            data.title;

        modalBody.innerHTML = `
            <p>${data.text}</p>

            <ul>
                ${data.exercises
                    .map(item => `<li>${item}</li>`)
                    .join("")}
            </ul>
        `;

        modal.classList.add("show");
    });

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


// ==========================================
// BOTÓN INICIAR SESIÓN
// ==========================================

const startBtn =
    document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    alert(
        "¡Bienvenido a IRON FORCE! Tu entrenamiento comienza ahora."
    );

});


// ==========================================
// ANIMACIÓN AL HACER SCROLL
// ==========================================

const cards =
    document.querySelectorAll(
        ".lift-card, .progress-card, .exercise"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity .6s ease, transform .6s ease";

    observer.observe(card);

});


// ==========================================
// PWA
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        // Si posteriormente creas un service-worker.js,
        // puedes registrarlo aquí.

        console.log("IRON FORCE PWA preparada.");

    });

}
