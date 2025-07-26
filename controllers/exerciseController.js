const db = require("../models")

module.exports = {
    //Exercise Controllers
    addExercise: function(req, res) {
        db.Exercise
        .create({exercise: req.body.exercise, duration: req.body.duration})
        .then(exerciseModel => {
            db.Day.findById({_id: req.body.currentDayId})
            .then(dayModel => {
                dayModel.exercises.push(exerciseModel._id)
                dayModel.totalActivity = req.body.totalActivity
                dayModel.save()
                return res.send("Exercise Added") // This is the correct place to send success
            })
            .catch(err => res.status(422).json(err)) // This handles errors from db.Day.findById
        })
        .catch(err => res.status(422).json(err)); // This handles errors from db.Exercise.create
    },

}