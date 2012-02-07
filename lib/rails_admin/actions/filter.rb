require 'rails_admin/config/actions'
require 'rails_admin/config/actions/base'

module RailsAdmin
  module Config
    module Actions
      class Filter < RailsAdmin::Config::Actions::Base
         RailsAdmin::Config::Actions.register(self)
         register_instance_option :methods do
           [:name]
         end
      end
    end
  end
end