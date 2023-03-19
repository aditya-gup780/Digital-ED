// localStorage.clear();
var defaultThreads = [
    {
        id: 1,
        title: "MATHS",
        author: "Teacher",
        // date: Date.now(),
        // content: "Topic content",
        comments: [
            // {
            //     author: "Student",
            //     date: Date.now(),
            //     content: "Hello"
            // },
            // {
            //     author: "Student",
            //     date: Date.now(),
            //     content: "what about the ces subject?"
            // }
        ]
    },
    {
        id: 2,
        title: "PHYSICS",
        author: "Teacher",
        // date: Date.now(),
        // content: "Topic content 2",
        comments: [
            // {
            //     author: "Student",
            //     date: Date.now(),
            //     content: "Hey there"
            // },
            // {
            //     author: "Student",
            //     date: Date.now(),
            //     content: "have you done your physics practical."
            // }
        ]
    }
]

var threads = defaultThreads
if (localStorage && localStorage.getItem('threads')) {
    threads = JSON.parse(localStorage.getItem('threads'));
} else {
    threads = defaultThreads;
    localStorage.setItem('threads', JSON.stringify(defaultThreads));
}