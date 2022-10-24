const QUESTIONS = [
    "What is your favorite magical or mythological animal?",
    "If you had to delete all but 3 apps from your smartphone, which ones would you keep?",
    "If you had to eat one meal everyday for the rest of your life what would it be?",
    "If you could magically become fluent in any language, what would it be?",
    "Name an imaginary college class you wish this school offered.",
    "You have to sing karaoke, what song do you pick?",
    "If you were famous, what would you be famous for?",
    "If you could change places with anyone in the world, who would it be and why?",
    "Would you rather always be slightly late or super early?",
    "If you could choose any name besides your name, what would you choose?",
    "Which band or artist – dead or alive would play at your funeral?",
    "If you could add anyone to Mount Rushmore who would it be; why?",
    "If you had to eat one meal everyday for the rest of your life what would it be?",
    "What is your favorite midnight snack?",
    "If you had to pick any character in a book, movie, or TV show who is most similar to you, who would you choose?",
    "What animal or insect do you wish humans could eradicate?",
    "Who would be the worst person to be stuck in an elevator with?",
    "Have you ever completed anything on your “bucket list”?",
    "What would the title of your autobiography be?",
    "If you could bring back any fashion trend what would it be?"

];

export function getQuestions(num_questions) {
    const random_questions = QUESTIONS.slice();
    let currentIndex = QUESTIONS.length-1,  randomIndex;

    // While there remain elements to shuffle
    while (currentIndex != 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element
        [random_questions[currentIndex], random_questions[randomIndex]] = [
        random_questions[randomIndex], random_questions[currentIndex]];
    }

    return random_questions.slice(0,num_questions);
}