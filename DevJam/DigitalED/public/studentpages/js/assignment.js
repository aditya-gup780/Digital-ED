// localStorage.clear();
var defaultTopics = [
    {
        id: 1,
        title: "Maths",
        author: "Teacher",
        date: Date.now(),
        content: "Topic content",
        comments: [
            {
                author: "Student",
                date: Date.now(),
                content: "Hello"
            },
            {
                author: "Student",
                date: Date.now(),
                content: "what about the ces subject?"
            }
        ]
    },
    {
        id: 2,
        title: "Pending work",
        author: "Student",
        date: Date.now(),
        content: "Topic content 2",
        comments: [
            {
                author: "Student",
                date: Date.now(),
                content: "Hey there"
            },
            {
                author: "Student",
                date: Date.now(),
                content: "have you done your physics practical."
            }
        ]
    }
]

var topics = defaultTopics
if (localStorage && localStorage.getItem('topics')) {
    topics = JSON.parse(localStorage.getItem('topics'));
} else {
    topics = defaultTopics;
    localStorage.setItem('topics', JSON.stringify(defaultTopics));
}