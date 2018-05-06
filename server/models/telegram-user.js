const mongoose = require('mongoose');

const { Schema } = mongoose;

const Patient = require('./patient');

const telegramUserSchema = new Schema({
  chatId: Number,
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
});

module.exports = mongoose.model('TelegramUser', telegramUserSchema);
