class ChatBaseSerializer < ActiveModel::Serializer
  attributes :id, :chat_name, :isGroup, :isReadOnly, :is_being_used, :private_key, :public_key
end
