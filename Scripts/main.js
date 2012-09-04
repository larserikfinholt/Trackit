/// <reference path="knockout-2.1.0.debug.js" />
var Task = function (title) {
    this.title = title;
    this.doneBy = ko.observable("");
    this.done = ko.computed(function () {
        return this.doneBy().length > 0?"btn-primary":"btn-warning";
    },this);
};



var ViewModel = function (days, tasks, persons) {

    this.days = ko.observableArray(days);
    this.tasks = ko.observableArray(tasks);
    this.persons = ko.observableArray(persons);

};

ko.applyBindings(new ViewModel( 
    ["Mon","Tue","Wed","Thu","Fri","Sat"], 
    [new Task("Morgentur"),new Task("Etterskoletur"), new Task("Ettermiddagstur"), new Task("Kveldstur")],
    ["Lars Erik", "Camilla", "Markus", "Sigrid", "Ingvild"]));