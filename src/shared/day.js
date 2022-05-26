const dayjs = require('dayjs');
let now = dayjs();
let updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(updateLocale)
dayjs.updateLocale('pt-br', {
    weekdays: [
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
    ]
})

let date = now.format("dddd, DD/MM");

export default date;