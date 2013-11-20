var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    // yay!
    var kittySchema = mongoose.Schema({
        name: String
    });
    kittySchema.methods.speak = function () {
        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    };

    var Kitten = mongoose.model('Kitten', kittySchema);

    var silence = new Kitten();

    console.log(silence.name); // 'Silence'

    var fluffy = new Kitten({ name: 'new kitten123' });
//    fluffy.speak(); // "Meow name is fluffy"
    silence.save(function (err, fluffy) {
        console.log(fluffy);
        if (!err) // TODO handle the error
            fluffy.speak();
    });
    Kitten.find(function (err, kittens) {
        console.log('test test');
        if (!err) // TODO handle err
            console.log(kittens)
    })


});