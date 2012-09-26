module Jekyll
  class GomLinkTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      if parts = @text.match(/^(\S*)\s(.*)$/)
        ver, linktext = parts[1].strip, parts[2].strip
        "<a href=\"https://github.com/sjp/GOMstreamer/tarball/#{ver}\" onclick=\"_gaq.push(['_trackPageview', '/github.com/sjp/GOMstreamer/tarball/#{ver}']);\">#{linktext}</a>"
      else
        ""
      end
    end
  end

  class GomNetLinkTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      if parts = @text.match(/^(\S*)\s(.*)$/)
        ver, linktext = parts[1].strip, parts[2].strip
        "<a href=\"/files/GOMstreamer_#{ver}.zip\" onclick=\"_gaq.push(['_trackPageview', '/files/GOMstreamer_#{ver}.zip']);\">#{linktext}</a>"
      else
        ""
      end
    end
  end
end

Liquid::Template.register_tag('gomtar', Jekyll::GomLinkTag)
Liquid::Template.register_tag('gomnet', Jekyll::GomNetLinkTag)
