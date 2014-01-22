require 'test_helper'

class PotentialMatchSetsControllerTest < ActionController::TestCase
  setup do
    @potential_match_set = potential_match_sets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:potential_match_sets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create potential_match_set" do
    assert_difference('PotentialMatchSet.count') do
      post :create, potential_match_set: {  }
    end

    assert_redirected_to potential_match_set_path(assigns(:potential_match_set))
  end

  test "should show potential_match_set" do
    get :show, id: @potential_match_set
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @potential_match_set
    assert_response :success
  end

  test "should update potential_match_set" do
    patch :update, id: @potential_match_set, potential_match_set: {  }
    assert_redirected_to potential_match_set_path(assigns(:potential_match_set))
  end

  test "should destroy potential_match_set" do
    assert_difference('PotentialMatchSet.count', -1) do
      delete :destroy, id: @potential_match_set
    end

    assert_redirected_to potential_match_sets_path
  end
end
