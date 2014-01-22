class PotentialMatchSetsController < ApplicationController
  before_action :set_potential_match_set, only: [:show, :edit, :update, :destroy]

  # GET /potential_match_sets
  # GET /potential_match_sets.json
  def index
    @potential_match_sets = PotentialMatchSet.all
  end

  # GET /potential_match_sets/1
  # GET /potential_match_sets/1.json
  def show
  end

  # GET /potential_match_sets/new
  def new
    @potential_match_set = PotentialMatchSet.new
  end

  # GET /potential_match_sets/1/edit
  def edit
  end

  # POST /potential_match_sets
  # POST /potential_match_sets.json
  def create
    @potential_match_set = PotentialMatchSet.new(potential_match_set_params)

    respond_to do |format|
      if @potential_match_set.save
        format.html { redirect_to @potential_match_set, notice: 'Potential match set was successfully created.' }
        format.json { render action: 'show', status: :created, location: @potential_match_set }
      else
        format.html { render action: 'new' }
        format.json { render json: @potential_match_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /potential_match_sets/1
  # PATCH/PUT /potential_match_sets/1.json
  def update
    respond_to do |format|
      if @potential_match_set.update(potential_match_set_params)
        format.html { redirect_to @potential_match_set, notice: 'Potential match set was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @potential_match_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /potential_match_sets/1
  # DELETE /potential_match_sets/1.json
  def destroy
    @potential_match_set.destroy
    respond_to do |format|
      format.html { redirect_to potential_match_sets_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_potential_match_set
      @potential_match_set = PotentialMatchSet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def potential_match_set_params
      params[:potential_match_set]
    end
end
