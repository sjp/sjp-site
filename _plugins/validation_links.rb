require 'cgi'

module Jekyll
  class ValidationLinks < Liquid::Tag
    def render(context)
      host = CGI::escape(context.environments.first["site"]["url"])
      resource = CGI::escape(context.environments.first["page"]["url"])
      url = "#{host}#{resource}"
      %|<a href="http://validator.w3.org/check?uri=#{url}">Valid HTML5</a> &amp; <a href="http://jigsaw.w3.org/css-validator/validator?uri=#{url}&amp;profile=css3">Valid CSS3</a>|
    end
  end
end

Liquid::Template.register_tag('validation_links', Jekyll::ValidationLinks)
