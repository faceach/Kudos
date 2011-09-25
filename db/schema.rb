# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110712135248) do

  create_table "activities", :force => true do |t|
    t.integer  "target_id"
    t.integer  "metadata_id"
    t.integer  "user_id"
    t.integer  "sequence_no"
    t.integer  "count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.boolean  "is_public"
    t.integer  "capacity"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "metadata", :force => true do |t|
    t.string   "name"
    t.integer  "data_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "targets", :force => true do |t|
    t.integer  "user_id"
    t.integer  "category_id"
    t.integer  "metadata_id"
    t.integer  "sequence_no"
    t.string   "status"
    t.integer  "target_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "password"
    t.string   "nickname"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
