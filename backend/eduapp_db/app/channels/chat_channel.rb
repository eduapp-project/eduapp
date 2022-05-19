class ChatChannel < ApplicationCable::Channel
	require 'json'
	require 'edu_app_utils/encrypt_utils'

  def subscribed
		reject and return unless check_chat_user(params[:chat_room][1..-1], params[:connection_requester])
		@chat_name = "eduapp.channel.#{params[:chat_room]}"
		stream_from @chat_name
  end

	def receive(data)
		puts "CMD: #{data["command"]}"

		case data["command"]
		when "message"
			instance = ChatMessage.new(
				chat_base_id: params[:chat_room][1..-1],
				user_id: data["author"],
				message: data["message"],
				send_date: data["send_date"]
			)

			if instance.save
				newMsg = format_msg(instance)
				newMsg.merge!(JSON.parse("{\"command\": \"new_message\"}"))
				
				ActionCable.server.broadcast @chat_name, newMsg
			else 
				ActionCable.server.broadcast @chat_name, { "command" => "error", "message" => "Error saving message" }
			end
		else
			puts "DEFAULT"
		end
	end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

	protected

	def format_msg(queryMsg)
		mainMsg = JSON.parse(queryMsg.to_json)
		mainMsg.merge!(JSON.parse("{\"chat_base\": #{queryMsg.chat_base.to_json}}"))
		mainMsg.merge!(JSON.parse("{\"user\": #{queryMsg.user.to_json}}"))
		mainMsg.delete("chat_base_id")
		mainMsg.delete("user_id")
		
		return mainMsg
	end

	def check_chat_user(chat_base_id, user_id)
		chat_participants = ChatParticipant.where(chat_base_id: chat_base_id)
		chat_participants.each do |participant|
			if participant.user_id == user_id
				return true
			end
		end
		return false
	end
end
