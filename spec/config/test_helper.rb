require 'faraday'
require 'vcr'
require 'spec_helper' 
require 'webmock/rspec'
# WebMock.disable_net_connect!(allow_localhost: true)

VCR.configure do |config|
    config.default_cassette_options = {:record => :new_episodes}
    config.cassette_library_dir = "#{::Rails.root}/spec/cassettes"
    config.hook_into :webmock
    config.ignore_localhost = true
    config.configure_rspec_metadata!
  end

