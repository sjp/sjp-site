# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

include Nanoc3::Helpers::LinkTo

def xml_sitemap
  require 'builder'

  # Create builder
  buffer = ''
  xml = Builder::XmlMarkup.new(:target => buffer, :indent => 4)

  # Check for required attributes
  if @site.config[:base_url].nil?
    raise RuntimeError.new("The Nanoc3::Helpers::XMLSitemap helper requires the site configuration to specify the base URL for the site.")
  end

  # Build sitemap
  xml.instruct!
  
  xml.urlset(:xmlns => 'http://www.sitemaps.org/schemas/sitemap/0.9') do
    # Add item
    @items.reject { |i| i[:is_hidden] or i.binary? or i[:extension] == 'xml' }.each do |item|
      item.reps.each do |rep|
        xml.url do
          xml.loc         @site.config[:base_url] + rep.path
          xml.lastmod     item.mtime.to_iso8601_date unless item.mtime.nil?
        end
      end
    end
  end

  # Return sitemap
  buffer
end
