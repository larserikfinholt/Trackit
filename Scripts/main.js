/// <reference path="knockout-2.1.0.debug.js" />
var Task = function (title, date, id) {
    this.date = date;
    this.title = ko.observable(title);
    this.id = id;
    this.doneBy = ko.observable("");
    this.setDone = function (name) {
        //this.title(name);
        this.doneBy(name);
    }
    this.done = ko.computed(function () {
        return this.doneBy().length > 0?"btn-primary":"btn-warning";
    },this);
}.bind(this);

var Day = function (date, tasks) {
    this.date = date;
    this.tasks = ko.observableArray(tasks);
}.bind(this);



var ViewModel = function (days, persons) {

    this.days = ko.observableArray(days);
    this.persons = ko.observableArray(persons);

    this.showDialog = function (task, event) {
        if (task.doneBy().length>0) {
            alert("Already done by " + task.doneBy());
            return;
        }
        $('#myModal').modal('show');
        $('.personbutton').data('task', task);
        $('.personbutton').data('day', $(event.target).data('day'));
    };

    this.setDoneBy = function (person, event) {
 //       alert(person + $(event.target).data('task').title + $(event.target).data('day'));
        $(event.target).data('task').setDone(person);
        $('#myModal').modal('hide');
    };

};

function start() {
    var days = new Array();
    var tasksTitles = ["Morgentur", "Etterskoletur", "Kveldstur"];
    var id = 0;
    for (var i = 0; i < 3; i++) {
        var tasks = new Array();
        var date = new Date(2012, 09, 1 + i);
        for (var j = 0; j < tasksTitles.length; j++) {
            tasks.push(new Task(tasksTitles[j], date, id++));
        }
        days.push(new Day(date, tasks));
    }
    var vm = new ViewModel(days,
        ["Lars Erik", "Camilla", "Markus", "Sigrid", "Ingvild"]
        );
    $('#tmp').click(function () {
        var jsonData = ko.toJSON(vm);
        alert(jsonData);
    });
    ko.applyBindings(vm);
};

start();