module Jekyll
  class RepoLinkTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      if parts = @text.match(/(\S*)\s*(\S*)\s*(.*$)/)
        ghuser, ghrepo, ghtext = parts[1].strip, parts[2].strip, parts[3].strip
        if ghtext.length == 0
            ghtext = ghrepo
        end
        "<a href=\"https://github.com/#{ghuser}/#{ghrepo}\" class=\"github-link\">#{ghtext}</a>"
      else
        ""
      end
    end
  end
end

Liquid::Template.register_tag('ghr', Jekyll::RepoLinkTag)
