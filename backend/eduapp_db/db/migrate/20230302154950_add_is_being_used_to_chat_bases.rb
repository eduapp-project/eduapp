class AddIsBeingUsedToChatBases < ActiveRecord::Migration[6.1]
  def change
    add_column :chat_bases, :is_being_used, :boolean
  end
end
