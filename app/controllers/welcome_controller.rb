include OpenWeather

class WelcomeController < ApplicationController
  def index

  end
  
  def show_weather
    city = params[:city]
    
    if city
      @weather = ::OpenWeather::Current.city(city, units: "metric")
      
      @name = @weather["name"]
      @country = @weather["sys"]["country"]
      @temp = @weather["main"]["temp"].to_f.round(1)
      @wind = @weather["wind"]["speed"]
      @desc = @weather["weather"][0]["description"]
      @icon_url = @weather["weather"][0]["icon"]
      #@sunriseraw = Time.at(@weather["sys"]["sunrise"])
      @sunrise = Time.at(@weather["sys"]["sunrise"]).strftime("%l:%M %p") 
      @sunset = Time.at(@weather["sys"]["sunset"]).strftime("%l:%M %p") 
    end
  end
end
