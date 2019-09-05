const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    temperature: { type: Number, required: true },
    weather: { type: String, required: true },
    humidity: { type: Number, required: true },
    windspeed: { type: Number, required: true },
    user: { type: Schema.Types.ObjectID, ref: 'User' },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('City', schema);