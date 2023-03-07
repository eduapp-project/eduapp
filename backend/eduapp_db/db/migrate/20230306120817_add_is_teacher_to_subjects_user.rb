class AddIsTeacherToSubjectsUser < ActiveRecord::Migration[6.1]
  def change
    add_column :subjects_users, :is_teacher, :boolean
  end
end
