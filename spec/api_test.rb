require 'config/test_helper.rb'

describe "# API Testing || " do
    it "given a valid word, it returns the correct response" do
        VCR.use_cassette('valid word') do
            word = "gem"
            api = Faraday.get 'https://api.dictionaryapi.dev/api/v1/entries/en/'+word
            assert_equal 200, api.status
            assert_equal "OK", api.reason_phrase
        end
    end

    it "given an invalid word, it returns the 404 response i.e word not found" do
        VCR.use_cassette('invalid word') do
            word = "adsasj"
            api = Faraday.get 'https://api.dictionaryapi.dev/api/v1/entries/en/'+word
            assert_equal 404, api.status
           
        end
    end

end