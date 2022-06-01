class AddExtrafields < ActiveRecord::Migration[6.1]
    def change
        tables = ActiveRecord::Base.connection.tables
        blacklisted_tables = [
            'schema_migrations',    
            'ar_internal_metadata',
            'jwt_blacklist',
            'jwt_denylist',
            'active_storage_attachments',
            'active_storage_blobs',
            'chat_messages',
            'chat_bases',
            'chat_base_infos',
            'active_storage_variant_records',
            'tuitions',
            'calendar_annotations',
            'chat_participants'
        ]

        tables.each do |table|
            if !blacklisted_tables.include?(table)
                add_column table, :extra_fields, :text
            end
        end
   end
end
  