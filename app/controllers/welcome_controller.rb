require 'faraday'
class WelcomeController < ApplicationController
    def index
       
  
    end

    def fetch
      Rails.logger.debug("Data: #{request.raw_post}")
      res = Faraday.get 'https://api.dictionaryapi.dev/api/v1/entries/en/cat'  
      
      # res=HTTParty.get('https://api.dictionaryapi.dev/api/v1/entries/en/cat')
      render json: res.body
    end

    def post
      Rails.logger.debug("Data: #{request.raw_post}")
      Rails.logger.debug("PARAMS : " + word_param)
      res = Faraday.get 'https://api.dictionaryapi.dev/api/v1/entries/en/'+word_param 
      
      render json: res.status
    end

    private
    def word_param
      params.require(:word)
    end


  end
  
  
  
  