module.exports = function({ api, __GLOBAL, client }) {
	return async function({ event }) {
		const { handleReply } = client;
		if (handleReply != 0) {
			if (!event.messageReply) return;
			const indexOfHandle = handleReply.findIndex(e => e.messageID == event.messageReply.messageID && e.author == event.senderID);
			if (indexOfHandle < 0) return;
			const indexOfMessage = handleReply[indexOfHandle];
			const handleNeedExec = client.commands.get(indexOfMessage.name);
			if (!handleNeedExec) return api.sendMessage("Thiếu dữ kiện để thực thi phản hồi lại câu trả lời của bạn!", event.threadID, event.messageID);
			try {
				handleNeedExec.handleReply({ api, __GLOBAL, client, event, handleReply: indexOfMessage });
			}
			catch (e) {
				return api.sendMessage("Đã có lỗi xảy ra khi đang thực thi trả lời câu hỏi của bạn!", event.threadID, event.messageID);
			}
		}
	}
}