const { Bot } = require('grammy');

const bot = new Bot('8125630577:AAEo0-HA63B4yruK1cKhslWgXpgItzGpdEQ'); // Замените на новый токен!

bot.command(['start', 'Start', 'START'], (ctx) => {
    ctx.reply('Привет! Я бот для игры "Угадай число".\nНапиши /play чтобы начать!');
});

let secretNumber = 0;
let gameIsActive = false;

bot.command(['play', 'Play', 'PLAY'], (ctx) => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    gameIsActive = true;
    ctx.reply('Я загадал число от 1 до 100! Попробуй угадать!');
});

bot.on('message:text', async (ctx) => {
    if (!gameIsActive || ctx.message.from.is_bot) return;
    
    const guess = Number(ctx.message.text);
    
    if (!Number.isInteger(guess)) {
        await ctx.reply('Пожалуйста, введите целое число!');
        return;
    }

    if (guess < secretNumber) {
        await ctx.reply('Больше!');
    } else if (guess > secretNumber) {
        await ctx.reply('Меньше!');
    } else {
        await ctx.reply('Вы угадали! Молодец!');
        gameIsActive = false;
    }
});

// Запуск с проверкой
bot.start().then(() => {
    console.log('Бот успешно запущен!');
}).catch(err => {
    console.error('Ошибка запуска:', err);
});