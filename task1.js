const weather = {
    'Monday': -1,
    'Tuesday': 2,
    'Wednesday': 5,
    'Thursday': 13,
    'Friday': 0,
    'Saturday': 1,
    'Sunday': 8,
    [Symbol.toPrimitive](hint) {
        if (hint === "number") {
            const temperatures = Object.values(this);
            const sum = temperatures.reduce((acc, temp) => acc + temp, 0);
            console.log("Минимальное",Math.min(...temperatures));
            console.log("Максимальное",Math.max(...temperatures));
            return sum / temperatures.length;
        } else if (hint === 'string' || hint === 'default') {// У меня вопрос, если я не сравнивал с default, то выдавало undefined. Нашёл чисто в инете, почему и откуда берётся default не понимаю, обьясни пожалуйста
            const arr = [];
            for(keys in weather) {
                arr.push(keys.slice(0,2));
            }
            return `(${arr.join(' - ')})`;
        }
    }
};

console.log(`Средняя температура:`,+weather);
console.log(`Дни недели:`,weather + '');



