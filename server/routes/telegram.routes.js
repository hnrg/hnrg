const { Router } = require('express');
const TelegramController = require('../controllers/telegram.controller');

const router = Router();
const telegramToken = process.env.TELEGRAM_TOKEN || '';

router.route(`/telegram/bot${telegramToken}`).post(TelegramController.request);

module.exports = router;
