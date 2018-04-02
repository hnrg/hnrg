const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = mongoose.model('Patient');

const telegramUserSchema = new Schema({
  chatId: Number,
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },
});

module.exports = mongoose.model('TelegramUser', telegramUserSchema);
