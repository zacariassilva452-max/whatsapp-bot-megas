const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const ADMIN_NUMBER = process.env.ADMIN_NUMBER || '258XXXXXXXXX';

const PACOTES = `━━━━━━━━━━━━━━━━
📅 *PACOTES DIÁRIOS:*
━━━━━━━━━━━━━━━━
8MT ▸▸ 300MB | 27MT ▸▸ 1024MB
12MT ▸▸ 445MB | 52MT ▸▸ 2048MB
16MT ▸▸ 600MB | 78MT ▸▸ 3072MB
24MT ▸▸ 890MB | 130MT ▸▸ 5120MB
━━━━━━━━━━━━━━━━
📅 *PACOTES SEMANAIS:*
━━━━━━━━━━━━━━━━
130MT ▸▸ 4420MB + 700MB
260MT ▸▸ 9540MB + 700MB
390MT ▸▸ 14660MB + 700MB
520MT ▸▸ 19780MB + 700MB
━━━━━━━━━━━━━━━━
🗓️ *PACOTES MENSAIS:*
━━━━━━━━━━━━━━━━
400MT ▸▸ 12GB
480MT ▸▸ 17GB
670MT ▸▸ 22GB
930MT ▸▸ 35GB
━━━━━━━━━━━━━━━━`;

const PAGAMENTO = `💳 *MÉTODOS DE PAGAMENTO:*
━━━━━━━━━━━━━━━━
📱 *M-Pesa:* ${process.env.MPESA_NUMBER || '258XXXXXXXXX'}
📱 *e-Mola:* ${process.env.EMOLA_NUMBER || '258XXXXXXXXX'}
━━━━━━━━━━━━━━━━
⚠️ Após o pagamento, envia o *comprovativo* com o teu *número Vodacom* para receber os megas.`;

const MENU = `👋 *Bem-vindo à nossa loja de megas!* 🌐

Escolhe uma opção:
1️⃣ Ver pacotes disponíveis
2️⃣ Fazer pedido
3️⃣ Como pagar
4️⃣ Falar com o suporte

_Responde com o número da opção_ 👆`;

const userState = {};

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', (qr) => {
    console.log('📱 Lê o QR Code com o teu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => console.log('✅ Bot iniciado!'));

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    if (chat.isGroup) return;
    const contact = await msg.getContact();
    const from = msg.from;
    const body = msg.body.trim().toLowerCase();
    const name = contact.pushname || 'Cliente';
    if (!userState[from]) userState[from] = { step: 'menu' };
    const state = userState[from];

    if (['oi','olá','ola','bom dia','boa tarde','boa noite','hi','hello','menu'].includes(body)) {
        await client.sendMessage(from, `Olá ${name}! 👋\n\n${MENU}`);
        state.step = 'menu'; return;
    }
    if (body === '1') { await client.sendMessage(from, PACOTES); return; }
    if (body === '2') {
        await client.sendMessage(from, `📦 Que pacote queres?\n\n${PACOTES}`);
        state.step = 'pedido'; return;
    }
    if (body === '3') { await client.sendMessage(from, PAGAMENTO); return; }
    if (body === '4') {
        await client.sendMessage(from, `👨‍💼 A ligar ao suporte... ⏳`);
        await client.sendMessage(`${ADMIN_NUMBER}@c.us`, `🔔 *SUPORTE*\nCliente: ${name}\nNúmero: ${from.replace('@c.us','')}`);
        return;
    }
    if (state.st=== 'pedido') {
        state.pedido = msg.body.trim(); state.step = 'numero';
        await client.sendMessage(from, `✅ Pedido: ${state.pedido}\n\n📱 Qual é o teu número Vodacom?`);
        return;
    }
    if (state.step === 'numero') {

        // Servidor HTTP para o Railway
const http = require('http');
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot activo!');
}).listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
