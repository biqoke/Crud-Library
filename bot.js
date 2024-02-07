const { VK } = require('vk-io')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3001

const vk = new VK({
	token:
		'vk1.a.rjO85XA4tvfmj4-9T_02CyIempW8PYIlRrq6jhVZ9zmFpvXlc-PL5Iot7t_73C5IqOtqF1zDPDgwEJfJz-PC-H6IYLGaEX50ciiHA0YCf1Wi9AI87jpqX1ZGV-vwZubVDMD46Qpg74AbbY7Tt3Azedrn6cyWgedYOf-tZPJU5n5W9C_ZzefZxipwiYLCKKz6hbpR2hIbJYcd0E_4RJXIEQ',
})
//               Zhalgas        Sultan      Belksultan
const targetId = 359158965 && 249379986 && 330882826

app.use(bodyParser.json())

app.listen(PORT, () => {
	console.log(`VK Бот работает на http://localhost:${PORT}`)
})

app.post('/info', async (req, res) => {
	try {
		const info = req.body

		await vk.api.messages.send({
			user_id: targetId,
			message: `Новое сообщение: ${info.title}`,
			random_id: Math.floor(Math.random() * 1000000),
		})

		console.log('Сообщение успешно отправлено в VK!')
		res.status(200).json({ success: true })
	} catch (error) {
		console.error('Ошибка при отправке сообщения в VK:', error)
		res.status(500).json({ error: 'Внутренняя ошибка сервера.' })
	}
})

console.log('VK Бот работает')

vk.updates.start().catch(error => {
	console.error('Ошибка запуска обновлений VK:', error)
})
