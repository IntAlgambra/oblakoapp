# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'yaml'
seed_file = Rails.root.join('db', 'seeds.yml')
data = YAML.load_file(seed_file)
hash = ActiveSupport::HashWithIndifferentAccess.new(data)

hash[:projects].each do |project|
    @new_project = Project.create(:title => project[:title])
    project[:todos].each do |todo|
        @new_task = @new_project.tasks.create(:title => todo[:text], :completed => todo[:isCompleted])
    end
end