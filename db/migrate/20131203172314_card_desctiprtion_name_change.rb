class CardDesctiprtionNameChange < ActiveRecord::Migration
  def change
    rename_column(:cards, :desctription, :description)
  end
end
