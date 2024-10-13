let exercises = [];
let currentExerciseIndex = 0;
let workoutTimer;
let breakTimer;

document.getElementById('addExercise').addEventListener('click', addExercise);
document.getElementById('startExercises').addEventListener('click', startExercises);

function addExercise() {
    const name = document.getElementById('exerciseName').value;
    const duration = parseInt(document.getElementById('exerciseDuration').value);

    if (name && duration > 0) {
        exercises.push({ name, duration });
        displayExercises();
        document.getElementById('exerciseName').value = '';
        document.getElementById('exerciseDuration').value = '';
    }
}

function displayExercises() {
    const exerciseList = document.getElementById('exerciseList');
    exerciseList.innerHTML = '';

    exercises.forEach((exercise, index) => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.innerText = `${exercise.name} - ${exercise.duration} seconds`;
        
        const skipButton = document.createElement('button');
        skipButton.innerText = 'Skip';
        skipButton.addEventListener('click', () => skipExercise(index));

        exerciseDiv.appendChild(skipButton);
        exerciseList.appendChild(exerciseDiv);
    });
}

function startExercises() {
    if (exercises.length === 0) {
        alert('Please add exercises before starting.');
        return;
    }
    currentExerciseIndex = 0;
    executeExercise();
}

function executeExercise() {
    if (currentExerciseIndex >= exercises.length) {
        clearTimeout(workoutTimer);
        clearTimeout(breakTimer);
        navigateToSummary();
        return;
    }

    const currentExercise = exercises[currentExerciseIndex];
    alert(`Starting ${currentExercise.name} for ${currentExercise.duration} seconds`);
    
    workoutTimer = setTimeout(() => {
        alert(`Finished ${currentExercise.name}`);
        currentExerciseIndex++;
        takeABreak();
    }, currentExercise.duration * 1000);
}

function takeABreak() {
    alert('Taking a 30-second break');
    breakTimer = setTimeout(() => {
        executeExercise();
    }, 30000);
}

function skipExercise(index) {
    clearTimeout(workoutTimer);
    clearTimeout(breakTimer);
    currentExerciseIndex = index + 1; // Move to the next exercise
    executeExercise();
}

function navigateToSummary() {
    const summaryPage = document.createElement('div');
    summaryPage.innerHTML = '<h2>Summary</h2>';
    exercises.forEach(exercise => {
        summaryPage.innerHTML += `<p>${exercise.name}: ${exercise.duration} seconds</p>`;
    });
    document.body.innerHTML = '';
    document.body.appendChild(summaryPage);
}
